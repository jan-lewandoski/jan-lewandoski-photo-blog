import PhotoGallery from "@/components/PhotoGallery";
import { getPhotoWithPreviewImages } from "@/sanity/sanity-utils";

interface PhotoPageProps {
  params: { slug: string; photoId: string };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { image, previewImages } = await getPhotoWithPreviewImages(
    params.slug,
    params.photoId,
  );

  return (
    <div className="mx-auto max-w-[1960px] p-4">
      <PhotoGallery
        previewImages={previewImages}
        currentPhoto={image}
        albumPath={`/blog/albums/${params.slug}`}
      />
    </div>
  );
}
