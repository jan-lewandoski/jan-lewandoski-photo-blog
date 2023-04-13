import { getAlbum } from "@/sanity/sanity-utils";
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
      <ul className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {album.images.map((img) => (
          <Image
            key={img.url}
            className="w-full"
            src={img.url}
            alt={album.name}
            width={img.metadata.dimensions.width}
            height={img.metadata.dimensions.height}
            placeholder="blur"
            blurDataURL={img.metadata.lqip}
            sizes="(max-width: 640px) 100vw,
          (max-width: 1024) 50vw,
          33vw"
          />
        ))}
      </ul>
    </div>
  );
}
