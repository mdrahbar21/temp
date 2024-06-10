import { useState } from 'react';

function AppendSheetPage() {
    const [spreadsheetId, setSpreadsheetId] = useState('');
    const [range, setRange] = useState('');
    const [values, setValues] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/appendSheet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spreadsheetId,
                    range,
                    values: JSON.parse(values)  // Assumes input is a JSON string
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Data successfully appended');
            } else {
                setMessage(`Failed to append data: ${data.error.message}`);
            }
        } catch (error) {
            setMessage('Failed to send data to the server');
            console.error('Submit error:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Append Values to Google Spreadsheet</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="spreadsheetId">Spreadsheet ID:</label>
                    <input
                        id="spreadsheetId"
                        type="text"
                        value={spreadsheetId}
                        onChange={(e) => setSpreadsheetId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="range">Range:</label>
                    <input
                        id="range"
                        type="text"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="values">Values (JSON format):</label>
                    <textarea
                        id="values"
                        rows="10"
                        cols="50"
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                        placeholder='Example: [["Door", "$15", "2", "3/15/2016"], ["Engine", "$100", "1", "3/20/2016"]]'
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>Append Data</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AppendSheetPage;
