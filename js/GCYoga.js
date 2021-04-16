class GCYoga {
	static GetNextYogaStart(ed, startDate)
	{
		var phi = 40.0/3.0;
		var l1, l2, longitudeSun;
		var jday = startDate.GetJulianComplete();
		var xj;
		var longitudeMoon;
		var d = new GregorianDateTime();
		d.Set(startDate);
		var xd = new GregorianDateTime();
		var scan_step = 0.5;
		var prev_tit = 0;
		var new_tit = -1;
		var ayanamsha = GCAyanamsha.GetAyanamsa(jday);

		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
		longitudeSun = GCCoreAstronomy.GetSunLongitude(d, ed);
		l1 = GCMath.putIn360( longitudeMoon + longitudeSun - 2*ayanamsha);
		prev_tit = Convert.ToInt32(Math.floor(l1/phi));

		var counter = 0;
		while(counter < 20)
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

			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
			longitudeSun = GCCoreAstronomy.GetSunLongitude(d, ed);
			l2 = GCMath.putIn360( longitudeMoon + longitudeSun - 2*ayanamsha);
			new_tit = Convert.ToInt32(Math.floor(l2/phi));

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

	static GetName(nYoga)
	{
		return GCYoga_yogaName[nYoga % 27]
	}
}

let GCYoga_yogaName = [
	"Viskumba", 
	"Priti", 
	"Ayusmana", 
	"Saubhagya", 
	"Sobana", 
	"Atiganda", 
	"Sukarma", 
	"Dhriti", 
	"Sula", 
	"Ganda", 
	"Vriddhi", 
	"Dhruva", 
	"Vyagata", 
	"Harsana", 
	"Vajra", 
	"Siddhi", 
	"Vyatipata", 
	"Variyana", 
	"Parigha", 
	"Siva", 
	"Siddha", 
	"Sadhya", 
	"Subha", 
	"Sukla", 
	"Brahma", 
	"Indra", 
	"Vaidhriti" 
]
