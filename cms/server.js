const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors({
  origin: '*',
  exposedHeaders: ['Content-Type', 'Content-Length']
}));

const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// app.get('/api/media', async (req, res) => {
//   try {
//     const foldersRes = await drive.files.list({
//       q: `'17skfr62D6b-PxUR__XBYf_Q-TfJUgefT' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
//       fields: 'files(id, name)',
//     });

//     const folders = foldersRes.data.files;

//     const filePromises = folders.map(folder =>
//       drive.files.list({
//         q: `'${folder.id}' in parents and trashed = false`,
//         fields: 'files(id, name, mimeType)',
//       })
//     );

//     const results = await Promise.all(filePromises);
//     const allFiles = results.flatMap(r => r.data.files);

//     res.json(allFiles);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('/api/media', async (req, res) => {
  try {
    const ROOT = '17skfr62D6b-PxUR__XBYf_Q-TfJUgefT';

    const foldersRes = await drive.files.list({
      q: `'${ROOT}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
    });

    const folders = foldersRes.data.files;

    const filePromises = folders.map(folder =>
      drive.files.list({
        q: `'${folder.id}' in parents and trashed = false`,
        fields: 'files(id, name, mimeType)',
      })
    );

    const results = await Promise.all(filePromises);
    const allFiles = results.flatMap(r => r.data.files)
      .filter(f => f.mimeType !== 'application/vnd.google-apps.folder');

    res.json(allFiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const cache = new Map();

app.get('/api/file/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const meta = await drive.files.get(
      { fileId: id, fields: 'mimeType' }
    );

    res.setHeader('Content-Type', meta.data.mimeType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    const file = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );

    file.data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));