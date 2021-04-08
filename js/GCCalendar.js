let PeriodUnit = {
		Days : 1,
		Weeks : 2,
		Months : 3,
		Years : 4,
		Tithis : 5,
		Masas : 6,
		Gaurabda : 7
	}

let GCCalendar_WeekDayAbbr = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
let GCCalendar_WeekDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class GCCalendar {

	/// <summary>
	///
	/// </summary>
	/// <param name="dow">from range 0..6</param>
	/// <returns></returns>
	static GetWeekdayAbbr(dow)
	{
		if (dow >= 0 && dow < 7) {
			return GCCalendar_WeekDayAbbr[dow]
		}
		return "";
	}

	static GetWeekdayName(dow)
	{
		if (dow >= 0 && dow < 7) {
			return GCCalendar_WeekDayName[dow]
		}
		return "";
	}

	static GetGaurabdaYear(vc, earth)
	{
		var day = new GCAstroData();

		day.DayCalc(vc, earth);
		day.MasaCalc(vc, earth);

		return day.GaurabdaYear;
	}

	static FormatDate(vc, va)
	{
		return GCStrings.Format("{0} {1} {2}\r\n{3}, {4} Paksa, {5} Masa, {6}",
			vc.day, GregorianDateTime.GetMonthAbreviation(vc.month), vc.year,
			GCTithi.GetName(va.tithi % 15), GCPaksa.GetName(va.tithi / 15), GCMasa.GetName(va.masa), va.gyear);

	}

	//===========================================================================
	//
	//===========================================================================

	static VATIMEtoVCTIME(va, earth)
	{
		return GCTithi.CalcTithiDate(va.gyear, va.masa, va.tithi / 15, va.tithi % 15, earth);
	}

	//===========================================================================
	//
	//===========================================================================

	static VCTIMEtoVATIME(vc, earth)
	{
		var day = new GCAstroData();

		day.DayCalc(vc, earth);
		var va = new GaurabdaDate();
		va.masa = day.MasaCalc(vc, earth);
		va.tithi = day.sunRise.Tithi;
		va.gyear = day.GaurabdaYear;
	}

	static LimitForPeriodUnit(pu)
	{
		switch (pu)
		{
			case PeriodUnit.Days:
			case PeriodUnit.Tithis:
				return 36500;
			case PeriodUnit.Weeks:
				return 520;
			case PeriodUnit.Months:
			case PeriodUnit.Masas:
				return 1200;
			default:
				return 100;
		}
	}

	static CalcEndDate(m_earth, vcStart, nType, nCount)
	{
		if (m_earth == null || vcStart == null)
		{
			return false,null;
		}

		var vaStart = VCTIMEtoVATIME(vcStart, m_earth);
		var vcEnd = new GregorianDateTime();
		var vaEnd = new GaurabdaDate();
		if (nCount > LimitForPeriodUnit(nType))
			nCount = LimitForPeriodUnit(nType);

		switch (nType)
		{
			case PeriodUnit.Days:
				vcEnd.Set(vcStart);
				vcEnd.AddDays(nCount);
				vaEnd = VCTIMEtoVATIME(vcEnd, m_earth);
				break;
			case PeriodUnit.Weeks:
				vcEnd.Set(vcStart);
				vcEnd.AddDays(nCount * 7);
				vaEnd = VCTIMEtoVATIME(vcEnd, m_earth);
				break;
			case PeriodUnit.Months:
				vcEnd.Set(vcStart);
				vcEnd.month += nCount;
				while (vcEnd.month > 12)
				{
					vcEnd.year++;
					vcEnd.month -= 12;
				}
				vaEnd = VCTIMEtoVATIME(vcEnd, m_earth);
				break;
			case PeriodUnit.Years:
				vcEnd.Set(vcStart);
				vcEnd.year += nCount;
				vaEnd = VCTIMEtoVATIME(vcEnd, m_earth);
				break;
			case PeriodUnit.Tithis:
				vaEnd.Set(vaStart);
				vaEnd.tithi += nCount;
				while (vaEnd.tithi >= 30)
				{
					vaEnd.tithi -= 30;
					vaEnd.masa++;
				}
				while (vaEnd.masa >= 12)
				{
					vaEnd.masa -= 12;
					vaEnd.gyear++;
				}
				vcEnd = VATIMEtoVCTIME(vaEnd, m_earth);
				break;
			case PeriodUnit.Masas:
				vaEnd.Set(vaStart);
				vaEnd.masa = MasaToComboMasa(vaEnd.masa);
				if (vaEnd.masa == MasaId.ADHIKA_MASA)
				{
					vcEnd.Set(vcStart);
					vcEnd.month += nCount;
					while (vcEnd.month > 12)
					{
						vcEnd.year++;
						vcEnd.month -= 12;
					}
					vaEnd = VCTIMEtoVATIME(vcEnd, m_earth);
					vaEnd.tithi = vaStart.tithi;
					vcEnd = VATIMEtoVCTIME(vaEnd, m_earth);
				}
				else
				{
					vaEnd.masa += nCount;
					while (vaEnd.masa >= 12)
					{
						vaEnd.masa -= 12;
						vaEnd.gyear++;
					}
					vaEnd.masa = ComboMasaToMasa(vaEnd.masa);
					vcEnd = VATIMEtoVCTIME(vaEnd, m_earth);
				}
				break;
			case PeriodUnit.Gaurabda:
				vaEnd.Set(vaStart);
				vaEnd.gyear += nCount;
				vcEnd = VATIMEtoVCTIME(vaEnd, m_earth);
				break;
		}

		return true, vcEnd
	}

	static ComboMasaToMasa(nComboMasa)
	{
		return (nComboMasa == 12) ? 12 : ((nComboMasa + 11) % 12);
	}

	static MasaToComboMasa(nMasa)
	{
		return (nMasa == 12) ? 12 : ((nMasa + 1) % 12);
	}
}
