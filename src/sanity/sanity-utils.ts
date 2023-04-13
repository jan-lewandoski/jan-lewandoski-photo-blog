import { Album } from "@/types/Album";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

export async function getAlbums(): Promise<Album[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "album"] | order(_createdAt asc){
        _id,
        _createdAt,
        name,
        images,
        "cover": images[0].asset->{
          url,
          metadata{
            dimensions,
            lqip
          }
        },
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
        "images": images[].asset->{
          url,
          metadata{
            dimensions,
            lqip
          }
        },
        date,
        "slug": slug.current,
    }`,
    { slug },
  );
}
