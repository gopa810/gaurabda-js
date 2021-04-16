let GCTithi_tithiName = [
	"Pratipat",
	"Dvitiya",
	"Tritiya",
	"Caturthi",
	"Pancami",
	"Sasti",
	"Saptami",
	"Astami",
	"Navami",
	"Dasami",
	"Ekadasi",
	"Dvadasi",
	"Trayodasi",
	"Caturdasi",
	"Amavasya",
	"Pratipat",
	"Dvitiya",
	"Tritiya",
	"Caturthi",
	"Pancami",
	"Sasti",
	"Saptami",
	"Astami",
	"Navami",
	"Dasami",
	"Ekadasi",
	"Dvadasi",
	"Trayodasi",
	"Caturdasi",
	"Purnima"
]

class GCTithi
{

	/*********************************************************************/
	/*                                                                   */
	/*   finds next time when starts next tithi                          */
	/*                                                                   */
	/*   timezone is not changed                                         */
	/*                                                                   */
	/*   return value: index of tithi 0..29                              */
	/*                 or -1 if failed                                   */
	/*********************************************************************/

	static GetNextTithiStart(ed, startDate)
	{
		var phi = 12.0;
		var l1, l2, longitudeSun, longitudeMoon;
		var jday = startDate.GetJulianComplete();
		var xj;
		var d = new GregorianDateTime();
		d.Set(startDate);
		var xd = new GregorianDateTime();
		var scan_step = 0.5;
		var prev_tit = 0;
		var new_tit = -1;

		longitudeSun = GCCoreAstronomy.GetSunLongitude(d, ed);
		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
		l1 = GCMath.putIn360(longitudeMoon - longitudeSun - 180.0);
		prev_tit = GCMath.IntFloor(l1 / phi);

		var counter = 0;
		while (counter < 20)
		{
			xj = jday;
			xd.Set(d);

			jday += scan_step;
			d.shour += scan_step;
			if (d.shour > 1.0)
			{
				d.shour -= 1.0;
				d.NextDay();
			}

			longitudeSun = GCCoreAstronomy.GetSunLongitude(d, ed);
			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
			l2 = GCMath.putIn360(longitudeMoon - longitudeSun - 180.0);
			new_tit = GCMath.IntFloor(l2 / phi);

			if (prev_tit != new_tit)
			{
				jday = xj;
				d.Set(xd);
				scan_step *= 0.5;
				counter++;
				continue;
			}
			else
			{
				l1 = l2;
			}
		}
		return [new_tit, d];
	}

	/*********************************************************************/
	/*                                                                   */
	/*   finds previous time when starts next tithi                      */
	/*                                                                   */
	/*   timezone is not changed                                         */
	/*                                                                   */
	/*   return value: index of tithi 0..29                              */
	/*                 or -1 if failed                                   */
	/*********************************************************************/

	static GetPrevTithiStart(ed, startDate)
	{
		var phi = 12.0;
		var l1, l2, longitudeSun, longitudeMoon;
		var jday = startDate.GetJulianComplete();
		var xj;
		var d = new GregorianDateTime();
		d.Set(startDate);
		var xd = new GregorianDateTime();
		var scan_step = 0.5;
		var prev_tit = 0;
		var new_tit = -1;

		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
		longitudeSun = GCCoreAstronomy.GetSunLongitude(d, ed);
		l1 = GCMath.putIn360(longitudeMoon - longitudeSun - 180.0);
		prev_tit = GCMath.IntFloor(l1 / phi);

		var counter = 0;
		while (counter < 20)
		{
			xj = jday;
			xd.Set(d);

			jday -= scan_step;
			d.shour -= scan_step;
			if (d.shour < 0.0)
			{
				d.shour += 1.0;
				d.PreviousDay();
			}

			longitudeSun = GCCoreAstronomy.GetSunLongitude(d, ed);
			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
			l2 = GCMath.putIn360(longitudeMoon - longitudeSun - 180.0);
			new_tit = GCMath.IntFloor(l2 / phi);

			if (prev_tit != new_tit)
			{
				jday = xj;
				d.Set(xd);
				scan_step *= 0.5;
				counter++;
				continue;
			}
			else
			{
				l1 = l2;
			}
		}
		//	nextDate.shour += startDate.tzone / 24.0;
		//	nextDate.NormalizeValues();
		return [new_tit, d];
	}

	/*

	Routines for calculation begining and ending times of given Tithi

	Main function is GetTithiTimes

	*/

	static GetTithiTimes(ed, vc, sunRise)
	{
	    var t1, t2
		var d1, d2;

		vc.shour = sunRise;
		[t1,d1] = GCTithi.GetPrevTithiStart(ed, vc);
		[t2,d2] = GCTithi.GetNextTithiStart(ed, vc);

		titBeg = d1.shour + d1.GetJulian() - vc.GetJulian();
		titEnd = d2.shour + d2.GetJulian() - vc.GetJulian();

		return [(titEnd - titBeg),titBeg,titEnd];
	}

	/*********************************************************************/
	/* Finds starting and ending time for given tithi                    */
	/*                                                                   */
	/* tithi is specified by Gaurabda year, masa, paksa and tithi number */
	/*      nGYear - 0..9999                                             */
	/*       nMasa - 0..12, 0-Madhusudana, 1-Trivikrama, 2-Vamana        */
	/*                      3-Sridhara, 4-Hrsikesa, 5-Padmanabha         */
	/*                      6-Damodara, 7-Kesava, 8-narayana, 9-Madhava  */
	/*                      10-Govinda, 11-Visnu, 12-PurusottamaAdhika   */
	/*       nPaksa -       0-Krsna, 1-Gaura                             */
	/*       nTithi - 0..14                                              */
	/*       earth  - used timezone                                      */
	/*                                                                   */
	/*********************************************************************/

	static CalcTithiEnd(nGYear, nMasa, nPaksa, nTithi, earth)
	{
		var d = new GregorianDateTime();

		d.Set(GCAstroData.GetFirstDayOfYear(earth, nGYear + 1486));
		d.shour = 0.5;
		d.TimezoneHours = earth.OffsetUtcHours;

		return CalcTithiEndEx(d, nGYear, nMasa, nPaksa, nTithi, earth);
	}

	static CalcTithiEndEx(vcStart, GYear, nMasa, nPaksa, nTithi, earth)
	{
		var endTithi = GregorianDateTime()
		var i = 0, gy = 0, nType = 0
		var d = new GregorianDateTime();
		var day = new GCAstroData();
		var tithi;
		var counter;
		var start = new GregorianDateTime()
		var end = new GregorianDateTime();
		//	SUNDATA sun;
		//	MOONDATA moon;
		var sunrise = 0.0
		start.shour = -1.0
		end.shour = -1.0
		start.day = start.month = start.year = -1;
		end.day = end.month = end.year = -1;

		/*	d = GetFirstDayOfYear(earth, nGYear + 1486);
			d.shour = 0.5;
			d.TimeZone = earth.tzone;
		*/
		d.Set(vcStart);

		i = 0;
		do
		{
			d.AddDays(13);
			day.DayCalc(d, earth);
			day.Masa = day.MasaCalc(d, earth);
			gy = day.GaurabdaYear;
			i++;
		}
		while (((day.sunRise.Paksa != nPaksa) || (day.Masa != nMasa)) && (i <= 30));

		if (i >= 30)
		{
			d.year = d.month = d.day = -1;
			return [d,null];
		}

		// we found masa and paksa
		// now we have to find tithi
		tithi = nTithi + nPaksa * 15;

		if (day.sunRise.Tithi == tithi)
		{
			// loc1
			// find tithi juncts in this day and according to that times,
			// look in previous or next day for end and start of this tithi
			nType = 1;
		}
		else
		{
			var succ = false
			if (day.sunRise.Tithi < tithi)
			{
				// do increment of date until nTithi == tithi
				//   but if nTithi > tithi
				//       then do decrement of date
				counter = 0;
				while (counter < 30)
				{
					d.NextDay();
					day.DayCalc(d, earth);
					if (day.sunRise.Tithi == tithi) {
						succ = true
						break
					}
					if ((day.sunRise.Tithi < tithi) && (day.sunRise.Paksa != nPaksa))
					{
						d.PreviousDay();
						succ = true
						break
					}
					if (day.sunRise.Tithi > tithi)
					{
						d.PreviousDay();
						succ = true
						break
					}
					counter++;
				}

				if (!succ) {
					// somewhere is error
					d.year = d.month = d.day = 0;
					nType = 0;
				}
			}
			else
			{
				// do decrement of date until nTithi <= tithi
				counter = 0;
				while (counter < 30)
				{
					d.PreviousDay();
					day.DayCalc(d, earth);
					if (day.sunRise.Tithi == tithi)
					{
						succ = true
						break
					}
					if ((day.sunRise.Tithi > tithi) && (day.sunRise.Paksa != nPaksa))
					{
						succ = true
						break
					}
					if (day.sunRise.Tithi < tithi)
					{
						succ = true
						break
					}
					counter++;
				}
				if (!succ) {
					// somewhere is error
					d.year = d.month = d.day = 0;
					nType = 0;
				}

			}

			if (day.sunRise.Tithi == tithi)
			{
				// do the same as in loc1
				nType = 1;
			}
			else
			{
				// nTithi != tithi and nTithi < tithi
				// but on next day is nTithi > tithi
				// that means we will find start and the end of tithi
				// in this very day or on next day before sunrise
				nType = 2;
			}

		}

		// now we know the type of day-accurancy
		// nType = 0 means, that we dont found a day
		// nType = 1 means, we find day, when tithi was present at sunrise
		// nType = 2 means, we found day, when tithi started after sunrise
		//                  but ended before next sunrise
		//
		sunrise = day.sunRise.TotalDays;
		endTithi = new GregorianDateTime();
		if (nType == 1)
		{
			var t1, t2
			var d1, d2
			d.shour = sunrise;
			[t1,d1] = GCTithi.GetPrevTithiStart(earth, d)
			//d = d1;
			//d.shour += 0.02;
			[t2,d2] = GCTithi.GetNextTithiStart(earth, d)
			return [d1,d2];
		}
		else if (nType == 2)
		{
			var t1, t2
			var d1, d2
			d.shour = sunrise;
			[t1,d1] = GCTithi.GetNextTithiStart(earth, d)
			d.Set(d1);
			d.shour += 0.1;
			d.NormalizeValues();
			[t2,d2] = GCTithi.GetNextTithiStart(earth, d)

			return [d1,d2];
		}

		// if nType == 0, then this algoritmus has some failure
		if (nType == 0)
		{
			d.year = 0;
			d.month = 0;
			d.day = 0;
			d.shour = 0.0;
			endTithi.Set(d);
		}
		else
		{
			d.Set(start);
			endTithi.Set(end);
		}
		return [d,endTithi];
	}


	/*********************************************************************/
	/*  Calculates Date of given Tithi                                   */
	/*********************************************************************/

	static CalcTithiDate(nGYear, nMasa, nPaksa, nTithi, earth)
	{
		var i = 0, gy = 0;
		var d = new GregorianDateTime();
		var day = new GCAstroData();
		var tithi = 0;
		var counter = 0;
		var tmp = 0;

		if (nGYear >= 464 && nGYear < 572)
		{
			tmp = GCAstroData.gGaurBeg[(nGYear - 464) * 26 + nMasa * 2 + nPaksa];
			d.month = Convert.ToInt32((tmp & 0x3e0) >> 5);
			d.day = Convert.ToInt32(tmp & 0x1f);
			d.year = Convert.ToInt32(tmp & 0xfffc00) >> 10;
			d.TimezoneHours = earth.OffsetUtcHours;
			d.NextDay();

			day.DayCalc(d, earth);
			day.Masa = day.MasaCalc(d, earth);
			gy = day.GaurabdaYear;
		}
		else
		{
			//d = GetFirstDayOfYear(earth, nGYear + 1486);
			d.day = 15;
			d.month = 2 + nMasa;
			d.year = nGYear + 1486;
			if (d.month > 12)
			{
				d.month -= 12;
				d.year++;
			}
			d.shour = 0.5;
			d.TimezoneHours = earth.OffsetUtcHours;

			i = 0;
			do
			{
				d.AddDays(13);
				day.DayCalc(d, earth);
				day.Masa = day.MasaCalc(d, earth);
				gy = day.GaurabdaYear;
				i++;
			}
			while (((day.sunRise.Paksa != nPaksa) || (day.Masa != nMasa)) && (i <= 30));
		}

		if (i >= 30)
		{
			d.year = d.month = d.day = -1;
			return d;
		}

		// we found masa and paksa
		// now we have to find tithi
		tithi = nTithi + nPaksa * 15;

		if (day.sunRise.Tithi == tithi)
		{
			// loc1
			// find tithi juncts in this day and according to that times,
			// look in previous or next day for end and start of this tithi
			d.PreviousDay();
			day.DayCalc(d, earth);
			if ((day.sunRise.Tithi > tithi) && (day.sunRise.Paksa != nPaksa))
			{
				d.NextDay();
			}
			return d;
		}

		if (day.sunRise.Tithi < tithi)
		{
			// do increment of date until nTithi == tithi
			//   but if nTithi > tithi
			//       then do decrement of date
			counter = 0;
			while (counter < 16)
			{
				d.NextDay();
				day.DayCalc(d, earth);
				if (day.sunRise.Tithi == tithi)
					return d;
				if ((day.sunRise.Tithi < tithi) && (day.sunRise.Paksa != nPaksa))
					return d;
				if (day.sunRise.Tithi > tithi)
					return d;
				counter++;
			}
			// somewhere is error
			d.year = d.month = d.day = 0;
			return d;
		}
		else
		{
			// do decrement of date until nTithi <= tithi
			counter = 0;
			while (counter < 16)
			{
				d.PreviousDay();
				day.DayCalc(d, earth);
				if (day.sunRise.Tithi == tithi)
					return d;
				if ((day.sunRise.Tithi > tithi) && (day.sunRise.Paksa != nPaksa))
				{
					d.NextDay();
					return d;
				}
				if (day.sunRise.Tithi < tithi)
				{
					d.NextDay();
					return d;
				}
				counter++;
			}
			// somewhere is error
			d.year = d.month = d.day = 0;
			return d;
		}

		// now we know the type of day-accurancy
		// nType = 0 means, that we dont found a day
		// nType = 1 means, we find day, when tithi was present at sunrise
		// nType = 2 means, we found day, when tithi started after sunrise
		//                  but ended before next sunrise
		//

		return d;
	}

	static TITHI_EKADASI(a)
	{
		return (((a) == 10) || ((a) == 25));
	}

	static TITHI_DVADASI(a)
	{
		return (((a) == 11) || ((a) == 26));
	}

	static TITHI_TRAYODASI(a)
	{
		return (((a) == 12) || ((a) == 27));
	}

	static TITHI_CATURDASI(a) { return ((a == 13) || (a == 28)); }

	static TITHI_LESS_EKADASI(a) { return (((a) == 9) || ((a) == 24) || ((a) == 8) || ((a) == 23)); }
	static TITHI_LESS_DVADASI(a) { return (((a) == 10) || ((a) == 25) || ((a) == 9) || ((a) == 24)); }
	static TITHI_LESS_TRAYODASI(a) { return (((a) == 11) || ((a) == 26) || ((a) == 10) || ((a) == 25)); }
	static TITHI_FULLNEW_MOON(a) { return (((a) == 14) || ((a) == 29)); }

	static PREV_PREV_TITHI(a) { return (((a) + 28) % 30); }
	static PREV_TITHI(a) { return (((a) + 29) % 30); }
	static NEXT_TITHI(a) { return (((a) + 1) % 30); }
	static NEXT_NEXT_TITHI(a) { return (((a) + 1) % 30); }

	static TITHI_LESS_THAN(a, b) { return (((a) == PREV_TITHI(b)) || ((a) == PREV_PREV_TITHI(b))); }
	static TITHI_GREAT_THAN(a, b) { return (((a) == NEXT_TITHI(b)) || ((a) == NEXT_NEXT_TITHI(b))); }

	// TRUE when transit from A to B is between T and U
	static TITHI_TRANSIT(t, u, a, b)
	{
		return ((t == a) && (u == b))
			|| ((t == a) && (u == NEXT_TITHI(b)))
			|| ((t == PREV_TITHI(a)) && (u == b));
	}

	static TITHI_DIST(a, b)
	{
		var r = a - b;
		while (r < -15)
			r += 30;
		return r;
	}


	/// <summary>
	/// Retrieves name of tithi
	/// </summary>
	/// <param name="nTithi">Values 0..29, where 0 is for Pratipat in Krsna Paksa</param>
	/// <returns></returns>
	static GetName(nTithi)
	{
		return GCTithi_tithiName[nTithi % 30]
	}
}
