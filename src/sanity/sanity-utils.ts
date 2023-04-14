import { Album, SanityImage } from "@/types/Album";
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
          "url": url + "?w=1200",
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
          _id,
          "url": url + "?w=1200",
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

interface PhotoWithPreviewImages extends Omit<Album, "images"> {
  image: SanityImage;
  previewImages: SanityImage[];
}

export async function getPhotoWithPreviewImages(
  slug: string,
  photoId: string,
): Promise<PhotoWithPreviewImages> {
  return await createClient(clientConfig).fetch(
    groq`*[_type == "album" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        "image": images[asset->_id == $photoId][0].asset->{
              _id,
              url,
              metadata{
                dimensions,
                lqip
              }
            },
        "previewImages": images[].asset->{
          _id,
          "url": url + "?w=120&h=90",
          metadata{
            dimensions,
            lqip
          }
        },
        date,
        "slug": slug.current,
    }`,
    { slug, photoId },
  );
}
