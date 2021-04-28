
class DAYTIME {

    constructor() {
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
        this.mili = 0;
    }

    SetDayTime(d)
    {
        var time_hr = 0.0;
    
        // hour
        time_hr = d * 24;
        this.hour = parseInt( Math.floor(time_hr) );
    
        // minute
        time_hr -= this.hour;
        time_hr *= 60;
        this.min = parseInt( Math.floor(time_hr) );
    
        // second
        time_hr -= this.min;
        time_hr *= 60;
        this.sec = parseInt( Math.floor(time_hr) );
    
        // miliseconds
        time_hr -= this.sec;
        time_hr *= 1000;
        this.mili = parseInt( Math.floor(time_hr) );
    }

    SetValue(i)
    {
        this.hour = this.min = this.sec = this.mili = i;
    }

    Set(d)
    {
        this.hour = d.hour;
        this.min = d.min;
        this.sec = d.sec;
        this.mili = d.mili;
    }

    ScalarValue()
    {
        return this.milli/1000 + this.sec + this.minute*60 + this.hour*3600;
    }

    IsGreaterThan(dt)
    {
        if (this.ScalarValue() > dt.ScalarValue()) {
            return true;
        }
    }
    
    IsLessThan(dt)
    {
        if (this.ScalarValue() < dt.ScalarValue()) {
            return true;
        }
    }
    
    IsGreaterOrEqualThan(dt)
    {
        if (this.ScalarValue() >= dt.ScalarValue()) {
            return true;
        }
    }
    
    IsLessOrEqualThan(dt)
    {
        if (this.ScalarValue() <= dt.ScalarValue()) {
            return true;
        }
    }
    
    AddMinutes(mn) 
    {
        this.min += mn;
        while(this.min < 0) { this.min += 60; this.hour--;}
        while(this.min > 59) { this.min -= 60; this.hour++;}
    }
    
    GetDayTime()
    {
        return ((double(this.hour)*60.0 + double(this.min))*60.0 + double(this.sec)) / 86400.0;
    }

    ////////////////////////////////////////////////////////////////
    //
    //  Conversion time from DEGREE fromat to H:M:S:MS format
    //
    //  time - output
    //  time_deg - input time in range 0 deg to 360 deg
    //             where 0 deg = 0:00 AM and 360 deg = 12:00 PM
    //
    SetDegTime(time_deg)
    {
        var time_hr = 0.0;

        time_deg = GCMath.putIn360(time_deg);

        // hour
        time_hr = time_deg / 360 * 24;
        this.hour = parseInt( Math.floor(time_hr));

        // minute
        time_hr -= hour;
        time_hr *= 60;
        this.min = parseInt( Math.floor(time_hr));

        // second
        time_hr -= min;
        time_hr *= 60;
        this.sec = parseInt( Math.floor(time_hr));

        // miliseconds
        time_hr -= sec;
        time_hr *= 1000;
        this.mili = parseInt( Math.floor(time_hr));
    }

    ToLongTimeString()
    {
        return sprintf("%02d:%02d:%02d", this.hour, this.min, this.sec);
    } 
}
