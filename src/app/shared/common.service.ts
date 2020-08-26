import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CommonService {

    getTimeFromDateInHHMMFormat(inputDate: string) {
        let date = new Date(inputDate);
        let hour = date.getUTCHours().toString().padStart(2, '0');;
        let minute = date.getUTCMinutes().toString().padStart(2, '0');;
        return this.getDisplayFormatInHHMM(hour, minute, ':');
    }

    getTimeFromMinutesInHHMMFormat(minutes: number) {
        let divisor = minutes / 60;
        let remainder = minutes % 60;
        let hour = parseInt(divisor.toString()).toString().padStart(2, '0');
        let minute = parseInt(remainder.toString()).toString().padStart(2, '0');
        return this.getDisplayFormatInHHMM(hour, minute, ':');
    }

    private getDisplayFormatInHHMM(hour: string, minute: string, seperator: string): string {
        return (hour + seperator + minute);
    }

    calculateMinutes(time: string) {
        if (time) {
          let lunchEndHour = Number(time.substr(0, time.indexOf(':')));
          let lunchEndMinutes = Number(time.substr(time.indexOf(':') + 1, time.length));
          return (lunchEndHour * 60 + lunchEndMinutes);
        }
        else {
          return null;
        }
    
      }



}