var axios = require('axios');
var hermitChannelData;
var hermitData;

const WEB_API = process.env.VUE_APP_ENDPOINT_URL

// Get Channels

function setData(data) {
  hermitChannelData = data;
}

function getData() {
  return hermitChannelData;
}

async function fetchChannels() {
  await axios
    .get(`${WEB_API}/api/hermit/all`)
    .then(json => setData(json))
}

function setChannelData(data) {
  hermitData = data;
}

function getChannelData() {
  return hermitData;
}

async function fetchChannel(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}`)
    .then(json => setChannelData(json))
}

// Get Videos

var videos;

function setChannelVideos(data) {
  videos = data;
}

function getChannelVideos() {
  return videos;
}

async function fetchChannelVideos(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/videos`)
    .then(json => setChannelVideos(json));
}

// Get Groups

var groups;

function setHermitGroups(data) {
  groups = data;
}

function getHermitGroups() {
  return groups;
}

async function fetchHermitGroups(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/groups`)
    .then(json => setHermitGroups(json));
}

// Get Livestreams

var livestreams;

function setLivestreams(data) {
  livestreams = data;
}

function getLivestreams() {
  return livestreams;
}

async function fetchLivestreams() {
  await axios
    .get(`${WEB_API}/api/livestream`)
    .then(json => setLivestreams(json));
}

// Get Livestream Status

var livestreamStatus;

function setLivestreamStatus(data) {
  livestreamStatus = data;
}

function getLivestreamStatus() {
  return livestreamStatus;
}

async function fetchLivestreamStatus() {
  await axios
    .get(`${WEB_API}/api/livestream/status`)
    .then(json => setLivestreamStatus(json));
}

export {
  fetchChannels,
  getData,

  fetchChannel,
  getChannelData,

  fetchChannelVideos,
  getChannelVideos,

  fetchHermitGroups,
  getHermitGroups,

  fetchLivestreams,
  getLivestreams,

  fetchLivestreamStatus,
  getLivestreamStatus
};