import { SanityImage } from "@/types/Album";
import Image from "next/image";
import Link from "next/link";

type Dimensions = SanityImage["metadata"]["dimensions"];
type Orientation = "horizontal" | "vertical";

function getOrientation(dimensions: Dimensions): Orientation {
  return dimensions.width > dimensions.height ? "horizontal" : "vertical";
}

function getMainPhotoDimensions(dimensions: Dimensions): Dimensions {
  const orientation = getOrientation(dimensions);

  switch (orientation) {
    case "horizontal":
      return {
        width: 1280,
        height: 960,
        aspectRatio: 4 / 3,
      };
    case "vertical":
      return {
        width: 720,
        height: 960,
        aspectRatio: 3 / 4,
      };
  }
}

function getPreviewPhotoDimensions(dimensions: Dimensions): Dimensions {
  const orientation = getOrientation(dimensions);

  switch (orientation) {
    case "horizontal":
      return {
        width: 104,
        height: 78,
        aspectRatio: 4 / 3,
      };
    case "vertical":
      return {
        width: 78,
        height: 104,
        aspectRatio: 3 / 4,
      };
  }
}

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

      <div className="z-30 m-auto p-4">
        <Image
          src={currentPhoto.url}
          alt={"Picture"}
          width={getMainPhotoDimensions(currentPhoto.metadata.dimensions).width}
          height={
            getMainPhotoDimensions(currentPhoto.metadata.dimensions).height
          }
        />
      </div>

      <ul className="absolute bottom-0 left-0 z-30 mb-8 flex w-full items-center justify-center gap-2 px-4">
        {previewImages.map((image) => (
          <Link key={image._id} href={`${albumPath}/${image._id}`}>
            <Image
              className={
                image._id === currentPhoto._id
                  ? "brightness-100"
                  : "brightness-75"
              }
              src={image.url}
              alt={"Picture"}
              // TODO Cannot be based on currentPhoto
              width={
                getPreviewPhotoDimensions(currentPhoto.metadata.dimensions)
                  .width
              }
              height={
                getPreviewPhotoDimensions(currentPhoto.metadata.dimensions)
                  .height
              }
              placeholder="blur"
              blurDataURL={image.metadata.lqip}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}
