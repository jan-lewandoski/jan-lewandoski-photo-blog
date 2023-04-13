export type SanityImage = {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip: string;
  };
};

export type Album = {
  _createdAt: Date;
  _id: string;
  name: string;
  slug: string;
  images: SanityImage[];
  cover: SanityImage;
  date: Date;
};
