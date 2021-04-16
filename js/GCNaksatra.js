let GCNaksatra_naksatraName = [
	"Asvini",
	"Bharani",
	"Krittika",
	"Rohini",
	"Mrigasira",
	"Ardra",
	"Punarvasu",
	"Pusyami",
	"Aslesa",
	"Magha",
	"Purva-phalguni",
	"Uttara-phalguni",
	"Hasta",
	"Citra",
	"Swati",
	"Visakha",
	"Anuradha",
	"Jyestha",
	"Mula",
	"Purva-asadha",
	"Uttara-asadha",
	"Sravana",
	"Dhanista",
	"Satabhisa",
	"Purva-bhadra",
	"Uttara-bhadra",
	"Revati",
]

let GCNaksatra_padaText = [
	"1st Pada",
	"2nd Pada",
	"3rd Pada",
	"4th Pada",
]

class GCNaksatra {

	/*********************************************************************/
	/*                                                                   */
	/*   finds next time when starts next naksatra                       */
	/*                                                                   */
	/*   timezone is not changed                                         */
	/*                                                                   */
	/*   return value: index of naksatra 0..26                           */
	/*                 or -1 if failed                                   */
	/*********************************************************************/

	static GetNextNaksatra(ed, startDate)
	{
		var phi = 40.0 / 3.0;
		var l1, l2, longitudeMoon;
		var jday = startDate.GetJulianComplete();
		var d = new GregorianDateTime();
		d.Set(startDate);
		var ayanamsa = GCAyanamsha.GetAyanamsa(jday);
		var scan_step = 0.5;
		var prev_naks = 0;
		var new_naks = -1;

		var xj;
		var xd = new GregorianDateTime();

		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
		l1 = GCMath.putIn360(longitudeMoon - ayanamsa);
		prev_naks = GCMath.IntFloor(l1 / phi);

		var counter = 0;
		while (counter < 20) {
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
			l2 = GCMath.putIn360(longitudeMoon - ayanamsa);
			new_naks = GCMath.IntFloor(l2 / phi);
			if (prev_naks != new_naks)
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

		return [new_naks, d];
	}

	/*********************************************************************/
	/*                                                                   */
	/*   finds previous time when starts next naksatra                   */
	/*                                                                   */
	/*   timezone is not changed                                         */
	/*                                                                   */
	/*   return value: index of naksatra 0..26                           */
	/*                 or -1 if failed                                   */
	/*********************************************************************/

	static GetPrevNaksatra(ed, startDate)
	{
		var phi = 40.0 / 3.0;
		var l1, l2, longitudeMoon;
		var jday = startDate.GetJulianComplete();
		var d = new GregorianDateTime();
		d.Set(startDate)
		var xj;
		var xd = new GregorianDateTime();
		var ayanamsa = GCAyanamsha.GetAyanamsa(jday);
		var scan_step = 0.5;
		var prev_naks = 0;
		var new_naks = -1;


		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
		l1 = GCMath.putIn360(longitudeMoon - ayanamsa);
		prev_naks = GCMath.IntFloor(l1 / phi);

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

			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, ed);
			l2 = GCMath.putIn360(longitudeMoon - ayanamsa);
			new_naks = GCMath.IntFloor(l2 / phi);

			if (prev_naks != new_naks)
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

		return [new_naks, d];
	}

	static GetPadaText(i)
	{
		return GCNaksatra_padaText[i % 4]
	}

	static GetName(nNaksatra)
	{
		return GCNaksatra_naksatraName[nNaksatra % 27]
	}
}
