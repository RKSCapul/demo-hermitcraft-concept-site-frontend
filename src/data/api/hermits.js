/* Requirements */
var axios = require('axios');

/* Variables */
const WEB_API = process.env.VUE_APP_ENDPOINT_URL

var hermitChannels;
var hermitActiveRecentVideos;
var hermitData;
var hermitVideos;

/* Get all channels */
function setHermitChannels(data) {
  hermitChannels = data;
}

function getHermitChannels() {
  return hermitChannels;
}

async function fetchHermitChannels() {
  await axios
    .get(`${WEB_API}/api/hermit/all`)
    .then(json => setHermitChannels(json))
}

/* Get all recent videos from active hermits */
function setHermitActiveRecentVideos(data) {
  hermitActiveRecentVideos = data;
}

function getHermitActiveRecentVideos() {
  return hermitActiveRecentVideos;
}

async function fetchHermitActiveRecentVideos() {
  await axios
    .get(`${WEB_API}/api/hermit/all/videos`)
    .then(json => setHermitActiveRecentVideos(json))
}

/* Get channel by username as filter. */
function setHermitData(data) {
  hermitData = data;
}

function getHermitData() {
  return hermitData;
}

async function fetchHermitData(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}`)
    .then(json => setHermitData(json))
}

/* Get channel videos by username as filters */
function setHermitVideos(data) {
  hermitVideos = data;
}

function getHermitVideos() {
  return hermitVideos;
}

async function fetchHermitVideos(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/videos`)
    .then(json => setHermitVideos(json));
}



export {
  fetchHermitChannels,
  fetchHermitActiveRecentVideos,
  fetchHermitData,
  fetchHermitVideos,

  getHermitChannels,
  getHermitActiveRecentVideos,
  getHermitData,
  getHermitVideos
};