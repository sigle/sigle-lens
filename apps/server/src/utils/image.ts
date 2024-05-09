import sharp from "sharp";

const WEBP = "image/webp";
const PNG = "image/png";
const JPEG = "image/jpeg";
export const allowedFormats = [WEBP, PNG, JPEG] as const;

export async function optimizeImage({
  buffer,
  contentType,
  quality,
  width,
  height,
}: {
  buffer: Buffer | ArrayBuffer;
  contentType: string;
  quality: number;
  width: number;
  height?: number;
}): Promise<Buffer> {
  const transformer = sharp(buffer, {
    sequentialRead: true,
  });

  transformer.rotate();

  if (height) {
    transformer.resize(width, height);
  } else {
    transformer.resize(width, undefined, {
      withoutEnlargement: true,
    });
  }

  if (contentType === WEBP) {
    transformer.webp({ quality });
  } else if (contentType === PNG) {
    transformer.png({ quality });
  } else if (contentType === JPEG) {
    transformer.jpeg({ quality, progressive: true });
  }

  const optimizedBuffer = await transformer.toBuffer();
  return optimizedBuffer;
}

export function mimeTypeToExtension(mimeType: string): string {
  switch (mimeType) {
    case WEBP:
      return "webp";
    case PNG:
      return "png";
    case JPEG:
      return "jpeg";
  }
  throw new Error("Unsupported mimeType");
}
