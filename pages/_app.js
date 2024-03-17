import * as React from "react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SSRProvider } from "react-aria";
// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {}, // optional
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {}, // optional
  },
});

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={lightTheme}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </NextUIProvider>
  );
}

export default MyApp;
