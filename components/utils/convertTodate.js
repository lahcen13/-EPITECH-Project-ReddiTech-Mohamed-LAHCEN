import moment from 'moment'

const addToCurrentDate = (seconds) => {
    if (!seconds) throw 'seconds parameter must be valid'
    return moment().add(seconds, 'seconds')
}



export default addToCurrentDate