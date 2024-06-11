import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {

    const { data: session } = useSession();
    
    if (session) {
    return (
        <div className='bg-black text-white'>
            <h1>Google Sheets Operations</h1>
            <br />
            <br />
            <h2>Choose an operation:</h2>
            <br />
            <nav>
                <ul>
                    <li className=''>
                        <Link href="/displayData" legacyBehavior>
                            <a>1. Fetch Sheet Data </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/appendData" legacyBehavior>
                            <a>2. Append to Sheet</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/updateData" legacyBehavior>
                            <a>3. Update Sheet</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <br />
            <button onClick={() => signOut('google')}>Sign out</button>

        </div>
    )
};
    return (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      );
}
