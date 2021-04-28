
var GregorianDateTime_Months = [0,31,28,31,30,31,30,31,31,30,31,30,31]
var GregorianDateTime_MonthsOvr = [0,31,29,31,30,31,30,31,31,30,31,30,31]
var GregorianDateTime_MonthAbr = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
var GregorianDateTime_MonthName = ["","January","February","March","April","May","June","July","August","September","October","November","December"]

function GregorianDateTime_Test() {
  var n = new GregorianDateTime()
  var m = new GregorianDateTime()
  m.Set(n)
  m.day = 2
  
  n.AddHours(5.7892)

  document.write("<p>GregporianDateTime test: " + n.c_str())
}


class GregorianDateTime {
	constructor(date) {
		this.Clear()
		if (date != undefined) {
			this.Set(date);
		}
	}
  
	Clear() {
		var d = new Date()
		
		 //this.class = "GregorianDateTime"
		this.day = d.getDate()
		this.month = d.getMonth() + 1
		this.year = d.getYear() + 1900
		this.dayOfWeek = d.getDay()
		this.shour = 0.5
		this.TimezoneHours = 0.0
	}
	
	Today() {
		Clear()
	}
	
	Clone() {
		var dt = new GregorianDateTime()
		dt.Set(this)
		return dt
	}
	
	get triplet() {
		return sprintf('%04d-%02d-%02d', this.year, this.month, this.day);
	}

	static fromTriplet(str) {
		var parts = str.split('-');
		if (parts.length == 3) {
			return GregorianDateTime.fromComponents(parseInt(parts[0], 10),
				parseInt(parts[1], 10), parseInt(parts[2], 10));
		}
		return GregorianDateTime();
	}

	static fromComponents(year, month, day) {
		var d = new GregorianDateTime();
		d.year = year;
		d.month = month;
		d.day = day;
		return d;
	}

	cloneDays(daysOffset) {
		var d = new GregorianDateTime();
		d.Set(this);
		d.AddDays(daysOffset);
		return d;
	}

	static fromDate(date) {
		return new GregorianDateTime(date);
	}

	setOffset(offset) {
		this.TimezoneHours = offset;
		return this;
	}
	
	Set(gdt) {
		if (gdt instanceof GregorianDateTime) {
			this.day = gdt.day
			this.month = gdt.month
			this.year = gdt.year
			this.shour = gdt.shour
			this.dayOfWeek = gdt.dayOfWeek
			this.TimezoneHours = gdt.TimezoneHours
		}
		return this;
	}
	
	SetDate(nYear,nMonth,nDay) {
		this.day = nDay
		this.month = nMonth
		this.year = nYear
		this.shour = 0.5
		this.TimezoneHours = 0.0
		InitWeekDay()
	}
	
	toString() {
		return this.Format("{day} {monthAbr} {year}")
	}
	
	LongTime() {
		return LongTimeString()
	}
  
	get weekday() {
		return this.dayOfWeek;
	}
	
	getStringValue() {
		return toString()
	}

	ShortTimeString() {
		return sprintf("%02d:%02d", this.GetHour(), this.GetMinute());
	}

	LongTimeString() {
		return sprintf("%02d:%02d:%02d", this.GetHour(), this.GetMinute(), this.GetSecond());
	}
	
	c_str() {
		return Convert.FormatS2(this.day) + " " + GregorianDateTime.GetMonthAbreviation(this.month)
			+ " " + Convert.FormatD4(this.year) + "  " + Convert.FormatD2(this.GetHour())
			+ ":" + Convert.FormatD2(this.GetMinute()) + ":" + Convert.FormatD2(this.GetSecond())			
	}
	
	FullString() {
		return this.c_str()
	}
	
	static GetDateTextWithTodayExt(vc)
	{
	    var strRet = this.Format("{day} {month} {year}")
		if ((vc.day > 0) && (vc.day < 32) && (vc.month > 0) && (vc.month < 13) && (vc.year >= 1500) && (vc.year < 4000))
		{
			var today = new GregorianDateTime();
			var diff = today.GetJulianInteger() - vc.GetJulianInteger();
			if (diff == 0)
			{
				strRet += " (Today)" 
			}
			else if (diff == -1)
			{
				strRet += " (Tomorrow)"
			}
			else if (diff == 1)
			{
				strRet += " (Yesterday)"
			}
		}
		return strRet
	}

	
	static TimeSpanToLongString(seconds) {
		var h, m, s;
		s = (int)(seconds % 60);
		m = (int)((seconds / 60) % 60);
		h = (int)(seconds / 3600);
		return Convert.FormatD2(m) + ":" + Convert.FormatD2(m) +
			":" + Convert.FormatD2(s)
	}

	Format(format) {
		var sb = format;

		if (format.search("{day}") >= 0)
			sb = sb.replace("{day}", this.day.toString());
		if (format.search("{month}") >= 0)
			sb = sb.replace("{month}", month.toString());
		if (format.search("{monthAbr}") >= 0)
			sb = sb.replace("{monthAbr}", GregorianDateTime.GetMonthAbreviation(this.month));
		if (format.search("{monthName}") >= 0)
			sb = sb.replace("{monthName}", GregorianDateTime.GetMonthName(this.month));
		if (format.search("{hour}") >= 0)
			sb = sb.replace("{hour}", Convert.FormatD2(this.GetHour()));
		if (format.search("{min}") >= 0)
			sb = sb.replace("{min}", Convert.FormatD2(this.GetMinute()));
		if (format.search("{minRound}") >= 0) {
			sb = sb.replace("{minRound}", Convert.FormatD2(this.GetMinuteRound()));
		}
		if (format.search("{sec}") >= 0)
			sb = sb.replace("{sec}", Convert.FormatD2(this.GetSecond()));
		if (format.search("{year}") >= 0)
			sb = sb.replace("{year}", this.year.toString());

		return sb
	}
	
	static GetMonthMaxDays(year, month) {
		if (GregorianDateTime.IsLeapYear(year))
			return GregorianDateTime_MonthsOvr[month]
		else
			return GregorianDateTime_Months[month]
	}

    static IsLeapYear(year)
	{
		if ((year % 4) == 0)
		{
			if ((year % 100 == 0) && (year % 400 != 0))
				return false
			else
				return true
		}

		return false
	}
	
	GetJulianInteger() {
		var yy = this.year - Convert.ToInt32((12 - this.month) / 10)
		var mm = this.month + 9

		if (mm >= 12)
			mm -= 12;

		var k1, k2, k3;
		var j;

		k1 = Convert.ToInt32 (Math.floor(365.25 * (yy + 4712)));
		k2 = Convert.ToInt32 (Math.floor(30.6 * mm + 0.5));
		var yy100 = GCMath.IntFloor(yy/100);
		k3 = Convert.ToInt32 (Math.floor(Math.floor((yy100)+49)*.75))-38;
		j = k1 + k2 + this.day + 59;
		if (j > 2299160)
			j -= k3;
		return j;
	}

	GetJulian() {
		return 1.0*this.GetJulianInteger()
	}
	
	NormalizeValues() {
		if (this.shour < 0.0)
		{
			this.day--;
			this.shour += 1.0;
		}
		else if (this.shour >= 1.0)
		{
			this.shour -= 1.0;
			this.day++;
		}
		if (this.day < 1)
		{
			this.month--;
			if (this.month < 1)
			{
				this.month = 12;
				this.year--;
			}
			this.day = GregorianDateTime.GetMonthMaxDays(this.year, this.month);
		}
		else if (this.day > GregorianDateTime.GetMonthMaxDays(this.year, this.month))
		{
			this.month++;
			if (this.month > 12)
			{
				this.month = 1;
				this.year++;
			}
			this.day = 1;
		}		
	}
	
	PreviousDay() {
		this.day--;
		if (this.day < 1)
		{
			this.month--;
			if (this.month < 1)
			{
				this.month = 12;
				this.year--;
			}
			this.day = GregorianDateTime.GetMonthMaxDays(this.year, this.month);
		}
		this.dayOfWeek = (this.dayOfWeek + 6) % 7;
		return this;
	}

	NextDay() {
		this.day++;
		if (this.day > GregorianDateTime.GetMonthMaxDays(this.year, this.month))
		{
			this.month++;
			if (this.month > 12)
			{
				this.month = 1;
				this.year++;
			}
			this.day = 1;
		}
		this.dayOfWeek = (this.dayOfWeek + 1) % 7;
		return this;
	}
	
	AddDays(n) {
		if (n < 0) {
			return this.SubtractDays(-n)
		} else {
			for (var i = 0; i < n; i++) {
				this.NextDay();
			}
		}
		return this;
	}

	// julianUtcDate (double)
	SetFromJulian(julianUtcDate) {
		var z = Math.floor(julianUtcDate + 0.5);

		var f = (julianUtcDate + 0.5) - z;

		var A, B, C, D, E, alpha;

		if (z < 2299161.0)
		{
			A = z;
		} 
		else 
		{
			alpha = Math.floor((z - 1867216.25)/36524.25);
			A = z + 1.0 + alpha - Math.floor(alpha/4.0);
		}

		B = A + 1524;
		C = Math.floor((B - 122.1)/365.25);
		D = Math.floor(365.25 * C);
		E = Math.floor((B - D)/30.6001);
		this.day = Convert.ToInt32(Math.floor(B - D - Math.floor(30.6001 * E) + f));
		this.month = Convert.ToInt32((E < 14) ? E - 1 : E - 13);
		this.year = Convert.ToInt32((this.month > 2) ? C - 4716 : C - 4715);
		this.TimezoneHours = 0.0;
		this.shour = julianUtcDate + 0.5 - Math.floor(julianUtcDate + 0.5);
	}

	ChangeTimeZone(tZone) {
		this.shour += (tZone - this.TimezoneHours)/24;
		NormalizeValues();
		this.TimezoneHours = tZone;
	}

	SubtractDays(n) {
		if (n < 0) {
			this.AddDays(-n)
		} else {
			for (var i = 0; i < n; i++) {
				this.PreviousDay();
			}
		}
		return this;
	}
	
	AddHours(ndst) {
		this.shour += ndst / 24.0
		this.NormalizeValues()
	}

	TimeWithOffset(p) {
		var dt = this.Clone()
		dt.shour += parseFloat(p);
		dt.NormalizeValues();
		return dt
	}
	
	GetJulianDetailed() {
		return this.GetJulian() - 0.5 + this.shour
	}
	
	GetJulianComplete() {
		return this.GetJulian() - 0.5 + this.shour - this.TimezoneHours/24.0
	}

	InitWeekDay() {
		this.dayOfWeek = (this.GetJulianInteger() + 1)%7
		return this;
	}
	
	
	GetHour() {
		return Convert.ToInt32(Math.floor(this.shour * 24));
	}

	GetMinute()	{
		return Convert.ToInt32(Math.floor((this.shour * 24 - Math.floor(this.shour * 24)) * 60));
	}

	GetMinuteRound() {
		return Convert.ToInt32(Math.floor((this.shour * 24 - Math.floor(this.shour * 24)) * 60 + 0.5));
	}

	GetSecond() {
		return Convert.ToInt32(Math.floor((this.shour * 1440 - Math.floor(this.shour * 1440)) * 60));
	}

	GetDayInteger() {
		return this.year * 384 + this.month * 32 + this.day;
	}
	
	CompareYMD(v) {
		if (v instanceof GregorianDateTime) {
			return this.GetDayInteger() - v.GetDayInteger()
		}
		return 0
	}
	
	EqualDay(v) {
		if (this.day == v.day && this.month == v.month && this.year == v.year) {
			return true
		}
		return false
	}
	
	static Compare(A,B)
	{
		if ((A instanceof GregorianDateTime) && (B instanceof GregorianDateTime))
		{
			if (A.year < B.year)
				return -1;
			else if (A.year > B.year)
				return 1;

			if (A.month < B.month)
				return -1;
			else if (A.month > B.month)
				return 1;

			if (A.day < B.day)
				return -1;
			else if (A.day > B.day)
				return 1;

			if (A.shour < B.shour)
				return -1;
			else if (A.shour > B.shour)
				return 1;

			return 0;
		}
		
		return -2
	}

	IsLessOrEqualsTo(date) {
		var d1 = new GregorianDateTime()
		var d2 = new GregorianDateTime()
		
		d1.Set(this)
		d2.Set(date)
		
		d1.NormalizeValues()
		d2.NormalizeValues()
		
		return d1.GetDayInteger() <= d2.GetDayInteger()
	}
	
	IsLessThan(date) {
		var d1 = new GregorianDateTime()
		var d2 = new GregorianDateTime()
		
		d1.Set(this)
		d2.Set(date)
		
		d1.NormalizeValues()
		d2.NormalizeValues()
		
		return d1.GetDayInteger() < d2.GetDayInteger()
	}
	
	IsBeforeThis(date) {
		return this.IsLessThan(date)
	}

	IsDateEqual(date) {
		var d1 = new GregorianDateTime()
		var d2 = new GregorianDateTime()
		
		d1.Set(this)
		d2.Set(date)
		
		d1.NormalizeValues()
		d2.NormalizeValues()
		
		return ((d1.year == d2.year) && (d1.month == d2.month) && (d1.day == d2.day))
	}
	
	static GetMonthAbreviation(month) {
		return GregorianDateTime_MonthAbr[month]
	}

	static GetMonthName(month) {
		return GregorianDateTime_MonthName[month]
	}
	
	static CalculateJulianDay(year, month, day)
	{
		var yy = year - Convert.ToInt32((12 - month) / 10);
		var mm = month + 9;

		if (mm >= 12)
			mm -= 12;

		var k1, k2, k3;
		var j;

		k1 = Convert.ToInt32(Math.floor(365.25 * (yy + 4712)));
		k2 = Convert.ToInt32(Math.floor(30.6 * mm + 0.5));
		k3 = Convert.ToInt32(Math.floor(Math.floor((double)(yy/100)+49)*.75))-38;
		j = k1 + k2 + day + 59;
		if (j > 2299160)
			j -= k3;

		return Convert.ToDouble(j);
	}
	
	/// <summary>
	/// Tests whether this date is equal or after the date, when given weekday in given week occurs.
	/// </summary>
	/// <param name="weekNumber">Number of week. values 1, 2, 3, 4 are order of week, value 5 means last week of the month</param>
	/// <param name="dayNumber">Number of weekday, value 0 is Sunday, 1 is Monday, .... 6 is Saturday</param>
	/// <returns>Returns true, if this date is equal or is after the date given by weeknumber and daynumber</returns>
	IsEqualOrAfterWeekdayInWeek(weekNumber, dayNumber) {
		var vc = this
		var xx = [ 1, 7, 6, 5, 4, 3, 2 ]

		var dowFirstDay, firstGivenWeekday, requiredGivenWeekday, lastDayInMonth;

		// prvy den mesiaca
		dowFirstDay = xx[(7 + vc.day - vc.dayOfWeek) % 7];

		// 1. x-day v mesiaci ma datum
		firstGivenWeekday = xx[(dowFirstDay - dayNumber + 7) % 7];

		// n-ty x-day ma datum
		if ((weekNumber < 0) || (weekNumber >= 5))
		{
			requiredGivenWeekday = firstGivenWeekday + 28;
			lastDayInMonth = GregorianDateTime.GetMonthMaxDays(vc.year, vc.month);
			while (requiredGivenWeekday > lastDayInMonth)
			{
				requiredGivenWeekday -= 7;
			}
		}
		else
		{
			requiredGivenWeekday = Convert.ToInt32(firstGivenWeekday + (weekNumber - 1) * 7);
		}

		return vc.day >= requiredGivenWeekday;
	}
	
	
	//----------------------------
	// encoding
	//
	
	GetEncodedString() {
		return this.year.toString() + "|"
			+ this.month.toString() + "|"
			+ this.day.toString() + "|"
			+ this.shour.toString() + "|"
			+ this.TimezoneHours.toString() + "|"
			+ this.dayOfWeek.toString()
	}
	
	SetEncodedString(value) {
		var a = value.split("|")
		if (a.length >= 6) {
			this.year = ParseInt(a[0])
			this.month = ParseInt(a[1])
			this.day = ParseInt(a[2])
			this.shour = ParseDouble(a[3])
			this.TimezoneHours = ParseDouble(a[4])
			this.dayOfWeek = ParseInt(a[5])
		}
	}
}


