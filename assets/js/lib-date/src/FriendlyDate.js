// Utility functions that manipulate JS dates

const MILLISECONDS = 1000;




class FriendlyDate {


    constructor(date) {
        this.date = date;
    }


    /*
            this.dateTime = getDate(day.dt);
        this.monthNumber = this.dateTime.getMonth() + 1;
        this.dayOfMonth = this.dateTime.getDate();
        */

    // returns a string that represents the day of the week based on a JS date object
    dayOfWeek() {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekday = this.date.getDay();
        return dayNames[weekday];
    }

    dayOfMonth() {
        return this.date.getDate();
    }

    monthNumber() {
        return this.date.getMonth() + 1;
    }



    // NOTE: JavaScript Date constructor take a unit of time in MILLISECONDS:
    // An integer value representing the timestamp (the number of milliseconds since midnight at the beginning of January 1, 1970, UTC — a.k.a. the epoch).
    static newFromUnixTimestamp(unixTimestamp, timezoneOffset) {
        let theDate = !timezoneOffset ? new Date(unixTimestamp * MILLISECONDS) : new Date((unixTimestamp - timezoneOffset) * MILLISECONDS);

        return new FriendlyDate(theDate);
    }

}

export default FriendlyDate;