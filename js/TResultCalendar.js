class TResultCalendar {
  constructor() {
    this.BEFORE_DAYS = 0;
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
    this.CalculateCalendar(loc, sdate, GetMonthMaxDays(nYear, nMonth))
  }

	//int DAYS_TO_ENDWEEK(int lastMonthDay)
	DAYS_TO_ENDWEEK(lastMonthDay)
	{
		return (21 - (lastMonthDay - this.m_Location.FirstDayOfWeek)) % 7;
	}

	//int DAYS_FROM_BEGINWEEK(int firstMonthDay)
	DAYS_FROM_BEGINWEEK(firstMonthDay)
	{
		return (firstMonthDay - this.m_Location.FirstDayOfWeek + 14) % 7;
	}

	//int DAY_INDEX(int day)
	DAY_INDEX(day)
	{
		return (day + this.m_Location.FirstDayOfWeek) % 7;
	}

  // CalculateCalendar(GCLocation loc, GregorianDateTime begDate, int iCount)
  CalculateCalendar(loc, begDate, iCount) {
		var i, weekday;
		var nTotalCount = BEFORE_DAYS + iCount + BEFORE_DAYS;
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
		date.SubtractDays(BEFORE_DAYS);
		date.InitWeekDay();

		weekday = date.dayOfWeek;

		var exec = new GCFestivalSpecialExecutor();
		exec.calendar = this;

		var utcDayStart = -1;
		var utcDayEnd = -1;

		// 1
		// initialization of days
		for (i = 0; i < nTotalCount; i++)
		{
		  m_pData.push(new VAISNAVADAY());
			m_pData[i].date = new GregorianDateTime(date);
			m_pData[i].date.dayOfWeek = weekday;
			date.NextDay();
			weekday = (weekday + 1) % 7;
			m_pData[i].moonrise.SetValue(-1);
			m_pData[i].moonset.SetValue(-1);

			if (utcDayStart < 0)
			{
				utcDayStart = m_pData[i].date.GetJulianComplete() * 86400;
			}
			m_pData[i].UtcDayStart = utcDayStart;
			utcDayStart += 86400;
		}

		for(i = 0; i < nTotalCount; i++)
		{
			m_pData[i].Previous = i > 0 ? m_pData[i - 1] : null;
			m_pData[i].Next = i < nTotalCount - 1 ? m_pData[i + 1] : null;
		}

		var recentEvents = null;

		// 2
		// calculating DST data and core events
		for (i = 0; i < m_pData.length; i++)
		{
		    t = m_pData[i]
			t.BiasMinutes = loc.TimeZone.GetBiasMinutesForDay(t.date);
			if (t.Previous != null)
			{
				t.DstDayType = (t.BiasMinutes == 0
					? (t.Previous.BiasMinutes == 0 ? DstTypeChange.DstOff : DstTypeChange.DstEnd)
					: (t.Previous.BiasMinutes == 0 ? DstTypeChange.DstStart : DstTypeChange.DstOn));
			}

			utcDayStart = t.UtcDayStart - (t.Previous != null ? t.Previous.BiasMinutes * 60 : 0);
			utcDayEnd = t.UtcDayStart + 86400 - t.BiasMinutes*60;

			if (recentEvents == null || recentEvents.p_events.Count == 0 || recentEvents.Year != t.date.year)
				recentEvents = GCCoreAstronomy.GetCoreEventsYear(loc, t.date.year);
			recentEvents.GetCoreEvents(t.coreEvents, utcDayStart, utcDayEnd);


			utcDayStart = utcDayEnd;
		}

		// 3
		if (bCalcMoon)
		{
			for (i = 0; i < m_pData.length; i++)
			{
				t = m_pData[i]
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
		for (i = 0; i < m_pData.length; i++)
		{
			t = m_pData[i]
			t.astrodata = new GCAstroData();
			t.astrodata.DayCalc(t.date, earth);

			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunArunodaya.TotalSeconds(),
				CoreEventType.CCTYPE_S_ARUN));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunRise.TotalSeconds(),
				CoreEventType.CCTYPE_S_RISE));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunNoon.TotalSeconds(),
				CoreEventType.CCTYPE_S_NOON));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunSet.TotalSeconds(),
				CoreEventType.CCTYPE_S_SET));
		}

		// 5
		// init of masa
		for (i = 0; i < m_pData.length; i++)
		{
			t = m_pData[i]
			if (t.Previous == null
				|| t.astrodata.sunRise.Paksa != t.Previous.astrodata.sunRise.Paksa)
			{
				t.astrodata.MasaCalc(t.date, earth);
				lastMasa = t.astrodata.Masa;
				lastGYear = t.astrodata.GaurabdaYear;
			}
			t.astrodata.Masa = lastMasa;
			t.astrodata.GaurabdaYear = lastGYear;

			if (!EkadasiOnly && gds.getValue(GCDS.CAL_SUN_LONG) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} (*)", "Sun Longitude"
					, t.astrodata.sunRise.longitude);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_SUN_LONG, tempStr);
			}

			if (!EkadasiOnly && gds.getValue(GCDS.CAL_MOON_LONG) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} (*)", "Moon Longitude"
					, t.astrodata.sunRise.longitudeMoon);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_MOON_LONG, tempStr);
			}

			if (!EkadasiOnly && gds.getValue(GCDS.CAL_AYANAMSHA) != 0)
			{
				tempStr = GCStrings.Format("{0} {1} ({2}) (*)", "Ayanamsha"
					, t.astrodata.Ayanamsa
					, GCAyanamsha.GetAyanamsaName(GCAyanamsha.GetAyanamsaType()));
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_AYANAMSHA, tempStr);
			}

			if (!EkadasiOnly && gds.getValue(GCDS.CAL_JULIAN) != 0)
			{
				tempStr = GCStrings.Format("{0} {1} (*)", "Julian Time"
					, t.astrodata.JulianDay);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_JULIAN, tempStr);
			}
		}


		if (!EkadasiOnly && gds.getValue(GCDS.CAL_MASA_CHANGE) != 0)
		{
			var str;

			for (i = 0; i < m_pData.length; i++)
			{
				t = m_pData[i]
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

		if (!EkadasiOnly && gds.getValue(GCDS.CAL_DST_CHANGE) != 0)
		{
			for (i = 0; i < m_pData.length; i++)
			{
				t = m_pData[i]
				if (t.Previous != null && t.Previous.BiasMinutes == 0 && t.BiasMinutes != 0)
					t.AddEvent(DisplayPriorities.PRIO_DST_CHANGE, GCDS.CAL_DST_CHANGE, "First day of Daylight Saving Time");
				else if (t.Next != null && t.BiasMinutes != 0 && t.Next.BiasMinutes == 0)
					t.AddEvent(DisplayPriorities.PRIO_DST_CHANGE, GCDS.CAL_DST_CHANGE, "Last day of Daylight Saving Time");
			}
		}

		// 6
		// init of mahadvadasis
		for (i = 0; i < m_pData.length; i++)
		{
			t = m_pData[i]
			t.MahadvadasiCalc(earth);
		}

		//
		// init for Ekadasis
		for (i = 0; i < m_pData.length; i++)
		{
			t = m_pData[i]
			if (t.Previous == null)
				continue;
			t.EkadasiCalc(earth);
			if (t.Previous.nFastID == FastType.FAST_EKADASI)
			{
				t.CalculateEParana(earth);
			}
		}

		if (EkadasiOnly)
			return 1;

		// init ksaya data
		// init of second day of vriddhi
		CalculateKsayaVriddhiTithis();

		//
		// calculate sankrantis
		CalculateSankrantis();

		// 7
		// init of festivals
		AddMatchedFestivals(exec);

		//
		// apply daylight saving time
		ApplyDaylightSavingHours();

		//
		// resolve festivals fasting
		for (i = BEFORE_DAYS; i < m_PureCount + BEFORE_DAYS; i++)
		{
			ResolveFestivalsFasting(i);

			if (gds.getValue(GCDS["CAL_SUN_RISE"]) != 0)
			{
				tempStr = GCStrings.Format("{0}-{1}-{2}  {3} - {4} - {5} ({6})",
					"Sunrise",
					"Noon",
					"Sunset",
					m_pData[i].astrodata.sunRise.ToShortTimeString(),
					m_pData[i].astrodata.sunNoon.ToShortTimeString(),
					m_pData[i].astrodata.sunSet.ToShortTimeString(),
					GCStrings.GetDSTSignature(m_pData[i].BiasMinutes));
				m_pData[i].AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_SUN_RISE"], tempStr);
			}

			if (gds.getValue(GCDS["CAL_SUN_SANDHYA"]) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} | {2} | {3}   ({4})",
					"Sandhyas",
					m_pData[i].astrodata.sunRise.ShortSandhyaString(),
					m_pData[i].astrodata.sunNoon.ShortSandhyaString(),
					m_pData[i].astrodata.sunSet.ShortSandhyaString(),
					GCStrings.GetDSTSignature(m_pData[i].BiasMinutes));
				m_pData[i].AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_SUN_SANDHYA"], tempStr);
			}

			if (gds.getValue(GCDS["CAL_BRAHMA_MUHURTA"]) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1}   ({2})",
					"Brahma Muhurta",
					m_pData[i].astrodata.sunRise.ShortMuhurtaString(-2),
					GCStrings.GetDSTSignature(m_pData[i].BiasMinutes));
				m_pData[i].AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_BRAHMA_MUHURTA"], tempStr);
			}
		}

		if (gds.getValue(GCDS.CAL_COREEVENTS) != 0)
		{
			var number = 1;
			m_pData.forEach(function(today) {
				today.coreEvents.forEach(function(tde) {
					m_pData[i].AddEvent(DisplayPriorities["PRIO_ASTRO"] + number, GCDS["CAL_COREEVENTS"],
						tde.TypeString + "   " + today.GetCoreEventTime(tde));
					number++;
				});
			});
		}


		// sorting day events according priority
    m_pData.forEach(function(element) {
      element.SortDayEvents();
    });


		return 1;

	}


  ApplyDaylightSavingHours()
  {
    m_pData.forEach(function(today) {
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

        today.coreEvents.forEach(function(core) {
          core.ApplyDstType(today.UtcDayStart, today.DstDayType);
        })
    });
  }

  CalculateKsayaVriddhiTithis() {
      var earth = m_Location.GetEarthData();

      m_pData.forEach(function(t) {
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

              if (tithiTimes.Count() == 2)
              {
                  str = t.Format("Kshaya tithi: {prevTithiName} — {0} to {1} ({dstSig})",
                      tithiTimes[0].dateTimeOfEvent.Format("{day} {monthAbr} {hour}:{minRound}"),
                      tithiTimes[1].dateTimeOfEvent.Format("{day} {monthAbr} {hour}:{minRound}"));

                  t.AddEvent(DisplayPriorities.PRIO_KSAYA, GCDS.CAL_KSAYA, str);
              }
          }
      }
    );
  }

  CalculateSankrantis()
  {
    var targetDay = null;
    m_pData.forEach(function(today) {
        targetDay = null;
        var n = 0;
        today.coreEvents.forEach(function(ce) {
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
        });
    });
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
    for (i = BEFORE_DAYS; i < m_PureCount + BEFORE_DAYS - 1; i++)
    {
        gEvents.forEach(function(book) {
          if (!gEventsVisible[book.bookid])
            return;
          book.events.forEach(function(fb) {
            if (fb.nReserved == 1 && fb.nVisible > 0 && IsFestivalDay(m_pData, i, fb))
            {
                currFestTop = AddEventToDay(i, 0, currFestTop, fb);
            }
          })
        });
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
  AddEventToDay(idx, offsetWithToday, currFestTop, fb) {
      var t = m_pData[idx+offsetWithToday];
      var md = t.AddEvent(DisplayPriorities.PRIO_FESTIVALS_0 + fb.BookID * 100 + currFestTop,
          GCDS.CAL_FEST_0 + fb.BookID, fb.Text);
      currFestTop += 5;
      if (fb.FastID > 0)
      {
          md.fasttype = fb.FastID;
          md.fastsubject = fb.FastingSubject;
      }

      if (gds.getValue(51) != 2 && fb.StartYear > -7000)
      {
          var ss1;
          var years = t.astrodata.GaurabdaYear - (fb.StartYear - 1496);
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

      if (fb.EventsCount > 0)
      {
          fb.events.forEach(function(related) {
              if (related.type == "R") {
                  this.AddEventToDay(idx, fb.DayOffset + related.DayOffset, 0, related);
              }
          });
      }

      return currFestTop;
  }

  GetDay(nIndex)
  {
      var nReturn = nIndex + this.BEFORE_DAYS;

      if (nReturn >= this.m_nCount)
          return null;

      return m_pData[nReturn];
  }

  FindDate(vc) {
      var i;
      for (i = this.BEFORE_DAYS; i < m_nCount; i++)
      {
          if ((m_pData[i].date.day == vc.day) && (m_pData[i].date.month == vc.month) && (m_pData[i].date.year == vc.year))
              return (i - BEFORE_DAYS);
      }

      return -1;
  }

  ResolveFestivalsFasting(nIndex)
  {
      var s = m_pData[nIndex - 1];
      var t = m_pData[nIndex];
      var u = m_pData[nIndex + 1];

      var str;
      var subject = string.Empty;
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
