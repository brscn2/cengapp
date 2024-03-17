import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { Avatar, Text, Button, Link ,Navbar, Spacer } from "@nextui-org/react";

export default function NavbarComponent() {
  const { isLight } = useTheme();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>CENG Erasmus App</title>
        <meta
          name="description"
          content="App for CENG Department Erasmus Affairs"
        />
        <link rel="icon" href="/ceng-logo.png" />
      </Head>
      <Navbar shouldHideOnScroll isBordered={isLight} variant="sticky">
        <Navbar.Brand>
          <Avatar size="lg" src="/ceng-logo.png" color="primary" />
          <Spacer x={0.5}></Spacer>
          <Text b color="inherit" hideIn="xs">
            METU CENG
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline">
          <Navbar.Link
            onClick={() => router.push("/")}
            isActive={router.asPath === "/" || router.asPath === "#"}
          >Dashboard</Navbar.Link>
          <Navbar.Link
            onClick={() => router.push("/apply")}
            isActive={router.asPath === "/apply"}
          >
            Apply
          </Navbar.Link>
          <Navbar.Link href="/support"
            isActive={router.asPath === "/support"}
          >Support</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Spacer y={1}></Spacer>
    </div>
  );
}
