import { getPhotoFromAlbum } from "@/sanity/sanity-utils";

interface PhotoPageProps {
  params: { slug: string; photoId: string };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const photo = await getPhotoFromAlbum(params.photoId, params.slug);

  console.log(photo);

  return <></>;

  //   return (
  //     <Image
  //       key={photo.url}
  //       className="mb-4 w-full cursor-zoom-in hover:brightness-110"
  //       src={photo.url}
  //       alt={"Picture"}
  //       width={photo.metadata?.dimensions?.width || 100}
  //       height={photo.metadata?.dimensions?.height || 100}
  //       placeholder="blur"
  //       blurDataURL={photo.metadata.lqip}
  //       sizes="(max-width: 640px) 100vw,
  //           (max-width: 1024) 50vw,
  //           33vw"
  //     />
  //   );
}
