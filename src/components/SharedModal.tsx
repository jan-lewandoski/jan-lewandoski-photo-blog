import { SanityImage } from "@/types/Album";
import { variants } from "@/utils/animationVariants";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface SharedModalProps {
  index: number;
  images: SanityImage[];
  currentPhoto: SanityImage;
  onPhotoChange: (currentIndex: number) => void;
}

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

export default function SharedModal({
  images,
  index,
  currentPhoto,
  onPhotoChange,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  const currentWidth = getMainPhotoDimensions(
    currentPhoto.metadata.dimensions,
  ).width;

  const currentHeight = getMainPhotoDimensions(
    currentPhoto.metadata.dimensions,
  ).height;

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center"
        // {...handlers}
      >
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={currentPhoto.url}
                  width={currentWidth}
                  height={currentHeight}
                  priority
                  alt="Blog image"
                  onLoadingComplete={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              <>
                {index > 0 && (
                  <button
                    className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => onPhotoChange(index - 1)}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                )}
                {index + 1 < images.length && (
                  <button
                    className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => onPhotoChange(index + 1)}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                )}
              </>
            </div>
          )}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto my-6 flex aspect-[3/2] h-14"
            >
              <AnimatePresence initial={false} custom={-1}>
                {images.map(({ _id, url, metadata }, index) => (
                  <motion.button
                    // initial={{
                    //   width: "0%",
                    //   x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    // }}
                    // animate={{
                    //   scale: _id === currentPhoto._id ? 1.25 : 1,
                    //   width: "100%",
                    //   x: `${Math.max(index * -100, 15 * -100)}%`,
                    // }}
                    // exit={{ width: "0%" }}
                    // onClick={() => changePhotoId(id)}
                    key={_id}
                    custom={-1}
                    className={`${
                      _id === currentPhoto._id
                        ? "z-20 rounded-md shadow shadow-black/50"
                        : "z-10"
                    } ${index === 0 ? "rounded-l-md" : ""} ${
                      index === images.length - 1 ? "rounded-r-md" : ""
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <Image
                      alt="small photos on the bottom"
                      width={
                        getPreviewPhotoDimensions(metadata.dimensions).width
                      }
                      height={
                        getPreviewPhotoDimensions(metadata.dimensions).height
                      }
                      className={`${
                        _id === currentPhoto._id
                          ? "brightness-110 hover:brightness-110"
                          : "brightness-50 contrast-125 hover:brightness-75"
                      } h-full object-cover transition`}
                      src={url}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
