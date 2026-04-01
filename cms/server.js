const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());

const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

app.get('/api/media', async (req, res) => {
  try {
    const response = await drive.files.list({
      q: `'17skfr62D6b-PxUR__XBYf_Q-TfJUgefT' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink)',
    });
    res.json(response.data.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/file/:id', async (req, res) => {
  try {
    const file = await drive.files.get(
      { fileId: req.params.id, alt: 'media' },
      { responseType: 'stream' }
    );
    res.setHeader('Content-Type', file.headers['content-type']);
    file.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));