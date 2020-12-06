import Head from "next/head";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import { Container } from "@chakra-ui/react";

export const siteTitle = "Events";

export default function Layout({ children, home }) {
  return (
    <>
      <Container maxW="lg">{children}</Container>
    </>
  );
}
