/* Requirements */
var axios = require('axios');

/* Variables */
// const WEB_API = process.env.VUE_APP_ENDPOINT_URL
const WEB_API = "http://localhost:5000"

var hermitGroups;
var groupList;
var groupMembers;

/* Get hermit's associated groups */
function setHermitGroup(data) {
  hermitGroups = data;
}

function getHermitGroup() {
  return hermitGroups.data;
}

async function fetchHermitGroup(channel) {
  await axios
    .get(`${WEB_API}/api/hermit/user/${channel}/groups`)
    .then(json => setHermitGroup(json))
}

/* Get all groups */
function setGroupList(data) {
  groupList = data;
}

function getGroupList() {
  return groupList.data;
}

async function fetchGroupList() {
  await axios
    .get(`${WEB_API}/api/group/all`)
    .then(json => setGroupList(json))
}

/* Get group and its members */
function setGroupMembers(data) {
  groupMembers = data;
}

function getGroupMembers() {
  return groupMembers.data;
}

async function fetchGroupMembers(name) {
  await axios
    .get(`${WEB_API}/api/group/${name}`)
    .then(json => setGroupMembers(json))
}



export {
  fetchHermitGroup,
  fetchGroupList,
  fetchGroupMembers,

  getHermitGroup,
  getGroupList,
  getGroupMembers,
};