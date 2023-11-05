import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ProSidebarProvider } from "react-pro-sidebar";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Shoppy - Admin Panel</title>
      </Head>

      <SessionProvider session={session}>
        <ProSidebarProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ProSidebarProvider>
      </SessionProvider>
    </>
  );
}
