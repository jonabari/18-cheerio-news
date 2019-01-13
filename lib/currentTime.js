const moment = require('moment')

const timeStamp = () => {
  let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
  return currentTime
}

module.exports = timeStamp()
