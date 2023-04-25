import PhotoGallery from "@/components/PhotoGallery";
import { getPhotoWithPreviewImages } from "@/sanity/sanity-utils";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState } from "react";

export default function PhotoPage({
  photoId,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentPhotoId, setCurrentPhotoId] = useState(photoId);

  const { data } = useQuery({
    queryKey: [`photos/${slug}`, slug, currentPhotoId],
    queryFn: () => getPhotoWithPreviewImages(slug, currentPhotoId),
  });

  const onPhotoChange = (currentIndex: number) => {
    const newPhotoId = data?.previewImages.find(
      (img, index) => index === currentIndex,
    );

    if (newPhotoId) {
      setCurrentPhotoId(newPhotoId?._id);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[1960px] p-4">
      <PhotoGallery
        images={data.previewImages}
        currentPhoto={data.image}
        albumPath={`/blog/albums/${slug}`}
        onPhotoChange={onPhotoChange}
      />
    </div>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const slug = (params?.slug as string) || "";
  const photoId = (params?.photoId as string) || "";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`photos/${slug}`, slug, photoId], () =>
    getPhotoWithPreviewImages(slug, photoId),
  );

  return {
    props: {
      photoId,
      slug,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
