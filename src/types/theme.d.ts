import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    darkest: Palette["primary"];
  }
  interface PaletteOptions {
    darkest?: PaletteOptions["primary"];
  }
}
