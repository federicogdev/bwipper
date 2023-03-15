import Layout from "@/components/Layout";
import LoginModal from "@/components/Modals/LoginModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <LoginModal />
      <Component {...pageProps} />
    </Layout>
  );
}
