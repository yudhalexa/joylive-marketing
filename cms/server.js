require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/drive.readonly']
);

const drive = google.drive({ version: 'v3', auth });

app.get('/api/media', async (req, res) => {
  try {
    const response = await drive.files.list({
      q: `'${process.env.FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink)',
    });
    res.json(response.data.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/file/:id', async (req, res) => {
  const file = await drive.files.get(
    { fileId: req.params.id, alt: 'media' },
    { responseType: 'stream' }
  );
  file.data.pipe(res);
});

app.listen(3000, () => console.log('Server running on port 3000'));