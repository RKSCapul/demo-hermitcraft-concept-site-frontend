/* Requirements */
var axios = require('axios');

/* Variables */
const WEB_API = process.env.VUE_APP_ENDPOINT_URL;

var hermitLive;
var liveActiveHermits;
var liveSchedule;
var liveSlotStatus;

/* Get livestream state per hermit using username filter */
function setHermitLive(data) {
  hermitLive = data;
}

function getHermitLive() {
  return hermitLive.data;
}

async function fetchHermitLive(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/live`)
    .then(json => setHermitLive(json))
}

/* Get livestream state of active hermits */
function setLiveActiveHermits(data) {
  liveActiveHermits = data;
}

function getLiveActiveHermits() {
  return liveActiveHermits.data;
}

async function fetchLiveActiveHermits() {
  await axios
    .get(`${WEB_API}/api/live/activehermits`)
    .then(json => setLiveActiveHermits(json))
}

/* Get livestream schedules */
function setLiveSchedule(data) {
  liveSchedule = data;
}

function getLiveSchedule() {
  return liveSchedule.data;
}

async function fetchLiveSchedule() {
  await axios
    .get(`${WEB_API}/api/live/schedules`)
    .then(json => setLiveSchedule(json))
}

/* Get livestream state of ongoing schedule */
function setLiveSlotStatus(data) {
  liveSlotStatus = data;
}

function getLiveSlotStatus() {
  return liveSlotStatus.data;
}

async function fetchLiveSlotStatus() {
  await axios
    .get(`${WEB_API}/api/live/status`)
    .then(json => setLiveSlotStatus(json));
}



export {
  fetchHermitLive,
  fetchLiveActiveHermits,
  fetchLiveSchedule,
  fetchLiveSlotStatus,

  getHermitLive,
  getLiveActiveHermits,
  getLiveSchedule,
  getLiveSlotStatus,
};