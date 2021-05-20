class TResultCalendar 
{
	constructor() {
		this.BEFORE_DAYS = 8;
		this.m_pData = []
		this.m_nCount = 0
		this.m_PureCount = 0
		this.m_Location = new GCLocation()
		this.m_vcStart = new GregorianDateTime()
		this.m_vcCount = 0
		this.nBeg = 0
		this.nTop = 0
		this.EkadasiOnly = false
	}

	CalculateYear(loc,nYear) {
		var sdate = new GregorianDateTime()
		sdate.year = nYear
		sdate.month = 1
		var count = 365
		if (IsLeapYear(nYear)) {
		count = 366
		}
		this.CalculateCalendar(loc, sdate, count)
	}

	CalculateMonth(loc,nYear,nMonth) {
		var sdate = new GregorianDateTime()
		sdate.year = nYear
		sdate.month = nMonth
		sdate.day = 1
		this.CalculateCalendar(loc, sdate, GregorianDateTime.GetMonthMaxDays(nYear, nMonth))
	}

    // CalculateCalendar(GCLocation loc, GregorianDateTime begDate, int iCount)
    CalculateCalendar(loc, begDate, iCount) {
		var i, weekday;
		var nTotalCount = this.BEFORE_DAYS + iCount + this.BEFORE_DAYS;
		var date = new GregorianDateTime();
		var earth = new GCEarthData();
		var lastMasa = 0;
		var lastGYear = 0;
		var tempStr = "";
		var bCalcMoon = (gds.getValue(4) > 0 || gds.getValue(5) > 0);

		this.m_nCount = nTotalCount;
		this.m_Location = loc;
		this.m_vcStart = new GregorianDateTime();
		this.m_vcStart.Set(begDate);
		this.m_vcCount = iCount;
		earth = loc.GetEarthData();

		// alokacia pola
		this.m_pData = [];

		// inicializacia poctovych premennych
		this.m_PureCount = iCount;

		date = new GregorianDateTime();
		date.Set(begDate);
		date.shour = 0.0;
		date.TimezoneHours = loc.OffsetUtcHours;
		date.SubtractDays(this.BEFORE_DAYS);
		date.InitWeekDay();

		weekday = date.dayOfWeek;

		var exec = new GCFestivalSpecialExecutor();
		exec.calendar = this;

		var utcDayStart = date.GetJulianComplete() * 86400;
		var utcDayEnd = -1;

		// 1
		// initialization of days
		for (i = 0; i < nTotalCount; i++)
		{
			var vday = new VAISNAVADAY();
			vday.date = new GregorianDateTime(date);
			vday.date.dayOfWeek = weekday;
			vday.moonrise.SetValue(-1);
			vday.moonset.SetValue(-1);
			vday.UtcDayStart = utcDayStart;
			vday.earth = earth;

			this.m_pData.push(vday);

			// move to next day
			date.NextDay();
			utcDayStart += 86400;
			weekday = (weekday + 1) % 7;
		}

		for(i = 1; i < nTotalCount; i++)
		{
			this.m_pData[i].Previous = this.m_pData[i - 1];
		}

		for(i = 0; i < nTotalCount-1; i++)
		{
			this.m_pData[i].Next = this.m_pData[i + 1];
		}

		var recentEvents = null;

		// 2
		// calculating DST data and core events
		for (var t of this.m_pData)
		{
			t.BiasMinutes = loc.TimeZone.GetBiasMinutesForDay(t.date);
			if (t.Previous != null)
			{
				t.DstDayType = (t.BiasMinutes == 0
					? (t.Previous.BiasMinutes == 0 ? DstTypeChange.DstOff : DstTypeChange.DstEnd)
					: (t.Previous.BiasMinutes == 0 ? DstTypeChange.DstStart : DstTypeChange.DstOn));
			}

			utcDayStart = t.UtcDayStart - (t.Previous != null ? t.Previous.BiasMinutes * 60 : 0);
			utcDayEnd = t.UtcDayStart + 86400 - t.BiasMinutes*60;

			if (recentEvents == null || recentEvents.p_events.length == 0 || recentEvents.Year != t.date.year || recentEvents.Month != t.date.month)
				recentEvents = GCCoreAstronomy.GetCoreEventsMonth(loc, t.date.year, t.date.month);
			t.coreEvents = new TCoreEventCollection();
			recentEvents.GetCoreEvents(t.coreEvents, utcDayStart, utcDayEnd);
			utcDayStart = utcDayEnd;
		}

		// 3
		if (bCalcMoon)
		{
			for (var t of this.m_pData)
			{
				var mres = GCMoonData_CalcMoonTimes(earth, t.date, Convert.ToDouble(t.BiasMinutes/60.0));
				t.moonrise = mres.moonrise
				t.moonset = mres.moonset

				if (!EkadasiOnly && gds.getValue(GCDS.CAL_MOON_RISE) != 0 && t.moonrise.hour >= 0)
				{
					tempStr = t.Format("Moonrise {moonRiseTime} ({dstSig})");
					t.AddEvent(DisplayPriorities["PRIO_MOON"], GCDS["CAL_MOON_RISE"], tempStr);
				}

				if (!EkadasiOnly && gds.getValue(GCDS.CAL_MOON_SET) != 0 && t.moonset.hour >= 0)
				{
					tempStr = t.Format("Moonset {moonSetTime} ({dstSig})");
					t.AddEvent(DisplayPriorities["PRIO_MOON"], GCDS["CAL_MOON_SET"], tempStr);
				}
			}
		}

		// 4
		// init of astro data
		for (var t of this.m_pData)
		{
			t.astrodata = new GCAstroData();
			t.astrodata.DayCalc(t.date, earth);

			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunArunodaya.TotalSeconds,
				CoreEventType.CCTYPE_S_ARUN));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunRise.TotalSeconds,
				CoreEventType.CCTYPE_S_RISE));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunNoon.TotalSeconds,
				CoreEventType.CCTYPE_S_NOON));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunSet.TotalSeconds,
				CoreEventType.CCTYPE_S_SET));
		}

		// 5
		// init of masa
		for (var t of this.m_pData)
		{
			if (t.Previous == null
				|| t.astrodata.sunRise.Paksa != t.Previous.astrodata.sunRise.Paksa)
			{
				t.astrodata.MasaCalc(t.date, earth);
				lastMasa = t.astrodata.Masa;
				lastGYear = t.astrodata.GaurabdaYear;
			}
			t.astrodata.Masa = lastMasa;
			t.astrodata.GaurabdaYear = lastGYear;

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_SUN_LONG) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} (*)", "Sun Longitude"
					, t.astrodata.sunRise.longitude);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_SUN_LONG, tempStr);
			}

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_MOON_LONG) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} (*)", "Moon Longitude"
					, t.astrodata.sunRise.longitudeMoon);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_MOON_LONG, tempStr);
			}

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_AYANAMSHA) != 0)
			{
				tempStr = GCStrings.Format("{0} {1} ({2}) (*)", "Ayanamsha"
					, t.astrodata.Ayanamsa
					, GCAyanamsha.GetAyanamsaName(GCAyanamsha.GetAyanamsaType()));
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_AYANAMSHA, tempStr);
			}

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_JULIAN) != 0)
			{
				tempStr = GCStrings.Format("{0} {1} (*)", "Julian Time"
					, t.astrodata.JulianDay);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_JULIAN, tempStr);
			}
		}


		if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_MASA_CHANGE) != 0)
		{
			var str;

			for (var t of this.m_pData)
			{
				if (t.Previous != null && t.Previous.astrodata.Masa != t.astrodata.Masa)
				{
					str = t.Format("First day of {masaName} Masa");
					t.AddEvent(DisplayPriorities.PRIO_MASA_CHANGE, GCDS.CAL_MASA_CHANGE, str);
				}

				if (t.Next != null && t.Next.astrodata.Masa != t.astrodata.Masa)
				{
					str = t.Format("Last day of {masaName} Masa");
					t.AddEvent(DisplayPriorities.PRIO_MASA_CHANGE, GCDS.CAL_MASA_CHANGE, str);
				}
			}
		}

		if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_DST_CHANGE) != 0)
		{
			for (var t of this.m_pData)
			{
				if (t.Previous != null && t.Previous.BiasMinutes == 0 && t.BiasMinutes != 0)
					t.AddEvent(DisplayPriorities.PRIO_DST_CHANGE, GCDS.CAL_DST_CHANGE, "First day of Daylight Saving Time");
				else if (t.Next != null && t.BiasMinutes != 0 && t.Next.BiasMinutes == 0)
					t.AddEvent(DisplayPriorities.PRIO_DST_CHANGE, GCDS.CAL_DST_CHANGE, "Last day of Daylight Saving Time");
			}
		}

		// 6
		// init of mahadvadasis
		for (var t of this.m_pData)
		{
			t.MahadvadasiCalc(earth);
		}

		//
		// init for Ekadasis
		for (var t of this.m_pData)
		{
			if (t.Previous == null)
				continue;
			t.EkadasiCalc(earth);
		}

		for (var t of this.m_pData)
		{
			if (t.Previous != null && t.Previous.nFastID == FastType.FAST_EKADASI)
			{
				t.CalculateEParana(earth);
			}
		}

		if (this.EkadasiOnly)
			return 1;


		if (gds.getBoolValue(71)) {
			for (var t of this.m_pData) {
				if (t.date.year in sun_eclipses && t.date.month in sun_eclipses[t.date.year]
					&& t.date.day in sun_eclipses[t.date.year][t.date.month]) {
						var rec = sun_eclipses[t.date.year][t.date.month][t.date.day];
						//console.log('Date in sun eclipses:', rec)
						var A = this.GetTimeInDay(t, rec.dayhour);
						var curr = A[0];
						var dayt1 = A[1];
						if (curr != null) {
							var text = sprintf("%s Solar Eclipse around %s. Visibility: %s", rec.type, dayt1.ToShortTimeString() ,rec.visibility);
							curr.AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
							//console.log('Timezone offset x:', text)	
						}
				} else if (t.date.year in moon_eclipses && t.date.month in moon_eclipses[t.date.year]
					&& t.date.day in moon_eclipses[t.date.year][t.date.month]) {
						var rec = moon_eclipses[t.date.year][t.date.month][t.date.day];
						console.log('Date in moon eclipses:', rec)
						var t1 = null, t2 = null;
						var mult = 1 / 1440.0;
						if (rec['part-time'] !=null) {
							t1 = rec.dayhour - rec['part-time']/2880;
							t2 = rec.dayhour + rec['part-time']/2880;
						}
						if (rec['total-time'] !=null) {
							t1 = rec.dayhour - rec['total-time']/2880;
							t2 = rec.dayhour + rec['total-time']/2880;
						}
						var A = this.GetTimeInDay(t, t1);
						var B = this.GetTimeInDay(t, t2);
						var curr = null;
						if (A[0] != null && B[0] != null) {
							var text;
							if (A[0].date.day == t.date.day && B[0].date.day == t.date.day) {
								text = sprintf("%s Moon Eclipse between %s - %s. Visibility: %s", rec.type, A[1].ToShortTimeString(), B[1].ToShortTimeString() ,rec.visibility);
								A[0].AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
							} else {
								if (A[0].date.day != t.date.day && B[0].date.day == t.date.day) {
									text = sprintf("%s Moon Eclipse before %s. Visibility: %s", rec.type, B[1].ToShortTimeString(), rec.visibility);
									B[0].AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
								}
								if (A[0].date.day == t.date.day && B[0].date.day != t.date.day) {
									text = sprintf("%s Moon Eclipse after %s. Visibility: %s", rec.type, A[1].ToShortTimeString(), rec.visibility);
									A[0].AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
								}
							}
							console.log('Timezone offset x:', A[0])	
						}
					}

			}
		}

		// init ksaya data
		// init of second day of vriddhi
		this.CalculateKsayaVriddhiTithis(earth);

		//
		// calculate sankrantis
		this.CalculateSankrantis();

		// 7
		// init of festivals
		this.AddMatchedFestivals(exec);

		//
		// apply daylight saving time
		this.ApplyDaylightSavingHours();

		//
		// resolve festivals fasting
		for (i = this.BEFORE_DAYS; i < this.m_PureCount + this.BEFORE_DAYS; i++)
		{
			this.ResolveFestivalsFasting(i);

			var td = this.m_pData[i];

			if (gds.getValue(GCDS["CAL_SUN_RISE"]) != 0)
			{
				tempStr = GCStrings.Format("{0}-{1}-{2}  {3} - {4} - {5} ({6})",
					"Sunrise",
					"Noon",
					"Sunset",
					td.astrodata.sunRise.ToShortTimeString(),
					td.astrodata.sunNoon.ToShortTimeString(),
					td.astrodata.sunSet.ToShortTimeString(),
					GCStrings.GetDSTSignature(td.BiasMinutes));
				td.AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_SUN_RISE"], tempStr);
			}

			if (gds.getValue(GCDS["CAL_SUN_SANDHYA"]) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} | {2} | {3}   ({4})",
					"Sandhyas",
					td.astrodata.sunRise.ShortSandhyaString(),
					td.astrodata.sunNoon.ShortSandhyaString(),
					td.astrodata.sunSet.ShortSandhyaString(),
					GCStrings.GetDSTSignature(td.BiasMinutes));
				td.AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_SUN_SANDHYA"], tempStr);
			}

			if (gds.getValue(GCDS["CAL_BRAHMA_MUHURTA"]) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1}   ({2})",
					"Brahma Muhurta",
					td.astrodata.sunRise.ShortMuhurtaString(-2),
					GCStrings.GetDSTSignature(td.BiasMinutes));
				td.AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_BRAHMA_MUHURTA"], tempStr);
			}
		}

		if (gds.getValue(GCDS.CAL_COREEVENTS) != 0)
		{
			var number = 1;
			for(var today of this.m_pData) {
				for(var tde of today.coreEvents.items()) {
					today.AddEvent(DisplayPriorities["PRIO_ASTRO"] + number, GCDS["CAL_COREEVENTS"],
						tde.TypeString + "   " + today.GetCoreEventTime(tde));
					number++;
				}
			}
		}


		// sorting day events according priority
		for(var element of this.m_pData) {
			element.SortDayEvents();
		}


		return 1;

	}

	GetTimeInDay(curr, dayhours)
	{
		var doff = (this.m_Location.OffsetUtcHours*60 + curr.BiasMinutes);
		doff = dayhours + doff * 60 / 86400;
		console.log('doff:', doff);
		if (doff < 0.0 && curr.Previous != null) {
			doff += 1.0;
			curr = curr.Previous;
		} else if (doff >= 0.0 && doff < 1.0) {
		} else if (doff >= 1.0 && curr.Next != null) {
			doff -= 1.0;
			curr = curr.Next;
		} else {
			return [null, null];
		}

		var dt = new GCHourTime();
		dt.SetDayTime(doff);

		return [curr, dt];
	}

	ApplyDaylightSavingHours()
	{
		for(var today of this.m_pData) {
			if (today.eparana_time1 != null)
				today.eparana_time1.ApplyDstType(today.UtcDayStart, today.DstDayType);

			if (today.eparana_time2 != null)
				today.eparana_time2.ApplyDstType(today.UtcDayStart, today.DstDayType);

			if (today.astrodata.sunRise.longitude > 0.0)
			{
				today.astrodata.sunRise.AddMinutes(today.BiasMinutes);
				today.astrodata.sunSet.AddMinutes(today.BiasMinutes);
				today.astrodata.sunNoon.AddMinutes(today.BiasMinutes);
				today.astrodata.sunArunodaya.AddMinutes(today.BiasMinutes);
			}

			for(var core of today.coreEvents.items()) {
				core.ApplyDstType(today.UtcDayStart, today.DstDayType);
			}
		}
	}

	CalculateKsayaVriddhiTithis(earth) 
	{
		for(var t of this.m_pData) {
			var s = t.Previous;

			if (s == null)
				continue;

			if (t.astrodata.sunRise.Tithi == s.astrodata.sunRise.Tithi)
			{
				t.vriddhiDayNo = 2;
				if (gds.getValue(GCDS.CAL_VRDDHI) != 0)
					t.AddEvent(DisplayPriorities.PRIO_KSAYA, GCDS.CAL_VRDDHI, GCStrings.getString(90));
			}
			else if (t.astrodata.sunRise.Tithi != GCTithi.NEXT_TITHI(s.astrodata.sunRise.Tithi))
			{
				s.ksayaTithi = GCTithi.NEXT_TITHI(s.astrodata.sunRise.Tithi);
				s.ksayaMasa = (s.ksayaTithi == 0 ? t.astrodata.Masa : s.astrodata.Masa);
				var idx = 0;
				var str;

				var tithiTimes = t.GetRecentCoreTimes(CoreEventType.CCTYPE_S_RISE, CoreEventType.CCTYPE_TITHI, 2);

				if (tithiTimes.length == 2)
				{
					str = sprintf("Kshaya tithi: %s -- %s to %s (%s)",
						t.prevTithiName,
						tithiTimes[0].dateTimeOfEvent.Format("{day} {monthAbr} {hour}:{minRound}"),
						tithiTimes[1].dateTimeOfEvent.Format("{day} {monthAbr} {hour}:{minRound}"),
						GCStrings.GetDSTSignature(t.BiasMinutes));

					t.AddEvent(DisplayPriorities.PRIO_KSAYA, GCDS.CAL_KSAYA, str);
				}
			}
		}
	}

	CalculateSankrantis()
	{
		var targetDay = null;
		for(var today of this.m_pData) {
			targetDay = null;
			var n = 0;
			for (var ce of today.coreEvents.items()) {
				switch(ce.nType)
				{
					case CoreEventType.CCTYPE_SANK:
						switch(GCSankranti.GetSankrantiType())
						{
							case 0: targetDay = today; break;
							case 1: targetDay = (n >= 1 ? today : today.Previous); break;
							case 2: targetDay = (n >= 2 ? today.Next : today); break;
							case 3: targetDay = (n >= 3 ? today.Next : today); break;
						}
						if (targetDay != null)
						{
							targetDay.sankranti_day = today.GetGregorianDateTime(ce);
							targetDay.sankranti_zodiac = ce.nData;
						}
						break;
					case CoreEventType.CCTYPE_S_RISE: n = 1; break;
					case CoreEventType.CCTYPE_S_NOON: n = 2; break;
					case CoreEventType.CCTYPE_S_SET:  n = 3; break;
				}

				if (targetDay != null)
				{
					var str = targetDay.Format("  {sankranti.rasiName} Sankranti (Sun enters {sankranti.rasiNameEn} on {sankranti.day} {sankranti.monthAbr}, {sankranti.hour}:{sankranti.minRound}) ({dstSig})");
					var dc = targetDay.AddEvent(DisplayPriorities.PRIO_SANKRANTI, GCDS.CAL_SANKRANTI, str);
					dc.spec = "sankranti";
					break;
				}
			}
		}
	}

	IsFestivalDay(days, idx, fb) {
		switch(fb.type) {
		case "T":
			return GCFestivalTithiMasa.IsFestivalDay(days,idx,fb);
		case "M":
			return GCFestivalMasaDay.IsFestivalDay(days,idx,fb);
		case "S":
			return GCFestivalSankranti.IsFestivalDay(days,idx,fb);
		case "E":
			return GCFestivalEkadasi.IsFestivalDay(days,idx,fb);
		case "X":
			return GCFestivalSpecial.IsFestivalDay(days,idx,fb);
		}
	}

	//AddMatchedFestivals(GCFestivalSpecialExecutor exec)
	AddMatchedFestivals() {
		var currFestTop = 0;
		var i;
		for (i = this.BEFORE_DAYS; i < this.m_PureCount + this.BEFORE_DAYS - 1; i++)
		{
			//console.log('festival check -> ', i)
			for(var book of gEvents) {
				if (!gEventsVisible[book.bookid])
					continue;
				for(var fb of book.events) {
					if (fb.nReserved != 1 && fb.nReserved != undefined) continue;
					if (fb.nVisible == 0) continue;
					//console.log('========', this.m_pData[i], fb);
					if (this.IsFestivalDay(this.m_pData, i, fb))
					{
						currFestTop = this.AddEventToDay(i, 0, currFestTop, fb, book.bookid);
					}
				}
			}
		}

		return 1;
	}

	// <summary>
	//
	// </summary>
	// <param name="exec"></param>
	// <param name="offsetWithToday">If value of this parameter is 0, then current day is processed,
	// -1 is for yesterday, +1 is for tomorrow</param>
	// <param name="currFestTop"></param>
	// <param name="fb"></param>
	// <returns></returns>
	//AddEventToDay(int idx, int offsetWithToday, int currFestTop, GCFestivalBase fb)
	AddEventToDay(idx, offsetWithToday, currFestTop, fb, bookID) 
	{
		var t = this.m_pData[idx + offsetWithToday];
		var md = t.AddEvent(DisplayPriorities.PRIO_FESTIVALS_0 + bookID * 100 + currFestTop,
			GCDS.CAL_FEST_0 + bookID, fb.name);
		currFestTop += 5;
		if (fb.fast > 0)
		{
			md.fasttype = fb.fast;
			md.fastsubject = fb.fastSubj;
		}

		if (gds.getValue(51) != 2 && fb.start != undefined && fb.start > -7000)
		{
			var ss1;
			var years = t.astrodata.GaurabdaYear - (fb.start - 1496);
			var appx = "th";
			if (years % 10 == 1) appx = "st";
			else if (years % 10 == 2) appx = "nd";
			else if (years % 10 == 3) appx = "rd";
			if (gds.getValue(51) == 0)
			{
				ss1 = md.text + " (" + years.toString() + appx + " anniversary)";
			}
			else
			{
				ss1 = md.text + " (" + years.toString() + appx + ")";
			}
			md.text = ss1;
		}

		if (fb.events != undefined && fb.events.length > 0)
		{
			for(var related of fb.events) {
				if (related.type == "R") {
					this.AddEventToDay(idx, fb.dayoff + related.dayoff, 0, related, bookID);
				}
			}
		}

		return currFestTop;
	}

	GetDay(nIndex)
	{
		var nReturn = nIndex + this.BEFORE_DAYS;

		if (nReturn >= this.m_nCount)
			return null;

		return this.m_pData[nReturn];
	}

	FindDate(vc) 
	{
		var i;
		for (i = this.BEFORE_DAYS; i < this.m_nCount; i++)
		{
			if ((this.m_pData[i].date.day == vc.day) && (this.m_pData[i].date.month == vc.month) && (this.m_pData[i].date.year == vc.year))
				return (i - this.BEFORE_DAYS);
		}

		return -1;
	}

	ResolveFestivalsFasting(nIndex)
	{
		var s = this.m_pData[nIndex - 1];
		var t = this.m_pData[nIndex];
		var u = this.m_pData[nIndex + 1];

		var str;
		var subject = '';
		var fastForDay = 0;
		var fastForEvent = 0;
		var ch, h;
		var md;

		if (t.nMahadvadasiID != MahadvadasiType.EV_NULL)
		{
			str = "Fasting for " + t.ekadasi_vrata_name;
			t.AddEvent(DisplayPriorities.PRIO_EKADASI, GCDS.CAL_EKADASI_PARANA, str);
		}

		ch = GCEkadasi.GetMahadvadasiName(t.nMahadvadasiID);
		if (ch != null)
		{
			t.AddEvent(DisplayPriorities.PRIO_MAHADVADASI, GCDS.CAL_EKADASI_PARANA, ch);
		}

		if (t.ekadasi_parana)
		{
			str = t.GetTextEP();
			t.AddEvent(DisplayPriorities.PRIO_EKADASI_PARANA, GCDS.CAL_EKADASI_PARANA, str);
		}

		for (h = 0; h < t.dayEvents.length; h++)
		{
			md = t.dayEvents[h];
			fastForEvent = FastType.FAST_NULL;
			if (md.fasttype != FastType.FAST_NULL)
			{
				fastForEvent = md.fasttype;
				subject = md.fastsubject;
			}

			if (fastForEvent != FastType.FAST_NULL)
			{
				if (s.nFastID == FastType.FAST_EKADASI)
				{
					if (gds.getValue(42) == 0)
					{
						str = GCStrings.Format("(Fast today for {0})", subject);
						s.AddEvent(DisplayPriorities.PRIO_FASTING, GCDS.DISP_ALWAYS, str);
						t.AddEvent(md.prio + 1, md.dispItem, "(Fasting is done yesterday)");
						//"(Fasting is done yesterday)"
					}
					else
					{
						str = "(Fast till noon for " + subject + ", with feast tomorrow)";
						s.AddEvent(DisplayPriorities.PRIO_FASTING, GCDS.DISP_ALWAYS, str);
						t.AddEvent(md.prio + 1, md.dispItem, "(Fasting is done yesterday, today is feast)");
						//"(Fasting is done yesterday, today is feast)";
					}
				}
				else if (t.nFastID == FastType.FAST_EKADASI)
				{
					if (gds.getValue(42) != 0)
						t.AddEvent(md.prio + 1, md.dispItem, "(Fasting till noon, with feast tomorrow)");
					//"(Fasting till noon, with feast tomorrow)";
					else
						t.AddEvent(md.prio + 1, md.dispItem, "(Fast today)");
					//"(Fast today)"
				}
				else
				{
					/* OLD STYLE FASTING
					if (gds.getValue(42) == 0)
					{
						if (nftype > 1)
							nftype = 7;
						else nftype = 0;
					}*/
					if (fastForEvent != FastType.FAST_NULL)
					{
						t.AddEvent(md.prio + 1, md.dispItem,
							GCStrings.GetFastingName(fastForEvent));
					}
				}
			}
			if (fastForDay < fastForEvent)
				fastForDay = fastForEvent;
		}

		if (fastForDay != FastType.FAST_NULL)
		{
			if (s.nFastID == FastType.FAST_EKADASI)
			{
				t.nFeasting = FeastType.FEAST_TODAY_FAST_YESTERDAY;
				s.nFeasting = FeastType.FEAST_TOMMOROW_FAST_TODAY;
			}
			else if (t.nFastID == FastType.FAST_EKADASI)
			{
				u.nFeasting = FeastType.FEAST_TODAY_FAST_YESTERDAY;
				t.nFeasting = FeastType.FEAST_TOMMOROW_FAST_TODAY;
			}
			else
			{
				t.nFastID = fastForDay;
			}
		}

	}


}

//getDayBkgColorCode(VAISNAVADAY p)
function getDayBkgColorCode(p)
{
	if (p == null)
		return "white";
	if (p.nFastID == FastType.FAST_EKADASI)
		return "#FFFFBB";
	if (p.nFastID != 0)
		return "#BBFFBB";
	return "white";
}
