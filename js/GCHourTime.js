class GCHourTime
{
	constructor() {
		this.hour = 0
		this.min = 0
		this.sec = 0
		this.milli = 0

		this.longitude = 0.0
		this.longitudeMoon = 0.0
		this.Ayanamsa = 0.0
	}

	static fromObject(obj)
	{
		var hourtime = new GCHourTime();
		hourtime.Set(obj);
		return hourtime;
	}

	Set(rise)
	{
		// TODO: Complete member initialization
		this.hour = rise.hour;
		this.min = rise.min;
		this.sec = rise.sec;
		this.mili = rise.mili;
		this.longitude = 0.0;
		this.longitudeMoon = 0.0;
		this.Ayanamsa = rise.Ayanamsa;
	}

	static Create(rise,p)
	{
		var nt = new GCHourTime()
		nt.Set(rise)
		nt.AddMinutes(p);
		return nt
	}

	get Tithi()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.longitude - 180.0) / 12.0;
		return GCMath.IntFloor(d);
	}

	get TithiElapse()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.longitude - 180.0) / 12.0;
		return (d - Math.Floor(d)) * 100.0;
	}

	get Paksa()
	{
		return this.Tithi >= 15 ? 1 : 0;
	}

	get Naksatra()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return GCMath.IntFloor(d);
	}

	get NaksatraElapse()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return (d - Math.Floor(d)) * 100.0;
	}

	get NaksatraPada()
	{
		return GCMath.IntFloor(this.NaksatraElapse / 25.0);
	}


	get Yoga()
	{
		var d = GCMath.putIn360(this.longitudeMoon + this.longitude - 2 * this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return GCMath.IntFloor(d);
	}

	get YogaElapse()
	{
		var d = GCMath.putIn360(this.longitudeMoon + this.longitude - 2 * this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return (d - Math.Floor(d)) * 100.0;
	}

	get RasiOfSun()
	{
		return GCRasi.GetRasi(this.longitude, this.Ayanamsa);
	}

	get RasiOfMoon()
	{
		return GCRasi.GetRasi(this.longitudeMoon, this.Ayanamsa);
	}


	get TotalDays()
	{
		return this.hour / 24.0 + this.min / 1440.0 + this.sec / 86400.0 + this.mili / 86400000.0;
	}
	set TotalDays(value)
	{
		this.SetDayTime(value);
	}

	get TotalHours()
	{
		return this.hour + min / 60.0 + this.sec / 3600.0 + this.mili / 3600000.0;
	}

	get TotalMinutes()
	{
		return this.hour * 60.0 + this.min + this.sec / 60.0 + this.mili / 60000.0;
	}

	get TotalSeconds()
	{
		return this.hour * 3600.0 + this.min * 60.0 + this.sec + this.mili / 1000.0;
	}

	ShortSandhyaString()
	{
		var start = GCHourTime.Create(this, -96);
		var end = GCHourTime.Create(this, -48);

		return GCStrings.Format("{0}-{1}", start.ToShortTimeString(), end.ToShortTimeString());
	}

	ShortMuhurtaString(nMuhurta)
	{
		var start = new GCHourTime(this, nMuhurta*48);
		var end = new GCHourTime(this, nMuhurta*48 + 48);

		return GCStrings.Format("{0}-{1}", start.ToShortTimeString(), end.ToShortTimeString());
	}

	IsGreaterThan(dt)
	{
		if (this.hour > dt.hour)
			return true;
		else if (this.hour < dt.hour)
			return false;

		if (this.min > dt.min)
			return true;
		else if (this.min < dt.min)
			return false;

		if (this.sec > dt.sec)
			return true;
		else if (this.sec < dt.sec)
			return false;

		if (this.mili > dt.mili)
			return true;

		return false;
	}


	IsLessThan(dt)
	{
		if (this.hour < dt.hour)
			return true;
		else if (this.hour > dt.hour)
			return false;

		if (this.min < dt.min)
			return true;
		else if (this.min > dt.min)
			return false;

		if (this.sec < dt.sec)
			return true;
		else if (this.sec > dt.sec)
			return false;

		if (this.mili < dt.mili)
			return true;

		return false;
	}

	IsGreaterOrEqualThan(dt)
	{
		if (this.hour >= dt.hour)
			return true;
		else if (this.hour < dt.hour)
			return false;

		if (this.min >= dt.min)
			return true;
		else if (this.min < dt.min)
			return false;

		if (this.sec >= dt.sec)
			return true;
		else if (this.sec < dt.sec)
			return false;

		if (this.mili >= dt.mili)
			return true;

		return false;
	}

	IsLessOrEqualThan(dt)
	{
		if (this.hour <= dt.hour)
			return true;
		else if (this.hour > dt.hour)
			return false;

		if (this.min <= dt.min)
			return true;
		else if (this.min > dt.min)
			return false;

		if (this.sec <= dt.sec)
			return true;
		else if (this.sec > dt.sec)
			return false;

		if (this.mili <= dt.mili)
			return true;

		return false;
	}


	AddMinutes(mn)
	{
		this.min += Convert.ToInt32(Math.floor(mn));
		while (this.min < 0) { this.min += 60; this.hour = this.hour - 1; }
		while (this.min > 59) { this.min -= 60; this.hour = this.hour + 1; }
	}

	GetDayTime()
	{
		return TotalDays;
	}

	GetDayTime(DstOffsetHours)
	{
		return ((Convert.ToDouble(this.hour + DstOffsetHours) * 60.0 + Convert.ToDouble(this.min)) * 60.0 + Convert.ToDouble(this.sec)) / 86400.0;
	}


	SetValue(i)
	{
		this.hour = this.min = this.sec = this.mili = i;
	}

	SetDayTime(d)
	{
		var time_hr = d * 24.0;

		this.hour = Convert.ToInt32(Math.floor(time_hr));

		// minute
		time_hr -= this.hour;
		time_hr *= 60;
		this.min = Convert.ToInt32(Math.floor(time_hr));

		// second
		time_hr -= this.min;
		time_hr *= 60;
		this.sec = Convert.ToInt32(Math.floor(time_hr));

		// miliseconds
		time_hr -= this.sec;
		time_hr *= 1000;
		this.mili = Convert.ToInt32(Math.floor(time_hr));

		return this;
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
		this.hour = Convert.ToInt32(Math.floor(time_hr));

		// minute
		time_hr -= this.hour;
		time_hr *= 60;
		this.min = Convert.ToInt32(Math.floor(time_hr));

		// second
		time_hr -= this.min;
		time_hr *= 60;
		this.sec = Convert.ToInt32(Math.floor(time_hr));

		// miliseconds
		time_hr -= this.sec;
		time_hr *= 1000;
		this.mili = Convert.ToInt32(Math.floor(time_hr));
	}

	ToLongTimeString()
	{
		return Convert.FormatD2(this.hour) + ":" +
			Convert.FormatD2(this.min) + ":" +
			Convert.FormatD2(this.sec)
	}

	ToShortTimeString()
	{
		return Convert.FormatD2(this.hour) + ":" +
			Convert.FormatD2(this.min)
	}

	toString() {
		return sprintf("%02d:%02d", this.hour, this.min);
	}

}
