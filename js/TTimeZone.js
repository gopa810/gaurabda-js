

var TimeZoneList = []
var TimeZoneList_Modified = false
var TTimeZone_Default = null

class TTimeZone {
	constructor(data) {
		this.Valid = true
		this.Name = ""
		this.OffsetMinutes = 0
		this.BiasMinutes = 0
		this.StartDst = new TTimeZoneDst()
		this.EndDst = new TTimeZoneDst()
		this.CountryISOCode = ""
		if (data != undefined) {
			if (data.length != 12) {
				console.log('data is not correct for timezone creation: ', data)
			} else {
				this.Name = data[0];
				this.OffsetMinutes = data[1];
				this.BiasMinutes = data[2];
				this.StartDst.Type = data[3];
				this.StartDst.Month = data[4];
				this.StartDst.Week = data[5];
				this.StartDst.Day = data[6];
				this.EndDst.Type = data[7];
				this.EndDst.Month = data[8];
				this.EndDst.Week = data[9];
				this.EndDst.Day = data[10];
				this.TimezoneId = data[11];
			}
		}
	}

	/*public static List<TTimeZone> TimeZoneList = new List<TTimeZone>();
	public static bool Modified = false;
	private static TTimeZone p_defaultTimezone = null;*/


	toString() {
		return TTimeZone.GetTimeZoneOffsetText(this.OffsetMinutes/60.0) + " " + this.Name
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

	get TimeZoneOffsetText() {
		return TTimeZone.GetTimeZoneOffsetText(this.OffsetMinutes/60);
	}

	static GetTimeZoneOffsetText(d)
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

	static FindTimeZoneById(tzid) {
		for (var i of TimeZoneList) {
			if (i[11] == tzid) {
				return new TTimeZone(i);
			}
		}

		return this.GetDefaultTimeZone();
	}

	static FindTimeZoneByName(p_timezonename) {
		for (var i of TimeZoneList) {
			if (i[0] == p_timezonename) {
				return new TTimeZone(i);
			}
		}

		return this.GetDefaultTimeZone();
	}

	static GetDefaultTimeZone()
	{
		if (TTimeZone_Default == null)
		{
			TTimeZone_Default = new TTimeZone();
			TTimeZone_Default.Name = "Undefined";
		}
		return TTimeZone_Default;
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

TimeZoneList = [
	["UTC-12", -720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 399],
	["UTC-11", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 400],
	["Pacific/Apia", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 393],
	["Pacific/Midway", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 353],
	["Pacific/Niue", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270],
	["Pacific/Pago_Pago", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30],
	["UTC-10", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 401],
	["America/Adak", -600, 60, 0, 3, 2, 0, 0, 11, 1, 0, 380],
	["Pacific/Fakaofo", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 337],
	["Pacific/Honolulu", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 381],
	["Pacific/Johnston", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 352],
	["Pacific/Rarotonga", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114],
	["Pacific/Tahiti", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 276],
	["UTC-09:30", -570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 402],
	["Pacific/Marquesas", -570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277],
	["UTC-09", -540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 403],
	["America/Anchorage", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 376],
	["America/Juneau", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 377],
	["America/Nome", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 379],
	["America/Yakutat", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 378],
	["Pacific/Gambier", -540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 278],
	["UTC-08", -480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 404],
	["America/Dawson", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 106],
	["America/Los_Angeles", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 375],
	["America/Tijuana", -480, 60, 0, 4, 1, 0, 0, 10, 5, 0, 256],
	["America/Vancouver", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 104],
	["America/Whitehorse", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 105],
	["Pacific/Pitcairn", -480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 284],
	["UTC-07", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 405],
	["America/Boise", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 372],
	["America/Cambridge_Bay", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 100],
	["America/Chihuahua", -420, 60, 0, 4, 1, 0, 0, 10, 5, 0, 254],
	["America/Dawson_Creek", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103],
	["America/Denver", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 371],
	["America/Edmonton", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 99],
	["America/Hermosillo", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
	["America/Inuvik", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 102],
	["America/Mazatlan", -420, 60, 0, 4, 1, 0, 0, 10, 5, 0, 253],
	["America/Phoenix", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 374],
	["America/Shiprock", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 373],
	["America/Yellowknife", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 101],
	["UTC-06", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 406],
	["America/Belize", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79],
	["America/Cancun", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 250],
	["America/Chicago", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 365],
	["America/Costa_Rica", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124],
	["America/El_Salvador", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 328],
	["America/Guatemala", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172],
	["America/Indiana/Knox", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 361],
	["America/Indiana/Tell_City", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 366],
	["America/Managua", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265],
	["America/Menominee", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 368],
	["America/Merida", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 251],
	["America/Mexico_City", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 249],
	["America/Monterrey", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 252],
	["America/North_Dakota/Center", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 369],
	["America/North_Dakota/New_Salem", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 370],
	["America/Rainy_River", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 96],
	["America/Rankin_Inlet", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 94],
	["America/Regina", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97],
	["America/Swift_Current", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98],
	["America/Tegucigalpa", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 177],
	["America/Winnipeg", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 95],
	["Pacific/Galapagos", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 137],
	["UTC-05", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 407],
	["America/Atikokan", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93],
	["America/Bogota", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123],
	["America/Cayman", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 209],
	["America/Detroit", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 356],
	["America/Eirunepe", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73],
	["America/Grand_Turk", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 331],
	["America/Guayaquil", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136],
	["America/Havana", -300, 60, 0, 0, 0, 0, 0, 0, 0, 0, 125],
	["America/Indiana/Indianapolis", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 359],
	["America/Indiana/Marengo", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 363],
	["America/Indiana/Petersburg", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 367],
	["America/Indiana/Vevay", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 364],
	["America/Indiana/Vincennes", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 360],
	["America/Indiana/Winamac", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 362],
	["America/Iqaluit", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 90],
	["America/Jamaica", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 195],
	["America/Kentucky/Louisville", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 357],
	["America/Kentucky/Monticello", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 358],
	["America/Lima", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 275],
	["America/Montreal", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 86],
	["America/Nassau", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 75],
	["America/New_York", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 355],
	["America/Nipigon", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 88],
	["America/Panama", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 274],
	["America/Pangnirtung", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 91],
	["America/Port-au-Prince", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 179],
	["America/Resolute", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92],
	["America/Rio_Branco", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74],
	["America/Thunder_Bay", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 89],
	["America/Toronto", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 87],
	["Pacific/Easter", -300, 60, 0, 0, 0, 0, 0, 0, 0, 0, 116],
	["UTC-04:30", -270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 408],
	["UTC-04", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 409],
	["America/Anguilla", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
	["America/Antigua", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
	["America/Aruba", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44],
	["America/Barbados", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48],
	["America/Blanc-Sablon", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85],
	["America/Boa_Vista", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71],
	["America/Caracas", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 387],
	["America/Curacao", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
	["America/Dominica", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133],
	["America/Glace_Bay", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 82],
	["America/Goose_Bay", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 84],
	["America/Grenada", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 156],
	["America/Guadeloupe", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 168],
	["America/Guyana", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 175],
	["America/Halifax", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 81],
	["America/La_Paz", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59],
	["America/Manaus", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72],
	["America/Martinique", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 242],
	["America/Moncton", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 83],
	["America/Montserrat", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244],
	["America/Port_of_Spain", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 343],
	["America/Porto_Velho", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70],
	["America/Puerto_Rico", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285],
	["America/Santo_Domingo", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 134],
	["America/St_Kitts", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205],
	["America/St_Lucia", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217],
	["America/St_Thomas", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 389],
	["America/St_Vincent", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 386],
	["America/Thule", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 165],
	["America/Tortola", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 388],
	["Atlantic/Bermuda", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 57],
	["America/Santiago", -240, 60, 0, 0, 0, 0, 0, 0, 0, 0, 115],
	["UTC-03:30", -210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 410],
	["America/St_Johns", -210, 60, 0, 3, 2, 0, 0, 11, 1, 0, 80],
	["UTC-03", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 411],
	["America/Araguaina", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
	["America/Argentina/Buenos_Aires", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 20],
	["America/Argentina/Catamarca", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 24],
	["America/Argentina/Cordoba", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 21],
	["America/Argentina/Jujuy", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 22],
	["America/Argentina/La_Rioja", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 25],
	["America/Argentina/Mendoza", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 27],
	["America/Argentina/Rio_Gallegos", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 28],
	["America/Argentina/San_Juan", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 26],
	["America/Argentina/Tucuman", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 23],
	["America/Argentina/Ushuaia", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 29],
	["America/Asuncion", -180, 60, 0, 10, 3, 0, 0, 3, 2, 0, 291],
	["America/Bahia", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66],
	["America/Belem", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61],
	["America/Campo_Grande", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 68],
	["America/Cayenne", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158],
	["America/Cuiaba", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 69],
	["America/Fortaleza", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62],
	["America/Godthab", -180, 60, 0, 3, 5, 0, 0, 10, 5, 0, 162],
	["America/Maceio", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65],
	["America/Miquelon", -180, 60, 0, 3, 2, 0, 0, 11, 1, 0, 283],
	["America/Montevideo", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 382],
	["America/Paramaribo", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 326],
	["America/Recife", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63],
	["Antarctica/Palmer", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 13],
	["Antarctica/Rothera", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
	["America/Sao_Paulo", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 67],
	["Atlantic/Stanley", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 148],
	["UTC-02", -120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 412],
	["America/Noronha", -120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60],
	["Atlantic/South_Georgia", -120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 171],
	["UTC-01", -60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 413],
	["America/Scoresbysund", -60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 164],
	["Atlantic/Azores", -60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 289],
	["Atlantic/Cape_Verde", -60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126],
	["UTC+00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 414],
	["Africa/Abidjan", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 113],
	["Africa/Accra", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160],
	["Africa/Bamako", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 235],
	["Africa/Banjul", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 166],
	["Africa/Bissau", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174],
	["Africa/Casablanca", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 226],
	["Africa/Conakry", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 167],
	["Africa/Dakar", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 324],
	["Africa/El_Aaiun", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140],
	["Africa/Freetown", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 322],
	["Africa/Lome", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 334],
	["Africa/Monrovia", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 220],
	["Africa/Nouakchott", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243],
	["Africa/Ouagadougou", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51],
	["Africa/Sao_Tome", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 327],
	["America/Danmarkshavn", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163],
	["America/Marigot", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230],
	["America/St_Barthelemy", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56],
	["Atlantic/Canary", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 144],
	["Atlantic/Faroe", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 152],
	["Atlantic/Madeira", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 288],
	["Atlantic/Reykjavik", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192],
	["Atlantic/St_Helena", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 318],
	["Europe/Dublin", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 185],
	["Europe/Guernsey", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 159],
	["Europe/Isle_of_Man", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 187],
	["Europe/Jersey", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 194],
	["Europe/Lisbon", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 287],
	["Europe/London", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 155],
	["Undefined", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	["UTC+01", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 415],
	["Africa/Algiers", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135],
	["Africa/Bangui", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110],
	["Africa/Brazzaville", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111],
	["Africa/Ceuta", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 143],
	["Africa/Douala", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117],
	["Africa/Kinshasa", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108],
	["Africa/Lagos", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 264],
	["Africa/Libreville", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154],
	["Africa/Luanda", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
	["Africa/Malabo", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
	["Africa/Ndjamena", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 332],
	["Africa/Niamey", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 262],
	["Africa/Porto-Novo", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55],
	["Africa/Tunis", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 340],
	["Arctic/Longyearbyen", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 320],
	["Europe/Amsterdam", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 266],
	["Europe/Andorra", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 1],
	["Europe/Belgrade", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 295],
	["Europe/Berlin", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 130],
	["Europe/Bratislava", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 321],
	["Europe/Brussels", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 50],
	["Europe/Budapest", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 180],
	["Europe/Copenhagen", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 132],
	["Europe/Gibraltar", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 161],
	["Europe/Ljubljana", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 319],
	["Europe/Luxembourg", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 223],
	["Europe/Madrid", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 142],
	["Europe/Malta", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 245],
	["Europe/Monaco", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 227],
	["Europe/Oslo", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 267],
	["Europe/Paris", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 153],
	["Europe/Podgorica", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 229],
	["Europe/Prague", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 129],
	["Europe/Rome", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 193],
	["Europe/San_Marino", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 323],
	["Europe/Sarajevo", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 47],
	["Europe/Skopje", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 234],
	["Europe/Stockholm", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 316],
	["Europe/Tirane", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 6],
	["Europe/Vaduz", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 218],
	["Europe/Vatican", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 385],
	["Europe/Vienna", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 31],
	["Europe/Warsaw", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 282],
	["Europe/Zagreb", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 178],
	["Europe/Zurich", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 112],
	["UTC+02", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 416],
	["Africa/Blantyre", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248],
	["Africa/Bujumbura", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54],
	["Africa/Cairo", 120, 60, 0, 3, 5, 6, 0, 10, 5, 0, 139],
	["Africa/Gaborone", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77],
	["Africa/Harare", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 398],
	["Africa/Johannesburg", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 396],
	["Africa/Kigali", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 311],
	["Africa/Lubumbashi", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109],
	["Africa/Lusaka", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 397],
	["Africa/Maputo", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 259],
	["Africa/Maseru", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221],
	["Africa/Mbabane", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 330],
	["Africa/Tripoli", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 225],
	["Africa/Windhoek", 120, 60, 0, 4, 1, 0, 0, 9, 1, 0, 260],
	["Asia/Amman", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 196],
	["Asia/Beirut", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 216],
	["Asia/Damascus", 120, 60, 0, 0, 0, 0, 0, 0, 0, 0, 329],
	["Asia/Gaza", 120, 60, 0, 0, 0, 0, 0, 0, 0, 0, 286],
	["Asia/Jerusalem", 120, 60, 0, 0, 0, 0, 0, 0, 0, 0, 186],
	["Asia/Nicosia", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 128],
	["Europe/Athens", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 170],
	["Europe/Bucharest", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 294],
	["Europe/Chisinau", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 228],
	["Europe/Helsinki", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 146],
	["Europe/Istanbul", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 342],
	["Europe/Kaliningrad", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 296],
	["Europe/Kiev", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 347],
	["Europe/Mariehamn", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 45],
	["Europe/Minsk", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 78],
	["Europe/Riga", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 224],
	["Europe/Simferopol", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 350],
	["Europe/Sofia", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 52],
	["Europe/Tallinn", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 138],
	["Europe/Uzhgorod", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 348],
	["Europe/Vilnius", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 222],
	["Europe/Zaporozhye", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 349],
	["UTC+03", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 417],
	["Africa/Addis_Ababa", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 145],
	["Africa/Asmara", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 141],
	["Africa/Dar_es_Salaam", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 346],
	["Africa/Djibouti", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131],
	["Africa/Kampala", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 351],
	["Africa/Khartoum", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 315],
	["Africa/Mogadishu", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325],
	["Africa/Nairobi", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 198],
	["Antarctica/Syowa", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19],
	["Asia/Aden", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 394],
	["Asia/Baghdad", 180, 60, 0, 9, 5, 0, 0, 4, 1, 0, 190],
	["Asia/Bahrain", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53],
	["Asia/Kuwait", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208],
	["Asia/Qatar", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292],
	["Asia/Riyadh", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 312],
	["Europe/Moscow", 180, 60, 0, 3, 5, 0, 0, 10, 5, 0, 297],
	["Europe/Volgograd", 180, 60, 0, 3, 5, 0, 0, 10, 5, 0, 298],
	["Indian/Antananarivo", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 231],
	["Indian/Comoro", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 204],
	["Indian/Mayotte", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 395],
	["UTC+03:30", 210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 418],
	["Asia/Tehran", 210, 0, 0, 9, 5, 0, 0, 4, 1, 0, 191],
	["UTC+04", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 419],
	["Asia/Baku", 240, 60, 0, 3, 5, 0, 0, 10, 5, 0, 46],
	["Asia/Dubai", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
	["Asia/Muscat", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 273],
	["Asia/Tbilisi", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157],
	["Asia/Yerevan", 240, 60, 0, 3, 5, 0, 0, 10, 5, 0, 7],
	["Europe/Samara", 240, 60, 0, 3, 5, 0, 0, 10, 5, 0, 299],
	["Indian/Mahe", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 314],
	["Indian/Mauritius", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 246],
	["Indian/Reunion", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293],
	["UTC+04:30", 270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 420],
	["Asia/Kabul", 270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	["UTC+05", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 421],
	["Asia/Aqtau", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 213],
	["Asia/Aqtobe", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 212],
	["Asia/Ashgabat", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 339],
	["Asia/Dushanbe", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 336],
	["Asia/Karachi", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 281],
	["Asia/Oral", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214],
	["Asia/Samarkand", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 383],
	["Asia/Tashkent", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 384],
	["Asia/Yekaterinburg", 300, 60, 0, 3, 5, 0, 0, 10, 5, 0, 300],
	["Indian/Kerguelen", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 333],
	["Indian/Maldives", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247],
	["UTC+05:30", 330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 422],
	["Asia/Calcutta", 330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 188],
	["Asia/Colombo", 330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 219],
	["UTC+05:45", 345, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423],
	["Asia/Katmandu", 345, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268],
	["UTC+06", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 424],
	["Antarctica/Mawson", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14],
	["Antarctica/Vostok", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17],
	["Asia/Almaty", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210],
	["Asia/Bishkek", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 199],
	["Asia/Dhaka", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49],
	["Asia/Novosibirsk", 360, 60, 0, 3, 5, 0, 0, 10, 5, 0, 302],
	["Asia/Omsk", 360, 60, 0, 3, 5, 0, 0, 10, 5, 0, 301],
	["Asia/Qyzylorda", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 211],
	["Asia/Thimphu", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76],
	["Indian/Chagos", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 189],
	["UTC+06:30", 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 425],
	["Asia/Rangoon", 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236],
	["Indian/Cocos", 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107],
	["UTC+07", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 426],
	["Antarctica/Davis", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
	["Asia/Bangkok", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 335],
	["Asia/Hovd", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 238],
	["Asia/Jakarta", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 181],
	["Asia/Krasnoyarsk", 420, 60, 0, 3, 5, 0, 0, 10, 5, 0, 303],
	["Asia/Phnom_Penh", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200],
	["Asia/Pontianak", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 182],
	["Asia/Saigon", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 390],
	["Asia/Vientiane", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 215],
	["Indian/Christmas", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127],
	["UTC+08", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 427],
	["Antarctica/Casey", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16],
	["Asia/Brunei", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58],
	["Asia/Chongqing", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120],
	["Asia/Harbin", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119],
	["Asia/Hong_Kong", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 176],
	["Asia/Irkutsk", 480, 60, 0, 3, 5, 0, 0, 10, 5, 0, 304],
	["Asia/Kashgar", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122],
	["Asia/Kuala_Lumpur", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257],
	["Asia/Kuching", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 258],
	["Asia/Macau", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240],
	["Asia/Makassar", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 183],
	["Asia/Manila", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 280],
	["Asia/Shanghai", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 118],
	["Asia/Singapore", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 317],
	["Asia/Taipei", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 345],
	["Asia/Ulaanbaatar", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 237],
	["Asia/Urumqi", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121],
	["Australia/West", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 449],
	["Australia/Perth", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42],
	["UTC+08:45", 525, 0, 0, 0, 0, 0, 0, 0, 0, 0, 428],
	["Australia/Eucla", 525, 60, 0, 10, 1, 0, 0, 4, 1, 0, 43],
	["UTC+09", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 429],
	["Asia/Choibalsan", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239],
	["Asia/Dili", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 338],
	["Asia/Jayapura", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 184],
	["Asia/Pyongyang", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 206],
	["Asia/Seoul", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 207],
	["Asia/Tokyo", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 197],
	["Asia/Yakutsk", 540, 60, 0, 3, 5, 0, 0, 10, 5, 0, 305],
	["Pacific/Palau", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 290],
	["UTC+09:30", 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 430],
	["Australia/Adelaide", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 40],
	["Australia/Broken_Hill", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 37],
	["Australia/Darwin", 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41],
	["Australia/North", 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 444],
	["Australia/Yancowinna", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 450],
	["Australia/South", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 446],
	["UTC+09:45", 585, 0, 0, 0, 0, 0, 0, 0, 0, 0, 431],
	["UTC+10", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 432],
	["Antarctica/DumontDUrville", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
	["Australia/ACT", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 440],
	["Australia/Brisbane", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38],
	["Australia/Canberra", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 441],
	["Australia/Currie", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 34],
	["Australia/Lindeman", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39],
	["Australia/Hobart", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 33],
	["Australia/Melbourne", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 35],
	["Australia/NSW", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 443],
	["Australia/Queensland", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 445],
	["Australia/Sydney", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 36],
	["Australia/Tasmania", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 447],
	["Australia/Victoria", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 448],
	["Asia/Sakhalin", 600, 60, 0, 3, 5, 0, 0, 10, 5, 0, 307],
	["Asia/Vladivostok", 600, 60, 0, 3, 5, 0, 0, 10, 5, 0, 306],
	["Pacific/Guam", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 173],
	["Pacific/Port_Moresby", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 279],
	["Pacific/Saipan", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 241],
	["Pacific/Truk", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149],
	["UTC+10:30", 630, 0, 0, 0, 0, 0, 0, 0, 0, 0, 433],
	["Australia/Lord_Howe", 630, 30, 0, 10, 5, 0, 0, 3, 5, 0, 32],
	["UTC+11", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 434],
	["Asia/Magadan", 660, 60, 0, 3, 5, 0, 0, 10, 5, 0, 308],
	["Pacific/Efate", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 391],
	["Pacific/Guadalcanal", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 313],
	["Pacific/Kosrae", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151],
	["Pacific/Noumea", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261],
	["Pacific/Ponape", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150],
	["UTC+11:30", 690, 0, 0, 0, 0, 0, 0, 0, 0, 0, 435],
	["Pacific/Norfolk", 690, 0, 0, 0, 0, 0, 0, 0, 0, 0, 263],
	["UTC+12", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 436],
	["Asia/Anadyr", 720, 60, 0, 3, 5, 0, 0, 10, 5, 0, 310],
	["Asia/Kamchatka", 720, 60, 0, 3, 5, 0, 0, 10, 5, 0, 309],
	["Pacific/Auckland", 720, 60, 0, 9, 5, 0, 0, 4, 1, 0, 271],
	["Pacific/Fiji", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 147],
	["Pacific/Funafuti", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 344],
	["Pacific/Kwajalein", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233],
	["Pacific/Majuro", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 232],
	["Pacific/Nauru", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 269],
	["Pacific/Tarawa", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201],
	["Pacific/Wake", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 354],
	["Pacific/Wallis", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 392],
	["UTC+12:45", 765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 437],
	["Pacific/Chatham", 825, 60, 0, 9, 5, 0, 0, 4, 1, 0, 272],
	["UTC+13", 780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 438],
	["Antarctica/McMurdo", 780, 60, 0, 9, 5, 0, 0, 4, 1, 0, 10],
	["Antarctica/South_Pole", 780, 60, 0, 9, 5, 0, 0, 4, 1, 0, 11],
	["Pacific/Enderbury", 780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202],
	["Pacific/Tongatapu", 780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 341],
	["UTC+14", 840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 439],
	["Pacific/Kiritimati", 840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 203]
];
