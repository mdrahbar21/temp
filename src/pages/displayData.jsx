import { useState } from 'react';

export default function SheetsPage() {
    const [spreadsheetId, setSpreadsheetId] = useState('');
    const [range, setRange] = useState('');
    const [sheetData, setSheetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/sheetData', { // Ensure this endpoint matches your API configuration
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ spreadsheetId, range }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            if (jsonData.values) {
                setSheetData(jsonData.values);
                setError('');
            } else {
                setError('No data received');
                setSheetData([]);
            }
        } catch (err) {
            console.error('Failed to fetch:', err);
            setError('Failed to fetch data');
            setSheetData([]);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Google Sheets Data Fetcher</h1>
            <form onSubmit={fetchData}>
                <label htmlFor="spreadsheetId">Spreadsheet ID:</label>
                <input
                    id="spreadsheetId"
                    type="text"
                    value={spreadsheetId}
                    onChange={(e) => setSpreadsheetId(e.target.value)}
                    required
                />
                <label htmlFor="range">Range:</label>
                <input
                    id="range"
                    type="text"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    required
                />
                <button type="submit">Fetch Data</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            {sheetData[0] && sheetData[0].map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sheetData.slice(1).map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
