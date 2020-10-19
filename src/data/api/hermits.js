/* Requirements */
var axios = require('axios');

/* Variables */
// const WEB_API = process.env.VUE_APP_ENDPOINT_URL
const WEB_API = "http://localhost:5000"

var hermitChannels;
var hermitActiveRecentVideos;
var hermitData;
var hermitVideos;
var hermitSocials;

/* Get all channels */
function setHermitChannels(data) {
  hermitChannels = data;
}

function getHermitChannels() {
  return hermitChannels.data;
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
  return hermitActiveRecentVideos.data;
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
  return hermitData.data;
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
  return hermitVideos.data;
}

async function fetchHermitVideos(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/videos`)
    .then(json => setHermitVideos(json));
}

/* Get channel socials by username as filter */
function setHermitSocials(data) {
  hermitSocials = data;
}

function getHermitSocials() {
  return hermitSocials.data;
}

async function fetchHermitSocials(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/socials`)
    .then(json => setHermitSocials(json));
}



export {
  fetchHermitChannels,
  fetchHermitActiveRecentVideos,
  fetchHermitData,
  fetchHermitVideos,
  fetchHermitSocials,

  getHermitChannels,
  getHermitActiveRecentVideos,
  getHermitData,
  getHermitVideos,
  getHermitSocials
};