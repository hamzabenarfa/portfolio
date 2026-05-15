import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || "https://benarfa.com";
export const baseUrl = SITE_URL.replace(/\/$/, "");

export function getAbsoluteUrl(path = "/"): string {
  if (path === "/") return baseUrl;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getAbsoluteAssetUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${baseUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function getAlternates(path = "/"): Metadata["alternates"] {
  return {
    canonical: getAbsoluteUrl(path),
  };
}
