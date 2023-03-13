const moment = require('moment-timezone');

function getRelativeTime (date) {
    const timezone = moment.tz.guess();
    const offsetTime = moment().tz(timezone).utcOffset();
    const d = moment(date);
    const cd = d.add(offsetTime, 'miniutes');
    const t = moment();
    if (t.diff(cd, 'days') > 30) {
        cd.format('MMM Do YY');
    } else {
        return cd.startOf('minute').fromNow();
    }        
}

module.exports = {
    getRelativeTime,
}