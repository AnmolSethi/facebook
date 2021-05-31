import Image from "next/image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div>
      <Head>
        <title>Facebook by Anmol Sethi | Login</title>
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

      <div className="grid place-items-center">
        <Image
          src="https://links.papareact.com/t4i"
          width={400}
          height={400}
          alt="facebook logo"
          objectFit="contain"
        />
        <h1
          onClick={signIn}
          className="p-4 bg-blue-500 rounded-full text-white cursor-pointer"
        >
          Login with Facebook
        </h1>
      </div>
    </div>
  );
}

export default Login;
