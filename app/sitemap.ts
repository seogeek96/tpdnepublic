import { SITE_DATE_ISO } from "@/utils/site-date";
import type { MetadataRoute } from "next";

const baseUrl = "https://www.thispersondoesnotexist.cc";
const paths = [
  "",
  "/ar",
  "/bg",
  "/pt",
  "/zh",
  "/de",
  "/es",
  "/et",
  "/fi",
  "/el",
  "/id",
  "/it",
  "/ja",
  "/ko",
  "/nl",
  "/no",
  "/pl",
  "/ro",
  "/ru",
  "/sl",
  "/sv",
  "/tr",
  "/uk",
  "/hi",
  "/fr",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified: SITE_DATE_ISO,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
