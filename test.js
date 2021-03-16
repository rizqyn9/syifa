const moment = require('moment')
const {DateTime}= require('luxon')
var date = DateTime.local()

// console.log(date);

// console.log(DateTime.now().toFormat('MMMM dd, yyyy'));


let data = DateTime.fromISO("2021-03-16T01:55:57.484+00:00");

console.log(data);