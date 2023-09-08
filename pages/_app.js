import "@/styles/globals.css";

// Session Provider
import { SessionProvider } from "next-auth/react";

// Pro sidebar
import { ProSidebarProvider } from "react-pro-sidebar";

// Next
import Head from "next/head";

// Components
import Layout from "@/components/Layout";

// Toast
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
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </ProSidebarProvider>
      </SessionProvider>
    </>
  );
}
