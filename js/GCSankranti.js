let sankrantiDetermineType = 2;

let GCSankranti_snam = [
	"midnight to midnight", 
	"sunrise to sunrise",   
	"noon to noon",         
	"sunset to sunset"      
]

class GCSankranti {

	static GetSankrantiType()
	{
		return sankrantiDetermineType;
	}
	static SetSankrantiType(i)
	{
		var prev = sankrantiDetermineType;
		sankrantiDetermineType = i;
		return prev;
	}

	static GetSankMethodName(i)
	{
		return GCSankranti_snam[i]
	}


	/*********************************************************************/
	/*  Finds next time when rasi is changed                             */
	/*                                                                   */
	/*  startDate - starting date and time, timezone member must be valid */
	/*  zodiac [out] - found zodiac sign into which is changed           */
	/*                                                                   */
	/*********************************************************************/

	static GetNextSankranti(startDate, earth) {
		var d = new GregorianDateTime();
		var step = 1.0;
		var count = 0;
		var ld, prev;
		var prev_rasi, new_rasi;
		var prevday;

		d.Set(startDate);
		//d.ChangeTimeZone(0.0);
		//d.shour = 0.0;
		var zodiac = 0;

		prev = GCMath.putIn360(GCCoreAstronomy.GetSunLongitude(d, earth) - GCAyanamsha.GetAyanamsa(d.GetJulian()));
		prev_rasi = GCMath.IntFloor(prev / 30.0);

		while (count < 20)
		{
			prevday = new GregorianDateTime();
			prevday.Set(d);
			d.shour += step;
			if (d.shour > 1.0)
			{
				d.shour -= 1.0;
				d.NextDay();
			}

			ld = GCMath.putIn360(GCCoreAstronomy.GetSunLongitude(d, earth) - GCAyanamsha.GetAyanamsa(d.GetJulian()));
			new_rasi = GCMath.IntFloor(ld / 30.0);

			if (prev_rasi != new_rasi)
			{
				zodiac = new_rasi;
				//v uplynulom dni je sankranti
				step *= 0.5;
				d.Set(prevday);
				count++;
				continue;
			}
		}

		return [d,zodiac]
	}
}
