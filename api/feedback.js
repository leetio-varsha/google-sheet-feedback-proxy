export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, rating, comment, submittedAt } = req.body;

    try {
        const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({ userId, rating, comment, submittedAt }),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.text();

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to submit to Google Sheet', result });
        }

        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}