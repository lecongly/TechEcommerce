import Head from "next/head";

interface Props {
  title: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta
          name="description"
          content="TechEcommerce is a personal project created by @lecongly."
        />
      </Head>
      <main className="relative w-full h-full">
        <div className="w-full content py-5">{children}</div>
      </main>
    </>
  );
};

export default Layout;
