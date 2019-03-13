export class DateUtil {
    
    static validarDataBr(dateString: string): boolean{
        try{
            var dateArray = dateString.split("/");
            var year = Number.parseInt(dateArray[2]);
            var month = Number.parseInt(dateArray[1]);
            var day = Number.parseInt(dateArray[0]);
            var dayString = day.toString();
            var monthString = month.toString();
            if(day < 10){
                dayString = '0' + day;
            }
            if(month < 10){
                monthString = '0' + month;
            }
            var date = new Date(year + '-' + monthString + '-' + dayString + 'T00:00:00');
            var d = date.getDate();
            var m = date.getUTCMonth() + 1;
            var y = date.getFullYear();
            return d == day && m == month && y == year;
        }catch(e){
            return false;
        }
    }

    static parseStringDate(dateString: string): Date{
        var dateArray = dateString.split("/");
        var year = Number.parseInt(dateArray[2]);
        var month = Number.parseInt(dateArray[1]);
        var day = Number.parseInt(dateArray[0]);
        var dayString = day.toString();
        var monthString = month.toString();
        if(day < 10){
            dayString = '0' + day;
        }
        if(month < 10){
            monthString = '0' + month;
        }
        var date = new Date(year + '-' + monthString + '-' + dayString + 'T00:00:00');
        return date;
    }
   
}
   