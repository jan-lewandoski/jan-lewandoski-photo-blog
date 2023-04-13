const album = {
  name: "album",
  title: "Albums",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "MMMM YYYY" },
    },
    {
      name: "cover",
      title: "Album Cover",
      type: "image",
      options: { hotspot: true, metadata: ["location", "lqip"] },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true, metadata: ["location", "lqip"] },
        },
      ],
    },
  ],
};

export default album;
