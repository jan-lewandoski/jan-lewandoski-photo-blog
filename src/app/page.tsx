import { getAlbums } from "@/sanity/sanity-utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const albums = await getAlbums();

  console.log({ albums });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-7xl font-extrabold">
        Hello, I&apos;m{" "}
        <span className="bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
          Jan
        </span>
        !
      </h1>

      <p className="mt-3 text-xl text-gray-600">
        Aloha everyone! Check out my projects!
      </p>

      <h2 className="mt-24 text-3xl font-bold text-gray-700">My albums</h2>
      {albums.map((album) => (
        <div className="" key={album._id}>
          {album.name}
        </div>
      ))}
    </div>
  );
}
