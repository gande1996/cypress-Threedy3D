export class DateUtils {

    getMonthNumber(monthName: string): number {

        const months = {

            'January': '1',
            'February': '2',
            'March': '3',
            'April': '4',
            'May': '5',
            'June': '6',
            'July': '7',
            'August': '8',
            'September': '9',
            'October': '10',
            'November': '11',
            'December': '12'
        }
        return months[monthName]
    }
    getMonthNumberFromShortMonth(monthName: string): number {

        const months = {
            'Jan': '1',
            'Feb': '2',
            'Mar': '3',
            'Apr': '4',
            'May': '5',
            'Jun': '6',
            'Jul': '7',
            'Aug': '8',
            'Sep': '9',
            'Oct': '10',
            'Nov': '11',
            'Dec': '12'
        }
        return months[monthName]
    }


    getMonth(monthNumber: number): string {

        const months_shortForm = {

            '1': 'Jan',
            '2': 'Feb',
            '3': 'Mar',
            '4': 'Apr',
            '5': 'May',
            '6': 'Jun',
            '7': 'Jul',
            '8': 'Aug',
            '9': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec'
        }
        return months_shortForm[monthNumber]
    }


    
    addBusinessDays(year: string, day:string, month:string, lags: number): Date {
    
        /*
            This calculate the addition and deletion in dates as per business day 
            yearDayMonth = date string: 'YYYYMMDD'
            lags = business days to add or subtract (-)     
            returns date object
        */
        const yearDayMonth =year+day+month
        const aDate = new Date(year + '-' + month + '-' + day)
        if (!isNaN(parseInt(yearDayMonth)) && parseInt(yearDayMonth) != 0) {
            let numWeeks = Math.floor(Math.abs(lags) / 5)
            let numDays = (Math.abs(lags) % 5) 
            let dayOfWeek = aDate.getDay()	// Mo = 1, Su = 0
            if (dayOfWeek == 0) dayOfWeek = 7	// Su

            if (numDays == 0) {
                numDays = 5
                numWeeks -= 1
            }

            if (lags < 0)
                numDays = numDays + ((dayOfWeek - numDays) < 1 ? 2 : 0) + (dayOfWeek > 5 ? dayOfWeek - 6 : 0)
            else if ((dayOfWeek + numDays) > 5)
                numDays = (numDays + 2) - (dayOfWeek > 5 ? dayOfWeek - 5 : 0)

            numDays = (((numWeeks * 7) + numDays) * 1000 * 60 * 60 * 24)

            if (lags < 0)
                aDate.setTime(aDate.getTime() - numDays)
            else
                aDate.setTime(aDate.getTime() + numDays)
        }

        return (aDate)
    }

}
