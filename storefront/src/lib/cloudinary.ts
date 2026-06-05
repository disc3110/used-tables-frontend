type CloudinaryImageOptions = {
  width: number;
  height: number;
  trim?: boolean;
};

const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

export function getCloudinaryImageUrl(
  url: string,
  { width, height, trim = false }: CloudinaryImageOptions,
) {
  if (!url.includes("res.cloudinary.com") || !url.includes(CLOUDINARY_UPLOAD_SEGMENT)) {
    return url;
  }

  const [baseUrl, assetPath] = url.split(CLOUDINARY_UPLOAD_SEGMENT);

  if (!baseUrl || !assetPath) {
    return url;
  }

  const transformations = [
    trim ? "e_trim:10" : null,
    `c_fit,w_${width},h_${height}`,
    "f_auto,q_auto:good",
  ]
    .filter(Boolean)
    .join("/");

  return `${baseUrl}${CLOUDINARY_UPLOAD_SEGMENT}${transformations}/${assetPath}`;
}
