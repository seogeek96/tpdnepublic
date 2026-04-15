import imageManifest from "@/data/image-manifest.json";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COOKIE_NAME = "tpdne_recent_images";
const DEFAULT_BATCH_SIZE = 4;
const MAX_BATCH_SIZE = 8;
const S3_KEY_PREFIX = "this-person-does-not-exist";

const genders = ["male", "female"] as const;

type Gender = (typeof genders)[number];
type ImageHistory = Record<Gender, string[]>;
type ImageEntry = {
  id: string;
  key: string;
};
type ImageManifest = {
  version: number;
  generatedAt: string;
  bucket?: string;
  region?: string;
  images: Record<Gender, ImageEntry[]>;
};

const initialHistory: ImageHistory = {
  male: [],
  female: [],
};
const manifest = imageManifest as ImageManifest;

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
});

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : "Unknown error";
};

const isCredentialError = (error: unknown) => {
  return (
    error instanceof Error &&
    (error.name === "CredentialsProviderError" ||
      error.message.toLowerCase().includes("credential"))
  );
};

const clampNumber = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const isGender = (value: string | null): value is Gender => {
  return genders.includes(value as Gender);
};

const toDownloadFilename = (gender: Gender, imageId: string) => {
  return `${S3_KEY_PREFIX}-${gender}-${imageId}.jpg`;
};

const getBucketName = () => {
  return process.env.AWS_S3_BUCKET || manifest.bucket || "tpdne";
};

const decodeHistory = (value?: string): ImageHistory => {
  if (!value) return { ...initialHistory };

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    return {
      male: Array.isArray(parsed?.male) ? parsed.male.filter((id: unknown) => typeof id === "string") : [],
      female: Array.isArray(parsed?.female) ? parsed.female.filter((id: unknown) => typeof id === "string") : [],
    };
  } catch {
    return { ...initialHistory };
  }
};

const encodeHistory = (history: ImageHistory) => {
  return Buffer.from(JSON.stringify(history)).toString("base64url");
};

const getAvailableImages = (gender: Gender) => {
  return (manifest.images[gender] || []).filter((image) => image.id && image.key);
};

const createCandidateImages = (images: ImageEntry[], recentIds: string[], count: number) => {
  for (let retainedHistory = recentIds.length; retainedHistory >= 0; retainedHistory -= 1) {
    const blockedIds = new Set(recentIds.slice(0, retainedHistory));
    const candidates = images.filter((image) => !blockedIds.has(image.id));

    if (candidates.length >= count || retainedHistory === 0) {
      return candidates;
    }
  }

  return [];
};

const sampleImages = (images: ImageEntry[], recentIds: string[], count: number) => {
  const candidates = createCandidateImages(images, recentIds, count);
  const selectedImages: ImageEntry[] = [];

  while (selectedImages.length < count && candidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const [image] = candidates.splice(randomIndex, 1);
    selectedImages.push(image);
  }

  return selectedImages;
};

const createSignedImage = async (gender: Gender, image: ImageEntry, expiresIn: number) => {
  const bucket = getBucketName();
  const viewCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: image.key,
  });
  const downloadCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: image.key,
    ResponseContentDisposition: `attachment; filename="${toDownloadFilename(gender, image.id)}"`,
    ResponseContentType: "image/jpeg",
  });

  const [url, downloadUrl] = await Promise.all([
    getSignedUrl(s3Client, viewCommand, { expiresIn }),
    getSignedUrl(s3Client, downloadCommand, { expiresIn }),
  ]);

  return {
    id: image.id,
    gender,
    url,
    downloadUrl,
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender");

  if (!isGender(gender)) {
    return NextResponse.json({ error: "Gender must be male or female" }, { status: 400 });
  }

  const count = clampNumber(Number(searchParams.get("count") || DEFAULT_BATCH_SIZE), 1, MAX_BATCH_SIZE);
  const expiresIn = clampNumber(Number(process.env.SIGNED_URL_EXPIRES_SECONDS || 600), 60, 3600);

  try {
    const availableImages = getAvailableImages(gender);
    const historyLimit = clampNumber(Number(process.env.RECENT_IMAGE_HISTORY_LIMIT || 80), count, availableImages.length);
    const history = decodeHistory(request.cookies.get(COOKIE_NAME)?.value);
    const selectedImages = sampleImages(availableImages, history[gender], count);

    if (selectedImages.length === 0) {
      return NextResponse.json(
        { error: "No images available. Run npm run images:manifest to refresh data/image-manifest.json." },
        { status: 500 }
      );
    }

    const selectedIds = selectedImages.map((image) => image.id);
    const images = await Promise.all(
      selectedImages.map((image) => createSignedImage(gender, image, expiresIn))
    );

    const updatedHistory: ImageHistory = {
      ...history,
      [gender]: [
        ...selectedIds,
        ...history[gender].filter((imageId) => !selectedIds.includes(imageId)),
      ].slice(0, historyLimit),
    };

    const response = NextResponse.json({
      images,
      expiresIn,
      availableImageCount: availableImages.length,
    });

    response.cookies.set(COOKIE_NAME, encodeHistory(updatedHistory), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating signed image URLs:", error);
    const isDevelopment = process.env.NODE_ENV !== "production";

    return NextResponse.json(
      {
        error: "Failed to create signed image URLs",
        ...(isDevelopment && {
          details: isCredentialError(error)
            ? "AWS credentials are missing. Fill AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in .env, then restart npm run dev."
            : getErrorMessage(error),
        }),
      },
      { status: 500 }
    );
  }
}
