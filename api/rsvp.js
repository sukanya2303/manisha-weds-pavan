import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      full_name,
      email,
      attending,
      guests,
      allergies,
      message
    } = req.body;

    // ✅ Modern Google Auth (FIXES 401)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // private_key: process.env.GOOGLE_PRIVATE_KEY
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const sheets = google.sheets({
      version: "v4",
      auth: await auth.getClient()
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toLocaleString(),
          full_name,
          email,
          attending,
          guests,
          allergies,
          message
        ]]
      }
    });

    return res.status(200).json({
      success: true,
      message: "RSVP received 💌 Thank you!"
    });

  } catch (err) {
    console.error("RSVP ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Submission failed"
    });
  }
}
