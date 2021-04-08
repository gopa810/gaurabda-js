

var TimeZoneList = []
var TimeZoneList_Modified = false
var TTimeZone_Default = null

class TTimeZone {
	constructor() {
		this.Valid = true
		this.Name = ""
		this.OffsetMinutes = 0
		this.BiasMinutes = 0
		this.StartDst = new TTimeZoneDst()
		this.EndDst = new TTimeZoneDst()
		this.CountryISOCode = ""
	}

	/*public static List<TTimeZone> TimeZoneList = new List<TTimeZone>();
	public static bool Modified = false;
	private static TTimeZone p_defaultTimezone = null;*/


	ToString() {
		return this.GetTimeZoneOffsetText(this.OffsetMinutes/60.0) + " " + this.Name
	}

	get EncodedString() {
			return GCStrings.Format("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}\t{10}\t{11}",
				Name, OffsetMinutes, BiasMinutes,
				StartDst.Type, StartDst.Month, StartDst.Week, StartDst.Day,
				EndDst.Type, EndDst.Month, EndDst.Week, EndDst.Day, 
				CountryISOCode);
	}
	
	set EncodedString(value)
	{
		var fields = value.split("\t");
		if (fields.length < 9)
		{
			this.Valid = false;
			return;
		}

		this.Name = GCFestivalBase.SafeToString(fields[0]);
		this.OffsetMinutes = ParseInt(fields[1]);
		this.BiasMinutes = ParseInt(fields[2]);
		this.Valid = true;
		this.StartDst.Type = ParseInt(fields[3]);
		this.StartDst.Month = ParseInt(fields[4]);
		this.StartDst.Week = ParseInt(fields[5]);
		this.StartDst.Day = ParseInt(fields[6]);
		this.EndDst.Type = ParseInt(fields[7]);
		this.EndDst.Month = ParseInt(fields[8]);
		this.EndDst.Week = ParseInt(fields[9]);
		this.EndDst.Day = ParseInt(fields[10]);
		this.CountryISOCode = fields[11];
	}


	GetDaylightTimeStartDate(nYear, vcStart) {
		vcStart.day = 1;
		vcStart.month = Convert.ToInt32(StartDst.Month);
		vcStart.year = nYear;
		if (this.StartDst.Type == 1)
		{
			vcStart.day = this.StartDst.Day;
		}
		else
		{
			if (this.StartDst.Month == 5)
			{
				vcStart.day = GregorianDateTime.GetMonthMaxDays(nYear, this.StartDst.Month);
				vcStart.InitWeekDay();
				while (vcStart.dayOfWeek != this.StartDst.Day)
				{
					vcStart.PreviousDay();
					vcStart.dayOfWeek = (vcStart.dayOfWeek + 6) % 7;
				}
			}
			else
			{
				vcStart.day = 1;
				vcStart.InitWeekDay();
				while (vcStart.dayOfWeek != this.StartDst.Day)
				{
					vcStart.NextDay();
					vcStart.dayOfWeek = (vcStart.dayOfWeek + 1) % 7;
				}
				vcStart.day += this.StartDst.Week * 7;
			}
		}
		vcStart.shour = 1 / 24.0;
		return 0;
	}

	GetNormalTimeStartDate(nYear,vcStart)
	{
		vcStart.day = 1;
		vcStart.month = 10;
		vcStart.year = nYear;
		vcStart.shour = 3 / 24.0;
		return 0;
	}

	static GetTimeZoneOffsetText( d)
	{
		var a4, a5;
		var sig;

		if (d < 0.0)
		{
			sig = -1;
			d = -d;
		}
		else
		{
			sig = 1;
		}
		a4 = GCMath.IntFloor(d);
		a5 = Convert.ToInt32((d - a4) * 60);

		return  (sig > 0 ? "+" : "-") + a4 + ":" +  Convert.FormatD2(a5)
	}

	static GetTimeZoneOffsetTextArg(d)
	{
		var a4, a5;
		var sig;

		if (d < 0.0)
		{
			sig = -1;
			d = -d;
		}
		else
		{
			sig = 1;
		}
		a4 = Convert.ToInt32(d);
		a5 = Convert.ToInt32((d - a4) * 60 + 0.5);

		return a4.toString() + (sig > 0 ? 'E' : 'W') + Convert.FormatD2(a5)
	}


	// return values
	// 0 - DST is off, yesterday was off
	// 1 - DST is on, yesterday was off
	// 2 - DST is on, yesterday was on
	// 3 - DST is off, yesterday was on
	//public DstTypeChange DetermineDaylightChange(GregorianDateTime vc2)
	DetermineDaylightChange(vc2) {
		var t2 = this.GetBiasMinutesForDay(vc2);
		var vc3 = new GregorianDateTime();
		vc3.Set(vc2);
		vc3.PreviousDay();
		var t1 = this.GetBiasMinutesForDay(vc3);
		if (t1 != 0)
		{
			if (t2 != 0)
				return DstTypeChange.DstOn;
			else
				return DstTypeChange.DstEnd;
		}
		else if (t2 != 0)
		{
			return DstTypeChange.DstStart;
		}
		else
			return DstTypeChange.DstOff;
	}

	// <summary>
	// 
	// </summary>
	// <param name="vc"></param>
	// <returns>returns 1 if given date has bias</returns>
	GetBiasMinutesForDay(vc) {
		var biasExists = this.BiasMinutes;
		var biasZero = 0;

		if (vc.month == this.StartDst.Month)
		{
			if (this.StartDst.Type == 0)
				return vc.IsEqualOrAfterWeekdayInWeek(this.StartDst.Week, this.StartDst.Day) ? biasExists : biasZero;
			else
				return (vc.day >= this.StartDst.Day) ? biasExists : biasZero;
		}
		else if (vc.month == this.EndDst.Month)
		{
			if (this.EndDst.Type == 0)
				return vc.IsEqualOrAfterWeekdayInWeek(this.EndDst.Week, this.EndDst.Day) ? biasZero : biasExists;
			else
				return (vc.day >= this.EndDst.Day) ? biasZero : biasExists;
		}
		else if (this.StartDst.Month > this.EndDst.Month)
		{
			// zaciatocny mesiac ma vyssie cislo nez koncovy
			// napr. pre australiu
			if ((vc.month > this.StartDst.Month) || (vc.month < this.EndDst.Month))
				return biasExists;
		}
		else
		{
			// zaciatocny mesiac ma nizsie cislo nez koncovy
			// usa, europa, asia
			if ((vc.month > this.StartDst.Month) && (vc.month < this.EndDst.Month))
				return biasExists;
		}

		return biasZero;
	}


	HumanDstText() {
		var ret;

		if (this.BiasMinutes == 0)
		{
			ret = "For this location is Daylight Saving Time not observed."
		}
		else
		{
			ret = ""
			// pre datumovy den
			if (this.StartDst.Type == 1)
			{

				ret += "from " + GCStrings.getString(810 + this.StartDst.Day)
				 + " " + GCStrings.getString(794 + this.StartDst.Month) + " "
			}
			else
			{
				// pre tyzdenny den
				ret += "from "+GCStrings.getString(781 + this.StartDst.Week) + " "
					+ GCStrings.getString(787 + this.StartDst.Day) + " "
					+ GCStrings.getString(794 + this.StartDst.Month) + " "
			}

			if (EndDst.Type == 1)
			{
				ret += "to " + GCStrings.getString(810 + this.EndDst.Day) + " " 
					+ GCStrings.getString(794 + this.EndDst.Month)
			}
			else
			{
				// pre tyzdenny den
				ret += "to " + GCStrings.getString(781 + EndDst.Week) + " "
					+ GCStrings.getString(787 + EndDst.Day) + " " 
					+ GCStrings.getString(794 + EndDst.Month)
			}
		}

		return ret;
	}

	static FindTimeZoneByName(p_timezonename) {
		for (i = 0; i < TTimeZone_TimeZoneList.length; i++) {
			if (TTimeZone_TimeZoneList[i].Name == p_timezonename)
				return TTimeZone_TimeZoneList[i];
		}

		return this.GetDefaultTimeZone();
	}

	static GetDefaultTimeZone()
	{
		if (p_defaultTimezone == null)
		{
			p_defaultTimezone = new TTimeZone();
			p_defaultTimezone.Name = "Undefined";
		}
		return p_defaultTimezone;
	}
}


// <summary>
// Structure for storing data about start or end of daylight saving time system
// </summary>
class TTimeZoneDst {
	// <summary>
	// type of day, 0-day is given as n-th x-day of month, 1- day is given as DATE
	// </summary>
	//public int Type;
	// <summary>
	// Used only for StartDstType = 0, this is 
	// number of week in which day occurs (1,2,3,4 is acceptable, 5 means *last*)
	// </summary>
	//p ublic int Week;
	// <summary>
	// Month: 1,2..12
	// </summary>
	//public int Month;
	// <summary>
	// For StartDstType = 0 : 0 - sunday, 1 - monday, ... 6 - saturday
	// For StartDstType = 1 : 1..31
	// </summary>
	//public int Day;

	constructor()
	{
		this.Type = 0;
		this.Week = 0;
		this.Month = 0;
		this.Day = 0;
	}

	get IntegerValue()
	{
		return (this.Type << 24) + (this.Week << 16) + (this.Month << 8) + this.Day;
	}

	Clear() {
		this.Type = 0;
		this.Week = 0;
		this.Month = 0;
		this.Day = 0;
	}
}


