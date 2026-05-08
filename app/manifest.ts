import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ibrahim AI Lab Portfolio",
    short_name: "Ibrahim AI Lab",
    description: "Applied AI systems portfolio focused on fashion intelligence and computer vision deployment.",
    start_url: "/",
    display: "standalone",
    background_color: "#070709",
    theme_color: "#070709",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
