"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "yellow",
  components: {
    Button: {
      defaultProps: {
        variant: "light",
      }
    }
  },
});
