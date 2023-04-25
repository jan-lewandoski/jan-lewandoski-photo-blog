import { SanityImage } from "@/types/Album";
import Image from "next/image";
import SharedModal from "./SharedModal";

interface PhotoGalleryProps {
  currentPhoto: SanityImage;
  images: SanityImage[];
  albumPath: string;
  onPhotoChange: (currentIndex: number) => void;
}

export default function PhotoGallery({
  images,
  currentPhoto,
  albumPath,
  onPhotoChange,
}: PhotoGalleryProps) {
  const currentIndex =
    images?.findIndex(({ _id }) => _id === currentPhoto._id) || 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl">
        <Image
          src={currentPhoto.metadata.lqip}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority={true}
        />
      </button>
      <SharedModal
        index={currentIndex}
        images={images}
        currentPhoto={currentPhoto}
        onPhotoChange={onPhotoChange}
      />
    </div>
  );
}
