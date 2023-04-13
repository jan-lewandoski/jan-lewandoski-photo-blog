import { getPhotoFromAlbum } from "@/sanity/sanity-utils";
import Image from "next/image";

interface PhotoPageProps {
  params: { slug: string; photoId: string };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { image } = await getPhotoFromAlbum(params.photoId, params.slug);

  return (
    <Image
      key={image.url}
      className=""
      src={image.url}
      alt={"Picture"}
      width={image.metadata.dimensions.width}
      height={image.metadata.dimensions.height}
      placeholder="blur"
      blurDataURL={image.metadata.lqip}
    />
  );
}
