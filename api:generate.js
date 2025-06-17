// File: api/generate.js

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Ambil data yang dikirim dari frontend
  const { apiUrl, userPayload } = req.body;
  
  // Ambil kunci API rahasia dari environment variables di Vercel
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: 'API key tidak dikonfigurasi di server.' });
  }

  const finalApiUrl = `${apiUrl}?key=${apiKey}`;

  try {
    const response = await fetch(finalApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }
    
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
}