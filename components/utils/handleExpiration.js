import moment from "moment"
const isExpired = (date) => {
    const currentTimeStamp = moment().format('X')
    const timeStampToCompare = moment(date).format('X')
    if (currentTimeStamp >= timeStampToCompare) return true
    return false
}

export default {
    isExpired
}