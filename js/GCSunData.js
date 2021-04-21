

let sun_long = [
339.226,9.781,39.351,69.906,99.475,130.030,160.585,190.155,220.710,250.279,280.834,311.390,
340.212,10.767,40.337,70.892,100.461,131.016,161.571,191.141,221.696,251.265,281.820,312.375,
341.198,11.753,41.322,71.877,101.447,132.002,162.557,192.126,222.681,252.251,282.806,313.361,
342.183,12.738,42.308,72.863,102.432,132.987,163.542,193.112,223.667,253.236,283.791,314.346,
343.169,13.724,43.293,73.849,103.418,133.973,164.528,194.098,224.653,254.222,284.777,315.332,
344.155,14.710,44.279,74.834,104.404,134.959,165.514,195.083,225.638,255.208,285.763,316.318,
345.140,15.695,45.265,75.820,105.389,135.944,166.499,196.069,226.624,256.193,286.748,317.303,
346.126,16.681,46.250,76.805,106.375,136.930,167.485,197.054,227.610,257.179,287.734,318.289,
347.112,17.667,47.236,77.791,107.361,137.916,168.471,198.040,228.595,258.165,288.720,319.275,
348.097,18.652,48.222,78.777,108.346,138.901,169.456,199.026,229.581,259.150,289.705,320.260,
349.083,19.638,49.207,79.762,109.332,139.887,170.442,200.011,230.566,260.136,290.691,321.246,
350.068,20.624,50.193,80.748,110.317,140.873,171.428,200.997,231.552,261.122,291.677,322.232,
351.054,21.609,51.179,81.734,111.303,141.858,172.413,201.983,232.538,262.107,292.662,323.217,
352.040,22.595,52.164,82.719,112.289,142.844,173.399,202.968,233.523,263.093,293.648,324.203,
353.025,23.581,53.150,83.705,113.274,143.829,174.385,203.954,234.509,264.078,294.634,325.189,
354.011,24.566,54.136,84.691,114.260,144.815,175.370,204.940,235.495,265.064,295.619,326.174,
354.997,25.552,55.121,85.676,115.246,145.801,176.356,205.925,236.480,266.050,296.605,327.160,
355.982,26.537,56.107,86.662,116.231,146.786,177.341,206.911,237.466,267.035,297.590,328.146,
356.968,27.523,57.093,87.648,117.217,147.772,178.327,207.897,238.452,268.021,298.576,329.131,
357.954,28.509,58.078,88.633,118.203,148.758,179.313,208.882,239.437,269.007,299.562,330.117,
358.939,29.494,59.064,89.619,119.188,149.743,180.298,209.868,240.423,269.992,300.547,331.102,
359.925,30.480,60.049,90.605,120.174,150.729,181.284,210.854,241.409,270.978,301.533,332.088,
0.911,31.466,61.035,91.590,121.160,151.715,182.270,211.839,242.394,271.964,302.519,333.074,
1.896,32.451,62.021,92.576,122.145,152.700,183.255,212.825,243.380,272.949,303.504,334.059,
2.882,33.437,63.006,93.561,123.131,153.686,184.241,213.810,244.366,273.935,304.490,335.045,
3.868,34.423,63.992,94.547,124.117,154.672,185.227,214.796,245.351,274.921,305.476,336.031,
4.853,35.408,64.978,95.533,125.102,155.657,186.212,215.782,246.337,275.906,306.461,337.016,
5.839,36.394,65.963,96.518,126.088,156.643,187.198,216.767,247.322,276.892,307.447,338.002,
6.824,37.380,66.949,97.504,127.073,157.629,188.184,217.753,248.308,277.878,308.433,338.988,
7.810,38.365,67.935,98.490,128.059,158.614,189.169,218.739,249.294,278.863,309.418,339.100,
8.796,38.365,68.920,98.490,129.045,159.600,189.169,219.724,249.294,279.849,310.404,339.226,
]

let sun_1_col = [ -1.157, -0.386, 0.386, 1.157 ]
let sun_1_row = [-1.070, 2.015, 5.101, 8.186,
	11.271, 14.356, 17.441, 20.526, 23.611, 26.697]
let sun_2_col = [ 0.322, 0.107, -0.107, -0.322 ]
let sun_2_row = [-0.577,-0.449,-0.320,-0.192,
	-0.064, 0.064, 0.192, 0.320, 0.449, 0.577]
let sun_3_row = [
	-0.370,-0.339,-0.309,-0.278,-0.247,-0.216,-0.185,-0.154,
	-0.123,-0.093,-0.062,-0.031,+0.000,+0.031,+0.062,+0.093,
	+0.123,+0.154,+0.185,+0.216,+0.247,+0.278,+0.309,+0.339,
	+0.370 ]
let sun_3_col = [ +0.358, +0.119, -0.119, -0.358 ]
let sun_4_row = [251.97,258.85,265.73,272.61,279.49
	,286.37,293.25,300.14,307.02,313.90 ]
let sun_4_col = [ -2.58, -0.86, 0.86, 2.58 ]
let sun_5_row = [-0.83,-0.76,-0.69,-0.62,
	-0.55,-0.48,-0.41,-0.34,
	-0.28,-0.21,-0.14,-0.07,
	+0.00,+0.07,+0.14,+0.21,
	+0.28,+0.34,+0.41,+0.48,
	+0.55,+0.62,+0.69,+0.76,
	+0.83 ]
let sun_5_col = [ -0.03, -0.01, 0.01, +0.03 ]

class GCSunData {

	contructor() {
		// ecliptical coordinates
		this.longitudeDeg = 0.0
		this.meanLongitudeOfSun = 0.0
		
		// equatorial coordinates
		this.declinationDeg = 0.0
		this.rightAscensionDeg = 0.0
		this.equationOfTime = 0.0
	}

	////////////////////////////////////////////////////////////////////
	// find mean ecliptic longitude of the sun for your chosen day
	//

	static SunGetMeanLong(year, month, day) {
		var mel = 0.0;

		if ((month > 12) || (month < 1) || (day < 1) || (day > 31))
			return -1.0;
		mel = sun_long[(day - 1) * 12 + (month + 9) % 12];

		var y, yy;

		if (month < 3)
		{
			y = Convert.ToInt32((year - 1) / 100);
			yy = (year - 1) % 100;
		}
		else
		{
			y = Convert.ToInt32(year / 100);
			yy = year % 100;
		}

		var y4 = Convert.ToInt32(y/4);
		var yy4 = Convert.ToInt32(yy/4);
		if (y <= 15)
		{
			mel += sun_1_col[y % 4] + sun_1_row[y4];
		}
		else if (y < 40)
		{
			mel += sun_2_col[y % 4] + sun_2_row[y4];
		}

		mel += sun_3_col[yy % 4] + sun_3_row[yy4];

		return mel;
	}

	////////////////////////////////////////////////////////////////
	// finds ecliptic longitude of perigee of the sun 
	// for the mean summer solstice of your chosen year 
	// (and effectively for the entire year)

	static SunGetPerigee(year, month, day) {

		var per = 0.0;

		if ((month > 12) || (month < 1) || (day < 1) || (day > 31))
			return -1.0;

		var y, yy;

		if (month < 3)
		{
			y = Convert.ToInt32((year - 1) / 100);
			yy = (year - 1) % 100;
		}
		else
		{
			y = Convert.ToInt32(year / 100);
			yy = year % 100;
		}

		per = sun_4_row[Convert.ToInt32(y / 4)] + sun_4_col[y % 4];
		per += sun_5_row[Convert.ToInt32(yy / 4)] + sun_5_col[yy % 4];

		return per;
	}



	/*************************************/
	/*    sun functions                  */
	/*                                   */
	/*    sun longitude                  */
	/*    sunrise, sunset time           */
	/*                                   */
	/*************************************/

	// GregorianDateTime vct, GCEarthData ed, double dayHours
	SunPosition(vct, ed, dayHours)
	{
		var DG = GCMath_PI / 180;
		var RAD = 180 / GCMath_PI;

		var dLatitude = ed.latitudeDeg;
		var dLongitude = ed.longitudeDeg;

		// mean ecliptic longitude of the sun 
		var meanLongitudeOfSun = GCSunData.SunGetMeanLong(vct.year, vct.month, vct.day) + (360 / 365.25) * dayHours / 360.0;
		// ecliptic longitude of perigee 
		var elp = GCSunData.SunGetPerigee(vct.year, vct.month, vct.day);

		// mean anomaly of the sun
		var mas = meanLongitudeOfSun - elp;

		// ecliptic longitude of the sun
		var els = 0.0;
		this.longitudeDeg = els = meanLongitudeOfSun + 1.915 * Math.sin(mas * DG) + 0.02 * Math.sin(2 * DG * mas);

		// declination of the sun
		this.declinationDeg = RAD * Math.asin(0.39777 * Math.sin(els * DG));

		// right ascension of the sun
		this.rightAscensionDeg = els - RAD * Math.atan2(Math.sin(2 * els * DG), 23.2377 + Math.cos(2 * DG * els));

		// equation of time
		this.equationOfTime = this.rightAscensionDeg - meanLongitudeOfSun;
	}

	// GregorianDateTime vct, GCEarthData earth
	static CalcSunrise(vct, earth) {
		var tempSunrise = 180.0;
		var sun = new GCSunData();

		for (var i = 0; i < 3; i++)
		{
			sun.SunPosition(vct, earth, tempSunrise - 180.0);

			var x;
			// definition of event
			var eventdef = 0.01454;
			/*	switch(ed.obs)
				{
				case 1:	// civil twilight
					eventdef = 0.10453;
					break;
				case 2:	// nautical twilight
					eventdef = 0.20791;
					break;
				case 3:	// astronomical twilight
					eventdef = 0.30902;
					break;
				default:// center of the sun on the horizont
					eventdef = 0.01454;
					break;
				}*/

			eventdef = (eventdef / GCMath.cosDeg(earth.latitudeDeg)) / GCMath.cosDeg(sun.declinationDeg);

			x = GCMath.tanDeg(earth.latitudeDeg) * GCMath.tanDeg(sun.declinationDeg) + eventdef;

			if ((x >= -1.0) && (x <= 1.0))
			{
				// time of sunrise
				tempSunrise = 90.0 - earth.longitudeDeg - GCMath.arcSinDeg(x) + sun.equationOfTime;
			}
			else
			{
				// initial values for the case
				// that no rise no set for that day
				tempSunrise = -360.0;
				break;
			}
		}

		var result = new GCHourTime();
		result.longitude = sun.longitudeDeg;
		result.SetDegTime(tempSunrise + earth.OffsetUtcHours * 15.0);
		return result;
	}


	//
	// takes values year, month, day, shour, TimeZone
	//
	static GetSunLongitude(vct)
	{
		//	double mel = 0.0;
		var DG = GCMath_PI / 180;
		var RAD = 180 / GCMath_PI;

		// mean ecliptic longitude of the sun 
		var mel = GCSunData.SunGetMeanLong(vct.year, vct.month, vct.day) + (360 / 365.25) * (vct.shour - 0.5 - vct.TimezoneHours / 24.0);

		// ecliptic longitude of perigee 
		var elp = GCSunData.SunGetPerigee(vct.year, vct.month, vct.day);

		// mean anomaly of the sun
		var mas = mel - elp;

		// ecliptic longitude of the sun
		//double els = 0.0;
		return mel + 1.915 * Math.sin(mas * DG) + 0.02 * Math.sin(2 * DG * mas);
	}

	static RiseAngleLevel() {

			let eventdef = 0.01454;
			/*	switch(ed.obs)
				{
				case 1:	// civil twilight
					eventdef = 0.10453;
					break;
				case 2:	// nautical twilight
					eventdef = 0.20791;
					break;
				case 3:	// astronomical twilight
					eventdef = 0.30902;
					break;
				default:// center of the sun on the horizont
					eventdef = 0.01454;
					break;
				}*/
			return eventdef;

	}

	// GregorianDateTime vct, GCEarthData earth
	static CalcSunset(vct, earth) {
		var tempSunset = 180.0;
		var sun = new GCSunData();

		for (var i = 0; i < 3; i++)
		{
			sun.SunPosition(vct, earth, tempSunset - 180.0);

			var x;
			// definition of event
			var eventdef = GCSunData.RiseAngleLevel();

			eventdef = (eventdef / GCMath.cosDeg(earth.latitudeDeg)) / GCMath.cosDeg(sun.declinationDeg);

			x = GCMath.tanDeg(earth.latitudeDeg) * GCMath.tanDeg(sun.declinationDeg) + eventdef;


			if ((x >= -1.0) && (x <= 1.0))
			{
				// time of sunset
				tempSunset = 270.0 - earth.longitudeDeg + GCMath.arcSinDeg(x) + sun.equationOfTime;
			}
			else
			{
				// initial values for the case
				// that no rise no set for that day
				tempSunset = -360.0;
				break;
			}
		}

		var result = new GCHourTime();
		result.longitude = sun.longitudeDeg;
		result.SetDegTime(tempSunset + earth.OffsetUtcHours * 15.0);
		return result;

	}


	// double sunRise, double sunSet, int dayWeek, int type
	static CalculateKala(sunRise, sunSet, dayWeek, type)
	{
		var period;
		var r1 = -1, r2 = -1

		if (type == KalaType.KT_RAHU_KALAM)
		{
			var a = [ 7, 1, 6, 4, 5, 3, 2 ]
			period = (sunSet - sunRise) / 8.0;
			r1 = sunRise + a[dayWeek] * period;
			r2 = r1 + period;
		}
		else if (type == KalaType.KT_YAMA_GHANTI)
		{
			var a = [ 4, 3, 2, 1, 0, 6, 5 ]
			period = (sunSet - sunRise) / 8.0;
			r1 = sunRise + a[dayWeek] * period;
			r2 = r1 + period;
		}
		else if (type == KalaType.KT_GULI_KALAM)
		{
			var a = [6, 5, 4, 3, 2, 1, 0 ]
			period = (sunSet - sunRise) / 8.0;
			r1 = sunRise + a[dayWeek] * period;
			r2 = r1 + period;
		}
		else if (type == KalaType.KT_ABHIJIT)
		{
			period = (sunSet - sunRise) / 15.0;
			r1 = sunRise + 7 * period;
			r2 = r1 + period;
			if (dayWeek == 3)
			{
				r1 = r2 = -1;
			}
		}

		return [r1,r2]
	}

	// this is not used effectively
	// it is just try to have some alternative function for calculation sun position
	// but it needs to be fixed, because
	// it calculates correct ecliptical coordinates, but when transforming
	// into horizontal coordinates (azimut, elevation) it will do something wrong

	// int year, int month, int day, int hour, int min, int sec,
	//                    double lat, double longi
	static sunPosition(year, month, day, hour, min, sec, lat, longi) {

		var twopi = GCMath.PI2;
		var deg2rad = GCMath.PI2 / 180;

		let month_days = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30 ]
		for ( y2 = 0; y2 < month; y2++)
			day += month_days[y2];
		if ((year % 4 == 0) && ((year % 400 == 0) || (year % 100 != 0)) && (day >= 60) && !(month == 2 & day == 60))
			day++;

		//# Get Julian date - 2400000
		var hourd = hour + min / 60.0 + sec / 3600.0; // hour plus fraction
		var delta = year - 1949;
		var leap = Math.floor(delta / 4); // former leapyears
		var jd = 32916.5 + delta * 365 + leap + day + hourd / 24.0;

		// The input to the Atronomer's almanach is the difference between
		// the Julian date and JD 2451545.0 (noon, 1 January 2000)
		var time = jd - 51545.0;

		// Ecliptic coordinates

		// Mean longitude
		var mnlong = GCMath.putIn360(280.460 + .9856474 * time);

		// Mean anomaly
		var mnanom = GCMath.putIn360(357.528 + .9856003 * time);
		//mnanom <- mnanom * deg2rad

		// Ecliptic longitude and obliquity of ecliptic
		var eclong = mnlong + 1.915 * GCMath.sinDeg(mnanom) + 0.020 * GCMath.sinDeg(2 * mnanom);
		eclong = GCMath.putIn360(eclong);

		var oblqec = 23.439 - 0.0000004 * time;
		//-- eclong <- eclong * deg2rad
		//-- oblqec <- oblqec * deg2rad

		// Celestial coordinates
		// Right ascension and declination
		var num = GCMath.cosDeg(oblqec) * GCMath.sinDeg(eclong);
		var den = GCMath.cosDeg(eclong);
		var ra = GCMath.arcTan2Deg(num, den);
		while (ra < 0)
			ra += 180;
		//-- ra[den < 0] <- ra[den < 0] + pi
		if (den >= 0 && num < 0) ra += 360;
		var dec = GCMath.arcSinDeg(GCMath.sinDeg(oblqec) * GCMath.sinDeg(eclong));

		// Local coordinates
		// Greenwich mean sidereal time
		var gmst = 6.697375 + .0657098242 * time + hourd;
		gmst = GCMath.putIn24(gmst);

		// Local mean sidereal time
		var lmst = gmst + longi / 15.0;
		lmst = GCMath.putIn24(lmst);
		lmst = lmst * 15.0;

		// Hour angle
		var ha = lmst - ra;
		ha = GCMath.putIn180(ha);

		// Azimuth and elevation
		var el = GCMath.arcSinDeg(GCMath.sinDeg(dec) * GCMath.sinDeg(lat) + GCMath.cosDeg(dec) * GCMath.cosDeg(lat) * GCMath.cosDeg(ha));
		var az = GCMath.arcSinDeg(-GCMath.cosDeg(dec) * GCMath.sinDeg(ha) / GCMath.cosDeg(el));

		//# -----------------------------------------------
		//# New code
		//# Solar zenith angle
		var zenithAngle = GCMath.arccosDeg(GCMath.sinDeg(lat) * GCMath.sinDeg(dec) + GCMath.cosDeg(lat) * GCMath.cosDeg(dec) * GCMath.cosDeg(ha));
		//# Solar azimuth
		az = GCMath.arccosDeg(((GCMath.sinDeg(lat) * GCMath.cosDeg(zenithAngle)) - GCMath.sinDeg(dec)) / (GCMath.cosDeg(lat) * GCMath.sinDeg(zenithAngle)));
		//# -----------------------------------------------

		//# Azimuth and elevation
		el = GCMath.arcSinDeg(GCMath.sinDeg(dec) * GCMath.sinDeg(lat) + GCMath.cosDeg(dec) * GCMath.cosDeg(lat) * GCMath.cosDeg(ha));


		//# -----------------------------------------------
		//# New code
		if (ha > 0)
		{
			az += 180;
		}
		else
		{
			az = 540 - az;
		}
		az = GCMath.putIn360(az);

		// For logic and names, see Spencer, J.W. 1989. Solar Energy. 42(4):353
		//cosAzPos <- (0 <= sin(dec) - sin(el) * sin(lat))
		//sinAzNeg <- (sin(az) < 0)
		//az[cosAzPos & sinAzNeg] <- az[cosAzPos & sinAzNeg] + twopi
		//az[!cosAzPos] <- pi - az[!cosAzPos]
		/*
		if (0 < GCMath.sinDeg(dec) - GCMath.sinDeg(el) * GCMath.sinDeg(lat)) 
		{
			 if(GCMath.sinDeg(az) < 0)
			 {
				 az = az + 360;
			 }
		}
		else
		{
			 az = 180 - az;
		}
	*/

		//el <- el / deg2rad
		//az <- az / deg2rad
		//lat <- lat / deg2rad

		var coords = new GCHorizontalCoords();

		coords.azimut = az;
		coords.elevation = el;
		return coords;
	}

}
