class Convert {
	static ToInt32(a) {
		return parseInt(a,10)
	}
	static ToDouble(a) {
		return a*1.0
	}

	static FormatS2(a) {
		if (a < 10)
			return " " + a.toString()
		else
			return a.toString()
	}

	static FormatD2(a) {
		return sprintf("%02d", a);
	}

	static FormatD4(a) {
		return sprintf("%04d", a);
	}

}

/************************************************************************
*
*************************************************************************/

var GCMath_PI = 3.1415926535897932385;
// 2 * pi
var GCMath_PI2 = 6.2831853071795864769;
// pi / 180
var GCMath_RADS = 0.0174532925199432958;

var GCMath_AU = 149597869.0;

var GCMath_EARTH_RADIUS = 6378.15;     // Radius of the earth 
var GCMath_MOON_RADIUS = 1737.4;
var GCMath_SUN_RADIUS = 695500;
var GCMath_J1999 = 2451180.0;
var GCMath_J2000 = 2451545.0;

class GCMath {
	static Floor(d) {
		return Math.floor(d);
	}

	static IntFloor(d) {
		return Convert.ToInt32(Math.floor(d));
	}

	static IntRound(d) {
		return Convert.ToInt32(Math.floor(d + 0.5));
	}
	
	static cosDeg(x) {
		return Math.cos(x * GCMath_RADS);
	}

	static sinDeg(x) {
		return Math.sin(x * GCMath_RADS);
	}

	static arccosDeg(x) {
		return Math.acos(x) / GCMath_RADS;
	}

	/////////////////////////////////////
	// input value: arc in degrees

	static Abs(d)
	{
		return Math.Abs(d);
	}

	/////////////////////////////////////
	// input value: arc in degrees
	// it is calculating arctan(x/y)
	// with testing values

	static arcTan2Deg(y,x)
	{
		return Math.atan2(y, x) / GCMath_RADS;
	}

	/////////////////////////////////////
	// input value: arc in degrees
	// output value: tangens 

	static tanDeg(x)
	{
		return Math.tan(x * GCMath_RADS);
	}

	/////////////////////////////////////
	// input value: -1.0 .. 1.0
	// output value: -180 deg .. 180 deg

	static arcSinDeg(x)
	{
		return Math.asin(x) / GCMath_RADS;
	}



	static arcTanDeg(x)
	{
		return Math.atan(x) / GCMath_RADS;
	}

	// modulo 1

	static putIn1(v)
	{
		var v2 = v - Math.floor(v);
		while (v2 < 0.0)
			v2 += 1.0;
		while (v2 > 1.0)
			v2 -= 1.0;
		return v2;
	}

	static putIn24(id)
	{
		var d = id;
		while (d >= 24.0)
			d -= 24.0;
		while (d < 0.0)
			d += 24.0;
		return d;
	}

	// modulo 360

	static putIn360(id)
	{
		var d = id;
/*            if (d < 0.0)
			d += Math.floor(-d / 360.0) * 360.0;
		if (d > 360.0)
			d -= Math.floor(d / 360.0) * 360;*/
		while (d >= 360.0)
			d -= 360.0;
		while (d < 0.0)
			d += 360.0;
		return d;
	}

	// modulo 360 but in range -180deg .. 180deg
	// used for comparision values around 0deg
	// so difference between 359deg and 1 deg 
	// is not 358 degrees, but 2 degrees (because 359deg = -1 deg)

	static putIn180(in_d)
	{
		var d = in_d;

		while (d < -180.0)
		{
			d += 360.0;
		}
		while (d > 180.0)
		{
			d -= 360.0;
		}

		return d;
	}



	// sign of the number
	// -1: number is less than zero
	// 0: number is zero
	// +1: number is greater than zero

	static getSign(d)
	{
		if (d > 0.0)
			return 1;
		if (d < 0.0)
			return -1;
		return 0;
	}

	static deg2rad(x)
	{
		return x * GCMath_RADS;
	}

	static rad2deg(x)
	{
		return x / GCMath_RADS;
	}

	static getFraction(x)
	{
		return x - Math.floor(x);
	}

	static Max(a,b)
	{
		if ((a instanceof TCoreEvent) && (b instanceof TCoreEvent)) {
			if (a.Time > b.Time)
				return a
			else
				return b
		} else {
			if (a > b)
				return a;
			return b;
		}
	}

	static Min(a,b)
	{
		if ((a instanceof TCoreEvent) && (b instanceof TCoreEvent)) {
			if (a.Time < b.Time)
				return a;
			else
				return b;
		} else {
			if (a < b)
				return a;
			return b;
		}
	}
	
	static arcDistance(lon1, lat1, lon2, lat2)
	{
		lat1 = PI / 2 - lat1;
		lat2 = PI / 2 - lat2;
		return arccosDeg(GCMath.cosDeg(lat1) * GCMath.cosDeg(lat2) + GCMath.sinDeg(lat1) * GCMath.sinDeg(lat2) * GCMath.cosDeg(lon1 - lon2));
	}

	static arcDistanceDeg(lon1, lat1, lon2, lat2)
	{
		return rad2deg(GCMath.arcDistance(GCMath.deg2rad(lon1), GCMath.deg2rad(lat1), GCMath.deg2rad(lon2), GCMath.deg2rad(lat2)));
	}



	static DaytimeToHourMin(shour)
	{
		shour *= 24.0;
		var hour = GCMath.IntFloor(shour);
		shour = (shour - hour)*60;
		var minute = GCMath.IntRound(shour);
		return [hour,minute]
	}

	static DaytimeToHourMinSec(shour)
	{
		shour *= 24.0;
		var hour = GCMath.IntFloor(shour);
		shour = (shour - hour)*60;
		var minute = GCMath.IntFloor(shour);
		shour = (shour - minute)*60;
		var sec = GCMath.IntRound(shour);
		return [hour,minute,sec]
	}


}


