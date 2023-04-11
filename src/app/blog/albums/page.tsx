import { AspectRatio } from "@/components/aspectRatio";
import { getAlbums, urlFor } from "@/sanity/sanity-utils";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const albums = await getAlbums();

  return (
    <div className="grid grid-cols-3 gap-4">
      {albums.map((album) => (
        <Link
          href={`/blog/albums/${album.slug}`}
          className="relative flex cursor-pointer flex-col items-center justify-center duration-100 ease-in hover:scale-105"
          key={album._id}
        >
          <AspectRatio ratio={1}>
            <Image
              className="object-cover"
              src={urlFor(album.cover).url()}
              alt={album.name}
              fill
            />
          </AspectRatio>
          <p className="pt-2 text-sm uppercase tracking-wider text-gray-500">
            {album.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
