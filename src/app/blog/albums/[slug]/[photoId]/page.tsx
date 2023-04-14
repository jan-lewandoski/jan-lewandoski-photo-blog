import PhotoGallery from "@/components/PhotoGallery";
import { getPhotoFromAlbum } from "@/sanity/sanity-utils";
import Head from "next/head";

interface PhotoPageProps {
  params: { slug: string; photoId: string };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { album, currentPhoto } = await getPhotoFromAlbum(
    params.slug,
    params.photoId,
  );

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property="og:image" content={currentPhoto.url} />
        <meta name="twitter:image" content={currentPhoto.url} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <PhotoGallery
          album={album}
          currentPhoto={currentPhoto}
          albumPath={`/blog/albums/${params.slug}`}
        />
      </main>
    </>
  );
}
