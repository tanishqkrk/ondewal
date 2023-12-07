import "../styles/globals.css";
import { CoreProvider } from "../src/context/CoreContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CoreProvider>
        <Component {...pageProps} />
      </CoreProvider>
    </>
  );
}
