import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery(
    { text: "from tRPC" },
    {
      refetchOnWindowFocus: false,
    }
  );
  const utils = trpc.useContext();
  const { data: users } = trpc.user.getUser.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: wishlist } = trpc.wishlist.list.useQuery(
    {},
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: wishlistById } = trpc.wishlist.byId.useQuery(
    { id: "1" },
    {
      refetchOnWindowFocus: false,
    }
  );

  const addList = trpc.wishlist.add.useMutation({
    async onSuccess() {
      await utils.wishlist.list.invalidate();
    },
  });

  console.log({ users, wishlist, wishlistById });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center gap-2">
            <button
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={() => {
                const input = {
                  authorId: 1,
                  listName: "Nyårslista",
                  dueDate: new Date("2022-12-30"),
                  belongsToUser: true,
                };
                addList.mutateAsync(input);
              }}
            >
              Lägg till nyårslista
            </button>
          </div>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/create"
          >
            Skapa din lista
          </Link>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
