import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";

export default function Protected() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Handle the unauthenticated state
      window.location.href = '/login';
    },
  });

  useEffect(() => {
    if (session) {
      console.log('Access token:', session.accessToken);
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>If you see this, you are logged in.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
