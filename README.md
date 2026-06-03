[![Figma Prototype](https://img.shields.io/badge/Figma-4B0738?logo=figma&logoColor=white)](https://www.figma.com/proto/4JyjKDtydJk6yrQaXoldvu/Video-Marketing-Joylive---Mobile?node-id=362-3700&t=UqhWWzIQLQu4Zmzm-1)
![HTML](https://img.shields.io/badge/HTML/CSS-BF1E2D?logo=htmx)
![JS](https://img.shields.io/badge/JavaScript-BF1E2D?logo=javascript&logoColor=white)
[![Node.js](https://img.shields.io/badge/Node.js-0C6E77?logo=nodedotjs&logoColor=white)](https://nodejs.org/en/download)
[![Apache](https://img.shields.io/badge/Apache-0C6E77?logo=apache&logoColor=white)](https://httpd.apache.org/download.cgi)
[![Laragon](https://img.shields.io/badge/Laragon-46C0CB?logo=laragon&logoColor=white)](https://laragon.org/download)

# Project Details
This is a project from my 5-month internship at Joylive BSD City. From a single concept, everything was sketched, drafted, designed, prototyped, coded, and launched from scratch.

## Features
<!-- <p align="center">
  <img src="docs/screenshot.jpeg" width="200" border="1">
</p> -->

The site offers a highlight reel-like interface to display a digital showcase of rooms and facilities at [Joylive BSD City](https://www.google.com/maps/place/Joylive+BSD+City/@-6.302943,106.638214,17z/data=!4m9!3m8!1s0x2e69fb736dab5b15:0x62b024ef8f72d35f!5m2!4m1!1i2!8m2!3d-6.3029434!4d106.6382135!16s%2Fg%2F11rws99_jb?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D), which are listed below.
* Rooms (Superior/Deluxe)
* 3 Meeting Spaces
* *Soul Kitchen* Restaurant
* Gym
* Laundromat
* Musholla

<!-- <p align="center">
  <img src="docs/reel-scroll.gif" alt="Reel Scroll" width="200" border="1">
  &nbsp;&nbsp;&nbsp;
  <img src="docs/video-clicked.gif" alt="Video Clicked" width="200" border="1">
</p> -->

Once a room icon is clicked, a video of its tour will play with custom controls, as well as the hotel's jingle on loop which can be turned off anytime through the floating icon on the bottom right.

## Usage
### Requirements
- Node.js
- PM2
- `.env` file with service account details
- `credentials.json` with API credentials

This website uses a Google Drive folder with a service account to provide a CMS-like mechanism for hotel staff to change content anytime. It requires a separate Node server to run in the background for the Google API to fetch and load the media from the Drive folder.

``` cmd
npm install -g pm2
```
Navigate to the `cms` folder and run `npm install` which will install the requirements for the Express server and Google Drive API to run.
``` cmd
cd cms
npm install
```
Once everything is installed, register PM2 as a startup service for the server to run automatically. The startup only needs to be done once.

> Windows only.
``` cmd
pm2-windows-startup install
```
OR
``` cmd
npx pm2-windows-startup install
```
After PM2 is registered, start the server and save.
``` cmd
pm2 start ecosystem.config.js --env production
pm2 save
```
The server will now start automatically, but might take a while for the media to load.

## License
MIT