import { getAlbums } from "@/sanity/sanity-utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pluralize = (count: number, noun: string, suffix = "s") =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export default async function Home() {
  const albums = await getAlbums();

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-light uppercase tracking-wider text-gray-800">
          All albums
        </h1>
        <h3 className="text-sm font-light uppercase tracking-wider text-gray-400">
          April 2022 - April 2023
        </h3>
      </div>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {albums.map((album) => (
          <Link
            href={`/blog/albums/${album.slug}`}
            className="group relative mb-4 flex cursor-pointer flex-col"
            key={album._id}
          >
            <Image
              className="w-full brightness-50"
              src={album.cover.url}
              alt={album.name}
              width={album.cover.metadata.dimensions.width}
              height={album.cover.metadata.dimensions.height}
              placeholder="blur"
              blurDataURL={album.cover.metadata.lqip}
              sizes="(max-width: 640px) 100vw,
              (max-width: 1024) 50vw,
              33vw"
            />
            <div className="absolute left-0 top-0 z-10 grid h-full w-full flex-col content-center items-center text-center">
              <p className="text-lg uppercase tracking-wider text-white">
                {album.name}
              </p>
              <p className="text-xs uppercase tracking-wider text-gray-300">
                {album.images ? pluralize(album.images.length, "photo") : null}
              </p>
              <ArrowRight
                className="absolute bottom-6 right-6 opacity-0 duration-200 ease-in-out lg:group-hover:opacity-100"
                color="white"
              />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
