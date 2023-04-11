import { Album } from "@/types/Album";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

export async function getAlbums(): Promise<Album[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "album"]{
        _id,
        _createdAt,
        name,
        images,
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
        "slug": slug.current,
    }`,
    { slug },
  );
}
