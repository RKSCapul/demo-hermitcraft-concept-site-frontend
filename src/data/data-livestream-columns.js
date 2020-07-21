const columns = [
  {
    label: 'Hermit',
    name: 'hermit',
    field: 'hermit',
    align: 'left'
  },
  {
    label: 'BST',
    name: 'timeBST',
    field: row => row.time[0].slot,
    align: 'center',
  },
  {
    label: 'CEST',
    name: 'timeCEST',
    field: row => row.time[1].slot,
    align: 'center'
  },
  {
    label: 'EST',
    name: 'timeEST',
    field:  row => row.time[2].slot,
    align: 'center'
  },
  {
    label: 'CST',
    name: 'timeCST',
    field: row => row.time[3].slot,
    align: 'center'
  },
  {
    label: 'PST',
    name: 'timePST',
    field:  row => row.time[4].slot,
    align: 'center'
  },
  {
    label: 'Your Area',
    name: 'timeYourArea',
    field:  row => row.time[5].slot,
    align: 'center'
  }
];

export default columns;