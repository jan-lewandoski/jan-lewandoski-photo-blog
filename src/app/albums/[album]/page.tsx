import { getAlbum } from "@/sanity/sanity-utils";

interface AlbumPageProps {
  params: { album: string };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const slug = params.album;

  const album = await getAlbum(slug);

  return <div>{album.name}</div>;
}
