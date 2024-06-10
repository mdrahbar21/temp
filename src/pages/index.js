// pages/index.js
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [sheetId, setSheetId] = useState('');
  const [range, setRange] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('You need to be signed in to update a spreadsheet.');
      return;
    }

    const response = await fetch('/api/updateSheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sheetId, range, value, accessToken: session.accessToken })
    });

    const data = await response.json();
    if (data.success) {
      alert('Spreadsheet updated successfully!');
    } else {
      alert('Failed to update the spreadsheet.');
    }
  };

  if (session) {
    return (
      <div>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Sheet ID" value={sheetId} onChange={(e) => setSheetId(e.target.value)} />
          <input type="text" placeholder="Range (e.g., Sheet1!A1)" value={range} onChange={(e) => setRange(e.target.value)} />
          <input type="text" placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
          <button type="submit">Update Spreadsheet</button>
        </form>
      </div>
    );
  }

  return (
    <button onClick={() => signIn('google',{
      redirect: true,
      callbackUrl:location.href})}>Sign in with Google</button>
  );
}
