// File: api/validate-license.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { licenseCode } = req.body;

  // Ambil daftar lisensi dari Environment Variable di Vercel
  // Kode-kode ini disimpan sebagai satu string panjang yang dipisahkan koma
  const licenseListString = process.env.LICENSE_CODES || "";
  const validLicenses = new Set(licenseListString.split(','));

  if (!licenseCode) {
    return res.status(400).json({ valid: false, message: 'License code is required.' });
  }

  // Periksa apakah kode yang dimasukkan ada di dalam daftar
  if (validLicenses.has(licenseCode.trim())) {
    return res.status(200).json({ valid: true });
  } else {
    return res.status(200).json({ valid: false });
  }
}
