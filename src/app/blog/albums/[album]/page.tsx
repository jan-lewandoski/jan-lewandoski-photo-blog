import { getAlbum, urlFor } from "@/sanity/sanity-utils";
import dayjs from "dayjs";
import Image from "next/image";

interface AlbumPageProps {
  params: { album: string };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const slug = params.album;

  const album = await getAlbum(slug);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-light uppercase tracking-wider text-gray-800">
          {album.name}
        </h1>
        <h3 className="text-sm font-light uppercase tracking-wider text-gray-400">
          {dayjs(album.date).format("MMMM YYYY")}
        </h3>
      </div>
      <ul className="mt-4 columns-1 gap-4 md:columns-2 lg:columns-3">
        {album.images.map((img: any) => (
          <Image
            alt={album.name}
            className="mb-4 w-full"
            key={img.ref}
            src={urlFor(img).url()}
            width={320}
            height={180}
          />
        ))}
      </ul>
    </div>
  );
}
