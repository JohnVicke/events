import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { Button, Container } from "@chakra-ui/react";
import { useAuth } from "../utils/auth";
import TopNav from "../components/topnav";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home(props) {
  const auth = useAuth();
  return (
    <Container>
      <TopNav />
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {auth.user && <h1>{auth.user.username}</h1>}
      <Link href="/register">
        <Button>Register</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </Container>
  );
}
