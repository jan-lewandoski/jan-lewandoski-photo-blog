import { Album } from "@/types/Album";
import imageUrlBuilder from "@sanity/image-url";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

export function urlFor(source: string) {
  const builder = imageUrlBuilder(createClient(clientConfig));
  return builder.image(source);
}

export async function getAlbums(): Promise<Album[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "album"]{
        _id,
        _createdAt,
        name,
        images,
        cover,
        "slug": slug.current,
    }`,
  );
}

export async function getAlbum(slug: string): Promise<Album> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "album" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        images,
        cover,
        "slug": slug.current,
    }`,
    { slug },
  );
}