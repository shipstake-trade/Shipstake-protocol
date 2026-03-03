import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  let domain = headersList.get("host") as string;
  let protocol = "https";
  const base = `${protocol}://${domain}`;

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    {
      url: `${base}/explore`,
      lastModified: new Date(),
    },
    {
      url: `${base}/leaderboard`,
      lastModified: new Date(),
    },
    {
      url: `${base}/quest/create`,
      lastModified: new Date(),
    },
  ];
}
