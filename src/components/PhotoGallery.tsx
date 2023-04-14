import { SanityImage } from "@/types/Album";
import Image from "next/image";
import Link from "next/link";

interface PhotoGalleryProps {
  currentPhoto: SanityImage;
  previewImages: SanityImage[];
  albumPath: string;
}

export default function PhotoGallery({
  previewImages,
  currentPhoto,
  albumPath,
}: PhotoGalleryProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <Link
        href={albumPath}
        className="absolute inset-0 flex h-screen w-screen bg-black backdrop-blur-2xl"
      >
        <Image
          src={currentPhoto.metadata.lqip}
          alt={"Blurred background"}
          fill
          priority
        />
      </Link>
      <div className="z-30 m-auto max-w-screen-xl p-4">
        <Image
          src={currentPhoto.url}
          alt={"Picture"}
          width={currentPhoto.metadata.dimensions.width}
          height={currentPhoto.metadata.dimensions.height}
        />
      </div>

      <ul className="relative z-30 mb-6 flex w-full max-w-screen-xl items-center justify-center gap-2 px-4">
        {previewImages.map((image) => (
          <Link key={image._id} href={`${albumPath}/${image._id}`}>
            <Image
              src={image.url}
              alt={"Picture"}
              width={120}
              height={90}
              placeholder="blur"
              blurDataURL={image.metadata.lqip}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}
