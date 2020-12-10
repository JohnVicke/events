import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import UserList from "../components/usersList";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../utils/auth";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const auth = useAuth();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {auth.user && <h1>{auth.user.username}</h1>}
      <h1> landing page</h1>
      <Link href="/register">
        <Button>Register</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </Layout>
  );
}
