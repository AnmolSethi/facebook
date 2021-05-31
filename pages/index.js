import Head from "next/head";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { getSession } from "next-auth/client";
import { db } from "../firebase";

export default function Home({ session, posts }) {
  // If user is not logged in, redirect it to the login page
  if (!session) return <Login />;
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook by Anmol Sethi</title>
        <meta
          name="description"
          content="This is a Facebook clone built using NextJS and Tailwind CSS"
        />
        <meta
          name="keywords"
          content="facebook, facebook clone, social media, anmol sethi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
