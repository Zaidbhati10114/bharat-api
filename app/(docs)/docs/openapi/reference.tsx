"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { useTheme } from "next-themes";

export function Reference() {
  const { resolvedTheme } = useTheme();

  return (
    <ApiReferenceReact
      configuration={{
        url: "/openapi.json",
        theme: resolvedTheme === "dark" ? "moon" : "default",
        layout: "modern",
        withDefaultFonts: false,
        searchHotKey: "k",

        hideDownloadButton: true,
        hideClientButton: true,
        hideModels: true,
        hideDarkModeToggle: true,
        hideTestRequestButton: false,
      }}
    />
  );
}
