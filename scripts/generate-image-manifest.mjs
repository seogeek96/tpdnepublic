import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const manifestPath = path.join(projectRoot, "data", "image-manifest.json");

const genders = ["male", "female"];
const s3KeyPrefix = "this-person-does-not-exist";
const supportedImagePattern = /\.(jpe?g|png|webp)$/i;

const parseEnvValue = (value) => {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const loadLocalEnv = async () => {
  try {
    const envFile = await readFile(envPath, "utf8");

    envFile.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) return;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) return;

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = parseEnvValue(trimmed.slice(separatorIndex + 1));

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
};

const getImageIdFromKey = (key) => {
  const filename = key.split("/").pop() || "";
  return filename.replace(/\.[^.]+$/, "").replace(`${s3KeyPrefix}-`, "");
};

const isSupportedImageKey = (gender, key) => {
  return (
    typeof key === "string" &&
    key.startsWith(`${gender}/${s3KeyPrefix}-`) &&
    supportedImagePattern.test(key)
  );
};

const listImagesForGender = async ({ client, bucket, gender }) => {
  const prefix = `${gender}/${s3KeyPrefix}-`;
  const images = [];
  let continuationToken;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    );

    response.Contents?.forEach((object) => {
      if (!isSupportedImageKey(gender, object.Key)) return;

      images.push({
        id: getImageIdFromKey(object.Key),
        key: object.Key,
      });
    });

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);

  images.sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));
  return images;
};

const getStableManifest = ({ bucket, region, images }) => {
  return {
    version: 1,
    bucket,
    region,
    keyPrefix: s3KeyPrefix,
    counts: Object.fromEntries(genders.map((gender) => [gender, images[gender].length])),
    images,
  };
};

const getStableExistingManifest = (manifest) => {
  return {
    version: manifest.version,
    bucket: manifest.bucket,
    region: manifest.region,
    keyPrefix: manifest.keyPrefix,
    counts: manifest.counts,
    images: manifest.images,
  };
};

const readExistingManifest = async () => {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
};

const main = async () => {
  await loadLocalEnv();

  const region = process.env.AWS_REGION || "us-east-1";
  const bucket = process.env.AWS_S3_BUCKET || "tpdne";
  const client = new S3Client({ region });
  const images = {};

  for (const gender of genders) {
    images[gender] = await listImagesForGender({ client, bucket, gender });
    console.log(`Found ${images[gender].length} ${gender} images in s3://${bucket}/${gender}/`);

    if (images[gender].length === 0) {
      throw new Error(`No ${gender} images found in s3://${bucket}/${gender}/`);
    }
  }

  const stableManifest = getStableManifest({ bucket, region, images });
  const existingManifest = await readExistingManifest();

  if (
    existingManifest &&
    JSON.stringify(getStableExistingManifest(existingManifest)) === JSON.stringify(stableManifest)
  ) {
    console.log(`${path.relative(projectRoot, manifestPath)} is already up to date`);
    return;
  }

  const manifest = {
    ...stableManifest,
    generatedAt: new Date().toISOString(),
  };

  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(`${manifestPath}.tmp`, `${JSON.stringify(manifest, null, 2)}\n`);
  await rename(`${manifestPath}.tmp`, manifestPath);

  console.log(`Wrote ${path.relative(projectRoot, manifestPath)}`);
};

main().catch((error) => {
  console.error("Failed to generate image manifest");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
