import { useState } from 'react';

function UpdateSheetPage() {
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
            const response = await fetch('/api/updateSheet', {
                method: 'PUT', // Correct method
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
                setMessage(`Data successfully updated \n Link: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
            } else {
                setMessage(`Failed to update: ${data.error.message}`);
            }
        } catch (error) {
            setMessage('Failed to send data to the server');
            console.error('Submit error:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Update Google Spreadsheet Data</h1>
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
                        placeholder='Example: [["Item", "Cost", "Stocked", "Ship Date"], ["Wheel", "$20.50", "4", "3/1/2016"], ...]'
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>Update Data</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateSheetPage;
