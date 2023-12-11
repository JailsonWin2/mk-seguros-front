import Navbar from "@/components/Navbar";
import "../styles/global.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  );
}
