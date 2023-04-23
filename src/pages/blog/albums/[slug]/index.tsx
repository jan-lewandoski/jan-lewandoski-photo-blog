import BlogLayout from "@/components/BlogLayout";
import { getAlbum } from "@/sanity/sanity-utils";
import dayjs from "dayjs";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

export default function AlbumPage({
  album,
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4 ">
        <h1 className="text-3xl font-light uppercase tracking-wider text-gray-800">
          {album.name}
        </h1>
        <h3 className="text-sm font-light uppercase tracking-wider text-gray-400">
          {dayjs(album.date).format("MMMM YYYY")}
        </h3>
      </div>
      <ul className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {album.images.map((img, index) => (
          <Link
            href={`/blog/albums/${slug}/${img._id}`}
            key={img.url}
            className="relative mb-4 flex cursor-zoom-in hover:brightness-110"
          >
            <Image
              priority={index === 0}
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
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const slug = (params?.slug as string) || "";

  const album = await getAlbum(slug);

  return {
    props: {
      album,
      slug,
    },
  };
}

AlbumPage.getLayout = function getLayout(page: ReactElement) {
  return <BlogLayout>{page}</BlogLayout>;
};
