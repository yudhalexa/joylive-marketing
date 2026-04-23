const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const path = require('path');

const app = express();
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  exposedHeaders: ['Content-Type', 'Content-Length']
}));

app.use('/marketing-assets', express.static(path.join(__dirname, '../marketing-assets')));

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, 'credentials.json'),
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

app.get('/api/media', async (req, res) => {
  try {
    const ROOT = process.env.DRIVE_FOLDER_ID;

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

app.get('/api/file/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const authClient = await auth.getClient();
    const tokenRes = await authClient.getAccessToken();
    const accessToken = tokenRes.token;

    if (!accessToken) {
      console.error('No access token retrieved!');
      return res.status(500).json({ error: 'Failed to get access token' });
    }

    console.log('Access token OK:', accessToken.slice(0, 20) + '...');

    const meta = await drive.files.get({ fileId: id, fields: 'mimeType, size' });
    const mimeType = meta.data.mimeType;
    const fileSize = parseInt(meta.data.size);

    const driveUrl = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (req.headers.range) {
      headers['Range'] = req.headers.range;
    }

    const driveRes = await fetch(driveUrl, { headers });

    console.log('Drive response status:', driveRes.status);

    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', mimeType);

    res.status(driveRes.status);
    if (driveRes.headers.get('content-range')) {
      res.setHeader('Content-Range', driveRes.headers.get('content-range'));
    }
    if (driveRes.headers.get('content-length')) {
      res.setHeader('Content-Length', driveRes.headers.get('content-length'));
    }

    driveRes.body.pipe(res);

  } catch (err) {
    console.error('File endpoint error:', err);
    res.status(500).json({ error: err.message });
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});