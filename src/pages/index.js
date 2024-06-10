import Link from 'next/link';


export default function Home() {
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
        </div>
    );
}
