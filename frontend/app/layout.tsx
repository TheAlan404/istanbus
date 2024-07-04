import "@mantine/core/styles.css";
import "../style.css";
import React from "react";
import { MantineProvider, ColorSchemeScript, AppShell } from "@mantine/core";
import { theme } from "../src/theme";
import { Metadata } from "next";
import AppBase from "../components/base/AppBase";

export const metadata: Metadata = {
  title: "Istanbus",
  description: "Açık kaynak IETT web sitesi",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppBase>
            {children}
          </AppBase>
        </MantineProvider>
      </body>
    </html>
  );
}
