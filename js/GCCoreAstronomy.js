let AstronomySystem = { Meeus: 1 }

let AstronomySystem_System = 1
let AstronomySystem_Topocentric = false

let AstronomySystem_CoreEventsMap = {}

class GCCoreAstronomy
{
	static GetSunLongitude(vct, earth)
	{
		switch(AstronomySystem_System)
		{
			case AstronomySystem.Meeus:
				return GCSunData.GetSunLongitude(vct);
		}

		return 0;
	}

	static CalcSunrise(vct, earth)
	{
		return GCSunData.CalcSunrise(vct, earth);
	}

	static CalcSunset(vct, earth)
	{
		return GCSunData.CalcSunset(vct, earth);
	}

	static GetMoonLongitude(vct, earth)
	{
		switch (AstronomySystem_System)
		{
			case AstronomySystem.Meeus:
				var moon = new GCMoonData();
				moon.Calculate(vct.GetJulianComplete());
				return moon.longitude_deg;
		}

		return 0;
	}

	static GetMoonElevation(e, vc)
	{
		var moon = new GCMoonData();
		var d = vc.GetJulianComplete();
		moon.Calculate(d);
		moon.CorrectEqatorialWithParallax(d, e.latitudeDeg, e.longitudeDeg, 0);
		moon.calc_horizontal(d, e.longitudeDeg, e.latitudeDeg);

		return moon.elevation;
	}

	static GetCoreEventsMonth(loc, year, month)
	{
		var key = "ceb_" + year.toString() + "_" + month.toString();

		// if existing in memory, return it
		if (key in AstronomySystem_CoreEventsMap)
			return AstronomySystem_CoreEventsMap[key];

		var ce = new TResultCoreEvents();
		ce.Full = true;
		// at last, we have to calculate it
		ce.CalculateEvents(loc, year, month);
		AstronomySystem_CoreEventsMap[key] = ce;

		return ce;
	}

	static GetCoreEventsYear(loc, year)
	{
		var key = "ceb_" + year.toString() 

		// if existing in memory, return it
		if (key in AstronomySystem_CoreEventsMap)
			return AstronomySystem_CoreEventsMap[key];

		var ce = new TResultCoreEvents();
		ce.Full = true;
		// at last, we have to calculate it
		ce.CalculateEvents(loc, year);
		AstronomySystem_CoreEventsMap[key] = ce;

		return ce;
	}
}
