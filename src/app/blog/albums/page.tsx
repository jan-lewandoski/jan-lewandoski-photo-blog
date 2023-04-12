import { getAlbums } from "@/sanity/sanity-utils";
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
      <ul className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {albums.map((album) => (
          <Link
            href={`/blog/albums/${album.slug}`}
            className="group relative mb-4 flex cursor-pointer flex-col"
            key={album._id}
          >
            <Image
              className="w-full duration-150 ease-in-out group-hover:scale-105 group-hover:brightness-50"
              src={album.cover.url}
              alt={album.name}
              width={320}
              height={320}
            />
            <div className="absolute left-0 top-0 z-10 hidden h-full w-full flex-col content-center items-center text-center group-hover:grid">
              <p className="text-lg uppercase tracking-wider text-white">
                {album.name}
              </p>
              <p className="text-xs uppercase tracking-wider text-gray-300">
                {album.images ? pluralize(album.images.length, "photo") : null}
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
