import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender");

  if (!gender) {
    return NextResponse.json({ error: "Gender parameter is required" }, { status: 400 });
  }

  const bucketBaseUrl = "https://thisperson.s3.ap-southeast-2.amazonaws.com";
  const folder = `${gender.toLowerCase()}/${gender.toLowerCase()}`;
  const randomIndex = Math.floor(Math.random() * 133) + 1; // Random index between 1 and 133
  const imageUrl = `${bucketBaseUrl}/${folder}/image+(${randomIndex}).jpeg`;

  try {
    // Fetch the image from the bucket
    const response = await fetch(imageUrl, {
      cache: "no-store", // Prevent caching
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the image as a blob
    const imageBlob = await response.blob();

    // Return the image as a blob
    return new NextResponse(imageBlob, {
      headers: {
        "Content-Type": "image/jpeg", // Set the correct content type
        "Cache-Control": "no-store, max-age=0", // Prevent caching
        "X-Robots-Tag": "noindex", // Prevent indexing
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}