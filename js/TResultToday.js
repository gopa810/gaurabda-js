class TResultToday
{
	constructor()
	{
		this.calendar = new TResultCalendar()
		this.currentDay = new GregorianDateTime()
	}

	// GregoriandateTime, GCLocation
	Calculate(dateTime, location)
	{
		var vc2 = new GregorianDateTime();
		this.currentDay = new GregorianDateTime();
		this.currentDay.Set(dateTime);
		this.currentDay.InitWeekDay();
		vc2.Set(currentDay);

		vc2.TimezoneHours = location.OffsetUtcHours;
		vc2.PreviousDay();
		vc2.PreviousDay();
		vc2.PreviousDay();
		vc2.PreviousDay();
		this.calendar = new TResultCalendar();
		this.calendar.CalculateCalendar(location, vc2, 9);

	}


	GetCurrentDay()
	{
		var i = this.calendar.FindDate(this.currentDay);
		return this.calendar.GetDay(i);
	}

}
