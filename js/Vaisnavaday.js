class VAISNAVAEVENT
{
	constructor() {
		this.prio = 0
		this.dispItem = 0
		this.text = ""
		this.fasttype = 0
		this.fastsubject = ""
		this.spec = ""
	}

	GetHtmlText() {
		if (this.dispItem == GCDS.CAL_SUN_RISE || this.dispItem == GCDS.CAL_SUN_SANDHYA ||
			this.dispItem == GCDS.CAL_BRAHMA_MUHURTA)
			return "&#9724; " + this.text;
		else if (dispItem == GCDS.CAL_COREEVENTS)
			return "&#9723; " + this.text;
		else
			return text;
	}

	toString() {
		return sprintf("prio: %d, dispItem: %d, text: %s, fast: %d, subject: %s, spec:%d", this.prio,
		    this.dispItem, this.text, this.fasttype, this.fastsubject, this.spec);
	}

}

class CoreEventFindRec
{
	constructor() {
		this.day = new VAISNAVADAY()
		this.coreEvent = new TCoreEvent()
		this.dateTimeOfEvent = new GregorianDateTime()
	}
}

class VAISNAVADAY
{
	constructor() {
		this.Previous = null
		this.Next = null

		// date
		this.date = null
		// moon times
		this.moonrise = new GCHourTime()
		this.moonrise.SetValue(0)
		this.moonset = new GCHourTime()
		this.moonset.SetValue(0)
		this.earth = null;
		// astronomical data from astro-sub-layer
		this.astrodata = null

		this.coreEvents = new TCoreEventCollection()

		this.BiasMinutes = 0
		this.DstDayType = DstTypeChange.DstOff;
		this.UtcDayStart = -1

		//
		// day events and fast
		this.dayEvents = [];
		this.nFeasting = null
		this.nFastID = FastType.FAST_NULL

		//
		// Ekadasi data
		//
		this.nMahadvadasiID = MahadvadasiType.EV_NULL
		this.ekadasi_vrata_name = ""
		//this.ekadasi_parana = false
		this.eparana_time1 = null
		this.eparana_time2 = null

		//
		// Sankranti data
		this.sankranti_zodiac = -1
		this.sankranti_day = null

		// Ksaya and Vridhi data
		//
		this.ksayaTithi = -1;
		this.ksayaMasa = -1;
		this.vriddhiDayNo = 1;
	}


	toString() {
		return sprintf("%s, Fast:%s, Tithi:%s, Masa:%s", this.date.toString(),
			GCStrings.GetFastingName(this.nFastID),
			GCTithi.GetName(this.astrodata.sunRise.Tithi),
			GCMasa.GetName(this.astrodata.Masa));
	}

	get astro()
	{
		return this.astrodata;
	}

	get fastType() {
		return this.nFastID;
	}

	GetGregorianDateTime(ce)
	{
		var gdt = new GregorianDateTime(this.date);
		gdt.shour = (ce.GetDstTime(this.BiasMinutes * 60) - this.UtcDayStart) / 86400.0;
		return gdt;
	}

	GetCoreEventTime(tce)
	{
		return GregorianDateTime.TimeSpanToLongString(tce.GetDstTime(this.BiasMinutes * 60) - this.UtcDayStart) 
			+ " ("
			+ GCStrings.GetDSTSignature(tce.nDst * this.BiasMinutes) 
			+ ")";
	}

	get VisibleEvents()
	{
		var ve = []
		foreach (ed in this.dayEvents)
		{
			let disp = ed.dispItem;
			if (ed.dispItem != 0 && (disp == -1 || gds.getValue(disp) != 0))
			{
				ve.add(ed);
			}
		}

		return ve
	}

	EkadasiCalc(earth)
	{
		var t = this;

		if (t.Previous == null || t.Next == null)
			return 0;

		var s = t.Previous;
		var u = t.Next;

		if (GCTithi.TITHI_EKADASI(t.astrodata.sunRise.Tithi))
		{
			// if TAT < 11 then NOT_EKADASI
			if (GCTithi.TITHI_LESS_EKADASI(t.astrodata.sunArunodaya.Tithi))
			{
				t.nMahadvadasiID = MahadvadasiType.EV_NULL;
				t.ekadasi_vrata_name = "";
				t.nFastID = FastType.FAST_NULL;
			}
			else
			{
				// else ak MD13 then MHD1 and/or 3
				if (GCTithi.TITHI_EKADASI(s.astrodata.sunRise.Tithi) && GCTithi.TITHI_EKADASI(s.astrodata.sunArunodaya.Tithi))
				{
					if (GCTithi.TITHI_TRAYODASI(u.astrodata.sunRise.Tithi))
					{
						t.nMahadvadasiID = MahadvadasiType.EV_UNMILANI_TRISPRSA;
						t.ekadasi_vrata_name = GCEkadasi.GetEkadasiName(t.astrodata.Masa, t.astrodata.sunRise.Paksa);
						t.nFastID = FastType.FAST_EKADASI;
					}
					else
					{
						t.nMahadvadasiID = MahadvadasiType.EV_UNMILANI;
						t.ekadasi_vrata_name = GCEkadasi.GetEkadasiName(t.astrodata.Masa, t.astrodata.sunRise.Paksa);
						t.nFastID = FastType.FAST_EKADASI;
					}
				}
				else
				{
					if (GCTithi.TITHI_TRAYODASI(u.astrodata.sunRise.Tithi))
					{
						t.nMahadvadasiID = MahadvadasiType.EV_TRISPRSA;
						t.ekadasi_vrata_name = GCEkadasi.GetEkadasiName(t.astrodata.Masa, t.astrodata.sunRise.Paksa);
						t.nFastID = FastType.FAST_EKADASI;
					}
					else
					{
						// else ak U je MAHADVADASI then NOT_EKADASI
						if (GCTithi.TITHI_EKADASI(u.astrodata.sunRise.Tithi) || (u.nMahadvadasiID >= MahadvadasiType.EV_SUDDHA))
						{
							t.nMahadvadasiID = MahadvadasiType.EV_NULL;
							t.ekadasi_vrata_name = "";
							t.nFastID = FastType.FAST_NULL;
						}
						else if (u.nMahadvadasiID == MahadvadasiType.EV_NULL)
						{
							// else suddha ekadasi
							t.nMahadvadasiID = MahadvadasiType.EV_SUDDHA;
							t.ekadasi_vrata_name = GCEkadasi.GetEkadasiName(t.astrodata.Masa, t.astrodata.sunRise.Paksa);
							t.nFastID = FastType.FAST_EKADASI;
						}
					}
				}
			}
		}
		// test for break fast


		return 1;
	}

	/*
	 * Function before is writen accoring this algorithms:


		1. Normal - fasting day has ekadasi at sunrise and dvadasi at next sunrise.

		2. Viddha - fasting day has dvadasi at sunrise and trayodasi at next
		sunrise, and it is not a naksatra mahadvadasi

		3. Unmilani - fasting day has ekadasi at both sunrises

		4. Vyanjuli - fasting day has dvadasi at both sunrises, and it is not a
		naksatra mahadvadasi

		5. Trisprsa - fasting day has ekadasi at sunrise and trayodasi at next
		sunrise.

		6. Jayanti/Vijaya - fasting day has gaura dvadasi and specified naksatra at
		sunrise and same naksatra at next sunrise

		7. Jaya/Papanasini - fasting day has gaura dvadasi and specified naksatra at
		sunrise and same naksatra at next sunrise

		==============================================
		Case 1 Normal (no change)

		If dvadasi tithi ends before 1/3 of daylight
		   then PARANA END = TIME OF END OF TITHI
		but if dvadasi TITHI ends after 1/3 of daylight
		   then PARANA END = TIME OF 1/3 OF DAYLIGHT

		if 1/4 of dvadasi tithi is before sunrise
		   then PARANA BEGIN is sunrise time
		but if 1/4 of dvadasi tithi is after sunrise
		   then PARANA BEGIN is time of 1/4 of dvadasi tithi

		if PARANA BEGIN is before PARANA END
		   then we will write "BREAK FAST FROM xx TO yy
		but if PARANA BEGIN is after PARANA END
		   then we will write "BREAK FAST AFTER xx"

		==============================================
		Case 2 Viddha

		If trayodasi tithi ends before 1/3 of daylight
		   then PARANA END = TIME OF END OF TITHI
		but if trayodasi TITHI ends after 1/3 of daylight
		   then PARANA END = TIME OF 1/3 OF DAYLIGHT

		PARANA BEGIN is sunrise time

		we will write "BREAK FAST FROM xx TO yy

		==============================================
		Case 3 Unmilani

		PARANA END = TIME OF 1/3 OF DAYLIGHT

		PARANA BEGIN is end of Ekadasi tithi

		if PARANA BEGIN is before PARANA END
		   then we will write "BREAK FAST FROM xx TO yy
		but if PARANA BEGIN is after PARANA END
		   then we will write "BREAK FAST AFTER xx"

		==============================================
		Case 4 Vyanjuli

		PARANA BEGIN = Sunrise

		PARANA END is end of Dvadasi tithi

		we will write "BREAK FAST FROM xx TO yy

		==============================================
		Case 5 Trisprsa

		PARANA BEGIN = Sunrise

		PARANA END = 1/3 of daylight hours

		we will write "BREAK FAST FROM xx TO yy

		==============================================
		Case 6 Jayanti/Vijaya

		PARANA BEGIN = Sunrise

		PARANA END1 = end of dvadasi tithi or sunrise, whichever is later
		PARANA END2 = end of naksatra

		PARANA END is earlier of END1 and END2

		we will write "BREAK FAST FROM xx TO yy

		==============================================
		Case 7 Jaya/Papanasini

		PARANA BEGIN = end of naksatra

		PARANA END = 1/3 of Daylight hours

		if PARANA BEGIN is before PARANA END
		   then we will write "BREAK FAST FROM xx TO yy
		but if PARANA BEGIN is after PARANA END
		   then we will write "BREAK FAST AFTER xx"


* */
	CalculateEParana(earth)
	{
		var t = this;
		if (t.Previous == null)
			return 0;

		t.nMahadvadasiID = MahadvadasiType.EV_NULL;
		//t.ekadasi_parana = true;
		t.nFastID = FastType.FAST_NULL;

		var naksEnd;
		var parBeg = null;
		var parEnd = null;
		var tithiStart = null;
		var tithiEnd = null;
		var sunRise = t.FindCoreEvent(CoreEventType.CCTYPE_S_RISE);
		var sunSet = t.FindCoreEvent(CoreEventType.CCTYPE_S_SET);
		if (sunRise == null || sunSet == null)
		{
			console.log("Cannot find sunrise of sunset for day ", t.date);
			return 0;
		}

		var third_day = new TCoreEvent() 
		third_day.nData = sunRise.nData
		third_day.nType = CoreEventType.CCTYPE_THIRD_OF_DAY
		third_day.nDst = sunRise.nDst
		third_day.Time = (sunSet.Time - sunRise.Time) / 3 + sunRise.Time

		var tempTimes = this.GetRecentCoreTimes(CoreEventType.CCTYPE_S_RISE, CoreEventType.CCTYPE_TITHI, 1);
		if (tempTimes.length != 1)
		{
			console.log("Start of tithi was not found for date " + t.toString());
			return 0;
		}
		else
		{
			tithiStart = new TCoreEvent(tempTimes[0].coreEvent);
		}

		tempTimes = this.GetNextCoreTimes(CoreEventType.CCTYPE_S_RISE, CoreEventType.CCTYPE_TITHI, 1);
		if (tempTimes.length != 1)
		{
			console.log("End of tithi was not found for date " + t.toString());
			return 0;
		}
		else
		{
			tithiEnd = new TCoreEvent(tempTimes[0].coreEvent)
			tithiEnd.nType = CoreEventType.CCTYPE_TITHI_END
			tithiEnd.ApplyDstType(this.UtcDayStart, this.DstDayType);
		}

		if (this.Previous == null)
			return 0;

		tempTimes = this.Previous.GetNextCoreTimes(CoreEventType.CCTYPE_S_RISE, CoreEventType.CCTYPE_NAKS, 1);
		if (tempTimes.length != 1)
		{
			console.log("End of naksatra was not found for date " + t.toString());
			return 0;
		}
		else
		{
			naksEnd = new TCoreEvent(tempTimes[0].coreEvent)
			naksEnd.nType = CoreEventType.CCTYPE_NAKS_END
			naksEnd.ApplyDstType(this.UtcDayStart, this.DstDayType);

		}

		var tithi_quart = new TCoreEvent()
		tithi_quart.nType = CoreEventType.CCTYPE_TITHI_QUARTER
		tithi_quart.nData = tithiStart.nData
		tithi_quart.Time = (tithiEnd.Time - tithiStart.Time) / 4 + tithiStart.Time
		tithi_quart.nDst = tithiStart.nDst
		tithi_quart.ApplyDstType(this.UtcDayStart, this.DstDayType);

		switch (t.Previous.nMahadvadasiID)
		{
			case MahadvadasiType.EV_UNMILANI:
				parEnd = GCMath.Min(tithiEnd, third_day);
				parBeg = sunRise;
				break;
			case MahadvadasiType.EV_VYANJULI:
				parBeg = sunRise;
				parEnd = GCMath.Min(tithiEnd, third_day);
				break;
			case MahadvadasiType.EV_TRISPRSA:
				parBeg = sunRise;
				parEnd = third_day;
				break;
			case MahadvadasiType.EV_JAYANTI:
			case MahadvadasiType.EV_VIJAYA:
				if (GCTithi.TITHI_DVADASI(t.astrodata.sunRise.Tithi))
				{
					if (naksEnd.Time < tithiEnd.Time)
					{
						if (naksEnd.Time < third_day.Time)
						{
							parBeg = naksEnd;
							parEnd = GCMath.Min(tithiEnd, third_day);
						}
						else
						{
							parBeg = naksEnd;
							parEnd = tithiEnd;
						}
					}
					else
					{
						parBeg = sunRise;
						parEnd = GCMath.Min(tithiEnd, third_day);
					}
				}
				else
				{
					parBeg = sunRise;
					parEnd = GCMath.Min(naksEnd, third_day);
				}

				break;
			case MahadvadasiType.EV_JAYA:
			case MahadvadasiType.EV_PAPA_NASINI:
				if (GCTithi.TITHI_DVADASI(t.astrodata.sunRise.Tithi))
				{
					if (naksEnd.Time < tithiEnd.Time)
					{
						if (naksEnd.Time < third_day.Time)
						{
							parBeg = naksEnd;
							parEnd = GCMath.Min(tithiEnd, third_day);
						}
						else
						{
							parBeg = naksEnd;
							parEnd = tithiEnd;
						}
					}
					else
					{
						parBeg = sunRise;
						parEnd = GCMath.Min(tithiEnd, third_day);
					}
				}
				else
				{
					if (naksEnd.Time < third_day.Time)
					{
						parBeg = naksEnd;
						parEnd = third_day;
					}
					else
					{
						parBeg = naksEnd;
						parEnd = null;
					}
				}

				break;
			default:
				// first initial
				parEnd = GCMath.Min(tithiEnd, third_day);
				parBeg = GCMath.Max(sunRise, tithi_quart);
				if (GCTithi.TITHI_DVADASI(t.Previous.astrodata.sunRise.Tithi))
				{
					parBeg = sunRise;
				}

				break;
		}

		if (parBeg.Time >= parEnd.Time)
		{
			parEnd = null;
		}

		t.eparana_time1 = parBeg;
		t.eparana_time2 = parEnd;

		return 1;
	}

	FindCoreEvent(nType)
	{
		for (var ce of this.coreEvents.items())
		{
			if (ce.nType == nType)
				return ce;
		}

		return null
	}

	GetRecentCoreTimes(nTypeStart, nTypeFind, count)
	{
		var dayList = [];
		var cursor = this;
		var idx = cursor.coreEvents.FindIndexOf(nTypeStart, 0);
		if (idx >= 0)
		{
			while (cursor != null && dayList.length < count)
			{
				idx = cursor.coreEvents.FindBackIndexOf(nTypeFind, idx - 1);
				if (idx < 0)
				{
					cursor = cursor.Previous;
					idx = 1000;
				}
				else
				{
					var cer = new CoreEventFindRec();
					cer.day = cursor;
					cer.coreEvent = cursor.coreEvents.item(idx);
					cer.dateTimeOfEvent = cursor.GetGregorianDateTime(cursor.coreEvents.item(idx));
					dayList.splice(0, 0, cer);
				}
			}
		}

		return dayList;
	}


	GetNextCoreTimes(nTypeStart, nTypeFind, count)
	{
		var dayList = [];
		var cursor = this;
		var idx = this.coreEvents.FindIndexOf(nTypeStart, 0);
		if (idx >= 0)
		{
			while (cursor != null && dayList.length < count)
			{
				idx = cursor.coreEvents.FindIndexOf(nTypeFind, idx++);
				if (idx < 0)
				{
					cursor = cursor.Next;
					idx = -1;
				}
				else
				{
					var cer = new CoreEventFindRec();
					cer.day = cursor;
					cer.coreEvent = cursor.coreEvents.item(idx);
					cer.dateTimeOfEvent = cursor.GetGregorianDateTime(cursor.coreEvents.item(idx));
					dayList.push(cer);
				}
			}
		}

		return dayList;
	}

	MahadvadasiCalc(earth)
	{
		var t = this;

		if (t.Previous == null || t.Next == null)
			return 0;

		var nMahaType = MahadvadasiType.EV_NULL;
		//int nMhdDay = -1;

		var s = t.Previous;
		var u = t.Next;
		var mahaDay = null;

		// if yesterday is dvadasi
		// then we skip this day
		if (GCTithi.TITHI_DVADASI(s.astrodata.sunRise.Tithi))
			return 1;

		if (TithiId.TITHI_GAURA_DVADASI == t.astrodata.sunRise.Tithi && TithiId.TITHI_GAURA_DVADASI == t.astrodata.sunSet.Tithi && ((nMahaType = t.IsMhd58()) != MahadvadasiType.EV_NULL))
		{
			t.nMahadvadasiID = nMahaType;
			mahaDay = t;
		}
		else if (GCTithi.TITHI_DVADASI(t.astrodata.sunRise.Tithi))
		{
			if (GCTithi.TITHI_DVADASI(u.astrodata.sunRise.Tithi) && GCTithi.TITHI_EKADASI(s.astrodata.sunRise.Tithi) && GCTithi.TITHI_EKADASI(s.astrodata.sunArunodaya.Tithi))
			{
				t.nMahadvadasiID = MahadvadasiType.EV_VYANJULI;
				mahaDay = t;
			}
			else if (t.NextNewFullIsVriddhi(earth))
			{
				t.nMahadvadasiID = MahadvadasiType.EV_PAKSAVARDHINI;
				mahaDay = t;
			}
			else if (GCTithi.TITHI_LESS_EKADASI(s.astrodata.sunArunodaya.Tithi))
			{
				t.nMahadvadasiID = MahadvadasiType.EV_SUDDHA;
				mahaDay = t;
			}
		}

		if (mahaDay != null && mahaDay.Next != null)
		{
			// fasting day
			mahaDay.nFastID = FastType.FAST_EKADASI;
			mahaDay.ekadasi_vrata_name = GCEkadasi.GetEkadasiName(t.astrodata.Masa, t.astrodata.sunRise.Paksa);
			//mahaDay.ekadasi_parana = false;
			mahaDay.eparana_time1 = null;
			mahaDay.eparana_time2 = null;

			// parana day
			mahaDay.Next.nFastID = FastType.FAST_NULL;
			//mahaDay.Next.ekadasi_parana = true;
			mahaDay.Next.eparana_time1 = null;
			mahaDay.Next.eparana_time2 = null;
		}

		return 1;
	}

	NextNewFullIsVriddhi(earth)
	{
		var i = 0;
		var nTithi;
		var nPrevTithi = 100;
		var t = this;

		for (i = 0; i < 8 && t != null; i++)
		{
			nTithi = t.astrodata.sunRise.Tithi;
			if ((nTithi == nPrevTithi) && GCTithi.TITHI_FULLNEW_MOON(nTithi))
			{
				return true;
			}
			nPrevTithi = nTithi;
			t = t.Next;
		}

		return false;
	}


	// test for MAHADVADASI 5 TO 8
	IsMhd58() {
		var t = this;
		var nMahaType = MahadvadasiType.EV_NULL;
		
		if (t.Next == null)
			return MahadvadasiType.EV_NULL

		var sunRiseNaksatra = t.astrodata.sunRise.Naksatra;

		if (sunRiseNaksatra != t.Next.astrodata.sunRise.Naksatra)
			return MahadvadasiType.EV_NULL

		if (t.astrodata.sunRise.Paksa != 1)
			return MahadvadasiType.EV_NULL

		if (t.astrodata.sunRise.Tithi == t.astrodata.sunSet.Tithi)
		{
			if (sunRiseNaksatra == GCNaksatra.N_PUNARVASU) // punarvasu
			{
				return MahadvadasiType.EV_JAYA;
			}
			else if (sunRiseNaksatra == GCNaksatra.N_ROHINI) // rohini
			{
				return MahadvadasiType.EV_JAYANTI;
			}
			else if (sunRiseNaksatra == GCNaksatra.N_PUSYAMI) // pusyami
			{
				return MahadvadasiType.EV_PAPA_NASINI;
			}
			else if (sunRiseNaksatra == GCNaksatra.N_SRAVANA) // sravana
			{
				return MahadvadasiType.EV_VIJAYA;
			}
			else
				return MahadvadasiType.EV_NULL;
		}
		else
		{
			if (sunRiseNaksatra == GCNaksatra.N_SRAVANA) // sravana
			{
				return MahadvadasiType.EV_VIJAYA;
			}
		}

		return MahadvadasiType.EV_NULL;
	}

	//public bool GetTithiTimeRange(GCEarthData earth, out GregorianDateTime from, out GregorianDateTime to)
	//{
	//    GregorianDateTime start = new GregorianDateTime();

	//    start.Set(date);
	//    start.shour = astrodata.sunRise.TotalDays;

	//    GCTithi.GetNextTithiStart(earth, start, out to);
	//    GCTithi.GetPrevTithiStart(earth, start, out from);

	//    return true;

	//}

	//public bool GetNaksatraTimeRange(GCEarthData earth, out GregorianDateTime from, out GregorianDateTime to)
	//{
	//    GregorianDateTime start = new GregorianDateTime();

	//    start.Set(date);
	//    start.shour = astrodata.sunRise.TotalDays;

	//    GCNaksatra.GetNextNaksatra(earth, start, out to);
	//    GCNaksatra.GetPrevNaksatra(earth, start, out from);

	//    return true;
	//}

	GetTextEP() {
		var str = ""
		var e1, e2;

		e1 = this.GetGregorianDateTime(this.eparana_time1);
		if (this.eparana_time2 != null)
		{
			e2 = this.GetGregorianDateTime(this.eparana_time2);

			if (gds.getValue(50) == 1)
				str = sprintf("%s %s (%s) - %s (%s) %s", GCStrings.getString(60),
					e1.ShortTimeString(), GCEkadasi.GetParanaReasonText(this.eparana_time1.nType),
					e2.ShortTimeString(), GCEkadasi.GetParanaReasonText(this.eparana_time2.nType),
					GCStrings.GetDSTSignature(this.BiasMinutes));
			else
				str = GCStrings.Format("{0} {1} - {2} ({3})", GCStrings.getString(60),
					e1.ShortTimeString(), e2.ShortTimeString(), GCStrings.GetDSTSignature(this.BiasMinutes));
		}
		else if (this.eparana_time1 != null)
		{
			if (gds.getValue(50) == 1)
				str = GCStrings.Format("{0} {1} ({2}) {3}", GCStrings.getString(61),
					e1.ShortTimeString(), GCEkadasi.GetParanaReasonText(this.eparana_time1.nType), 
					GCStrings.GetDSTSignature(this.BiasMinutes));
			else
				str = GCStrings.Format("{0} {1} ({2})", GCStrings.getString(61),
					e1.ShortTimeString(), GCStrings.GetDSTSignature(this.BiasMinutes));
		}
		else
		{
			str = GCStrings.getString(62);
		}
		return str;
	}

	GetDateText()
	{
		return GCStrings.Format("{0:00} {1} {2} {3}", this.date.day, 
			GregorianDateTime.GetMonthAbreviation(this.date.month), 
			this.date.year, GCCalendar.GetWeekdayAbbr(this.date.dayOfWeek));
	}

	hasEventsOfDisplayIndex(dispIndex)
	{
		foreach (md in this.dayEvents)
		{
			if (md.dispItem == dispIndex)
				return true;
		}

		return false;
	}


	findEventsText(text)
	{

		foreach (md in this.dayEvents)
		{
			if (md.text != null && md.text.toLowerCase().Index(text) >= 0)
				return md;
		}

		return null;
	}


	AddEvent(priority, dispItem, text)
	{
		var dc = new VAISNAVAEVENT();

		dc.prio = priority;
		dc.dispItem = parseInt(dispItem);
		dc.text = text;

		this.dayEvents.push(dc);

		return dc;
	}

	get prevTithiName()
	{
		return GCTithi.GetName((this.astrodata.sunRise.Tithi + 29) % 30);		
	}

	get sunRiseSec()
	{
		return this.astro.sunRise.TotalSeconds;
	}

	get moonRiseSec()
	{
		if (this.moonrise.hour <= 0) {
			var mres = GCMoonData_CalcMoonTimes(this.earth, this.date, this.BiasMinutes/60.0);
			this.moonrise = mres.moonrise;
			this.moonset = mres.moonset;
		}
		return this.moonrise.TotalSeconds;
	}

	get midnightNaksatra()
	{
		var date = GregorianDateTime.fromDate(this.date);
		var midnight = GCHourTime.fromObject(this.astrodata.sunNoon);
		date.shour = this.astrodata.sunNoon.TotalDays;
		date.AddHours(12);
		midnight.longitudeMoon = GCCoreAstronomy.GetMoonLongitude(date, this.earth);
		return midnight.Naksatra;
	}

	Format(format, args)
	{
		if (format.indexOf("{day}") >= 0)
			format = format.replace("{day}", this.date.day.toString());
		if (format.indexOf("{month}") >= 0)
			format = format.replace("{month}", this.date.month.toString());
		if (format.indexOf("{monthAbr}") >= 0)
			format = format.replace("{monthAbr}", GregorianDateTime.GetMonthName(this.date.month));
		if (format.indexOf("{monthName}") >= 0)
			format = format.replace("{monthName}", GregorianDateTime.GetMonthName(this.date.month));
		if (format.indexOf("{year}") >= 0)
			format = format.replace("{year}", this.date.year.toString());
		if (format.indexOf("{hour}") >= 0)
			format = format.replace("{hour}", sprintf("%02d", this.date.GetHour()));
		if (format.indexOf("{min}") >= 0)
			format = format.replace("{min}", sprintf("%02d", this.date.GetMinute()));
		if (format.indexOf("{minRound}") >= 0)
			format = format.replace("{minRound}", sprintf("%02d", this.date.GetMinuteRound()));
		if (format.indexOf("{sec}") >= 0)
			format = format.replace("{sec}", sprintf("%02d", this.date.GetSecond()));

		if (format.indexOf("{masaName}") >= 0)
			format = format.replace("{masaName}", GCMasa.GetName(this.astrodata.Masa));
		if (format.indexOf("{gaurabdaYear}") >= 0)
			format = format.replace("{gaurabdaYear}", this.astrodata.GaurabdaYear.toString());
		if (format.indexOf("{tithiName}") >= 0)
			format = format.replace("{tithiName}", GCTithi.GetName(this.astrodata.sunRise.Tithi));
		if (format.indexOf("{prevTithiName}") >= 0)
			format = format.replace("{prevTithiName}", GCTithi.GetName((this.astrodata.sunRise.Tithi + 29) % 30));
		if (format.indexOf("{nextTithiName}") >= 0)
			format = format.replace("{nextTithiName}", GCTithi.GetName((this.astrodata.sunRise.Tithi + 1) % 30));
		if (format.indexOf("{paksaName}") >= 0)
			format = format.replace("{paksaName}", GCPaksa.GetName(this.astrodata.sunRise.Paksa));
		if (format.indexOf("{yogaName}") >= 0)
			format = format.replace("{yogaName}", GCYoga.GetName(this.astrodata.sunRise.Yoga));
		if (format.indexOf("{naksatraName}") >= 0)
			format = format.replace("{naksatraName}", GCNaksatra.GetName(this.astrodata.sunRise.Naksatra));
		if (format.indexOf("{naksatraElapse}") >= 0)
			format = format.replace("{naksatraElapse}", sprintf("%.1f %%", this.astrodata.sunRise.NaksatraElapse));
		if (format.indexOf("{naksatraPada}") >= 0)
			format = format.replace("{naksatraPada}", GCNaksatra.GetPadaText(this.astrodata.sunRise.NaksatraPada));

		if (format.indexOf("{sankranti.day}") >= 0)
			format = format.replace("{sankranti.day}", this.sankranti_day.day.toString());
		if (format.indexOf("{sankranti.month}") >= 0)
			format = format.replace("{sankranti.month}", this.sankranti_day.month.toString());
		if (format.indexOf("{sankranti.monthAbr}") >= 0)
			format = format.replace("{sankranti.monthAbr}", GregorianDateTime.GetMonthName(this.sankranti_day.month));
		if (format.indexOf("{sankranti.monthName}") >= 0)
			format = format.replace("{sankranti.monthName}", GregorianDateTime.GetMonthName(this.sankranti_day.month));
		if (format.indexOf("{sankranti.hour}") >= 0)
			format = format.replace("{sankranti.hour}", sprintf("%02d", this.sankranti_day.GetHour()));
		if (format.indexOf("{sankranti.min}") >= 0)
			format = format.replace("{sankranti.min}", sprintf("%02d", this.sankranti_day.GetMinute()));
		if (format.indexOf("{sankranti.minRound}") >= 0)
			format = format.replace("{sankranti.minRound}", sprintf("%02d", this.sankranti_day.GetMinuteRound()));
		if (format.indexOf("{sankranti.sec}") >= 0)
			format = format.replace("{sankranti.sec}", sprintf("%02d", this.sankranti_day.GetSecond()));
		if (format.indexOf("{sankranti.rasiNameEn}") >= 0)
			format = format.replace("{sankranti.rasiNameEn}", GCRasi.GetNameEn(this.sankranti_zodiac));
		if (format.indexOf("{sankranti.rasiName}") >= 0)
			format = format.replace("{sankranti.rasiName}", GCRasi.GetName(this.sankranti_zodiac));

		if (format.indexOf("{dstSig}") >= 0)
			format = format.replace("{dstSig}", GCStrings.GetDSTSignature(this.BiasMinutes));

		if (format.indexOf("{moonRiseTime}") >= 0)
			format = format.replace("{moonRiseTime}", this.moonrise.ToShortTimeString());
		if (format.indexOf("{moonSetTime}") >= 0)
			format = format.replace("{moonSetTime}", this.moonset.ToShortTimeString());
		if (format.indexOf("{moonRasiName}") >= 0)
			format = format.replace("{moonRasiName}", GCRasi.GetName(this.astrodata.sunRise.RasiOfMoon));
		if (format.indexOf("{moonRasiNameEn}") >= 0)
			format = format.replace("{moonRasiNameEn}", GCRasi.GetNameEn(this.astrodata.sunRise.RasiOfMoon));

		if (args == null || args.Length == 0)
			return format.toString();
		else
			return GCStrings.Format(format.toString(), args);
	}

	GetFullTithiName()
	{
		var str = GCTithi.GetName(this.astrodata.sunRise.Tithi);

		if (this.HasExtraFastingNote())
		{
			str = GCStrings.Format("{0} {1}", str, this.GetExtraFastingNote());
		}

		return str;
	}

	get ekadasi_parana() {
		return this.eparana_time1 != null;
	}

	HasExtraFastingNote()
	{
		var t = this.astrodata.sunRise.Tithi;
		if ((t == 10) || (t == 25) || (t == 11) || (t == 26))
		{
			if (this.ekadasi_parana == false)
			{
				return true;
			}
		}

		return false;
	}

	GetExtraFastingNote()
	{
		if (this.HasExtraFastingNote())
		{
			if (this.nMahadvadasiID == MahadvadasiType.EV_NULL)
			{
				return GCStrings.getString(58);
			}
			else
			{
				return GCStrings.getString(59);
			}
		}
		return "";
	}

	SortDayEvents()
	{
		this.dayEvents.sort(function(a, b){return a.prio - b.prio});
	}
}



