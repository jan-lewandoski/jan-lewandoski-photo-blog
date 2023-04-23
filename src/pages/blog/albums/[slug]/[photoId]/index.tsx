import PhotoGallery from "@/components/PhotoGallery";
import { getPhotoWithPreviewImages } from "@/sanity/sanity-utils";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function PhotoPage({
  image,
  previewImages,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mx-auto max-w-[1960px] p-4">
      <PhotoGallery
        previewImages={previewImages}
        currentPhoto={image}
        albumPath={`/blog/albums/${slug}`}
      />
    </div>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const slug = (params?.slug as string) || "";
  const photoId = (params?.photoId as string) || "";

  const { image, previewImages } = await getPhotoWithPreviewImages(
    slug,
    photoId,
  );

  return {
    props: {
      image,
      previewImages,
      slug,
    },
  };
}
