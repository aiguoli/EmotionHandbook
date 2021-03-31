export default {
  getMonthPeriod: function (year, month) {
    let leapYear
    leapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    const monthTable = {
      1: 31,
      2: leapYear ? 29 : 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    }
    return '' + monthTable[month]
  },
  getStandardDatetime: function (payload) {
    const monthTable = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sept: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    }
    let time = payload.time
    let formatTime = time.slice(0, time.indexOf(time.slice(-13)))
    let te = formatTime.slice(-(formatTime.length - formatTime.indexOf(',') - 2))
    const arr = te.split(' ')
    const month = monthTable[arr[1]]
    return arr[2] + '-' + month + '-' + arr[0]
  }
}
