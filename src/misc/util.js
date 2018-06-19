import moment from 'moment'

function formatDateTime (date, time) {
    console.log("formatDate", date, time);

    const dateParsed = moment(date).format("dddd, MMMM Do YYYY");

    if (time) {
        return `${dateParsed} — ${time}`;
    }

    return `${dateParsed}`;
}


export {formatDateTime}