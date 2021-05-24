/*************************************************    js/sprintf.js **********************************************/

function sprintf_convert_value(a, arg) {
  var res = ''
  var sign = a[0];
  var numb = a[1];
  var typ = a[2];
  var padding = ' '
  var digits = 0;
  var value = '';

  if (typ === 'd') {
    if (numb[0] === '0') {
      padding = '0';
    }
    digits = parseInt(numb, 10);
    value = arg.toString();
    while (value.length < digits) {
      value = padding + value;
    }
    res = value;
  } else if (typ === 'f') {
    var wp = '';
    var dp = '';
    var ppos = numb.split('.');
    ppos.push('')
    wp = ppos[0];
    dp = ppos[1];
    value = arg.toString();
    var vpos = value.split('.')
    var v1 = vpos[0]
    var v2 = ''
    if (wp !== '') {
      digits = parseInt(wp, 10);
      while (v1.length < digits) {
        v1 = ' ' + v1;
      }      
    }
    if (dp !== '') {
      digits = parseInt(dp, 10);
      if (vpos.length === 1) {
        v2 = '.';
      } else {
        v2 = '.' + vpos[1];
      }
      while (v2.length <= digits) {
        v2 += '0';
      }
      if (v2.length > digits + 1) {
        v2 = v2.substr(0, digits + 1);
      }
    }
    res = v1 + v2;
  } else if (typ === 's') {
    digits = parseInt(numb, 10);
    value = arg == undefined ? "(undefined)" : arg.toString();
    if ((sign === null && digits>0) || sign==='+') {
      while (value.length < digits) {
        value += padding;
      }
    } else if (sign ==='-') {
      while (value.length < digits) {
        value = padding + value;
      }
    }
    res = value;
  } else {
    res = arg.toString();    
  }
  return res;
}

function sprintf(fmt, ...args) {
  var curarg = 0;
  var res = ''
  var mode = 0;
  var sign = null;
  var numb = '';
  var typ = null;
  for (var c of fmt) {
    if (mode===0) {
      if (c==='%') {
        mode = 1;
        continue;
      } else {
        res += c;
      }
    }
    if (mode === 1) {
      if (c === '%') {
        res += c;
      } else {
        mode = 2;
      }
    }
    if (mode === 2) {
      if (c === '-' || c === '+') {
        sign = c;
      } else if ((c >= '0' && c <= '9') || c === '.') {
        numb += c;
      } else if (c >= 'a' && c <= 'z') {
        typ = c;
        res += sprintf_convert_value([sign, numb, typ], args[curarg])
        sign = null;
        numb = '';
        typ = '';
        curarg += 1
        mode = 0;
      }
    }
  }
  return res;
}

/*************************************************    js/System.js **********************************************/
function ImportScript(url) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL

    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

/*************************************************    js/Enums.js **********************************************/

let MahadvadasiType = {
	EV_NULL : 0x100,
	EV_SUDDHA : 0x101,
	EV_UNMILANI : 0x102,
	EV_VYANJULI : 0x103,
	EV_TRISPRSA : 0x104,
	EV_UNMILANI_TRISPRSA : 0x105,
	EV_PAKSAVARDHINI : 0x106,
	EV_JAYA : 0x107,
	EV_JAYANTI : 0x108,
	EV_PAPA_NASINI : 0x109,
	EV_VIJAYA : 0x110,
}

let DstTypeChange = {
	DstOn : 2,
	DstOff : 0,
	DstStart : 1,
	DstEnd : 3
}

let FastType = {
	FAST_NULL : 0,
	FAST_NOON : 1,
	FAST_SUNSET : 2,
	FAST_MOONRISE : 3,
	FAST_DUSK : 4,
	FAST_MIDNIGHT : 5,
	FAST_EKADASI : 6,
	FAST_DAY : 7,
	FAST_END_TITHI : 8,
	FAST_END_NAKSATRA : 9,
	FAST_END_TAN : 10,
	FAST_END_TON : 11,
}

let FastTypeText = {
	0 : "No fasting",
	1 : "Fast till noon",
	2 : "Fast till sunset",
	3 : "Fast till moonrise",
	4 : "Fast till dusk",
	5 : "Fast till midnight",
	6 : "Ekadasi fasting",
	7 : "Fast today",
	8 : "Fast till end of tithi",
	9 : "Fast till end of naksatra",
	10 : "Fast till end of tithi and naksatra",
	11 : "Fast till end of tithi or naksatra"
}


let FeastType = {
	FEAST_NULL : 0,
	FEAST_TODAY_FAST_YESTERDAY : 1,
	FEAST_TOMMOROW_FAST_TODAY : 2,
}

let SpecialFestivalId = {
	SPEC_RETURNRATHA : 3,
	SPEC_HERAPANCAMI : 4,
	SPEC_GUNDICAMARJANA : 5,
	SPEC_GOVARDHANPUJA : 6,
	SPEC_VAMANADVADASI : 7,
	SPEC_VARAHADVADASI : 8,
	SPEC_RAMANAVAMI : 9,
	SPEC_JANMASTAMI : 10,
	SPEC_RATHAYATRA : 11,
	SPEC_GAURAPURNIMA : 12,
	SPEC_NANDAUTSAVA : 13,
	SPEC_MISRAFESTIVAL : 14,
	SPEC_PRABHAPP : 15,
}


let EkadasiParanaType = {
	EP_TYPE_NULL : 0,
	EP_TYPE_3DAY : 1,
	EP_TYPE_4TITHI : 2,
	EP_TYPE_NAKEND : 3,
	EP_TYPE_SUNRISE : 4,
	EP_TYPE_TEND : 5,
}

let CaturmasyaCodes = {
	CMASYA_SYSTEM_PURNIMA : 13,
	CMASYA_SYSTEM_PRATIPAT : 14,
	CMASYA_SYSTEM_EKADASI : 15,
	CMASYA_SYSTEM_MASK : 0xff,

	CMASYA_MONTH_1 : 0x100,
	CMASYA_MONTH_2 : 0x200,
	CMASYA_MONTH_3 : 0x300,
	CMASYA_MONTH_4 : 0x400,
	CMASYA_MONTH_MASK : 0xf00,

	CMASYA_DAY_FIRST : 0x1000,
	CMASYA_DAY_LAST : 0x2000,
	CMASYA_DAY_MASK : 0xf000,
}


let MasaId = {
	MADHUSUDANA_MASA : 0,
	TRIVIKRAMA_MASA : 1,
	VAMANA_MASA : 2,
	SRIDHARA_MASA : 3,
	HRSIKESA_MASA : 4,
	PADMANABHA_MASA : 5,
	DAMODARA_MASA : 6,
	KESAVA_MASA : 7,
	NARAYANA_MASA : 8,
	MADHAVA_MASA : 9,
	GOVINDA_MASA : 10,
	VISNU_MASA : 11,
	ADHIKA_MASA : 12,
}

let SankrantiId = {
	MESHA_SANKRANTI : 0,
	VRSABHA_SANKRANTI : 1,
	MITHUNA_SANKRANTI : 2,
	KATAKA_SANKRANTI : 3,
	SIMHA_SANKRANTI : 4,
	KANYA_SANKRANTI : 5,
	TULA_SANKRANTI : 6,
	VRSCIKA_SANKRANTI : 7,
	DHANUS_SANKRANTI : 8,
	MAKARA_SANKRANTI : 9,
	KUMBHA_SANKRANTI : 10,
	MINA_SANKRANTI : 11,
}

let PaksaId = {
	KRSNA_PAKSA : 0,
	GAURA_PAKSA : 1,
}

let TithiId = {
	TITHI_KRSNA_PRATIPAT : 0,
	TITHI_KRSNA_DVITIYA : 1,
	TITHI_KRSNA_TRITIYA : 2,
	TITHI_KRSNA_CATURTI : 3,
	TITHI_KRSNA_PANCAMI : 4,
	TITHI_KRSNA_SASTI : 5,
	TITHI_KRSNA_SAPTAMI : 6,
	TITHI_KRSNA_ASTAMI : 7,
	TITHI_KRSNA_NAVAMI : 8,
	TITHI_KRSNA_DASAMI : 9,
	TITHI_KRSNA_EKADASI : 10,
	TITHI_KRSNA_DVADASI : 11,
	TITHI_KRSNA_TRAYODASI : 12,
	TITHI_KRSNA_CATURDASI : 13,
	TITHI_AMAVASYA : 14,
	TITHI_GAURA_PRATIPAT : 15,
	TITHI_GAURA_DVITIYA : 16,
	TITHI_GAURA_TRITIYA : 17,
	TITHI_GAURA_CATURTI : 18,
	TITHI_GAURA_PANCAMI : 19,
	TITHI_GAURA_SASTI : 20,
	TITHI_GAURA_SAPTAMI : 21,
	TITHI_GAURA_ASTAMI : 22,
	TITHI_GAURA_NAVAMI : 23,
	TITHI_GAURA_DASAMI : 24,
	TITHI_GAURA_EKADASI : 25,
	TITHI_GAURA_DVADASI : 26,
	TITHI_GAURA_TRAYODASI : 27,
	TITHI_GAURA_CATURDASI : 28,
	TITHI_PURNIMA : 29,
}

let NaksatraId = {
	ASVINI : 0,
	BHARANI : 1,
	KRITTIKA : 2,
	ROHINI : 3,
	MRIGASIRA : 4,
	ARDRA : 5,
	PUNARVASU : 6,
	PUSYAMI : 7,
	ASHLESA : 8,
	MAGHA : 9,
	SRAVANA : 21
}

let WeekDayId = {
	DW_SUNDAY : 0,
	DW_MONDAY : 1,
	DW_TUESDAY : 2,
	DW_WEDNESDAY : 3,
	DW_THURSDAY : 4,
	DW_FRIDAY : 5,
	DW_SATURDAY : 6,
}


let KalaType = {
	KT_NONE : 0,
	KT_RAHU_KALAM : 1,
	KT_YAMA_GHANTI : 2,
	KT_GULI_KALAM : 3,
	KT_VISHAGATI : 4,
	KT_ABHIJIT : 5,
	KT_SANDHYA_SUNRISE : 6,
	KT_SANDHYA_NOON : 7,
	KT_SANDHYA_SUNSET : 8,
	KT_SANDHYA_MIDNIGHT : 9,
}

let CoreEventType = {
	CCTYPE_DATE : 1,
	CCTYPE_S_ARUN : 10,
	CCTYPE_S_RISE : 11,
	CCTYPE_S_NOON : 12,
	CCTYPE_S_SET : 13,
	CCTYPE_S_MIDNIGHT : 14,

	CCTYPE_TITHI : 20,
	CCTYPE_NAKS : 21,
	CCTYPE_SANK : 22,
	CCTYPE_CONJ : 23,
	CCTYPE_YOGA : 24,
	CCTYPE_KALA_START : 30,
	CCTYPE_KALA_END : 31,
	CCTYPE_M_RISE : 41,
	CCTYPE_M_SET : 42,
	CCTYPE_M_RASI : 45,
	CCTYPE_ASCENDENT : 50,

	CCTYPE_TITHI_BASE : 60,
	CCTYPE_DAY_MUHURTA : 61,
	CCTYPE_DAY_OF_WEEK : 62,
	CCTYPE_THIRD_OF_DAY : 63,
	CCTYPE_TITHI_QUARTER : 64,

	CCTYPE_NAKS_PADA1 : 65,
	CCTYPE_NAKS_PADA2 : 66,
	CCTYPE_NAKS_PADA3 : 67,
	CCTYPE_NAKS_PADA4 : 68,
	CCTYPE_NAKS_END : 69,
	CCTYPE_TITHI_END : 70,

}

let GCLayoutData = {
	textSizeH1 : 36,
	textSizeH2 : 32,
	textSizeText : 24,
	textSizeNote : 16
}


/*************************************************    js/GCMath.js **********************************************/
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



/*************************************************    js/GCDayHours.js **********************************************/

class DAYTIME {

    constructor() {
        this.hour = 0;
        this.min = 0;
        this.sec = 0;
        this.mili = 0;
    }

    SetDayTime(d)
    {
        var time_hr = 0.0;
    
        // hour
        time_hr = d * 24;
        this.hour = parseInt( Math.floor(time_hr) );
    
        // minute
        time_hr -= this.hour;
        time_hr *= 60;
        this.min = parseInt( Math.floor(time_hr) );
    
        // second
        time_hr -= this.min;
        time_hr *= 60;
        this.sec = parseInt( Math.floor(time_hr) );
    
        // miliseconds
        time_hr -= this.sec;
        time_hr *= 1000;
        this.mili = parseInt( Math.floor(time_hr) );
    }

    SetValue(i)
    {
        this.hour = this.min = this.sec = this.mili = i;
    }

    Set(d)
    {
        this.hour = d.hour;
        this.min = d.min;
        this.sec = d.sec;
        this.mili = d.mili;
    }

    ScalarValue()
    {
        return this.milli/1000 + this.sec + this.minute*60 + this.hour*3600;
    }

    IsGreaterThan(dt)
    {
        if (this.ScalarValue() > dt.ScalarValue()) {
            return true;
        }
    }
    
    IsLessThan(dt)
    {
        if (this.ScalarValue() < dt.ScalarValue()) {
            return true;
        }
    }
    
    IsGreaterOrEqualThan(dt)
    {
        if (this.ScalarValue() >= dt.ScalarValue()) {
            return true;
        }
    }
    
    IsLessOrEqualThan(dt)
    {
        if (this.ScalarValue() <= dt.ScalarValue()) {
            return true;
        }
    }
    
    AddMinutes(mn) 
    {
        this.min += mn;
        while(this.min < 0) { this.min += 60; this.hour--;}
        while(this.min > 59) { this.min -= 60; this.hour++;}
    }
    
    GetDayTime()
    {
        return ((double(this.hour)*60.0 + double(this.min))*60.0 + double(this.sec)) / 86400.0;
    }

    ////////////////////////////////////////////////////////////////
    //
    //  Conversion time from DEGREE fromat to H:M:S:MS format
    //
    //  time - output
    //  time_deg - input time in range 0 deg to 360 deg
    //             where 0 deg = 0:00 AM and 360 deg = 12:00 PM
    //
    SetDegTime(time_deg)
    {
        var time_hr = 0.0;

        time_deg = GCMath.putIn360(time_deg);

        // hour
        time_hr = time_deg / 360 * 24;
        this.hour = parseInt( Math.floor(time_hr));

        // minute
        time_hr -= hour;
        time_hr *= 60;
        this.min = parseInt( Math.floor(time_hr));

        // second
        time_hr -= min;
        time_hr *= 60;
        this.sec = parseInt( Math.floor(time_hr));

        // miliseconds
        time_hr -= sec;
        time_hr *= 1000;
        this.mili = parseInt( Math.floor(time_hr));
    }

    ToLongTimeString()
    {
        return sprintf("%02d:%02d:%02d", this.hour, this.min, this.sec);
    } 
}

/*************************************************    js/GCAyanamsha.js **********************************************/

var GCAyanamsha_pNames = [
	"Fagan/Bradley",
	"Lahiri",
	"Krishnamurti",
	"Raman"
]

var GCAyanamsha_ayamashaType = 1

class GCAyanamsha
{

	//==================================================================
	//
	// precession of the equinoxes http://en.wikipedia.org/wiki/Precession_%28astronomy%29
	//
	//==================================================================

	static GetAyanamsa(jdate)
	{
		var t, d;
		var a1 = 0.0;


		// progress of ayanamsa from 1950 to 2000
		//1.3971948971667
		t = (jdate - 2451545.0) / 36525.0;
		d = (5028.796195 - 1.1054348 * t) * t / 3600.0;
		switch (GCAyanamsha_ayamashaType)
		{
			case 0: // Fagan-Bradley
				a1 = 24.8361111111 - 0.095268987143399 + d;
				//-69.943382314 + jdate * 3.8263328316687189e-5;
				break;
			case 1: // Lahiri
				a1 = 23.85305555555 + d;
				//a1 = GetLahiriAyanamsa(jdate);
				// 23-51-14 in 2000
				//TRACE("Ayan lahiri = %f\n", a1 - GetLahiriAyanamsa(jdate));
				break;
			case 2: // Krishnamurti
				a1 = 23.8561111111 - 0.095268987143399 + d;
				break;
			case 3: // Raman
				a1 = 22.5066666666 - 0.095268987143399 + d;
				break;
			default:
				a1 = 21.0;
				break;
		}

		return a1;

	}

	static GetAyanamsaName(nType)
	{
		if (nType > 3)
			return "";

		return GCAyanamsha_pNames[nType];
	}


	//==================================================================
	//
	//==================================================================

	static GetAyanamsaType()
	{
		return GCAyanamsha_ayamashaType;
	}

	//==================================================================
	//
	//==================================================================

	static SetAyanamsaType(i) {
		var prev = GCAyanamsha_ayamashaType;
		GCAyanamsha_ayamashaType = i;
		return prev;
	}



	/*********************************************************************/
	/*                                                                   */
	/* Value of Ayanamsha for given Julian day                           */
	/*                                                                   */
	/*********************************************************************/

	/*
	27.8.1900     22-27-54  2415259.000000 22,475
	23.7.1950     23-09-53  2433486.000000 23,16472
	3.9.2000      23-52-13  2451791.000000 23,870277778
	28.8.2010     24-00-04  2455437.000000 24,001111111
	21.6.2050     24-33-29  2469979.000000 24,558055556
	14.6.2100     25-15-29  2488234.000000 25,258055556*/

	static GetLahiriAyanamsa(d)
	{
		var h = [ 2415259.000000,22.475,
			2433486.000000,23.16472,
			2451791.000000,23.870277778,
			2455437.000000,24.001111111,
			2469979.000000,24.558055556,
			2488234.000000,25.258055556 ]

		if (d > h[10])
		{
			return (d - h[10]) * ((h[11] - h[9]) / (h[10] - h[8])) + h[11];
		}
		else if (d > h[8])
		{
			return (d - h[8]) * ((h[11] - h[9]) / (h[10] - h[8])) + h[9];
		}
		else if (d > h[6])
		{
			return (d - h[6]) * ((h[9] - h[7]) / (h[8] - h[6])) + h[7];
		}
		else if (d > h[4])
		{
			return (d - h[4]) * ((h[7] - h[5]) / (h[6] - h[4])) + h[5];
		}
		else if (d > h[2])
		{
			return (d - h[2]) * ((h[5] - h[3]) / (h[4] - h[2])) + h[3];
		}
		else if (d > h[0])
		{
			return (d - h[0]) * ((h[3] - h[1]) / (h[2] - h[0])) + h[1];
		}
		else
		{
			return (d - h[0]) * ((h[3] - h[1]) / (h[2] - h[0])) + h[1];
		}
	}


}

/*************************************************    js/GCRasi.js **********************************************/

var GCRasi_Name = [
	"Mesa", 
	"Vrsabha", 
	"Mithuna", 
	"Karka", 
	"Simha", 
	"Kanya", 
	"Tula", 
	"Vrscika", 
	"Dhanus", 
	"Makara", 
	"Kumbha", 
	"Mina" 
]

var GCRasi_NameEn = [
	"Aries", 
	"Taurus", 
	"Gemini", 
	"Cancer", 
	"Leo", 
	"Virgo", 
	"Libra", 
	"Scorpio", 
	"Sagittarius", 
	"Capricorn", 
	"Aquarius", 
	"Pisces", 
]

class GCRasi {
	/*********************************************************************/
	/*                                                                   */
	/* Calculation of Rasi from sun-logitude and ayanamsa                */
	/*                                                                   */
	/*********************************************************************/

	// double SunLongitude, Ayanamsha
	static GetRasi(SunLongitude, Ayanamsa)
	{
		return GCMath.IntFloor(GCMath.putIn360(SunLongitude - Ayanamsa) / 30.0);
	}


	// int i
	static GetName(i)
	{
		return GCRasi_Name[i % 12]
	}

	// int i
	static GetNameEn(i)
	{
		return GCRasi_NameEn[i % 12]
	}
}

/*************************************************    js/TCountry.js **********************************************/
var TCountry_modified = false;
var TCountry_gcontinents = [
    "",
    "Europe", //1
    "Asia",   //2
    "Africa", //3
    "America",//4
    "Pacific",//5
    "Indiana",//6
    "Atlantic",//7
    ""
];

class TCountry {
    constructor() {
        this.abbreviatedName = "";
        this.name = "";
        this.code = 0;
        this.continent = 0;
        this.FirstDayOfWeek = 0;
    }

	static modified(value) {
        if (value == undefined) {
            return TCountry_modified;
        }
        TCountry_modified = value;
    }

    static GetCountryName(code)
    {
        if (code != undefined) {
            for (var c of TCountry_gcountries)
            {
                if (c.code == code) {
                    return c.name;
                }
            }
        }
    
        return "";
    }
    
    static GetCountryContinentName(code)
    {
        if (code != undefined) {
            for(var c of TCountry_gcountries)
            {
                if (c.code == code)
                    return TCountry_gcontinents[c.continent];
            }    
        }
    
        return "";
    }
    
    static GetCountryCount()
    {
        return TCountry_gcountries.length;
    }
    
    static GetCountryNameByIndex(nIndex)
    {
        return TCountry_gcountries[nIndex].name;
    }
    
    static GetCountryContinentNameByIndex(nIndex)
    {
        return TCountry_gcontinents[TCountry_gcountries[nIndex].continent];
    }
    
    static GetCountryAcronymByIndex(nIndex)
    {
        return TCountry_gcountries[nIndex].abbreviatedName;
    }
    
    static CodeToInt(pszCode)
    {
        pszCode += "  "
        return pszCode.charCodeAt(0)*256 + pszCode.charCodeAt(1);
    }

    static AddCountry(pszCode, pszName, nContinent)
    {
        var country = new TCountry();
    
        country.abbreviatedName = pszCode;
        country.code = this.CodeToInt(pszCode);
        country.name = pszName;
        country.continent = nContinent;
    
        TCountry_gcountries.push(country);
    
        return TCountry_gcountries.length;
    }
    
    static SetCountryName(nSelected, psz)
    {
        TCountry_gcountries[nSelected].name = psz;
        TCountry_modified = true;
        return 1;
    }
    
    static GetCountryCode(nIndex)
    {
        return TCountry_gcountries[nIndex].code;
    }

    static FindCountryByName(name) {
        for(var c of TCountry_gcountries) {
            if (c.name == name) {
                return c;
            }
        }
        return null;
    }
}

var TCountry_gcountries = [
    { code: 'AD', name: 'Andorra', continent: 1, FirstDayOfWeek: 1 },
    { code: 'AE', name: 'United Arab Emirates', continent: 2, FirstDayOfWeek: 6 },
    { code: 'AF', name: 'Afghanistan', continent: 2, FirstDayOfWeek: 6 },
    { code: 'AG', name: 'Antigua', continent: 4 },
    { code: 'AL', name: 'Albania', continent: 1, FirstDayOfWeek: 1 },
    { code: 'AM', name: 'Armenia', continent: 2, FirstDayOfWeek: 1 },
    { code: 'AN', name: 'Curacao', continent: 4 },
    { code: 'AO', name: 'Angola', continent: 3 },
    { code: 'AR', name: 'Argentina', continent: 4, FirstDayOfWeek: 0 },
    { code: 'AS', name: 'American Samoa', continent: 5 },
    { code: 'AT', name: 'Austria', continent: 1, FirstDayOfWeek: 1 },
    { code: 'AU', name: 'Australia', continent: 0, FirstDayOfWeek: 1 },
    { code: 'AW', name: 'Aruba', continent: 4 },
    { code: 'AZ', name: 'Azerbaijan', continent: 2, FirstDayOfWeek: 1 },
    { code: 'BA', name: 'Bosnia and Herzegovina', continent: 1 },
    { code: 'BB', name: 'Barbados', continent: 4 },
    { code: 'BD', name: 'Bangladesh', continent: 2 },
    { code: 'BE', name: 'Belgium', continent: 1, FirstDayOfWeek: 1 },
    { code: 'BF', name: 'Burkina Faso', continent: 3 },
    { code: 'BG', name: 'Bulgaria', continent: 1, FirstDayOfWeek: 1 },
    { code: 'BH', name: 'Bahrain', continent: 2, FirstDayOfWeek: 6 },
    { code: 'BI', name: 'Burundi', continent: 3 },
    { code: 'BJ', name: 'Benin', continent: 3 },
    { code: 'BL', name: 'Guadeloupe', continent: 4 },
    { code: 'BN', name: 'Brunei', continent: 2, FirstDayOfWeek: 1 },
    { code: 'BO', name: 'Bolivia', continent: 4 },
    { code: 'BR', name: 'Brazil', continent: 4 },
    { code: 'BS', name: 'Bahamas', continent: 4 },
    { code: 'BT', name: 'Bhutan', continent: 2 },
    { code: 'BW', name: 'Botswana', continent: 3 },
    { code: 'BY', name: 'Belarus', continent: 1, FirstDayOfWeek: 1 },
    { code: 'BZ', name: 'Belize', continent: 4 },
    { code: 'CA', name: 'Canada', continent: 4 },
    { code: 'CD', name: 'Democratic Republic of the Congo', continent: 3 },
    { code: 'CF', name: 'Central African Republic', continent: 3 },
    { code: 'CG', name: 'Congo', continent: 3 },
    { code: 'CH', name: 'Switzerland', continent: 1, FirstDayOfWeek: 1 },
    { code: 'CI', name: 'Ivory Coast', continent: 3 },
    { code: 'CK', name: 'Cook Islands', continent: 5 },
    { code: 'CL', name: 'Chile', continent: 4 },
    { code: 'CM', name: 'Cameroon', continent: 3 },
    { code: 'CN', name: 'China', continent: 2 },
    { code: 'CO', name: 'Colombia', continent: 4 },
    { code: 'CR', name: 'Costa Rica', continent: 4 },
    { code: 'CU', name: 'Cuba', continent: 4 },
    { code: 'CV', name: 'Cape Verde', continent: 7 },
    { code: 'CY', name: 'Cyprus', continent: 2 },
    { code: 'CZ', name: 'Czech', continent: 1, FirstDayOfWeek: 1 },
    { code: 'DE', name: 'Germany', continent: 1, FirstDayOfWeek: 1 },
    { code: 'DJ', name: 'Djibouty', continent: 3 },
    { code: 'DK', name: 'Denmark', continent: 1, FirstDayOfWeek: 1 },
    { code: 'DM', name: 'Dominica', continent: 4 },
    { code: 'DO', name: 'Dominican Republic', continent: 4 },
    { code: 'DZ', name: 'Algeria', continent: 3 },
    { code: 'EC', name: 'Ecuador', continent: 4 },
    { code: 'EE', name: 'Estonia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'EG', name: 'Egypt', continent: 3, FirstDayOfWeek: 6 },
    { code: 'EH', name: 'Western Sahara', continent: 3 },
    { code: 'ER', name: 'Eritrea', continent: 3 },
    { code: 'ES', name: 'Spain', continent: 3, FirstDayOfWeek: 1 },
    { code: 'ET', name: 'Ethiopia', continent: 3 },
    { code: 'FI', name: 'Finland', continent: 1, FirstDayOfWeek: 1 },
    { code: 'FJ', name: 'Fiji', continent: 5 },
    { code: 'FM', name: 'Ponape', continent: 5 },
    { code: 'FO', name: 'Faroe', continent: 7 },
    { code: 'FR', name: 'France', continent: 1, FirstDayOfWeek: 1 },
    { code: 'GA', name: 'Gabon', continent: 3 },
    { code: 'GB', name: 'United Kingdom', continent: 1, FirstDayOfWeek: 1 },
    { code: 'GE', name: 'Georgia', continent: 2, FirstDayOfWeek: 1 },
    { code: 'GF', name: 'French Guiana', continent: 4, FirstDayOfWeek: 1 },
    { code: 'GH', name: 'Ghana', continent: 3 },
    { code: 'GI', name: 'Gibraltar', continent: 1 },
    { code: 'GL', name: 'Greenland', continent: 4 },
    { code: 'GM', name: 'Gambia', continent: 3 },
    { code: 'GN', name: 'Guinea', continent: 3 },
    { code: 'GP', name: 'Guadeloupe', continent: 4 },
    { code: 'GQ', name: 'Equatorial Guinea', continent: 3 },
    { code: 'GR', name: 'Greece', continent: 1, FirstDayOfWeek: 1 },
    { code: 'GT', name: 'Guatemala', continent: 4 },
    { code: 'GU', name: 'Guam', continent: 5 },
    { code: 'GW', name: 'Guinea-Bissau', continent: 3 },
    { code: 'GY', name: 'Guyana', continent: 4 },
    { code: 'HK', name: 'Hong Kong', continent: 2 },
    { code: 'HN', name: 'Honduras', continent: 4 },
    { code: 'HR', name: 'Croatia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'HT', name: 'Haiti', continent: 4 },
    { code: 'HU', name: 'Hungary', continent: 1, FirstDayOfWeek: 1 },
    { code: 'ID', name: 'Indonesia', continent: 2 },
    { code: 'IE', name: 'Ireland', continent: 1, FirstDayOfWeek: 1 },
    { code: 'IL', name: 'Israel', continent: 2 },
    { code: 'IN', name: 'India', continent: 2, FirstDayOfWeek: 1 },
    { code: 'IQ', name: 'Iraq', continent: 2, FirstDayOfWeek: 6 },
    { code: 'IR', name: 'Iran', continent: 2, FirstDayOfWeek: 6 },
    { code: 'IS', name: 'Iceland', continent: 7, FirstDayOfWeek: 1 },
    { code: 'IT', name: 'Italy', continent: 1, FirstDayOfWeek: 1 },
    { code: 'JM', name: 'Jamaica', continent: 4 },
    { code: 'JO', name: 'Jordan', continent: 2, FirstDayOfWeek: 6 },
    { code: 'JP', name: 'Japan', continent: 2 },
    { code: 'KE', name: 'Kenya', continent: 3 },
    { code: 'KG', name: 'Kyrgyzstan', continent: 2, FirstDayOfWeek: 1 },
    { code: 'KH', name: 'Cambodia', continent: 2 },
    { code: 'KI', name: 'Kiribati', continent: 5 },
    { code: 'KM', name: 'Comoro', continent: 6 },
    { code: 'KN', name: 'Saint Kitts and Nevis', continent: 4 },
    { code: 'KP', name: 'North Korea', continent: 2 },
    { code: 'KR', name: 'South Korea', continent: 2 },
    { code: 'KW', name: 'Kuwait', continent: 2, FirstDayOfWeek: 6 },
    { code: 'KY', name: 'Cauman', continent: 4 },
    { code: 'KZ', name: 'Kazakhstan', continent: 2, FirstDayOfWeek: 1 },
    { code: 'LA', name: 'Laos', continent: 2 },
    { code: 'LB', name: 'Lebanon', continent: 2, FirstDayOfWeek: 1 },
    { code: 'LC', name: 'Saint Lucia', continent: 4 },
    { code: 'LI', name: 'Liechtenstein', continent: 1 },
    { code: 'LK', name: 'Sri Lanka', continent: 2 },
    { code: 'LR', name: 'Liberia', continent: 3 },
    { code: 'LS', name: 'Lesotho', continent: 3 },
    { code: 'LT', name: 'Lithuania', continent: 1, FirstDayOfWeek: 1 },
    { code: 'LU', name: 'Luxembourg', continent: 1, FirstDayOfWeek: 1 },
    { code: 'LV', name: 'Latvia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'LY', name: 'Libya', continent: 3, FirstDayOfWeek: 6 },
    { code: 'MA', name: 'Morocco', continent: 3, FirstDayOfWeek: 1 },
    { code: 'MC', name: 'Monaco', continent: 1, FirstDayOfWeek: 1 },
    { code: 'MD', name: 'Moldova', continent: 1 },
    { code: 'ME', name: 'Montenegro', continent: 1 },
    { code: 'MG', name: 'Madagascar', continent: 6 },
    { code: 'MH', name: 'Marshall Islands', continent: 5 },
    { code: 'MK', name: 'Macedonia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'ML', name: 'Mali', continent: 3 },
    { code: 'MM', name: 'Burma', continent: 2 },
    { code: 'MN', name: 'Mongolia', continent: 2, FirstDayOfWeek: 1 },
    { code: 'MP', name: 'Northern Mariana Islands', continent: 5 },
    { code: 'MQ', name: 'Martinique', continent: 4 },
    { code: 'MR', name: 'Mauritania', continent: 3 },
    { code: 'MT', name: 'Malta', continent: 1 },
    { code: 'MU', name: 'Mauritius', continent: 6 },
    { code: 'MV', name: 'Maldives', continent: 6 },
    { code: 'MW', name: 'Malawi', continent: 3 },
    { code: 'MX', name: 'Mexico', continent: 4 },
    { code: 'MY', name: 'Malaysia', continent: 2, FirstDayOfWeek: 1 },
    { code: 'MZ', name: 'Mozambique', continent: 3 },
    { code: 'NA', name: 'Nairobi', continent: 3 },
    { code: 'NC', name: 'New Caledonia', continent: 5 },
    { code: 'NE', name: 'Niger', continent: 3 },
    { code: 'NG', name: 'Nigeria', continent: 3 },
    { code: 'NI', name: 'Nicaragua', continent: 4 },
    { code: 'NL', name: 'Netherlands', continent: 1, FirstDayOfWeek: 1 },
    { code: 'NO', name: 'Norway', continent: 1, FirstDayOfWeek: 1 },
    { code: 'NP', name: 'Nepal', continent: 2 },
    { code: 'NZ', name: 'New Zealand', continent: 5, FirstDayOfWeek: 1 },
    { code: 'OM', name: 'Oman', continent: 2, FirstDayOfWeek: 6 },
    { code: 'PA', name: 'Panama', continent: 4 },
    { code: 'PE', name: 'Peru', continent: 4 },
    { code: 'PF', name: 'Tahiti', continent: 5 },
    { code: 'PG', name: 'Papua New Guinea', continent: 5 },
    { code: 'PH', name: 'Philippines', continent: 2 },
    { code: 'PK', name: 'Pakistan', continent: 2, FirstDayOfWeek: 1 },
    { code: 'PL', name: 'Poland', continent: 1, FirstDayOfWeek: 1 },
    { code: 'PM', name: 'Miquelon', continent: 4 },
    { code: 'PR', name: 'Puerto Rico', continent: 4 },
    { code: 'PS', name: 'Gaza Strip', continent: 2 },
    { code: 'PT', name: 'Portugal', continent: 1, FirstDayOfWeek: 1 },
    { code: 'PY', name: 'Paraguay', continent: 4, FirstDayOfWeek: 1 },
    { code: 'QA', name: 'Qatar', continent: 2, FirstDayOfWeek: 6 },
    { code: 'RE', name: 'Reunion', continent: 6 },
    { code: 'RO', name: 'Romania', continent: 1, FirstDayOfWeek: 1 },
    { code: 'RS', name: 'Serbia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'RU', name: 'Russia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'RW', name: 'Rwanda', continent: 3 },
    { code: 'SA', name: 'Saudi Arabia', continent: 2, FirstDayOfWeek: 6 },
    { code: 'SB', name: 'Solomon Islands', continent: 5 },
    { code: 'SC', name: 'Mahe', continent: 6 },
    { code: 'SD', name: 'Sudan', continent: 3 },
    { code: 'SE', name: 'Sweden', continent: 1, FirstDayOfWeek: 1 },
    { code: 'SG', name: 'Singapore', continent: 2, FirstDayOfWeek: 1 },
    { code: 'SI', name: 'Slovenia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'SK', name: 'Slovakia', continent: 1, FirstDayOfWeek: 1 },
    { code: 'SL', name: 'Sierra Leone', continent: 3 },
    { code: 'SM', name: 'San Marino', continent: 1 },
    { code: 'SN', name: 'Senegal', continent: 3 },
    { code: 'SO', name: 'Somalia', continent: 3 },
    { code: 'SR', name: 'Suriname', continent: 4 },
    { code: 'ST', name: 'Sao Tome', continent: 3 },
    { code: 'SV', name: 'El Salvador', continent: 4 },
    { code: 'SY', name: 'Syria', continent: 2, FirstDayOfWeek: 6 },
    { code: 'SZ', name: 'Swaziland', continent: 3 },
    { code: 'TD', name: 'Chad', continent: 3 },
    { code: 'TG', name: 'Togo', continent: 3 },
    { code: 'TH', name: 'Thailand', continent: 2, FirstDayOfWeek: 1 },
    { code: 'TJ', name: 'Tajikistan', continent: 2 },
    { code: 'TL', name: 'Lesser Sunda Islands', continent: 2 },
    { code: 'TM', name: 'Turkmenistan', continent: 2 },
    { code: 'TN', name: 'Tunis', continent: 3, FirstDayOfWeek: 1 },
    { code: 'TR', name: 'Turkey', continent: 1, FirstDayOfWeek: 1 },
    { code: 'TT', name: 'Trinidad and Tobago', continent: 4 },
    { code: 'TW', name: 'Taiwan', continent: 2, FirstDayOfWeek: 0 },
    { code: 'TZ', name: 'Tanzania', continent: 3 },
    { code: 'UA', name: 'Ukraine', continent: 1, FirstDayOfWeek: 1 },
    { code: 'UG', name: 'Uganda', continent: 3 },
    { code: 'US', name: 'United States of America', continent: 4 },
    { code: 'UY', name: 'Uruguay', continent: 4, FirstDayOfWeek: 1 },
    { code: 'UZ', name: 'Uzbekistan', continent: 2, FirstDayOfWeek: 1 },
    { code: 'VC', name: 'Saint Vincent', continent: 4 },
    { code: 'VE', name: 'Venezuela', continent: 4 },
    { code: 'VG', name: 'Virgin Islands', continent: 4 },
    { code: 'VN', name: 'Vietnam', continent: 2, FirstDayOfWeek: 1 },
    { code: 'VU', name: 'Vanuatu', continent: 5 },
    { code: 'WS', name: 'Samoa', continent: 5 },
    { code: 'YE', name: 'Yemen', continent: 2, FirstDayOfWeek: 6 },
    { code: 'YT', name: 'Mayotte', continent: 6 },
    { code: 'ZA', name: 'South Africa', continent: 3 },
    { code: 'ZM', name: 'Zambia', continent: 3 },
    { code: 'ZW', name: 'Zimbabwe', continent: 3 },

];

// initialize codes for countries
for (var c of TCountry_gcountries) {
    c.abbreviatedName = c.code;
    c.code = TCountry.CodeToInt(c.code);
}


/*************************************************    js/GregorianDateTime.js **********************************************/

var GregorianDateTime_Months = [0,31,28,31,30,31,30,31,31,30,31,30,31]
var GregorianDateTime_MonthsOvr = [0,31,29,31,30,31,30,31,31,30,31,30,31]
var GregorianDateTime_MonthAbr = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
var GregorianDateTime_MonthName = ["","January","February","March","April","May","June","July","August","September","October","November","December"]

function GregorianDateTime_Test() {
  var n = new GregorianDateTime()
  var m = new GregorianDateTime()
  m.Set(n)
  m.day = 2
  
  n.AddHours(5.7892)

  document.write("<p>GregporianDateTime test: " + n.c_str())
}


class GregorianDateTime {
	constructor(date) {
		this.Clear()
		if (date != undefined) {
			this.Set(date);
		}
	}
  
	Clear() {
		var d = new Date()
		
		 //this.class = "GregorianDateTime"
		this.day = d.getDate()
		this.month = d.getMonth() + 1
		this.year = d.getYear() + 1900
		this.dayOfWeek = d.getDay()
		this.shour = 0.5
		this.TimezoneHours = 0.0
	}
	
	Today() {
		Clear()
	}
	
	Clone() {
		var dt = new GregorianDateTime()
		dt.Set(this)
		return dt
	}
	
	get triplet() {
		return sprintf('%04d-%02d-%02d', this.year, this.month, this.day);
	}

	static fromTriplet(str) {
		var parts = str.split('-');
		if (parts.length == 3) {
			return GregorianDateTime.fromComponents(parseInt(parts[0], 10),
				parseInt(parts[1], 10), parseInt(parts[2], 10));
		}
		return GregorianDateTime();
	}

	static fromComponents(year, month, day) {
		var d = new GregorianDateTime();
		d.year = year;
		d.month = month;
		d.day = day;
		return d;
	}

	cloneDays(daysOffset) {
		var d = new GregorianDateTime();
		d.Set(this);
		d.AddDays(daysOffset);
		return d;
	}

	static fromDate(date) {
		return new GregorianDateTime(date);
	}

	setOffset(offset) {
		this.TimezoneHours = offset;
		return this;
	}
	
	Set(gdt) {
		if (gdt instanceof GregorianDateTime) {
			this.day = gdt.day
			this.month = gdt.month
			this.year = gdt.year
			this.shour = gdt.shour
			this.dayOfWeek = gdt.dayOfWeek
			this.TimezoneHours = gdt.TimezoneHours
		}
		return this;
	}
	
	SetDate(nYear,nMonth,nDay) {
		this.day = nDay
		this.month = nMonth
		this.year = nYear
		this.shour = 0.5
		this.TimezoneHours = 0.0
		InitWeekDay()
	}
	
	toString() {
		return this.Format("{day} {monthAbr} {year}")
	}
	
	LongTime() {
		return LongTimeString()
	}
  
	get weekday() {
		return this.dayOfWeek;
	}
	
	getStringValue() {
		return toString()
	}

	ShortTimeString() {
		return sprintf("%02d:%02d", this.GetHour(), this.GetMinute());
	}

	LongTimeString() {
		return sprintf("%02d:%02d:%02d", this.GetHour(), this.GetMinute(), this.GetSecond());
	}
	
	c_str() {
		return Convert.FormatS2(this.day) + " " + GregorianDateTime.GetMonthAbreviation(this.month)
			+ " " + Convert.FormatD4(this.year) + "  " + Convert.FormatD2(this.GetHour())
			+ ":" + Convert.FormatD2(this.GetMinute()) + ":" + Convert.FormatD2(this.GetSecond())			
	}
	
	FullString() {
		return this.c_str()
	}
	
	static GetDateTextWithTodayExt(vc)
	{
	    var strRet = this.Format("{day} {month} {year}")
		if ((vc.day > 0) && (vc.day < 32) && (vc.month > 0) && (vc.month < 13) && (vc.year >= 1500) && (vc.year < 4000))
		{
			var today = new GregorianDateTime();
			var diff = today.GetJulianInteger() - vc.GetJulianInteger();
			if (diff == 0)
			{
				strRet += " (Today)" 
			}
			else if (diff == -1)
			{
				strRet += " (Tomorrow)"
			}
			else if (diff == 1)
			{
				strRet += " (Yesterday)"
			}
		}
		return strRet
	}

	
	static TimeSpanToLongString(seconds) {
		var h, m, s;
		s = (int)(seconds % 60);
		m = (int)((seconds / 60) % 60);
		h = (int)(seconds / 3600);
		return Convert.FormatD2(m) + ":" + Convert.FormatD2(m) +
			":" + Convert.FormatD2(s)
	}

	Format(format) {
		var sb = format;

		if (format.search("{day}") >= 0)
			sb = sb.replace("{day}", this.day.toString());
		if (format.search("{month}") >= 0)
			sb = sb.replace("{month}", month.toString());
		if (format.search("{monthAbr}") >= 0)
			sb = sb.replace("{monthAbr}", GregorianDateTime.GetMonthAbreviation(this.month));
		if (format.search("{monthName}") >= 0)
			sb = sb.replace("{monthName}", GregorianDateTime.GetMonthName(this.month));
		if (format.search("{hour}") >= 0)
			sb = sb.replace("{hour}", Convert.FormatD2(this.GetHour()));
		if (format.search("{min}") >= 0)
			sb = sb.replace("{min}", Convert.FormatD2(this.GetMinute()));
		if (format.search("{minRound}") >= 0) {
			sb = sb.replace("{minRound}", Convert.FormatD2(this.GetMinuteRound()));
		}
		if (format.search("{sec}") >= 0)
			sb = sb.replace("{sec}", Convert.FormatD2(this.GetSecond()));
		if (format.search("{year}") >= 0)
			sb = sb.replace("{year}", this.year.toString());

		return sb
	}
	
	static GetMonthMaxDays(year, month) {
		if (GregorianDateTime.IsLeapYear(year))
			return GregorianDateTime_MonthsOvr[month]
		else
			return GregorianDateTime_Months[month]
	}

    static IsLeapYear(year)
	{
		if ((year % 4) == 0)
		{
			if ((year % 100 == 0) && (year % 400 != 0))
				return false
			else
				return true
		}

		return false
	}
	
	GetJulianInteger() {
		var yy = this.year - Convert.ToInt32((12 - this.month) / 10)
		var mm = this.month + 9

		if (mm >= 12)
			mm -= 12;

		var k1, k2, k3;
		var j;

		k1 = Convert.ToInt32 (Math.floor(365.25 * (yy + 4712)));
		k2 = Convert.ToInt32 (Math.floor(30.6 * mm + 0.5));
		var yy100 = GCMath.IntFloor(yy/100);
		k3 = Convert.ToInt32 (Math.floor(Math.floor((yy100)+49)*.75))-38;
		j = k1 + k2 + this.day + 59;
		if (j > 2299160)
			j -= k3;
		return j;
	}

	GetJulian() {
		return 1.0*this.GetJulianInteger()
	}
	
	NormalizeValues() {
		if (this.shour < 0.0)
		{
			this.day--;
			this.shour += 1.0;
		}
		else if (this.shour >= 1.0)
		{
			this.shour -= 1.0;
			this.day++;
		}
		if (this.day < 1)
		{
			this.month--;
			if (this.month < 1)
			{
				this.month = 12;
				this.year--;
			}
			this.day = GregorianDateTime.GetMonthMaxDays(this.year, this.month);
		}
		else if (this.day > GregorianDateTime.GetMonthMaxDays(this.year, this.month))
		{
			this.month++;
			if (this.month > 12)
			{
				this.month = 1;
				this.year++;
			}
			this.day = 1;
		}		
	}
	
	PreviousDay() {
		this.day--;
		if (this.day < 1)
		{
			this.month--;
			if (this.month < 1)
			{
				this.month = 12;
				this.year--;
			}
			this.day = GregorianDateTime.GetMonthMaxDays(this.year, this.month);
		}
		this.dayOfWeek = (this.dayOfWeek + 6) % 7;
		return this;
	}

	NextDay() {
		this.day++;
		if (this.day > GregorianDateTime.GetMonthMaxDays(this.year, this.month))
		{
			this.month++;
			if (this.month > 12)
			{
				this.month = 1;
				this.year++;
			}
			this.day = 1;
		}
		this.dayOfWeek = (this.dayOfWeek + 1) % 7;
		return this;
	}
	
	AddDays(n) {
		if (n < 0) {
			return this.SubtractDays(-n)
		} else {
			for (var i = 0; i < n; i++) {
				this.NextDay();
			}
		}
		return this;
	}

	// julianUtcDate (double)
	SetFromJulian(julianUtcDate) {
		var z = Math.floor(julianUtcDate + 0.5);

		var f = (julianUtcDate + 0.5) - z;

		var A, B, C, D, E, alpha;

		if (z < 2299161.0)
		{
			A = z;
		} 
		else 
		{
			alpha = Math.floor((z - 1867216.25)/36524.25);
			A = z + 1.0 + alpha - Math.floor(alpha/4.0);
		}

		B = A + 1524;
		C = Math.floor((B - 122.1)/365.25);
		D = Math.floor(365.25 * C);
		E = Math.floor((B - D)/30.6001);
		this.day = Convert.ToInt32(Math.floor(B - D - Math.floor(30.6001 * E) + f));
		this.month = Convert.ToInt32((E < 14) ? E - 1 : E - 13);
		this.year = Convert.ToInt32((this.month > 2) ? C - 4716 : C - 4715);
		this.TimezoneHours = 0.0;
		this.shour = julianUtcDate + 0.5 - Math.floor(julianUtcDate + 0.5);
	}

	ChangeTimeZone(tZone) {
		this.shour += (tZone - this.TimezoneHours)/24;
		NormalizeValues();
		this.TimezoneHours = tZone;
	}

	SubtractDays(n) {
		if (n < 0) {
			this.AddDays(-n)
		} else {
			for (var i = 0; i < n; i++) {
				this.PreviousDay();
			}
		}
		return this;
	}
	
	AddHours(ndst) {
		this.shour += ndst / 24.0
		this.NormalizeValues()
	}

	TimeWithOffset(p) {
		var dt = this.Clone()
		dt.shour += parseFloat(p);
		dt.NormalizeValues();
		return dt
	}
	
	GetJulianDetailed() {
		return this.GetJulian() - 0.5 + this.shour
	}
	
	GetJulianComplete() {
		return this.GetJulian() - 0.5 + this.shour - this.TimezoneHours/24.0
	}

	InitWeekDay() {
		this.dayOfWeek = (this.GetJulianInteger() + 1)%7
		return this;
	}
	
	
	GetHour() {
		return Convert.ToInt32(Math.floor(this.shour * 24));
	}

	GetMinute()	{
		return Convert.ToInt32(Math.floor((this.shour * 24 - Math.floor(this.shour * 24)) * 60));
	}

	GetMinuteRound() {
		return Convert.ToInt32(Math.floor((this.shour * 24 - Math.floor(this.shour * 24)) * 60 + 0.5));
	}

	GetSecond() {
		return Convert.ToInt32(Math.floor((this.shour * 1440 - Math.floor(this.shour * 1440)) * 60));
	}

	GetDayInteger() {
		return this.year * 384 + this.month * 32 + this.day;
	}
	
	CompareYMD(v) {
		if (v instanceof GregorianDateTime) {
			return this.GetDayInteger() - v.GetDayInteger()
		}
		return 0
	}
	
	EqualDay(v) {
		if (this.day == v.day && this.month == v.month && this.year == v.year) {
			return true
		}
		return false
	}
	
	static Compare(A,B)
	{
		if ((A instanceof GregorianDateTime) && (B instanceof GregorianDateTime))
		{
			if (A.year < B.year)
				return -1;
			else if (A.year > B.year)
				return 1;

			if (A.month < B.month)
				return -1;
			else if (A.month > B.month)
				return 1;

			if (A.day < B.day)
				return -1;
			else if (A.day > B.day)
				return 1;

			if (A.shour < B.shour)
				return -1;
			else if (A.shour > B.shour)
				return 1;

			return 0;
		}
		
		return -2
	}

	IsLessOrEqualsTo(date) {
		var d1 = new GregorianDateTime()
		var d2 = new GregorianDateTime()
		
		d1.Set(this)
		d2.Set(date)
		
		d1.NormalizeValues()
		d2.NormalizeValues()
		
		return d1.GetDayInteger() <= d2.GetDayInteger()
	}
	
	IsLessThan(date) {
		var d1 = new GregorianDateTime()
		var d2 = new GregorianDateTime()
		
		d1.Set(this)
		d2.Set(date)
		
		d1.NormalizeValues()
		d2.NormalizeValues()
		
		return d1.GetDayInteger() < d2.GetDayInteger()
	}
	
	IsBeforeThis(date) {
		return this.IsLessThan(date)
	}

	IsDateEqual(date) {
		var d1 = new GregorianDateTime()
		var d2 = new GregorianDateTime()
		
		d1.Set(this)
		d2.Set(date)
		
		d1.NormalizeValues()
		d2.NormalizeValues()
		
		return ((d1.year == d2.year) && (d1.month == d2.month) && (d1.day == d2.day))
	}
	
	static GetMonthAbreviation(month) {
		return GregorianDateTime_MonthAbr[month]
	}

	static GetMonthName(month) {
		return GregorianDateTime_MonthName[month]
	}
	
	static CalculateJulianDay(year, month, day)
	{
		var yy = year - Convert.ToInt32((12 - month) / 10);
		var mm = month + 9;

		if (mm >= 12)
			mm -= 12;

		var k1, k2, k3;
		var j;

		k1 = Convert.ToInt32(Math.floor(365.25 * (yy + 4712)));
		k2 = Convert.ToInt32(Math.floor(30.6 * mm + 0.5));
		k3 = Convert.ToInt32(Math.floor(Math.floor((double)(yy/100)+49)*.75))-38;
		j = k1 + k2 + day + 59;
		if (j > 2299160)
			j -= k3;

		return Convert.ToDouble(j);
	}
	
	/// <summary>
	/// Tests whether this date is equal or after the date, when given weekday in given week occurs.
	/// </summary>
	/// <param name="weekNumber">Number of week. values 1, 2, 3, 4 are order of week, value 5 means last week of the month</param>
	/// <param name="dayNumber">Number of weekday, value 0 is Sunday, 1 is Monday, .... 6 is Saturday</param>
	/// <returns>Returns true, if this date is equal or is after the date given by weeknumber and daynumber</returns>
	IsEqualOrAfterWeekdayInWeek(weekNumber, dayNumber) {
		var vc = this
		var xx = [ 1, 7, 6, 5, 4, 3, 2 ]

		var dowFirstDay, firstGivenWeekday, requiredGivenWeekday, lastDayInMonth;

		// prvy den mesiaca
		dowFirstDay = xx[(7 + vc.day - vc.dayOfWeek) % 7];

		// 1. x-day v mesiaci ma datum
		firstGivenWeekday = xx[(dowFirstDay - dayNumber + 7) % 7];

		// n-ty x-day ma datum
		if ((weekNumber < 0) || (weekNumber >= 5))
		{
			requiredGivenWeekday = firstGivenWeekday + 28;
			lastDayInMonth = GregorianDateTime.GetMonthMaxDays(vc.year, vc.month);
			while (requiredGivenWeekday > lastDayInMonth)
			{
				requiredGivenWeekday -= 7;
			}
		}
		else
		{
			requiredGivenWeekday = Convert.ToInt32(firstGivenWeekday + (weekNumber - 1) * 7);
		}

		return vc.day >= requiredGivenWeekday;
	}
	
	
	//----------------------------
	// encoding
	//
	
	GetEncodedString() {
		return this.year.toString() + "|"
			+ this.month.toString() + "|"
			+ this.day.toString() + "|"
			+ this.shour.toString() + "|"
			+ this.TimezoneHours.toString() + "|"
			+ this.dayOfWeek.toString()
	}
	
	SetEncodedString(value) {
		var a = value.split("|")
		if (a.length >= 6) {
			this.year = ParseInt(a[0])
			this.month = ParseInt(a[1])
			this.day = ParseInt(a[2])
			this.shour = ParseDouble(a[3])
			this.TimezoneHours = ParseDouble(a[4])
			this.dayOfWeek = ParseInt(a[5])
		}
	}
}



/*************************************************    js/GCPaksa.js **********************************************/

/**************************************************
*
***************************************************/

class GCPaksa {
	static GetAbbr(i) {
		var s = GCPaksa.GetName(i);
		if (s.length < 1)
			return ' ';
		return s[0]
	}

	static GetName(i) {
		return i == 1 ? "Gaura" : "Krsna";
	}

}
/*************************************************    js/GaurabdaDate.js **********************************************/

class GaurabdaDate {

	constructor() {
		this.tithi = 0
		this.masa = 0
		this.gyear = 500
	}

	Set(t,m,y) {
		this.tithi = t;
		this.masa = m;
		this.gyear = y;
	}

	next() {
		this.tithi++;
		if (this.tithi >= 30)
		{
			this.tithi %= 30;
			this.masa++;
		}
		if (this.masa >= 12)
		{
			this.masa %= 12;
			this.gyear++;
		}
	}

	prev() {
		if (this.tithi == 0)
		{
			if (this.masa == 0)
			{
				this.masa = 11;
				this.tithi = 29;
			}
			else
			{
				this.masa--;
				this.tithi = 29;
			}
		}
		else
		{
			this.tithi--;
		}
	}

	Set(va) {
		if (va instanceof GaurabdaDate) {
			this.tithi = va.tithi;
			this.masa = va.masa;
			this.gyear = va.gyear;
		}
	}

}

/*************************************************    js/TCoreEvent.js **********************************************/



class TCoreEvent {

	constructor(ev) {
		if (ev != undefined) {
			this.Set(ev);
		} else {
			this.nType = 0;
			this.nData = 0;
			this.Time = 0;
			this.nDst = 0;
		}
	}

	static NewWithTimeType(inTime,inType) {
		var v = new TCoreEvent();
		v.nType = inType;
		v.Time = inTime;
		return v;
	}

	// int biasSecs
	GetDstTime(biasSeconds) {
		return this.Time + this.nDst * biasSeconds;
	}

	Set(de) {
		if (de instanceof TCoreEvent) {
			this.nType = de.nType;
			this.nData = de.nData;
			this.Time = de.Time;
			this.nDst = de.nDst;
		}
	}

	// long utcDayStart
	DaySeconds(utcDayStart) {
		return Convert.ToInt32((this.Time - utcDayStart + 86400) % 86400);
	}

	/*public override GSCore GetPropertyValue(string s)
	{
		switch (s)
		{
			case "nType":
				return new GSNumber(nType);
			case "nData":
				return new GSNumber(nType);
			case "Time":
				return new GSNumber(Time);
			case "nDst":
				return new GSNumber(nDst);
			case "tithiName":
				return new GSString(GCTithi.GetName(nData));
			case "naksatraName":
				return new GSString(GCNaksatra.GetName(nData));
			case "rasiName":
				return new GSString(GCRasi.GetName(nData));
			case "groupNameString":
				return new GSString(GetTypeString(nType));
			case "typeString":
				return new GSString(GetTypeString(nType, nData));
			case "dstSignature":
				return new GSString(GCStrings.GetDSTSignature(nDst));
			default:
				return base.GetPropertyValue(s);
		}
	}*/

	toString() {
		return this.TypeString() + ' ' + this.Time;
	}

	getTimeString(utcDayStart) {
		var ds = this.DaySeconds(utcDayStart);
		var ht = new DAYTIME();
		ht.SetDayTime(ds/86400.0 + this.nDst/24.0);
		return ht.ToLongTimeString();
	}

	static GetTypeString(nType, nData) {
		if (nData == undefined) {
			switch (nType) {
				case CoreEventType.CCTYPE_CONJ:
					return "Conjunction";
				case CoreEventType.CCTYPE_DATE:
					return "Date";
				case CoreEventType.CCTYPE_M_RASI:
					return "Moon rasi";
				case CoreEventType.CCTYPE_NAKS:
					return "Naksatra";
				case CoreEventType.CCTYPE_SANK:
					return "Sankranti";
				case CoreEventType.CCTYPE_TITHI:
					return "Tithi";
				case CoreEventType.CCTYPE_YOGA:
					return "Yoga";
				default:
					return "Unspecified event";
			}	
		} else {
			switch (nType) {
				case CoreEventType.CCTYPE_ASCENDENT:
					return "Ascendent " + GCRasi.GetName(nData);
				case CoreEventType.CCTYPE_CONJ:
					return "Conjunction in " + GCRasi.GetName(nData);
				case CoreEventType.CCTYPE_DATE:
					return "Date";
				case CoreEventType.CCTYPE_DAY_MUHURTA:
					return GCStrings.Format("{0} Muhurta", GCStrings.GetMuhurtaName(nData));
				case CoreEventType.CCTYPE_DAY_OF_WEEK:
					return GCCalendar.GetWeekdayName(nData);
				case CoreEventType.CCTYPE_KALA_END:
					return GCStrings.Format("{0} ends", GCStrings.GetKalaName(nData));
				case CoreEventType.CCTYPE_KALA_START:
					return GCStrings.Format("{0} starts", GCStrings.GetKalaName(nData));
				case CoreEventType.CCTYPE_M_RASI:
					return GCStrings.Format("Moon in {0} rasi", GCRasi.GetName(nData));
				case CoreEventType.CCTYPE_M_RISE:
					return "Moon rise";
				case CoreEventType.CCTYPE_M_SET:
					return "Moon set";
				case CoreEventType.CCTYPE_NAKS:
					return GCStrings.Format("{0} Naksatra", GCNaksatra.GetName(nData));
				case CoreEventType.CCTYPE_S_ARUN:
					return "Arunodaya";
				case CoreEventType.CCTYPE_S_MIDNIGHT:
					return "Midnight";
				case CoreEventType.CCTYPE_S_NOON:
					return "Noon";
				case CoreEventType.CCTYPE_S_RISE:
					return "Sunrise";
				case CoreEventType.CCTYPE_S_SET:
					return "Sunset";
				case CoreEventType.CCTYPE_SANK:
					return GCStrings.Format("{0} Sankranti", GCRasi.GetName(nData));
				case CoreEventType.CCTYPE_TITHI:
					return GCStrings.Format("{0} Tithi", GCTithi.GetName(nData));
				case CoreEventType.CCTYPE_YOGA:
					return GCStrings.Format("{0} Yoga", GCYoga.GetName(nData));
				default:
					return GCStrings.Format("Unspecified event {0} / {1}", nType, nData);
			}	
		}
	}

	GroupNameString() {
		return TCoreEvent.GetTypeString(this.nType)
	}

	TypeString() {
		return TCoreEvent.GetTypeString(this.nType, this.nData);
	}

	ApplyDstType(utcDayStart, inDst) {
		switch (inDst)
		{
			case DstTypeChange.DstOff:
				this.nDst = 0;
				break;
			case DstTypeChange.DstStart:
				if (this.DaySeconds(utcDayStart) >= 7200)
				{
					this.nDst = 1;
				}
				else
				{
					this.nDst = 0;
				}
				break;
			case DstTypeChange.DstOn:
				this.nDst = 1;
				break;
			case DstTypeChange.DstEnd:
				if (this.DaySeconds(utcDayStart) <= 7200)
				{
					this.nDst = 1;
				}
				else
				{
					this.nDst = 0;
				}
				break;
			default:
				this.nDst = 0;
				break;
		}
	}

}

/*************************************************    js/GCEkadasi.js **********************************************/

let GCEkadasi_Name = [
	"Varuthini Ekadasi",
	"Mohini Ekadasi",
	"Apara Ekadasi",
	"Pandava Nirjala Ekadasi",
	"Yogini Ekadasi",
	"Sayana Ekadasi",
	"Kamika Ekadasi",
	"Pavitraropana Ekadasi",
	"Annada Ekadasi",
	"Parsva Ekadasi",
	"Indira Ekadasi",
	"Pasankusa Ekadasi",
	"Rama Ekadasi",
	"Utthana Ekadasi",
	"Utpanna Ekadasi",
	"Moksada Ekadasi",
	"Saphala Ekadasi",
	"Putrada Ekadasi", 
	"Sat-tila Ekadasi",
	"Bhaimi Ekadasi",
	"Vijaya Ekadasi",
	"Amalaki vrata Ekadasi",
	"Papamocani Ekadasi",
	"Kamada Ekadasi",
	"Parama Ekadasi",
	"Padmini Ekadasi"
]

class GCEkadasi
{
	static GetMahadvadasiName(i) {
		switch (i) {
			case MahadvadasiType.EV_NULL:
			case MahadvadasiType.EV_SUDDHA:
				return null;
			case MahadvadasiType.EV_UNMILANI:
				return "Unmilani Mahadvadasi";
			case MahadvadasiType.EV_TRISPRSA:
			case MahadvadasiType.EV_UNMILANI_TRISPRSA:
				return "Trisprsa Mahadvadasi";
			case MahadvadasiType.EV_PAKSAVARDHINI:
				return "Paksa vardhini Mahadvadasi";
			case MahadvadasiType.EV_JAYA:
				return "Jaya Mahadvadasi";
			case MahadvadasiType.EV_VIJAYA:
				return "Vijaya Mahadvadasi";
			case MahadvadasiType.EV_PAPA_NASINI:
				return "Papa Nasini Mahadvadasi";
			case MahadvadasiType.EV_JAYANTI:
				return "Jayanti Mahadvadasi";
			case MahadvadasiType.EV_VYANJULI:
				return "Vyanjuli Mahadvadasi";
			default:
				return "(Unknown Mahadvadasi)";
		}
	}

	static GetEkadasiName(nMasa, nPaksa) {
		return GCEkadasi_Name[(nMasa * 2 + nPaksa) % 26];
	}

	static GetParanaReasonText(eparana_type) {
		switch (eparana_type) {
			case CoreEventType.CCTYPE_THIRD_OF_DAY:
				return "1/3 of daylight";
			case CoreEventType.CCTYPE_TITHI_QUARTER:
				return "1/4 of tithi";
			case CoreEventType.CCTYPE_S_RISE:
				return "sunrise";
			case CoreEventType.CCTYPE_TITHI_END:
				return "end of tithi";
			case CoreEventType.CCTYPE_NAKS_END:
				return "end of naksatra";
			default:
				break;
		}

		return ""
	}
}

/*************************************************    js/GCEarthData.js **********************************************/
class GCHorizontalCoords
{
	construct() {
		this.azimut = 0.0
		this.elevation = 0.0
	}
};

class GCEquatorialCoords
{
	construct() {
		this.rightAscension = 0.0
		this.declination = 0.0
	}
};

class GCEclipticalCoords
{
	construct() {
		this.latitude = 0.0
		this.longitude = 0.0
		this.distance = 0.0
	}
};

let GCEarthData_arg_mul = [
								[ 0, 0, 0, 0, 1],
								[-2, 0, 0, 2, 2],
								[ 0, 0, 0, 2, 2],
								[ 0, 0, 0, 0, 2],
								[ 0, 1, 0, 0, 0],
								[ 0, 0, 1, 0, 0],
								[-2, 1, 0, 2, 2],
								[ 0, 0, 0, 2, 1],
								[ 0, 0, 1, 2, 2],
								[-2,-1, 0, 2, 2],
								[-2, 0, 1, 0, 0],
								[-2, 0, 0, 2, 1],
								[ 0, 0,-1, 2, 2],
								[ 2, 0, 0, 0, 0],
								[ 0, 0, 1, 0, 1],
								[ 2, 0,-1, 2, 2],
								[ 0, 0,-1, 0, 1],
								[ 0, 0, 1, 2, 1],
								[-2, 0, 2, 0, 0],
								[ 0, 0,-2, 2, 1],
								[ 2, 0, 0, 2, 2],
								[ 0, 0, 2, 2, 2],
								[ 0, 0, 2, 0, 0],
								[-2, 0, 1, 2, 2],
								[ 0, 0, 0, 2, 0],
								[-2, 0, 0, 2, 0],
								[ 0, 0,-1, 2, 1],
								[ 0, 2, 0, 0, 0],
								[ 2, 0,-1, 0, 1],
								[-2, 2, 0, 2, 2],
								[ 0, 1, 0, 0, 1]
							];
let GCEarthData_arg_phi = [
	[-171996,-1742],
	[ -13187,  -16],
	[  -2274,   -2],
	[   2062,    2],
	[   1426,  -34],
	[    712,    1],
	[   -517,   12],
	[   -386,   -4],
	[   -301,    0],
	[    217,   -5],
	[   -158,    0],
	[    129,    1],
	[    123,    0],
	[     63,    0],
	[     63,    1],
	[    -59,    0],
	[    -58,   -1],
	[    -51,    0],
	[     48,    0],
	[     46,    0],
	[    -38,    0],
	[    -31,    0],
	[     29,    0],
	[     29,    0],
	[     26,    0],
	[    -22,    0],
	[     21,    0],
	[     17,   -1],
	[     16,    0],
	[    -16,    1],
	[    -15,    0]
];
let GCEarthData_arg_eps = [
	[ 92025,   89],
	[  5736,  -31],
	[   977,   -5],
	[  -895,    5],
	[    54,   -1],
	[    -7,    0],
	[   224,   -6],
	[   200,    0],
	[   129,   -1],
	[   -95,    3],
	[     0,    0],
	[   -70,    0],
	[   -53,    0],
	[     0,    0],
	[   -33,    0],
	[    26,    0],
	[    32,    0],
	[    27,    0],
	[     0,    0],
	[   -24,    0],
	[    16,    0],
	[    13,    0],
	[     0,    0],
	[   -12,    0],
	[     0,    0],
	[     0,    0],
	[   -10,    0],
	[     0,    0],
	[    -8,    0],
	[     7,    0],
	[     9,    0]
];

var GCEarthData_LowPrecisionNutations = true;

class GCEarthData
{	
	construct() {
		this.p_timezonename = ""
		this.p_timezone = null
		this.longitudeDeg = 0.0
		this.latitudeDeg = 0.0
		// observated event
		// 0 - center of the sun
		// 1 - civil twilight
		// 2 - nautical twilight
		// 3 - astronomical twilight
		this.obs = 0
		
		this.TimeZone = TTimeZone.GetDefaultTimeZone()

	}

	get TimeZoneName() {
		return this.TimeZone.Name;
	}

	set TimeZoneName(value) {
		this.TimeZone = TTimeZone.FindTimeZoneByName(value)
	}

	get TimeZone()
	{
		if (this.p_timezone != null) 
			return this.p_timezone;
		this.p_timezone = TTimeZone.FindTimeZoneByName(this.p_timezonename);
		return this.p_timezone;
	}
	set TimeZone(value)
	{
		this.p_timezone = value;
		this.p_timezonename = (value == null ? "" : this.p_timezone.Name);
	}


	// time zone (hours)
	get OffsetUtcHours()
	{
		if (this.TimeZone == null)
			return 0.0;
		return this.TimeZone.OffsetMinutes / 60.0;
	}

	/// <summary>
	/// This is implementation from Chapter 21, Astronomical Algorithms
	/// Nutation of longitude and Obliquity of ecliptic
	/// </summary>
	/// <param name="julianDateUTC"></param>
	/// <param name="nutationLongitude"></param>
	/// <param name="obliquity"></param>
	static CalculateNutations(julianDateUTC) {
		var t, omega;
		var d, m, ms, f, s, l, ls;
		var i;
		var meanObliquity, nutationObliquity;
		var nutationLongitude;
		var obliguity;

		t = (julianDateUTC - 2451545.0) / 36525;

		// longitude of rising knot
		omega = GCMath.putIn360(125.04452 + (-1934.136261 + (0.0020708 + 1.0 / 450000 * t) * t) * t);

		if (GCEarthData_LowPrecisionNutations)
		{
			// (*@/// delta_phi and delta_epsilon - low accuracy *)
			//(* mean longitude of sun (l) and moon (ls) *)
			l = 280.4665 + 36000.7698 * t;
			ls = 218.3165 + 481267.8813 * t;

			//(* correction due to nutation *)
			nutationObliquity = 9.20 * GCMath.cosDeg(omega) + 0.57 * GCMath.cosDeg(2 * l) + 0.10 * GCMath.cosDeg(2 * ls) - 0.09 * GCMath.cosDeg(2 * omega);

			//(* longitude correction due to nutation *)
			nutationLongitude = (-17.20 * GCMath.sinDeg(omega) - 1.32 * GCMath.sinDeg(2 * l) - 0.23 * GCMath.sinDeg(2 * ls) + 0.21 * GCMath.sinDeg(2 * omega)) / 3600;
		}
		else
		{
			// mean elongation of moon to sun
			d = GCMath.putIn360(297.85036 + (445267.111480 + (-0.0019142 + t / 189474) * t) * t);

			// mean anomaly of the sun
			m = GCMath.putIn360(357.52772 + (35999.050340 + (-0.0001603 - t / 300000) * t) * t);

			// mean anomaly of the moon
			ms = GCMath.putIn360(134.96298 + (477198.867398 + (0.0086972 + t / 56250) * t) * t);

			// argument of the latitude of the moon
			f = GCMath.putIn360(93.27191 + (483202.017538 + (-0.0036825 + t / 327270) * t) * t);

			nutationLongitude = 0;
			nutationObliquity = 0;

			for (i = 0; i < 31; i++)
			{
				s = GCEarthData_arg_mul[i][0] * d
				   + GCEarthData_arg_mul[i][1] * m
				   + GCEarthData_arg_mul[i][2] * ms
				   + GCEarthData_arg_mul[i][3] * f
				   + GCEarthData_arg_mul[i][4] * omega;
				nutationLongitude = nutationLongitude + (GCEarthData_arg_phi[i][0] + GCEarthData_arg_phi[i][1] * t * 0.1) * GCMath.sinDeg(s);
				nutationObliquity = nutationObliquity + (GCEarthData_arg_eps[i][0] + GCEarthData_arg_eps[i][1] * t * 0.1) * GCMath.cosDeg(s);
			}

			nutationLongitude = nutationLongitude * 0.0001 / 3600;
			nutationObliquity = nutationObliquity * 0.0001;
		}
		// angle of ecliptic
		meanObliquity = 84381.448 + (-46.8150 + (-0.00059 + 0.001813 * t) * t) * t;

		obliguity = (meanObliquity + nutationObliquity) / 3600;

		return [nutationLongitude,obliguity]
	}

	// ref GCEclipticalCoords ecc, double date
	static eclipticalToEquatorialCoords(ecc,date)
	{
		//var
		var eqc = new(GCEquatorialCoords)

		var b = GCEarthData.CalculateNutations(date)
		var nutationLongitude = b[0]
		var epsilon = b[1]


		// formula from Chapter 21
		ecc.longitude = GCMath.putIn360(ecc.longitude + nutationLongitude);

		// formulas from Chapter 12
		eqc.rightAscension = GCMath.arcTan2Deg(GCMath.sinDeg(ecc.longitude) * GCMath.cosDeg(epsilon) - GCMath.tanDeg(ecc.latitude) * GCMath.sinDeg(epsilon), 
			GCMath.cosDeg(ecc.longitude));

		eqc.declination = GCMath.arcSinDeg(GCMath.sinDeg(ecc.latitude) * GCMath.cosDeg(epsilon) + GCMath.cosDeg(ecc.latitude) * GCMath.sinDeg(epsilon) * GCMath.sinDeg(ecc.longitude));

		return eqc;
	}

	//GCEquatorialCoords eqc, GCEarthData obs, double date
	static equatorialToHorizontalCoords(eqc, obs, date)
	{
		var hc = new(GCHorizontalCoords)
		var localHourAngle = GCMath.putIn360(GCEarthData.SiderealTimeGreenwich(date) - eqc.rightAscension + obs.longitudeDeg);

		hc.azimut = GCMath.rad2deg( Math.Atan2(GCMath.sinDeg(localHourAngle),
							   GCMath.cosDeg(localHourAngle)*GCMath.sinDeg(obs.latitudeDeg)-
							   GCMath.tanDeg(eqc.declination)*GCMath.cosDeg(obs.latitudeDeg) ));

		hc.elevation = GCMath.rad2deg(Math.Asin(GCMath.sinDeg(obs.latitudeDeg)*GCMath.sinDeg(eqc.declination) +
								GCMath.cosDeg(obs.latitudeDeg)*GCMath.cosDeg(eqc.declination)*GCMath.cosDeg(localHourAngle)));

		return hc;
	}

	// string s, out double val, char poschar, char negchar
	static ToDouble(s, poschar, negchar)
	{
		var i;

		i = s.IndexOf(negchar);
		if (i >= 0)
			return ToDouble2(s, i, -1.0);
		i = s.IndexOf(poschar);
		if (i >= 0)
			return ToDouble2(s, i, 1.0);

		return [false, 0.0];
	}

	static ToDouble2( s,  i, sig)
	{
		var a = ParseInt(s.substr(0,i))
		var b = ParseInt(s.substr(i+1))
		var val = sig * (a * 60.0 + b * 1.0) / 60.0;
		return true,val;
	}
	
	static GetTextLatitude( d)
	{
		var c0 = d < 0.0 ? 'S' : 'N';
		d = Math.abs(d);
		var a0 = GCMath.IntFloor(d);
		var a1 = GCMath.IntFloor((d - a0) * 60 + 0.5);

		return a0.toString() + c0 + Convert.FormatD2(a1)
	}

	static GetTextLongitude( d)
	{
		var a0, a1;
		var c0;

		c0 = d < 0.0 ? 'W' : 'E';
		d = Math.abs(d);
		a0 = GCMath.IntFloor(d);
		a1 = GCMath.IntFloor((d - a0) * 60 + 0.5);

		return a0.toString() + c0 + Convert.FormatD2(a1)
	}

	static SiderealTimeGreenwich(date)
	{
		var jd, t;
		var delta_phi = 0.0, epsilon = 0.0;

		jd = date;
		t = (jd - 2451545.0) / 36525.0;
		var [delta_phi, epsilon] = GCEarthData.CalculateNutations(date);
		return GCMath.putIn360(280.46061837 + 360.98564736629 * (jd - 2451545.0) +
						 t * t * (0.000387933 - t / 38710000) +
						 delta_phi * GCMath.cosDeg(epsilon));
	}

	/// <summary>
	/// 
	/// </summary>
	/// <param name="julianDateUTC">Time in UT1 or for general use UTC. This should reflect also hours, minutes and seconds. When finding local sidereal time, 
	/// this argument should contains time that is observed on Greenwich meridian. Use function GetJulianDetailed or GetGreenwichDateTime</param>
	/// <param name="longitudeDegrees"></param>
	/// <returns></returns>
	static SiderealTimeLocal(julianDateUTC, longitudeDegrees, timezoneDegrees)
	{
		var julianDate2000, julianMillenium;
		var delta_phi = 0.0, epsilon = 0.0;

		julianDate2000 = julianDateUTC - 2451545.0;
		julianMillenium = julianDate2000 / 36525.0;
		var [delta_phi, epsilon] = GCEarthData.CalculateNutations(date)
		return GCMath.putIn360(280.46061837 + 360.98564736629 * julianDate2000 +
						 julianMillenium * julianMillenium * (0.000387933 - julianMillenium / 38710000) +
						 delta_phi * GCMath.cosDeg(epsilon) + longitudeDegrees - timezoneDegrees);
	}

	/// <summary>
	/// 
	/// </summary>
	/// <param name="julianDateUTC">This contains time UTC, that means time observed on Greenwich meridian. DateTime in other
	/// timezones should be converted into timezone UTC+0h before using in this method.</param>
	/// <returns></returns>
	GetAscendantDegrees(julianDateUTC)
	{
		var A = GCEarthData.SiderealTimeLocal(julianDateUTC, longitudeDeg, OffsetUtcHours*15.0);
		var E = 23.4392911;
		var ascendant = GCMath.arcTan2Deg(-GCMath.cosDeg(A), GCMath.sinDeg(A)*GCMath.cosDeg(E) + GCMath.tanDeg(latitudeDeg)*GCMath.sinDeg(E));
		if (ascendant < 180)
			ascendant += 180;
		else
			ascendant -= 180;
		return GCMath.putIn360(ascendant  - GCAyanamsha.GetAyanamsa(julianDateUTC));
	}

	// GregorianDateTime startDate, out GregorianDateTime nextDate
	GetNextAscendentStart(startDate)
	{
		var countOfElements = 12;
		var phi = 360.0 / countOfElements;
		var l1, l2;
		var jday = startDate.GetJulianDetailed();
		var xj;
		var d = new GregorianDateTime();
		d.Set(startDate)
		// we are calculating in UTC timezone
		d.shour -= startDate.TimezoneHours / 24.0;
		d.TimezoneHours = 0.0;
		var xd = new GregorianDateTime();
		var scan_step = 1.0 / 48.0;
		var prev_tit = 0;
		var new_tit = -1;

		l1 = this.GetAscendantDegrees(jday);

		prev_tit = Convert.ToInt32(Math.floor(l1 / phi));
		//Debugger.Log(0, "", "=== FROM " + startDate.LongTimeString() + " ===\n");
		//Debugger.Log(0, "", GCStrings.Format("{0:00}: {1} {2}     {3} {4} \n", 99, l1, prev_tit, jday, d.LongTimeString()));
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

			l2 = GetAscendantDegrees(jday);
			new_tit = Convert.ToInt32(Math.floor(l2 / phi));
			//Debugger.Log(0, "", GCStrings.Format("{0:00}: {1} {2}     {3} {4} \n", counter, l1, prev_tit, jday, d.LongTimeString()));

			if (prev_tit != new_tit)
			{
				jday = xj;
				d.Set(xd);
				scan_step *= 0.5;
				counter++;
				//Debugger.Log(0, "", GCStrings.Format("   Going back to {0}\n", d.LongTimeString()));
				continue;
			}
			else
			{
				l1 = l2;
			}
		}
		// date D was calculated in timezone UTC+0h, therefore
		// we have to convert it into timezone of input datetime
		var nextDate = new GregorianDateTime();
		nextDate.Set(d)
		nextDate.shour += startDate.TimezoneHours / 24.0;
		nextDate.TimezoneHours = startDate.TimezoneHours;
		nextDate.NormalizeValues();

		return new_tit, nextDate;
	}

	toString() {
		return "Latitude: " + GCEarthData.GetTextLatitude(this.latitudeDeg)
			+ ", Longitude: " + GCEarthData.GetTextLongitude(this.longitudeDeg)
			+ ", Timezone: " + TTimeZone.GetTimeZoneOffsetText(this.OffsetUtcHours)

	}

}

/*************************************************    js/GCStrings.js **********************************************/
let GCStrings_childsylable = [
		    "chu", "che", "cho", "la", //asvini
		    "li", "lu", "le", "lo", // bharani
		    "a", "i", "u", "e", //krtika
		    "o", "va", "vi", "vo", // rohini
		    "ve", "vo", "ka", "ke", // mrgasira
		    "ku","gha","ng","chha", // ardra
		    "ke","ko","ha","hi", // punarvasu
		    "hu","he","ho","da", // pushya
		    "di","du","de","do", //aslesa
		    "ma","mi","mu","me", //magha
		    "mo","ta","ti","tu", //purvaphalguni
		    "te","to","pa","pi", //uttaraphalguni
		    "pu","sha","na","tha",//hasta
		    "pe","po","ra","ri",//chitra
		    "ru","re","ra","ta",//svati
		    "ti","tu","te","to",//visakha
		    "na","ni","nu","ne",// anuradha
		    "no","ya","yi","yu",//jyestha
		    "ye","yo","ba","bi",// mula
		    "bu","dha","bha","dha",//purvasada
		    "be","bo","ja","ji",// uttarasada
		    "ju","je","jo","gha",//sravana
		    "ga","gi","gu","ge",// dhanistha
		    "go","sa","si","su",//satabhisda
		    "se","so","da","di",//purvabhadra
		    "du","tha","jna","da",//uttarabhadra
		    "de","do","cha","chi"// revati

	    ]

let GCStrings_gstr = {
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday",
		7: "Date",
		8: "Time",
		9: "Location",
		10: "Latitude",
		11: "Longitude",
		12: "Timezone",
		13: "Tithi",
		14: "Tithi Elaps.",
		15: "Naksatra",
		16: "Naksatra Elaps.",
		17: "Child Name",
		18: "(according naksatra)",
		19: "(according rasi)",
		20: "Paksa",
		21: "(during Purusottama Adhika Masa)",
		22: "Masa",
		23: "Gaurabda Year",
		24: "Celebrations",
		25: "Appearance Day Calculation",
		26: "Day can be only from 1 to 31",
		27: "Month can be only from 1 to 12",
		28: "Year can be only from 1500 to 3999",
		29: "Given date was corrected, since date given by you was nonexisting.",
		30: "days",
		31: "months",
		32: "years",
		33: "exactly given date",
		34: "from begining of the month",
		35: "align to the start of the Masa",
		36: "from begining of the year",
		37: "start from first day of the Gaurabda Year",
		38: "<all mahadvadasis>",
		39: "Masa Listing",
		40: "Location",
		41: "From",
		42: "To",
		43: "Today",
		44: " Calendar",
		45: " Appearance Day",
		46: " Core Events",
		48: " Masa List",
		50: "Could not create new window.",
		51: "Sunrise",
		52: "Sunset",
		53: "Moonrise",
		54: "Moonset",
		55: "Year",
		56: "Sankranti",
		57: "Please update GCAL to the latest version from http://www.krishnadays.com",
		58: "(not suitable for fasting)",
		59: "(suitable for fasting)",
		60: "Break fast",
		61: "Break fast after",
		62: "Break fast not calculated",
		63: "(DST not considered)",
		65: "Jan",
		66: "Feb",
		67: "Mar",
		68: "Apr",
		69: "May",
		70: "Jun",
		71: "Jul",
		72: "Aug",
		73: "Sep",
		74: "Oct",
		75: "Nov",
		76: "Dec",
		78: "Ganga Sagara Mela",
		79: "Tulasi Jala Dan begins.",
		80: "Tulasi Jala Dan ends.",
		81: "First day of Bhisma Pancaka",
		82: "Last day of Bhisma Pancaka",
		83: "Looking for",
		84: "Start",
		85: "End",
		86: "Not found in this year.",
		87: "Fasting for",
		88: "(Fasting is done yesterday, today is feast)",
		89: "Ksaya tithi",
		90: "[Second day of Tithi]",
		91: "First day",
		92: "Last day",
		93: "of the first month",
		94: "of the second month",
		95: "of the third month",
		96: "of the fourth month",
		97: "of Caturmasya-vrata",
		98: "Arunodaya Tithi",
		99: "Arunodaya at",
		100: "Sun Longitude",
		101: "Moon Longitude",
		102: "Ayanamsa",
		103: "Julian day",
		104: "Yoga",
		105: "Rasi",
		106: "(Daylight Saving Time not considered)",
		107: "(Winter Time)",
		108: "(Summer Time)",
		109: "(Second half)",
		110: "Event Finder",
		111: "Sun enters",
		112: "First month of Caturmasya begins",
		113: "Last day of the first Caturmasya month",
		114: "(green leafy vegetable fast for one month)",
		115: "First month of Caturmasya continues",
		116: "Second month of Caturmasya begins",
		117: "Last day of the second Caturmasya month",
		118: "(yogurt fast for one month)",
		119: "Second month of Caturmasya continues",
		120: "Third month of Caturmasya begins",
		121: "Last day of the third Caturmasya month",
		122: "(milk fast for one month)",
		123: "Third month of Caturmasya continues",
		124: "Fourth month of Caturmasya begins",
		125: "Last day of the fourth Caturmasya month",
		126: "(urad dal fast for one month)",
		127: "Fourth month of Caturmasya continues",
		128: "(Caturmasya is not observed during Purusottama Adhika Masa.)",
		129: "12.0",
		130: "GCal 12.0",
		131: "Gaurabda Calendar 12.0",
		132: "<all sankrantis>",
		133: "<all tithis>",
		134: "<all fasting days>",
		135: "(Fasting for Ekadasi)",
		136: "No Moonrise",
		137: "No Moonset",
		138: "No Sunrise",
		139: "No Sunset",
		140: "SUN - MOON CONJUNCTIONS",
		150: "Su",
		151: "Mo",
		152: "Tu",
		153: "We",
		154: "Th",
		155: "Fr",
		156: "Sa",
		157: "DATE",
		158: "SUNRISE",
		159: "MASA",
		160: "TITHI START",
		161: "NAKSATRA START",
		162: "Page",
		165: "1/3 of daylight",
		166: "1/4 of tithi",
		167: "end of tithi",
		168: "end of naksatra",
		169: "sunrise",
		512: "",
		513: "",
		514: "",
		560: "Varuthini Ekadasi",
		561: "Mohini Ekadasi",
		562: "Apara Ekadasi",
		563: "Pandava Nirjala Ekadasi",
		564: "Yogini Ekadasi",
		565: "Sayana Ekadasi",
		566: "Kamika Ekadasi",
		567: "Pavitraropana Ekadasi",
		568: "Annada Ekadasi",
		569: "Parsva Ekadasi",
		570: "Indira Ekadasi",
		571: "Pasankusa Ekadasi",
		572: "Rama Ekadasi",
		573: "Utthana Ekadasi",
		574: "Utpanna Ekadasi",
		575: "Moksada Ekadasi",
		576: "Saphala Ekadasi",
		577: "Putrada Ekadasi",
		578: "Sat-tila Ekadasi",
		579: "Bhaimi Ekadasi",
		580: "Vijaya Ekadasi",
		581: "Amalaki vrata Ekadasi",
		582: "Papamocani Ekadasi",
		583: "Kamada Ekadasi",
		584: "Parama Ekadasi",
		585: "Padmini Ekadasi",
		600: "Pratipat",
		601: "Dvitiya",
		602: "Tritiya",
		603: "Caturthi",
		604: "Pancami",
		605: "Sasti",
		606: "Saptami",
		607: "Astami",
		608: "Navami",
		609: "Dasami",
		610: "Ekadasi",
		611: "Dvadasi",
		612: "Trayodasi",
		613: "Caturdasi",
		614: "Amavasya",
		615: "Pratipat",
		616: "Dvitiya",
		617: "Tritiya",
		618: "Caturthi",
		619: "Pancami",
		620: "Sasti",
		621: "Saptami",
		622: "Astami",
		623: "Navami",
		624: "Dasami",
		625: "Ekadasi",
		626: "Dvadasi",
		627: "Trayodasi",
		628: "Caturdasi",
		629: "Purnima",
		630: "Asvini",
		631: "Bharani",
		632: "Krittika",
		633: "Rohini",
		634: "Mrigasira",
		635: "Ardra",
		636: "Punarvasu",
		637: "Pusyami",
		638: "Aslesa",
		639: "Magha",
		640: "Purva-phalguni",
		641: "Uttara-phalguni",
		642: "Hasta",
		643: "Citra",
		644: "Swati",
		645: "Visakha",
		646: "Anuradha",
		647: "Jyestha",
		648: "Mula",
		649: "Purva-asadha",
		650: "Uttara-asadha",
		651: "Sravana",
		652: "Dhanista",
		653: "Satabhisa",
		654: "Purva-bhadra",
		655: "Uttara-bhadra",
		656: "Revati",
		660: "Viskumba",
		661: "Priti",
		662: "Ayusmana",
		663: "Saubhagya",
		664: "Sobana",
		665: "Atiganda",
		666: "Sukarma",
		667: "Dhriti",
		668: "Sula",
		669: "Ganda",
		670: "Vriddhi",
		671: "Dhruva",
		672: "Vyagata",
		673: "Harsana",
		674: "Vajra",
		675: "Siddhi",
		676: "Vyatipata",
		677: "Variyana",
		678: "Parigha",
		679: "Siva",
		680: "Siddha",
		681: "Sadhya",
		682: "Subha",
		683: "Sukla",
		684: "Brahma",
		685: "Indra",
		686: "Vaidhriti",
		688: "Mesa",
		689: "Vrsabha",
		690: "Mithuna",
		691: "Karka",
		692: "Simha",
		693: "Kanya",
		694: "Tula",
		695: "Vrscika",
		696: "Dhanus",
		697: "Makara",
		698: "Kumbha",
		699: "Mina",
		700: "Aries",
		701: "Taurus",
		702: "Gemini",
		703: "Cancer",
		704: "Leo",
		705: "Virgo",
		706: "Libra",
		707: "Scorpio",
		708: "Sagittarius",
		709: "Capricorn",
		710: "Aquarius",
		711: "Pisces",
		712: "Gaura",
		713: "Krsna",
		720: "Madhusudana",
		721: "Trivikrama",
		722: "Vamana",
		723: "Sridhara",
		724: "Hrsikesa",
		725: "Padmanabha",
		726: "Damodara",
		727: "Kesava",
		728: "Narayana",
		729: "Madhava",
		730: "Govinda",
		731: "Visnu",
		732: "Purusottama-adhika",
		733: "Unmilani Mahadvadasi",
		734: "Trisprsa Mahadvadasi",
		735: "Paksa vardhini Mahadvadasi",
		736: "Jaya Mahadvadasi",
		737: "Vijaya Mahadvadasi",
		738: "Papa Nasini Mahadvadasi",
		739: "Jayanti Mahadvadasi",
		740: "Vyanjuli Mahadvadasi",
		741: "Sri Krsna Janmastami: Appearance of Lord Sri Krsna",
		742: "Gaura Purnima: Appearance of Sri Caitanya Mahaprabhu",
		743: "Return Ratha (8 days after Ratha Yatra)",
		744: "Hera Pancami (4 days after Ratha Yatra)",
		745: "Gundica Marjana",
		746: "Go Puja. Go Krda. Govardhana Puja.",
		747: "Rama Navami: Appearance of Lord Sri Ramacandra",
		748: "Ratha Yatra",
		749: "Nandotsava",
		750: "Festival of Jagannatha Misra",
		751: "(Fast till noon)",
		752: "(Fast till sunset)",
		753: "(Fast till moonrise)",
		754: "(Fast till dusk)",
		755: "(Fast till midnight)",
		756: "(Fast today)",
		759: "Srila Prabhupada -- Appearance",
		760: "January",
		761: "February",
		762: "March",
		763: "April",
		764: "May",
		765: "June",
		766: "July",
		767: "August",
		768: "September",
		769: "October",
		770: "November",
		771: "December",
		780: "First day of",
		781: "Last day of",
		782: "first",
		783: "second",
		784: "third",
		785: "fourth",
		786: "last",
		787: "Sunday",
		788: "Monday",
		789: "Tuesday",
		790: "Wednesday",
		791: "Thursday",
		792: "Friday",
		793: "Saturday",
		795: "of January",
		796: "of February",
		797: "of March",
		798: "of April",
		799: "of May",
		800: "of June",
		801: "of July",
		802: "of August",
		803: "of September",
		804: "of October",
		805: "of November",
		806: "of December",
		807: "For this location is Daylight Saving Time not observed.",
		808: "Daylight saving time is observed ",
		810: "0th",
		811: "1st",
		812: "2nd",
		813: "3rd",
		814: "4th",
		815: "5th",
		816: "6th",
		817: "7th",
		818: "8th",
		819: "9th",
		820: "10th",
		821: "11th",
		822: "12th",
		823: "13th",
		824: "14th",
		825: "15th",
		826: "16th",
		827: "17th",
		828: "18th",
		829: "19th",
		830: "20th",
		831: "21st",
		832: "22nd",
		833: "23rd",
		834: "24th",
		835: "25th",
		836: "26th",
		837: "27th",
		838: "28th",
		839: "29th",
		840: "30th",
		841: "31st",
		850: "since",
		851: "to",
		852: "on",
		853: "Yesterday",
		854: "Tomorrow",
		855: "First day of Daylight Saving Time",
		856: "Last day of Daylight Saving Time",
		857: "Noon",
		860: "(Fasting is done yesterday)",
		861: "(Fasting is done yesterday, today is feast)",
		862: "(Fasting till noon, with feast tomorrow)",
		871: "Vaisakha",
		872: "Jyestha",
		873: "Asadha",
		874: "Sravana",
		875: "Bhadra",
		876: "Asvina",
		877: "Kartika",
		878: "Margasirsa",
		879: "Pausa",
		880: "Magha",
		881: "Phalguna",
		882: "Caitra",
		883: "Purusottama-adhika",
		884: "Vaisakha (Madhusudana)",
		885: "Jyestha (Trivikrama)",
		886: "Asadha (Vamana)",
		887: "Sravana (Sridhara)",
		888: "Bhadra (Hrsikesa)",
		889: "Asvina (Padmanabha)",
		890: "Kartika (Damodara)",
		891: "Margasirsa (Kesava)",
		892: "Pausa (Narayana)",
		893: "Magha (Madhava)",
		894: "Phalguna (Govinda)",
		895: "Caitra (Visnu)",
		896: "Purusottama-adhika",
		897: "Madhusudana (Vaisakha)",
		898: "Trivikrama (Jyestha)",
		899: "Vamana (Asadha)",
		900: "Sridhara (Sravana)",
		901: "Hrsikesa (Bhadra)",
		902: "Padmanabha (Asvina)",
		903: "Damodara (Kartika)",
		904: "Kesava (Margasirsa)",
		905: "Narayana (Pausa)",
		906: "Madhava (Magha)",
		907: "Govinda (Phalguna)",
		908: "Visnu (Caitra)",
		909: "Purusottama-adhika",
	}

let GCStrings_childsylableRasi = [
		    "a.. e.. la..",
		    "u.. ba.. va..",
		    "ka.. gha..",
		    "da.. ha..",
		    "ma..",
		    "pa..",
		    "ra.. ta..",
		    "na.. ya..",
		    "dha.. bha... pha..",
		    "kha.. ja..",
		    "ga.. sa.. sha..",
		    "da.. ca.. tha.. jha.."
	    ]


let GCStrings_muhurtaName = [
            "Rudra",
            "Ahi",
            "Mitra",
            "Pitri",
            "Vasu",
            "Varaha",
            "Visvedeva",
            "Vidhi",
            "Sutamukhi",
            "Puruhuta",
            "Vahini",
            "Naktanakara",
            "Varuna",
            "Aryaman",
            "Bhaga",
            "Girisha",
            "Ajapada",
            "Ahir-Budhnya",
            "Pusya",
            "Asvini",
            "Yama",
            "Agni",
            "Vidhatri",
            "Kanda",
            "Aditi",
            "Jiva/Amrta",
            "Visnu",
            "Dyumadgadyuti",
            "Brahma",
            "Samudram"
        ]

let GCStrings_planetsNamesEn = [
            "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Ascendent"
        ]

let GCStrings_planetsNames = [
            "Surya", "Chandra", "Mangala", "Buddha", "Guru", "Sukra", "Sani", "Rahu", "Ketu", "Lagna"
        ]

class GCStrings {

    static RawVersionNumber() {
		return "12"
	}

    static FullVersionText() {
		return "Gaurabda Calendar 12"
	}

	static ShortVersionText() {
		return "GCAL 12"
	}

	static GetNaksatraChildSylable(n, pada)
	{
		var i = (n * 4 + pada) % 108;


		return GCStrings_childsylable[i];
	}

	static GetRasiChildSylable(n)
	{
		return GCStrings_childsylableRasi[n % 12];
	}

	static Localized(s) {
		return s;
	}

	static GetStringFromIntInc(i)
	{
		return (i + 1).toString();
	}

	static GetDayPartName(i)
	{
		if (i == 0) return "Day";
		else return "Night";
	}

	static GetMoonTimesName(i)
	{
		if (i == 0) return "Moonrise";
		else return "Moonset";
	}

	static GetKalaName(i) {
		switch (i)
		{
			case KalaType.KT_RAHU_KALAM:
				return Localized("Rahu kalam");
			case KalaType.KT_YAMA_GHANTI:
				return Localized("Yama ghanti");
			case KalaType.KT_GULI_KALAM:
				return Localized("Guli kalam");
			case KalaType.KT_ABHIJIT:
				return Localized("Abhijit muhurta");
			case KalaType.KT_SANDHYA_MIDNIGHT:
				return Localized("Midnight sandhya");
			case KalaType.KT_SANDHYA_NOON:
				return Localized("Noon sandhya");
			case KalaType.KT_SANDHYA_SUNRISE:
				return Localized("Sunrise sandhya");
			case KalaType.KT_SANDHYA_SUNSET:
				return Localized("Sunset sandhya");
			default:
				return Localized("Special interval");
		}
	}

	static getLongitudeDirectionName(d)
	{
		if (d < 0.0)
			return Localized("West");

		return Localized("East");
	}

	static getLatitudeDirectionName(d)
	{
		if (d < 0.0)
			return Localized("South");

		return Localized("North");
	}

	static getCount()
	{
		return GCStrings_gstr.length;
	}

	static GetMuhurtaName(i)
	{
		return GCStrings_muhurtaName[i % 30];
	}

	static GetSandhyaName(i)
	{
		switch (i)
		{
			case 0:
				return Localized("Sunrise");
			case 1:
				return Localized("Noon");
			case 2:
				return Localized("Sunset");
			case 3:
				return Localized("Midnight");
			default:
				return "";
		}
	}

	static GetPlanetNameEn(i)
	{
		return GCStrings_planetsNamesEn[i % 12];
	}

	static GetPlanetName(i)
	{
		return GCStrings_planetsNames[i % 12];
	}

	static GetFastingName(fastingID)
	{
		if (fastingID in FastTypeText) {
			return FastTypeText[fastingID];
		}
		return "";
	}

	static getString(i)
	{
		if (i < 0 || i >= GCStrings_gstr.length)
			return "";

		return GCStrings_gstr[i];
	}

	static GetDSTSignature(nDST)
	{
		return (nDST != 0) ? GCStrings.Localized("DST") : GCStrings.Localized("LT");
	}

	static setString(i,str)
	{
		GCStrings_gstr[i] = str;
	}

	static GetSpecFestivalName(i) {
		switch (i)
		{
			case SpecialFestivalId.SPEC_JANMASTAMI:
				return Localized("Sri Krsna Janmastami: Appearance of Lord Sri Krsna");
			case SpecialFestivalId.SPEC_GAURAPURNIMA:
				return Localized("Gaura Purnima: Appearance of Sri Caitanya Mahaprabhu");
			case SpecialFestivalId.SPEC_RETURNRATHA:
				return Localized("Return Ratha (8 days after Ratha Yatra)");
			case SpecialFestivalId.SPEC_HERAPANCAMI:
				return Localized("Hera Pancami (4 days after Ratha Yatra)");
			case SpecialFestivalId.SPEC_GUNDICAMARJANA:
				return Localized("Gundica Marjana");
			case SpecialFestivalId.SPEC_GOVARDHANPUJA:
				return Localized("Go Puja. Go Krda. Govardhana Puja");
			case SpecialFestivalId.SPEC_RAMANAVAMI:
				return Localized("Rama Navami: Appearance of Lord Sri Ramacandra");
			case SpecialFestivalId.SPEC_RATHAYATRA:
				return Localized("Ratha Yatra");
			case SpecialFestivalId.SPEC_NANDAUTSAVA:
				return Localized("Nandotsava");
			case SpecialFestivalId.SPEC_PRABHAPP:
				return Localized("Srila Prabhupada -- Appearance");
			case SpecialFestivalId.SPEC_MISRAFESTIVAL:
				return Localized("Festival of Jagannatha Misra");
			default:
				return "";
		}
	}

	static Format(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function(match, number) { 
		  return typeof args[number] != 'undefined'
			? args[number] 
			: match
		  ;
		});
	}
}

/*************************************************    js/TTimeZone.js **********************************************/


var TimeZoneList = []
var TimeZoneList_Modified = false
var TTimeZone_Default = null

class TTimeZone {
	constructor(data) {
		this.Valid = true
		this.Name = ""
		this.OffsetMinutes = 0
		this.BiasMinutes = 0
		this.StartDst = new TTimeZoneDst()
		this.EndDst = new TTimeZoneDst()
		this.CountryISOCode = ""
		if (data != undefined) {
			if (data.length != 12) {
				console.log('data is not correct for timezone creation: ', data)
			} else {
				this.Name = data[0];
				this.OffsetMinutes = data[1];
				this.BiasMinutes = data[2];
				this.StartDst.Type = data[3];
				this.StartDst.Month = data[4];
				this.StartDst.Week = data[5];
				this.StartDst.Day = data[6];
				this.EndDst.Type = data[7];
				this.EndDst.Month = data[8];
				this.EndDst.Week = data[9];
				this.EndDst.Day = data[10];
				this.TimezoneId = data[11];
			}
		}
	}

	/*public static List<TTimeZone> TimeZoneList = new List<TTimeZone>();
	public static bool Modified = false;
	private static TTimeZone p_defaultTimezone = null;*/


	toString() {
		return TTimeZone.GetTimeZoneOffsetText(this.OffsetMinutes/60.0) + " " + this.Name
	}

	GetDaylightTimeStartDate(nYear, vcStart) {
		vcStart.day = 1;
		vcStart.month = Convert.ToInt32(StartDst.Month);
		vcStart.year = nYear;
		if (this.StartDst.Type == 1)
		{
			vcStart.day = this.StartDst.Day;
		}
		else
		{
			if (this.StartDst.Month == 5)
			{
				vcStart.day = GregorianDateTime.GetMonthMaxDays(nYear, this.StartDst.Month);
				vcStart.InitWeekDay();
				while (vcStart.dayOfWeek != this.StartDst.Day)
				{
					vcStart.PreviousDay();
					vcStart.dayOfWeek = (vcStart.dayOfWeek + 6) % 7;
				}
			}
			else
			{
				vcStart.day = 1;
				vcStart.InitWeekDay();
				while (vcStart.dayOfWeek != this.StartDst.Day)
				{
					vcStart.NextDay();
					vcStart.dayOfWeek = (vcStart.dayOfWeek + 1) % 7;
				}
				vcStart.day += this.StartDst.Week * 7;
			}
		}
		vcStart.shour = 1 / 24.0;
		return 0;
	}

	GetNormalTimeStartDate(nYear,vcStart)
	{
		vcStart.day = 1;
		vcStart.month = 10;
		vcStart.year = nYear;
		vcStart.shour = 3 / 24.0;
		return 0;
	}

	get TimeZoneOffsetText() {
		return TTimeZone.GetTimeZoneOffsetText(this.OffsetMinutes/60);
	}

	static GetTimeZoneOffsetText(d)
	{
		var a4, a5;
		var sig;

		if (d < 0.0)
		{
			sig = -1;
			d = -d;
		}
		else
		{
			sig = 1;
		}
		a4 = GCMath.IntFloor(d);
		a5 = Convert.ToInt32((d - a4) * 60);

		return  (sig > 0 ? "+" : "-") + a4 + ":" +  Convert.FormatD2(a5)
	}

	static GetTimeZoneOffsetTextArg(d)
	{
		var a4, a5;
		var sig;

		if (d < 0.0)
		{
			sig = -1;
			d = -d;
		}
		else
		{
			sig = 1;
		}
		a4 = Convert.ToInt32(d);
		a5 = Convert.ToInt32((d - a4) * 60 + 0.5);

		return a4.toString() + (sig > 0 ? 'E' : 'W') + Convert.FormatD2(a5)
	}


	// return values
	// 0 - DST is off, yesterday was off
	// 1 - DST is on, yesterday was off
	// 2 - DST is on, yesterday was on
	// 3 - DST is off, yesterday was on
	//public DstTypeChange DetermineDaylightChange(GregorianDateTime vc2)
	DetermineDaylightChange(vc2) {
		var t2 = this.GetBiasMinutesForDay(vc2);
		var vc3 = new GregorianDateTime();
		vc3.Set(vc2);
		vc3.PreviousDay();
		var t1 = this.GetBiasMinutesForDay(vc3);
		if (t1 != 0)
		{
			if (t2 != 0)
				return DstTypeChange.DstOn;
			else
				return DstTypeChange.DstEnd;
		}
		else if (t2 != 0)
		{
			return DstTypeChange.DstStart;
		}
		else
			return DstTypeChange.DstOff;
	}

	// <summary>
	// 
	// </summary>
	// <param name="vc"></param>
	// <returns>returns 1 if given date has bias</returns>
	GetBiasMinutesForDay(vc) {
		var biasExists = this.BiasMinutes;
		var biasZero = 0;

		if (vc.month == this.StartDst.Month)
		{
			if (this.StartDst.Type == 0)
				return vc.IsEqualOrAfterWeekdayInWeek(this.StartDst.Week, this.StartDst.Day) ? biasExists : biasZero;
			else
				return (vc.day >= this.StartDst.Day) ? biasExists : biasZero;
		}
		else if (vc.month == this.EndDst.Month)
		{
			if (this.EndDst.Type == 0)
				return vc.IsEqualOrAfterWeekdayInWeek(this.EndDst.Week, this.EndDst.Day) ? biasZero : biasExists;
			else
				return (vc.day >= this.EndDst.Day) ? biasZero : biasExists;
		}
		else if (this.StartDst.Month > this.EndDst.Month)
		{
			// zaciatocny mesiac ma vyssie cislo nez koncovy
			// napr. pre australiu
			if ((vc.month > this.StartDst.Month) || (vc.month < this.EndDst.Month))
				return biasExists;
		}
		else
		{
			// zaciatocny mesiac ma nizsie cislo nez koncovy
			// usa, europa, asia
			if ((vc.month > this.StartDst.Month) && (vc.month < this.EndDst.Month))
				return biasExists;
		}

		return biasZero;
	}


	HumanDstText() {
		var ret;

		if (this.BiasMinutes == 0)
		{
			ret = "For this location is Daylight Saving Time not observed."
		}
		else
		{
			ret = ""
			// pre datumovy den
			if (this.StartDst.Type == 1)
			{

				ret += "from " + GCStrings.getString(810 + this.StartDst.Day)
				 + " " + GCStrings.getString(794 + this.StartDst.Month) + " "
			}
			else
			{
				// pre tyzdenny den
				ret += "from "+GCStrings.getString(781 + this.StartDst.Week) + " "
					+ GCStrings.getString(787 + this.StartDst.Day) + " "
					+ GCStrings.getString(794 + this.StartDst.Month) + " "
			}

			if (EndDst.Type == 1)
			{
				ret += "to " + GCStrings.getString(810 + this.EndDst.Day) + " " 
					+ GCStrings.getString(794 + this.EndDst.Month)
			}
			else
			{
				// pre tyzdenny den
				ret += "to " + GCStrings.getString(781 + EndDst.Week) + " "
					+ GCStrings.getString(787 + EndDst.Day) + " " 
					+ GCStrings.getString(794 + EndDst.Month)
			}
		}

		return ret;
	}

	static FindTimeZoneById(tzid) {
		for (var i of TimeZoneList) {
			if (i[11] == tzid) {
				return new TTimeZone(i);
			}
		}

		return this.GetDefaultTimeZone();
	}

	static FindTimeZoneByName(p_timezonename) {
		for (var i of TimeZoneList) {
			if (i[0] == p_timezonename) {
				return new TTimeZone(i);
			}
		}

		return this.GetDefaultTimeZone();
	}

	static GetDefaultTimeZone()
	{
		if (TTimeZone_Default == null)
		{
			TTimeZone_Default = new TTimeZone();
			TTimeZone_Default.Name = "Undefined";
		}
		return TTimeZone_Default;
	}
}


// <summary>
// Structure for storing data about start or end of daylight saving time system
// </summary>
class TTimeZoneDst {
	// <summary>
	// type of day, 0-day is given as n-th x-day of month, 1- day is given as DATE
	// </summary>
	//public int Type;
	// <summary>
	// Used only for StartDstType = 0, this is 
	// number of week in which day occurs (1,2,3,4 is acceptable, 5 means *last*)
	// </summary>
	//p ublic int Week;
	// <summary>
	// Month: 1,2..12
	// </summary>
	//public int Month;
	// <summary>
	// For StartDstType = 0 : 0 - sunday, 1 - monday, ... 6 - saturday
	// For StartDstType = 1 : 1..31
	// </summary>
	//public int Day;

	constructor()
	{
		this.Type = 0;
		this.Week = 0;
		this.Month = 0;
		this.Day = 0;
	}

	get IntegerValue()
	{
		return (this.Type << 24) + (this.Week << 16) + (this.Month << 8) + this.Day;
	}

	Clear() {
		this.Type = 0;
		this.Week = 0;
		this.Month = 0;
		this.Day = 0;
	}
}

TimeZoneList = [
	["UTC-12", -720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 399],
	["UTC-11", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 400],
	["Pacific/Apia", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 393],
	["Pacific/Midway", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 353],
	["Pacific/Niue", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 270],
	["Pacific/Pago_Pago", -660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30],
	["UTC-10", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 401],
	["America/Adak", -600, 60, 0, 3, 2, 0, 0, 11, 1, 0, 380],
	["Pacific/Fakaofo", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 337],
	["Pacific/Honolulu", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 381],
	["Pacific/Johnston", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 352],
	["Pacific/Rarotonga", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114],
	["Pacific/Tahiti", -600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 276],
	["UTC-09:30", -570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 402],
	["Pacific/Marquesas", -570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277],
	["UTC-09", -540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 403],
	["America/Anchorage", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 376],
	["America/Juneau", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 377],
	["America/Nome", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 379],
	["America/Yakutat", -540, 60, 0, 3, 2, 0, 0, 11, 1, 0, 378],
	["Pacific/Gambier", -540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 278],
	["UTC-08", -480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 404],
	["America/Dawson", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 106],
	["America/Los_Angeles", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 375],
	["America/Tijuana", -480, 60, 0, 4, 1, 0, 0, 10, 5, 0, 256],
	["America/Vancouver", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 104],
	["America/Whitehorse", -480, 60, 0, 3, 2, 0, 0, 11, 1, 0, 105],
	["Pacific/Pitcairn", -480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 284],
	["UTC-07", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 405],
	["America/Boise", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 372],
	["America/Cambridge_Bay", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 100],
	["America/Chihuahua", -420, 60, 0, 4, 1, 0, 0, 10, 5, 0, 254],
	["America/Dawson_Creek", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 103],
	["America/Denver", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 371],
	["America/Edmonton", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 99],
	["America/Hermosillo", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
	["America/Inuvik", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 102],
	["America/Mazatlan", -420, 60, 0, 4, 1, 0, 0, 10, 5, 0, 253],
	["America/Phoenix", -420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 374],
	["America/Shiprock", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 373],
	["America/Yellowknife", -420, 60, 0, 3, 2, 0, 0, 11, 1, 0, 101],
	["UTC-06", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 406],
	["America/Belize", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79],
	["America/Cancun", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 250],
	["America/Chicago", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 365],
	["America/Costa_Rica", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124],
	["America/El_Salvador", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 328],
	["America/Guatemala", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 172],
	["America/Indiana/Knox", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 361],
	["America/Indiana/Tell_City", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 366],
	["America/Managua", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 265],
	["America/Menominee", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 368],
	["America/Merida", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 251],
	["America/Mexico_City", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 249],
	["America/Monterrey", -360, 60, 0, 4, 1, 0, 0, 10, 5, 0, 252],
	["America/North_Dakota/Center", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 369],
	["America/North_Dakota/New_Salem", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 370],
	["America/Rainy_River", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 96],
	["America/Rankin_Inlet", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 94],
	["America/Regina", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97],
	["America/Swift_Current", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98],
	["America/Tegucigalpa", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 177],
	["America/Winnipeg", -360, 60, 0, 3, 2, 0, 0, 11, 1, 0, 95],
	["Pacific/Galapagos", -360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 137],
	["UTC-05", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 407],
	["America/Atikokan", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93],
	["America/Bogota", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123],
	["America/Cayman", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 209],
	["America/Detroit", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 356],
	["America/Eirunepe", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73],
	["America/Grand_Turk", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 331],
	["America/Guayaquil", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136],
	["America/Havana", -300, 60, 0, 0, 0, 0, 0, 0, 0, 0, 125],
	["America/Indiana/Indianapolis", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 359],
	["America/Indiana/Marengo", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 363],
	["America/Indiana/Petersburg", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 367],
	["America/Indiana/Vevay", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 364],
	["America/Indiana/Vincennes", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 360],
	["America/Indiana/Winamac", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 362],
	["America/Iqaluit", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 90],
	["America/Jamaica", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 195],
	["America/Kentucky/Louisville", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 357],
	["America/Kentucky/Monticello", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 358],
	["America/Lima", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 275],
	["America/Montreal", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 86],
	["America/Nassau", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 75],
	["America/New_York", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 355],
	["America/Nipigon", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 88],
	["America/Panama", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 274],
	["America/Pangnirtung", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 91],
	["America/Port-au-Prince", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 179],
	["America/Resolute", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92],
	["America/Rio_Branco", -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74],
	["America/Thunder_Bay", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 89],
	["America/Toronto", -300, 60, 0, 3, 2, 0, 0, 11, 1, 0, 87],
	["Pacific/Easter", -300, 60, 0, 0, 0, 0, 0, 0, 0, 0, 116],
	["UTC-04:30", -270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 408],
	["UTC-04", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 409],
	["America/Anguilla", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
	["America/Antigua", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
	["America/Aruba", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 44],
	["America/Barbados", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48],
	["America/Blanc-Sablon", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85],
	["America/Boa_Vista", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 71],
	["America/Caracas", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 387],
	["America/Curacao", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
	["America/Dominica", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 133],
	["America/Glace_Bay", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 82],
	["America/Goose_Bay", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 84],
	["America/Grenada", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 156],
	["America/Guadeloupe", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 168],
	["America/Guyana", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 175],
	["America/Halifax", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 81],
	["America/La_Paz", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59],
	["America/Manaus", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72],
	["America/Martinique", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 242],
	["America/Moncton", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 83],
	["America/Montserrat", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244],
	["America/Port_of_Spain", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 343],
	["America/Porto_Velho", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70],
	["America/Puerto_Rico", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285],
	["America/Santo_Domingo", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 134],
	["America/St_Kitts", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205],
	["America/St_Lucia", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217],
	["America/St_Thomas", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 389],
	["America/St_Vincent", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 386],
	["America/Thule", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 165],
	["America/Tortola", -240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 388],
	["Atlantic/Bermuda", -240, 60, 0, 3, 2, 0, 0, 11, 1, 0, 57],
	["America/Santiago", -240, 60, 0, 0, 0, 0, 0, 0, 0, 0, 115],
	["UTC-03:30", -210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 410],
	["America/St_Johns", -210, 60, 0, 3, 2, 0, 0, 11, 1, 0, 80],
	["UTC-03", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 411],
	["America/Araguaina", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
	["America/Argentina/Buenos_Aires", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 20],
	["America/Argentina/Catamarca", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 24],
	["America/Argentina/Cordoba", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 21],
	["America/Argentina/Jujuy", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 22],
	["America/Argentina/La_Rioja", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 25],
	["America/Argentina/Mendoza", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 27],
	["America/Argentina/Rio_Gallegos", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 28],
	["America/Argentina/San_Juan", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 26],
	["America/Argentina/Tucuman", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 23],
	["America/Argentina/Ushuaia", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 29],
	["America/Asuncion", -180, 60, 0, 10, 3, 0, 0, 3, 2, 0, 291],
	["America/Bahia", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66],
	["America/Belem", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61],
	["America/Campo_Grande", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 68],
	["America/Cayenne", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158],
	["America/Cuiaba", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 69],
	["America/Fortaleza", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62],
	["America/Godthab", -180, 60, 0, 3, 5, 0, 0, 10, 5, 0, 162],
	["America/Maceio", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65],
	["America/Miquelon", -180, 60, 0, 3, 2, 0, 0, 11, 1, 0, 283],
	["America/Montevideo", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 382],
	["America/Paramaribo", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 326],
	["America/Recife", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63],
	["Antarctica/Palmer", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 13],
	["Antarctica/Rothera", -180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
	["America/Sao_Paulo", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 67],
	["Atlantic/Stanley", -180, 60, 0, 0, 0, 0, 0, 0, 0, 0, 148],
	["UTC-02", -120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 412],
	["America/Noronha", -120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60],
	["Atlantic/South_Georgia", -120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 171],
	["UTC-01", -60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 413],
	["America/Scoresbysund", -60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 164],
	["Atlantic/Azores", -60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 289],
	["Atlantic/Cape_Verde", -60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126],
	["UTC+00", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 414],
	["Africa/Abidjan", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 113],
	["Africa/Accra", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160],
	["Africa/Bamako", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 235],
	["Africa/Banjul", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 166],
	["Africa/Bissau", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 174],
	["Africa/Casablanca", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 226],
	["Africa/Conakry", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 167],
	["Africa/Dakar", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 324],
	["Africa/El_Aaiun", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 140],
	["Africa/Freetown", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 322],
	["Africa/Lome", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 334],
	["Africa/Monrovia", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 220],
	["Africa/Nouakchott", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243],
	["Africa/Ouagadougou", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51],
	["Africa/Sao_Tome", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 327],
	["America/Danmarkshavn", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163],
	["America/Marigot", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 230],
	["America/St_Barthelemy", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56],
	["Atlantic/Canary", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 144],
	["Atlantic/Faroe", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 152],
	["Atlantic/Madeira", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 288],
	["Atlantic/Reykjavik", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192],
	["Atlantic/St_Helena", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 318],
	["Europe/Dublin", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 185],
	["Europe/Guernsey", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 159],
	["Europe/Isle_of_Man", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 187],
	["Europe/Jersey", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 194],
	["Europe/Lisbon", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 287],
	["Europe/London", 0, 60, 0, 3, 5, 0, 0, 10, 5, 0, 155],
	["Undefined", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	["UTC+01", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 415],
	["Africa/Algiers", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 135],
	["Africa/Bangui", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110],
	["Africa/Brazzaville", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111],
	["Africa/Ceuta", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 143],
	["Africa/Douala", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117],
	["Africa/Kinshasa", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108],
	["Africa/Lagos", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 264],
	["Africa/Libreville", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154],
	["Africa/Luanda", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
	["Africa/Malabo", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 169],
	["Africa/Ndjamena", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 332],
	["Africa/Niamey", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 262],
	["Africa/Porto-Novo", 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55],
	["Africa/Tunis", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 340],
	["Arctic/Longyearbyen", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 320],
	["Europe/Amsterdam", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 266],
	["Europe/Andorra", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 1],
	["Europe/Belgrade", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 295],
	["Europe/Berlin", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 130],
	["Europe/Bratislava", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 321],
	["Europe/Brussels", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 50],
	["Europe/Budapest", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 180],
	["Europe/Copenhagen", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 132],
	["Europe/Gibraltar", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 161],
	["Europe/Ljubljana", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 319],
	["Europe/Luxembourg", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 223],
	["Europe/Madrid", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 142],
	["Europe/Malta", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 245],
	["Europe/Monaco", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 227],
	["Europe/Oslo", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 267],
	["Europe/Paris", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 153],
	["Europe/Podgorica", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 229],
	["Europe/Prague", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 129],
	["Europe/Rome", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 193],
	["Europe/San_Marino", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 323],
	["Europe/Sarajevo", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 47],
	["Europe/Skopje", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 234],
	["Europe/Stockholm", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 316],
	["Europe/Tirane", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 6],
	["Europe/Vaduz", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 218],
	["Europe/Vatican", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 385],
	["Europe/Vienna", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 31],
	["Europe/Warsaw", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 282],
	["Europe/Zagreb", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 178],
	["Europe/Zurich", 60, 60, 0, 3, 5, 0, 0, 10, 5, 0, 112],
	["UTC+02", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 416],
	["Africa/Blantyre", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248],
	["Africa/Bujumbura", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54],
	["Africa/Cairo", 120, 60, 0, 3, 5, 6, 0, 10, 5, 0, 139],
	["Africa/Gaborone", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77],
	["Africa/Harare", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 398],
	["Africa/Johannesburg", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 396],
	["Africa/Kigali", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 311],
	["Africa/Lubumbashi", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 109],
	["Africa/Lusaka", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 397],
	["Africa/Maputo", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 259],
	["Africa/Maseru", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221],
	["Africa/Mbabane", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 330],
	["Africa/Tripoli", 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 225],
	["Africa/Windhoek", 120, 60, 0, 4, 1, 0, 0, 9, 1, 0, 260],
	["Asia/Amman", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 196],
	["Asia/Beirut", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 216],
	["Asia/Damascus", 120, 60, 0, 0, 0, 0, 0, 0, 0, 0, 329],
	["Asia/Gaza", 120, 60, 0, 0, 0, 0, 0, 0, 0, 0, 286],
	["Asia/Jerusalem", 120, 60, 0, 0, 0, 0, 0, 0, 0, 0, 186],
	["Asia/Nicosia", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 128],
	["Europe/Athens", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 170],
	["Europe/Bucharest", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 294],
	["Europe/Chisinau", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 228],
	["Europe/Helsinki", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 146],
	["Europe/Istanbul", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 342],
	["Europe/Kaliningrad", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 296],
	["Europe/Kiev", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 347],
	["Europe/Mariehamn", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 45],
	["Europe/Minsk", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 78],
	["Europe/Riga", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 224],
	["Europe/Simferopol", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 350],
	["Europe/Sofia", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 52],
	["Europe/Tallinn", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 138],
	["Europe/Uzhgorod", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 348],
	["Europe/Vilnius", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 222],
	["Europe/Zaporozhye", 120, 60, 0, 3, 5, 0, 0, 10, 5, 0, 349],
	["UTC+03", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 417],
	["Africa/Addis_Ababa", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 145],
	["Africa/Asmara", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 141],
	["Africa/Dar_es_Salaam", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 346],
	["Africa/Djibouti", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 131],
	["Africa/Kampala", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 351],
	["Africa/Khartoum", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 315],
	["Africa/Mogadishu", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 325],
	["Africa/Nairobi", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 198],
	["Antarctica/Syowa", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19],
	["Asia/Aden", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 394],
	["Asia/Baghdad", 180, 60, 0, 9, 5, 0, 0, 4, 1, 0, 190],
	["Asia/Bahrain", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 53],
	["Asia/Kuwait", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 208],
	["Asia/Qatar", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292],
	["Asia/Riyadh", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 312],
	["Europe/Moscow", 180, 60, 0, 3, 5, 0, 0, 10, 5, 0, 297],
	["Europe/Volgograd", 180, 60, 0, 3, 5, 0, 0, 10, 5, 0, 298],
	["Indian/Antananarivo", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 231],
	["Indian/Comoro", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 204],
	["Indian/Mayotte", 180, 0, 0, 0, 0, 0, 0, 0, 0, 0, 395],
	["UTC+03:30", 210, 0, 0, 0, 0, 0, 0, 0, 0, 0, 418],
	["Asia/Tehran", 210, 0, 0, 9, 5, 0, 0, 4, 1, 0, 191],
	["UTC+04", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 419],
	["Asia/Baku", 240, 60, 0, 3, 5, 0, 0, 10, 5, 0, 46],
	["Asia/Dubai", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
	["Asia/Muscat", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 273],
	["Asia/Tbilisi", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157],
	["Asia/Yerevan", 240, 60, 0, 3, 5, 0, 0, 10, 5, 0, 7],
	["Europe/Samara", 240, 60, 0, 3, 5, 0, 0, 10, 5, 0, 299],
	["Indian/Mahe", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 314],
	["Indian/Mauritius", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 246],
	["Indian/Reunion", 240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 293],
	["UTC+04:30", 270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 420],
	["Asia/Kabul", 270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	["UTC+05", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 421],
	["Asia/Aqtau", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 213],
	["Asia/Aqtobe", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 212],
	["Asia/Ashgabat", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 339],
	["Asia/Dushanbe", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 336],
	["Asia/Karachi", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 281],
	["Asia/Oral", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 214],
	["Asia/Samarkand", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 383],
	["Asia/Tashkent", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 384],
	["Asia/Yekaterinburg", 300, 60, 0, 3, 5, 0, 0, 10, 5, 0, 300],
	["Indian/Kerguelen", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 333],
	["Indian/Maldives", 300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247],
	["UTC+05:30", 330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 422],
	["Asia/Calcutta", 330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 188],
	["Asia/Colombo", 330, 0, 0, 0, 0, 0, 0, 0, 0, 0, 219],
	["UTC+05:45", 345, 0, 0, 0, 0, 0, 0, 0, 0, 0, 423],
	["Asia/Katmandu", 345, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268],
	["UTC+06", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 424],
	["Antarctica/Mawson", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14],
	["Antarctica/Vostok", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17],
	["Asia/Almaty", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210],
	["Asia/Bishkek", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 199],
	["Asia/Dhaka", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49],
	["Asia/Novosibirsk", 360, 60, 0, 3, 5, 0, 0, 10, 5, 0, 302],
	["Asia/Omsk", 360, 60, 0, 3, 5, 0, 0, 10, 5, 0, 301],
	["Asia/Qyzylorda", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 211],
	["Asia/Thimphu", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76],
	["Indian/Chagos", 360, 0, 0, 0, 0, 0, 0, 0, 0, 0, 189],
	["UTC+06:30", 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 425],
	["Asia/Rangoon", 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 236],
	["Indian/Cocos", 390, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107],
	["UTC+07", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 426],
	["Antarctica/Davis", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
	["Asia/Bangkok", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 335],
	["Asia/Hovd", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 238],
	["Asia/Jakarta", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 181],
	["Asia/Krasnoyarsk", 420, 60, 0, 3, 5, 0, 0, 10, 5, 0, 303],
	["Asia/Phnom_Penh", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200],
	["Asia/Pontianak", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 182],
	["Asia/Saigon", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 390],
	["Asia/Vientiane", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 215],
	["Indian/Christmas", 420, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127],
	["UTC+08", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 427],
	["Antarctica/Casey", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16],
	["Asia/Brunei", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58],
	["Asia/Chongqing", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120],
	["Asia/Harbin", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119],
	["Asia/Hong_Kong", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 176],
	["Asia/Irkutsk", 480, 60, 0, 3, 5, 0, 0, 10, 5, 0, 304],
	["Asia/Kashgar", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122],
	["Asia/Kuala_Lumpur", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257],
	["Asia/Kuching", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 258],
	["Asia/Macau", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 240],
	["Asia/Makassar", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 183],
	["Asia/Manila", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 280],
	["Asia/Shanghai", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 118],
	["Asia/Singapore", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 317],
	["Asia/Taipei", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 345],
	["Asia/Ulaanbaatar", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 237],
	["Asia/Urumqi", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121],
	["Australia/West", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 449],
	["Australia/Perth", 480, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42],
	["UTC+08:45", 525, 0, 0, 0, 0, 0, 0, 0, 0, 0, 428],
	["Australia/Eucla", 525, 60, 0, 10, 1, 0, 0, 4, 1, 0, 43],
	["UTC+09", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 429],
	["Asia/Choibalsan", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 239],
	["Asia/Dili", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 338],
	["Asia/Jayapura", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 184],
	["Asia/Pyongyang", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 206],
	["Asia/Seoul", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 207],
	["Asia/Tokyo", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 197],
	["Asia/Yakutsk", 540, 60, 0, 3, 5, 0, 0, 10, 5, 0, 305],
	["Pacific/Palau", 540, 0, 0, 0, 0, 0, 0, 0, 0, 0, 290],
	["UTC+09:30", 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 430],
	["Australia/Adelaide", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 40],
	["Australia/Broken_Hill", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 37],
	["Australia/Darwin", 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41],
	["Australia/North", 570, 0, 0, 0, 0, 0, 0, 0, 0, 0, 444],
	["Australia/Yancowinna", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 450],
	["Australia/South", 570, 60, 0, 10, 1, 0, 0, 4, 1, 0, 446],
	["UTC+09:45", 585, 0, 0, 0, 0, 0, 0, 0, 0, 0, 431],
	["UTC+10", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 432],
	["Antarctica/DumontDUrville", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18],
	["Australia/ACT", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 440],
	["Australia/Brisbane", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38],
	["Australia/Canberra", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 441],
	["Australia/Currie", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 34],
	["Australia/Lindeman", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39],
	["Australia/Hobart", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 33],
	["Australia/Melbourne", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 35],
	["Australia/NSW", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 443],
	["Australia/Queensland", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 445],
	["Australia/Sydney", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 36],
	["Australia/Tasmania", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 447],
	["Australia/Victoria", 600, 60, 0, 10, 1, 0, 0, 4, 1, 0, 448],
	["Asia/Sakhalin", 600, 60, 0, 3, 5, 0, 0, 10, 5, 0, 307],
	["Asia/Vladivostok", 600, 60, 0, 3, 5, 0, 0, 10, 5, 0, 306],
	["Pacific/Guam", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 173],
	["Pacific/Port_Moresby", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 279],
	["Pacific/Saipan", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 241],
	["Pacific/Truk", 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149],
	["UTC+10:30", 630, 0, 0, 0, 0, 0, 0, 0, 0, 0, 433],
	["Australia/Lord_Howe", 630, 30, 0, 10, 5, 0, 0, 3, 5, 0, 32],
	["UTC+11", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 434],
	["Asia/Magadan", 660, 60, 0, 3, 5, 0, 0, 10, 5, 0, 308],
	["Pacific/Efate", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 391],
	["Pacific/Guadalcanal", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 313],
	["Pacific/Kosrae", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151],
	["Pacific/Noumea", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 261],
	["Pacific/Ponape", 660, 0, 0, 0, 0, 0, 0, 0, 0, 0, 150],
	["UTC+11:30", 690, 0, 0, 0, 0, 0, 0, 0, 0, 0, 435],
	["Pacific/Norfolk", 690, 0, 0, 0, 0, 0, 0, 0, 0, 0, 263],
	["UTC+12", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 436],
	["Asia/Anadyr", 720, 60, 0, 3, 5, 0, 0, 10, 5, 0, 310],
	["Asia/Kamchatka", 720, 60, 0, 3, 5, 0, 0, 10, 5, 0, 309],
	["Pacific/Auckland", 720, 60, 0, 9, 5, 0, 0, 4, 1, 0, 271],
	["Pacific/Fiji", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 147],
	["Pacific/Funafuti", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 344],
	["Pacific/Kwajalein", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 233],
	["Pacific/Majuro", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 232],
	["Pacific/Nauru", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 269],
	["Pacific/Tarawa", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201],
	["Pacific/Wake", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 354],
	["Pacific/Wallis", 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 392],
	["UTC+12:45", 765, 0, 0, 0, 0, 0, 0, 0, 0, 0, 437],
	["Pacific/Chatham", 825, 60, 0, 9, 5, 0, 0, 4, 1, 0, 272],
	["UTC+13", 780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 438],
	["Antarctica/McMurdo", 780, 60, 0, 9, 5, 0, 0, 4, 1, 0, 10],
	["Antarctica/South_Pole", 780, 60, 0, 9, 5, 0, 0, 4, 1, 0, 11],
	["Pacific/Enderbury", 780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202],
	["Pacific/Tongatapu", 780, 0, 0, 0, 0, 0, 0, 0, 0, 0, 341],
	["UTC+14", 840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 439],
	["Pacific/Kiritimati", 840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 203]
];

/*************************************************    js/GCLocation.js **********************************************/
var GCLocation_List = [];
var GCLocation_Default = null;

class GCLocation {
  constructor(data) {
    this.City = "";
    this.Longitude = 0.0;
    this.Latitude = 0.0;
    this.Altitude = 6378.0;
    this.p_timezone = TTimeZone.GetDefaultTimeZone();
    this.p_timezonename = this.p_timezone.Name;
    this.p_countryname = '';
    this.Country = null;

    if (data != undefined) {
      this.City = data[0];
      this.p_countryname = data[1];
      this.Country = TCountry.FindCountryByName(data[1]);
      this.Longitude = data[2];
      this.Latitude = data[3];
      this.p_timezoneoffset = data[4];
      this.p_timezone = TTimeZone.FindTimeZoneById(data[5]);
      this.p_timezonename = this.p_timezone.Name;
    }
  }

  get Encoded() {
    var d = [this.City, this.p_countryname, this.Longitude,
      this.Latitude, this.p_timezoneoffset, this.p_timezone.TimezoneId];
    return JSON.stringify(d);
  }

    get OffsetUtcHours() {
      if (this.TimeZone == null) {
        return 0.0;
      }
      return this.TimeZone.OffsetMinutes / 60.0;
    }

    get TimeZone() {
      if (this.p_timezone != null) 
        return this.p_timezone;
      this.p_timezone = TTimeZone.FindTimeZoneByName(p_timezonename);
      return this.p_timezone;
    }

    set TimeZone(value) {
      this.p_timezone = value;
      this.p_timezonename = p_timezone.Name;
    }

    get CountryCode() {
      if (Country != null) return Country.ISOCode;
      return "";
    };

    set CountryCode(value) {
      if (value == null || value == "")
          this.Country = null;
      this.Country = TCountry.FindCountryByISOCode(value);
    };

    get FirstDayOfWeek() {
      if (this.Country != null)
      {
        if (this.Country.FirstDayOfWeek != undefined) {
          return this.Country.FirstDayOfWeek;
        }
      }
      return gds.getValue(GCDS.GENERAL_FIRST_DOW);
    }

    get Title() {
      return this.City + ' [' + this.p_countryname + ']';
    }

    get TimeZoneName() {
      return this.p_timezonename;
    }

    set TimeZoneName(value) {
      this.p_timezonename = value;
      this.p_timezone = null;
    }

    GetEarthData() {
        var e = new GCEarthData();
        e.TimeZone = this.TimeZone;
        e.latitudeDeg = this.Latitude;
        e.longitudeDeg = this.Longitude;
        return e;
    }

    SetEarthData(/*GCEarthData*/ e) {
        Longitude = e.longitudeDeg;
        Latitude = e.latitudeDeg;
        TimeZone = e.TimeZone;
        return e;
    }

    Set(/*GCLocation*/ L)
    {
        if (L.p_timezone != null)
            this.TimeZone = L.TimeZone;
        else
            this.TimeZoneName = L.TimeZoneName;
        Title = L.Title;
        Longitude = L.Longitude;
        Latitude = L.Latitude;
    }

    GetLatitudeString() {
        return GCEarthData.GetTextLatitude(Latitude);
    }

    GetLongitudeString() {
        return GCEarthData.GetTextLongitude(Longitude);
    }

    GetLocationText() {
      return this.Title + " (" +
         GCEarthData.GetTextLatitude(this.Latitude) + ", " +
         GCEarthData.GetTextLongitude(this.Longitude) + ")";
    }

    GetFullName() {
      return this.Title + " (" +
         GCEarthData.GetTextLatitude(this.Latitude) + ", " +
         GCEarthData.GetTextLongitude(this.Longitude) + "), Timezone: " +
         this.TimeZoneName;
    }

    GetTimeZoneText() {
      return sprintf("%s %s", this.TimeZoneName, this.TimeZone.TimeZoneOffsetText);
    }

    GetCoordinatesText() {
      return sprintf('%s, %s  (%s)', GCEarthData.GetTextLatitude(this.Latitude),
         GCEarthData.GetTextLongitude(this.Longitude),
         this.TimeZoneName);
    }

    toString() {
      return this.GetFullName();
    }

    isLetter(str) {
      return str.length === 1 && str.match(/[a-z]/i);
    }


    static FindByName(name) {
      for (var lc of GCLocation_List) {
        if (lc[0] == name) {
          return new GCLocation(lc);
        }
      }
      return GCLocation_Default;
    }

    static Search(name) {
      var a = [], b = [], c=[], d=[];
      var name0 = name.toUpperCase();
      for (var lc of GCLocation_List) {
        var lc0 = lc[0].toUpperCase();
        var cc0 = lc[1].toUpperCase();
        if (lc0 == name0 && a.length<10) {
          a.push(new GCLocation(lc));
        } else if (lc0.substr(0,name.length) == name0 && b.length<10) {
          b.push(new GCLocation(lc));
        } else if (lc0.includes(name0) && c.length<10) {
          c.push(new GCLocation(lc));
        } else if (name.length > 1 && cc0.includes(name0) && d.length<10) {
          d.push(new GCLocation(lc));
        }
      }

      return a.concat(b, c, d).slice(0, 10);
    }
}


GCLocation_Default = new GCLocation(["Vrndavan", "India", 77.73, 27.583, 5.5, 188])

GCLocation_List = [
  ["Sant Julia de Loria", "Andorra", 1.491287, 42.463722, 1.00, 1],
["les Escaldes", "Andorra", 1.534138, 42.507286, 1.00, 1],
["la Massana", "Andorra", 1.514826, 42.544987, 1.00, 1],
["Umm al Qaywayn", "United Arab Emirates", 55.553333, 25.565277, 4.00, 2],
["Ra's al Khaymah", "United Arab Emirates", 55.942780, 25.791111, 4.00, 2],
["Khawr Fakkan", "United Arab Emirates", 56.356110, 25.339167, 4.00, 2],
["Dubai", "United Arab Emirates", 55.279999, 25.252222, 4.00, 2],
["Sharjah", "United Arab Emirates", 55.391109, 25.362223, 4.00, 2],
["Al `Ayn", "United Arab Emirates", 55.760555, 24.191668, 4.00, 2],
["Ajman", "United Arab Emirates", 55.435036, 25.411106, 4.00, 2],
["Abu Dhabi", "United Arab Emirates", 54.366665, 24.466667, 4.00, 2],
["Kuhestan", "Afghanistan", 61.197777, 34.653889, 4.50, 3],
["Tokzar", "Afghanistan", 66.419998, 35.948891, 4.50, 3],
["Zendeh Jan", "Afghanistan", 61.731667, 34.345554, 4.50, 3],
["Mazar-e Sharif", "Afghanistan", 67.112221, 36.706944, 4.50, 3],
["Kandahar", "Afghanistan", 65.699997, 31.610001, 4.50, 3],
["Kabul", "Afghanistan", 69.183334, 34.516666, 4.50, 3],
["Jalalabad", "Afghanistan", 70.449997, 34.419998, 4.50, 3],
["Herat", "Afghanistan", 62.189999, 34.340000, 4.50, 3],
["Saint John's", "Antigua", -61.849998, 17.116667, -4.00, 4],
["Sarande", "Albania", 20.005278, 39.875557, 1.00, 6],
["Tepelene", "Albania", 20.019167, 40.295834, 1.00, 6],
["Polican", "Albania", 20.098055, 40.612221, 1.00, 6],
["Tirana", "Albania", 19.818890, 41.327499, 1.00, 6],
["Vedi", "Armenia", 44.727779, 39.910557, 4.00, 7],
["Vayk'", "Armenia", 45.465279, 39.691666, 4.00, 7],
["Kapan", "Armenia", 46.415001, 39.201111, 4.00, 7],
["Yerevan", "Armenia", 44.513611, 40.181110, 4.00, 7],
["Willemstad", "Curacao", -68.916664, 12.100000, -4.00, 8],
["Sint Michiel Liber", "Curacao", -68.983330, 12.150000, -4.00, 8],
["Cul de Sac", "Curacao", -63.066666, 18.033333, -4.00, 8],
["Saurimo", "Angola", 20.400000, -9.650000, 1.00, 9],
["Lucapa", "Angola", 20.750000, -8.416667, 1.00, 9],
["Luau", "Angola", 22.233334, -10.700000, 1.00, 9],
["Luanda", "Angola", 13.234445, -8.838333, 1.00, 9],
["Lobito", "Angola", 13.545556, -12.348056, 1.00, 9],
["Huambo", "Angola", 15.739166, -12.776111, 1.00, 9],
["Zarate", "Argentina", -59.035000, -34.092220, -3.00, 20],
["Tandil", "Argentina", -59.150002, -37.316666, -3.00, 20],
["San Lorenzo", "Argentina", -58.766666, -28.133333, -3.00, 21],
["Resistencia", "Argentina", -58.983334, -27.450001, -3.00, 23],
["Quilmes", "Argentina", -58.269444, -34.720280, -3.00, 20],
["Posadas", "Argentina", -55.883335, -27.383333, -3.00, 20],
["Mar del Plata", "Argentina", -57.549999, -38.000000, -3.00, 20],
["La Plata", "Argentina", -57.948891, -34.931389, -3.00, 20],
["Formosa", "Argentina", -58.183334, -26.183332, -3.00, 23],
["Corrientes", "Argentina", -58.833332, -27.466667, -3.00, 23],
["Buenos Aires", "Argentina", -58.408813, -34.576126, -3.00, 20],
["Santiago del Estero", "Argentina", -64.266670, -27.783333, -3.00, 23],
["Santa Fe", "Argentina", -60.700001, -31.633333, -3.00, 21],
["San Salvador de Jujuy", "Argentina", -65.300003, -24.183332, -3.00, 22],
["San Miguel de Tucuman", "Argentina", -65.216667, -26.816668, -3.00, 23],
["San Juan", "Argentina", -68.536392, -31.537500, -3.00, 26],
["Salta", "Argentina", -65.416664, -24.783333, -3.00, 22],
["Rosario", "Argentina", -60.666389, -32.951111, -3.00, 20],
["Parana", "Argentina", -60.533333, -31.733334, -3.00, 21],
["Neuquen", "Argentina", -68.066666, -38.950001, -3.00, 27],
["Mendoza", "Argentina", -68.816666, -32.883335, -3.00, 27],
["Cordoba", "Argentina", -64.183334, -31.400000, -3.00, 21],
["Bahia Blanca", "Argentina", -62.283333, -38.716667, -3.00, 20],
["Tafuna", "American Samoa", -170.720001, -14.335830, -11.00, 30],
["Neu-Guntramsdorf", "Austria", 16.316668, 48.066666, 1.00, 31],
["Zwettl Stift", "Austria", 15.200000, 48.616665, 1.00, 31],
["Zistersdorf", "Austria", 16.750000, 48.533333, 1.00, 31],
["Wien", "Austria", 16.372076, 48.208488, 1.00, 31],
["Graz", "Austria", 15.450000, 47.066666, 1.00, 31],
["Whyalla", "Australia", 137.583328, -33.033333, 9.50, 40],
["Victor Harbour", "Australia", 138.616669, -35.566666, 9.50, 40],
["Roebourne", "Australia", 117.133331, -20.783333, 8.00, 42],
["Perth", "Australia", 115.833336, -31.933332, 8.00, 42],
["Adelaide", "Australia", 138.600006, -34.933334, 9.50, 40],
["Sydney", "Australia", 151.207321, -33.867851, 10.00, 36],
["Murwilumbah", "Australia", 153.394592, -28.329203, 10.00, 36],
["Newcastle", "Australia", 151.750000, -32.916668, 10.00, 36],
["Melbourne", "Australia", 144.963318, -37.813995, 10.00, 35],
["Wollongong", "Australia", 150.883331, -34.433334, 10.00, 36],
["Canberra", "Australia", 149.128067, -35.283463, 10.00, 36],
["Brisbane", "Australia", 153.016663, -27.500000, 10.00, 38],
["Oranjestad", "Aruba", -70.033333, 12.516666, -4.00, 44],
["Goytapa", "Azerbaijan", 48.595280, 39.116665, 4.00, 46],
["Icari", "Azerbaijan", 46.654999, 39.082222, 4.00, 46],
["Xocavand", "Azerbaijan", 47.113056, 39.795277, 4.00, 46],
["Sumqayit", "Azerbaijan", 49.668610, 40.589722, 4.00, 46],
["Ganca", "Azerbaijan", 46.360554, 40.682777, 4.00, 46],
["Baku", "Azerbaijan", 49.882221, 40.395279, 4.00, 46],
["Zvornik", "Bosnia and Herzegovina", 19.101389, 44.386944, 1.00, 47],
["Zivinice", "Bosnia and Herzegovina", 18.649723, 44.449444, 1.00, 47],
["Zepce", "Bosnia and Herzegovina", 18.037777, 44.426666, 1.00, 47],
["Sarajevo", "Bosnia and Herzegovina", 18.383333, 43.849998, 1.00, 47],
["Banja Luka", "Bosnia and Herzegovina", 17.185556, 44.775833, 1.00, 47],
["Bridgetown", "Barbados", -59.616665, 13.100000, -4.00, 48],
["Thakurgaon", "Bangladesh", 88.466667, 26.033333, 6.00, 49],
["Teknaf", "Bangladesh", 92.300003, 20.866667, 6.00, 49],
["Tungi", "Bangladesh", 90.405830, 23.889999, 6.00, 49],
["Sylhet", "Bangladesh", 91.871666, 24.896667, 6.00, 49],
["Narsingdi", "Bangladesh", 90.718056, 23.920834, 6.00, 49],
["Rajshahi", "Bangladesh", 88.599998, 24.366667, 6.00, 49],
["Narayanganj", "Bangladesh", 90.501114, 23.623333, 6.00, 49],
["Mymensingh", "Bangladesh", 90.400002, 24.750000, 6.00, 49],
["Comilla", "Bangladesh", 91.204445, 23.457777, 6.00, 49],
["Rangpur", "Bangladesh", 89.250000, 25.750000, 6.00, 49],
["Dhaka", "Bangladesh", 90.408607, 23.723055, 6.00, 49],
["Dinajpur", "Bangladesh", 88.633331, 25.633333, 6.00, 49],
["Chittagong", "Bangladesh", 91.836388, 22.333055, 6.00, 49],
["Cox's Bazar", "Bangladesh", 91.978058, 21.442223, 6.00, 49],
["Khulna", "Bangladesh", 89.550003, 22.799999, 6.00, 49],
["Barisal", "Bangladesh", 90.371109, 22.701944, 6.00, 49],
["Jessore", "Bangladesh", 89.216667, 23.166666, 6.00, 49],
["Zwijndrecht", "Belgium", 4.333333, 51.216667, 1.00, 50],
["Zwevegem", "Belgium", 3.333333, 50.799999, 1.00, 50],
["Zutendaal", "Belgium", 5.566667, 50.933334, 1.00, 50],
["Gent", "Belgium", 3.716667, 51.049999, 1.00, 50],
["Charleroi", "Belgium", 4.433333, 50.416668, 1.00, 50],
["Brussels", "Belgium", 4.352775, 50.846596, 1.00, 50],
["Antwerp", "Belgium", 4.416667, 51.216667, 1.00, 50],
["Zorgho", "Burkina Faso", -0.615833, 12.248889, 0.00, 51],
["Ziniare", "Burkina Faso", -1.298333, 12.582222, 0.00, 51],
["Yako", "Burkina Faso", -2.266667, 12.966667, 0.00, 51],
["Ouagadougou", "Burkina Faso", -1.524722, 12.370277, 0.00, 51],
["Bobo Dioulasso", "Burkina Faso", -4.300000, 11.200000, 0.00, 51],
["Beloslav", "Bulgaria", 27.700001, 43.183334, 2.00, 52],
["Zlatograd", "Bulgaria", 25.100000, 41.383335, 2.00, 52],
["Zlatitsa", "Bulgaria", 24.133333, 42.716667, 2.00, 52],
["Varna", "Bulgaria", 27.916666, 43.216667, 2.00, 52],
["Sofia", "Bulgaria", 23.324146, 42.697514, 2.00, 52],
["Plovdiv", "Bulgaria", 24.750000, 42.150002, 2.00, 52],
["Sitrah", "Bahrain", 50.620556, 26.154722, 3.00, 53],
["Madinat `Isa", "Bahrain", 50.547779, 26.173611, 3.00, 53],
["Jidd Hafs", "Bahrain", 50.547779, 26.218611, 3.00, 53],
["Makamba", "Burundi", 29.805000, -4.134722, 2.00, 54],
["Bururi", "Burundi", 29.624376, -3.948773, 2.00, 54],
["Rumonge", "Burundi", 29.438889, -3.972222, 2.00, 54],
["Bujumbura", "Burundi", 29.360001, -3.376111, 2.00, 54],
["Tchaourou", "Benin", 2.600000, 8.883333, 1.00, 55],
["Tanguieta", "Benin", 1.264444, 10.619722, 1.00, 55],
["Save", "Benin", 2.483333, 8.033333, 1.00, 55],
["Porto-Novo", "Benin", 2.616667, 6.483333, 1.00, 55],
["Djougou", "Benin", 1.666944, 9.705000, 1.00, 55],
["Cotonou", "Benin", 2.433333, 6.350000, 1.00, 55],
["Abomey-Calavi", "Benin", 2.350000, 6.450000, 1.00, 55],
["Gustavia", "Guadeloupe", -62.849998, 17.883333, -4.00, 168],
["Tutong", "Brunei", 114.650002, 4.800000, 8.00, 58],
["Seria", "Brunei", 114.316666, 4.616667, 8.00, 58],
["Kuala Belait", "Brunei", 114.183334, 4.583333, 8.00, 58],
["San Matias", "Bolivia", -58.400002, -16.366667, -4.00, 59],
["Robore", "Bolivia", -59.750000, -18.333334, -4.00, 59],
["Puerto Quijarro", "Bolivia", -57.766666, -17.783333, -4.00, 59],
["Sucre", "Bolivia", -65.259163, -19.043056, -4.00, 59],
["Santa Cruz de la Sierra", "Bolivia", -63.166668, -17.799999, -4.00, 59],
["Oruro", "Bolivia", -67.150002, -17.983334, -4.00, 59],
["La Paz", "Bolivia", -68.150002, -16.500000, -4.00, 59],
["Cochabamba", "Bolivia", -66.150002, -17.383333, -4.00, 59],
["Vitorino Freire", "Brazil", -45.166668, -4.066667, -3.00, 61],
["Vitoria do Mearim", "Brazil", -44.870556, -3.462222, -3.00, 61],
["Vitoria de Santo Antao", "Brazil", -35.291389, -8.118055, -3.00, 63],
["Teresina", "Brazil", -42.801945, -5.089167, -3.00, 62],
["Sao Luis", "Brazil", -44.302776, -2.529722, -3.00, 61],
["Recife", "Brazil", -34.881111, -8.053889, -3.00, 63],
["Paulista", "Brazil", -34.873055, -7.940834, -3.00, 63],
["Olinda", "Brazil", -34.855278, -8.008889, -3.00, 63],
["Natal", "Brazil", -35.209446, -5.795000, -3.00, 63],
["Mossoro", "Brazil", -37.344166, -5.187500, -3.00, 62],
["Maceio", "Brazil", -35.735279, -9.665833, -3.00, 65],
["Macapa", "Brazil", -51.066387, 0.038889, -3.00, 61],
["Juazeiro do Norte", "Brazil", -39.315277, -7.213056, -3.00, 62],
["Joao Pessoa", "Brazil", -34.863056, -7.115000, -3.00, 63],
["Jaboatao", "Brazil", -35.001389, -8.180278, -3.00, 63],
["Imperatriz", "Brazil", -47.491665, -5.526389, -3.00, 64],
["Fortaleza", "Brazil", -38.543056, -3.717222, -3.00, 62],
["Caucaia", "Brazil", -38.653057, -3.736111, -3.00, 62],
["Caruaru", "Brazil", -35.976112, -8.283334, -3.00, 63],
["Campina Grande", "Brazil", -35.881111, -7.230556, -3.00, 63],
["Belem", "Brazil", -48.504444, -1.455833, -3.00, 61],
["Ananindeua", "Brazil", -48.372223, -1.365556, -3.00, 61],
["Volta Redonda", "Brazil", -44.104168, -22.523056, -3.00, 67],
["Vitoria da Conquista", "Brazil", -40.839443, -14.866111, -3.00, 66],
["Vitoria", "Brazil", -40.337776, -20.319445, -3.00, 67],
["Vila Velha", "Brazil", -40.292500, -20.329721, -3.00, 67],
["Viamao", "Brazil", -51.023335, -30.081112, -3.00, 67],
["Varzea Grande", "Brazil", -56.132500, -15.646667, -3.00, 69],
["Uberlandia", "Brazil", -48.277222, -18.918612, -3.00, 67],
["Uberaba", "Brazil", -47.931946, -19.748333, -3.00, 67],
["Taubate", "Brazil", -45.555279, -23.026388, -3.00, 67],
["Taboao da Serra", "Brazil", -46.791668, -23.626112, -3.00, 67],
["Suzano", "Brazil", -46.310833, -23.542500, -3.00, 67],
["Sumare", "Brazil", -47.266945, -22.821945, -3.00, 67],
["Sorocaba", "Brazil", -47.458057, -23.501667, -3.00, 67],
["Sete Lagoas", "Brazil", -44.246666, -19.465834, -3.00, 67],
["Serra", "Brazil", -40.307777, -20.128611, -3.00, 67],
["Sao Vicente", "Brazil", -46.391945, -23.963055, -3.00, 67],
["Sao Paulo", "Brazil", -46.636112, -23.547501, -3.00, 67],
["Sao Leopoldo", "Brazil", -51.147221, -29.760279, -3.00, 67],
["Sao Jose dos Campos", "Brazil", -45.886944, -23.179445, -3.00, 67],
["Sao Jose do Rio Preto", "Brazil", -49.379444, -20.819723, -3.00, 67],
["Sao Joao de Meriti", "Brazil", -43.372223, -22.803888, -3.00, 67],
["Sao Carlos", "Brazil", -47.890835, -22.017500, -3.00, 67],
["Sao Bernardo do Campo", "Brazil", -46.564999, -23.693890, -3.00, 67],
["Santos", "Brazil", -46.333611, -23.960833, -3.00, 67],
["Santo Andre", "Brazil", -46.538334, -23.663889, -3.00, 67],
["Santa Maria", "Brazil", -53.806946, -29.684166, -3.00, 67],
["Santa Luzia", "Brazil", -43.851387, -19.769722, -3.00, 67],
["Salvador", "Brazil", -38.510834, -12.971111, -3.00, 66],
["Rio de Janeiro", "Brazil", -43.207500, -22.902779, -3.00, 67],
["Ribeirao Preto", "Brazil", -47.810276, -21.177500, -3.00, 67],
["Ribeirao das Neves", "Brazil", -44.086666, -19.766945, -3.00, 67],
["Presidente Prudente", "Brazil", -51.388889, -22.125555, -3.00, 67],
["Praia Grande", "Brazil", -46.402779, -24.005833, -3.00, 67],
["Porto Alegre", "Brazil", -51.230000, -30.033056, -3.00, 67],
["Ponta Grossa", "Brazil", -50.161945, -25.094999, -3.00, 67],
["Piracicaba", "Brazil", -47.649166, -22.725277, -3.00, 67],
["Petropolis", "Brazil", -43.178612, -22.504999, -3.00, 67],
["Pelotas", "Brazil", -52.342499, -31.771944, -3.00, 67],
["Osasco", "Brazil", -46.791668, -23.532499, -3.00, 67],
["Novo Hamburgo", "Brazil", -51.130554, -29.678333, -3.00, 67],
["Nova Iguacu", "Brazil", -43.451111, -22.759167, -3.00, 67],
["Niteroi", "Brazil", -43.103611, -22.883333, -3.00, 67],
["Montes Claros", "Brazil", -43.861668, -16.735001, -3.00, 66],
["Moji das Cruzes", "Brazil", -46.188332, -23.522778, -3.00, 67],
["Maua", "Brazil", -46.461388, -23.667778, -3.00, 67],
["Maringa", "Brazil", -51.938610, -23.425278, -3.00, 67],
["Marilia", "Brazil", -49.945835, -22.213888, -3.00, 67],
["Londrina", "Brazil", -51.162777, -23.310278, -3.00, 67],
["Limeira", "Brazil", -47.401669, -22.564722, -3.00, 67],
["Jundiai", "Brazil", -46.884167, -23.186388, -3.00, 67],
["Juiz de Fora", "Brazil", -43.350277, -21.764166, -3.00, 67],
["Joinville", "Brazil", -48.845554, -26.304445, -3.00, 67],
["Jacarei", "Brazil", -45.965832, -23.305277, -3.00, 67],
["Itaquaquecetuba", "Brazil", -46.348331, -23.486111, -3.00, 67],
["Itapevi", "Brazil", -46.934166, -23.548889, -3.00, 67],
["Itabuna", "Brazil", -39.280277, -14.785556, -3.00, 66],
["Ipatinga", "Brazil", -42.536667, -19.468334, -3.00, 67],
["Hortolandia", "Brazil", -47.220001, -22.858334, -3.00, 67],
["Guarulhos", "Brazil", -46.533333, -23.462778, -3.00, 67],
["Guaruja", "Brazil", -46.256390, -23.993055, -3.00, 67],
["Gravatai", "Brazil", -50.991943, -29.944445, -3.00, 67],
["Governador Valadares", "Brazil", -41.949444, -18.851110, -3.00, 67],
["Goiania", "Brazil", -49.253887, -16.678612, -3.00, 67],
["Franca", "Brazil", -47.400833, -20.538610, -3.00, 67],
["Foz do Iguacu", "Brazil", -54.588055, -25.547777, -3.00, 67],
["Florianopolis", "Brazil", -48.549168, -27.596666, -3.00, 67],
["Feira de Santana", "Brazil", -38.966667, -12.266666, -3.00, 66],
["Embu", "Brazil", -46.852222, -23.648890, -3.00, 67],
["Duque de Caxias", "Brazil", -43.311668, -22.785555, -3.00, 67],
["Diadema", "Brazil", -46.622776, -23.686111, -3.00, 67],
["Curitiba", "Brazil", -49.273056, -25.427778, -3.00, 67],
["Cuiaba", "Brazil", -56.096668, -15.596111, -3.00, 69],
["Contagem", "Brazil", -44.053612, -19.931667, -3.00, 67],
["Colombo", "Brazil", -49.224167, -25.291666, -3.00, 67],
["Caxias do Sul", "Brazil", -51.179443, -29.168056, -3.00, 67],
["Cascavel", "Brazil", -53.455276, -24.955833, -3.00, 67],
["Carapicuiba", "Brazil", -46.835556, -23.522499, -3.00, 67],
["Canoas", "Brazil", -51.183613, -29.917778, -3.00, 67],
["Campos", "Brazil", -41.299999, -21.750000, -3.00, 67],
["Campo Grande", "Brazil", -54.646389, -20.442778, -3.00, 68],
["Campinas", "Brazil", -47.060833, -22.905556, -3.00, 67],
["Brasilia", "Brazil", -47.929722, -15.779720, -3.00, 67],
["Blumenau", "Brazil", -49.066113, -26.919445, -3.00, 67],
["Betim", "Brazil", -44.198334, -19.967777, -3.00, 67],
["Belo Horizonte", "Brazil", -43.937778, -19.920834, -3.00, 67],
["Belford Roxo", "Brazil", -43.399445, -22.764166, -3.00, 67],
["Bauru", "Brazil", -49.060555, -22.314722, -3.00, 67],
["Barueri", "Brazil", -46.876110, -23.510555, -3.00, 67],
["Aracaju", "Brazil", -37.071667, -10.911111, -3.00, 65],
["Anapolis", "Brazil", -48.952778, -16.326666, -3.00, 67],
["Rio Branco", "Brazil", -67.809998, -9.974722, -5.00, 74],
["Porto Velho", "Brazil", -63.903889, -8.761945, -4.00, 70],
["Manaus", "Brazil", -60.025002, -3.101944, -4.00, 72],
["Boa Vista", "Brazil", -60.673332, 2.819722, -4.00, 71],
["Jaboatao dos Guararapes", "Brazil", -35.014721, -8.112778, -3.00, 63],
["West End", "Bahamas", -78.966667, 26.683332, -5.00, 75],
["Nassau", "Bahamas", -77.349998, 25.083334, -5.00, 75],
["Marsh Harbour", "Bahamas", -77.050003, 26.549999, -5.00, 75],
["Phuntsholing", "Bhutan", 89.383331, 26.850000, 6.00, 76],
["Tonota", "Botswana", 27.483334, -21.483334, 2.00, 77],
["Thamaga", "Botswana", 25.533333, -24.716667, 2.00, 77],
["Shakawe", "Botswana", 21.850000, -18.366667, 2.00, 77],
["Gaborone", "Botswana", 25.911945, -24.646389, 2.00, 77],
["Zhodzina", "Belarus", 28.332500, 54.098331, 2.00, 78],
["Zhytkavichy", "Belarus", 27.863611, 52.228611, 2.00, 78],
["Zhabinka", "Belarus", 24.023333, 52.200554, 2.00, 78],
["Minsk", "Belarus", 27.566668, 53.900002, 2.00, 78],
["Hrodna", "Belarus", 23.814722, 53.681389, 2.00, 78],
["Homyel'", "Belarus", 30.983334, 52.441666, 2.00, 78],
["Brest", "Belarus", 23.700001, 52.099998, 2.00, 78],
["Babruysk", "Belarus", 29.233334, 53.150002, 2.00, 78],
["San Pedro", "Belize", -87.949997, 17.916666, -6.00, 79],
["San Ignacio", "Belize", -89.071388, 17.156111, -6.00, 79],
["Punta Gorda", "Belize", -88.800003, 16.100000, -6.00, 79],
["Abbotsford", "Canada", -122.252571, 49.057976, -8.00, 104],
["Acton Vale", "Canada", -72.565819, 45.650070, -5.00, 86],
["Airdrie", "Canada", -114.035286, 51.300114, -7.00, 99],
["Calgary", "Canada", -114.085281, 51.050114, -7.00, 99],
["Edmonton", "Canada", -113.468712, 53.550137, -7.00, 99],
["Hamilton", "Canada", -79.949638, 43.233410, -5.00, 87],
["Kitchener", "Canada", -80.482986, 43.450096, -5.00, 87],
["London", "Canada", -81.233040, 42.983391, -5.00, 87],
["Montreal", "Canada", -73.649178, 45.516781, -5.00, 86],
["Oshawa", "Canada", -78.849571, 43.900120, -5.00, 87],
["Ottawa", "Canada", -75.690285, 45.420940, -5.00, 86],
["Toronto", "Canada", -79.416306, 43.700115, -5.00, 87],
["Vancouver", "Canada", -123.119339, 49.249657, -8.00, 104],
["Victoria", "Canada", -123.369301, 48.432938, -8.00, 104],
["Windsor", "Canada", -83.016541, 42.300083, -5.00, 87],
["Winnipeg", "Canada", -97.147041, 49.884399, -6.00, 95],
["Halifax", "Canada", -63.596848, 44.651985, -4.00, 81],
["Quebec", "Canada", -71.214539, 46.812279, -5.00, 86],
["Yangambi", "Democratic Republic of the Congo", 24.466667, 0.783333, 2.00, 109],
["Watsa", "Democratic Republic of the Congo", 29.533333, 3.050000, 2.00, 109],
["Wamba", "Democratic Republic of the Congo", 28.000000, 2.150000, 2.00, 109],
["Tshikapa", "Democratic Republic of the Congo", 20.799999, -6.416667, 2.00, 109],
["Mbuji-Mayi", "Democratic Republic of the Congo", 23.600000, -6.150000, 2.00, 109],
["Kisangani", "Democratic Republic of the Congo", 25.200001, 0.516667, 2.00, 109],
["Kananga", "Democratic Republic of the Congo", 22.417778, -5.895833, 2.00, 109],
["Bukavu", "Democratic Republic of the Congo", 28.860834, -2.508333, 2.00, 109],
["Lubumbashi", "Democratic Republic of the Congo", 27.466667, -11.666667, 2.00, 109],
["Likasi", "Democratic Republic of the Congo", 26.733334, -10.981389, 2.00, 109],
["Kolwezi", "Democratic Republic of the Congo", 25.472500, -10.716667, 2.00, 109],
["Kinshasa", "Democratic Republic of the Congo", 15.315000, -4.329722, 1.00, 108],
["Masina", "Democratic Republic of the Congo", 15.391389, -4.383611, 1.00, 108],
["Rafai", "Central African Republic", 23.916666, 4.950000, 1.00, 110],
["Ouadda", "Central African Republic", 22.400000, 8.066667, 1.00, 110],
["Obo", "Central African Republic", 26.500000, 5.400000, 1.00, 110],
["Bangui", "Central African Republic", 18.583334, 4.366667, 1.00, 110],
["Sibiti", "Congo", 13.345833, -3.685833, 1.00, 111],
["Pointe-Noire", "Congo", 11.846111, -4.794722, 1.00, 111],
["Owando", "Congo", 15.908055, -0.486944, 1.00, 111],
["Brazzaville", "Congo", 15.284722, -4.259167, 1.00, 111],
["Zurich", "Switzerland", 8.550000, 47.366665, 1.00, 112],
["Zug", "Switzerland", 8.516666, 47.166668, 1.00, 112],
["Zuchwil", "Switzerland", 7.566490, 47.201725, 1.00, 112],
["Zuenoula", "Ivory Coast", -6.043056, 7.429167, 0.00, 113],
["Yamoussoukro", "Ivory Coast", -5.283333, 6.816667, 0.00, 113],
["Vavoua", "Ivory Coast", -6.477778, 7.381944, 0.00, 113],
["Daloa", "Ivory Coast", -6.451944, 6.874722, 0.00, 113],
["Bouake", "Ivory Coast", -5.033056, 7.683333, 0.00, 113],
["Abobo", "Ivory Coast", -4.020555, 5.418889, 0.00, 113],
["Abidjan", "Ivory Coast", -4.028056, 5.341111, 0.00, 113],
["Avarua", "Cook Islands", -159.774994, -21.207777, -10.00, 114],
["Yumbel", "Chile", -72.566666, -37.083332, -4.00, 115],
["Vina del Mar", "Chile", -71.519722, -33.008057, -4.00, 115],
["Villarrica", "Chile", -72.216667, -39.266666, -4.00, 115],
["Valparaiso", "Chile", -71.601112, -33.047779, -4.00, 115],
["Temuco", "Chile", -72.599998, -38.733334, -4.00, 115],
["Talcahuano", "Chile", -73.116669, -36.716667, -4.00, 115],
["Santiago", "Chile", -70.666664, -33.450001, -4.00, 115],
["San Bernardo", "Chile", -70.716667, -33.599998, -4.00, 115],
["Rancagua", "Chile", -70.750000, -34.166668, -4.00, 115],
["vina causino", "Chile", -70.583336, -33.616665, -4.00, 115],
["Iquique", "Chile", -70.166664, -20.216667, -4.00, 115],
["Concepcion", "Chile", -73.050003, -36.833332, -4.00, 115],
["Antofagasta", "Chile", -70.400002, -23.650000, -4.00, 115],
["Yoko", "Cameroon", 12.316667, 5.533333, 1.00, 117],
["Yokadouma", "Cameroon", 15.050000, 3.516667, 1.00, 117],
["Yaounde", "Cameroon", 11.516666, 3.866667, 1.00, 117],
["Ngaoundere", "Cameroon", 13.583333, 7.316667, 1.00, 117],
["Mokolo", "Cameroon", 13.802778, 10.740278, 1.00, 117],
["Maroua", "Cameroon", 14.324722, 10.595555, 1.00, 117],
["Kousseri", "Cameroon", 15.030833, 12.078333, 1.00, 117],
["Garoua", "Cameroon", 13.400000, 9.300000, 1.00, 117],
["Edea", "Cameroon", 10.133333, 3.800000, 1.00, 117],
["Douala", "Cameroon", 9.700000, 4.050278, 1.00, 117],
["Bertoua", "Cameroon", 13.683333, 4.583333, 1.00, 117],
["Bamenda", "Cameroon", 10.166667, 5.933333, 1.00, 117],
["Bafoussam", "Cameroon", 10.416667, 5.466667, 1.00, 117],
["Suzhou", "China", 98.566666, 39.766666, 8.00, 121],
["Shache", "China", 77.240555, 38.416668, 8.00, 122],
["Lhasa", "China", 91.099998, 29.650000, 8.00, 120],
["Kashi", "China", 75.979721, 39.454723, 8.00, 122],
["Urumqi", "China", 87.583336, 43.799999, 8.00, 121],
["Turpan", "China", 89.166664, 42.933334, 8.00, 121],
["Shihezi", "China", 86.033333, 44.299999, 8.00, 121],
["Aral", "China", 81.263611, 40.515556, 8.00, 122],
["Aksu", "China", 80.264442, 41.123055, 8.00, 122],
["Zunyi", "China", 106.907219, 27.686666, 8.00, 120],
["Zigong", "China", 104.783333, 29.400000, 8.00, 120],
["Zhuzhou", "China", 113.150002, 27.833334, 8.00, 120],
["Zhumadian", "China", 114.029442, 32.979443, 8.00, 118],
["Zhoukou", "China", 114.633331, 33.633335, 8.00, 118],
["Zhenjiang", "China", 119.434166, 32.209167, 8.00, 118],
["Zhengzhou", "China", 113.648613, 34.757778, 8.00, 118],
["Zhaoqing", "China", 112.449997, 23.049999, 8.00, 120],
["Zhanjiang", "China", 110.383331, 21.200001, 8.00, 120],
["Zhangzhou", "China", 117.655556, 24.513332, 8.00, 118],
["Zibo", "China", 118.063332, 36.790554, 8.00, 118],
["Anyang", "China", 114.328888, 36.099445, 8.00, 118],
["Yunfu", "China", 112.033333, 22.933332, 8.00, 120],
["Yuncheng", "China", 110.992775, 35.023056, 8.00, 120],
["Yuci", "China", 112.731941, 37.680279, 8.00, 120],
["Yingcheng", "China", 113.550003, 30.950001, 8.00, 120],
["Yinchuan", "China", 106.273056, 38.468056, 8.00, 120],
["Yichang", "China", 111.284721, 30.714445, 8.00, 120],
["Yibin", "China", 104.566666, 28.766666, 8.00, 120],
["Yantai", "China", 121.400002, 37.533333, 8.00, 118],
["Yangzhou", "China", 119.435837, 32.397221, 8.00, 118],
["Yangquan", "China", 113.563332, 37.857498, 8.00, 118],
["Yancheng", "China", 120.125275, 33.385555, 8.00, 118],
["Xuzhou", "China", 117.191666, 34.266945, 8.00, 118],
["Xuri", "China", 117.966667, 28.466667, 8.00, 118],
["Xuchang", "China", 113.816666, 34.016666, 8.00, 118],
["Xinyang", "China", 114.065559, 32.122776, 8.00, 118],
["Xinxiang", "China", 113.867226, 35.308887, 8.00, 118],
["Xintai", "China", 117.751945, 35.900555, 8.00, 118],
["Xinpu", "China", 119.159447, 34.599724, 8.00, 118],
["Xining", "China", 101.766670, 36.616665, 8.00, 120],
["Xingtai", "China", 114.494164, 37.063057, 8.00, 118],
["Xianyang", "China", 108.714722, 34.345554, 8.00, 120],
["Xiantao", "China", 113.400002, 30.383333, 8.00, 120],
["Zhuhai", "China", 113.567780, 22.276945, 8.00, 120],
["Xiangtan", "China", 112.900002, 27.850000, 8.00, 120],
["Xiangfan", "China", 112.144997, 32.041668, 8.00, 120],
["Xi'an", "China", 108.928612, 34.258335, 8.00, 120],
["Xiamen", "China", 118.093056, 24.467501, 8.00, 118],
["Wuzhou", "China", 111.316666, 23.483334, 8.00, 120],
["Wuxue", "China", 115.550003, 29.850000, 8.00, 118],
["Wuxi", "China", 120.293892, 31.577223, 8.00, 118],
["Changde", "China", 111.678055, 29.032223, 8.00, 120],
["Wuhu", "China", 118.366669, 31.350000, 8.00, 118],
["Wuhan", "China", 114.266670, 30.583334, 8.00, 118],
["Wuhai", "China", 106.812225, 39.664722, 8.00, 120],
["Wenzhou", "China", 120.654442, 28.019167, 8.00, 118],
["Weifang", "China", 119.101944, 36.709999, 8.00, 118],
["Wafangdian", "China", 122.008057, 39.618332, 8.00, 119],
["Tongling", "China", 117.783333, 30.950001, 8.00, 118],
["Tianjin", "China", 117.176666, 39.142223, 8.00, 118],
["Tangshan", "China", 118.183334, 39.633335, 8.00, 119],
["Tanggu", "China", 117.646942, 39.021111, 8.00, 118],
["Taizhou", "China", 119.908058, 32.493332, 8.00, 118],
["Taiyuan", "China", 112.560280, 37.869446, 8.00, 120],
["Tai'an", "China", 117.120003, 36.185276, 8.00, 118],
["Suzhou", "China", 116.978889, 33.636112, 8.00, 118],
["Suizhou", "China", 113.363052, 31.711111, 8.00, 120],
["Shiyan", "China", 110.778053, 32.647499, 8.00, 120],
["Shiyan", "China", 110.783333, 32.566666, 8.00, 120],
["Shiqi", "China", 113.366112, 22.517500, 8.00, 120],
["Tongchuan", "China", 109.089722, 35.080555, 8.00, 120],
["Shijiazhuang", "China", 114.478615, 38.041389, 8.00, 118],
["Shenzhen", "China", 114.068298, 22.545538, 8.00, 120],
["Shashi", "China", 112.244720, 30.307222, 8.00, 120],
["Shaoxing", "China", 120.581108, 30.001667, 8.00, 118],
["Shaoguan", "China", 113.583336, 24.799999, 8.00, 120],
["Shantou", "China", 116.678337, 23.360001, 8.00, 118],
["Shanghai", "China", 121.458054, 31.222221, 8.00, 118],
["Sanming", "China", 117.618614, 26.248611, 8.00, 118],
["Jieyang", "China", 116.365555, 23.529722, 8.00, 118],
["Rizhao", "China", 119.455276, 35.427502, 8.00, 118],
["Qinhuangdao", "China", 119.588333, 39.931667, 8.00, 119],
["Huaiyin", "China", 119.019165, 33.588612, 8.00, 118],
["Qingdao", "China", 120.371941, 36.098610, 8.00, 118],
["Puyang", "China", 115.005280, 35.702778, 8.00, 118],
["Putian", "China", 119.010277, 25.439444, 8.00, 118],
["Pingxiang", "China", 113.849998, 27.616667, 8.00, 120],
["Pingdingshan", "China", 113.306389, 33.740833, 8.00, 120],
["Panzhihua", "China", 101.733330, 26.549999, 8.00, 120],
["Ningbo", "China", 121.541946, 29.875000, 8.00, 118],
["Neijiang", "China", 105.059166, 29.583611, 8.00, 120],
["Nanyang", "China", 112.532776, 32.994720, 8.00, 120],
["Nantong", "China", 120.874725, 32.030277, 8.00, 118],
["Nanning", "China", 108.316666, 22.816668, 8.00, 120],
["Nanjing", "China", 118.777779, 32.061668, 8.00, 118],
["Nanchong", "China", 106.066666, 30.799999, 8.00, 120],
["Nanchang", "China", 115.883331, 28.683332, 8.00, 118],
["Mianyang", "China", 104.766670, 31.466667, 8.00, 120],
["Luqiaozhen", "China", 121.378334, 28.578890, 8.00, 118],
["Luoyang", "China", 112.453613, 34.683613, 8.00, 120],
["Luohe", "China", 114.035278, 33.571667, 8.00, 118],
["Luancheng", "China", 114.651665, 37.879166, 8.00, 118],
["Linyi", "China", 118.342781, 35.063057, 8.00, 118],
["Linxia", "China", 103.206390, 35.600277, 8.00, 120],
["Linfen", "China", 111.518890, 36.088890, 8.00, 120],
["Liaocheng", "China", 115.964722, 36.443890, 8.00, 118],
["Laohekou", "China", 111.667778, 32.385834, 8.00, 120],
["Lanzhou", "China", 103.792221, 36.056389, 8.00, 120],
["Langfang", "China", 116.694725, 39.509724, 8.00, 118],
["Kunming", "China", 102.718330, 25.038889, 8.00, 120],
["Kaifeng", "China", 114.348335, 34.791111, 8.00, 118],
["Jiujiang", "China", 115.983330, 29.733334, 8.00, 118],
["Jinzhou", "China", 121.716667, 39.099998, 8.00, 119],
["Jining, Shandong", "China", 116.581390, 35.404999, 8.00, 118],
["Jingling", "China", 113.099998, 30.650000, 8.00, 120],
["Jingdezhen", "China", 117.202225, 29.289722, 8.00, 118],
["Jincheng", "China", 112.832779, 35.502224, 8.00, 120],
["Jinan", "China", 116.997223, 36.668335, 8.00, 118],
["Jiaxing", "China", 120.748337, 30.765556, 8.00, 118],
["Jiaozuo", "China", 113.233055, 35.239723, 8.00, 118],
["Jiangmen", "China", 113.083336, 22.583334, 8.00, 120],
["Yangjiang", "China", 111.966667, 21.850000, 8.00, 120],
["Ji'an", "China", 115.000000, 27.133333, 8.00, 118],
["Guangyuan", "China", 105.821388, 32.440277, 8.00, 120],
["Huizhou", "China", 114.400002, 23.083334, 8.00, 120],
["Huangshi", "China", 115.099998, 30.216667, 8.00, 118],
["Huanggang", "China", 117.003334, 23.675278, 8.00, 118],
["Huainan", "China", 116.996941, 32.626389, 8.00, 118],
["Huaibei", "China", 116.791664, 33.974445, 8.00, 118],
["Heze", "China", 115.441109, 35.243057, 8.00, 118],
["Yiyang", "China", 112.328331, 28.589167, 8.00, 120],
["Hengyang", "China", 112.614998, 26.888056, 8.00, 120],
["Hengshui", "China", 115.701111, 37.732224, 8.00, 118],
["Hefei", "China", 117.280830, 31.863890, 8.00, 118],
["Hebi", "China", 114.192497, 35.899166, 8.00, 118],
["Hangzhou", "China", 120.168892, 30.255278, 8.00, 118],
["Hangu", "China", 117.789169, 39.248890, 8.00, 118],
["Handan", "China", 114.467781, 36.600555, 8.00, 118],
["Jiaojiang", "China", 121.442780, 28.680277, 8.00, 118],
["Haikou", "China", 110.341667, 20.045834, 8.00, 120],
["Guli", "China", 120.033333, 28.883333, 8.00, 118],
["Guiyang", "China", 106.716667, 26.583334, 8.00, 120],
["Guilin", "China", 110.286392, 25.281944, 8.00, 120],
["Guangzhou", "China", 113.250000, 23.116667, 8.00, 120],
["Gaoping", "China", 106.133331, 30.783333, 8.00, 120],
["Fuzhou", "China", 119.306114, 26.061388, 8.00, 118],
["Foshan", "China", 113.116669, 23.033333, 8.00, 120],
["Dongying", "China", 118.485558, 37.456390, 8.00, 118],
["Dongguan", "China", 113.744720, 23.048889, 8.00, 120],
["Dezhou", "China", 116.292503, 37.448612, 8.00, 118],
["Daliang", "China", 113.245277, 22.840834, 8.00, 120],
["Dalian", "China", 121.602219, 38.912224, 8.00, 118],
["Chuzhou", "China", 118.297775, 32.321945, 8.00, 118],
["Chongqing", "China", 106.552780, 29.562778, 8.00, 120],
["Chengdu", "China", 104.066666, 30.666666, 8.00, 120],
["Chaozhou", "China", 116.639999, 23.665833, 8.00, 118],
["Changzhou", "China", 119.966667, 31.783333, 8.00, 118],
["Changzhi", "China", 111.738609, 35.208889, 8.00, 120],
["Changsha", "China", 112.966667, 28.200001, 8.00, 120],
["Cangzhou", "China", 116.866669, 38.316666, 8.00, 118],
["Bengbu", "China", 117.360832, 32.940834, 8.00, 118],
["Beijing", "China", 116.388336, 39.928890, 8.00, 119],
["Beihai", "China", 109.099998, 21.483334, 8.00, 120],
["Baoding", "China", 115.490280, 38.851112, 8.00, 118],
["Anshun", "China", 105.933334, 26.250000, 8.00, 120],
["Anqing", "China", 117.050552, 30.509167, 8.00, 118],
["Suzhou", "China", 120.618057, 31.311388, 8.00, 118],
["Zhangjiakou", "China", 114.879448, 40.810001, 8.00, 119],
["Yingkou", "China", 122.224724, 40.668056, 8.00, 119],
["Yanji", "China", 129.507782, 42.907501, 8.00, 119],
["Xuanhua", "China", 115.044724, 40.610279, 8.00, 119],
["Tongliao", "China", 122.265274, 43.612499, 8.00, 119],
["Tieling", "China", 123.841393, 42.293056, 8.00, 119],
["Suihua", "China", 126.996941, 46.640556, 8.00, 119],
["Siping", "China", 124.368614, 43.163334, 8.00, 119],
["Shuangyashan", "China", 131.153885, 46.636112, 8.00, 119],
["Shenyang", "China", 123.432777, 41.792221, 8.00, 119],
["Ranghulu", "China", 124.866669, 46.650002, 8.00, 119],
["Qitaihe", "China", 130.850006, 45.799999, 8.00, 119],
["Qiqihar", "China", 123.967224, 47.340832, 8.00, 119],
["Panshan", "China", 122.049446, 41.188057, 8.00, 119],
["Mudanjiang", "China", 129.600006, 44.583332, 8.00, 119],
["Liaoyuan", "China", 125.135834, 42.903610, 8.00, 119],
["Liaoyang", "China", 123.173058, 41.271946, 8.00, 119],
["Jixi", "China", 130.966660, 45.299999, 8.00, 119],
["Jinzhou, Liaoning", "China", 121.141670, 41.107777, 8.00, 119],
["Jinxi", "China", 120.833336, 40.750000, 8.00, 119],
["Jining, Inner Mongolia", "China", 113.105835, 41.027500, 8.00, 119],
["Jilin", "China", 126.560280, 43.850834, 8.00, 119],
["Jiamusi", "China", 130.350006, 46.833332, 8.00, 119],
["Hulan Ergi", "China", 123.633331, 47.204166, 8.00, 119],
["Hohhot", "China", 111.652222, 40.810555, 8.00, 120],
["Hegang", "China", 130.366669, 47.400002, 8.00, 119],
["Harbin", "China", 126.650002, 45.750000, 8.00, 119],
["Hailar", "China", 119.699997, 49.200001, 8.00, 119],
["Fuxin", "China", 121.658890, 42.015556, 8.00, 119],
["Fushun", "China", 123.923332, 41.855835, 8.00, 119],
["Datong", "China", 113.291389, 40.093613, 8.00, 118],
["Daqing", "China", 125.000000, 46.583332, 8.00, 119],
["Dandong", "China", 124.394722, 40.129166, 8.00, 119],
["Chifeng", "China", 118.963608, 42.268333, 8.00, 119],
["Chengde", "China", 117.936111, 40.972500, 8.00, 119],
["Chaoyang", "China", 120.458611, 41.570278, 8.00, 119],
["Changchun", "China", 125.322777, 43.880001, 8.00, 119],
["Benxi", "China", 123.764999, 41.288612, 8.00, 119],
["Baotou", "China", 109.822220, 40.652222, 8.00, 120],
["Baicheng", "China", 122.816666, 45.616665, 8.00, 119],
["Anshan", "China", 122.989998, 41.123611, 8.00, 119],
["Zipaquira", "Colombia", -74.005836, 5.028333, -5.00, 123],
["Zarzal", "Colombia", -76.077225, 4.398333, -5.00, 123],
["Zaragoza", "Colombia", -74.871109, 7.494167, -5.00, 123],
["Villavicencio", "Colombia", -73.635002, 4.153333, -5.00, 123],
["Valledupar", "Colombia", -73.250557, 10.476944, -5.00, 123],
["Soledad", "Colombia", -74.766670, 10.917222, -5.00, 123],
["Soacha", "Colombia", -74.221390, 4.587222, -5.00, 123],
["Sincelejo", "Colombia", -75.397781, 9.304722, -5.00, 123],
["Santa Marta", "Colombia", -74.201668, 11.247222, -5.00, 123],
["Pereira", "Colombia", -75.696114, 4.813334, -5.00, 123],
["Pasto", "Colombia", -77.281113, 1.213611, -5.00, 123],
["Palmira", "Colombia", -76.303612, 3.539444, -5.00, 123],
["Neiva", "Colombia", -75.330276, 2.930556, -5.00, 123],
["Monteria", "Colombia", -75.889999, 8.757500, -5.00, 123],
["Medellin", "Colombia", -75.536110, 6.291389, -5.00, 123],
["Manizales", "Colombia", -75.520554, 5.070000, -5.00, 123],
["Itagui", "Colombia", -75.611389, 6.171945, -5.00, 123],
["Ibague", "Colombia", -75.232224, 4.438889, -5.00, 123],
["Floridablanca", "Colombia", -73.089722, 7.064722, -5.00, 123],
["Cucuta", "Colombia", -72.505280, 7.883333, -5.00, 123],
["Cartagena", "Colombia", -75.514442, 10.399722, -5.00, 123],
["Cali", "Colombia", -76.522499, 3.437222, -5.00, 123],
["Buenaventura", "Colombia", -77.069725, 3.893333, -5.00, 123],
["Buenaventura", "Colombia", -77.000000, 3.583333, -5.00, 123],
["Bucaramanga", "Colombia", -73.125832, 7.129722, -5.00, 123],
["Bogota", "Colombia", -74.083336, 4.600000, -5.00, 123],
["Bello", "Colombia", -75.562225, 6.338889, -5.00, 123],
["Barranquilla", "Colombia", -74.796387, 10.963889, -5.00, 123],
["Armenia", "Colombia", -75.681114, 4.533889, -5.00, 123],
["Turrialba", "Costa Rica", -83.683334, 9.900000, -6.00, 124],
["Tres Rios", "Costa Rica", -83.983330, 9.900000, -6.00, 124],
["Tilaran", "Costa Rica", -84.966667, 10.466667, -6.00, 124],
["San Jose", "Costa Rica", -84.083336, 9.933333, -6.00, 124],
["Zaza del Medio", "Cuba", -79.366943, 21.996111, -5.00, 125],
["Yara", "Cuba", -76.953331, 20.275278, -5.00, 125],
["Yaguajay", "Cuba", -79.237778, 22.327223, -5.00, 125],
["Santiago de Cuba", "Cuba", -75.821945, 20.024723, -5.00, 125],
["Santa Clara", "Cuba", -79.966667, 22.400000, -5.00, 125],
["Las Tunas", "Cuba", -76.951111, 20.961666, -5.00, 125],
["Havana", "Cuba", -82.364166, 23.131945, -5.00, 125],
["Holguin", "Cuba", -76.263054, 20.887222, -5.00, 125],
["Guantanamo", "Cuba", -75.209167, 20.144444, -5.00, 125],
["Camaguey", "Cuba", -77.916946, 21.380833, -5.00, 125],
["Vila da Ribeira Brava", "Cape Verde", -24.299999, 16.616667, -1.00, 126],
["Tarrafal", "Cape Verde", -23.766666, 15.283333, -1.00, 126],
["Sao Filipe", "Cape Verde", -24.516666, 14.900000, -1.00, 126],
["Ypsonas", "Cyprus", 32.958332, 34.683334, 2.00, 128],
["Yeri", "Cyprus", 33.416668, 35.099998, 2.00, 128],
["Xeri", "Cyprus", 33.320835, 35.075001, 2.00, 128],
["Nicosia", "Cyprus", 33.366665, 35.166668, 2.00, 128],
["Dvur Kralove nad Labem", "Czech", 15.814021, 50.431721, 1.00, 129],
["Zubri", "Czech", 18.092485, 49.466026, 1.00, 129],
["Znojmo", "Czech", 16.048798, 48.855499, 1.00, 129],
["Praha", "Czech", 14.424132, 50.087837, 1.00, 129],
["Ostrava", "Czech", 18.282043, 49.834644, 1.00, 129],
["Brno", "Czech", 16.599689, 49.195190, 1.00, 129],
["Zwonitz", "Germany", 12.800000, 50.633335, 1.00, 130],
["Zwingenberg", "Germany", 8.618611, 49.726387, 1.00, 130],
["Zwiesel", "Germany", 13.233334, 49.016666, 1.00, 130],
["Wuppertal", "Germany", 7.183333, 51.266666, 1.00, 130],
["Wiesbaden", "Germany", 8.250000, 50.083332, 1.00, 130],
["Wahren", "Germany", 12.333333, 51.366665, 1.00, 130],
["Stuttgart", "Germany", 9.183333, 48.766666, 1.00, 130],
["Oberhausen", "Germany", 6.850000, 51.466667, 1.00, 130],
["Nuernberg", "Germany", 11.068334, 49.447777, 1.00, 130],
["Neustadt", "Germany", 11.633333, 52.150002, 1.00, 130],
["Munster", "Germany", 7.625713, 51.962357, 1.00, 130],
["Munich", "Germany", 11.574354, 48.137684, 1.00, 130],
["Monchengladbach", "Germany", 6.433333, 51.200001, 1.00, 130],
["Mannheim", "Germany", 8.464723, 49.488335, 1.00, 130],
["Lubeck", "Germany", 10.687294, 53.868927, 1.00, 130],
["Leipzig", "Germany", 12.369919, 51.337799, 1.00, 130],
["Krefeld", "Germany", 6.566667, 51.333332, 1.00, 130],
["Koeln", "Germany", 6.950000, 50.933334, 1.00, 130],
["Kiel", "Germany", 10.133333, 54.333332, 1.00, 130],
["Karlsruhe", "Germany", 8.385834, 49.004723, 1.00, 130],
["Hannover", "Germany", 9.733222, 52.370518, 1.00, 130],
["Hamburg", "Germany", 10.000000, 53.549999, 1.00, 130],
["Halle-Neustadt", "Germany", 11.933333, 51.483334, 1.00, 130],
["Halle", "Germany", 12.000000, 51.500000, 1.00, 130],
["Gelsenkirchen-Alt", "Germany", 7.116667, 51.516666, 1.00, 130],
["Freiburg", "Germany", 7.852221, 47.995895, 1.00, 130],
["Frankfurt am Main", "Germany", 8.683333, 50.116665, 1.00, 130],
["Essen", "Germany", 7.016667, 51.450001, 1.00, 130],
["Erfurt", "Germany", 11.033333, 50.983334, 1.00, 130],
["Dusseldorf", "Germany", 6.776161, 51.221722, 1.00, 130],
["Duisburg", "Germany", 6.750000, 51.433334, 1.00, 130],
["Dresden", "Germany", 13.738317, 51.050892, 1.00, 130],
["Dortmund", "Germany", 7.450000, 51.516666, 1.00, 130],
["Chemnitz", "Germany", 12.916667, 50.833332, 1.00, 130],
["Bremen", "Germany", 8.807774, 53.075157, 1.00, 130],
["Braunschweig", "Germany", 10.533333, 52.266666, 1.00, 130],
["Bonn", "Germany", 7.100000, 50.733334, 1.00, 130],
["Bochum", "Germany", 7.216667, 51.483334, 1.00, 130],
["Bielefeld", "Germany", 8.533333, 52.033333, 1.00, 130],
["Berlin", "Germany", 13.400000, 52.516666, 1.00, 130],
["Augsburg", "Germany", 10.883333, 48.366665, 1.00, 130],
["Kreisfreie Stadt Aachen", "Germany", 6.105278, 50.770832, 1.00, 130],
["Tadjoura", "Djibouty", 42.884445, 11.785277, 3.00, 131],
["Obock", "Djibouty", 43.290554, 11.963056, 3.00, 131],
["Djibouti", "Djibouty", 43.148056, 11.595000, 3.00, 131],
["Vordingborg", "Denmark", 11.916667, 55.016666, 1.00, 132],
["Vojens", "Denmark", 9.316667, 55.250000, 1.00, 132],
["Vejle", "Denmark", 9.533333, 55.700001, 1.00, 132],
["Copenhagen", "Denmark", 12.583333, 55.666668, 1.00, 132],
["Arhus", "Denmark", 10.216667, 56.150002, 1.00, 132],
["Roseau", "Dominica", -61.400002, 15.300000, -4.00, 133],
["Yayas de Viajama", "Dominican Republic", -70.916664, 18.600000, -4.00, 134],
["Yamasa", "Dominican Republic", -70.016670, 18.766666, -4.00, 134],
["Yaguate", "Dominican Republic", -70.183334, 18.333334, -4.00, 134],
["Santo Domingo", "Dominican Republic", -69.900002, 18.466667, -4.00, 134],
["Santiago de los Caballeros", "Dominican Republic", -70.699997, 19.450001, -4.00, 134],
["San Pedro de Macoris", "Dominican Republic", -69.300003, 18.450001, -4.00, 134],
["La Romana", "Dominican Republic", -68.966667, 18.416666, -4.00, 134],
["Zeribet el Oued", "Algeria", 6.516667, 34.683334, 1.00, 135],
["Zeralda", "Algeria", 2.843333, 36.714722, 1.00, 135],
["Zemmora", "Algeria", 0.760000, 35.722500, 1.00, 135],
["Oran", "Algeria", -0.641667, 35.691113, 1.00, 135],
["Constantine", "Algeria", 6.614722, 36.365002, 1.00, 135],
["Batna", "Algeria", 6.174145, 35.555969, 1.00, 135],
["Bab Ezzouar", "Algeria", 3.183333, 36.716667, 1.00, 135],
["Annaba", "Algeria", 7.766667, 36.900002, 1.00, 135],
["Algiers", "Algeria", 3.050556, 36.763054, 1.00, 135],
["Zaruma", "Ecuador", -79.616669, -3.683333, -5.00, 136],
["Zamora", "Ecuador", -78.956665, -4.069167, -5.00, 136],
["Yantzaza", "Ecuador", -78.759445, -3.827778, -5.00, 136],
["Santo Domingo de los Colorados", "Ecuador", -79.150002, -0.250000, -5.00, 136],
["Quito", "Ecuador", -78.500000, -0.216667, -5.00, 136],
["Guayaquil", "Ecuador", -79.900002, -2.166667, -5.00, 136],
["Cuenca", "Ecuador", -78.983330, -2.883333, -5.00, 136],
["Voru", "Estonia", 27.019444, 57.833889, 2.00, 138],
["Viljandi", "Estonia", 25.590000, 58.363888, 2.00, 138],
["Valga", "Estonia", 26.045279, 57.774445, 2.00, 138],
["Tallinn", "Estonia", 24.728056, 59.433887, 2.00, 138],
["Zifta", "Egypt", 31.243889, 30.713612, 2.00, 139],
["Tukh", "Egypt", 31.158056, 30.348333, 2.00, 139],
["Tanta", "Egypt", 30.998056, 30.791111, 2.00, 139],
["Suhaj", "Egypt", 31.700001, 26.549999, 2.00, 139],
["Qina", "Egypt", 32.727222, 26.170000, 2.00, 139],
["Kafr ad Dawwar", "Egypt", 30.129168, 31.139723, 2.00, 139],
["Damanhur", "Egypt", 30.466667, 31.033333, 2.00, 139],
["Az Zaqaziq", "Egypt", 31.510279, 30.591389, 2.00, 139],
["Asyut", "Egypt", 31.182777, 27.182777, 2.00, 139],
["Aswan", "Egypt", 32.898888, 24.087500, 2.00, 139],
["Suez", "Egypt", 32.549999, 29.966667, 2.00, 139],
["Luxor", "Egypt", 32.650002, 25.683332, 2.00, 139],
["Cairo", "Egypt", 31.250000, 30.049999, 2.00, 139],
["Al Minya", "Egypt", 30.744444, 28.119444, 2.00, 139],
["Al Mansurah", "Egypt", 31.376667, 31.043056, 2.00, 139],
["Al Mahallah al Kubra", "Egypt", 31.166945, 30.976110, 2.00, 139],
["Al Jizah", "Egypt", 31.212223, 30.008612, 2.00, 139],
["Ismailia", "Egypt", 32.277222, 30.605278, 2.00, 139],
["Alexandria", "Egypt", 29.919167, 31.198055, 2.00, 139],
["Al Fayyum", "Egypt", 30.840000, 29.307777, 2.00, 139],
["Bur Sa`id", "Egypt", 32.300491, 31.259769, 2.00, 139],
["Ejbei Uad el Aabd", "Western Sahara", -13.162500, 27.135000, 0.00, 140],
["Idi", "Eritrea", 41.692501, 13.929722, 3.00, 141],
["Dekemhare", "Eritrea", 39.047501, 15.070000, 3.00, 141],
["Barentu", "Eritrea", 37.592777, 15.113889, 3.00, 141],
["Asmara", "Eritrea", 38.933334, 15.333333, 3.00, 141],
["Zubia", "Spain", -3.583333, 37.116665, 1.00, 143],
["Zafra", "Spain", -6.416667, 38.416668, 1.00, 142],
["Yecla", "Spain", -1.116667, 38.616665, 1.00, 142],
["Valencia", "Spain", -0.377387, 39.469753, 1.00, 142],
["Sevilla", "Spain", -5.986944, 37.377224, 1.00, 143],
["Santa Cruz de Tenerife", "Spain", -16.254616, 28.468239, 0.00, 144],
["Palma", "Spain", 2.650237, 39.569389, 1.00, 142],
["Murcia", "Spain", -1.116667, 37.983334, 1.00, 142],
["Malaga", "Spain", -4.420345, 36.720158, 1.00, 143],
["Las Palmas de Gran Canaria", "Spain", -15.416667, 28.100000, 0.00, 144],
["Granada", "Spain", -3.606670, 37.188168, 1.00, 143],
["Elx", "Spain", -0.701065, 38.262177, 1.00, 142],
["Cordoba", "Spain", -4.766667, 37.883335, 1.00, 142],
["Cartagena", "Spain", -0.983333, 37.599998, 1.00, 142],
["Alacant", "Spain", -0.481489, 38.345173, 1.00, 142],
["Zaragoza", "Spain", -0.877340, 41.656063, 1.00, 142],
["Vitoria-Gasteiz", "Spain", -2.666667, 42.849998, 1.00, 142],
["Vigo", "Spain", -8.716667, 42.233334, 1.00, 142],
["Valladolid", "Spain", -4.716667, 41.650002, 1.00, 142],
["Oviedo", "Spain", -5.833333, 43.366665, 1.00, 142],
["Mostoles", "Spain", -3.864956, 40.322334, 1.00, 142],
["Madrid", "Spain", -3.702564, 40.416504, 1.00, 142],
["A Coruna", "Spain", -8.396001, 43.371349, 1.00, 142],
["l'Hospitalet de Llobregat", "Spain", 2.100277, 41.359673, 1.00, 142],
["Gijon", "Spain", -5.664444, 43.541111, 1.00, 142],
["Bilbao", "Spain", -2.925282, 43.262707, 1.00, 142],
["Barcelona", "Spain", 2.158985, 41.388786, 1.00, 142],
["Badalona", "Spain", 2.247412, 41.450047, 1.00, 142],
["Eixample", "Spain", 2.161790, 41.388954, 1.00, 142],
["Sant Marti", "Spain", 2.199326, 41.418144, 1.00, 142],
["Ziway", "Ethiopia", 38.716667, 7.933333, 3.00, 145],
["Yirga `Alem", "Ethiopia", 38.416668, 6.750000, 3.00, 145],
["Yabelo", "Ethiopia", 38.083332, 4.883333, 3.00, 145],
["Nazret", "Ethiopia", 39.266666, 8.550000, 3.00, 145],
["Dire Dawa", "Ethiopia", 41.866112, 9.593056, 3.00, 145],
["Addis Ababa", "Ethiopia", 38.700001, 9.033333, 3.00, 145],
["Ylojarvi", "Finland", 23.600000, 61.549999, 2.00, 146],
["Ylivieska", "Finland", 24.549999, 64.083336, 2.00, 146],
["Ylitornio", "Finland", 23.666666, 66.300003, 2.00, 146],
["Tampere", "Finland", 23.750000, 61.500000, 2.00, 146],
["Helsinki", "Finland", 24.934166, 60.175556, 2.00, 146],
["Espoo", "Finland", 24.666666, 60.216667, 2.00, 146],
["Lambasa", "Fiji", 179.383331, -16.416666, 12.00, 147],
["Colonia", "Ponape", 138.129166, 9.514444, 11.00, 150],
["Weno", "Ponape", 151.850006, 7.445833, 11.00, 150],
["Toynim", "Ponape", 163.003616, 5.314722, 11.00, 151],
["Torshavn", "Faroe", -6.766667, 62.016666, 0.00, 152],
["Blaye", "France", -0.666667, 45.133335, 1.00, 153],
["Yzeure", "France", 3.350000, 46.566666, 1.00, 153],
["Yvetot", "France", 0.766667, 49.616665, 1.00, 153],
["Toulouse", "France", 1.443672, 43.604263, 1.00, 153],
["Strasbourg", "France", 7.750000, 48.583332, 1.00, 153],
["Rennes", "France", -1.683333, 48.083332, 1.00, 153],
["Paris", "France", 2.333333, 48.866665, 1.00, 153],
["Nice", "France", 7.250000, 43.700001, 1.00, 153],
["Nantes", "France", -1.550000, 47.216667, 1.00, 153],
["Montpellier", "France", 3.883333, 43.599998, 1.00, 153],
["Marseille", "France", 5.400000, 43.299999, 1.00, 153],
["Lyon", "France", 4.850000, 45.750000, 1.00, 153],
["Lille", "France", 3.066667, 50.633335, 1.00, 153],
["Bordeaux", "France", -0.566667, 44.833332, 1.00, 153],
["Tchibanga", "Gabon", 11.033333, -2.850000, 1.00, 154],
["Port-Gentil", "Gabon", 8.783333, -0.716667, 1.00, 154],
["Oyem", "Gabon", 11.583333, 1.616667, 1.00, 154],
["Libreville", "Gabon", 9.450000, 0.383333, 1.00, 154],
["Ystalyfera", "United Kingdom", -3.783333, 51.750000, 0.00, 155],
["York", "United Kingdom", -1.083333, 53.966667, 0.00, 155],
["Yeovil", "United Kingdom", -2.633333, 50.950001, 0.00, 155],
["Wolverhampton", "United Kingdom", -2.133333, 52.583332, 0.00, 155],
["Stoke-on-Trent", "United Kingdom", -2.183333, 53.000000, 0.00, 155],
["Southampton", "United Kingdom", -1.400000, 50.900002, 0.00, 155],
["Sheffield", "United Kingdom", -1.465902, 53.382969, 0.00, 155],
["Reading", "United Kingdom", -1.000000, 51.433334, 0.00, 155],
["Plymouth", "United Kingdom", -4.140000, 50.369999, 0.00, 155],
["Nottingham", "United Kingdom", -1.166667, 52.966667, 0.00, 155],
["Manchester", "United Kingdom", -2.237434, 53.480946, 0.00, 155],
["London", "United Kingdom", -0.125533, 51.508415, 0.00, 155],
["Liverpool", "United Kingdom", -3.000000, 53.416668, 0.00, 155],
["Leicester", "United Kingdom", -1.133333, 52.633335, 0.00, 155],
["Leeds", "United Kingdom", -1.553192, 53.794163, 0.00, 155],
["Kingston upon Hull", "United Kingdom", -0.326157, 53.740387, 0.00, 155],
["Glasgow", "United Kingdom", -4.250000, 55.833332, 0.00, 155],
["Edinburgh", "United Kingdom", -3.200000, 55.950001, 0.00, 155],
["Derby", "United Kingdom", -1.500000, 52.933334, 0.00, 155],
["Coventry", "United Kingdom", -1.550000, 52.416668, 0.00, 155],
["Caerdydd", "United Kingdom", -3.200000, 51.500000, 0.00, 155],
["Bristol", "United Kingdom", -2.583333, 51.450001, 0.00, 155],
["Bradford", "United Kingdom", -1.750000, 53.783333, 0.00, 155],
["Birmingham", "United Kingdom", -1.916667, 52.466667, 0.00, 155],
["Belfast", "United Kingdom", -5.933333, 54.583332, 0.00, 155],
["Zugdidi", "Georgia", 41.869167, 42.512222, 4.00, 157],
["Tsnori", "Georgia", 45.971943, 41.616943, 4.00, 157],
["Tsalenjikha", "Georgia", 42.077221, 42.604443, 4.00, 157],
["Tbilisi", "Georgia", 44.790833, 41.724998, 4.00, 157],
["Saint-Laurent-du-Maroni", "French Guiana", -54.033333, 5.500000, -3.00, 158],
["Remire-Montjoly", "French Guiana", -52.266666, 4.916667, -3.00, 158],
["Matoury", "French Guiana", -52.333332, 4.850000, -3.00, 158],
["Yendi", "Ghana", -0.016667, 9.433333, 0.00, 160],
["Winneba", "Ghana", -0.616667, 5.333333, 0.00, 160],
["Wenchi", "Ghana", -2.100000, 7.733333, 0.00, 160],
["Tamale", "Ghana", -0.833333, 9.400000, 0.00, 160],
["Takoradi", "Ghana", -1.750000, 4.883333, 0.00, 160],
["Kumasi", "Ghana", -1.616667, 6.683333, 0.00, 160],
["Achiaman", "Ghana", -0.333333, 5.700000, 0.00, 160],
["Accra", "Ghana", -0.216667, 5.550000, 0.00, 160],
["Gibraltar", "Gibraltar", -5.350000, 36.133335, 1.00, 161],
["Sisimiut", "Greenland", -53.683334, 66.933334, -3.00, 162],
["Nuuk", "Greenland", -51.750000, 64.183334, -3.00, 162],
["Tasiilaq", "Greenland", -37.633335, 65.599998, -3.00, 162],
["Sukuta", "Gambia", -16.708889, 13.411389, 0.00, 166],
["Soma", "Gambia", -15.533333, 13.433333, 0.00, 166],
["Sabi", "Gambia", -14.200000, 13.233334, 0.00, 166],
["Youkounkoun", "Guinea", -13.133333, 12.533333, 0.00, 167],
["Yomou", "Guinea", -9.265278, 7.560278, 0.00, 167],
["Tougue", "Guinea", -11.683333, 11.450000, 0.00, 167],
["Conakry", "Guinea", -13.712222, 9.509167, 0.00, 167],
["Camayenne", "Guinea", -13.687778, 9.535000, 0.00, 167],
["Vieux-Habitants", "Guadeloupe", -61.750000, 16.049999, -4.00, 168],
["Trois-Rivieres", "Guadeloupe", -61.633335, 15.966667, -4.00, 168],
["Saint-Francois", "Guadeloupe", -61.266666, 16.250000, -4.00, 168],
["Pale", "Equatorial Guinea", 5.632500, -1.401389, 1.00, 169],
["Rebola", "Equatorial Guinea", 8.833333, 3.716667, 1.00, 169],
["Mongomo", "Equatorial Guinea", 11.316667, 1.633333, 1.00, 169],
["Zakynthos", "Greece", 20.895277, 37.791389, 2.00, 170],
["Zakharo", "Greece", 21.650000, 37.483334, 2.00, 170],
["Yiannouli", "Greece", 22.383333, 39.666668, 2.00, 170],
["Athens", "Greece", 23.733334, 37.983334, 2.00, 170],
["Thessaloniki", "Greece", 22.943890, 40.640278, 2.00, 170],
["Zunil", "Guatemala", -91.483330, 14.783333, -6.00, 172],
["Zaragoza", "Guatemala", -90.889442, 14.654445, -6.00, 172],
["Zacualpa", "Guatemala", -90.833336, 15.083333, -6.00, 172],
["Villa Nueva", "Guatemala", -90.587502, 14.526944, -6.00, 172],
["Mixco", "Guatemala", -90.606392, 14.633333, -6.00, 172],
["Guatemala City", "Guatemala", -90.526939, 14.621110, -6.00, 172],
["Tamuning", "Guam", 144.776672, 13.483889, 10.00, 173],
["Yigo", "Guam", 144.885559, 13.534445, 10.00, 173],
["Quinhamel", "Guinea-Bissau", -15.850000, 11.883333, 0.00, 174],
["Quebo", "Guinea-Bissau", -14.933333, 11.333333, 0.00, 174],
["Mansoa", "Guinea-Bissau", -15.318889, 12.073334, 0.00, 174],
["Bissau", "Guinea-Bissau", -15.583333, 11.850000, 0.00, 174],
["Skeldon", "Guyana", -57.133335, 5.883333, -4.00, 175],
["Rosignol", "Guyana", -57.533333, 6.283333, -4.00, 175],
["New Amsterdam", "Guyana", -57.516666, 6.250000, -4.00, 175],
["Georgetown", "Guyana", -58.166668, 6.800000, -4.00, 175],
["Kowloon", "Hong Kong", 114.183334, 22.316668, 8.00, 176],
["Hong Kong", "Hong Kong", 114.150070, 22.284014, 8.00, 176],
["Puerto Cortez", "Honduras", -87.949997, 15.833333, -6.00, 177],
["Yoro", "Honduras", -87.133331, 15.133333, -6.00, 177],
["Villanueva", "Honduras", -88.000000, 15.316667, -6.00, 177],
["Tegucigalpa", "Honduras", -87.216667, 14.100000, -6.00, 177],
["San Pedro Sula", "Honduras", -88.033333, 15.500000, -6.00, 177],
["Zupanja", "Croatia", 18.697500, 45.077499, 1.00, 178],
["Zapresic", "Croatia", 15.807777, 45.856388, 1.00, 178],
["Zagreb", "Croatia", 16.000000, 45.799999, 1.00, 178],
["Zagreb - Centar", "Croatia", 15.977532, 45.813129, 1.00, 178],
["Verrettes", "Haiti", -72.466667, 19.049999, -5.00, 179],
["Trou du Nord", "Haiti", -72.016670, 19.633333, -5.00, 179],
["Saint-Raphael", "Haiti", -72.199997, 19.433332, -5.00, 179],
["Port-au-Prince", "Haiti", -72.334999, 18.539167, -5.00, 179],
["Delmas 73", "Haiti", -72.302780, 18.544722, -5.00, 179],
["Carrefour", "Haiti", -72.399216, 18.541140, -5.00, 179],
["Veszto", "Hungary", 21.266666, 46.916668, 1.00, 180],
["Vasarosnameny", "Hungary", 22.316668, 48.133335, 1.00, 180],
["Vamospercs", "Hungary", 21.900000, 47.533333, 1.00, 180],
["Debrecen", "Hungary", 21.633333, 47.533333, 1.00, 180],
["Budapest", "Hungary", 19.083334, 47.500000, 1.00, 180],
["Makassar", "Indonesia", 99.783333, 2.450000, 8.00, 183],
["Teluknibung", "Indonesia", 99.816666, 3.016667, 7.00, 182],
["Tebingtinggi", "Indonesia", 99.150002, 3.333333, 7.00, 181],
["Percut", "Indonesia", 98.750000, 3.683333, 7.00, 182],
["Pematangsiantar", "Indonesia", 99.050003, 2.950000, 7.00, 181],
["Medan", "Indonesia", 98.666664, 3.583333, 7.00, 181],
["Binjai", "Indonesia", 98.500000, 3.600000, 7.00, 181],
["Banda Aceh", "Indonesia", 95.325836, 5.561666, 7.00, 182],
["Yogyakarta", "Indonesia", 110.360832, -7.782778, 7.00, 181],
["Makassar", "Indonesia", 119.438614, -5.146389, 8.00, 183],
["Tegal", "Indonesia", 109.133331, -6.866667, 7.00, 181],
["Tasikmalaya", "Indonesia", 108.199997, -7.333333, 7.00, 181],
["Tanjungkarang-Telukbetung", "Indonesia", 105.266670, -5.450000, 7.00, 181],
["Tangerang", "Indonesia", 106.629997, -6.178056, 7.00, 181],
["Surakarta", "Indonesia", 110.831665, -7.556111, 7.00, 181],
["Surabaya", "Indonesia", 112.750832, -7.249166, 8.00, 183],
["Sumedang Utara", "Indonesia", 107.916664, -6.850000, 7.00, 181],
["Sukabumi", "Indonesia", 106.927223, -6.916667, 7.00, 181],
["Situbondo", "Indonesia", 114.009766, -7.706229, 8.00, 183],
["Semarang", "Indonesia", 110.416664, -6.966667, 7.00, 181],
["Samarinda", "Indonesia", 117.150002, -0.500000, 8.00, 183],
["Rengasdengklok", "Indonesia", 107.283058, -6.148333, 7.00, 181],
["Purwokerto", "Indonesia", 109.234444, -7.421389, 7.00, 181],
["Purwakarta", "Indonesia", 107.438889, -6.556944, 7.00, 181],
["Pontianak", "Indonesia", 109.333336, -0.033333, 7.00, 182],
["Pekalongan", "Indonesia", 109.666664, -6.883333, 7.00, 181],
["Palu", "Indonesia", 119.859726, -0.901667, 8.00, 183],
["Palembang", "Indonesia", 104.745796, -2.916725, 7.00, 181],
["Padang", "Indonesia", 100.354271, -0.949244, 7.00, 181],
["Mataram", "Indonesia", 116.116669, -8.583333, 8.00, 183],
["Manado", "Indonesia", 124.844170, 1.501667, 8.00, 183],
["Malang", "Indonesia", 112.628059, -7.977778, 7.00, 181],
["Loa Janan", "Indonesia", 117.095032, -0.582952, 8.00, 183],
["Kediri", "Indonesia", 112.016670, -7.816667, 7.00, 181],
["Jember", "Indonesia", 113.703171, -8.166039, 8.00, 183],
["Jambi", "Indonesia", 103.616669, -1.600000, 7.00, 181],
["Jakarta", "Indonesia", 106.829445, -6.174444, 7.00, 181],
["Depok", "Indonesia", 106.818611, -6.400000, 7.00, 181],
["Denpasar", "Indonesia", 115.216667, -8.650000, 8.00, 183],
["Cirebon", "Indonesia", 108.566666, -6.733333, 7.00, 181],
["Ciputat", "Indonesia", 106.695557, -6.237500, 7.00, 181],
["Cimahi", "Indonesia", 107.542503, -6.872222, 7.00, 181],
["Cileungsi", "Indonesia", 106.959167, -6.394722, 7.00, 181],
["Ciampea", "Indonesia", 106.710281, -6.540000, 7.00, 181],
["Bogor", "Indonesia", 106.791389, -6.589722, 7.00, 181],
["Bengkulu", "Indonesia", 102.265541, -3.800443, 7.00, 181],
["Bekasi", "Indonesia", 106.991943, -6.236667, 7.00, 181],
["Banjarmasin", "Indonesia", 114.583336, -3.333333, 8.00, 183],
["Bandung", "Indonesia", 107.620552, -6.912778, 7.00, 181],
["Balikpapan", "Indonesia", 116.833336, -1.283333, 8.00, 183],
["Ambon", "Indonesia", 128.199997, -3.716667, 9.00, 184],
["Kupang", "Indonesia", 123.583336, -10.166667, 8.00, 183],
["Bun Cranncha", "Ireland", -7.450000, 55.133335, 0.00, 185],
["Eochaill", "Ireland", -7.850555, 51.950001, 0.00, 185],
["Cill Mhantain", "Ireland", -6.049444, 52.974998, 0.00, 185],
["Dublin", "Ireland", -6.248889, 53.333057, 0.00, 185],
["Jerusalem", "Israel", 35.233334, 31.766666, 2.00, 186],
["Zefat", "Israel", 35.494446, 32.966667, 2.00, 186],
["Yeroham", "Israel", 34.931389, 30.987223, 2.00, 186],
["Tel Aviv-Yafo", "Israel", 34.764721, 32.067780, 2.00, 186],
["Rishon LeZiyyon", "Israel", 34.804443, 31.964167, 2.00, 186],
["Haifa", "Israel", 34.989166, 32.815556, 2.00, 186],
["Punch", "India", 74.099998, 33.766666, 5.50, 188],
["Kilakarai", "India", 78.783333, 9.233334, 5.50, 188],
["Zunheboto", "India", 94.516670, 25.966667, 5.50, 188],
["Yamunanagar", "India", 77.283333, 30.100000, 5.50, 188],
["Warangal", "India", 79.583336, 18.000000, 5.50, 188],
["Vishakhapatnam", "India", 83.300003, 17.700001, 5.50, 188],
["Vijayawada", "India", 80.616669, 16.516666, 5.50, 188],
["Benares", "India", 83.000000, 25.333334, 5.50, 188],
["Vadodara", "India", 73.199997, 22.299999, 5.50, 188],
["Ulhasnagar", "India", 73.150002, 19.216667, 5.50, 188],
["Ujjain", "India", 75.766670, 23.183332, 5.50, 188],
["Udaipur", "India", 73.683334, 24.583334, 5.50, 188],
["Tumkur", "India", 77.101669, 13.342222, 5.50, 188],
["Thiruvananthapuram", "India", 76.916664, 8.483334, 5.50, 188],
["Trichur", "India", 76.216667, 10.516666, 5.50, 188],
["Tiruppur", "India", 77.349998, 11.100000, 5.50, 188],
["Tirupati", "India", 79.416664, 13.650000, 5.50, 188],
["Tirunelveli", "India", 77.699997, 8.733334, 5.50, 188],
["Tiruchchirappalli", "India", 78.683334, 10.816667, 5.50, 188],
["Thanjavur", "India", 79.150002, 10.800000, 5.50, 188],
["Thane", "India", 72.966667, 19.200001, 5.50, 188],
["Surat", "India", 72.833336, 21.166666, 5.50, 188],
["Srinagar", "India", 74.816666, 34.083332, 5.50, 188],
["Sonipat", "India", 77.016670, 28.983334, 5.50, 188],
["Shrirampur", "India", 88.342224, 22.752777, 5.50, 188],
["Solapur", "India", 75.916664, 17.683332, 5.50, 188],
["Shimoga", "India", 75.566666, 13.916667, 5.50, 188],
["Shiliguri", "India", 88.433334, 26.700001, 5.50, 188],
["Shahjahanpur", "India", 79.916664, 27.883333, 5.50, 188],
["Satna", "India", 80.833336, 24.583334, 5.50, 188],
["Salem", "India", 78.166664, 11.650000, 5.50, 188],
["Saharanpur", "India", 77.550003, 29.966667, 5.50, 188],
["Sagar", "India", 78.716667, 23.833334, 5.50, 188],
["Rohtak", "India", 76.566666, 28.900000, 5.50, 188],
["Rewa", "India", 81.300003, 24.533333, 5.50, 188],
["Ratlam", "India", 75.066666, 23.316668, 5.50, 188],
["Ranchi", "India", 85.333336, 23.350000, 5.50, 188],
["Rampur", "India", 79.033333, 28.816668, 5.50, 188],
["Rajkot", "India", 70.783333, 22.299999, 5.50, 188],
["Rajahmundry", "India", 81.783333, 16.983334, 5.50, 188],
["Raipur", "India", 81.633331, 21.233334, 5.50, 188],
["Raichur", "India", 77.366669, 16.200001, 5.50, 188],
["Quilon", "India", 76.599998, 8.883333, 5.50, 188],
["Pune", "India", 73.866669, 18.533333, 5.50, 188],
["Punasa", "India", 76.400002, 22.233334, 5.50, 188],
["Pondicherry", "India", 79.830002, 11.930000, 5.50, 188],
["Pimpri", "India", 73.800003, 18.616667, 5.50, 188],
["Patna", "India", 85.116669, 25.600000, 5.50, 188],
["Patiala", "India", 76.400276, 30.326666, 5.50, 188],
["Parbhani", "India", 76.783333, 19.266666, 5.50, 188],
["Panipat", "India", 76.968056, 29.388889, 5.50, 188],
["Panihati", "India", 88.374443, 22.694166, 5.50, 188],
["Pali", "India", 73.333336, 25.766666, 5.50, 188],
["Nizamabad", "India", 78.116669, 18.666666, 5.50, 188],
["New Delhi", "India", 77.199997, 28.600000, 5.50, 188],
["Nellore", "India", 79.966667, 14.433333, 5.50, 188],
["Nasik", "India", 73.800003, 19.983334, 5.50, 188],
["Naihati", "India", 88.416946, 22.902779, 5.50, 188],
["Nagpur", "India", 79.099998, 21.150000, 5.50, 188],
["Nagercoil", "India", 77.433334, 8.166667, 5.50, 188],
["Nadiad", "India", 72.866669, 22.700001, 5.50, 188],
["Mysore", "India", 76.649719, 12.307222, 5.50, 188],
["Muzaffarpur", "India", 85.400002, 26.116667, 5.50, 188],
["Muzaffarnagar", "India", 77.683334, 29.466667, 5.50, 188],
["Munger", "India", 86.466667, 25.383333, 5.50, 188],
["Moradabad", "India", 78.783333, 28.833334, 5.50, 188],
["Mirzapur", "India", 82.583336, 25.150000, 5.50, 188],
["Meerut", "India", 77.699997, 28.983334, 5.50, 188],
["Mau", "India", 83.550003, 25.950001, 5.50, 188],
["Mathura", "India", 77.683334, 27.500000, 5.50, 188],
["Mangalore", "India", 74.883331, 12.866667, 5.50, 188],
["Malegaon", "India", 74.533333, 20.549999, 5.50, 188],
["Madurai", "India", 78.116669, 9.933333, 5.50, 188],
["Madras", "India", 80.278473, 13.087838, 5.50, 188],
["Ludhiana", "India", 75.849998, 30.900000, 5.50, 188],
["Lucknow", "India", 80.916664, 26.850000, 5.50, 188],
["Latur", "India", 76.583336, 18.400000, 5.50, 188],
["Kulti", "India", 86.849998, 23.733334, 5.50, 188],
["Kukatpalli", "India", 78.416664, 17.483334, 5.50, 188],
["Calicut", "India", 75.766670, 11.250000, 5.50, 188],
["Kota", "India", 75.833336, 25.183332, 5.50, 188],
["Korba", "India", 82.683334, 22.350000, 5.50, 188],
["Kolhapur", "India", 74.216667, 16.700001, 5.50, 188],
["Kharagpur", "India", 87.333336, 22.333334, 5.50, 188],
["Karnal", "India", 76.983330, 29.683332, 5.50, 188],
["Karimnagar", "India", 79.150002, 18.433332, 5.50, 188],
["Kanpur", "India", 80.349998, 26.466667, 5.50, 188],
["Kamarhati", "India", 88.374725, 22.671110, 5.50, 188],
["Kalyan", "India", 73.150002, 19.250000, 5.50, 188],
["Kakinada", "India", 82.216667, 16.933332, 5.50, 188],
["Jalandhar", "India", 75.579170, 31.325556, 5.50, 188],
["Jodhpur", "India", 73.029999, 26.286667, 5.50, 188],
["Jhansi", "India", 78.583336, 25.433332, 5.50, 188],
["Jamshedpur", "India", 86.183334, 22.799999, 5.50, 188],
["Jamnagar", "India", 70.066666, 22.466667, 5.50, 188],
["Jammu", "India", 74.866669, 32.733334, 5.50, 188],
["Jalna", "India", 75.883331, 19.833334, 5.50, 188],
["Jalgaon", "India", 75.566666, 21.016666, 5.50, 188],
["Jaipur", "India", 75.816666, 26.916666, 5.50, 188],
["Jabalpur", "India", 79.950066, 23.166975, 5.50, 188],
["Indore", "India", 75.833305, 22.717924, 5.50, 188],
["Imphal", "India", 93.949997, 24.816668, 5.50, 188],
["Ichalkaranji", "India", 74.466667, 16.700001, 5.50, 188],
["Hyderabad", "India", 78.474442, 17.375278, 5.50, 188],
["Hubli", "India", 75.166664, 15.350000, 5.50, 188],
["Hisar", "India", 75.716667, 29.166666, 5.50, 188],
["Hapur", "India", 77.783333, 28.716667, 5.50, 188],
["Haora", "India", 88.310280, 22.589167, 5.50, 188],
["Gwalior", "India", 78.179169, 26.223612, 5.50, 188],
["Guntur", "India", 80.449997, 16.299999, 5.50, 188],
["Gulbarga", "India", 76.833336, 17.333334, 5.50, 188],
["Gorakhpur, Uttar Pradesh", "India", 83.373886, 26.754999, 5.50, 188],
["Ghaziabad", "India", 77.433334, 28.666666, 5.50, 188],
["Gaya", "India", 85.000000, 24.783333, 5.50, 188],
["Guwahati", "India", 91.733330, 26.183332, 5.50, 188],
["Ganganagar", "India", 73.883331, 29.916666, 5.50, 188],
["Firozabad", "India", 78.416664, 27.150000, 5.50, 188],
["Farrukhabad", "India", 79.566666, 27.400000, 5.50, 188],
["Faridabad", "India", 77.316666, 28.433332, 5.50, 188],
["Etawah", "India", 79.033333, 26.766666, 5.50, 188],
["Durgapur", "India", 87.316666, 23.483334, 5.50, 188],
["Durg", "India", 81.283333, 21.183332, 5.50, 188],
["Dindigul", "India", 77.949997, 10.350000, 5.50, 188],
["Dhule", "India", 74.783333, 20.900000, 5.50, 188],
["Dhanbad", "India", 86.449997, 23.799999, 5.50, 188],
["Dewas", "India", 76.066666, 22.966667, 5.50, 188],
["Delhi", "India", 77.216667, 28.666666, 5.50, 188],
["Dehra Dun", "India", 78.033333, 30.316668, 5.50, 188],
["Darbhanga", "India", 85.900002, 26.166666, 5.50, 188],
["Cuttack", "India", 85.879265, 20.464973, 5.50, 188],
["Coimbatore", "India", 76.966667, 11.000000, 5.50, 188],
["Cochin", "India", 76.233330, 9.966667, 5.50, 188],
["Chandrapur", "India", 79.300003, 19.950001, 5.50, 188],
["Chandigarh", "India", 76.787224, 30.737223, 5.50, 188],
["Calcutta", "India", 88.369720, 22.569723, 5.50, 188],
["Burhanpur", "India", 76.233330, 21.299999, 5.50, 188],
["Brahmapur", "India", 84.783333, 19.316668, 5.50, 188],
["Bombay", "India", 72.825836, 18.975000, 5.50, 188],
["Bokaro", "India", 85.966667, 23.783333, 5.50, 188],
["Bilaspur", "India", 82.150002, 22.083334, 5.50, 188],
["Bikaner", "India", 73.300003, 28.016666, 5.50, 188],
["Bijapur", "India", 75.699997, 16.833334, 5.50, 188],
["Bihar Sharif", "India", 85.516670, 25.183332, 5.50, 188],
["Bidar", "India", 77.550003, 17.900000, 5.50, 188],
["Bhubaneshwar", "India", 85.833336, 20.233334, 5.50, 188],
["Bhopal", "India", 77.400002, 23.266666, 5.50, 188],
["Bhiwandi", "India", 73.066666, 19.299999, 5.50, 188],
["Bhilwara", "India", 74.633331, 25.350000, 5.50, 188],
["Bhilai", "India", 81.433334, 21.216667, 5.50, 188],
["Bhavnagar", "India", 72.150002, 21.766666, 5.50, 188],
["Bhatpara", "India", 88.408890, 22.871389, 5.50, 188],
["Bhatinda", "India", 74.949997, 30.200001, 5.50, 188],
["Bharatpur", "India", 77.483330, 27.216667, 5.50, 188],
["Bhagalpur", "India", 87.000000, 25.250000, 5.50, 188],
["Bellary", "India", 76.933334, 15.150000, 5.50, 188],
["Belgaum", "India", 74.500000, 15.866667, 5.50, 188],
["Bareilly", "India", 79.416664, 28.350000, 5.50, 188],
["Barddhaman", "India", 87.849998, 23.250000, 5.50, 188],
["Barasat", "India", 88.516670, 22.716667, 5.50, 188],
["Baranagar", "India", 88.365280, 22.643333, 5.50, 188],
["Bengalooru", "India", 77.600128, 12.976624, 5.50, 188],
["Bangalore", "India", 77.600128, 12.976624, 5.50, 188],
["Bali", "India", 88.340279, 22.646111, 5.50, 188],
["Avadi", "India", 80.101669, 13.115556, 5.50, 188],
["Aurangabad", "India", 75.333336, 19.883333, 5.50, 188],
["Asansol", "India", 86.983330, 23.683332, 5.50, 188],
["Ara", "India", 84.666664, 25.566668, 5.50, 188],
["Anantapur", "India", 77.599998, 14.683333, 5.50, 188],
["Amritsar", "India", 74.865555, 31.633055, 5.50, 188],
["Amravati", "India", 77.750000, 20.933332, 5.50, 188],
["Ambattur", "India", 80.162224, 13.098333, 5.50, 188],
["Amarnath", "India", 73.166664, 19.200001, 5.50, 188],
["Alwar", "India", 76.599998, 27.566668, 5.50, 188],
["Allahabad", "India", 81.849998, 25.450001, 5.50, 188],
["Aligarh", "India", 78.083336, 27.883333, 5.50, 188],
["Akola", "India", 77.000000, 20.733334, 5.50, 188],
["Ajmer", "India", 74.633331, 26.450001, 5.50, 188],
["Aizawl", "India", 92.716667, 23.733334, 5.50, 188],
["Ahmadnagar", "India", 74.733330, 19.083334, 5.50, 188],
["Ahmadabad", "India", 72.616669, 23.033333, 5.50, 188],
["Agra", "India", 78.016670, 27.183332, 5.50, 188],
["Agartala", "India", 91.275002, 23.836390, 5.50, 188],
["Nangi", "India", 88.215279, 22.508333, 5.50, 188],
["Zakho", "Iraq", 42.687222, 37.144165, 3.00, 190],
["Tozkhurmato", "Iraq", 44.621944, 34.883057, 3.00, 190],
["Tikrit", "Iraq", 43.676945, 34.596668, 3.00, 190],
["Kirkuk", "Iraq", 44.392223, 35.468056, 3.00, 190],
["Karbala'", "Iraq", 44.016109, 32.597778, 3.00, 190],
["Arbil", "Iraq", 44.008888, 36.189999, 3.00, 190],
["Baghdad", "Iraq", 44.393890, 33.338612, 3.00, 190],
["As Sulaymaniyah", "Iraq", 45.440834, 35.561668, 3.00, 190],
["Ar Ramadi", "Iraq", 43.312500, 33.419724, 3.00, 190],
["An Nasiriyah", "Iraq", 46.259445, 31.054167, 3.00, 190],
["An Najaf", "Iraq", 44.314724, 31.996111, 3.00, 190],
["Al Mawsil al Jadidah", "Iraq", 43.086113, 36.329166, 3.00, 190],
["Mosul", "Iraq", 43.118889, 36.334999, 3.00, 190],
["Al Kut", "Iraq", 45.829166, 32.497501, 3.00, 190],
["Al Hillah", "Iraq", 44.432777, 32.479443, 3.00, 190],
["Al Basrah", "Iraq", 47.819168, 30.494167, 3.00, 190],
["Al `Amarah", "Iraq", 47.175278, 31.845278, 3.00, 190],
["Ad Diwaniyah", "Iraq", 44.925556, 31.987778, 3.00, 190],
["Abu Ghurayb", "Iraq", 44.185001, 33.308334, 3.00, 190],
["Al Basrah al Qadimah", "Iraq", 47.817501, 30.495556, 3.00, 190],
["Azadshahr", "Iran", 48.549999, 34.799999, 3.50, 191],
["Kahriz", "Iran", 47.058056, 34.387779, 3.50, 191],
["Nurabad", "Iran", 47.966667, 34.066666, 3.50, 191],
["Qarchak", "Iran", 51.568890, 35.439445, 3.50, 191],
["Zanjan", "Iran", 48.478699, 36.673599, 3.50, 191],
["Yazd", "Iran", 54.367500, 31.897223, 3.50, 191],
["Tehran", "Iran", 51.424446, 35.671944, 3.50, 191],
["Tabriz", "Iran", 46.291943, 38.080002, 3.50, 191],
["Sirjan", "Iran", 55.671665, 29.451389, 3.50, 191],
["Shiraz", "Iran", 52.538334, 29.615000, 3.50, 191],
["Sari", "Iran", 53.058613, 36.567780, 3.50, 191],
["Sanandaj", "Iran", 46.998890, 35.317223, 3.50, 191],
["Sabzevar", "Iran", 57.679722, 36.214443, 3.50, 191],
["Rasht", "Iran", 49.585835, 37.279446, 3.50, 191],
["Qom", "Iran", 50.880833, 34.645279, 3.50, 191],
["Qazvin", "Iran", 50.016945, 36.262222, 3.50, 191],
["Neyshabur", "Iran", 58.798889, 36.209721, 3.50, 191],
["Nazarabad", "Iran", 50.607498, 35.952099, 3.50, 191],
["Mashhad", "Iran", 59.611946, 36.295834, 3.50, 191],
["Khorramshahr", "Iran", 48.179165, 30.439167, 3.50, 191],
["Khorramabad", "Iran", 48.355835, 33.487778, 3.50, 191],
["Kerman", "Iran", 57.084167, 30.293888, 3.50, 191],
["Karaj", "Iran", 50.998203, 35.828762, 3.50, 191],
["Gorgan", "Iran", 54.436111, 36.839443, 3.50, 191],
["Eslamshahr", "Iran", 51.255833, 35.564445, 3.50, 191],
["Bukan", "Iran", 46.215000, 36.521946, 3.50, 191],
["Borujerd", "Iran", 48.755833, 33.896389, 3.50, 191],
["Babol", "Iran", 52.678890, 36.544167, 3.50, 191],
["Ardabil", "Iran", 48.301388, 38.249443, 3.50, 191],
["Arak", "Iran", 49.683887, 34.085556, 3.50, 191],
["Ahvaz", "Iran", 48.691113, 31.329166, 3.50, 191],
["Abadan", "Iran", 48.295834, 30.352501, 3.50, 191],
["Najafabad", "Iran", 51.365833, 32.633057, 3.50, 191],
["Homayunshahr", "Iran", 51.531944, 32.686111, 3.50, 191],
["Esfahan", "Iran", 51.671391, 32.659721, 3.50, 191],
["Zahedan", "Iran", 60.872776, 29.497778, 3.50, 191],
["Akureyri", "Iceland", -18.100000, 65.666664, 0.00, 192],
["Selfoss", "Iceland", -21.000000, 63.933334, 0.00, 192],
["Reykjavik", "Iceland", -21.950001, 64.150002, 0.00, 192],
["Zafferana Etnea", "Italy", 15.107987, 37.682156, 1.00, 193],
["Vizzini", "Italy", 14.749685, 37.160946, 1.00, 193],
["Vittoria", "Italy", 14.533182, 36.953739, 1.00, 193],
["Palermo", "Italy", 13.366667, 38.116665, 1.00, 193],
["Messina", "Italy", 15.549690, 38.193268, 1.00, 193],
["Catania", "Italy", 15.087190, 37.502132, 1.00, 193],
["Verona", "Italy", 10.997788, 45.434185, 1.00, 193],
["Venice", "Italy", 12.326667, 45.438610, 1.00, 193],
["Trieste", "Italy", 13.780000, 45.648613, 1.00, 193],
["Turin", "Italy", 7.675022, 45.077148, 1.00, 193],
["Taranto", "Italy", 17.229723, 40.476112, 1.00, 193],
["Rome", "Italy", 12.483334, 41.900002, 1.00, 193],
["Padova", "Italy", 11.881808, 45.415195, 1.00, 193],
["Napoli", "Italy", 14.250000, 40.833332, 1.00, 193],
["Milano", "Italy", 9.188175, 45.463684, 1.00, 193],
["Genova", "Italy", 8.950000, 44.416668, 1.00, 193],
["Florence", "Italy", 11.250000, 43.766666, 1.00, 193],
["Bologna", "Italy", 11.338749, 44.493813, 1.00, 193],
["Bari", "Italy", 16.851185, 41.117733, 1.00, 193],
["Yallahs", "Jamaica", -76.566666, 17.866667, -5.00, 195],
["Stony Hill", "Jamaica", -76.791084, 18.075369, -5.00, 195],
["Spanish Town", "Jamaica", -76.949997, 17.983334, -5.00, 195],
["New Kingston", "Jamaica", -76.783188, 18.007467, -5.00, 195],
["Kingston", "Jamaica", -76.793571, 17.997019, -5.00, 195],
["Waqqas", "Jordan", 35.599998, 32.549999, 2.00, 196],
["Wadi as Sir", "Jordan", 35.816666, 31.950001, 2.00, 196],
["Umm as Summaq", "Jordan", 35.849998, 31.883333, 2.00, 196],
["Irbid", "Jordan", 35.849998, 32.555557, 2.00, 196],
["Amman", "Jordan", 35.933334, 31.950001, 2.00, 196],
["Shingu", "Japan", 135.983337, 33.733334, 9.00, 197],
["Atsugi", "Japan", 139.359726, 35.438889, 9.00, 197],
["Akashi", "Japan", 134.983337, 34.633335, 9.00, 197],
["Yono", "Japan", 139.633331, 35.883335, 9.00, 197],
["Yokosuka", "Japan", 139.667221, 35.283611, 9.00, 197],
["Yokohama", "Japan", 139.649994, 35.450001, 9.00, 197],
["Yokkaichi", "Japan", 136.616669, 34.966667, 9.00, 197],
["Yao", "Japan", 135.600006, 34.616665, 9.00, 197],
["Utsunomiya", "Japan", 139.866669, 36.549999, 9.00, 197],
["Toyota", "Japan", 137.149994, 35.083332, 9.00, 197],
["Toyonaka", "Japan", 135.466660, 34.783333, 9.00, 197],
["Toyohashi", "Japan", 137.383331, 34.766666, 9.00, 197],
["Toyama", "Japan", 137.216660, 36.683334, 9.00, 197],
["Tokyo", "Japan", 139.751389, 35.685001, 9.00, 197],
["Tokushima", "Japan", 134.566666, 34.066666, 9.00, 197],
["Tokorozawa", "Japan", 139.467773, 35.786388, 9.00, 197],
["Takatsuki", "Japan", 135.616669, 34.849998, 9.00, 197],
["Takasaki", "Japan", 139.016663, 36.333332, 9.00, 197],
["Takarazuka", "Japan", 135.350006, 34.799999, 9.00, 197],
["Takamatsu", "Japan", 134.050003, 34.333332, 9.00, 197],
["Suita", "Japan", 135.533340, 34.750000, 9.00, 197],
["Soka", "Japan", 139.804443, 35.820278, 9.00, 197],
["Shizuoka", "Japan", 138.383331, 34.966667, 9.00, 197],
["Shimonoseki", "Japan", 130.949997, 33.950001, 9.00, 197],
["Shimminatocho", "Japan", 135.199997, 34.183334, 9.00, 197],
["Sasebo", "Japan", 129.722778, 33.159168, 9.00, 197],
["Sakai", "Japan", 135.466660, 34.583332, 9.00, 197],
["Sagamihara", "Japan", 139.354446, 35.553055, 9.00, 197],
["Otsu", "Japan", 135.866669, 35.000000, 9.00, 197],
["Osaka", "Japan", 135.500000, 34.666668, 9.00, 197],
["Okazaki", "Japan", 137.166672, 34.950001, 9.00, 197],
["Okayama", "Japan", 133.916672, 34.650002, 9.00, 197],
["Oita", "Japan", 131.604446, 33.237221, 9.00, 197],
["Odawara", "Japan", 139.159729, 35.255554, 9.00, 197],
["Numazu", "Japan", 138.866669, 35.099998, 9.00, 197],
["Nishinomiya", "Japan", 135.333328, 34.716667, 9.00, 197],
["Niigata", "Japan", 139.050003, 37.916668, 9.00, 197],
["Nerima", "Japan", 139.649994, 35.733334, 9.00, 197],
["Nara", "Japan", 135.833328, 34.683334, 9.00, 197],
["Naha", "Japan", 127.673332, 26.207222, 9.00, 197],
["Nagoya", "Japan", 136.916672, 35.166668, 9.00, 197],
["Nagasaki", "Japan", 129.868332, 32.755001, 9.00, 197],
["Nagano", "Japan", 138.183334, 36.650002, 9.00, 197],
["Miyazaki", "Japan", 131.433334, 31.900000, 9.00, 197],
["Minami-rinkan", "Japan", 139.449997, 35.483334, 9.00, 197],
["Matsumoto", "Japan", 137.966660, 36.233334, 9.00, 197],
["Matsudo", "Japan", 139.899994, 35.783333, 9.00, 197],
["Maebashi", "Japan", 139.066666, 36.383335, 9.00, 197],
["Machida", "Japan", 139.450836, 35.540279, 9.00, 197],
["Kyoto", "Japan", 135.750000, 35.000000, 9.00, 197],
["Kurume", "Japan", 130.516663, 33.316666, 9.00, 197],
["Kurashiki", "Japan", 133.766663, 34.583332, 9.00, 197],
["Kumamoto", "Japan", 130.716660, 32.799999, 9.00, 197],
["Koshigaya", "Japan", 139.783340, 35.883335, 9.00, 197],
["Kochi", "Japan", 133.550003, 33.549999, 9.00, 197],
["Kobe", "Japan", 135.166672, 34.683334, 9.00, 197],
["Kitakyushu", "Japan", 130.833328, 33.833332, 9.00, 197],
["Kishiwada", "Japan", 135.366669, 34.466667, 9.00, 197],
["Kawasaki", "Japan", 139.717224, 35.520557, 9.00, 197],
["Kawaguchi", "Japan", 139.720551, 35.805000, 9.00, 197],
["Kawagoe", "Japan", 139.485275, 35.908611, 9.00, 197],
["Kasukabe", "Japan", 139.753616, 35.976387, 9.00, 197],
["Kasugai", "Japan", 136.983337, 35.233334, 9.00, 197],
["Kashiwa", "Japan", 139.968887, 35.854443, 9.00, 197],
["Kanazawa", "Japan", 136.649994, 36.566666, 9.00, 197],
["Kakogawa", "Japan", 134.850006, 34.766666, 9.00, 197],
["Kagoshima", "Japan", 130.550003, 31.600000, 9.00, 197],
["Ichinomiya", "Japan", 136.800003, 35.299999, 9.00, 197],
["Ichikawa", "Japan", 139.924728, 35.719723, 9.00, 197],
["Ibaraki", "Japan", 135.566666, 34.816666, 9.00, 197],
["Hiroshima", "Japan", 132.449997, 34.400002, 9.00, 197],
["Hiratsuka", "Japan", 139.342224, 35.323055, 9.00, 197],
["Hirakata", "Japan", 135.633331, 34.799999, 9.00, 197],
["Himeji", "Japan", 134.699997, 34.816666, 9.00, 197],
["Hamamatsu", "Japan", 137.733337, 34.700001, 9.00, 197],
["Hachioji", "Japan", 139.323883, 35.655834, 9.00, 197],
["Gifu", "Japan", 136.750000, 35.416668, 9.00, 197],
["Funabashi", "Japan", 139.983337, 35.693054, 9.00, 197],
["Fukuyama", "Japan", 133.366669, 34.483334, 9.00, 197],
["Fukuoka", "Japan", 130.399994, 33.583332, 9.00, 197],
["Fukui", "Japan", 136.216660, 36.066666, 9.00, 197],
["Fujisawa", "Japan", 139.470001, 35.341946, 9.00, 197],
["Fuji", "Japan", 138.683334, 35.166668, 9.00, 197],
["Fuchu", "Japan", 139.483337, 35.666668, 9.00, 197],
["Chofu", "Japan", 139.552216, 35.655556, 9.00, 197],
["Chigasaki", "Japan", 139.403885, 35.326111, 9.00, 197],
["Amagasaki", "Japan", 135.416672, 34.716667, 9.00, 197],
["Ageo", "Japan", 139.588608, 35.969723, 9.00, 197],
["Yamagata", "Japan", 140.337494, 38.252777, 9.00, 197],
["Sendai", "Japan", 140.884720, 38.254723, 9.00, 197],
["Morioka", "Japan", 141.149994, 39.700001, 9.00, 197],
["Mito", "Japan", 140.466660, 36.366665, 9.00, 197],
["Koriyama", "Japan", 140.383331, 37.400002, 9.00, 197],
["Iwaki", "Japan", 140.883331, 37.049999, 9.00, 197],
["Ichihara", "Japan", 140.083328, 35.516666, 9.00, 197],
["Fukushima", "Japan", 140.466660, 37.750000, 9.00, 197],
["Chiba", "Japan", 140.116669, 35.599998, 9.00, 197],
["Akita", "Japan", 140.116669, 39.716667, 9.00, 197],
["Sapporo", "Japan", 141.353882, 43.054722, 9.00, 197],
["Hakodate", "Japan", 140.736664, 41.775833, 9.00, 197],
["Hachinohe", "Japan", 141.500000, 40.500000, 9.00, 197],
["Asahikawa", "Japan", 142.370285, 43.767776, 9.00, 197],
["Aomori", "Japan", 140.751114, 40.821110, 9.00, 197],
["Wundanyi", "Kenya", 38.366665, -3.400000, 3.00, 198],
["Wote", "Kenya", 37.633335, -1.783333, 3.00, 198],
["Witu", "Kenya", 40.453056, -2.390556, 3.00, 198],
["Nakuru", "Kenya", 36.066666, -0.283333, 3.00, 198],
["Nairobi", "Kenya", 36.816666, -1.283333, 3.00, 198],
["Mombasa", "Kenya", 39.666668, -4.050000, 3.00, 198],
["Kisumu", "Kenya", 34.750000, -0.100000, 3.00, 198],
["Eldoret", "Kenya", 35.283333, 0.516667, 3.00, 198],
["Suluktu", "Kyrgyzstan", 69.569725, 39.930279, 6.00, 199],
["Khaydarkan", "Kyrgyzstan", 71.345833, 39.941387, 6.00, 199],
["Isfana", "Kyrgyzstan", 69.516670, 39.833332, 6.00, 199],
["Bishkek", "Kyrgyzstan", 74.600281, 42.873055, 6.00, 199],
["Phnom Penh", "Cambodia", 104.916664, 11.550000, 7.00, 200],
["Ta Khmau", "Cambodia", 104.949997, 11.483334, 7.00, 200],
["Sisophon", "Cambodia", 102.983330, 13.583333, 7.00, 200],
["Bairiki", "Kiribati", 172.978012, 1.329141, 12.00, 201],
["Sima", "Comoro", 44.276669, -12.195556, 3.00, 204],
["Ouani", "Comoro", 44.425835, -12.132222, 3.00, 204],
["Moutsamoudou", "Comoro", 44.396389, -12.162778, 3.00, 204],
["Basseterre", "Saint Kitts and Nevis", -62.716667, 17.299999, -4.00, 205],
["Yonggang-up", "North Korea", 125.424446, 38.856110, 9.00, 206],
["Yongbyon", "North Korea", 125.804169, 39.813332, 9.00, 206],
["Yonan-up", "North Korea", 126.161110, 37.908890, 9.00, 206],
["Wonsan", "North Korea", 127.443611, 39.152779, 9.00, 206],
["Pyongyang", "North Korea", 125.754723, 39.019444, 9.00, 206],
["Kaesong", "North Korea", 126.554443, 37.970833, 9.00, 206],
["Hungnam", "North Korea", 127.618614, 39.831665, 9.00, 206],
["Hamhung", "North Korea", 127.536392, 39.918335, 9.00, 206],
["Haeju", "North Korea", 125.714722, 38.040554, 9.00, 206],
["Sinuiju", "North Korea", 124.398056, 40.100555, 9.00, 206],
["Kanggye", "North Korea", 126.611389, 40.987221, 9.00, 206],
["Chongjin", "North Korea", 129.775833, 41.795555, 9.00, 206],
["Hunghae", "South Korea", 129.352219, 36.112499, 9.00, 207],
["Yosu", "South Korea", 127.737778, 34.744167, 9.00, 207],
["Yonil", "South Korea", 129.345001, 35.994167, 9.00, 207],
["Wonju", "South Korea", 127.945274, 37.351387, 9.00, 207],
["Ulsan", "South Korea", 129.316666, 35.537224, 9.00, 207],
["Uijongbu", "South Korea", 127.038887, 37.748611, 9.00, 207],
["Taejon", "South Korea", 127.419724, 36.321388, 9.00, 207],
["Taegu", "South Korea", 128.591110, 35.870277, 9.00, 207],
["Suwon", "South Korea", 127.019165, 37.284168, 9.00, 207],
["Sunch'on", "South Korea", 127.488335, 34.951111, 9.00, 207],
["Seoul", "South Korea", 126.999725, 37.566387, 9.00, 207],
["Pusan", "South Korea", 129.040283, 35.102779, 9.00, 207],
["Puch'on", "South Korea", 126.783058, 37.498890, 9.00, 207],
["Mokp'o", "South Korea", 126.388611, 34.793610, 9.00, 207],
["Masan", "South Korea", 128.572495, 35.208057, 9.00, 207],
["Kwangju", "South Korea", 126.915558, 35.154720, 9.00, 207],
["Kunsan", "South Korea", 126.711388, 35.978611, 9.00, 207],
["Kumi", "South Korea", 128.344727, 36.127224, 9.00, 207],
["Kimhae", "South Korea", 128.881104, 35.234165, 9.00, 207],
["Iksan", "South Korea", 126.954445, 35.943890, 9.00, 207],
["Ch'unch'on", "South Korea", 127.734169, 37.874722, 9.00, 207],
["Chonju", "South Korea", 127.148888, 35.821945, 9.00, 207],
["Ch'ongju", "South Korea", 127.489723, 36.637222, 9.00, 207],
["Ch'onan", "South Korea", 127.152222, 36.806389, 9.00, 207],
["Chinju", "South Korea", 128.084717, 35.192780, 9.00, 207],
["Cheju", "South Korea", 126.521942, 33.509724, 9.00, 207],
["Ch'angwon", "South Korea", 128.681107, 35.228054, 9.00, 207],
["Anyang", "South Korea", 126.926941, 37.392502, 9.00, 207],
["Ansan", "South Korea", 126.821945, 37.323612, 9.00, 207],
["Songnam", "South Korea", 127.137779, 37.438610, 9.00, 207],
["Kwangmyong", "South Korea", 126.866386, 37.477222, 9.00, 207],
["Janub as Surrah", "Kuwait", 47.978054, 29.269167, 3.00, 208],
["Bayan", "Kuwait", 48.039165, 29.318056, 3.00, 208],
["Kuwait City", "Kuwait", 47.970001, 29.350000, 3.00, 208],
["Az Zawr", "Kuwait", 48.274723, 29.442499, 3.00, 208],
["West Bay", "Cauman", -81.416664, 19.366667, -5.00, 209],
["George Town", "Cauman", -81.383331, 19.299999, -5.00, 209],
["Bodden Town", "Cauman", -81.250000, 19.283333, -5.00, 209],
["Zhumysker", "Kazakhstan", 49.400002, 49.333332, 5.00, 214],
["Zhetibay", "Kazakhstan", 52.078888, 43.594166, 5.00, 213],
["Shubarshi", "Kazakhstan", 57.186943, 48.587223, 5.00, 212],
["Karagandy", "Kazakhstan", 54.866665, 50.066666, 5.00, 212],
["Aqtobe", "Kazakhstan", 57.181389, 50.298054, 5.00, 212],
["Taraz", "Kazakhstan", 71.366669, 42.900002, 6.00, 210],
["Shymkent", "Kazakhstan", 69.599998, 42.299999, 6.00, 211],
["Semipalatinsk", "Kazakhstan", 80.227501, 50.411110, 6.00, 210],
["Petropavlovsk", "Kazakhstan", 69.162781, 54.875278, 6.00, 211],
["Pavlodar", "Kazakhstan", 76.949997, 52.299999, 6.00, 210],
["Ust'-Kamenogorsk", "Kazakhstan", 82.610275, 49.978889, 6.00, 210],
["Astana", "Kazakhstan", 71.427780, 51.181110, 6.00, 211],
["Almaty", "Kazakhstan", 76.949997, 43.250000, 6.00, 210],
["Vientiane", "Laos", 102.599998, 17.966667, 7.00, 215],
["Xam Nua", "Laos", 104.043892, 20.419722, 7.00, 215],
["Savannakhet", "Laos", 104.750000, 16.549999, 7.00, 215],
["Zahle", "Lebanon", 35.904167, 33.849724, 2.00, 216],
["Tripoli", "Lebanon", 35.849724, 34.436668, 2.00, 216],
["Tyre", "Lebanon", 35.193890, 33.273335, 2.00, 216],
["Ra's Bayrut", "Lebanon", 35.483334, 33.900002, 2.00, 216],
["Beirut", "Lebanon", 35.509724, 33.871944, 2.00, 216],
["Bisee", "Saint Lucia", -60.966667, 14.016666, -4.00, 217],
["Vaduz", "Liechtenstein", 9.516666, 47.133335, 1.00, 218],
["Triesenberg", "Liechtenstein", 9.533333, 47.116665, 1.00, 218],
["Triesen", "Liechtenstein", 9.533333, 47.099998, 1.00, 218],
["Welisara", "Sri Lanka", 79.900002, 7.033333, 5.50, 219],
["Weligama", "Sri Lanka", 80.416664, 5.966667, 5.50, 219],
["Wattegama", "Sri Lanka", 81.500000, 6.800000, 5.50, 219],
["Galkissa", "Sri Lanka", 79.866669, 6.833333, 5.50, 219],
["Colombo", "Sri Lanka", 79.847778, 6.931944, 5.50, 219],
["Zwedru", "Liberia", -8.128056, 6.066667, 0.00, 220],
["New Yekepa", "Liberia", -8.537778, 7.579444, 0.00, 220],
["Tubmanburg", "Liberia", -10.817223, 6.870833, 0.00, 220],
["Monrovia", "Liberia", -10.804722, 6.310555, 0.00, 220],
["Teyateyaneng", "Lesotho", 27.733334, -29.150000, 2.00, 221],
["Quthing", "Lesotho", 27.716667, -30.400000, 2.00, 221],
["Qacha's Nek", "Lesotho", 28.683332, -30.116667, 2.00, 221],
["Zarasai", "Lithuania", 26.250000, 55.733334, 2.00, 222],
["Visaginas", "Lithuania", 26.416666, 55.599998, 2.00, 222],
["Vilnius", "Lithuania", 25.316668, 54.683334, 2.00, 222],
["Kaunas", "Lithuania", 23.900000, 54.900002, 2.00, 222],
["Strassen", "Luxembourg", 6.073333, 49.620556, 1.00, 223],
["Schifflange", "Luxembourg", 6.012778, 49.506390, 1.00, 223],
["Petange", "Luxembourg", 5.880556, 49.558334, 1.00, 223],
["Valmiera", "Latvia", 25.424423, 57.535915, 2.00, 224],
["Ventspils", "Latvia", 21.560556, 57.389446, 2.00, 224],
["Vec-Liepaja", "Latvia", 21.016666, 56.533333, 2.00, 224],
["Riga", "Latvia", 24.100000, 56.950001, 2.00, 224],
["Bardiyah", "Libya", 25.100000, 31.766666, 2.00, 225],
["Tobruk", "Libya", 23.976389, 32.083611, 2.00, 225],
["Suluq", "Libya", 20.250000, 31.668612, 2.00, 225],
["Banghazi", "Libya", 20.066668, 32.116665, 2.00, 225],
["Tarhunah", "Libya", 13.633333, 32.433334, 2.00, 225],
["Tripoli", "Libya", 13.180000, 32.892502, 2.00, 225],
["Misratah", "Libya", 15.090555, 32.378334, 2.00, 225],
["Al Khums", "Libya", 14.266666, 32.650002, 2.00, 225],
["Zaio", "Morocco", -2.730000, 34.930000, 0.00, 226],
["Zagora", "Morocco", -5.830000, 30.309999, 0.00, 226],
["Youssoufia", "Morocco", -8.530000, 32.250000, 0.00, 226],
["Tetouan", "Morocco", -5.370000, 35.570000, 0.00, 226],
["Tangier", "Morocco", -5.810000, 35.779999, 0.00, 226],
["Safi", "Morocco", -9.230000, 32.299999, 0.00, 226],
["Rabat", "Morocco", -6.830000, 34.020000, 0.00, 226],
["Oujda", "Morocco", -1.910000, 34.680000, 0.00, 226],
["Meknes", "Morocco", -5.550000, 33.900002, 0.00, 226],
["Marrakech", "Morocco", -8.000000, 31.629999, 0.00, 226],
["Kenitra-GHARB", "Morocco", -6.570000, 34.259998, 0.00, 226],
["Fes", "Morocco", -4.980000, 34.049999, 0.00, 226],
["Casablanca", "Morocco", -7.610000, 33.590000, 0.00, 226],
["Agadir", "Morocco", -9.600000, 30.400000, 0.00, 226],
["Monte-Carlo", "Monaco", 7.416667, 43.733334, 1.00, 227],
["La Condamine", "Monaco", 7.416667, 43.733334, 1.00, 227],
["Edinet", "Moldova", 27.305000, 48.168056, 2.00, 228],
["Iargara", "Moldova", 28.436666, 46.427502, 2.00, 228],
["Vulcanesti", "Moldova", 28.402779, 45.684166, 2.00, 228],
["Chisinau", "Moldova", 28.857500, 47.005554, 2.00, 228],
["Ulcinj", "Montenegro", 19.206388, 41.928333, 1.00, 229],
["Tivat", "Montenegro", 18.696112, 42.436390, 1.00, 229],
["Podgorica", "Montenegro", 19.263611, 42.441113, 1.00, 229],
["Toamasina", "Madagascar", 49.383335, -18.166666, 3.00, 231],
["Vondrozo", "Madagascar", 47.283333, -22.816668, 3.00, 231],
["Vohibinany", "Madagascar", 49.033333, -17.350000, 3.00, 231],
["Antananarivo", "Madagascar", 47.516666, -18.916666, 3.00, 231],
["Majuro", "Marshall Islands", 171.383331, 7.100000, 12.00, 232],
["Zrnovci", "Macedonia", 22.444445, 41.854168, 1.00, 234],
["Zletovo", "Macedonia", 22.236111, 41.988609, 1.00, 234],
["Zitose", "Macedonia", 21.290556, 41.420834, 1.00, 234],
["Skopje", "Macedonia", 21.433332, 42.000000, 1.00, 234],
["Yorosso", "Mali", -4.783333, 12.366667, 0.00, 235],
["Tombouctou", "Mali", -3.007421, 16.773479, 0.00, 235],
["Tenenkou", "Mali", -4.916667, 14.466667, 0.00, 235],
["Bamako", "Mali", -8.000000, 12.650000, 0.00, 235],
["Yenangyaung", "Burma", 94.883331, 20.466667, 6.50, 236],
["Nyaungdon", "Burma", 95.650002, 17.033333, 6.50, 236],
["Yamethin", "Burma", 96.150002, 20.433332, 6.50, 236],
["Rangoon", "Burma", 96.156113, 16.805277, 6.50, 236],
["Bago", "Burma", 96.479721, 17.336666, 6.50, 236],
["Mawlamyine", "Burma", 97.625557, 16.491388, 6.50, 236],
["Mandalay", "Burma", 96.083336, 22.000000, 6.50, 236],
["Pathein", "Burma", 94.733330, 16.783333, 6.50, 236],
["Ulaangom", "Mongolia", 92.066666, 49.981110, 8.00, 237],
["Tosontsengel", "Mongolia", 98.283890, 48.756668, 8.00, 237],
["Ulaanbaatar", "Mongolia", 106.916664, 47.916668, 8.00, 237],
["San Antonio", "Northern Mariana Islands", 145.693604, 15.132500, 10.00, 241],
["Saint-Joseph", "Martinique", -61.033333, 14.666667, -4.00, 242],
["Sainte-Marie", "Martinique", -60.983334, 14.783333, -4.00, 242],
["Sainte-Luce", "Martinique", -60.916668, 14.466667, -4.00, 242],
["Nouakchott", "Mauritania", -16.040556, 18.119444, 0.00, 243],
["Zurrieq", "Malta", 14.474167, 35.831112, 1.00, 245],
["Zejtun", "Malta", 14.533055, 35.855835, 1.00, 245],
["Zebbug", "Malta", 14.441112, 35.871944, 1.00, 245],
["Triolet", "Mauritius", 57.545277, -20.054722, 4.00, 246],
["Terre Rouge", "Mauritius", 57.524445, -20.126112, 4.00, 246],
["Tamarin", "Mauritius", 57.370556, -20.325556, 4.00, 246],
["Male", "Maldives", 73.509865, 4.177108, 5.00, 247],
["Hithadhoo", "Maldives", 73.083336, -0.600000, 5.00, 247],
["Thinadhoo", "Maldives", 72.933334, 0.533333, 5.00, 247],
["Karonga", "Malawi", 33.933334, -9.933333, 2.00, 248],
["Chitipa", "Malawi", 33.266666, -9.716667, 2.00, 248],
["Zomba", "Malawi", 35.333332, -15.383333, 2.00, 248],
["Lilongwe", "Malawi", 33.783333, -13.983334, 2.00, 248],
["Blantyre", "Malawi", 35.000000, -15.783333, 2.00, 248],
["Cuauhtemoc", "Mexico", -98.150002, 22.533333, -6.00, 249],
["Xicotencatl", "Mexico", -98.883331, 23.016666, -6.00, 252],
["San Fernando", "Mexico", -98.150002, 24.850000, -6.00, 252],
["Xico", "Mexico", -98.933334, 19.266666, -6.00, 249],
["Villahermosa", "Mexico", -92.916664, 17.983334, -6.00, 251],
["Veracruz", "Mexico", -96.133331, 19.200001, -6.00, 249],
["Tuxtla Gutierrez", "Mexico", -93.116669, 16.750000, -6.00, 251],
["Toluca", "Mexico", -99.667221, 19.288334, -6.00, 249],
["Tlalnepantla", "Mexico", -99.221664, 19.526945, -6.00, 249],
["Cuautitlan Izcalli", "Mexico", -99.246666, 19.646944, -6.00, 249],
["Tehuacan", "Mexico", -97.383331, 18.450001, -6.00, 249],
["Tampico", "Mexico", -97.849998, 22.216667, -6.00, 249],
["Reynosa", "Mexico", -98.283333, 26.083334, -6.00, 252],
["Puebla de Zaragoza", "Mexico", -98.199997, 19.049999, -6.00, 249],
["Pachuca de Soto", "Mexico", -98.733292, 20.116974, -6.00, 249],
["Oaxaca de Juarez", "Mexico", -96.716667, 17.049999, -6.00, 249],
["Nuevo Laredo", "Mexico", -99.516670, 27.500000, -6.00, 252],
["Nicolas Romero", "Mexico", -99.313057, 19.621944, -6.00, 249],
["Naucalpan de Juarez", "Mexico", -99.239632, 19.478508, -6.00, 249],
["Merida", "Mexico", -89.616669, 20.966667, -6.00, 251],
["Matamoros", "Mexico", -97.500000, 25.883333, -6.00, 252],
["Los Reyes", "Mexico", -98.966667, 19.350000, -6.00, 249],
["Jalapa Enriquez", "Mexico", -96.916664, 19.533333, -6.00, 249],
["Ixtapaluca", "Mexico", -98.883331, 19.316668, -6.00, 249],
["Ecatepec", "Mexico", -99.052498, 19.601110, -6.00, 249],
["Cuernavaca", "Mexico", -99.250000, 18.916666, -6.00, 249],
["Coatzacoalcos", "Mexico", -94.416664, 18.150000, -6.00, 249],
["Coacalco", "Mexico", -99.110275, 19.631666, -6.00, 249],
["Ciudad Victoria", "Mexico", -99.133331, 23.733334, -6.00, 252],
["Ciudad Nezahualcoyotl", "Mexico", -99.033058, 19.413610, -6.00, 249],
["Mexico City", "Mexico", -99.138611, 19.434166, -6.00, 249],
["Cancun", "Mexico", -86.846558, 21.174288, -6.00, 250],
["Campeche", "Mexico", -90.533333, 19.850000, -6.00, 251],
["Ciudad Lopez Mateos", "Mexico", -99.261391, 19.558332, -6.00, 249],
["Acapulco de Juarez", "Mexico", -99.916664, 16.850000, -6.00, 249],
["Zapopan", "Mexico", -103.400002, 20.716667, -6.00, 249],
["Uruapan del Progreso", "Mexico", -102.066666, 19.416666, -6.00, 249],
["Torreon", "Mexico", -103.433334, 25.549999, -6.00, 252],
["Tonala", "Mexico", -103.233330, 20.616667, -6.00, 249],
["Tlaquepaque", "Mexico", -103.316666, 20.650000, -6.00, 249],
["Tijuana", "Mexico", -117.016670, 32.533333, -8.00, 256],
["Tepic", "Mexico", -104.900002, 21.500000, -7.00, 253],
["Santa Catarina", "Mexico", -100.466667, 25.683332, -6.00, 252],
["San Nicolas de los Garzas", "Mexico", -100.300003, 25.750000, -6.00, 252],
["San Luis Potosi", "Mexico", -100.983330, 22.150000, -6.00, 249],
["Saltillo", "Mexico", -101.000000, 25.416666, -6.00, 252],
["Queretaro", "Mexico", -100.383331, 20.600000, -6.00, 249],
["Morelia", "Mexico", -101.116669, 19.700001, -6.00, 249],
["Monterrey", "Mexico", -100.316666, 25.666666, -6.00, 252],
["Mexicali", "Mexico", -115.468330, 32.651943, -8.00, 256],
["Mazatlan", "Mexico", -106.416664, 23.216667, -7.00, 253],
["Los Mochis", "Mexico", -108.966667, 25.766666, -7.00, 253],
["Leon", "Mexico", -101.666664, 21.116667, -6.00, 249],
["Irapuato", "Mexico", -101.349998, 20.683332, -6.00, 249],
["Hermosillo", "Mexico", -110.966667, 29.066668, -7.00, 255],
["Guadalupe", "Mexico", -100.250000, 25.683332, -6.00, 252],
["Guadalajara", "Mexico", -103.333336, 20.666666, -6.00, 249],
["Gomez Palacio", "Mexico", -103.500000, 25.566668, -6.00, 252],
["General Escobedo", "Mexico", -100.333336, 25.816668, -6.00, 252],
["Ensenada", "Mexico", -116.616669, 31.866667, -8.00, 256],
["Durango", "Mexico", -104.666664, 24.033333, -6.00, 252],
["Culiacan", "Mexico", -107.389725, 24.799444, -7.00, 253],
["Ciudad Obregon", "Mexico", -109.933334, 27.483334, -7.00, 255],
["Ciudad Juarez", "Mexico", -106.483330, 31.733334, -6.00, 252],
["Chihuahua", "Mexico", -106.083336, 28.633333, -6.00, 252],
["Celaya", "Mexico", -100.816666, 20.516666, -6.00, 249],
["Apodaca", "Mexico", -100.199997, 25.766666, -6.00, 252],
["Aguascalientes", "Mexico", -102.300003, 21.883333, -6.00, 249],
["Kuah", "Malaysia", 99.849998, 6.316667, 8.00, 257],
["Jerantut", "Malaysia", 102.366669, 3.933333, 8.00, 257],
["Raub", "Malaysia", 101.866669, 3.800000, 8.00, 257],
["Johor Bahru", "Malaysia", 103.750000, 1.466667, 8.00, 257],
["Shah Alam", "Malaysia", 101.532814, 3.085066, 8.00, 257],
["Klang", "Malaysia", 101.449997, 3.033333, 8.00, 257],
["Kota Kinabalu", "Malaysia", 116.066666, 5.983333, 8.00, 258],
["Sandakan", "Malaysia", 118.116669, 5.833333, 8.00, 258],
["Tawau", "Malaysia", 117.900002, 4.250000, 8.00, 258],
["Taiping", "Malaysia", 100.733330, 4.850000, 8.00, 257],
["Ipoh", "Malaysia", 101.083336, 4.583333, 8.00, 257],
["Kuala Terengganu", "Malaysia", 103.133331, 5.333333, 8.00, 257],
["Seremban", "Malaysia", 101.933334, 2.716667, 8.00, 257],
["Bukit Mertajam", "Malaysia", 100.466667, 5.366667, 8.00, 257],
["Petaling Jaya", "Malaysia", 101.650002, 3.083333, 8.00, 257],
["Kuala Lumpur", "Malaysia", 101.699997, 3.166667, 8.00, 257],
["Kuantan", "Malaysia", 103.333336, 3.800000, 8.00, 257],
["Sungai Petani", "Malaysia", 100.500000, 5.650000, 8.00, 257],
["Kuching", "Malaysia", 110.333336, 1.550000, 8.00, 258],
["Alor Setar", "Malaysia", 100.366669, 6.116667, 8.00, 257],
["Kota Baharu", "Malaysia", 102.250000, 6.133333, 8.00, 257],
["Miri", "Malaysia", 113.983330, 4.383333, 8.00, 258],
["Kampung Baru Subang", "Malaysia", 101.533333, 3.150000, 8.00, 257],
["Xai-Xai", "Mozambique", 33.644165, -25.051945, 2.00, 259],
["Dondo", "Mozambique", 34.743057, -19.609444, 2.00, 259],
["Macia", "Mozambique", 33.098888, -25.026945, 2.00, 259],
["Nampula", "Mozambique", 39.264721, -15.119722, 2.00, 259],
["Cidade de Nacala", "Mozambique", 40.672779, -14.542778, 2.00, 259],
["Matola", "Mozambique", 32.458889, -25.962223, 2.00, 259],
["Maputo", "Mozambique", 32.589169, -25.965279, 2.00, 259],
["Chimoio", "Mozambique", 33.483334, -19.116388, 2.00, 259],
["Beira", "Mozambique", 34.838890, -19.843611, 2.00, 259],
["Katima Mulilo", "Nairobi", 24.266666, -17.500000, 2.00, 260],
["Windhoek", "Nairobi", 17.083611, -22.570000, 2.00, 260],
["Warmbad", "Nairobi", 18.733334, -28.450001, 2.00, 260],
["We", "New Caledonia", 167.266663, -20.900000, 11.00, 261],
["Tadine", "New Caledonia", 167.883331, -21.549999, 11.00, 261],
["Paita", "New Caledonia", 166.366669, -22.133333, 11.00, 261],
["Birnin Konni", "Niger", 5.250000, 13.800000, 1.00, 262],
["Zinder", "Niger", 8.983334, 13.800000, 1.00, 262],
["Tillaberi", "Niger", 1.453056, 14.211667, 1.00, 262],
["Niamey", "Niger", 2.116667, 13.516666, 1.00, 262],
["Zuru", "Nigeria", 5.237500, 11.430278, 1.00, 264],
["Zungeru", "Nigeria", 6.155833, 9.812778, 1.00, 264],
["Zaria", "Nigeria", 7.700000, 11.066667, 1.00, 264],
["Warri", "Nigeria", 5.750000, 5.516667, 1.00, 264],
["Umuahia", "Nigeria", 7.483333, 5.533333, 1.00, 264],
["Ugep", "Nigeria", 8.083333, 5.800000, 1.00, 264],
["Sokoto", "Nigeria", 5.231389, 13.051389, 1.00, 264],
["Sagamu", "Nigeria", 3.650000, 6.850000, 1.00, 264],
["Port Harcourt", "Nigeria", 6.998611, 4.789167, 1.00, 264],
["Oyo", "Nigeria", 3.933333, 7.850000, 1.00, 264],
["Owo", "Nigeria", 5.583333, 7.183333, 1.00, 264],
["Owerri", "Nigeria", 7.033333, 5.483333, 1.00, 264],
["Onitsha", "Nigeria", 6.783333, 6.166667, 1.00, 264],
["Ondo", "Nigeria", 4.833333, 7.100000, 1.00, 264],
["Okene", "Nigeria", 6.233333, 7.550000, 1.00, 264],
["Mubi", "Nigeria", 13.270555, 10.268888, 1.00, 264],
["Minna", "Nigeria", 6.556944, 9.613889, 1.00, 264],
["Makurdi", "Nigeria", 8.533333, 7.733333, 1.00, 264],
["Maiduguri", "Nigeria", 13.160000, 11.845000, 1.00, 264],
["Lagos", "Nigeria", 3.395833, 6.453055, 1.00, 264],
["Katsina", "Nigeria", 7.599444, 12.997778, 1.00, 264],
["Kano", "Nigeria", 8.516666, 11.996388, 1.00, 264],
["Kaduna", "Nigeria", 7.440278, 10.523056, 1.00, 264],
["Jos", "Nigeria", 8.900000, 9.916667, 1.00, 264],
["Jimeta", "Nigeria", 12.466667, 9.283333, 1.00, 264],
["Iwo", "Nigeria", 4.183333, 7.633333, 1.00, 264],
["Ilorin", "Nigeria", 4.550000, 8.500000, 1.00, 264],
["Ilesa", "Nigeria", 4.733333, 7.616667, 1.00, 264],
["Ikot Ekpene", "Nigeria", 7.716667, 5.166667, 1.00, 264],
["Ikire", "Nigeria", 4.183333, 7.350000, 1.00, 264],
["Ijebu Ode", "Nigeria", 3.933333, 6.816667, 1.00, 264],
["Ibadan", "Nigeria", 3.896389, 7.387778, 1.00, 264],
["Gusau", "Nigeria", 6.666667, 12.164166, 1.00, 264],
["Gombe", "Nigeria", 11.171667, 10.289444, 1.00, 264],
["Enugu", "Nigeria", 7.483333, 6.433333, 1.00, 264],
["Effon Alaiye", "Nigeria", 4.916667, 7.650000, 1.00, 264],
["Ebute Ikorodu", "Nigeria", 3.491111, 6.602778, 1.00, 264],
["Damaturu", "Nigeria", 11.963889, 11.748611, 1.00, 264],
["Calabar", "Nigeria", 8.316667, 4.950000, 1.00, 264],
["Benin-City", "Nigeria", 5.633333, 6.333333, 1.00, 264],
["Bauchi", "Nigeria", 9.844167, 10.315833, 1.00, 264],
["Akure", "Nigeria", 5.200000, 7.250000, 1.00, 264],
["Abuja", "Nigeria", 7.533333, 9.083333, 1.00, 264],
["Abeokuta", "Nigeria", 3.350000, 7.150000, 1.00, 264],
["Aba", "Nigeria", 7.366667, 5.116667, 1.00, 264],
["Wiwili", "Nicaragua", -85.833336, 13.616667, -6.00, 265],
["Waspam", "Nicaragua", -83.966667, 14.733334, -6.00, 265],
["Waslala", "Nicaragua", -85.383331, 13.233334, -6.00, 265],
["Managua", "Nicaragua", -86.268333, 12.150833, -6.00, 265],
["Zwolle", "Netherlands", 6.094444, 52.512501, 1.00, 266],
["Zwijndrecht", "Netherlands", 4.633333, 51.817501, 1.00, 266],
["Zwaagwesteinde", "Netherlands", 6.036301, 53.257305, 1.00, 266],
["Utrecht", "Netherlands", 5.122222, 52.090832, 1.00, 266],
["The Hague", "Netherlands", 4.298611, 52.076668, 1.00, 266],
["Rotterdam", "Netherlands", 4.479167, 51.922501, 1.00, 266],
["Eindhoven", "Netherlands", 5.477778, 51.440834, 1.00, 266],
["Amsterdam", "Netherlands", 4.899902, 52.373085, 1.00, 266],
["Vadso", "Norway", 29.769722, 70.073059, 1.00, 267],
["Hammerfest", "Norway", 23.688334, 70.661667, 1.00, 267],
["Alta", "Norway", 23.241667, 69.966667, 1.00, 267],
["Oslo", "Norway", 10.738921, 59.913246, 1.00, 267],
["Bergen", "Norway", 5.324722, 60.391109, 1.00, 267],
["Waling", "Nepal", 83.766670, 27.983334, 5.75, 268],
["Tulsipur", "Nepal", 82.300003, 28.133333, 5.75, 268],
["Tikapur", "Nepal", 81.133331, 28.500000, 5.75, 268],
["Kathmandu", "Nepal", 85.316666, 27.716667, 5.75, 268],
["Wellington", "New Zealand", 174.783340, -41.299999, 12.00, 271],
["Wanganui", "New Zealand", 175.050003, -39.933334, 12.00, 271],
["Waiuku", "New Zealand", 174.750000, -37.250000, 12.00, 271],
["North Shore", "New Zealand", 174.750000, -36.799999, 12.00, 271],
["Christchurch", "New Zealand", 172.633331, -43.533333, 12.00, 271],
["Auckland", "New Zealand", 174.766663, -36.866665, 12.00, 271],
["Sur", "Oman", 59.528889, 22.566668, 4.00, 273],
["Suhar", "Oman", 56.743889, 24.368889, 4.00, 273],
["Sufalat Sama'il", "Oman", 58.016666, 23.316668, 4.00, 273],
["Muscat", "Oman", 58.593334, 23.613333, 4.00, 273],
["As Sib", "Oman", 58.182499, 23.680277, 4.00, 273],
["Volcan", "Panama", -82.633331, 8.766666, -5.00, 274],
["Vista Alegre", "Panama", -79.699997, 8.933333, -5.00, 274],
["Veracruz", "Panama", -79.633331, 8.883333, -5.00, 274],
["San Miguelito", "Panama", -79.500000, 9.033333, -5.00, 274],
["Panama", "Panama", -79.533333, 8.966667, -5.00, 274],
["Zorritos", "Peru", -80.666664, -3.666667, -5.00, 275],
["Yurimaguas", "Peru", -76.083336, -5.900000, -5.00, 275],
["Yungay", "Peru", -77.743614, -9.138333, -5.00, 275],
["Trujillo", "Peru", -79.029976, -8.115994, -5.00, 275],
["Pucallpa", "Peru", -74.553864, -8.379148, -5.00, 275],
["Piura", "Peru", -80.633331, -5.200000, -5.00, 275],
["Iquitos", "Peru", -73.247223, -3.748056, -5.00, 275],
["Chimbote", "Peru", -78.578331, -9.085278, -5.00, 275],
["Chiclayo", "Peru", -79.841667, -6.773611, -5.00, 275],
["Tacna", "Peru", -70.248337, -18.005556, -5.00, 275],
["Lima", "Peru", -77.050003, -12.050000, -5.00, 275],
["Juliaca", "Peru", -70.133331, -15.500000, -5.00, 275],
["Ica", "Peru", -75.725555, -14.068055, -5.00, 275],
["Huancayo", "Peru", -75.233330, -12.066667, -5.00, 275],
["Cusco", "Peru", -71.978058, -13.518333, -5.00, 275],
["Callao", "Peru", -77.150002, -12.066667, -5.00, 275],
["Arequipa", "Peru", -71.535004, -16.398890, -5.00, 275],
["Punaauia", "Tahiti", -149.600006, -17.633333, -10.00, 276],
["Pirae", "Tahiti", -149.533340, -17.516666, -10.00, 276],
["Papeete", "Tahiti", -149.566666, -17.533333, -10.00, 276],
["Wewak", "Papua New Guinea", 143.633331, -3.550000, 10.00, 279],
["Wau", "Papua New Guinea", 146.716660, -7.333333, 10.00, 279],
["Vanimo", "Papua New Guinea", 141.300003, -2.683333, 10.00, 279],
["Port Moresby", "Papua New Guinea", 147.192505, -9.464723, 10.00, 279],
["Zaragoza", "Philippines", 119.943611, 16.388332, 8.00, 280],
["Zamboanguita", "Philippines", 123.199165, 9.105000, 8.00, 280],
["Zamboanga", "Philippines", 122.073891, 6.910278, 8.00, 280],
["Taytay", "Philippines", 121.132500, 14.569167, 8.00, 280],
["Santol", "Philippines", 120.567497, 15.162222, 8.00, 280],
["Santa Rosa", "Philippines", 121.111389, 14.312222, 8.00, 280],
["San Pedro", "Philippines", 121.055557, 14.364722, 8.00, 280],
["San Pablo", "Philippines", 121.325836, 14.066944, 8.00, 280],
["San Jose del Monte", "Philippines", 121.045280, 14.813889, 8.00, 280],
["San Fernando", "Philippines", 120.685555, 15.030278, 8.00, 280],
["Olongapo", "Philippines", 120.282776, 14.829166, 8.00, 280],
["Mantampay", "Philippines", 124.216667, 8.166667, 8.00, 280],
["Mansilingan", "Philippines", 122.978889, 10.631111, 8.00, 280],
["Manila", "Philippines", 120.982224, 14.604167, 8.00, 280],
["Mandaue City", "Philippines", 123.922226, 10.323611, 8.00, 280],
["Lucena", "Philippines", 121.617226, 13.931389, 8.00, 280],
["Lipa", "Philippines", 121.173889, 13.939445, 8.00, 280],
["Libertad", "Philippines", 125.501945, 8.944167, 8.00, 280],
["Lapu-Lapu City", "Philippines", 123.949448, 10.310278, 8.00, 280],
["Imus", "Philippines", 120.936668, 14.429722, 8.00, 280],
["Iloilo", "Philippines", 122.564445, 10.696944, 8.00, 280],
["Davao", "Philippines", 125.612778, 7.073056, 8.00, 280],
["Dasmarinas", "Philippines", 120.936668, 14.329444, 8.00, 280],
["Cebu City", "Philippines", 123.891670, 10.311111, 8.00, 280],
["Calamba", "Philippines", 121.165276, 14.211667, 8.00, 280],
["Cainta", "Philippines", 121.116943, 14.580000, 8.00, 280],
["Cagayan de Oro", "Philippines", 124.647224, 8.482223, 8.00, 280],
["Cabanatuan", "Philippines", 120.967499, 15.486944, 8.00, 280],
["Binangonan", "Philippines", 121.191948, 14.465555, 8.00, 280],
["Batangas", "Philippines", 121.059998, 13.759444, 8.00, 280],
["Baguio", "Philippines", 120.593056, 16.416389, 8.00, 280],
["Bacoor", "Philippines", 120.942497, 14.457778, 8.00, 280],
["Antipolo", "Philippines", 121.175278, 14.586389, 8.00, 280],
["Chuhar Jamali", "Pakistan", 67.993057, 24.388889, 5.00, 281],
["Pir jo Goth", "Pakistan", 68.616669, 27.600000, 5.00, 281],
["Khairpur", "Pakistan", 68.766670, 27.533333, 5.00, 281],
["Sukkur", "Pakistan", 68.866669, 27.700001, 5.00, 281],
["Sialkot", "Pakistan", 74.516670, 32.500000, 5.00, 281],
["Shekhupura", "Pakistan", 73.978333, 31.713055, 5.00, 281],
["Sargodha", "Pakistan", 72.671112, 32.083611, 5.00, 281],
["Sahiwal", "Pakistan", 73.099998, 30.666666, 5.00, 281],
["Rawalpindi", "Pakistan", 73.066666, 33.599998, 5.00, 281],
["Quetta", "Pakistan", 67.012497, 30.187222, 5.00, 281],
["Peshawar", "Pakistan", 71.573334, 34.007778, 5.00, 281],
["Okara", "Pakistan", 73.445831, 30.808056, 5.00, 281],
["Nawabshah", "Pakistan", 68.416664, 26.250000, 5.00, 281],
["Multan", "Pakistan", 71.475281, 30.195555, 5.00, 281],
["Mirpur Khas", "Pakistan", 69.000000, 25.533333, 5.00, 281],
["Mingaora", "Pakistan", 72.361115, 34.776112, 5.00, 281],
["Mardan", "Pakistan", 72.045830, 34.198334, 5.00, 281],
["Larkana", "Pakistan", 68.216667, 27.549999, 5.00, 281],
["Lahore", "Pakistan", 74.343613, 31.549723, 5.00, 281],
["Kasur", "Pakistan", 74.446663, 31.115555, 5.00, 281],
["Karachi", "Pakistan", 67.050003, 24.866667, 5.00, 281],
["Jhang Sadr", "Pakistan", 72.311943, 31.274166, 5.00, 281],
["Islamabad", "Pakistan", 73.059082, 33.610046, 5.00, 281],
["Hyderabad", "Pakistan", 68.366669, 25.366667, 5.00, 281],
["Gujrat", "Pakistan", 74.083336, 32.566666, 5.00, 281],
["Gujranwala", "Pakistan", 74.183334, 32.150002, 5.00, 281],
["Faisalabad", "Pakistan", 73.083336, 31.416666, 5.00, 281],
["Dera Ghazi Khan", "Pakistan", 70.634445, 30.056110, 5.00, 281],
["Chiniot", "Pakistan", 72.978889, 31.719999, 5.00, 281],
["Bahawalpur", "Pakistan", 71.683334, 29.400000, 5.00, 281],
["Zyrardow", "Poland", 20.433332, 52.066666, 1.00, 282],
["Zielonka", "Poland", 21.166666, 52.299999, 1.00, 282],
["Zamosc", "Poland", 23.250000, 50.716667, 1.00, 282],
["Warsaw", "Poland", 21.000000, 52.250000, 1.00, 282],
["Radom", "Poland", 21.150000, 51.416668, 1.00, 282],
["Lublin", "Poland", 22.566668, 51.250000, 1.00, 282],
["Kielce", "Poland", 20.666666, 50.833332, 1.00, 282],
["Bialystok", "Poland", 23.150000, 53.133335, 1.00, 282],
["Wroclaw", "Poland", 17.033333, 51.099998, 1.00, 282],
["Torun", "Poland", 18.600000, 53.033333, 1.00, 282],
["Szczecin Pogodno", "Poland", 14.516666, 53.450001, 1.00, 282],
["Sosnowiec", "Poland", 19.166666, 50.299999, 1.00, 282],
["Poznan", "Poland", 16.966667, 52.416668, 1.00, 282],
["Lodz", "Poland", 19.466667, 51.750000, 1.00, 282],
["Krakow", "Poland", 19.916666, 50.083332, 1.00, 282],
["Katowice", "Poland", 19.016666, 50.266666, 1.00, 282],
["Gdynia", "Poland", 18.549999, 54.500000, 1.00, 282],
["Gdansk", "Poland", 18.666666, 54.349998, 1.00, 282],
["Czestochowa", "Poland", 19.116667, 50.799999, 1.00, 282],
["Bydgoszcz", "Poland", 18.000000, 53.150002, 1.00, 282],
["Saint-Pierre", "Miquelon", -56.183334, 46.766666, -3.00, 283],
["Adjuntas", "Puerto Rico", -66.801765, 18.158493, -4.00, 285],
["Aguadilla", "Puerto Rico", -67.154068, 18.427444, -4.00, 285],
["Aibonito", "Puerto Rico", -66.265999, 18.139959, -4.00, 285],
["Bayamon", "Puerto Rico", -66.155724, 18.398560, -4.00, 285],
["Bayamon Gardens", "Puerto Rico", -66.179886, 18.377728, -4.00, 285],
["San Juan", "Puerto Rico", -66.105721, 18.466333, -4.00, 285],
["Rafah", "Gaza Strip", 34.250832, 31.284166, 2.00, 286],
["Khan Yunis", "Gaza Strip", 34.302502, 31.343889, 2.00, 286],
["Jabaliya", "Gaza Strip", 34.483334, 31.533333, 2.00, 286],
["Vila Vicosa", "Portugal", -7.416667, 38.783333, 0.00, 287],
["Vila Real de Santo Antonio", "Portugal", -7.416667, 37.200001, 0.00, 287],
["Vila Franca de Xira", "Portugal", -8.983334, 38.950001, 0.00, 287],
["Lisbon", "Portugal", -9.133333, 38.716667, 0.00, 287],
["Porto", "Portugal", -8.616667, 41.150002, 0.00, 287],
["Ypacarai", "Paraguay", -57.266666, -25.383333, -3.00, 291],
["Yaguaron", "Paraguay", -57.299999, -25.600000, -3.00, 291],
["Villarrica", "Paraguay", -56.433334, -25.750000, -3.00, 291],
["San Lorenzo", "Paraguay", -57.533333, -25.333334, -3.00, 291],
["Asuncion", "Paraguay", -57.666668, -25.266666, -3.00, 291],
["Umm Salal Muhammad", "Qatar", 51.403889, 25.416945, 3.00, 292],
["Dukhan", "Qatar", 50.785831, 25.429722, 3.00, 292],
["Ar Rayyan", "Qatar", 51.424446, 25.291945, 3.00, 292],
["Doha", "Qatar", 51.533333, 25.286667, 3.00, 292],
["Trois-Bassins", "Reunion", 55.299999, -21.100000, 4.00, 293],
["Salazie", "Reunion", 55.549999, -21.016666, 4.00, 293],
["Saint-Pierre", "Reunion", 55.483334, -21.316668, 4.00, 293],
["Zvoristea", "Romania", 26.283333, 47.833332, 2.00, 294],
["Zorleni", "Romania", 27.716667, 46.266666, 2.00, 294],
["Zlatna", "Romania", 23.216667, 46.116665, 2.00, 294],
["Timisoara", "Romania", 21.227222, 45.749443, 2.00, 294],
["Ploiesti", "Romania", 26.016666, 44.950001, 2.00, 294],
["nagyvarad", "Romania", 21.933332, 47.066666, 2.00, 294],
["Iasi", "Romania", 27.600000, 47.166668, 2.00, 294],
["Galati", "Romania", 28.049999, 45.450001, 2.00, 294],
["Craiova", "Romania", 23.799999, 44.316666, 2.00, 294],
["Constanta", "Romania", 28.650000, 44.183334, 2.00, 294],
["Cluj-Napoca", "Romania", 23.600000, 46.766666, 2.00, 294],
["Bucharest", "Romania", 26.100000, 44.433334, 2.00, 294],
["Brasov", "Romania", 25.583334, 45.633335, 2.00, 294],
["Braila", "Romania", 27.983334, 45.266666, 2.00, 294],
["Constanta", "Romania", 28.637152, 44.187374, 2.00, 294],
["Zvecka", "Serbia", 20.164722, 44.638889, 1.00, 295],
["Zemun", "Serbia", 20.401112, 44.843056, 1.00, 295],
["Zabalj", "Serbia", 20.063889, 45.372223, 1.00, 295],
["Pristina", "Serbia", 21.166666, 42.666668, 1.00, 295],
["Belgrade", "Serbia", 20.468056, 44.818611, 1.00, 295],
["Udomlya", "Russia", 34.992500, 57.879444, 3.00, 297],
["Sasovo", "Russia", 41.912777, 54.348331, 3.00, 297],
["Novozavidovskiy", "Russia", 36.433334, 56.549999, 3.00, 297],
["Zelenograd", "Russia", 37.181389, 55.982498, 3.00, 297],
["Yoshkar-Ola", "Russia", 47.890778, 56.638767, 3.00, 297],
["Yaroslavl'", "Russia", 39.866665, 57.616665, 3.00, 297],
["Voronezh", "Russia", 39.169998, 51.666389, 3.00, 297],
["Volzhskiy", "Russia", 44.771667, 48.790554, 4.00, 299],
["Vologda", "Russia", 39.900002, 59.216667, 3.00, 297],
["Volgograd", "Russia", 44.585835, 48.804722, 4.00, 299],
["Vladimir", "Russia", 40.398056, 56.142776, 3.00, 297],
["Vladikavkaz", "Russia", 44.667778, 43.036667, 3.00, 298],
["Ul'yanovsk", "Russia", 48.400002, 54.333332, 3.00, 298],
["Ufa", "Russia", 56.037498, 54.775002, 5.00, 300],
["Tver'", "Russia", 35.893055, 56.861946, 3.00, 297],
["Tula", "Russia", 37.611111, 54.204445, 3.00, 297],
["Tol'yatti", "Russia", 49.412498, 53.523335, 4.00, 299],
["Tambov", "Russia", 41.433887, 52.731667, 3.00, 297],
["Taganrog", "Russia", 38.909443, 47.221390, 3.00, 298],
["Syktyvkar", "Russia", 50.812222, 61.666668, 3.00, 297],
["Sterlitamak", "Russia", 55.946388, 53.633057, 5.00, 300],
["Stavropol'", "Russia", 41.973331, 45.042778, 3.00, 298],
["Staryy Oskol", "Russia", 37.841667, 51.296665, 3.00, 297],
["Sochi", "Russia", 39.730278, 43.599998, 3.00, 298],
["Smolensk", "Russia", 32.040001, 54.781666, 3.00, 297],
["Shakhty", "Russia", 40.205833, 47.712223, 3.00, 298],
["Saratov", "Russia", 46.033333, 51.566666, 4.00, 299],
["Saransk", "Russia", 45.183334, 54.183334, 3.00, 297],
["Saint Petersburg", "Russia", 30.264166, 59.894444, 3.00, 297],
["Samara", "Russia", 50.150002, 53.200001, 4.00, 299],
["Rybinsk", "Russia", 38.833332, 58.049999, 3.00, 297],
["Ryazan'", "Russia", 39.740002, 54.619720, 3.00, 297],
["Rostov-na-Donu", "Russia", 39.713890, 47.236389, 3.00, 298],
["Pskov", "Russia", 28.333334, 57.833332, 3.00, 297],
["Petrozavodsk", "Russia", 34.333332, 61.816666, 3.00, 297],
["Perm'", "Russia", 56.250000, 58.000000, 5.00, 300],
["Penza", "Russia", 45.000000, 53.195835, 3.00, 298],
["Orsk", "Russia", 58.570000, 51.225277, 5.00, 300],
["Orenburg", "Russia", 55.098610, 51.784721, 5.00, 300],
["Orel", "Russia", 36.080276, 52.965832, 3.00, 297],
["Novorossiysk", "Russia", 37.770832, 44.723888, 3.00, 298],
["Velikiy Novgorod", "Russia", 31.283333, 58.516666, 3.00, 297],
["Nizhniy Tagil", "Russia", 59.965000, 57.919445, 5.00, 300],
["Nizhniy Novgorod", "Russia", 44.002045, 56.328674, 3.00, 297],
["Nizhnekamsk", "Russia", 51.816944, 55.638332, 3.00, 297],
["Naberezhnyye Chelny", "Russia", 52.428890, 55.756111, 3.00, 297],
["Murmansk", "Russia", 33.081944, 68.971664, 3.00, 297],
["Moskva", "Russia", 37.615555, 55.752224, 3.00, 297],
["Makhachkala", "Russia", 47.502224, 42.975277, 3.00, 298],
["Magnitogorsk", "Russia", 59.047222, 53.418610, 5.00, 300],
["Lipetsk", "Russia", 39.568890, 52.618610, 3.00, 297],
["Kursk", "Russia", 36.193890, 51.730278, 3.00, 297],
["Krasnodar", "Russia", 38.976944, 45.032780, 3.00, 298],
["Kostroma", "Russia", 40.934444, 57.770832, 3.00, 297],
["Kirov", "Russia", 49.658333, 58.596943, 4.00, 299],
["Kazan'", "Russia", 49.133335, 55.750000, 3.00, 297],
["Kaluga", "Russia", 36.270557, 54.535831, 3.00, 297],
["Kaliningrad", "Russia", 20.500000, 54.709999, 2.00, 296],
["Izhevsk", "Russia", 53.233334, 56.849998, 4.00, 299],
["Ivanovo", "Russia", 40.985832, 56.994167, 3.00, 297],
["Dzerzhinsk", "Russia", 43.463055, 56.238888, 3.00, 297],
["Cherepovets", "Russia", 37.900002, 59.133335, 3.00, 297],
["Cheboksary", "Russia", 47.251945, 56.132221, 3.00, 297],
["Bryansk", "Russia", 34.380554, 53.287498, 3.00, 297],
["Belgorod", "Russia", 36.580002, 50.610001, 3.00, 297],
["Balakovo", "Russia", 47.779999, 52.029999, 4.00, 299],
["Astrakhan'", "Russia", 48.040001, 46.340000, 4.00, 299],
["Arkhangel'sk", "Russia", 40.540001, 64.540001, 3.00, 297],
["Yekaterinburg", "Russia", 60.612499, 56.857498, 5.00, 300],
["Tyumen'", "Russia", 65.527222, 57.152222, 5.00, 300],
["Tomsk", "Russia", 84.966667, 56.500000, 7.00, 303],
["Surgut", "Russia", 73.416664, 61.250000, 5.00, 300],
["Omsk", "Russia", 73.400002, 55.000000, 6.00, 301],
["Novosibirsk", "Russia", 82.934441, 55.041111, 7.00, 303],
["Novokuznetsk", "Russia", 87.099998, 53.750000, 7.00, 303],
["Nizhnevartovsk", "Russia", 76.566666, 60.933334, 5.00, 300],
["Kurgan", "Russia", 65.333336, 55.450001, 5.00, 300],
["Krasnoyarsk", "Russia", 92.791664, 56.009724, 7.00, 303],
["Kemerovo", "Russia", 86.083336, 55.333332, 7.00, 303],
["Chelyabinsk", "Russia", 61.429722, 55.154446, 5.00, 300],
["Biysk", "Russia", 85.250000, 52.566666, 7.00, 303],
["Barnaul", "Russia", 83.760002, 53.360001, 7.00, 303],
["Vladivostok", "Russia", 131.873535, 43.105621, 10.00, 306],
["Ulan-Ude", "Russia", 107.616669, 51.833332, 8.00, 304],
["Komsomol'sk-na-Amure", "Russia", 137.015244, 50.551987, 10.00, 307],
["Khabarovsk", "Russia", 135.092773, 48.480835, 10.00, 307],
["Irkutsk", "Russia", 104.296387, 52.297779, 8.00, 304],
["Blagoveshchensk", "Russia", 127.533333, 50.266666, 9.00, 305],
["Angarsk", "Russia", 103.879997, 52.529999, 8.00, 304],
["Bratsk", "Russia", 101.614166, 56.132500, 8.00, 304],
["Khabarovsk Vtoroy", "Russia", 135.135559, 48.443054, 10.00, 307],
["Ruhengeri", "Rwanda", 29.635834, -1.504167, 2.00, 311],
["Nzega", "Rwanda", 29.566668, -2.483333, 2.00, 311],
["Kigali", "Rwanda", 30.060556, -1.953611, 2.00, 311],
["Yanbu` al Bahr", "Saudi Arabia", 38.048611, 24.085278, 3.00, 312],
["Umm Lajj", "Saudi Arabia", 37.268890, 25.024166, 3.00, 312],
["Umm as Sahik", "Saudi Arabia", 49.916389, 26.653610, 3.00, 312],
["Tabuk", "Saudi Arabia", 36.583332, 28.383333, 3.00, 312],
["Sultanah", "Saudi Arabia", 39.583332, 24.500000, 3.00, 312],
["Najran", "Saudi Arabia", 44.184166, 17.505556, 3.00, 312],
["Mecca", "Saudi Arabia", 39.826111, 21.426666, 3.00, 312],
["Khamis Mushayt", "Saudi Arabia", 42.729168, 18.306389, 3.00, 312],
["Jiddah", "Saudi Arabia", 39.219166, 21.516945, 3.00, 312],
["Buraydah", "Saudi Arabia", 43.971668, 26.331667, 3.00, 312],
["At Ta'if", "Saudi Arabia", 40.415833, 21.270277, 3.00, 312],
["Riyadh", "Saudi Arabia", 46.772778, 24.640833, 3.00, 312],
["Al Mubarraz", "Saudi Arabia", 49.580833, 25.410000, 3.00, 312],
["Medina", "Saudi Arabia", 39.614166, 24.468611, 3.00, 312],
["Al Jubayl", "Saudi Arabia", 49.661388, 27.004723, 3.00, 312],
["Al Hufuf", "Saudi Arabia", 49.586666, 25.378334, 3.00, 312],
["Ad Dammam", "Saudi Arabia", 50.114166, 26.425833, 3.00, 312],
["Abha", "Saudi Arabia", 42.505280, 18.216389, 3.00, 312],
["Honiara", "Solomon Islands", 159.949997, -9.433333, 11.00, 313],
["Gizo", "Solomon Islands", 156.850006, -8.100000, 11.00, 313],
["Victoria", "Mahe", 55.450001, -4.616667, 4.00, 314],
["Zalingei", "Sudan", 23.483334, 12.900000, 3.00, 315],
["Yei", "Sudan", 30.678612, 4.091389, 3.00, 315],
["Yambio", "Sudan", 28.416389, 4.570556, 3.00, 315],
["Wad Madani", "Sudan", 33.533333, 14.400000, 3.00, 315],
["Omdurman", "Sudan", 32.437222, 15.636111, 3.00, 315],
["Kusti", "Sudan", 32.666668, 13.166667, 3.00, 315],
["Kassala", "Sudan", 36.398888, 15.455833, 3.00, 315],
["Al Ubayyid", "Sudan", 30.216667, 13.183333, 3.00, 315],
["Khartoum", "Sudan", 32.534168, 15.588056, 3.00, 315],
["Al Fashir", "Sudan", 25.350000, 13.633333, 3.00, 315],
["Umea", "Sweden", 20.250000, 63.833332, 1.00, 316],
["Skelleftea", "Sweden", 20.950001, 64.766670, 1.00, 316],
["Pitea", "Sweden", 21.500000, 65.333336, 1.00, 316],
["Stockholm", "Sweden", 18.062639, 59.329468, 1.00, 316],
["Malmoe", "Sweden", 13.000731, 55.605869, 1.00, 316],
["Goteborg", "Sweden", 11.966667, 57.716667, 1.00, 316],
["Singapore", "Singapore", 103.855835, 1.293056, 8.00, 317],
["Zagorje ob Savi", "Slovenia", 15.001389, 46.134167, 1.00, 319],
["Vrhnika", "Slovenia", 14.295556, 45.966110, 1.00, 319],
["Trbovlje", "Slovenia", 15.053333, 46.154999, 1.00, 319],
["Ljubljana", "Slovenia", 14.514444, 46.055279, 1.00, 319],
["Vranov nad Topl'ou", "Slovakia", 21.683332, 48.900002, 1.00, 321],
["Trebisov", "Slovakia", 21.716667, 48.633335, 1.00, 321],
["Svit", "Slovakia", 20.200001, 49.066666, 1.00, 321],
["Kosice", "Slovakia", 21.250000, 48.716667, 1.00, 321],
["Bratislava", "Slovakia", 17.116667, 48.150002, 1.00, 321],
["Yengema", "Sierra Leone", -11.166667, 8.716667, 0.00, 322],
["Waterloo", "Sierra Leone", -13.071944, 8.338333, 0.00, 322],
["Tombodu", "Sierra Leone", -10.616667, 8.133333, 0.00, 322],
["Freetown", "Sierra Leone", -13.234167, 8.490000, 0.00, 322],
["Serravalle", "San Marino", 12.500000, 43.950001, 1.00, 323],
["Acquaviva", "San Marino", 12.416667, 43.950001, 1.00, 323],
["Ziguinchor", "Senegal", -16.271944, 12.583333, 0.00, 324],
["Velingara", "Senegal", -14.116667, 13.150000, 0.00, 324],
["Tionk Essil", "Senegal", -16.521667, 12.785556, 0.00, 324],
["Thies Nones", "Senegal", -16.966667, 14.783333, 0.00, 324],
["Grand Dakar", "Senegal", -17.455278, 14.708889, 0.00, 324],
["Dakar", "Senegal", -17.443886, 14.695112, 0.00, 324],
["Yeed", "Somalia", 43.033333, 4.550000, 3.00, 325],
["Wanlaweyn", "Somalia", 44.900002, 2.616667, 3.00, 325],
["Waajid", "Somalia", 43.250000, 3.800000, 3.00, 325],
["Mogadishu", "Somalia", 45.366665, 2.066667, 3.00, 325],
["Chisimayu", "Somalia", 42.533333, -0.366667, 3.00, 325],
["Hargeysa", "Somalia", 44.064999, 9.560000, 3.00, 325],
["Berbera", "Somalia", 45.016388, 10.435555, 3.00, 325],
["Paramaribo", "Suriname", -55.166668, 5.833333, -3.00, 326],
["Nieuw Nickerie", "Suriname", -56.983334, 5.950000, -3.00, 326],
["Moengo", "Suriname", -54.400002, 5.616667, -3.00, 326],
["Sao Tome", "Sao Tome", 6.733333, 0.333333, 0.00, 327],
["Zaragoza", "El Salvador", -89.288887, 13.589444, -6.00, 328],
["Zacatecoluca", "El Salvador", -88.866669, 13.500000, -6.00, 328],
["Usulutan", "El Salvador", -88.449997, 13.350000, -6.00, 328],
["Soyapango", "El Salvador", -89.151390, 13.734722, -6.00, 328],
["San Salvador", "El Salvador", -89.203056, 13.708611, -6.00, 328],
["Yabrud", "Syria", 36.666668, 33.966667, 2.00, 329],
["Tayyibat al Imam", "Syria", 36.716667, 35.266666, 2.00, 329],
["Tartus", "Syria", 35.883335, 34.883335, 2.00, 329],
["Hims", "Syria", 36.716667, 34.733334, 2.00, 329],
["Hamah", "Syria", 36.750000, 35.133335, 2.00, 329],
["Aleppo", "Syria", 37.158611, 36.202778, 2.00, 329],
["Damascus", "Syria", 36.299999, 33.500000, 2.00, 329],
["Dayr az Zawr", "Syria", 40.150002, 35.333332, 2.00, 329],
["Latakia", "Syria", 35.783333, 35.516666, 2.00, 329],
["Siteki", "Swaziland", 31.950001, -26.450001, 2.00, 330],
["Piggs Peak", "Swaziland", 31.250000, -25.966667, 2.00, 330],
["Mhlume", "Swaziland", 31.850000, -26.033333, 2.00, 330],
["Biltine", "Chad", 20.916666, 14.533333, 1.00, 332],
["Am Timan", "Chad", 20.283333, 11.033333, 1.00, 332],
["Adre", "Chad", 22.200001, 13.466667, 1.00, 332],
["N'Djamena", "Chad", 15.049167, 12.113055, 1.00, 332],
["Vogan", "Togo", 1.533333, 6.333333, 0.00, 334],
["Tsevie", "Togo", 1.213333, 6.426111, 0.00, 334],
["Tchamba", "Togo", 1.416667, 9.033333, 0.00, 334],
["Lome", "Togo", 1.222778, 6.131944, 0.00, 334],
["Don Sak", "Thailand", 99.683334, 9.300000, 7.00, 335],
["Ban Sam Roi Yot", "Thailand", 99.883331, 12.200000, 7.00, 335],
["Phetchaburi", "Thailand", 99.949997, 13.100000, 7.00, 335],
["Chiang Mai", "Thailand", 98.981667, 18.790277, 7.00, 335],
["Udon Thani", "Thailand", 102.793053, 17.407499, 7.00, 335],
["Samut Prakan", "Thailand", 100.599998, 13.600000, 7.00, 335],
["Nakhon Ratchasima", "Thailand", 102.116669, 14.966667, 7.00, 335],
["Bangkok", "Thailand", 100.516670, 13.750000, 7.00, 335],
["Chon Buri", "Thailand", 100.983330, 13.366667, 7.00, 335],
["Yovan", "Tajikistan", 69.043053, 38.313057, 5.00, 336],
["Vose'", "Tajikistan", 69.644165, 37.802502, 5.00, 336],
["Vakhsh", "Tajikistan", 68.831108, 37.710835, 5.00, 336],
["Dushanbe", "Tajikistan", 68.773888, 38.560001, 5.00, 336],
["Dili", "Lesser Sunda Islands", 125.573608, -8.558611, 9.00, 338],
["Balkanabat", "Turkmenistan", 54.365002, 39.511944, 5.00, 339],
["Kaka", "Turkmenistan", 59.599998, 37.349998, 5.00, 339],
["Gumdag", "Turkmenistan", 54.590557, 39.206112, 5.00, 339],
["Ashgabat", "Turkmenistan", 58.383335, 37.950001, 5.00, 339],
["Turkmenabat", "Turkmenistan", 63.575001, 39.101387, 5.00, 339],
["Zawiyat al Jadidi", "Tunis", 10.583333, 36.650002, 1.00, 340],
["Zaghouan", "Tunis", 10.150000, 36.400002, 1.00, 340],
["Oued Lill", "Tunis", 10.042222, 36.834167, 1.00, 340],
["Tunis", "Tunis", 10.179722, 36.802776, 1.00, 340],
["Sfax", "Tunis", 10.760278, 34.740555, 1.00, 340],
["Kale", "Turkey", 29.985001, 36.244446, 2.00, 342],
["Zara", "Turkey", 37.758335, 39.897778, 2.00, 342],
["Yunak", "Turkey", 31.735556, 38.817223, 2.00, 342],
["Van", "Turkey", 43.380001, 38.494167, 2.00, 342],
["Sanliurfa", "Turkey", 38.792778, 37.151112, 2.00, 342],
["Tarsus", "Turkey", 34.891666, 36.917778, 2.00, 342],
["Sivas", "Turkey", 37.016109, 39.748333, 2.00, 342],
["Osmaniye", "Turkey", 36.247776, 37.074165, 2.00, 342],
["Mercin", "Turkey", 34.617920, 36.795265, 2.00, 342],
["Manisa", "Turkey", 27.426111, 38.613056, 2.00, 342],
["Malatya", "Turkey", 38.311943, 38.353333, 2.00, 342],
["Konya", "Turkey", 32.482498, 37.865555, 2.00, 342],
["Kirikkale", "Turkey", 33.506390, 39.845280, 2.00, 342],
["Kayseri", "Turkey", 35.485279, 38.732224, 2.00, 342],
["Kahramanmaras", "Turkey", 36.931667, 37.587502, 2.00, 342],
["Izmir", "Turkey", 27.150278, 38.407223, 2.00, 342],
["Gaziantep", "Turkey", 37.382500, 37.059444, 2.00, 342],
["Eskisehir Ili", "Turkey", 31.166666, 39.666668, 2.00, 342],
["Eskisehir", "Turkey", 30.520555, 39.776669, 2.00, 342],
["Erzurum", "Turkey", 41.276943, 39.908611, 2.00, 342],
["Elazig", "Turkey", 39.220554, 38.675278, 2.00, 342],
["Diyarbakir", "Turkey", 40.210556, 37.918888, 2.00, 342],
["Denizli", "Turkey", 29.087500, 37.774166, 2.00, 342],
["Batman", "Turkey", 41.120556, 37.882778, 2.00, 342],
["Balikesir", "Turkey", 27.886110, 39.649166, 2.00, 342],
["Antalya", "Turkey", 30.689722, 36.912498, 2.00, 342],
["Ankara", "Turkey", 32.864445, 39.927223, 2.00, 342],
["Adiyaman", "Turkey", 38.278332, 37.759167, 2.00, 342],
["Adana", "Turkey", 35.328888, 37.001667, 2.00, 342],
["Batikent", "Turkey", 32.730835, 39.968334, 2.00, 342],
["Trabzon", "Turkey", 39.726944, 41.005001, 2.00, 342],
["Samsun", "Turkey", 36.330002, 41.286667, 2.00, 342],
["Istanbul", "Turkey", 28.949661, 41.013844, 2.00, 342],
["Gebze", "Turkey", 29.430555, 40.797779, 2.00, 342],
["Esenyurt", "Turkey", 28.675278, 41.033333, 2.00, 342],
["Corlu", "Turkey", 27.799999, 41.159168, 2.00, 342],
["Bursa", "Turkey", 29.061111, 40.191666, 2.00, 342],
["Sakarya", "Turkey", 30.403334, 40.780556, 2.00, 342],
["Tunapuna", "Trinidad and Tobago", -61.383335, 10.633333, -4.00, 343],
["Paradise", "Trinidad and Tobago", -61.366711, 10.634711, -4.00, 343],
["Siparia", "Trinidad and Tobago", -61.500000, 10.133333, -4.00, 343],
["Yun-lin", "Taiwan", 120.542221, 23.709167, 8.00, 345],
["Taipei", "Taiwan", 121.525002, 25.039167, 8.00, 345],
["T'ai-chung-shih", "Taiwan", 120.686668, 24.148333, 8.00, 345],
["Kao-hsiung", "Taiwan", 120.301392, 22.617777, 8.00, 345],
["Hualian", "Taiwan", 121.604446, 23.976944, 8.00, 345],
["Chi-lung", "Taiwan", 121.737503, 25.131390, 8.00, 345],
["Zanzibar", "Tanzania", 39.197933, -6.163937, 3.00, 346],
["Wete", "Tanzania", 39.716667, -5.066667, 3.00, 346],
["Vwawa", "Tanzania", 32.933334, -9.116667, 3.00, 346],
["Tanga", "Tanzania", 39.099998, -5.066667, 3.00, 346],
["Mwanza", "Tanzania", 32.900002, -2.516667, 3.00, 346],
["Morogoro", "Tanzania", 37.666668, -6.816667, 3.00, 346],
["Mbeya", "Tanzania", 33.450001, -8.900000, 3.00, 346],
["Dar es Salaam", "Tanzania", 39.283333, -6.800000, 3.00, 346],
["Arusha", "Tanzania", 36.683334, -3.366667, 3.00, 346],
["Lebedyn", "Ukraine", 34.480278, 50.588055, 2.00, 347],
["Staryy Dobrotvor", "Ukraine", 24.350000, 50.250000, 2.00, 348],
["Druzhkovka", "Ukraine", 37.549999, 48.616665, 2.00, 349],
["Zhytomyr", "Ukraine", 28.666666, 50.250000, 2.00, 347],
["Zaporizhzhya", "Ukraine", 35.183334, 47.816666, 2.00, 349],
["Vinnytsya", "Ukraine", 28.483334, 49.233334, 2.00, 347],
["Ternopil'", "Ukraine", 25.583334, 49.549999, 2.00, 348],
["Sumy", "Ukraine", 34.781944, 50.919724, 2.00, 347],
["Simferopol'", "Ukraine", 34.099998, 44.950001, 2.00, 350],
["Sevastopol'", "Ukraine", 33.533333, 44.599998, 2.00, 350],
["Rivne", "Ukraine", 26.250000, 50.616665, 2.00, 347],
["Poltava", "Ukraine", 34.566666, 49.583332, 2.00, 349],
["Odesa", "Ukraine", 30.733334, 46.466667, 2.00, 350],
["Mykolayiv", "Ukraine", 32.000000, 46.966667, 2.00, 349],
["Mariupol'", "Ukraine", 37.500000, 47.066666, 2.00, 349],
["Makiyivka", "Ukraine", 37.966667, 48.033333, 2.00, 349],
["L'viv", "Ukraine", 24.023237, 49.838261, 2.00, 348],
["Luts'k", "Ukraine", 25.333334, 50.750000, 2.00, 348],
["Luhans'k", "Ukraine", 39.333332, 48.566666, 2.00, 349],
["Kiev", "Ukraine", 30.516666, 50.433334, 2.00, 347],
["Kryvyy Rih", "Ukraine", 33.349998, 47.916668, 2.00, 349],
["Kremenchuk", "Ukraine", 33.416668, 49.066666, 2.00, 349],
["Kirovohrad", "Ukraine", 32.263054, 48.504166, 2.00, 349],
["Kherson", "Ukraine", 32.599998, 46.633335, 2.00, 350],
["Kharkiv", "Ukraine", 36.250000, 50.000000, 2.00, 349],
["Horlivka", "Ukraine", 38.049999, 48.299999, 2.00, 349],
["Donets'k", "Ukraine", 37.799999, 48.000000, 2.00, 349],
["Dnipropetrovs'k", "Ukraine", 34.983334, 48.450001, 2.00, 349],
["Dniprodzerzhyns'k", "Ukraine", 34.616665, 48.500000, 2.00, 349],
["Chernivtsi", "Ukraine", 25.933332, 48.299999, 2.00, 348],
["Chernihiv", "Ukraine", 31.299999, 51.500000, 2.00, 347],
["Cherkasy", "Ukraine", 32.066666, 49.433334, 2.00, 347],
["Wobulenzi", "Uganda", 32.512222, 0.728333, 3.00, 351],
["Wakiso", "Uganda", 32.459446, 0.404444, 3.00, 351],
["Sembabule", "Uganda", 31.456667, -0.077222, 3.00, 351],
["Kampala", "Uganda", 32.565556, 0.315556, 3.00, 351],
["Bay Minette", "United States of America", -87.773048, 30.882963, -6.00, 361],
["Edna", "United States of America", -96.646088, 28.978594, -6.00, 361],
["Henderson", "United States of America", -94.799377, 32.153217, -6.00, 361],
["Birmingham", "United States of America", -86.802490, 33.520660, -6.00, 361],
["Washington", "United States of America", -77.036369, 38.895111, -5.00, 355],
["Hialeah", "United States of America", -80.278107, 25.857595, -5.00, 358],
["Jacksonville", "United States of America", -81.655647, 30.332184, -5.00, 358],
["Miami", "United States of America", -80.193657, 25.774265, -5.00, 358],
["Orlando", "United States of America", -81.379234, 28.538336, -5.00, 358],
["Saint Petersburg", "United States of America", -82.679268, 27.770861, -5.00, 358],
["Tampa", "United States of America", -82.458427, 27.947521, -5.00, 358],
["Atlanta", "United States of America", -84.387985, 33.748997, -5.00, 358],
["Indianapolis", "United States of America", -86.158043, 39.768375, -5.00, 359],
["Wichita", "United States of America", -97.337547, 37.692238, -6.00, 365],
["Lexington", "United States of America", -84.477715, 37.988689, -5.00, 364],
["Lexington-Fayette", "United States of America", -84.458549, 38.049801, -5.00, 364],
["Louisville", "United States of America", -85.759407, 38.254238, -5.00, 357],
["Baton Rouge", "United States of America", -91.154549, 30.450747, -6.00, 361],
["New Orleans", "United States of America", -90.075073, 29.954649, -6.00, 361],
["Shreveport", "United States of America", -93.750175, 32.525150, -6.00, 361],
["Baltimore", "United States of America", -76.612190, 39.290386, -5.00, 355],
["Kansas City", "United States of America", -94.578568, 39.099728, -6.00, 365],
["North Kansas City", "United States of America", -94.562180, 39.130005, -6.00, 365],
["Saint Louis", "United States of America", -90.197891, 38.627274, -6.00, 365],
["Charlotte", "United States of America", -80.843124, 35.227085, -5.00, 358],
["Durham", "United States of America", -78.898621, 35.994034, -5.00, 358],
["Greensboro", "United States of America", -79.791977, 36.072636, -5.00, 358],
["Raleigh", "United States of America", -78.638611, 35.772095, -5.00, 358],
["West Raleigh", "United States of America", -78.663895, 35.786819, -5.00, 358],
["Cincinnati", "United States of America", -84.456886, 39.162003, -5.00, 364],
["Columbus", "United States of America", -82.998795, 39.961174, -5.00, 364],
["Oklahoma City", "United States of America", -97.516426, 35.467560, -6.00, 365],
["Tulsa", "United States of America", -95.992775, 36.153980, -6.00, 365],
["Philadelphia", "United States of America", -75.163788, 39.952335, -5.00, 355],
["Memphis", "United States of America", -90.048981, 35.149536, -6.00, 361],
["Nashville", "United States of America", -86.784447, 36.165890, -6.00, 361],
["New South Memphis", "United States of America", -90.056755, 35.086758, -6.00, 361],
["Arlington", "United States of America", -97.108063, 32.735687, -6.00, 365],
["Austin", "United States of America", -97.743057, 30.267153, -6.00, 365],
["Corpus Christi", "United States of America", -97.396378, 27.800583, -6.00, 361],
["Dallas", "United States of America", -96.806664, 32.783054, -6.00, 365],
["Fort Worth", "United States of America", -97.320847, 32.725410, -6.00, 365],
["Garland", "United States of America", -96.638885, 32.912624, -6.00, 365],
["Houston", "United States of America", -95.363274, 29.763283, -6.00, 361],
["Laredo", "United States of America", -99.507545, 27.506407, -6.00, 365],
["Plano", "United States of America", -96.698883, 33.019844, -6.00, 365],
["San Antonio", "United States of America", -98.493629, 29.424122, -6.00, 365],
["Norfolk", "United States of America", -76.285217, 36.846813, -5.00, 355],
["Virginia Beach", "United States of America", -75.977982, 36.852928, -5.00, 355],
["Chicago", "United States of America", -87.650055, 41.850033, -6.00, 365],
["Fort Wayne", "United States of America", -85.128860, 41.130604, -5.00, 359],
["Boston", "United States of America", -71.059776, 42.358429, -5.00, 355],
["South Boston", "United States of America", -71.049492, 42.333431, -5.00, 355],
["Detroit", "United States of America", -83.045753, 42.331429, -5.00, 356],
["Minneapolis", "United States of America", -93.263840, 44.979965, -6.00, 368],
["Saint Paul", "United States of America", -93.093277, 44.944408, -6.00, 368],
["Lincoln", "United States of America", -96.666962, 40.799999, -6.00, 365],
["Omaha", "United States of America", -95.937790, 41.258610, -6.00, 365],
["Jersey City", "United States of America", -74.077644, 40.728157, -5.00, 355],
["Newark", "United States of America", -74.172363, 40.735657, -5.00, 355],
["Buffalo", "United States of America", -78.878372, 42.886448, -5.00, 356],
["New York City", "United States of America", -74.005974, 40.714268, -5.00, 355],
["Rochester", "United States of America", -77.615555, 43.154785, -5.00, 355],
["Akron", "United States of America", -81.519005, 41.081444, -5.00, 356],
["Cleveland", "United States of America", -81.695412, 41.499496, -5.00, 356],
["Toledo", "United States of America", -83.555214, 41.663937, -5.00, 356],
["Pittsburgh", "United States of America", -79.995888, 40.440624, -5.00, 356],
["Madison", "United States of America", -89.401230, 43.073051, -6.00, 365],
["Milwaukee", "United States of America", -87.906471, 43.038902, -6.00, 365],
["Chandler", "United States of America", -111.841248, 33.306160, -7.00, 374],
["Glendale", "United States of America", -112.185989, 33.538651, -7.00, 374],
["Mesa", "United States of America", -111.822639, 33.422268, -7.00, 374],
["Phoenix", "United States of America", -112.074036, 33.448376, -7.00, 374],
["Scottsdale", "United States of America", -111.899033, 33.509209, -7.00, 374],
["Mesa", "United States of America", -111.749580, 33.401714, -7.00, 374],
["Tucson", "United States of America", -110.926476, 32.221745, -7.00, 374],
["Anaheim", "United States of America", -117.914505, 33.835293, -8.00, 375],
["Bakersfield", "United States of America", -119.018715, 35.373291, -8.00, 375],
["Chula Vista", "United States of America", -117.084198, 32.640053, -8.00, 375],
["Fremont", "United States of America", -121.988571, 37.548271, -8.00, 375],
["Fresno", "United States of America", -119.772369, 36.747726, -8.00, 375],
["Long Beach", "United States of America", -118.189232, 33.766964, -8.00, 375],
["Los Angeles", "United States of America", -118.243683, 34.052235, -8.00, 375],
["Modesto", "United States of America", -120.996880, 37.639095, -8.00, 375],
["North Glendale", "United States of America", -118.264519, 34.160564, -8.00, 375],
["Oakland", "United States of America", -122.270805, 37.804371, -8.00, 375],
["Riverside", "United States of America", -117.396156, 33.953350, -8.00, 375],
["Sacramento", "United States of America", -121.494400, 38.581573, -8.00, 375],
["San Bernardino", "United States of America", -117.289764, 34.108345, -8.00, 375],
["San Diego", "United States of America", -117.157257, 32.715328, -8.00, 375],
["San Francisco", "United States of America", -122.419418, 37.774929, -8.00, 375],
["San Jose", "United States of America", -121.894958, 37.339386, -8.00, 375],
["Santa Ana", "United States of America", -117.867836, 33.745575, -8.00, 375],
["Stockton", "United States of America", -121.290779, 37.957703, -8.00, 375],
["Aurora", "United States of America", -104.831917, 39.729431, -7.00, 371],
["Colorado Springs", "United States of America", -104.821365, 38.833881, -7.00, 371],
["Denver", "United States of America", -104.984703, 39.739155, -7.00, 371],
["Albuquerque", "United States of America", -106.651138, 35.084492, -7.00, 373],
["Henderson", "United States of America", -114.981934, 36.039700, -8.00, 375],
["Las Vegas", "United States of America", -115.137222, 36.174969, -8.00, 375],
["Paradise", "United States of America", -115.146667, 36.097195, -8.00, 375],
["Reno", "United States of America", -119.813805, 39.529633, -8.00, 375],
["El Paso", "United States of America", -106.486931, 31.758720, -7.00, 374],
["Lubbock", "United States of America", -101.855164, 33.577862, -6.00, 370],
["Portland", "United States of America", -122.676208, 45.523453, -8.00, 375],
["Seattle", "United States of America", -122.332069, 47.606209, -8.00, 375],
["Honolulu", "United States of America", -157.858337, 21.306944, -10.00, 381],
["Anchorage", "United States of America", -149.900284, 61.218056, -9.00, 376],
["Young", "Uruguay", -57.633335, -32.683334, -3.00, 382],
["Trinidad", "Uruguay", -56.888611, -33.538887, -3.00, 382],
["Treinta y Tres", "Uruguay", -54.383335, -33.233334, -3.00, 382],
["Montevideo", "Uruguay", -56.170834, -34.858055, -3.00, 382],
["Nukus", "Uzbekistan", 59.610279, 42.453056, 5.00, 383],
["Kegayli", "Uzbekistan", 59.607777, 42.776669, 5.00, 383],
["Chimboy", "Uzbekistan", 59.775276, 42.935833, 5.00, 383],
["Samarqand", "Uzbekistan", 66.959724, 39.654167, 5.00, 383],
["Qarshi", "Uzbekistan", 65.797775, 38.863335, 5.00, 383],
["Buxoro", "Uzbekistan", 64.428612, 39.774723, 5.00, 383],
["Tashkent", "Uzbekistan", 69.250000, 41.316666, 5.00, 384],
["Namangan", "Uzbekistan", 71.672569, 40.998299, 5.00, 384],
["Andijon", "Uzbekistan", 72.343887, 40.783054, 5.00, 384],
["Kingstown Park", "Saint Vincent", -61.235001, 13.158333, -4.00, 386],
["La Asuncion", "Venezuela", -63.862778, 11.033333, -4.00, 387],
["Anaco", "Venezuela", -64.472778, 9.438889, -4.00, 387],
["Alto Barinas", "Venezuela", -70.222221, 8.594444, -4.00, 387],
["Valencia", "Venezuela", -68.003891, 10.180555, -4.00, 387],
["Turmero", "Venezuela", -67.483330, 10.233334, -4.00, 387],
["Santa Teresa", "Venezuela", -66.663612, 10.231389, -4.00, 387],
["San Cristobal", "Venezuela", -72.224998, 7.766944, -4.00, 387],
["Petare", "Venezuela", -66.816666, 10.483334, -4.00, 387],
["Mucumpiz", "Venezuela", -71.133331, 8.416667, -4.00, 387],
["Maracaibo", "Venezuela", -71.640556, 10.631667, -4.00, 387],
["Cumana", "Venezuela", -64.166664, 10.466667, -4.00, 387],
["Ciudad Guayana", "Venezuela", -62.652779, 8.353333, -4.00, 387],
["Caracas", "Venezuela", -66.916664, 10.500000, -4.00, 387],
["Cabimas", "Venezuela", -71.446114, 10.401944, -4.00, 387],
["Baruta", "Venezuela", -66.883331, 10.433333, -4.00, 387],
["Barquisimeto", "Venezuela", -69.322777, 10.073889, -4.00, 387],
["Barcelona", "Venezuela", -64.699997, 10.133333, -4.00, 387],
["Maturin", "Venezuela", -63.176666, 9.750000, -4.00, 387],
["Road Town", "Virgin Islands", -64.616669, 18.416666, -4.00, 388],
["Yen Vinh", "Vietnam", 105.666664, 18.666666, 7.00, 390],
["Yen Bai", "Vietnam", 104.866669, 21.700001, 7.00, 390],
["Vung Tau", "Vietnam", 107.066666, 10.350000, 7.00, 390],
["Ho Chi Minh City", "Vietnam", 106.666664, 10.750000, 7.00, 390],
["Rach Gia", "Vietnam", 105.083336, 10.016666, 7.00, 390],
["Quy Nhon", "Vietnam", 109.233330, 13.766666, 7.00, 390],
["Nha Trang", "Vietnam", 109.183334, 12.250000, 7.00, 390],
["Hue", "Vietnam", 107.599998, 16.466667, 7.00, 390],
["Hanoi", "Vietnam", 105.849998, 21.033333, 7.00, 390],
["Haiphong", "Vietnam", 106.682220, 20.856112, 7.00, 390],
["Da Nang", "Vietnam", 108.220833, 16.067778, 7.00, 390],
["Can Tho", "Vietnam", 105.783333, 10.033333, 7.00, 390],
["Bien Hoa", "Vietnam", 106.816666, 10.950000, 7.00, 390],
["Port-Vila", "Vanuatu", 168.316666, -17.733334, 11.00, 391],
["Luganville", "Vanuatu", 167.166672, -15.533333, 11.00, 391],
["Vaitele", "Samoa", -171.783340, -13.816667, -11.00, 393],
["Apia", "Samoa", -171.733337, -13.833333, -11.00, 393],
["Zabid", "Yemen", 43.315277, 14.195000, 3.00, 394],
["Yarim", "Yemen", 44.380280, 14.297222, 3.00, 394],
["Ta`izz", "Yemen", 44.033333, 13.566667, 3.00, 394],
["Sanaa", "Yemen", 44.206665, 15.354722, 3.00, 394],
["Ibb", "Yemen", 44.183334, 13.966667, 3.00, 394],
["Al Mukalla", "Yemen", 49.131390, 14.530000, 3.00, 394],
["Al Hudaydah", "Yemen", 42.952221, 14.797778, 3.00, 394],
["Aden", "Yemen", 45.036667, 12.779445, 3.00, 394],
["Mamoudzou", "Mayotte", 45.227222, -12.779445, 3.00, 395],
["Bandraboua", "Mayotte", 45.120556, -12.701667, 3.00, 395],
["Mtsamboro", "Mayotte", 45.066666, -12.696667, 3.00, 395],
["Zeerust", "South Africa", 26.083334, -25.533333, 2.00, 396],
["Zastron", "South Africa", 27.083334, -30.299999, 2.00, 396],
["Wolmaransstad", "South Africa", 25.966667, -27.200001, 2.00, 396],
["Witbank", "South Africa", 29.233334, -25.866667, 2.00, 396],
["Welkom", "South Africa", 26.733334, -27.983334, 2.00, 396],
["Vereeniging", "South Africa", 27.933332, -26.666666, 2.00, 396],
["Vanderbijlpark", "South Africa", 27.816668, -26.700001, 2.00, 396],
["Uitenhage", "South Africa", 25.402222, -33.765278, 2.00, 396],
["Tembisa", "South Africa", 28.226944, -25.998888, 2.00, 396],
["Soweto", "South Africa", 27.866667, -26.266666, 2.00, 396],
["Richards Bay", "South Africa", 32.099998, -28.799999, 2.00, 396],
["Pretoria", "South Africa", 28.229445, -25.706944, 2.00, 396],
["Port Elizabeth", "South Africa", 25.583334, -33.966667, 2.00, 396],
["Pietermaritzburg", "South Africa", 30.383333, -29.616667, 2.00, 396],
["Newcastle", "South Africa", 29.933332, -27.750000, 2.00, 396],
["Krugersdorp", "South Africa", 27.766666, -26.100000, 2.00, 396],
["Johannesburg", "South Africa", 28.083334, -26.200001, 2.00, 396],
["Durban", "South Africa", 31.016666, -29.850000, 2.00, 396],
["Brakpan", "South Africa", 28.366667, -26.233334, 2.00, 396],
["Botshabelo", "South Africa", 26.733334, -29.233334, 2.00, 396],
["Boksburg", "South Africa", 28.250000, -26.216667, 2.00, 396],
["Bloemfontein", "South Africa", 26.200001, -29.133333, 2.00, 396],
["Benoni", "South Africa", 28.316668, -26.183332, 2.00, 396],
["Centurion", "South Africa", 28.170555, -25.874445, 2.00, 396],
["Cape Town", "South Africa", 18.416666, -33.916668, 2.00, 396],
["Nchelenge", "Zambia", 28.733334, -9.350000, 2.00, 397],
["Nakonde", "Zambia", 32.766666, -9.333333, 2.00, 397],
["Mpulungu", "Zambia", 31.133333, -8.766666, 2.00, 397],
["Ndola", "Zambia", 28.633333, -12.966667, 2.00, 397],
["Lusaka", "Zambia", 28.283333, -15.416667, 2.00, 397],
["Kitwe", "Zambia", 28.200001, -12.816667, 2.00, 397],
["Zvishavane District", "Zimbabwe", 30.083334, -20.250000, 2.00, 398],
["Zvishavane", "Zimbabwe", 30.033333, -20.333334, 2.00, 398],
["Victoria Falls", "Zimbabwe", 25.833334, -17.933332, 2.00, 398],
["Harare", "Zimbabwe", 31.044722, -17.817778, 2.00, 398],
["Bulawayo", "Zimbabwe", 28.583334, -20.150000, 2.00, 398],
["Chitungwiza", "Zimbabwe", 31.048056, -17.993889, 2.00, 398],
["Manama", "Bahrain", 50.583000, 26.218611, 3.00, 53],
["Vasco da Gamma", "India", 73.830002, 15.400000, 5.50, 188],
["Vrindavan", "India", 77.701241, 27.577990, 5.50, 188],
["Mayapur", "India", 88.388077, 23.423412, 5.50, 188 ]
]
/*************************************************    js/GCSunData.js **********************************************/


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

/*************************************************    js/GCMoonData.js **********************************************/
class GCMoonData {

	constructor() {
		this.latitude_deg = 0.0
		this.longitude_deg = 0.0
		this.radius = 0.0
		this.rightAscension = 0.0
		this.declination = 0.0
		this.parallax = 0.0
		this.elevation = 0.0
		this.azimuth = 0.0
	}

	toString() {
		return "Latitude: " + this.latitude_deg + ", Longitude: " + this.longitude_deg +
		    ", distance: " + this.radius;
	}

	Calculate(jdate) {

		var crd = GCMoonData.CalculateEcliptical(jdate);
		var eqc = GCEarthData.eclipticalToEquatorialCoords(crd, jdate);

		this.radius = crd.distance;
		this.longitude_deg = crd.longitude;
		this.latitude_deg = crd.latitude;

		// equaltorial coordinates
		this.rightAscension = eqc.rightAscension;
		this.declination = eqc.declination;
	}

	static Calculate(jd)
	{
		var md = new GCMoonData();
		md.Calculate(jd);
		return md;
	}

	//==================================================================================
	//
	//==================================================================================

	static CalcMoonTimes(e, vc, biasHours)
	{
		var result;
		result.rise = new GCHourTime()
		result.set = new GCHourTime()
		var UT = 0.0;
		var i = 0
		var prev_elev = 0.0;
		var nType = 0, nFound = 0;
		var a = 0.0, ae = 0.0, b = 0.0, be = 0.0, c = 0.0, ce = 0.0, elev = 0.0;

		result.rise.SetValue(-1);
		result.set.SetValue(-1);

		// inicializacia prvej hodnoty ELEVATION
		vc.shour = (-biasHours - 1.0) / 24.0;
		prev_elev = GCCoreAstronomy.GetMoonElevation(e, vc);

		// prechod cez vsetky hodiny
		for (UT = (-0.1 - biasHours); UT <= (24.1 - biasHours); UT += 1.0)
		{
			vc.shour = UT / 24.0;
			elev = GCCoreAstronomy.GetMoonElevation(e, vc);

			if (prev_elev * elev <= 0.0)
			{
				if (prev_elev <= 0.0)
				{
					nType = 0x1;
				}
				else
				{
					nType = 0x2;
				}

				a = UT - 1.0;
				ae = prev_elev;
				b = UT;
				be = elev;
				for (i = 0; i < 20; i++)
				{
					c = (a + b) / 2.0;
					vc.shour = c / 24.0;
					ce = GCCoreAstronomy.GetMoonElevation(e, vc);
					if (ae * ce <= 0.0)
					{
						be = ce;
						b = c;
					}
					else
					{
						ae = ce;
						a = c;
					}
				}

				if (nType == 1)
				{
					result.rise.SetDayTime((c + biasHours) / 24.0);
				}
				else
				{
					result.set.SetDayTime((c + biasHours) / 24.0);
				}

				nFound |= nType;

				if (nFound == 0x3)
					break;
			}

			prev_elev = elev;
		}

    	return result;
	}

	static GetNextMoonRasi(ed, startDate)
	{
		var phi = 30.0;
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
		var nextDate = new GregorianDateTime();
		nextDate.Set(d);
		return [new_naks, nextDate];
	}

	//==================================================================================
	//
	//==================================================================================

	static GetNextRise(e, vc, bRise)
	{
		var a, b;

		var h = [0.0, 0.0, 0.0]
		var hour = 1 / 24.0;
		var startHour = vc.shour;

		var track = new GregorianDateTime();
		track.Set(vc);
		track.NormalizeValues();

		// inicializacia prvej hodnoty ELEVATION
		h[0] = GCCoreAstronomy.GetMoonElevation(e, track);
		track.shour += hour;
		h[1] = GCCoreAstronomy.GetMoonElevation(e, track);
		track.shour += hour;
		h[2] = GCCoreAstronomy.GetMoonElevation(e, track);

		for (c = 0; c < 24; c++)
		{
			if ((bRise ? (h[1] < 0.0 && h[2] > 0.0) : (h[1] > 0.0 && h[2] < 0.0)))
			{
				a = (h[2] - h[1]) / hour;
				b = h[2] - a * track.shour;
				track.shour = -b / a;
				track.NormalizeValues();
				return track;
			}

			h[0] = h[1];
			h[1] = h[2];
			track.shour += hour;
			h[2] = GCCoreAstronomy.GetMoonElevation(e, track);
		}

		return track;
	}


	//==================================================================================
	//
	//==================================================================================



	// double date, long, lat
	calc_horizontal(date, longitude, latitude)
	{
		var h = GCMath.putIn360(GCEarthData.SiderealTimeGreenwich(date) - this.rightAscension + longitude);

		this.azimuth = GCMath.rad2deg(Math.Atan2(GCMath.sinDeg(h),
							   GCMath.cosDeg(h) * GCMath.sinDeg(latitude) -
							   GCMath.tanDeg(this.declination) * GCMath.cosDeg(latitude)));

		this.elevation = GCMath.rad2deg(Math.Asin(GCMath.sinDeg(latitude) * GCMath.sinDeg(this.declination) +
								GCMath.cosDeg(latitude) * GCMath.cosDeg(this.declination) * GCMath.cosDeg(h)));
	}

	getTopocentricEquatorial(obs,jdate)
	{
		var u, h, delta_alpha;
		var rho_sin, rho_cos;
		let b_a = 0.99664719;
		var tec = new GCEquatorialCoords();

		var altitude = 0;

		// geocentric position of observer on the earth surface
		// 10.1 - 10.3
		u = GCMath.arcTanDeg(b_a * b_a * GCMath.tanDeg(obs.latitudeDeg));
		rho_sin = b_a * GCMath.sinDeg(u) + altitude / 6378140.0 * GCMath.sinDeg(obs.latitudeDeg);
		rho_cos = GCMath.cosDeg(u) + altitude / 6378140.0 * GCMath.cosDeg(obs.latitudeDeg);

		// equatorial horizontal paralax
		// 39.1
		var parallax = GCMath.arcSinDeg(GCMath.sinDeg(8.794 / 3600) / (radius / GCMath.AU));

		// geocentric hour angle of the body
		h = GCEarthData.SiderealTimeGreenwich(jdate) + obs.longitudeDeg - rightAscension;


		// 39.2
		delta_alpha = GCMath.arcTanDeg(
					(-rho_cos * GCMath.sinDeg(parallax) * GCMath.sinDeg(h)) /
					(GCMath.cosDeg(this.declination) - rho_cos * GCMath.sinDeg(parallax) * GCMath.cosDeg(h)));
		tec.rightAscension = rightAscension + delta_alpha;
		tec.declination = declination + GCMath.arcTanDeg(
			((GCMath.sinDeg(declination) - rho_sin * GCMath.sinDeg(parallax)) * GCMath.cosDeg(delta_alpha)) /
			(GCMath.cosDeg(declination) - rho_cos * GCMath.sinDeg(parallax) * GCMath.cosDeg(h)));

		return tec;
	}


	CorrectEqatorialWithParallax(jdate, latitude, longitude, height)
	{
		var u, hourAngleBody, delta_alpha;
		var rho_sin, rho_cos;
		let b_a = 0.99664719;

		// calculate geocentric longitude and latitude of observer
		u = GCMath.arcTanDeg(b_a * b_a * GCMath.tanDeg(latitude));
		rho_sin = b_a * GCMath.sinDeg(u) + height / 6378140.0 * GCMath.sinDeg(latitude);
		rho_cos = GCMath.cosDeg(u) + height / 6378140.0 * GCMath.cosDeg(latitude);

		// calculate paralax
		this.parallax = GCMath.arcSinDeg(GCMath.sinDeg(8.794 / 3600) / (MoonDistance(jdate) / GCMath.AU));

		// calculate correction of equatorial coordinates
		hourAngleBody = GCEarthData.SiderealTimeGreenwich(jdate) + longitude - this.rightAscension;
		delta_alpha = GCMath.arcTan2Deg(-rho_cos * GCMath.sinDeg(this.parallax) * GCMath.sinDeg(hourAngleBody),
					GCMath.cosDeg(this.declination) - rho_cos * GCMath.sinDeg(this.parallax) * GCMath.cosDeg(hourAngleBody));
		this.rightAscension += delta_alpha;
		this.declination += GCMath.arcTan2Deg(
			(GCMath.sinDeg(this.declination) - rho_sin * GCMath.sinDeg(this.parallax)) * GCMath.cosDeg(delta_alpha) ,
			 GCMath.cosDeg(this.declination) - rho_cos * GCMath.sinDeg(this.parallax) * GCMath.cosDeg(hourAngleBody));
	}

	static MoonDistance(jdate)
	{

		var temp, t, d, m, ms, f, e, ls, sr;// : extended;

		t = (jdate - 2451545.0) / 36525.0;

		//(* mean elongation of the moon
		d = 297.8502042 + (445267.1115168 + (-0.0016300 + (1.0 / 545868 - 1.0 / 113065000 * t) * t) * t) * t;

		//(* mean anomaly of the sun
		m = 357.5291092 + (35999.0502909 + (-0.0001536 + 1.0 / 24490000 * t) * t) * t;

		//(* mean anomaly of the moon
		ms = 134.9634114 + (477198.8676313 + (0.0089970 + (1.0 / 69699 - 1.0 / 1471200 * t) * t) * t) * t;

		//(* argument of the longitude of the moon
		f = 93.2720993 + (483202.0175273 + (-0.0034029 + (-1.0 / 3526000 + 1.0 / 863310000 * t) * t) * t) * t;

		//(* correction term due to excentricity of the earth orbit
		e = 1.0 + (-0.002516 - 0.0000074 * t) * t;

		//(* mean longitude of the moon
		ls = 218.3164591 + (481267.88134236 + (-0.0013268 + (1.0 / 538841 - 1.0 / 65194000 * t) * t) * t) * t;

		sr = 0;

		var i;
		for (i = 0; i < 60; i++)
		{
			temp = GCMoonData_sigma_r[i] * GCMath.cosDeg(GCMoonData_arg_lr[i][0] * d
								   + GCMoonData_arg_lr[i][1] * m
								   + GCMoonData_arg_lr[i][2] * ms
								   + GCMoonData_arg_lr[i][3] * f);
			if (Math.abs(GCMoonData_arg_lr[i][1]) == 1) temp = temp * e;
			if (Math.abs(GCMoonData_arg_lr[i][1]) == 2) temp = temp * e * e;
			sr = sr + temp;
		}


		return 385000.56 + sr / 1000;

	}



	static CalculateEcliptical(jdate)
	{
		var t, d, m, ms, f, e, ls;
		var sr, sl, sb, temp;// : extended;
		var a1, a2, a3; // : extended;
		var i; //: integer;


		t = (jdate - 2451545.0) / 36525.0;

		//(* mean elongation of the moon
		d = 297.8502042 + (445267.1115168 + (-0.0016300 + (1.0 / 545868 - 1.0 / 113065000 * t) * t) * t) * t;

		//(* mean anomaly of the sun
		m = 357.5291092 + (35999.0502909 + (-0.0001536 + 1.0 / 24490000 * t) * t) * t;

		//(* mean anomaly of the moon
		ms = 134.9634114 + (477198.8676313 + (0.0089970 + (1.0 / 69699 - 1.0 / 1471200 * t) * t) * t) * t;

		//(* argument of the longitude of the moon
		f = 93.2720993 + (483202.0175273 + (-0.0034029 + (-1.0 / 3526000 + 1.0 / 863310000 * t) * t) * t) * t;

		//(* correction term due to excentricity of the earth orbit
		e = 1.0 + (-0.002516 - 0.0000074 * t) * t;

		//(* mean longitude of the moon
		ls = 218.3164591 + (481267.88134236 + (-0.0013268 + (1.0 / 538841 - 1.0 / 65194000 * t) * t) * t) * t;

		//(* arguments of correction terms
		a1 = 119.75 + 131.849 * t;
		a2 = 53.09 + 479264.290 * t;
		a3 = 313.45 + 481266.484 * t;

		sr = 0;
		for (i = 0; i < 60; i++)
		{
			temp = GCMoonData_sigma_r[i] * GCMath.cosDeg(GCMoonData_arg_lr[i][0] * d
								   + GCMoonData_arg_lr[i][1] * m
								   + GCMoonData_arg_lr[i][2] * ms
								   + GCMoonData_arg_lr[i][3] * f);
			if (Math.abs(GCMoonData_arg_lr[i][1]) == 1) temp = temp * e;
			if (Math.abs(GCMoonData_arg_lr[i][1]) == 2) temp = temp * e * e;
			sr = sr + temp;
		}

		sl = 0;
		for (i = 0; i < 60; i++)
		{
			temp = GCMoonData_sigma_l[i] * GCMath.sinDeg(GCMoonData_arg_lr[i][0] * d
								   + GCMoonData_arg_lr[i][1] * m
								   + GCMoonData_arg_lr[i][2] * ms
								   + GCMoonData_arg_lr[i][3] * f);
			if (Math.abs(GCMoonData_arg_lr[i][1]) == 1) temp = temp * e;
			if (Math.abs(GCMoonData_arg_lr[i][1]) == 2) temp = temp * e * e;
			sl = sl + temp;
		}

		//(* correction terms
		sl = sl + 3958 * GCMath.sinDeg(a1)
			+ 1962 * GCMath.sinDeg(ls - f)
			+ 318 * GCMath.sinDeg(a2);
		sb = 0;
		for (i = 0; i < 60; i++)
		{
			temp = GCMoonData_sigma_b[i] * GCMath.sinDeg(GCMoonData_arg_b[i][0] * d
								   + GCMoonData_arg_b[i][1] * m
								   + GCMoonData_arg_b[i][2] * ms
								   + GCMoonData_arg_b[i][3] * f);
			if (Math.abs(GCMoonData_arg_b[i][1]) == 1) temp = temp * e;
			if (Math.abs(GCMoonData_arg_b[i][1]) == 2) temp = temp * e * e;
			sb = sb + temp;
		}

		//(* correction terms
		sb = sb - 2235 * GCMath.sinDeg(ls)
			  + 382 * GCMath.sinDeg(a3)
			  + 175 * GCMath.sinDeg(a1 - f)
			  + 175 * GCMath.sinDeg(a1 + f)
			  + 127 * GCMath.sinDeg(ls - ms)
			  - 115 * GCMath.sinDeg(ls + ms);

		var coords = new GCEclipticalCoords();

		coords.longitude = ls + sl / 1000000;
		coords.latitude = sb / 1000000;
		coords.distance = 385000.56 + sr / 1000;

		return coords;
	}

}



let  GCMoonData_arg_lr = [
		[ 0, 0, 1, 0],		 [ 2, 0,-1, 0],		 [ 2, 0, 0, 0],		 [ 0, 0, 2, 0],		 [ 0, 1, 0, 0],
		[ 0, 0, 0, 2],		 [ 2, 0,-2, 0],		 [ 2,-1,-1, 0],		 [ 2, 0, 1, 0],		 [ 2,-1, 0, 0],
		[ 0, 1,-1, 0],		 [ 1, 0, 0, 0],		 [ 0, 1, 1, 0],		 [ 2, 0, 0,-2],		 [ 0, 0, 1, 2],
		[ 0, 0, 1,-2],		 [ 4, 0,-1, 0],		 [ 0, 0, 3, 0],		 [ 4, 0,-2, 0],		 [ 2, 1,-1, 0],
		[ 2, 1, 0, 0],		 [ 1, 0,-1, 0],		 [ 1, 1, 0, 0],		 [ 2,-1, 1, 0],		 [ 2, 0, 2, 0],
		[ 4, 0, 0, 0],		 [ 2, 0,-3, 0],		 [ 0, 1,-2, 0],		 [ 2, 0,-1, 2],		 [ 2,-1,-2, 0],
		[ 1, 0, 1, 0],		 [ 2,-2, 0, 0],		 [ 0, 1, 2, 0],		 [ 0, 2, 0, 0],		 [ 2,-2,-1, 0],
		[ 2, 0, 1,-2],		 [ 2, 0, 0, 2],		 [ 4,-1,-1, 0],		 [ 0, 0, 2, 2],		 [ 3, 0,-1, 0],
		[ 2, 1, 1, 0],		 [ 4,-1,-2, 0],		 [ 0, 2,-1, 0],		 [ 2, 2,-1, 0],		 [ 2, 1,-2, 0],
		[ 2,-1, 0,-2],		 [ 4, 0, 1, 0],		 [ 0, 0, 4, 0],		 [ 4,-1, 0, 0],		 [ 1, 0,-2, 0],
		[ 2, 1, 0,-2],		 [ 0, 0, 2,-2],		 [ 1, 1, 1, 0],		 [ 3, 0,-2, 0],		 [ 4, 0,-3, 0],
		[ 2,-1, 2, 0],		 [ 0, 2, 1, 0],		 [ 1, 1,-1, 0],		 [ 2, 0, 3, 0],		 [ 2, 0,-1,-2]
	];

let  GCMoonData_arg_b = [
		[ 0, 0, 0, 1],	 [ 0, 0, 1, 1],	 [ 0, 0, 1,-1],	 [ 2, 0, 0,-1],
		[ 2, 0,-1, 1],	 [ 2, 0,-1,-1],	 [ 2, 0, 0, 1],	 [ 0, 0, 2, 1],
		[ 2, 0, 1,-1],	 [ 0, 0, 2,-1],  [ 2,-1, 0,-1],	 [ 2, 0,-2,-1],
		[ 2, 0, 1, 1],	 [ 2, 1, 0,-1],	 [ 2,-1,-1, 1],	 [ 2,-1, 0, 1],
		[ 2,-1,-1,-1],	 [ 0, 1,-1,-1],	 [ 4, 0,-1,-1],	 [ 0, 1, 0, 1],
		[ 0, 0, 0, 3],	 [ 0, 1,-1, 1],	 [ 1, 0, 0, 1],	 [ 0, 1, 1, 1],
		[ 0, 1, 1,-1],	 [ 0, 1, 0,-1],	 [ 1, 0, 0,-1],	 [ 0, 0, 3, 1],
		[ 4, 0, 0,-1],	 [ 4, 0,-1, 1],	 [ 0, 0, 1,-3],	 [ 4, 0,-2, 1],
		[ 2, 0, 0,-3],	 [ 2, 0, 2,-1],	 [ 2,-1, 1,-1],	 [ 2, 0,-2, 1],
		[ 0, 0, 3,-1],	 [ 2, 0, 2, 1],	 [ 2, 0,-3,-1],	 [ 2, 1,-1, 1],
		[ 2, 1, 0, 1],	 [ 4, 0, 0, 1],	 [ 2,-1, 1, 1],	 [ 2,-2, 0,-1],
		[ 0, 0, 1, 3],	 [ 2, 1, 1,-1],	 [ 1, 1, 0,-1],	 [ 1, 1, 0, 1],
		[ 0, 1,-2,-1],	 [ 2, 1,-1,-1],	 [ 1, 0, 1, 1],	 [ 2,-1,-2,-1],
		[ 0, 1, 2, 1],	 [ 4, 0,-2,-1],	 [ 4,-1,-1,-1],	 [ 1, 0, 1,-1],
		[ 4, 0, 1,-1],	 [ 1, 0,-1,-1],	 [ 4,-1, 0,-1],	 [ 2,-2, 0, 1]
	];

let  GCMoonData_sigma_r = [
	-20905355,		-3699111,		-2955968,		 -569925,		   48888,		   -3149,		  246158,
	 -152138,		 -170733,		 -204586,		 -129620,		  108743,		  104755,		   10321,
		   0,		   79661,		  -34782,		  -23210,		  -21636,		   24208,		   30824,
	   -8379,		  -16675,		  -12831,		  -10445,		  -11650,		   14403,		   -7003,
		   0,		   10056,			6322,		   -9884,			5751,			   0,		   -4950,
		4130,			   0,		   -3958,			   0,			3258,			2616,		   -1897,
	   -2117,			2354,			   0,			   0,		   -1423,		   -1117,		   -1571,
	   -1739,			   0,		   -4421,			   0,			   0,			   0,			   0,
		1165,			   0,			   0,			8752
			  ];

let  GCMoonData_sigma_l = [
	6288774,		1274027,		 658314,		 213618,
	-185116,		-114332,		  58793,		  57066,
	  53322,		  45758,		 -40923,		 -34720,
	 -30383,		  15327,		 -12528,		  10980,
	  10675,		  10034,		   8548,		  -7888,
	  -6766,		  -5163,		   4987,		   4036,
	   3994,		   3861,		   3665,		  -2689,
	  -2602,		   2390,		  -2348,		   2236,
	  -2120,		  -2069,		   2048,		  -1773,
	  -1595,		   1215,		  -1110,		   -892,
	   -810,			759,		   -713,		   -700,
		691,			596,			549,			537,
		520,		   -487,		   -399,		   -381,
		351,		   -340,			330,			327,
	   -323,			299,			294,			  0
	];
let  GCMoonData_sigma_b = [
	5128122,		 280602,		 277693,		 173237,
	  55413,		  46271,		  32573,		  17198,
	   9266,		   8822,		   8216,		   4324,
	   4200,		  -3359,		   2463,		   2211,
	   2065,		  -1870,		   1828,		  -1794,
	  -1749,		  -1565,		  -1491,		  -1475,
	  -1410,		  -1344,		  -1335,		   1107,
	   1021,			833,			777,			671,
		607,			596,			491,		   -451,
		439,			422,			421,		   -366,
	   -351,			331,			315,			302,
	   -283,		   -229,			223,			223,
	   -220,		   -220,		   -185,			181,
	   -177,			176,			166,		   -164,
		132,		   -119,			115,			107
	];

/*************************************************    js/GCSankranti.js **********************************************/
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

/*************************************************    js/GCCoreAstronomy.js **********************************************/
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

/*************************************************    js/GCCalendar.js **********************************************/
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

/*************************************************    js/Vaisnavaday.js **********************************************/
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




/*************************************************    js/GCMasa.js **********************************************/
let GCMasa_masaName = [
	"Madhusudana", 
	"Trivikrama", 
	"Vamana", 
	"Sridhara", 
	"Hrsikesa", 
	"Padmanabha", 
	"Damodara", 
	"Kesava", 
	"Narayana", 
	"Madhava", 
	"Govinda", 
	"Visnu", 
	"Purusottama-adhika", 
]

let GCMasa_vedicName = [
	"Vaisakha", 
	"Jyestha", 
	"Asadha", 
	"Sravana", 
	"Bhadra", 
	"Asvina", 
	"Kartika", 
	"Margasirsa", 
	"Pausa", 
	"Magha", 
	"Phalguna", 
	"Caitra", 
	"Adhika", 
]

class GCMasa
{

	/// <summary>
	/// Returns Gaudiya style of name of the month
	/// </summary>
	/// <param name="masaID">0..Madhusudana, 12..Purusottama-adhika</param>
	/// <returns></returns>
	static GetGaudiyaName(masaID)
	{
		return GCMasa_masaName[masaID % 13]
	}

	/// <summary>
	/// Returns Vedic style of name of the month
	/// </summary>
	/// <param name="masaID"></param>
	/// <returns></returns>
	static GetVedicName(masaID)
	{
		return GCMasa_vedicName[masaID % 13]
	}

	/// <summary>
	/// Returns combined name of month according user settings
	/// </summary>
	/// <param name="i"></param>
	/// <returns></returns>
	static GetName(i)
	{
		return GCMasa.GetNameEx(i, gds.getValue(49));
	}

	static GetNameEx(masaIndex, formatIndex)
	{
		switch (formatIndex)
		{
			case 0: return GCMasa.GetGaudiyaName(masaIndex);
			case 1: return GCStrings.Format("{0} ({1})", GCMasa.GetGaudiyaName(masaIndex), GCMasa.GetVedicName(masaIndex));
			case 2: return GCMasa.GetVedicName(masaIndex);
			case 3: return GCStrings.Format("{0} ({1})", GCMasa.GetVedicName(masaIndex), GCMasa.GetGaudiyaName(masaIndex));
			default: return GCMasa.GetGaudiyaName(masaIndex);
		}
	}

	static PREV_MASA(nMasa)
	{
		return (nMasa + 11) % 12;
	}

	static NEXT_MASA(nMasa)
	{
		return (nMasa + 1) % 12;
	}

	static IS_EXTRA(nMasa)
	{
		return nMasa == 12;
	}

	static MASA_DIST(nMasa, nMasa2)
	{
		var a = (nMasa - nMasa2);
		while (a < -6)
			a += 12;
		return a;
	}
}


/*************************************************    js/GCTithi.js **********************************************/
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

/*************************************************    js/GCAstroData.js **********************************************/
class GCAstroData {

	constructor() {
		// date of Julian epoch
		this.JulianDay = 0.0
		// year of Gaurabda epoch
		this.GaurabdaYear = 0
		// value of ayanamsa for this date
		this.Ayanamsa = 0.0
		// masa number
		this.Masa = 0

		// time of arunodaya - 96 mins before sunrise
		this.sunArunodaya = new GCHourTime()
		// time of sunrise
		this.sunRise = new GCHourTime()
		// time of noon
		this.sunNoon = new GCHourTime()
		// time of sunset
		this.sunSet = new GCHourTime()
	}

	toString() {
		return sprintf('Julianday: %f, sunrise: %s, noon: %s, sunset: %s', this.JulianDay,
		    this.sunRise.toString(), this.sunNoon.toString(), this.sunSet.toString() );
	}

	get tithi() {
		return this.sunRise.Tithi;
	}

	get naksatra() {
		return this.sunRise.Naksatra;
	}

	get naksatraName() {
		return GCNaksatra.GetName(this.sunRise.Naksatra);
	}

	get masa() {
		return this.Masa;
	}

	/*public override GSCore GetPropertyValue(string Token)
	{
		GSCore result = null;
		switch (Token)
		{
			case "tithi":
				result = new GSNumber() { IntegerValue = sunRise.Tithi }; break;
			case "tithiElapsed":
				result = new GSNumber() { DoubleValue = sunRise.TithiElapse }; break;
			case "tithiName":
				result = new GSString() { Value = GCTithi.GetName(sunRise.Tithi) }; break;
			case "naksatra":
				result = new GSNumber() { IntegerValue = sunRise.Naksatra }; break;
			case "naksatraElapsed":
				result = new GSNumber() { DoubleValue = sunRise.NaksatraElapse }; break;
			case "naksatraName":
				result = new GSString() { Value = GCNaksatra.GetName(sunRise.Naksatra) }; break;
			case "paksa":
				result = new GSNumber() { IntegerValue = sunRise.Paksa }; break;
			case "paksaName":
				result = new GSString() { Value = GCPaksa.GetName(sunRise.Paksa) }; break;
			case "paksaAbbr":
				result = new GSString() { Value = GCPaksa.GetAbbr(sunRise.Paksa).ToString() }; break;
			case "yoga":
				result = new GSNumber() { IntegerValue = sunRise.Yoga }; break;
			case "yogaName":
				result = new GSString() { Value = GCYoga.GetName(sunRise.Yoga) }; break;
			case "masa":
				result = new GSNumber() { IntegerValue = Masa }; break;
			case "masaName":
				result = new GSString() { Value = GCMasa.GetName(Masa) }; break;
			case "masaNameVedic":
				result = new GSString() { Value = GCMasa.GetNameEx(Masa, 2) }; break;
			case "masaNameGaudiya":
				result = new GSString() { Value = GCMasa.GetNameEx(Masa, 0) }; break;
			case "gaurabdaYear":
				result = new GSNumber() { IntegerValue = GaurabdaYear }; break;
			case "arunodayaTime":
				result = new GCHourTimeObject(sunArunodaya); break;
			case "arunodayaTithi":
				result = new GSString(GCTithi.GetName(sunArunodaya.Tithi)); break;
			case "sunRiseTime":
				result = new GCHourTimeObject(sunRise); break;
			case "noonTime":
				result = new GCHourTimeObject(sunNoon); break;
			case "sunSetTime":
				result = new GCHourTimeObject(sunSet); break;
			case "moonRasi":
				result = new GSNumber(sunRise.RasiOfMoon); break;
			case "moonRasiName":
				result = new GSString(GCRasi.GetName(sunRise.RasiOfMoon)); break;
			case "sunRasi":
				result = new GSNumber(sunRise.RasiOfSun); break;
			case "sunRasiName":
				result = new GSString(GCRasi.GetName(sunRise.RasiOfSun)); break;
			case "sunLongitude":
				result = new GSNumber(sunRise.longitude); break;
			default:
				result = base.GetPropertyValue(Token);
				break;
		}
		return result;
	}*/


	/*********************************************************************/
	/*   Finds first day of given masa and gaurabda year                 */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*********************************************************************/

	static GetFirstDayOfMasa(earth, GYear, nMasa)
	{
		return GCTithi.CalcTithiDate(GYear, nMasa, 0, 0, earth);
	}

	/*********************************************************************/
	/*  Finds date of Pratipat, Krsna Paksa, Visnu Masa                  */
	/*                                                                   */
	/*  EARTHDATA earth - location                                       */
	/*  int nYear       - Gregorian year                                 */
	/*                                                                   */
	/*********************************************************************/

	static GetFirstDayOfYear(earth, nYear)
	{

		var a = [ 2, 15, 3, 1, 3, 15, 4, 1, 4, 15 ];
		var d = new GregorianDateTime();
		var day = new GCAstroData();
		var gy, j, masa;
		var step;
		var tmp = 0;

		if (nYear >= 1950 && nYear < 2058)
		{
			tmp = gGaurBeg[(nYear - 1950) * 26 + 22];
			d.month = (tmp & 0x3e0) >> 5;
			d.day = (tmp & 0x1f);
			d.year = nYear;
			d.NextDay();
			a[0] = d.month;
			a[1] = d.day;
		}

		for (i = 0; i < 10; i += 2)
		{
			d.year = nYear;
			d.month = a[i];
			d.day = a[i + 1];

			day.DayCalc(d, earth);
			masa = day.MasaCalc(d, earth);
			gy = day.GaurabdaYear;

			if (masa == 11) // visnu masa
			{
				do
				{
					// shifts date
					step = day.sunRise.Tithi / 2;
					step = (step > 0) ? step : 1;
					for (j = step; j > 0; j--)
					{
						d.PreviousDay();
					}
					// try new time
					day.DayCalc(d, earth);
				}
				while (day.sunRise.Tithi < 28);
				d.NextDay();
				d.TimezoneHours = earth.OffsetUtcHours;
				d.shour = day.sunRise.TotalDays;
				return d;
			}
		}

		d.year = -1;
		d.month = -1;
		d.day = -1;
		d.TimezoneHours = earth.OffsetUtcHours;
		d.shour = day.sunRise.TotalDays;

		return d;

	}

	/*********************************************************************/
	/*                                                                   */
	/* Calculation of tithi, paksa, naksatra, yoga for given             */
	/*    Gregorian date                                                 */
	/*                                                                   */
	/*                                                                   */
	/*********************************************************************/

	DayCalc(date, earth)
	{
		var d = 0.0;

		// sun position on sunrise on that day
		this.sunRise = GCSunData.CalcSunrise(date, earth);
		this.sunSet = GCSunData.CalcSunset(date, earth);

		// arunodaya is 96 min before sunrise
		//  sunrise_deg is from range 0-360 so 96min=24deg
		this.sunArunodaya.TotalDays = this.sunRise.TotalDays - 96 / 1440.0;
		this.sunArunodaya.longitude = this.sunRise.longitude - (24.0 / 365.25);
		// noon
		this.sunNoon.TotalDays = (this.sunSet.TotalDays + this.sunRise.TotalDays) / 2;
		this.sunNoon.longitude = (this.sunRise.longitude + this.sunSet.longitude) / 2;

		date.shour = this.sunRise.TotalDays;

		// date.shour is [0..1] time of sunrise in local timezone time
		this.JulianDay = date.GetJulianDetailed();

		// moon position at sunrise on that day
		this.sunRise.longitudeMoon = GCCoreAstronomy.GetMoonLongitude(date, earth);

		this.Ayanamsa = GCAyanamsha.GetAyanamsa(this.JulianDay);
		this.sunArunodaya.Ayanamsa = this.Ayanamsa;
		this.sunRise.Ayanamsa = this.Ayanamsa;
		this.sunNoon.Ayanamsa = this.Ayanamsa;
		this.sunSet.Ayanamsa = this.Ayanamsa;

		// masa
		this.Masa = -1;

		date.shour = this.sunSet.TotalDays;
		this.sunSet.longitudeMoon = GCCoreAstronomy.GetMoonLongitude(date, earth);


		date.shour = this.sunArunodaya.TotalDays;
		this.sunArunodaya.longitudeMoon = GCCoreAstronomy.GetMoonLongitude(date, earth);


		return 1;
	}
	/*********************************************************************/
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*********************************************************************/

	MasaCalc(date, earth)
	{
		//	SUNDATA sun;
		//	MOONDATA moon;
		//	VCTIME Conj[6], ConjA;
		//	double Long[6], LongA;
		//	int Sank[6], SankA;

		let PREV_MONTHS = 6;

		var L = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
		var C = [new GregorianDateTime(), new GregorianDateTime(), 
			new GregorianDateTime(), new GregorianDateTime(), 
			new GregorianDateTime(), new GregorianDateTime(), 
			new GregorianDateTime(), new GregorianDateTime()]
		var R = [0,0,0,0,0,0,0,0];
		var n, rasi, masa = MasaId.VISNU_MASA;
		var ksaya_from = -1;
		var ksaya_to = -1;

		date.shour = this.sunRise.TotalDays;

		// STEP 1: calculate position of the sun and moon
		// it is done by previous call of DayCalc
		// and results are in argument DAYDATA day
		// *DayCalc(date, earth, day, moon, sun);*

		[L[1], C[1]] = /*Long[0] =*/ GCConjunction.GetNextConjunction(date, false, earth);
		[L[0], C[0]] = /*LongA   =*/ GCConjunction.GetNextConjunction(C[1], true, earth);

		// on Pratipat (nTithi == 15) we need to look for previous conjunction
		// but this conjunction can occur on this date before sunrise
		// so we need to include this very date into looking for conjunction
		// on other days we cannot include it
		// and exclude it from looking for next because otherwise that will cause
		// incorrect detection of Purusottama adhika masa
		[L[2], C[2]] = GCConjunction.GetPrevConjunction(date, false, earth);

		for (n = 3; n < PREV_MONTHS; n++)
			[L[n],C[n]] = GCConjunction.GetPrevConjunction(C[n - 1], true, earth);

		for (n = 0; n < PREV_MONTHS; n++)
			R[n] = GCRasi.GetRasi(L[n], GCAyanamsha.GetAyanamsa(C[n].GetJulian()));

		/*	TRACE("TEST Date: %d %d %d ", date.day, date.month, date.year);
			TRACE("FOUND CONJ Date: %d %d %d rasi: %d ", C[1].day, C[1].month, C[1].year, R[1]);
			TRACE("FOUND CONJ Date: %d %d %d rasi: %d ", C[2].day, C[2].month, C[2].year, R[2]);
			TRACE("FOUND CONJ Date: %d %d %d rasi: %d ", C[3].day, C[3].month, C[3].year, R[3]);
			TRACE("FOUND CONJ Date: %d %d %d rasi: %d ", C[4].day, C[4].month, C[4].year, R[4]);
			TRACE("--- 
		*/
		// test for Adhika-Ksaya sequence
		// this is like 1-2-2-4-5...
		// second (2) is replaced by rasi(3)
		/*	if ( ((Sank[1] + 2) % 12 == SankA) && ((Sank[1] == Sank[0]) || (Sank[0] == SankA)))
			{
				Sank[0] = (Sank[1] + 1) % 12;
			}

			if ( ((Sank[2] + 2) % 12 == Sank[0]) && ((Sank[2] == Sank[1]) || (Sank[1] == Sank[0])))
			{
				Sank[1] = (Sank[2] + 1) % 12;
			}*/

		// look for ksaya month
		ksaya_from = -1;
		for (n = PREV_MONTHS - 2; n >= 0; n--)
		{
			if ((R[n + 1] + 2) % 12 == R[n])
			{
				ksaya_from = n;
				break;
			}
		}

		if (ksaya_from >= 0)
		{
			for (n = ksaya_from; n > 0; n--)
			{
				if (R[n] == R[n - 1])
				{
					ksaya_to = n;
					break;
				}
			}

			if (ksaya_to >= 0)
			{
				// adhika masa found
				// now correct succession of rasis
			}
			else
			{
				// adhika masa not found
				// there will be some break in masa queue
				ksaya_to = 0;
			}

			var current_rasi = R[ksaya_from + 1] + 1;
			for (n = ksaya_from; n >= ksaya_to; n--)
			{
				R[n] = current_rasi;
				current_rasi = (current_rasi + 1) % 12;
			}
		}

		// STEP 3: test for adhika masa
		// test for adhika masa
		if (R[1] == R[2])
		{
			// it is adhika masa
			masa = 12;
			rasi = R[1];
		}
		else
		{
			// STEP 2. select nearest Conjunction
			if (this.sunRise.Paksa == 0)
			{
				masa = R[1];
			}
			else if (this.sunRise.Paksa == 1)
			{
				masa = R[2];
			}
			rasi = masa;
		}

		// calculation of Gaurabda year
		this.GaurabdaYear = date.year - 1486;

		if ((rasi > 7) && (rasi < 11)) // Visnu
		{
			if (date.month < 6)
				this.GaurabdaYear = this.GaurabdaYear - 1
		}

		this.Masa = masa;

		return masa;

	}

}

let gGaurBeg = [ 
	//Gaurabda Year = 464
	1996931, 1996946, 1996963, 1996977, 1996993, 1997040, 1997054, 1997070, 1997084, 1997100, 1997114, 1997132, 1997146, 1997162,
	1997177, 1997194, 1997209, 1997864, 1997879, 1997895, 1997910, 1997928, 1996901, 1996915, 1997022, 1997008,
	//Gaurabda Year = 465
	1997974, 1997990, 1998006, 1998021, 1998036, 1998053, 1998067, 1998083, 1998097, 1998114, 1998128, 1998145, 1998159, 1998175,
	1998190, 1998205, 1998222, 1998237, 1998892, 1998907, 1998923, 1998938, 1997944, 1997959, 0, 0,
	//Gaurabda Year = 466
	1998987, 1999001, 1999018, 1999032, 1999049, 1999063, 1999080, 1999094, 1999110, 1999125, 1999140, 1999156, 1999172, 1999187,
	1999202, 1999218, 1999234, 1999249, 1999263, 1999920, 1999934, 1999950, 1998956, 1998970, 0, 0,
	//Gaurabda Year = 467
	1999999, 2000046, 2000061, 2000076, 2000092, 2000107, 2000123, 2000138, 2000153, 2000169, 2000183, 2000200, 2000215, 2000231,
	2000245, 2000263, 2000277, 2000933, 2000947, 2000964, 2000978, 2000997, 1999969, 1999984, 2000030, 2000014,
	//Gaurabda Year = 468
	2001043, 2001059, 2001074, 2001090, 2001105, 2001121, 2001136, 2001150, 2001167, 2001181, 2001197, 2001211, 2001229, 2001243,
	2001259, 2001274, 2001290, 2001306, 2001961, 2001976, 2001991, 2002007, 2001012, 2001028, 0, 0,
	//Gaurabda Year = 469
	2002056, 2002071, 2002087, 2002102, 2002118, 2002133, 2002150, 2002164, 2002180, 2002225, 2002242, 2002256, 2002273, 2002287,
	2002302, 2002319, 2002333, 2002989, 2003004, 2003020, 2003034, 2003053, 2002025, 2002040, 2002211, 2002194,
	//Gaurabda Year = 470
	2003097, 2003115, 2003129, 2003145, 2003160, 2003177, 2003191, 2003207, 2003222, 2003237, 2003252, 2003268, 2003284, 2003299,
	2003315, 2003331, 2003346, 2004001, 2004016, 2004031, 2004047, 2004066, 2003067, 2003083, 0, 0,
	//Gaurabda Year = 471
	2004111, 2004126, 2004142, 2004158, 2004173, 2004188, 2004204, 2004220, 2004235, 2004250, 2004266, 2004280, 2004297, 2004311,
	2004328, 2004342, 2004359, 2004373, 2005030, 2005044, 2005061, 2005075, 2004080, 2004097, 0, 0,
	//Gaurabda Year = 472
	2005124, 2005139, 2005156, 2005171, 2005186, 2005202, 2005218, 2005263, 2005278, 2005294, 2005308, 2005325, 2005340, 2005356,
	2005371, 2005387, 2005402, 2006057, 2006073, 2006088, 2006104, 2006122, 2005094, 2005109, 2005247, 2005233,
	//Gaurabda Year = 473
	2006168, 2006184, 2006199, 2006215, 2006229, 2006246, 2006261, 2006277, 2006291, 2006307, 2006321, 2006339, 2006353, 2006369,
	2006384, 2006401, 2006415, 2006430, 2007086, 2007100, 2007117, 2007131, 2006137, 2006152, 0, 0,
	//Gaurabda Year = 474
	2007180, 2007194, 2007212, 2007226, 2007242, 2007257, 2007273, 2007288, 2007303, 2007319, 2007334, 2007349, 2007365, 2007381,
	2007396, 2007411, 2007427, 2007443, 2008098, 2008113, 2008129, 2008144, 2007150, 2007164, 0, 0,
	//Gaurabda Year = 475
	2008194, 2008208, 2008225, 2008270, 2008285, 2008301, 2008316, 2008332, 2008346, 2008362, 2008377, 2008394, 2008408, 2008425,
	2008439, 2008456, 2008470, 2009127, 2009141, 2009157, 2009172, 2009191, 2008163, 2008177, 2008255, 2008239,
	//Gaurabda Year = 476
	2009236, 2009253, 2009268, 2009283, 2009298, 2009314, 2009330, 2009345, 2009360, 2009374, 2009390, 2009405, 2009422, 2009437,
	2009452, 2009468, 2009484, 2009499, 2010154, 2010170, 2010185, 2010200, 2009206, 2009221, 0, 0,
	//Gaurabda Year = 477
	2010249, 2010264, 2010281, 2010296, 2010312, 2010326, 2010343, 2010357, 2010374, 2010388, 2010404, 2010418, 2010435, 2010481,
	2010497, 2010512, 2010527, 2011183, 2011197, 2011214, 2011228, 0, 2010219, 2010234, 2010466, 2010450,
	//Gaurabda Year = 478
	2011291, 2011308, 2011323, 2011339, 2011353, 2011370, 2011385, 2011400, 2011416, 2011431, 2011446, 2011462, 2011477, 2011493,
	2011508, 2011524, 2011539, 2012195, 2012210, 2012226, 2012240, 2012260, 0, 2011277, 2011260, 2011246,
	//Gaurabda Year = 479
	2012304, 2012322, 2012336, 2012351, 2012366, 2012382, 2012398, 2012413, 2012429, 2012443, 2012459, 2012473, 2012491, 2012505,
	2012521, 2012535, 2012553, 2012567, 2013223, 2013238, 2013254, 2013269, 2012274, 2012290, 0, 0,
	//Gaurabda Year = 480
	2013318, 2013333, 2013349, 2013365, 2013380, 2013395, 2013411, 2013457, 2013471, 2013487, 2013502, 2013518, 2013534, 2013549,
	2013564, 2013580, 2013596, 2014251, 2014267, 2014282, 2014297, 2014315, 2013287, 2013302, 2013442, 2013427,
	//Gaurabda Year = 481
	2014361, 2014378, 2014392, 2014409, 2014423, 2014440, 2014454, 2014470, 2014484, 2014501, 2014515, 2014532, 2014547, 2014563,
	2014577, 2014594, 2014609, 2014623, 2015280, 2015294, 2015311, 2015325, 2014330, 2014346, 0, 0,
	//Gaurabda Year = 482
	2015374, 2015388, 2015405, 2015420, 2015435, 2015450, 2015467, 2015482, 2015497, 2015512, 2015527, 2015543, 2015559, 2015574,
	2015589, 2015605, 2015621, 2015636, 2016292, 2016306, 2016323, 2016337, 2015343, 2015357, 0, 0,
	//Gaurabda Year = 483
	2016387, 2016401, 2016419, 2016433, 2016449, 2016495, 2016509, 2016526, 2016540, 2016556, 2016570, 2016588, 2016602, 2016618,
	2016632, 2016650, 2016664, 2017320, 2017335, 2017351, 2017366, 2017384, 2016356, 2016370, 2016478, 2016463,
	//Gaurabda Year = 484
	2017430, 2017446, 2017462, 2017476, 2017492, 2017508, 2017523, 2017539, 2017553, 2017569, 2017584, 2017601, 2017615, 2017631,
	2017646, 2017661, 2017677, 2017693, 2018348, 2018363, 2018379, 2018394, 2017399, 2017414, 0, 0,
	//Gaurabda Year = 485
	2018443, 2018458, 2018475, 2018489, 2018505, 2018519, 2018537, 2018551, 2018567, 2018581, 2018597, 2018612, 2018629, 2018644,
	2018659, 2018674, 2018691, 2018706, 2019361, 2019377, 2019391, 2019407, 2018412, 2018427, 0, 0,
	//Gaurabda Year = 486
	2019454, 2019502, 2019517, 2019532, 2019547, 2019563, 2019579, 2019594, 2019609, 2019624, 2019639, 2019656, 2019671, 2019686,
	2019701, 2019718, 2019733, 2020389, 2020403, 2020420, 2020434, 2020453, 2019421, 2019440, 2019485, 2019470,
	//Gaurabda Year = 487
	2020498, 2020515, 2020530, 2020546, 2020560, 2020577, 2020592, 2020606, 2020622, 2020636, 2020653, 2020667, 2020684, 2020698,
	2020715, 2020729, 2020746, 2020761, 2021417, 2021432, 2021447, 2021462, 2020467, 2020484, 0, 0,
	//Gaurabda Year = 488
	2021511, 2021527, 2021543, 2021558, 2021573, 2021589, 2021605, 2021620, 2021636, 2021680, 2021698, 2021712, 2021727, 2021742,
	2021758, 2021774, 2021789, 2022445, 2022460, 2022475, 2022490, 2022509, 2021481, 2021496, 2021666, 2021650,
	//Gaurabda Year = 489
	2022554, 2022572, 2022586, 2022602, 2022616, 2022634, 2022648, 2022664, 2022678, 2022694, 2022709, 2022725, 2022740, 2022756,
	2022771, 2022787, 2022803, 2023458, 2023473, 2023487, 2023504, 2023521, 2022524, 2022540, 0, 0,
	//Gaurabda Year = 490
	2023567, 2023582, 2023598, 2023613, 2023629, 2023644, 2023660, 2023675, 2023690, 2023706, 2023721, 2023736, 2023752, 2023767,
	2023783, 2023798, 2023815, 2023829, 2024486, 2024500, 2024516, 2024530, 2023536, 2023551, 0, 0,
	//Gaurabda Year = 491
	2024580, 2024595, 2024612, 2024626, 2024642, 2024657, 2024674, 2024719, 2024733, 2024750, 2024764, 2024781, 2024795, 2024812,
	2024826, 2024843, 2024858, 2025513, 2025529, 2025544, 2025559, 2025577, 2024550, 2024564, 2024703, 2024689,
	//Gaurabda Year = 492
	2025624, 2025640, 2025655, 2025670, 2025685, 2025702, 2025716, 2025732, 2025747, 2025763, 2025777, 2025795, 2025809, 2025825,
	2025839, 2025857, 2025871, 2025886, 2026542, 2026556, 2026572, 2026587, 2025593, 2025608, 0, 0,
	//Gaurabda Year = 493
	2026637, 2026651, 2026668, 2026682, 2026699, 2026713, 2026730, 2026744, 2026760, 2026775, 2026791, 2026806, 2026822, 2026837,
	2026853, 2026868, 2026884, 2026900, 2027555, 2027570, 2027585, 2027601, 2026606, 2026620, 0, 0,
	//Gaurabda Year = 494
	2027649, 2027663, 2027681, 2027725, 2027741, 2027757, 2027772, 2027787, 2027802, 2027818, 2027833, 2027849, 2027864, 2027880,
	2027895, 2027912, 2027926, 2028583, 2028597, 2028613, 2028627, 2028647, 2027618, 2027633, 2027710, 2027695,
	//Gaurabda Year = 495
	2028692, 2028709, 2028723, 2028739, 2028754, 2028770, 2028786, 2028801, 2028816, 2028830, 2028846, 2028860, 2028878, 2028892,
	2028908, 2028923, 2028940, 2028955, 2029610, 2029625, 2029641, 2029656, 2028661, 2028677, 0, 0,
	//Gaurabda Year = 496
	2029705, 2029720, 2029736, 2029752, 2029767, 2029782, 2029799, 2029813, 2029829, 2029843, 2029860, 2029905, 2029922, 2029936,
	2029953, 2029968, 2029983, 2030638, 2030653, 2030669, 2030684, 2030703, 2029674, 2029690, 2029891, 2029874,
	//Gaurabda Year = 497
	2030748, 2030765, 2030779, 2030796, 2030810, 2030827, 2030841, 2030857, 2030872, 2030887, 2030903, 2030919, 2030934, 2030949,
	2030965, 2030981, 2030996, 2031651, 2031667, 2031682, 2031697, 2031715, 2030717, 2030734, 0, 0,
	//Gaurabda Year = 498
	2031760, 2031778, 2031792, 2031807, 2031822, 2031838, 2031853, 2031869, 2031884, 2031899, 2031915, 2031929, 2031946, 2031961,
	2031977, 2031991, 2032009, 2032023, 2032679, 2032693, 2032710, 2032724, 2031730, 2031746, 0, 0,
	//Gaurabda Year = 499
	2032774, 2032789, 2032805, 2032820, 2032836, 2032851, 2032867, 2032913, 2032927, 2032943, 2032957, 2032974, 2032989, 2033005,
	2033020, 2033036, 2033052, 2033707, 2033722, 2033737, 2033753, 2033771, 2032743, 2032758, 2032897, 2032882,
	//Gaurabda Year = 500
	2033817, 2033833, 2033848, 2033864, 2033879, 2033896, 2033910, 2033926, 2033940, 2033957, 2033971, 2033988, 2034002, 2034019,
	2034033, 2034050, 2034065, 2034079, 2034735, 2034750, 2034766, 2034780, 2033786, 2033802, 0, 0,
	//Gaurabda Year = 501
	2034830, 2034844, 2034862, 2034876, 2034892, 2034907, 2034924, 2034938, 2034954, 2034969, 2034984, 2034999, 2035015, 2035031,
	2035046, 2035062, 2035078, 2035093, 2035748, 2035763, 2035779, 2035794, 2034800, 2034814, 0, 0,
	//Gaurabda Year = 502
	2035843, 2035857, 2035874, 2035919, 2035934, 2035950, 2035966, 2035981, 2035996, 2036012, 2036026, 2036043, 2036057, 2036074,
	2036088, 2036105, 2036119, 2036776, 2036790, 2036807, 2036821, 2036840, 2035812, 2035826, 2035905, 2035888,
	//Gaurabda Year = 503
	2036885, 2036902, 2036917, 2036932, 2036948, 2036964, 2036979, 2036994, 2037009, 2037025, 2037040, 2037054, 2037071, 2037086,
	2037101, 2037117, 2037133, 2037148, 2037803, 2037819, 2037834, 2037850, 2036855, 2036870, 0, 0,
	//Gaurabda Year = 504
	2037898, 2037914, 2037930, 2037945, 2037961, 2037975, 2037992, 2038006, 2038023, 2038037, 2038053, 2038067, 2038085, 2038099,
	2038115, 2038130, 2038147, 2038161, 2038817, 2038832, 2038846, 2038863, 2037868, 2037883, 0, 0,
	//Gaurabda Year = 505
	2038911, 2038959, 2038973, 2038989, 2039004, 2039020, 2039035, 2039050, 2039066, 2039081, 2039096, 2039112, 2039128, 2039143,
	2039158, 2039174, 2039190, 2039845, 2039860, 2039876, 2039891, 2039909, 2038881, 2038897, 2038941, 2038927,
	//Gaurabda Year = 506
	2039954, 2039971, 2039985, 2040002, 2040016, 2040033, 2040047, 2040062, 2040078, 2040092, 2040108, 2040123, 2040140, 2040154,
	2040171, 2040185, 2040202, 2040216, 2040873, 2040887, 2040903, 2040918, 2039923, 2039940, 0, 0,
	//Gaurabda Year = 507
	2040967, 2040982, 2040999, 2041014, 2041029, 2041044, 2041060, 2041076, 2041091, 2041136, 2041153, 2041168, 2041183, 2041198,
	2041214, 2041230, 2041245, 2041900, 2041916, 2041931, 2041946, 2041965, 2040937, 2040952, 2041121, 2041106,
	//Gaurabda Year = 508
	2042010, 2042027, 2042042, 2042058, 2042072, 2042089, 2042103, 2042120, 2042134, 2042150, 2042164, 2042181, 2042196, 2042212,
	2042227, 2042243, 2042258, 2042914, 2042929, 2042943, 2042960, 2042978, 2041980, 2041995, 0, 0,
	//Gaurabda Year = 509
	2043024, 2043038, 2043055, 2043070, 2043086, 2043100, 2043117, 2043132, 2043147, 2043163, 2043177, 2043193, 2043209, 2043224,
	2043240, 2043255, 2043271, 2043286, 2043942, 2043957, 2043973, 2043987, 2042993, 2043007, 0, 0,
	//Gaurabda Year = 510
	2044036, 2044050, 2044068, 2044082, 2044098, 2044144, 2044159, 2044175, 2044189, 2044205, 2044219, 2044237, 2044251, 2044267,
	2044281, 2044299, 2044313, 2044969, 2044984, 2045000, 2045015, 2045033, 2044006, 2044020, 2044130, 2044112,
	//Gaurabda Year = 511
	2045079, 2045095, 2045111, 2045126, 2045141, 2045157, 2045173, 2045188, 2045203, 2045218, 2045233, 2045250, 2045264, 2045281,
	2045295, 2045310, 2045326, 2045342, 2045997, 2046012, 2046028, 2046043, 2045048, 2045064, 0, 0,
	//Gaurabda Year = 512
	2046092, 2046107, 2046124, 2046138, 2046155, 2046169, 2046186, 2046200, 2046216, 2046230, 2046247, 2046261, 2046278, 2046293,
	2046308, 2046323, 2046340, 2046355, 2047010, 2047026, 2047041, 2047057, 2046061, 2046076, 0, 0,
	//Gaurabda Year = 513
	2047105, 2047121, 2047137, 2047182, 2047197, 2047213, 2047229, 2047244, 2047259, 2047274, 2047290, 2047306, 2047321, 2047336,
	2047352, 2047368, 2047383, 2048039, 2048053, 2048070, 2048084, 2048102, 2047075, 2047090, 2047167, 2047152,
	//Gaurabda Year = 514
	2048147, 2048165, 2048179, 2048195, 2048209, 2048226, 2048241, 2048255, 2048272, 2048286, 2048302, 2048316, 2048334, 2048348,
	2048364, 2048378, 2048396, 2048410, 2049066, 2049081, 2049097, 2049112, 2048116, 2048133, 0, 0,
	//Gaurabda Year = 515
	2049160, 2049176, 2049192, 2049207, 2049222, 2049238, 2049254, 2049269, 2049285, 2049299, 2049315, 2049361, 2049378, 2049392,
	2049409, 2049423, 2049439, 2050094, 2050109, 2050125, 2050140, 2050158, 2049130, 2049145, 2049347, 2049330,
	//Gaurabda Year = 516
	2050203, 2050221, 2050235, 2050251, 2050265, 2050283, 2050297, 2050313, 2050327, 2050343, 2050358, 2050375, 2050390, 2050405,
	2050420, 2050437, 2050452, 2051107, 2051123, 2051138, 2051153, 2051171, 2050173, 2050189, 0, 0,
	//Gaurabda Year = 517
	2051217, 2051234, 2051249, 2051265, 2051279, 2051294, 2051310, 2051326, 2051341, 2051356, 2051371, 2051386, 2051403, 2051418,
	2051433, 2051448, 2051465, 2051480, 2052136, 2052150, 2052167, 2052181, 2051187, 2051202, 0, 0,
	//Gaurabda Year = 518
	2052230, 2052244, 2052261, 2052276, 2052292, 2052306, 2052323, 2052368, 2052382, 2052399, 2052413, 2052430, 2052444, 2052461,
	2052475, 2052492, 2052507, 2053163, 2053178, 2053193, 2053208, 2053227, 2052199, 2052213, 2052353, 2052338,
	//Gaurabda Year = 519
	2053273, 2053289, 2053304, 2053319, 2053335, 2053351, 2053366, 2053381, 2053396, 2053412, 2053426, 2053444, 2053458, 2053474,
	2053488, 2053506, 2053520, 2053535, 2054191, 2054206, 2054221, 2054236, 2053242, 2053257, 0, 0,
	//Gaurabda Year = 520
	2054286, 2054300, 2054318, 2054332, 2054348, 2054362, 2054380, 2054394, 2054410, 2054424, 2054440, 2054455, 2054471, 2054486,
	2054502, 2054517, 2054533, 2054549, 2055204, 2055219, 2055234, 2055250, 2054255, 2054270, 0, 0,
	//Gaurabda Year = 521
	2055299, 2055314, 2055331, 2055376, 2055393, 2055407, 2055422, 2055437, 2055453, 2055468, 2055483, 2055499, 2055514, 2055530,
	2055545, 2055562, 2055576, 2056233, 2056247, 2056263, 2056277, 2056296, 2055268, 2055283, 2055361, 2055345,
	//Gaurabda Year = 522
	2056341, 2056358, 2056372, 2056388, 2056403, 2056419, 2056435, 2056450, 2056465, 2056479, 2056496, 2056510, 2056527, 2056541,
	2056558, 2056572, 2056589, 2056604, 2057259, 2057275, 2057290, 2057305, 2056310, 2056326, 0, 0,
	//Gaurabda Year = 523
	2057354, 2057369, 2057386, 2057401, 2057416, 2057431, 2057448, 2057462, 2057478, 2057493, 2057509, 2057523, 2057541, 2057555,
	2057571, 2057585, 2057603, 2057617, 2058273, 2058288, 2058302, 2058318, 2057323, 2057339, 0, 0,
	//Gaurabda Year = 524
	2058366, 2058414, 2058428, 2058445, 2058459, 2058476, 2058490, 2058506, 2058521, 2058537, 2058552, 2058568, 2058583, 2058598,
	2058614, 2058630, 2058646, 2059301, 2059316, 2059331, 2059347, 2059365, 2058337, 2058352, 2058397, 2058383,
	//Gaurabda Year = 525
	2059410, 2059428, 2059442, 2059458, 2059472, 2059490, 2059504, 2059519, 2059534, 2059549, 2059565, 2059580, 2059596, 2059611,
	2059627, 2059641, 2059659, 2059673, 2060330, 2060344, 2060360, 2060374, 2059380, 2059396, 0, 0,
	//Gaurabda Year = 526
	2060423, 2060438, 2060455, 2060469, 2060485, 2060500, 2060516, 2060532, 2060546, 2060592, 2060606, 2060624, 2060638, 2060654,
	2060669, 2060686, 2060701, 2061356, 2061371, 2061387, 2061402, 2061420, 2060393, 2060407, 2060577, 2060562,
	//Gaurabda Year = 527
	2061466, 2061482, 2061498, 2061513, 2061528, 2061545, 2061559, 2061575, 2061589, 2061606, 2061620, 2061637, 2061651, 2061668,
	2061682, 2061699, 2061714, 2062370, 2062384, 2062399, 2062415, 2062434, 2061436, 2061451, 0, 0,
	//Gaurabda Year = 528
	2062480, 2062494, 2062511, 2062525, 2062542, 2062556, 2062573, 2062587, 2062603, 2062618, 2062633, 2062649, 2062665, 2062680,
	2062695, 2062711, 2062727, 2062742, 2063397, 2063413, 2063428, 2063443, 2062449, 2062463, 0, 0,
	//Gaurabda Year = 529
	2063493, 2063507, 2063525, 2063539, 2063555, 2063600, 2063617, 2063631, 2063646, 2063662, 2063676, 2063693, 2063708, 2063724,
	2063738, 2063756, 2063770, 2064426, 2064440, 2064457, 2064471, 2064489, 2063462, 2063477, 2063586, 2063569,
	//Gaurabda Year = 530
	2064535, 2064551, 2064566, 2064582, 2064597, 2064613, 2064628, 2064643, 2064659, 2064674, 2064689, 2064705, 2064720, 2064735,
	2064751, 2064766, 2064782, 2064798, 2065453, 2065468, 2065483, 2065499, 2064504, 2064520, 0, 0,
	//Gaurabda Year = 531
	2065548, 2065563, 2065579, 2065594, 2065610, 2065624, 2065642, 2065656, 2065672, 2065686, 2065703, 2065717, 2065734, 2065748,
	2065764, 2065779, 2065796, 2065810, 2066466, 2066481, 2066497, 2066512, 2065517, 2065532, 0, 0,
	//Gaurabda Year = 532
	2066561, 2066576, 2066590, 2066638, 2066653, 2066669, 2066684, 2066700, 2066715, 2066730, 2066745, 2066761, 2066777, 2066792,
	2066807, 2066824, 2066839, 2067494, 2067509, 2067525, 2067540, 2067559, 2066530, 2066546, 2066622, 2066608,
	//Gaurabda Year = 533
	2067604, 2067621, 2067635, 2067652, 2067666, 2067683, 2067697, 2067713, 2067728, 2067743, 2067759, 2067773, 2067790, 2067804,
	2067821, 2067835, 2067852, 2067866, 2068523, 2068537, 2068554, 2068568, 2067573, 2067590, 0, 0,
	//Gaurabda Year = 534
	2068616, 2068631, 2068648, 2068663, 2068678, 2068694, 2068710, 2068725, 2068740, 2068755, 2068771, 2068817, 2068833, 2068847,
	2068865, 2068879, 2068894, 2069549, 2069565, 2069580, 2069596, 2069614, 2068586, 2068601, 2068802, 2068786,
	//Gaurabda Year = 535
	2069659, 2069676, 2069691, 2069707, 2069721, 2069738, 2069752, 2069769, 2069783, 2069799, 2069813, 2069831, 2069845, 2069861,
	2069876, 2069893, 2069907, 2070563, 2070578, 2070593, 2070609, 2070627, 2069629, 2069644, 0, 0,
	//Gaurabda Year = 536
	2070673, 2070689, 2070705, 2070719, 2070735, 2070749, 2070766, 2070781, 2070796, 2070812, 2070827, 2070842, 2070858, 2070874,
	2070889, 2070904, 2070920, 2070936, 2071591, 2071606, 2071622, 2071637, 2070643, 2070658, 0, 0,
	//Gaurabda Year = 537
	2071687, 2071701, 2071718, 2071732, 2071749, 2071763, 2071780, 2071825, 2071839, 2071855, 2071870, 2071887, 2071901, 2071918,
	2071932, 2071949, 2071963, 2072620, 2072634, 2072650, 2072665, 2072683, 2071656, 2071670, 2071810, 2071794,
	//Gaurabda Year = 538
	2072728, 2072745, 2072760, 2072775, 2072790, 2072806, 2072822, 2072837, 2072852, 2072867, 2072882, 2072899, 2072914, 2072930,
	2072944, 2072962, 2072976, 2072991, 2073646, 2073662, 2073677, 2073692, 2072698, 2072713, 0, 0,
	//Gaurabda Year = 539
	2073741, 2073756, 2073773, 2073788, 2073804, 2073818, 2073835, 2073849, 2073866, 2073880, 2073896, 2073910, 2073927, 2073942,
	2073958, 2073973, 2073989, 2074004, 2074660, 2074675, 2074690, 2074706, 2073711, 2073726, 0, 0,
	//Gaurabda Year = 540
	2074754, 2074770, 2074786, 2074832, 2074846, 2074863, 2074878, 2074893, 2074909, 2074923, 2074939, 2074955, 2074970, 2074986,
	2075001, 2075017, 2075032, 2075688, 2075703, 2075719, 2075733, 2075753, 2074724, 2074739, 2074817, 2074801,
	//Gaurabda Year = 541
	2075797, 2075815, 2075829, 2075845, 2075859, 2075877, 2075891, 2075907, 2075922, 2075937, 2075952, 2075966, 2075984, 2075998,
	2076014, 2076028, 2076046, 2076060, 2076716, 2076731, 2076747, 2076762, 2075767, 2075783, 0, 0,
	//Gaurabda Year = 542
	2076810, 2076825, 2076841, 2076857, 2076872, 2076887, 2076903, 2076918, 2076934, 2076949, 2076964, 2076979, 2076996, 2077010,
	2077027, 2077041, 2077058, 2077072, 2077729, 2077743, 2077758, 2077774, 2076779, 2076794, 0, 0,
	//Gaurabda Year = 543
	2077853, 2077870, 2077884, 2077901, 2077915, 2077932, 2077946, 2077962, 2077976, 2077993, 2078007, 2078024, 2078039, 2078054,
	2078069, 2078086, 2078101, 2078756, 2078772, 2078787, 2078803, 2078821, 2077793, 2077838, 2077822, 2077807,
	//Gaurabda Year = 544
	2078866, 2078883, 2078898, 2078914, 2078928, 2078945, 2078959, 2078975, 2078990, 2079005, 2079020, 2079036, 2079052, 2079067,
	2079082, 2079098, 2079114, 2079129, 2079785, 2079799, 2079816, 2079830, 2078836, 2078851, 0, 0,
	//Gaurabda Year = 545
	2079880, 2079894, 2079912, 2079926, 2079942, 2079956, 2079973, 2079988, 2080003, 2080049, 2080065, 2080081, 2080095, 2080111,
	2080125, 2080143, 2080157, 2080813, 2080828, 2080844, 2080859, 2080876, 2079849, 2079863, 2080034, 2080019,
	//Gaurabda Year = 546
	2080922, 2080938, 2080953, 2080968, 2080984, 2081000, 2081015, 2081031, 2081045, 2081061, 2081076, 2081093, 2081107, 2081124,
	2081138, 2081155, 2081169, 2081826, 2081840, 2081855, 2081871, 2081890, 2080891, 2080906, 0, 0,
	//Gaurabda Year = 547
	2081935, 2081949, 2081967, 2081981, 2081997, 2082011, 2082029, 2082043, 2082059, 2082073, 2082089, 2082104, 2082121, 2082136,
	2082151, 2082166, 2082183, 2082198, 2082853, 2082869, 2082884, 2082899, 2081904, 2081919, 0, 0,
	//Gaurabda Year = 548
	2082948, 2082963, 2082980, 2082995, 2083011, 2083056, 2083073, 2083087, 2083102, 2083117, 2083132, 2083149, 2083164, 2083179,
	2083194, 2083211, 2083226, 2083882, 2083896, 2083913, 2083927, 2083946, 2082917, 2082933, 2083042, 2083025,
	//Gaurabda Year = 549
	2083991, 2084008, 2084023, 2084039, 2084053, 2084070, 2084085, 2084100, 2084115, 2084130, 2084146, 2084162, 2084177, 2084191,
	2084208, 2084222, 2084239, 2084254, 2084910, 2084925, 2084940, 2084955, 2083960, 2083977, 0, 0,
	//Gaurabda Year = 550
	2085003, 2085019, 2085035, 2085050, 2085065, 2085081, 2085097, 2085112, 2085127, 2085142, 2085158, 2085172, 2085190, 2085204,
	2085220, 2085234, 2085252, 2085266, 2085922, 2085937, 2085953, 2085967, 2084973, 2084988, 0, 0,
	//Gaurabda Year = 551
	2086017, 2086032, 2086046, 2086094, 2086108, 2086125, 2086140, 2086156, 2086170, 2086186, 2086201, 2086217, 2086232, 2086248,
	2086263, 2086279, 2086295, 2086950, 2086965, 2086980, 2086996, 2087014, 2085986, 2086001, 2086078, 2086064,
	//Gaurabda Year = 552
	2087060, 2087077, 2087091, 2087107, 2087121, 2087139, 2087153, 2087169, 2087183, 2087199, 2087214, 2087229, 2087245, 2087260,
	2087276, 2087291, 2087308, 2087322, 2087979, 2087993, 2088009, 2088023, 2087029, 2087045, 0, 0,
	//Gaurabda Year = 553
	2088073, 2088088, 2088105, 2088119, 2088135, 2088150, 2088166, 2088182, 2088197, 2088212, 2088227, 2088274, 2088289, 2088304,
	2088321, 2088336, 2088351, 2089006, 2089022, 2089037, 2089052, 2089069, 2088043, 2088057, 2088259, 2088243,
	//Gaurabda Year = 554
	2089115, 2089132, 2089147, 2089162, 2089177, 2089194, 2089208, 2089224, 2089239, 2089255, 2089269, 2089287, 2089300, 2089317,
	2089331, 2089349, 2089363, 2090019, 2090034, 2090049, 2090064, 2090083, 2089085, 2089100, 0, 0,
	//Gaurabda Year = 555
	2090129, 2090145, 2090160, 2090174, 2090191, 2090205, 2090222, 2090236, 2090252, 2090267, 2090283, 2090298, 2090314, 2090329,
	2090344, 2090360, 2090376, 2090392, 2091047, 2091062, 2091077, 2091093, 2090098, 2090113, 0, 0,
	//Gaurabda Year = 556
	2091142, 2091156, 2091174, 2091188, 2091204, 2091218, 2091236, 2091280, 2091295, 2091311, 2091326, 2091342, 2091357, 2091373,
	2091387, 2091405, 2091419, 2092076, 2092090, 2092106, 2092120, 2092140, 2091111, 2091126, 2091266, 2091250,
	//Gaurabda Year = 557
	2092185, 2092202, 2092216, 2092232, 2092247, 2092263, 2092279, 2092293, 2092309, 2092324, 2092339, 2092355, 2092371, 2092386,
	2092401, 2092418, 2092433, 2093089, 2093103, 2093118, 2093134, 2093149, 2092154, 2092170, 0, 0,
	//Gaurabda Year = 558
	2093197, 2093212, 2093228, 2093244, 2093259, 2093274, 2093291, 2093305, 2093321, 2093335, 2093352, 2093366, 2093383, 2093397,
	2093414, 2093428, 2093445, 2093460, 2094116, 2094130, 2094146, 2094161, 2093166, 2093182, 0, 0,
	//Gaurabda Year = 559
	2094210, 2094226, 2094242, 2094288, 2094302, 2094319, 2094333, 2094349, 2094364, 2094379, 2094395, 2094411, 2094426, 2094441,
	2094457, 2094473, 2094488, 2095143, 2095159, 2095174, 2095189, 2095208, 2094180, 2094195, 2094271, 2094257,
	//Gaurabda Year = 560
	2095253, 2095270, 2095285, 2095301, 2095315, 2095332, 2095346, 2095363, 2095377, 2095393, 2095408, 2095422, 2095439, 2095454,
	2095470, 2095484, 2095502, 2095516, 2096172, 2096186, 2096203, 2096217, 2095223, 2095239, 0, 0,
	//Gaurabda Year = 561
	2096267, 2096282, 2096298, 2096313, 2096328, 2096344, 2096360, 2096375, 2096390, 2096406, 2096421, 2096436, 2096452, 2096467,
	2096483, 2096498, 2096515, 2096529, 2097186, 2097200, 2097215, 2097230, 2096236, 2096251, 0, 0,
	//Gaurabda Year = 562
	2097309, 2097325, 2097340, 2097356, 2097370, 2097388, 2097402, 2097418, 2097432, 2097449, 2097463, 2097480, 2097494, 2097510,
	2097525, 2097542, 2097557, 2098212, 2098227, 2098243, 2098258, 2098276, 2097249, 2097294, 2097278, 2097263,
	//Gaurabda Year = 563
	2098322, 2098338, 2098354, 2098369, 2098384, 2098401, 2098415, 2098430, 2098446, 2098461, 2098476, 2098491, 2098507, 2098523,
	2098538, 2098553, 2098570, 2098585, 2099240, 2099255, 2099271, 2099286, 2098292, 2098307, 0, 0,
	//Gaurabda Year = 564
	2099336, 2099350, 2099367, 2099381, 2099398, 2099412, 2099429, 2099443, 2099459, 2099504, 2099521, 2099536, 2099550, 2099567,
	2099581, 2099598, 2099612, 2100269, 2100283, 2100300, 2100314, 2100333, 2099305, 2099319, 2099490, 2099474,
	//Gaurabda Year = 565
	2100378, 2100395, 2100410, 2100425, 2100441, 2100457, 2100472, 2100487, 2100502, 2100518, 2100533, 2100549, 2100564, 2100580,
	2100594, 2100612, 2100626, 2101282, 2101296, 2101313, 2101327, 2101346, 2100348, 2100363, 0, 0,
	//Gaurabda Year = 566
	2101390, 2101405, 2101422, 2101437, 2101453, 2101467, 2101484, 2101498, 2101515, 2101529, 2101545, 2101559, 2101577, 2101591,
	2101607, 2101622, 2101639, 2101653, 2102309, 2102324, 2102339, 2102355, 2101360, 2101375, 0, 0,
	//Gaurabda Year = 567
	2102404, 2102419, 2102435, 2102451, 2102466, 2102512, 2102527, 2102542, 2102558, 2102573, 2102588, 2102604, 2102620, 2102635,
	2102650, 2102666, 2102682, 2103337, 2103352, 2103368, 2103383, 2103402, 2102373, 2102389, 2102497, 2102481,
	//Gaurabda Year = 568
	2103447, 2103464, 2103478, 2103494, 2103509, 2103526, 2103540, 2103556, 2103571, 2103586, 2103601, 2103618, 2103633, 2103647,
	2103664, 2103678, 2103695, 2103709, 2104366, 2104380, 2104396, 2104411, 2103416, 2103433, 0, 0,
	//Gaurabda Year = 569
	2104460, 2104475, 2104491, 2104507, 2104522, 2104537, 2104553, 2104569, 2104584, 2104599, 2104614, 2104629, 2104646, 2104661,
	2104677, 2104691, 2104708, 2104723, 2105379, 2105393, 2105410, 2105424, 2104430, 2104445, 0, 0,
	//Gaurabda Year = 570
	2105473, 2105519, 2105533, 2105550, 2105564, 2105581, 2105595, 2105612, 2105626, 2105642, 2105656, 2105673, 2105688, 2105704,
	2105719, 2105735, 2105750, 2106406, 2106421, 2106436, 2106452, 2106470, 2105442, 2105457, 2105502, 2105487,
	//Gaurabda Year = 571
	2106516, 2106532, 2106547, 2106563, 2106577, 2106594, 2106609, 2106625, 2106639, 2106654, 2106669, 2106685, 2106701, 2106716,
	2106732, 2106747, 2106763, 2106778, 2107434, 2107449, 2107465, 2107479, 2106485, 2106500, 0, 0
]
/*************************************************    js/GCNaksatra.js **********************************************/
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

/*************************************************    js/GCYoga.js **********************************************/
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

/*************************************************    js/GCDisplaySettings.js **********************************************/
let GCDS = {
	"DISP_ALWAYS": -1,
	"CAL_ARUN_TIME": 1,
	"CAL_ARUN_TITHI": 0,
	"CAL_SUN_RISE": 2,
	"CAL_SUN_SANDHYA": 34,
	"CAL_BRAHMA_MUHURTA": 3,
	"CAL_MOON_RISE": 4,
	"CAL_MOON_SET": 5,
	"CAL_KSAYA": 7,
	"CAL_VRDDHI": 8,
	"CAL_SUN_LONG": 9,
	"CAL_MOON_LONG": 10,
	"CAL_AYANAMSHA": 11,
	"CAL_JULIAN": 12,
	"CATURMASYA_SYSTEM": 66,
	"CATURMASYA_PURNIMA": 13,
	"CATURMASYA_PRATIPAT": 14,
	"CATURMASYA_EKADASI": 15,
	"CAL_SANKRANTI": 16,
	"CAL_EKADASI_PARANA": 17,
	"CAL_HEADER_MASA": 18,
	"CAL_HEADER_MONTH": 19,
	"CAL_MASA_CHANGE": 21,
	"CAL_FEST_0": 22,
	"CAL_DST_CHANGE": 35,
	"GENERAL_FIRST_DOW": 40,
	"APP_CHILDNAMES": 48,
	"GENERAL_MASA_FORMAT": 49,
	"GENERAL_ANNIVERSARY_FMT": 51,
	"COREEVENTS_SUN": 52,
	"COREEVENTS_TITHI": 53,
	"COREEVENTS_NAKSATRA": 54,
	"COREEVENTS_SANKRANTI": 55,
	"COREEVENTS_CONJUNCTION": 56,
	"COREEVENTS_RAHUKALAM": 57,
	"COREEVENTS_YAMAGHANTI": 58,
	"COREEVENTS_GULIKALAM": 59,
	"COREEVENTS_MOON": 60,
	"COREEVENTS_MOONRASI": 61,
	"COREEVENTS_ASCENDENT": 62,
	"COREEVENTS_SORT": 63,
	"COREEVENTS_ABHIJIT_MUHURTA": 64,
	"COREEVENTS_YOGA": 65,
	"CAL_COREEVENTS": 67,
	"CAL_COL_SUNRISE": 68,
	"CAL_COL_NOON   ": 69,
	"CAL_COL_SUNSET ": 70,
	"CAL_ECLIPSE": 71
}

let DisplayPriorities = {
	"PRIO_MAHADVADASI": 10,
	"PRIO_EKADASI": 20,
	"PRIO_EKADASI_PARANA": 90,
	"PRIO_FESTIVALS_0": 100,
	"PRIO_FESTIVALS_1": 200,
	"PRIO_FESTIVALS_2": 300,
	"PRIO_FESTIVALS_3": 400,
	"PRIO_FESTIVALS_4": 500,
	"PRIO_FESTIVALS_5": 600,
	"PRIO_FESTIVALS_6": 700,
	"PRIO_FASTING": 900,
	"PRIO_SANKRANTI": 920,
	"PRIO_MASA_CHANGE": 940,
	"PRIO_DST_CHANGE": 950,
	"PRIO_KSAYA": 965,
	"PRIO_CM_CONT": 971,
	"PRIO_CM_DAY": 972,
	"PRIO_CM_DAYNOTE": 973,
	"PRIO_ARUN": 975,
	"PRIO_SUN": 980,
	"PRIO_MOON": 990,
	"PRIO_CORE_ASTRO": 995,
	"PRIO_ASTRO": 1000,
}

let defaultDisplaySettings = {
	0: {
		val: 0,
		oldval: 0,
		text: "Tithi at arunodaya"
	},
	1: {
		val: 0,
		oldval: 0,
		text: "Arunodaya Time"
	},
	2: {
		val: 0,
		oldval: 0,
		text: "Sunrise Time"
	},
	3: {
		val: 0,
		oldval: 0,
		text: "Sunset Time"
	},
	4: {
		val: 0,
		oldval: 0,
		text: "Moonrise Time"
	},
	5: {
		val: 0,
		oldval: 0,
		text: "Moonset Time"
	},
	6: {
		val: 1,
		oldval: 1,
		text: "Festivals"
	},
	7: {
		val: 0,
		oldval: 0,
		text: "Info about ksaya tithi"
	},
	8: {
		val: 0,
		oldval: 0,
		text: "Info about vriddhi tithi"
	},
	9: {
		val: 0,
		oldval: 0,
		text: "Sun Longitude"
	},
	10: {
		val: 0,
		oldval: 0,
		text: "Moon Longitude"
	},
	11: {
		val: 0,
		oldval: 0,
		text: "Ayanamsha value"
	},
	12: {
		val: 0,
		oldval: 0,
		text: "Julian Day"
	},
	13: {
		val: 0,
		oldval: 0,
		text: "Caturmasya Purnima System"
	},
	14: {
		val: 0,
		oldval: 0,
		text: "Caturmasya Pratipat System"
	},
	15: {
		val: 0,
		oldval: 0,
		text: "Caturmasya Ekadasi System"
	},
	16: {
		val: 1,
		oldval: 1,
		text: "Sankranti Info"
	},
	17: {
		val: 1,
		oldval: 1,
		text: "Ekadasi Info"
	},
	18: {
		val: 1,
		oldval: 1,
		text: "Masa Header Info"
	},
	19: {
		val: 0,
		oldval: 0,
		text: "Month Header Info"
	},
	20: {
		val: 0,
		oldval: 0,
		text: "Do not show empty days"
	},
	21: {
		val: 0,
		oldval: 0,
		text: "Show begining of masa"
	},
	22: {
		val: 1,
		oldval: 1,
		text: "Appearance days of the Lord"
	},
	23: {
		val: 1,
		oldval: 1,
		text: "Events in the pastimes of the Lord"
	},
	24: {
		val: 1,
		oldval: 1,
		text: "App, Disapp of Recent Acaryas"
	},
	25: {
		val: 1,
		oldval: 1,
		text: "App, Disapp of Mahaprabhu's Associates and Other Acaryas"
	},
	26: {
		val: 1,
		oldval: 1,
		text: "ISKCON's Historical Events"
	},
	27: {
		val: 1,
		oldval: 1,
		text: "Bengal-specific Holidays"
	},
	28: {
		val: 1,
		oldval: 1,
		text: "My Personal Events"
	},
	29: {
		val: 1,
		oldval: 1,
		text: "Today Sunrise"
	},
	30: {
		val: 1,
		oldval: 1,
		text: "Today Noon"
	},
	31: {
		val: 1,
		oldval: 1,
		text: "Today Sunset"
	},
	32: {
		val: 0,
		oldval: 0,
		text: "Sandhya Times"
	},
	33: {
		val: 1,
		oldval: 1,
		text: "Sunrise Info"
	},
	34: {
		val: 0,
		oldval: 0,
		text: "Noon Time"
	},
	35: {
		val: 1,
		oldval: 1,
		text: "Notice about DST"
	},
	36: {
		val: 1,
		oldval: 1,
		text: "Naksatra"
	},
	37: {
		val: 1,
		oldval: 1,
		text: "Yoga"
	},
	38: {
		val: 1,
		oldval: 1,
		text: "Fasting Flag"
	},
	39: {
		val: 1,
		oldval: 1,
		text: "Paksa Info"
	},
	40: {
		val: 0,
		oldval: 0,
		text: "First Day in Week"
	},
	41: {
		val: 0,
		oldval: 0,
		text: "Rasi"
	},
	42: {
		val: 0,
		oldval: 0,
		text: "Old Style Fasting text"
	},
	43: {
		val: 0,
		oldval: 0,
		text: "Name of month - type"
	},
	44: {
		val: 0,
		oldval: 0,
		text: "Editable Default Events"
	},
	45: {
		val: 0,
		oldval: 0,
		text: "Today Brahma Muhurta"
	},
	46: {
		val: 0,
		oldval: 0,
		text: "Today Rasi of the Moon"
	},
	47: {
		val: 0,
		oldval: 0,
		text: "Today Naksatra Pada details"
	},
	48: {
		val: 0,
		oldval: 0,
		text: "Child Names Suggestions"
	},
	49: {
		val: 0,
		oldval: 0,
		text: "Masa Name Format"
	},
	50: {
		val: 0,
		oldval: 0,
		text: "Ekadasi Parana details"
	},
	51: {
		val: 0,
		oldval: 0,
		text: "Aniversary show format"
	},
	52: {
		val: 1,
		oldval: 1,
		text: "Sun events"
	},
	53: {
		val: 1,
		oldval: 1,
		text: "Tithi events"
	},
	54: {
		val: 1,
		oldval: 1,
		text: "Naksatra Events"
	},
	55: {
		val: 1,
		oldval: 1,
		text: "Sankranti Events"
	},
	56: {
		val: 1,
		oldval: 1,
		text: "Conjunction Events"
	},
	57: {
		val: 0,
		oldval: 0,
		text: "Rahu kalam"
	},
	58: {
		val: 0,
		oldval: 0,
		text: "Yama ghanti"
	},
	59: {
		val: 0,
		oldval: 0,
		text: "Guli kalam"
	},
	60: {
		val: 0,
		oldval: 0,
		text: "Moon events"
	},
	61: {
		val: 0,
		oldval: 0,
		text: "Moon rasi"
	},
	62: {
		val: 0,
		oldval: 0,
		text: "Ascendent"
	},
	63: {
		val: 1,
		oldval: 1,
		text: "Sort results core events"
	},
	64: {
		val: 0,
		oldval: 0,
		text: "Abhijit Muhurta"
	},
	65: {
		val: 0,
		oldval: 0,
		text: "Yoga Events"
	},
	66: {
		val: 1,
		oldval: 1,
		text: "Caturmasya System"
	},
	67: {
		val: 0,
		oldval: 0,
		text: "Core Events in Calendar"
	},
	68: {
		val: 0,
		oldval: 0,
		text: "Calendar Column - Sunrise"
	},
	69: {
		val: 0,
		oldval: 0,
		text: "Calendar Column - Noon"
	},
	70: {
		val: 0,
		oldval: 0,
		text: "Calendar Column - Sunset"
	},
	71: {
		val: 1,
		oldval: 0,
		text: "Show Eclipses"
	}
}


class GCDisplaySettings {

  constructor() {
		this.GCDisplaySettings_gss = defaultDisplaySettings
	}

	get CalColNaksatra()
	{ return getBoolValue(36); }

	set CalColNaksatra(value)
	{ setBoolValue(36, value); }

	get CalColYoga()
	{ return getBoolValue(37); }

	set CalColYoga(value)
	{ setBoolValue(37, value); }

	get CalColFast()
	{ return getBoolValue(38); }

	set CalColFast(value)
	{ setBoolValue(38, value); }

	get CalColPaksa()
	{ return getBoolValue(39); }

	set CalColPaksa(value)
	{ setBoolValue(39, value); }

	get CalColMoonRasi()
	{ return getBoolValue(41); }

	set CalColMoonRasi(value)
	{ setBoolValue(41, value); }

	get CalColCoreEvents()
	{ return getBoolValue(67); }

	set CalColCoreEvents(value)
	{ setBoolValue(67, value); }

	get CalColSunrise()
	{ return getBoolValue(68); }

	set CalColSunrise(value)
	{ setBoolValue(68, value); }

	get CalColNoon()
	{ return getBoolValue(69); }

	set CalColNoon(value)
	{ setBoolValue(69, value); }

	get CalColSunset()
	{ return getBoolValue(70); }

	set CalColSunset(value)
	{ setBoolValue(70, value); }

	getCount()
	{
		return this.GCDisplaySettings_gss.length
	}

	getValue(i)
	{
		return this.GCDisplaySettings_gss[i].val;
	}

	getBoolValue(i)
	{
		return this.GCDisplaySettings_gss[i].val != 0;
	}
	setValue(i, val)
	{
		this.GCDisplaySettings_gss[i].old_val = this.GCDisplaySettings_gss[i].val;
		this.GCDisplaySettings_gss[i].val = val;
	}

	setBoolValue(i, val)
	{
		this.GCDisplaySettings_gss[i].old_val = this.GCDisplaySettings_gss[i].val;
		this.GCDisplaySettings_gss[i].val = val ? 1 : 0;
	}

	getText(i)
	{
		return this.GCDisplaySettings_gss[i].text;
	}

}

let gds = new GCDisplaySettings();

/*************************************************    js/GCConjunction.js **********************************************/
class GCConjunction {

	/*********************************************************************/
	/*                                                                   */
	/*  m1 - previous moon position                                      */
	/*  m2 - next moon position                                          */
	/*  s1 - previous sun position                                       */
	/*  s2 - next sun position                                           */
	/*                                                                   */
	/*  Test for conjunction of the sun and moon                         */
	/*  m1,s1 is in one time moment                                      */
	/*  m2,s2 is in second time moment                                   */
	/*                                                                   */
	/*  this function tests whether conjunction occurs between           */
	/*  these two moments                                                */
	/*                                                                   */
	/*********************************************************************/

	static IsConjunction(m1, s1, s2, m2) {
		if (m2 < m1)
			m2 += 360.0;
		if (s2 < s1)
			s2 += 360.0;
		if ((m1 <= s1) && (s1 < s2) && (s2 <= m2))
			return true;

		m1 = GCMath.putIn180(m1);
		m2 = GCMath.putIn180(m2);
		s1 = GCMath.putIn180(s1);
		s2 = GCMath.putIn180(s2);

		if ((m1 <= s1) && (s1 < s2) && (s2 <= m2))
			return true;

		return false;
	}

	///////////////////////////////////////////////////////////////////////
	// GET PREVIOUS CONJUNCTION OF THE SUN AND MOON
	//
	// THIS IS HELP FUNCTION FOR GetPrevConjunction(VCTIME test_date, 
	//                                         VCTIME &found, bool this_day, EARTHDATA earth)
	//
	// looking for previous sun-moon conjunction
	// it starts from input day from 12:00 AM (noon) UTC
	// so output can be the same day
	// if output is the same day, then conjunction occurs between 00:00 AM and noon of this day
	//
	// date - input / output
	// earth - input
	// return value - sun longitude in degs
	//
	// error is when return value is greater than 999.0 deg

	static GetPrevConjunctionX(in_date, earth)
	{
	
		var bCont = 32;
		var prevSun = 0.0, prevMoon = 0.0, prevDiff = 0.0;
		var nowSun = 0.0, nowMoon = 0.0, nowDiff = 0.0;
		//	SUNDATA sun;
		var jd, longitudeMoon;
		var d = new GregorianDateTime();
		var date = new GregorianDateTime()
		date.Set(in_date)

		d.Set(date);
		d.shour = 0.5;
		d.TimezoneHours = 0.0;
		jd = d.GetJulian();//GetJulianDay(d.year, d.month, d.day);

		// set initial data for input day
		// NOTE: for grenwich
		//SunPosition(d, earth, sun);
		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
		prevSun = GCSunData.GetSunLongitude(d);
		prevMoon = longitudeMoon;
		prevDiff = GCMath.putIn180(prevSun - prevMoon);

		do
		{
			// shift to day before
			d.PreviousDay();
			jd -= 1.0;
			// calculation
			//SunPosition(d, earth, sun);
			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
			nowSun = GCSunData.GetSunLongitude(d);
			nowMoon = longitudeMoon;
			nowDiff = GCMath.putIn180(nowSun - nowMoon);
			// if difference of previous has another sign than now calculated
			// then it is the case that moon was faster than sun and he 
			//printf("        prevsun=%f\nprevmoon=%f\nnowsun=%f\nnowmoon=%f\n", prevSun, prevMoon, nowSun, nowMoon);


			if (IsConjunction(nowMoon, nowSun, prevSun, prevMoon))
			{
				// now it calculates actual time and zodiac of conjunction
				var x;
				if (prevDiff == nowDiff)
					return [0, null];
				x = Math.abs(nowDiff) / Math.abs(prevDiff - nowDiff);
				if (x < 0.5)
				{
					d.shour = x + 0.5;
				}
				else
				{
					d.NextDay();
					d.shour = x - 0.5;
				}
				date.Set(d);
				var other = GCSunData.GetSunLongitude(d);
				//			double other2 = nowSun + (prevSun - nowSun)*x;
				GCMath.putIn360(prevSun);
				GCMath.putIn360(nowSun);
				if (Math.abs(prevSun - nowSun) > 10.0)
				{
					return [GCMath.putIn180(nowSun) + (GCMath.putIn180(prevSun) - GCMath.putIn180(nowSun)) * x, date]
				}
				else
					return [nowSun + (prevSun - nowSun) * x, date]
				//			return other2;
			}
			prevSun = nowSun;
			prevMoon = nowMoon;
			prevDiff = nowDiff;
			bCont--;
		}
		while (bCont >= 0);

		return [1000.0,null];
	}

	///////////////////////////////////////////////////////////////////////
	// GET NEXT CONJUNCTION OF THE SUN AND MOON
	//
	// Help function for GetNextConjunction(VCTIME test_date, VCTIME &found, 
	//                                      bool this_day, EARTHDATA earth)
	//
	// looking for next sun-moon conjunction
	// it starts from input day from 12:00 AM (noon) UTC
	// so output can be the same day
	// if output is the same day, then conjunction occurs 
	// between noon and midnight of this day
	//
	// date - input / output
	// earth - input
	// return value - sun longitude
	//
	// error is when return value is greater than 999.0 deg

	static GetNextConjunctionX(in_date, earth)
	{
		var date = new GregorianDateTime()
		var bCont = 32;
		var prevSun = 0.0, prevMoon = 0.0, prevDiff = 0.0;
		var nowSun = 0.0, nowMoon = 0.0, nowDiff = 0.0;
		//SUNDATA sun;
		var jd, longitudeMoon;
		var d = new GregorianDateTime();

		date.Set(in_date)
		d.Set(date);
		d.shour = 0.5;
		d.TimezoneHours = 0.0;
		jd = d.GetJulian();

		// set initial data for input day
		// NOTE: for grenwich
		//SunPosition(d, earth, sun, 0.0);
		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
		nowSun = GCMath.putIn360(GCSunData.GetSunLongitude(d));
		nowMoon = GCMath.putIn360(longitudeMoon);
		nowDiff = GCMath.putIn180(nowSun - nowMoon);

		do
		{
			// shift to day before
			d.NextDay();
			jd += 1.0;
			// calculation
			//SunPosition(d, earth, sun, 0.0);
			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
			prevSun = GCSunData.GetSunLongitude(d);
			prevMoon = longitudeMoon;
			prevDiff = GCMath.putIn180(prevSun - prevMoon);
			// if difference of previous has another sign than now calculated
			// then it is the case that moon was faster than sun and he 
			//printf("        prevsun=%f\nprevmoon=%f\nnowsun=%f\nnowmoon=%f\n", prevSun, prevMoon, nowSun, nowMoon);


			if (IsConjunction(nowMoon, nowSun, prevSun, prevMoon))
			{
				// now it calculates actual time and zodiac of conjunction
				var x;
				if (prevDiff == nowDiff)
					return [0, null];
				x = Math.Abs(nowDiff) / Math.Abs(prevDiff - nowDiff);
				if (x < 0.5)
				{
					d.PreviousDay();
					d.shour = x + 0.5;
				}
				else
				{
					d.shour = x - 0.5;
				}
				date.Set(d);
				GCMath.putIn360(prevSun);
				GCMath.putIn360(nowSun);
				if (Math.Abs(prevSun - nowSun) > 10.0)
				{
					return [GCMath.putIn180(nowSun) + (GCMath.putIn180(prevSun) - GCMath.putIn180(nowSun)) * x, date]
				}
				else
					return [nowSun + (prevSun - nowSun) * x, date]
			}
			nowSun = prevSun;
			nowMoon = prevMoon;
			nowDiff = prevDiff;
			bCont--;
		}
		while (bCont >= 0);

		return [1000.0, null];
	}

	/*********************************************************************/
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*********************************************************************/

	static GetPrevConjunction(test_date, this_conj, earth)
	{
		var phi = 12.0;
		var l1, l2, sunl, longitudeMoon;

		if (this_conj)
		{
			test_date.shour -= 0.2;
			test_date.NormalizeValues();
		}

		var jday = test_date.GetJulianComplete();
		var xj;
		var d = new GregorianDateTime();
		d.Set(test_date);
		var xd = new GregorianDateTime();
		var scan_step = 1.0;
		var prev_tit = 0;
		var new_tit = -1;

		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
		sunl = GCSunData.GetSunLongitude(d);
		l1 = GCMath.putIn180(longitudeMoon - sunl);
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

			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
			sunl = GCSunData.GetSunLongitude(d);
			//console.log('count', counter, 'jday', jday, 'moon.long', longitudeMoon, 'sun.long', sunl);
			l2 = GCMath.putIn180(longitudeMoon - sunl);
			new_tit = GCMath.IntFloor(l2 / phi);

			if (prev_tit >= 0 && new_tit < 0)
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
				prev_tit = new_tit;
			}

		}
		var found = new GregorianDateTime();
		found.Set(d);
		return [sunl, found];
	}

	/*********************************************************************/
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*                                                                   */
	/*********************************************************************/

	static GetNextConjunction(test_date, this_conj, earth)
	{
		var phi = 12.0;
		var l1, l2, longitudeSun, longitudeMoon;

		if (this_conj)
		{
			test_date.shour += 0.2;
			test_date.NormalizeValues();
		}


		var jday = test_date.GetJulianComplete();
		var xj;
		var d = new GregorianDateTime();
		d.Set(test_date);
		var xd = new GregorianDateTime();
		var scan_step = 1.0;
		var prev_tit = 0;
		var new_tit = -1;

		longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
		longitudeSun = GCSunData.GetSunLongitude(d);
		l1 = GCMath.putIn180(longitudeMoon - longitudeSun);
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

			longitudeMoon = GCCoreAstronomy.GetMoonLongitude(d, earth);
			longitudeSun = GCSunData.GetSunLongitude(d);
			l2 = GCMath.putIn180(longitudeMoon - longitudeSun);
			new_tit = GCMath.IntFloor(l2 / phi);

			if (prev_tit < 0 && new_tit >= 0)
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

			prev_tit = new_tit;
		}
		var found = new GregorianDateTime();
		found.Set(d);
		return [longitudeSun, found];
	}

}

/*************************************************    js/GCHourTime.js **********************************************/
class GCHourTime
{
	constructor() {
		this.hour = 0
		this.min = 0
		this.sec = 0
		this.milli = 0

		this.longitude = 0.0
		this.longitudeMoon = 0.0
		this.Ayanamsa = 0.0
	}

	static fromObject(obj)
	{
		var hourtime = new GCHourTime();
		hourtime.Set(obj);
		return hourtime;
	}

	Set(rise)
	{
		// TODO: Complete member initialization
		this.hour = rise.hour;
		this.min = rise.min;
		this.sec = rise.sec;
		this.mili = rise.mili;
		this.longitude = 0.0;
		this.longitudeMoon = 0.0;
		this.Ayanamsa = rise.Ayanamsa;
	}

	static Create(rise,p)
	{
		var nt = new GCHourTime()
		nt.Set(rise)
		nt.AddMinutes(p);
		return nt
	}

	get Tithi()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.longitude - 180.0) / 12.0;
		return GCMath.IntFloor(d);
	}

	get TithiElapse()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.longitude - 180.0) / 12.0;
		return (d - Math.Floor(d)) * 100.0;
	}

	get Paksa()
	{
		return this.Tithi >= 15 ? 1 : 0;
	}

	get Naksatra()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return GCMath.IntFloor(d);
	}

	get NaksatraElapse()
	{
		var d = GCMath.putIn360(this.longitudeMoon - this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return (d - Math.Floor(d)) * 100.0;
	}

	get NaksatraPada()
	{
		return GCMath.IntFloor(this.NaksatraElapse / 25.0);
	}


	get Yoga()
	{
		var d = GCMath.putIn360(this.longitudeMoon + this.longitude - 2 * this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return GCMath.IntFloor(d);
	}

	get YogaElapse()
	{
		var d = GCMath.putIn360(this.longitudeMoon + this.longitude - 2 * this.Ayanamsa);
		d = (d * 3.0) / 40.0;
		return (d - Math.Floor(d)) * 100.0;
	}

	get RasiOfSun()
	{
		return GCRasi.GetRasi(this.longitude, this.Ayanamsa);
	}

	get RasiOfMoon()
	{
		return GCRasi.GetRasi(this.longitudeMoon, this.Ayanamsa);
	}


	get TotalDays()
	{
		return this.hour / 24.0 + this.min / 1440.0 + this.sec / 86400.0 + this.mili / 86400000.0;
	}
	set TotalDays(value)
	{
		this.SetDayTime(value);
	}

	get TotalHours()
	{
		return this.hour + min / 60.0 + this.sec / 3600.0 + this.mili / 3600000.0;
	}

	get TotalMinutes()
	{
		return this.hour * 60.0 + this.min + this.sec / 60.0 + this.mili / 60000.0;
	}

	get TotalSeconds()
	{
		return this.hour * 3600.0 + this.min * 60.0 + this.sec + this.mili / 1000.0;
	}

	ShortSandhyaString()
	{
		var start = GCHourTime.Create(this, -96);
		var end = GCHourTime.Create(this, -48);

		return GCStrings.Format("{0}-{1}", start.ToShortTimeString(), end.ToShortTimeString());
	}

	ShortMuhurtaString(nMuhurta)
	{
		var start = new GCHourTime(this, nMuhurta*48);
		var end = new GCHourTime(this, nMuhurta*48 + 48);

		return GCStrings.Format("{0}-{1}", start.ToShortTimeString(), end.ToShortTimeString());
	}

	IsGreaterThan(dt)
	{
		if (this.hour > dt.hour)
			return true;
		else if (this.hour < dt.hour)
			return false;

		if (this.min > dt.min)
			return true;
		else if (this.min < dt.min)
			return false;

		if (this.sec > dt.sec)
			return true;
		else if (this.sec < dt.sec)
			return false;

		if (this.mili > dt.mili)
			return true;

		return false;
	}


	IsLessThan(dt)
	{
		if (this.hour < dt.hour)
			return true;
		else if (this.hour > dt.hour)
			return false;

		if (this.min < dt.min)
			return true;
		else if (this.min > dt.min)
			return false;

		if (this.sec < dt.sec)
			return true;
		else if (this.sec > dt.sec)
			return false;

		if (this.mili < dt.mili)
			return true;

		return false;
	}

	IsGreaterOrEqualThan(dt)
	{
		if (this.hour >= dt.hour)
			return true;
		else if (this.hour < dt.hour)
			return false;

		if (this.min >= dt.min)
			return true;
		else if (this.min < dt.min)
			return false;

		if (this.sec >= dt.sec)
			return true;
		else if (this.sec < dt.sec)
			return false;

		if (this.mili >= dt.mili)
			return true;

		return false;
	}

	IsLessOrEqualThan(dt)
	{
		if (this.hour <= dt.hour)
			return true;
		else if (this.hour > dt.hour)
			return false;

		if (this.min <= dt.min)
			return true;
		else if (this.min > dt.min)
			return false;

		if (this.sec <= dt.sec)
			return true;
		else if (this.sec > dt.sec)
			return false;

		if (this.mili <= dt.mili)
			return true;

		return false;
	}


	AddMinutes(mn)
	{
		this.min += Convert.ToInt32(Math.floor(mn));
		while (this.min < 0) { this.min += 60; this.hour = this.hour - 1; }
		while (this.min > 59) { this.min -= 60; this.hour = this.hour + 1; }
	}

	GetDayTime()
	{
		return TotalDays;
	}

	GetDayTime(DstOffsetHours)
	{
		return ((Convert.ToDouble(this.hour + DstOffsetHours) * 60.0 + Convert.ToDouble(this.min)) * 60.0 + Convert.ToDouble(this.sec)) / 86400.0;
	}


	SetValue(i)
	{
		this.hour = this.min = this.sec = this.mili = i;
	}

	SetDayTime(d)
	{
		var time_hr = d * 24.0;

		this.hour = Convert.ToInt32(Math.floor(time_hr));

		// minute
		time_hr -= this.hour;
		time_hr *= 60;
		this.min = Convert.ToInt32(Math.floor(time_hr));

		// second
		time_hr -= this.min;
		time_hr *= 60;
		this.sec = Convert.ToInt32(Math.floor(time_hr));

		// miliseconds
		time_hr -= this.sec;
		time_hr *= 1000;
		this.mili = Convert.ToInt32(Math.floor(time_hr));

		return this;
	}

	////////////////////////////////////////////////////////////////
	//
	//  Conversion time from DEGREE fromat to H:M:S:MS format
	//
	//  time - output
	//  time_deg - input time in range 0 deg to 360 deg
	//             where 0 deg = 0:00 AM and 360 deg = 12:00 PM
	//
	SetDegTime(time_deg)
	{
		var time_hr = 0.0;

		time_deg = GCMath.putIn360(time_deg);

		// hour
		time_hr = time_deg / 360 * 24;
		this.hour = Convert.ToInt32(Math.floor(time_hr));

		// minute
		time_hr -= this.hour;
		time_hr *= 60;
		this.min = Convert.ToInt32(Math.floor(time_hr));

		// second
		time_hr -= this.min;
		time_hr *= 60;
		this.sec = Convert.ToInt32(Math.floor(time_hr));

		// miliseconds
		time_hr -= this.sec;
		time_hr *= 1000;
		this.mili = Convert.ToInt32(Math.floor(time_hr));
	}

	ToLongTimeString()
	{
		return Convert.FormatD2(this.hour) + ":" +
			Convert.FormatD2(this.min) + ":" +
			Convert.FormatD2(this.sec)
	}

	ToShortTimeString()
	{
		return Convert.FormatD2(this.hour) + ":" +
			Convert.FormatD2(this.min)
	}

	toString() {
		return sprintf("%02d:%02d", this.hour, this.min);
	}

}

/*************************************************    js/eventsShakti.js **********************************************/
var gShaktiEventsVisible = {
	"0": true,
	"1": true,
	"2": true,
	"3": true,
	"4": true,
	"5": true,
	"6": true,
	"7": true,
	"8": false,
	"9": false,
};

var gShaktiEvents = [
	{
		"name": "Navaratri days",
		"bookid": "0",
		"events": [
			{
				"type": "T",
				"name": "Navaratri (1)\nWorshiping Shailaputri",
				"tithi": 15,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (2)\nWorshiping Brahmacarini",
				"tithi": 16,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (3)\nWorshiping Gauri",
				"tithi": 17,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (4)\nWorshiping Kushmanda",
				"tithi": 18,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (5)\nWorshiping Skandamata",
				"tithi": 19,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (6)\nWorshiping Katyayani",
				"tithi": 20,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (7)\nWorshiping Kalaratri",
				"tithi": 21,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (8)\nWorshiping Mahagauri",
				"tithi": 22,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Durgastami",
				"tithi": 22,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (9)\nMaha Navami",
				"tithi": 23,
				"masa": 5,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (1)\nWorshiping Shailaputri",
				"tithi": 15,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (2)\nWorshiping Brahmacarini",
				"tithi": 16,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (3)\nWorshiping Gauri",
				"tithi": 17,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (4)\nWorshiping Kushmanda",
				"tithi": 18,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (5)\nWorshiping Skandamata",
				"tithi": 19,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (6)\nWorshiping Katyayani",
				"tithi": 20,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (7)\nWorshiping Kalaratri",
				"tithi": 21,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (8)\nWorshiping Mahagauri",
				"tithi": 22,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (9)\nRama Navami",
				"tithi": 23,
				"masa": 11,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
	
			{
				"type": "T",
				"name": "Navaratri (1)\nGhatasthapanam\nWorshiping Shailaputri",
				"tithi": 15,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (2)\nWorshiping Brahmacarini",
				"tithi": 16,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (3)\nWorshiping Gauri",
				"tithi": 17,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (4)\nWorshiping Kushmanda",
				"tithi": 18,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (5)\nWorshiping Skandamata",
				"tithi": 19,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (6)\nWorshiping Katyayani",
				"tithi": 20,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (7)\nWorshiping Kalaratri",
				"tithi": 21,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (8)\nDurgastami\nWorshiping Mahagauri",
				"tithi": 22,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (9)\nSiddhidatri Puja",
				"tithi": 23,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri Parana",
				"tithi": 24,
				"masa": 9,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
	
			{
				"type": "T",
				"name": "Navaratri (1)\nGhatasthapanam\nWorshiping Shailaputri",
				"tithi": 15,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (2)\nWorshiping Brahmacarini",
				"tithi": 16,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (3)\nWorshiping Gauri",
				"tithi": 17,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (4)\nWorshiping Kushmanda",
				"tithi": 18,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (5)\nWorshiping Skandamata",
				"tithi": 19,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (6)\nWorshiping Katyayani",
				"tithi": 20,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (7)\nWorshiping Kalaratri",
				"tithi": 21,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (8)\nDurgastami\nWorshiping Mahagauri",
				"tithi": 22,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri (9)\nSiddhidatri Puja",
				"tithi": 23,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
			{
				"type": "T",
				"name": "Navaratri Parana",
				"tithi": 24,
				"masa": 2,
				 "fastSubj": "",
				"fast": 0,
				"start": -10000,
				"dayoff": 0,
			},
	
		]
	},
{
	"name": "Goddess days",
	"bookid": "1",
	"events": [
		{
			"type": "T",
			"name": "Laksmi Jayanti: Appearance of Srimati Laksmi",
			"tithi": 29,
			"masa": 10,
			"fastSubj": "Sri Laksmi",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Radhastami: Appearance of Srimati Radharani",
			"tithi": 22,
			"masa": 4,
			"fastSubj": "Srimati Radharani",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Start of Mahalaksmi vrata",
			"tithi": 22,
			"masa": 4,
			"fastSubj": "Mahalaksmi",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "End of Mahalaksmi vrata",
			"tithi": 7,
			"masa": 5,
			"fastSubj": "Mahalaksmi",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati (Ramapatni) Sita Devi -- Appearance",
			"tithi": 23,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Varalaksmi Vrata",
			"tithi": 27,
			"masa": 3,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Rukmini Dvadasi",
			"tithi": 26,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Ganga Puja",
			"tithi": 24,
			"masa": 1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Divali (day 1), Dhantrayodasi",
			"tithi": 14,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -2,
		},
		{
			"type": "T",
			"name": "Divali (day 2), Naraka Caturdasi",
			"tithi": 14,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Divali (day 3), Laksmi Puja",
			"tithi": 14,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Divali (day 4), Govardhana Puja",
			"tithi": 14,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 1,
		},
		{
			"type": "T",
			"name": "Divali (day 5), Bhajya Dooj",
			"tithi": 14,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 2,
		},
		{
			"type": "T",
			"name": "Sri Pancami",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Laksmi Pancami",
			"tithi": 19,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Annapurna Jayanti",
			"tithi": 29,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Gayatri Jayanti",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Gayatri Jayanti",
			"tithi": 25,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sarasvati Avahan",
			"tithi": 20,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sarasvati Puja",
			"tithi": 20,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 1,
		},
		{
			"type": "T",
			"name": "Sarasvati Balidan",
			"tithi": 20,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 2,
		},
		{
			"type": "T",
			"name": "Sarasvati Visarjan",
			"tithi": 20,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 3,
		},
		{
			"type": "T",
			"name": "Sarasvati Puja Vidyarambham",
			"tithi": 20,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 4,
		},
		{
			"type": "T",
			"name": "Lalita (Tripurasundari) Pancami",
			"tithi": 20,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Vishnu tattva days",
	"bookid": "2",
	"events": [
		{
			"type": "T",
			"name": "Nrsimha Caturdasi: Appearance of Lord Nrsimhadeva",
			"tithi": 28,
			"masa": 0,
			"fastSubj": "Lord Nrsimhadeva",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vamana Dvadasi: Appearance of Lord Vamanadeva",
			"tithi": 26,
			"masa": 4,
			"fastSubj": "Vamanadeva",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Varaha Dvadasi: Appearance of Lord Varahadeva",
			"tithi": 26,
			"masa": 9,
			"fastSubj": "Varahadeva",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Sri Krsna Janmastami: Appearance of Lord Sri Krsna",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var a0 = 0;
				var a1 = 0;
				var a2 = 0;
				var d0 = days[idx-1];
				var d1 = days[idx];
				var d2 = days[idx+1];
				if (d0.ksayaTithi == 7) return 1;
				if (d0.astro.tithi == 7) a0 = 16;
				if (d1.astro.tithi == 7) a1 = 16;
				if (d2.astro.tithi == 7) a2 = 16;
				if (a1 == 0) return 0;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if (d0.astro.naksatra == 3) a0 += 8;
				if (d1.astro.naksatra == 3) a1 += 8;
				if (d2.astro.naksatra == 3) a2 += 8;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if ((a0 > a1) || (a2 > a1)) return 0;
				if (d0.midnightNaksatra == 3) a0 += 4;
				if (d1.midnightNaksatra == 3) a1 += 4;
				if (d2.midnightNaksatra == 3) a2 += 4;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if ((a0 > a1) || (a2 > a1)) return 0;
				if (d0.date.weekday == 0) a0 += 2;
				if (d1.date.weekday == 0) a1 += 2;
				if (d2.date.weekday == 0) a2 += 2;
				if (d0.date.weekday == 2) a0 += 2;
				if (d1.date.weekday == 2) a1 += 2;
				if (d2.date.weekday == 2) a2 += 2;
				if (d2.astro.tithi == 7) a1 += 1;
				if ((a0 < a1) && (a1 > a2)) return 1;
				return 0;
			},
			"fastSubj": "Sri Krsna",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
			"events": [
				{
					"type": "R" ,
					"name": "Nandotsava",
					"fastSubj": "",
					"fast": 0,
					"start": -10000,
					"dayoff": 1,
				},
				{
					"type": "R" ,
					"name": "Srila Prabhupada -- Appearance",
					"fastSubj": "Srila Prabhupada",
					"fast": 0,
					"start": -10000,
					"dayoff": 1,
				},
			]		},
		{
			"type": "X",
			"name": "Rama Navami: Appearance of Lord Sri Ramacandra",
			"masa1": 11,
			"masa2": 11,
			"script": function(days,idx) {
				var d0 = days[idx-1];
				var d1 = days[idx];
				var d2 = days[idx+1];
				var d3 = days[idx+2];
				//console.log('Rama navami func idx:', idx, days[idx-1].ksayaTithi, d0.astro.tithi)
				if (d0.ksayaTithi == 23) return 1;
				if (d0.astro.tithi == 23) return 0;
				/*console.log('d1 tithi=', d1.astro.tithi, d1.date);
				console.log('d2 tithi=', d2.astro.tithi, d2.date);
				console.log('d3 fasttype=', d3);*/
				if ((d2.astro.tithi == 23) && (d3.fastType > 0)) return 1;
				if ((d1.astro.tithi == 23) && (d2.fastType == 0)) return 1;
				return 0;
			},
			"fastSubj": "Sri Ramacandra",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Parashurama Jayanti",
			"tithi": 17,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Ramacandra Vijayotsava",
			"tithi": 24,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Advent of Srimad Bhagavad-gita",
			"tithi": 25,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Go Puja. Go Krda. Govardhana Puja.",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var a0 = 0;
				var a1 = 0;
				var a2 = 0;
				var d0 = days[idx-1];
				var d1 = days[idx];
				var d2 = days[idx+1];

				if (d1.astro.masa != 6) return 0;
				if (d0.ksayaTithi == 15) return 1;
				if (d0.astro.tithi == 15) { a0 = 16; }
				if (d1.astro.tithi == 15) { a1 = 16; }
				if (d2.astro.tithi == 15) { a2 = 16; }
				if (a1 == 0) return 0;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if (d0.moonRiseSec < d0.sunRiseSec) a0 += 8;
				if (d1.moonRiseSec < d1.sunRiseSec) a1 += 8;
				if (d2.moonRiseSec < d2.sunRiseSec) a2 += 8;
				if ((a0 > a1) || (a2 > a1)) { return 0 }
				return 1;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Dattatreya Jayanti",
			"tithi": 29,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Other Festivals",
	"bookid": "3",
	"events": [
		{
			"type": "T",
			"name": "Siva Ratri",
			"tithi": 13,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Aksaya Trtiya",
			"tithi": 17,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Guru Purnima",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Gayatri japa day",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Durgastami",
			"tithi": 22,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Acaryas",
	"bookid": "4",
	"events": [
		{
			"type": "T",
			"name": "Sri Paramesvari Dasa Thakura -- Disappearance",
			"tithi": 29,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Gangamata Gosvamini -- Appearance",
			"tithi": 24,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Sita Thakurani (Sri Advaita's consort) -- Appearance",
			"tithi": 19,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Visnupriya Devi -- Appearance",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Bengal-specific Holidays",
	"bookid": "5",
	"events": [
		{
			"type": "T",
			"name": "Jahnu Saptami",
			"tithi": 21,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Durga Puja",
			"tithi": 21,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Laksmi Puja (Kojagari Puja)",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Jagaddhatri Puja",
			"tithi": 23,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sarasvati Puja",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "S",
			"name": "Ganga Sagara Mela",
			"sankranti": 9,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "My Personal Events",
	"bookid": "6",
	"events": [
	]
},
{
	"name": "Caturmasya (Pratipat System)",
	"bookid": "7",
	"events": [
		{
			"type": "T",
			"name": "First month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(green leafy vegetable fast for one month)",
			"tithi": 0,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the first Caturmasya month",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Second month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(yogurt fast for one month)",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the second Caturmasya month",
			"tithi": 0,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Third month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(milk fast for one month)",
			"tithi": 0,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the third Caturmasya month",
			"tithi": 0,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Fourth month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(urad dal fast for one month)",
			"tithi": 0,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the fourth Caturmasya month",
			"tithi": 0,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "X",
			"name": "First month of Caturmasya continues",
			"masa1": 3,
			"masa2": 3,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 3) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Second month of Caturmasya continues",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 4) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Third month of Caturmasya continues",
			"masa1": 5,
			"masa2": 5,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 5) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Fourth month of Caturmasya continues",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 6) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Caturmasya (Purnima System)",
	"bookid": "8",
	"events": [
		{
			"type": "T",
			"name": "First month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(green leafy vegetable fast for one month)",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the first Caturmasya month",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Second month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(yogurt fast for one month)",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the second Caturmasya month",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Third month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(milk fast for one month)",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the third Caturmasya month",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Fourth month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(urad dal fast for one month)",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the fourth Caturmasya month",
			"tithi": 29,
			"masa": 6,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "X",
			"name": "First month of Caturmasya continues",
			"masa1": 3,
			"masa2": 3,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 3) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Second month of Caturmasya continues",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 4) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Third month of Caturmasya continues",
			"masa1": 5,
			"masa2": 5,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 5) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Fourth month of Caturmasya continues",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 6) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Caturmasya (Ekadasi System)",
	"bookid": "9",
	"events": [
		{
			"type": "E",
			"name": "First month of Caturmasya begins (Ekadasi System)",
			"masa": 2,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(green leafy vegetable fast for one month)",
			"masa": 2,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the first Caturmasya month",
			"masa": 3,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "E",
			"name": "Second month of Caturmasya begins (Ekadasi System)",
			"masa": 3,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(yogurt fast for one month)",
			"masa": 3,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the second Caturmasya month",
			"masa": 4,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "E",
			"name": "Third month of Caturmasya begins (Ekadasi System)",
			"masa": 4,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(milk fast for one month)",
			"masa": 4,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the third Caturmasya month",
			"masa": 5,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "E",
			"name": "Fourth month of Caturmasya begins (Ekadasi System)",
			"masa": 5,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(urad dal fast for one month)",
			"masa": 5,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the fourth Caturmasya month",
			"masa": 6,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "X",
			"name": "First month of Caturmasya continues",
			"masa1": 3,
			"masa2": 3,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 3) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Second month of Caturmasya continues",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 4) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Third month of Caturmasya continues",
			"masa1": 5,
			"masa2": 5,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 5) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Fourth month of Caturmasya continues",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 6) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]},
];

/*************************************************    js/events.js **********************************************/
var gEventsVisible = {
	"0": true,
	"1": true,
	"2": true,
	"3": true,
	"4": true,
	"5": true,
	"6": true,
	"7": true,
	"8": false,
	"9": false,
};

var gEvents = [
	{
	"name": "Appearance Days of the Lord and His Incarnations",
	"bookid": "0",
	"events": [
		{
			"type": "T",
			"name": "Nrsimha Caturdasi: Appearance of Lord Nrsimhadeva",
			"tithi": 28,
			"masa": 0,
			"fastSubj": "Lord Nrsimhadeva",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Lord Balarama -- Appearance",
			"tithi": 29,
			"masa": 3,
			"fastSubj": "Lord Balarama",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Radhastami: Appearance of Srimati Radharani",
			"tithi": 22,
			"masa": 4,
			"fastSubj": "Srimati Radharani",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vamana Dvadasi: Appearance of Lord Vamanadeva",
			"tithi": 26,
			"masa": 4,
			"fastSubj": "Vamanadeva",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Advaita Acarya -- Appearance",
			"tithi": 21,
			"masa": 9,
			"fastSubj": "Advaita Acarya",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Varaha Dvadasi: Appearance of Lord Varahadeva",
			"tithi": 26,
			"masa": 9,
			"fastSubj": "Varahadeva",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Nityananda Trayodasi: Appearance of Sri Nityananda Prabhu",
			"tithi": 27,
			"masa": 9,
			"fastSubj": "Sri Nityananda",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Sri Krsna Janmastami: Appearance of Lord Sri Krsna",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var a0 = 0;
				var a1 = 0;
				var a2 = 0;
				var d0 = days[idx-1];
				var d1 = days[idx];
				var d2 = days[idx+1];
				if (d0.ksayaTithi == 7) return 1;
				if (d0.astro.tithi == 7) a0 = 16;
				if (d1.astro.tithi == 7) a1 = 16;
				if (d2.astro.tithi == 7) a2 = 16;
				if (a1 == 0) return 0;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if (d0.astro.naksatra == 3) a0 += 8;
				if (d1.astro.naksatra == 3) a1 += 8;
				if (d2.astro.naksatra == 3) a2 += 8;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if ((a0 > a1) || (a2 > a1)) return 0;
				if (d0.midnightNaksatra == 3) a0 += 4;
				if (d1.midnightNaksatra == 3) a1 += 4;
				if (d2.midnightNaksatra == 3) a2 += 4;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if ((a0 > a1) || (a2 > a1)) return 0;
				if (d0.date.weekday == 0) a0 += 2;
				if (d1.date.weekday == 0) a1 += 2;
				if (d2.date.weekday == 0) a2 += 2;
				if (d0.date.weekday == 2) a0 += 2;
				if (d1.date.weekday == 2) a1 += 2;
				if (d2.date.weekday == 2) a2 += 2;
				if (d2.astro.tithi == 7) a1 += 1;
				if ((a0 < a1) && (a1 > a2)) return 1;
				return 0;
			},
			"fastSubj": "Sri Krsna",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
			"events": [
				{
					"type": "R" ,
					"name": "Nandotsava",
					"fastSubj": "",
					"fast": 0,
					"start": -10000,
					"dayoff": 1,
				},
				{
					"type": "R" ,
					"name": "Srila Prabhupada -- Appearance",
					"fastSubj": "Srila Prabhupada",
					"fast": 0,
					"start": -10000,
					"dayoff": 1,
				},
			]		},
		{
			"type": "T",
			"name": "Gaura Purnima: Appearance of Sri Caitanya Mahaprabhu",
			"tithi": 29,
			"masa": 10,
			"fastSubj": "Sri Krsna Caitanya Mahaprabhu",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Rama Navami: Appearance of Lord Sri Ramacandra",
			"masa1": 11,
			"masa2": 11,
			"script": function(days,idx) {
				var d0 = days[idx-1];
				var d1 = days[idx];
				var d2 = days[idx+1];
				var d3 = days[idx+2];
				//console.log('Rama navami func idx:', idx, days[idx-1].ksayaTithi, d0.astro.tithi)
				if (d0.ksayaTithi == 23) return 1;
				if (d0.astro.tithi == 23) return 0;
				/*console.log('d1 tithi=', d1.astro.tithi, d1.date);
				console.log('d2 tithi=', d2.astro.tithi, d2.date);
				console.log('d3 fasttype=', d3);*/
				if ((d2.astro.tithi == 23) && (d3.fastType > 0)) return 1;
				if ((d1.astro.tithi == 23) && (d2.fastType == 0)) return 1;
				return 0;
			},
			"fastSubj": "Sri Ramacandra",
			"fast": 7,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Events in the Pastimes of the Lord and His Associates",
	"bookid": "1",
	"events": [
		{
			"type": "T",
			"name": "Aksaya Trtiya. Candana Yatra starts. (Continues for 21 days)",
			"tithi": 17,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Sita Devi (consort of Lord Sri Rama) -- Appearance",
			"tithi": 23,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Rukmini Dvadasi",
			"tithi": 26,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Krsna Phula Dola, Salila Vihara",
			"tithi": 29,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Sri Radha-Ramana Devaji -- Appearance",
			"tithi": 29,
			"masa": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Ganga Puja",
			"tithi": 24,
			"masa": 1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Panihati Cida Dahi Utsava",
			"tithi": 27,
			"masa": 1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Snana Yatra",
			"tithi": 29,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Guru (Vyasa) Purnima",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Radha Govinda Jhulana Yatra begins",
			"tithi": 25,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Jhulana Yatra ends",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Ananta Caturdasi Vrata",
			"tithi": 28,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Visvarupa Mahotsava",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Ramacandra Vijayotsava",
			"tithi": 24,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Krsna Saradiya Rasayatra",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Appearance of Radha Kunda, snana dana",
			"tithi": 7,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Bahulastami",
			"tithi": 7,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Dipa dana, Dipavali, (Kali Puja)",
			"tithi": 14,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Bali Daityaraja Puja",
			"tithi": 15,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Gopastami, Gosthastami",
			"tithi": 22,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Krsna Rasayatra",
			"tithi": 29,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Tulasi-Saligrama Vivaha (marriage)",
			"tithi": 29,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Katyayani vrata begins",
			"tithi": 0,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Odana sasthi",
			"tithi": 20,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Advent of Srimad Bhagavad-gita",
			"tithi": 25,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Katyayani vrata ends",
			"tithi": 29,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Krsna Pusya Abhiseka",
			"tithi": 29,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Vasanta Pancami",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Bhismastami",
			"tithi": 22,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Krsna Madhura Utsava",
			"tithi": 29,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Siva Ratri",
			"tithi": 13,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Damanakaropana Dvadasi",
			"tithi": 26,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Balarama Rasayatra",
			"tithi": 29,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Krsna Vasanta Rasa",
			"tithi": 29,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Go Puja. Go Krda. Govardhana Puja.",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var a0 = 0;
				var a1 = 0;
				var a2 = 0;
				var d0 = days[idx-1];
				var d1 = days[idx];
				var d2 = days[idx+1];

				if (d1.astro.masa != 6) return 0;
				if (d0.ksayaTithi == 15) return 1;
				if (d0.astro.tithi == 15) { a0 = 16; }
				if (d1.astro.tithi == 15) { a1 = 16; }
				if (d2.astro.tithi == 15) { a2 = 16; }
				if (a1 == 0) return 0;
				if ((a0 < a1) && (a1 > a2)) return 1;
				if (d0.moonRiseSec < d0.sunRiseSec) a0 += 8;
				if (d1.moonRiseSec < d1.sunRiseSec) a1 += 8;
				if (d2.moonRiseSec < d2.sunRiseSec) a2 += 8;
				if ((a0 > a1) || (a2 > a1)) { return 0 }
				return 1;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Ratha Yatra",
			"tithi": 16,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Gundica Marjana",
			"tithi": 16,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Return Ratha (8 days after Ratha Yatra)",
			"tithi": 16,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 8,
		},
		{
			"type": "T",
			"name": "Hera Pancami (4 days after Ratha Yatra)",
			"tithi": 16,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 4,
		},
		{
			"type": "T",
			"name": "Festival of Jagannatha Misra",
			"tithi": 29,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 1,
		},
		{
			"type": "E",
			"name": "First day of Bhisma Pancaka",
			"masa": 6,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of Bhisma Pancaka",
			"tithi": 29,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Appearance and Disappearance Days of Recent Acaryas",
	"bookid": "2",
	"events": [
		{
			"type": "T",
			"name": "Srila Bhaktivinoda Thakura -- Disappearance",
			"tithi": 14,
			"masa": 2,
 			"fastSubj": "Bhaktivinoda Thakura",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vamsidasa Babaji -- Disappearance",
			"tithi": 18,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Bhaktivinoda Thakura -- Appearance",
			"tithi": 27,
			"masa": 4,
 			"fastSubj": "Bhaktivinoda Thakura",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Madhvacarya -- Appearance",
			"tithi": 24,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Prabhupada -- Disappearance",
			"tithi": 18,
			"masa": 6,
 			"fastSubj": "Srila Prabhupada",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Gaura Kisora Dasa Babaji -- Disappearance",
			"tithi": 25,
			"masa": 6,
 			"fastSubj": "Gaura Kisora Dasa Babaji",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Bhaktisiddhanta Sarasvati Thakura -- Disappearance",
			"tithi": 3,
			"masa": 8,
 			"fastSubj": "Bhaktisiddhanta Sarasvati",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Bhaktisiddhanta Sarasvati Thakura -- Appearance",
			"tithi": 4,
			"masa": 10,
 			"fastSubj": "Bhaktisiddhanta Sarasvati",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Jagannatha Dasa Babaji -- Disappearance",
			"tithi": 15,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Appearance and Disappearance Days of Mahaprabhu's Associates and Other Acaryas",
	"bookid": "3",
	"events": [
		{
			"type": "T",
			"name": "Sri Abhirama Thakura -- Disappearance",
			"tithi": 6,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Vrndavana Dasa Thakura -- Disappearance",
			"tithi": 9,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Gadadhara Pandita -- Appearance",
			"tithi": 14,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Madhu Pandita -- Disappearance",
			"tithi": 23,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Jahnava Devi -- Appearance",
			"tithi": 23,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Paramesvari Dasa Thakura -- Disappearance",
			"tithi": 29,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Madhavendra Puri -- Appearance",
			"tithi": 29,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Srinivasa Acarya -- Appearance",
			"tithi": 29,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Ramananda Raya -- Disappearance",
			"tithi": 4,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Vrndavana Dasa Thakura -- Appearance",
			"tithi": 11,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Baladeva Vidyabhusana -- Disappearance",
			"tithi": 24,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Gangamata Gosvamini -- Appearance",
			"tithi": 24,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Mukunda Datta -- Disappearance",
			"tithi": 29,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Sridhara Pandita -- Disappearance",
			"tithi": 29,
			"masa": 1,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Syamananda Prabhu -- Disappearance",
			"tithi": 0,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vakresvara Pandita -- Appearance",
			"tithi": 4,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Srivasa Pandita -- Disappearance",
			"tithi": 9,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Gadadhara Pandita -- Disappearance",
			"tithi": 14,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Svarupa Damodara Gosvami -- Disappearance",
			"tithi": 16,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Sivananda Sena -- Disappearance",
			"tithi": 16,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vakresvara Pandita -- Disappearance",
			"tithi": 20,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Sanatana Gosvami -- Disappearance",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Gopala Bhatta Gosvami -- Disappearance",
			"tithi": 4,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Lokanatha Gosvami -- Disappearance",
			"tithi": 7,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Raghunandana Thakura -- Disappearance",
			"tithi": 18,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Rupa Gosvami -- Disappearance",
			"tithi": 26,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Gauridasa Pandita -- Disappearance",
			"tithi": 26,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Sita Thakurani (Sri Advaita's consort) -- Appearance",
			"tithi": 19,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Jiva Gosvami -- Appearance",
			"tithi": 26,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Haridasa Thakura -- Disappearance",
			"tithi": 28,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Raghunatha Dasa Gosvami -- Disappearance",
			"tithi": 26,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Raghunatha Bhatta Gosvami -- Disappearance",
			"tithi": 26,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Krsnadasa Kaviraja Gosvami -- Disappearance",
			"tithi": 26,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Murari Gupta -- Disappearance",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Narottama Dasa Thakura -- Disappearance",
			"tithi": 4,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Virabhadra -- Appearance",
			"tithi": 8,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Rasikananda -- Appearance",
			"tithi": 15,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vasudeva Ghosh -- Disappearance",
			"tithi": 16,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Gadadhara Dasa Gosvami -- Disappearance",
			"tithi": 22,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Dhananjaya Pandita -- Disappearance",
			"tithi": 22,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Srinivasa Acarya -- Disappearance",
			"tithi": 22,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Bhugarbha Gosvami -- Disappearance",
			"tithi": 28,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Kasisvara Pandita -- Disappearance",
			"tithi": 28,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Nimbarkacarya -- Appearance",
			"tithi": 29,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Narahari Sarakara Thakura -- Disappearance",
			"tithi": 10,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Kaliya Krsnadasa -- Disappearance",
			"tithi": 11,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Saranga Thakura -- Disappearance",
			"tithi": 12,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Devananda Pandita -- Disappearance",
			"tithi": 10,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Mahesa Pandita -- Disappearance",
			"tithi": 12,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Uddharana Datta Thakura -- Disappearance",
			"tithi": 12,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Locana Dasa Thakura -- Appearance",
			"tithi": 15,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Jiva Gosvami -- Disappearance",
			"tithi": 17,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Jagadisa Pandita -- Disappearance",
			"tithi": 17,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Jagadisa Pandita -- Appearance",
			"tithi": 26,
			"masa": 8,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Ramacandra Kaviraja -- Disappearance",
			"tithi": 4,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Gopala Bhatta Gosvami -- Appearance",
			"tithi": 4,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Jayadeva Gosvami -- Disappearance",
			"tithi": 5,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Locana Dasa Thakura -- Disappearance",
			"tithi": 6,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srimati Visnupriya Devi -- Appearance",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Visvanatha Cakravarti Thakura -- Disappearance",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Pundarika Vidyanidhi -- Appearance",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Raghunandana Thakura -- Appearance",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Raghunatha Dasa Gosvami -- Appearance",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Madhvacarya -- Disappearance",
			"tithi": 23,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Ramanujacarya -- Disappearance",
			"tithi": 24,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Narottama Dasa Thakura -- Appearance",
			"tithi": 29,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Purusottama Das Thakura -- Disappearance",
			"tithi": 4,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Isvara Puri -- Disappearance",
			"tithi": 11,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Rasikananda -- Disappearance",
			"tithi": 15,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Purusottama Dasa Thakura -- Appearance",
			"tithi": 18,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Madhavendra Puri -- Disappearance",
			"tithi": 26,
			"masa": 10,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Srivasa Pandita -- Appearance",
			"tithi": 7,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Govinda Ghosh -- Disappearance",
			"tithi": 11,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Ramanujacarya -- Appearance",
			"tithi": 19,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Vamsivadana Thakura -- Appearance",
			"tithi": 29,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sri Syamananda Prabhu -- Appearance",
			"tithi": 29,
			"masa": 11,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "ISKCON's Historical Events",
	"bookid": "4",
	"events": [
		{
			"type": "T",
			"name": "Sri Jayananda Prabhu -- Disappearance",
			"tithi": 27,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "The incorporation of ISKCON in New York",
			"tithi": 8,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Prabhupada's departure for the USA",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Acceptance of sannyasa by Srila Prabhupada",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Srila Prabhupada's arrival in the USA",
			"tithi": 6,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Bengal-specific Holidays",
	"bookid": "5",
	"events": [
		{
			"type": "T",
			"name": "Jahnu Saptami",
			"tithi": 21,
			"masa": 0,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Durga Puja",
			"tithi": 21,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Laksmi Puja",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Jagaddhatri Puja",
			"tithi": 23,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Sarasvati Puja",
			"tithi": 19,
			"masa": 9,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "S",
			"name": "Ganga Sagara Mela",
			"sankranti": 9,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "S",
			"name": "Tulasi Jala Dan begins",
			"sankranti": 0,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "S",
			"name": "Tulasi Jala Dan ends",
			"sankranti": 1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
	]
},
{
	"name": "My Personal Events",
	"bookid": "6",
	"events": [
	]
},
{
	"name": "Caturmasya (Pratipat System)",
	"bookid": "7",
	"events": [
		{
			"type": "T",
			"name": "First month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(green leafy vegetable fast for one month)",
			"tithi": 0,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the first Caturmasya month",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Second month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(yogurt fast for one month)",
			"tithi": 0,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the second Caturmasya month",
			"tithi": 0,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Third month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(milk fast for one month)",
			"tithi": 0,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the third Caturmasya month",
			"tithi": 0,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Fourth month of Caturmasya begins (Pratipat System)",
			"tithi": 0,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(urad dal fast for one month)",
			"tithi": 0,
			"masa": 6,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the fourth Caturmasya month",
			"tithi": 0,
			"masa": 7,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "X",
			"name": "First month of Caturmasya continues",
			"masa1": 3,
			"masa2": 3,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 3) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Second month of Caturmasya continues",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 4) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Third month of Caturmasya continues",
			"masa1": 5,
			"masa2": 5,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 5) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Fourth month of Caturmasya continues",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 6) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Caturmasya (Purnima System)",
	"bookid": "8",
	"events": [
		{
			"type": "T",
			"name": "First month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(green leafy vegetable fast for one month)",
			"tithi": 29,
			"masa": 2,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the first Caturmasya month",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Second month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(yogurt fast for one month)",
			"tithi": 29,
			"masa": 3,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the second Caturmasya month",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Third month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(milk fast for one month)",
			"tithi": 29,
			"masa": 4,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the third Caturmasya month",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "T",
			"name": "Fourth month of Caturmasya begins (Purnima System)",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "(urad dal fast for one month)",
			"tithi": 29,
			"masa": 5,
 			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "T",
			"name": "Last day of the fourth Caturmasya month",
			"tithi": 29,
			"masa": 6,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "X",
			"name": "First month of Caturmasya continues",
			"masa1": 3,
			"masa2": 3,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 3) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Second month of Caturmasya continues",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 4) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Third month of Caturmasya continues",
			"masa1": 5,
			"masa2": 5,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 5) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Fourth month of Caturmasya continues",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 6) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]
},
{
	"name": "Caturmasya (Ekadasi System)",
	"bookid": "9",
	"events": [
		{
			"type": "E",
			"name": "First month of Caturmasya begins (Ekadasi System)",
			"masa": 2,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(green leafy vegetable fast for one month)",
			"masa": 2,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the first Caturmasya month",
			"masa": 3,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "E",
			"name": "Second month of Caturmasya begins (Ekadasi System)",
			"masa": 3,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(yogurt fast for one month)",
			"masa": 3,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the second Caturmasya month",
			"masa": 4,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "E",
			"name": "Third month of Caturmasya begins (Ekadasi System)",
			"masa": 4,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(milk fast for one month)",
			"masa": 4,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the third Caturmasya month",
			"masa": 5,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "E",
			"name": "Fourth month of Caturmasya begins (Ekadasi System)",
			"masa": 5,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "(urad dal fast for one month)",
			"masa": 5,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "E",
			"name": "Last day of the fourth Caturmasya month",
			"masa": 6,
			"paksa":  1,
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": -1,
		},
		{
			"type": "X",
			"name": "First month of Caturmasya continues",
			"masa1": 3,
			"masa2": 3,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 3) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Second month of Caturmasya continues",
			"masa1": 4,
			"masa2": 4,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 4) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Third month of Caturmasya continues",
			"masa1": 5,
			"masa2": 5,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 5) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
		{
			"type": "X",
			"name": "Fourth month of Caturmasya continues",
			"masa1": 6,
			"masa2": 6,
			"script": function(days,idx) {
				var d0 = days[idx - 1];
				var d1 = days[idx];
				if (d0.astro.masa == 12 && d1.astro.masa == 6) {
					return 1;
				}
				return 0;
			},
			"fastSubj": "",
			"fast": 0,
			"start": -10000,
			"dayoff": 0,
		},
	]},
];

/*************************************************    js/GCFestivalBase.js **********************************************/

var globalEventId = 1;

class GCFestivalBase
{
  static StringToSafe(s)
  {
      if (s == null)
          return string.Empty;
      return s.Replace("&", "&amp;").Replace("|", "&sep;");
  }

  static SafeToString(s)
  {
      return s.Replace("&amp;", "&").Replace("&sep;", "|");
  }

  static StringToInt(s,defaultValue)
  {
    if (s == null || s.length == 0) {
      return defaultValue
    }
    return parseInt(s);
  }

    /// returns true, if on exec.day(0) should be observed this event
    /// </summary>
    /// <param name="exec"></param>
    /// <returns></returns>
    static IsFestivalDay(days,idx,fb)
    {
        return false;
    }
}

class GCFestivalTithiMasa {

  // test if today is tithi of given masa, or day after tithi of given masa
  // while in second cas yesterday is tithi before given tithi and masa
  static TestFestival(days, index, fb, stickToMasa)
  {
      var yesterday = days[index - fb.dayoff - 1];
      var today = days[index - fb.dayoff];
      var tomorrow = days[index - fb.dayoff + 1];

      if (today.astrodata.Masa == fb.masa && today.astrodata.sunRise.Tithi == fb.tithi)
      {
          if (yesterday.astrodata.Masa == fb.masa && yesterday.astrodata.sunRise.Tithi == fb.tithi)
              return false;
          else
              return true;
      }

      if (stickToMasa || GCMasa.IS_EXTRA(today.astrodata.Masa))
      {
          if (today.ksayaMasa == fb.masa && today.ksayaTithi == fb.tithi)
          {
              return true;
          }
      }
      else if (yesterday != undefined)
      {
          if (yesterday.ksayaMasa == fb.masa && yesterday.ksayaTithi == fb.tithi)
          {
              return true;
          }
      }

      return false;
  }

  static IsFestivalDay(days, index, fb)
  {
      return GCFestivalTithiMasa.TestFestival(days, index, fb, false);
  }
}

class GCFestivalMasaDay {
  static IsFestivalDay(days,idx,fb)
  {
      return GCFestivalTithiMasa.TestFestival(days,idx,fb,true);
  }
}


class GCFestivalEkadasi {
  static IsFestivalDay(days,idx,fb)
  {
      var testDay = days[idx-fb.dayoff];

      return (testDay.astrodata.Masa == fb.masa
          && testDay.astrodata.sunRise.Paksa == fb.paksa
          && (GCTithi.TITHI_EKADASI(testDay.astrodata.sunRise.Tithi)
          || GCTithi.TITHI_DVADASI(testDay.astrodata.sunRise.Tithi))
          && testDay.nFastID == FastType.FAST_EKADASI);
  }
}


class GCFestivalSankranti {
  static IsFestivalDay(days,idx,fb)
  {
      return (days[idx-fb.dayoff].sankranti_zodiac == fb.sankranti);
  }
}

class GCFestivalSpecial {

  static IsFestivalDay(days,idx,fb)
  {
      var t = days[idx-fb.dayoff];

      if (fb.masa1 <= fb.masa2)
      {
          if (t.astrodata.Masa < fb.masa1 || t.astrodata.Masa > fb.masa2)
              return false;
      }
      else
      {
          if (t.astrodata.Masa < fb.masa1 && t.astrodata.Masa > fb.masa2)
              return false;
      }

      return fb.script(days, idx);
  }
}

/*************************************************    js/GCFestivalSpecialExecutor.js **********************************************/
class GCFestivalSpecialExecutor {
    constructor() {
        this.calendar = null;
    }
}
/*************************************************    js/eclipses.js **********************************************/
let moon_eclipses = {
    "2021": {
        "5": {
            "26": {
                "dayhour": 0.4721412037037037,
                "type": "Total",
                "part-time": 187,
                "total-time": 15,
                "visibility": "e Asia, Australia, Pacific, Americas"
            }
        },
        "11": {
            "19": {
                "dayhour": 0.3778472222222222,
                "type": "Partial",
                "part-time": 208,
                "total-time": null,
                "visibility": "Americas, n Europe, e Asia, Australia, Pacific"
            }
        }
    },
    "2022": {
        "5": {
            "16": {
                "dayhour": 0.17548611111111112,
                "type": "Total",
                "part-time": 207,
                "total-time": 85,
                "visibility": "Americas, Europe, Africa"
            }
        },
        "11": {
            "8": {
                "dayhour": 0.45858796296296295,
                "type": "Total",
                "part-time": 220,
                "total-time": 85,
                "visibility": "Asia, Australia, Pacific, Americas"
            }
        }
    },
    "2023": {
        "5": {
            "5": {
                "dayhour": 0.7250578703703704,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Africa, Asia, Australia"
            }
        },
        "10": {
            "28": {
                "dayhour": 0.8439583333333334,
                "type": "Partial",
                "part-time": 77,
                "total-time": null,
                "visibility": "e Americas, Europe, Africa, Asia, Australia"
            }
        }
    },
    "2024": {
        "3": {
            "25": {
                "dayhour": 0.30137731481481483,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas"
            }
        },
        "9": {
            "18": {
                "dayhour": 0.11487268518518519,
                "type": "Partial",
                "part-time": 63,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        }
    },
    "2025": {
        "3": {
            "14": {
                "dayhour": 0.29162037037037036,
                "type": "Total",
                "part-time": 218,
                "total-time": 65,
                "visibility": "Pacific, Americas, w Europe, w Africa"
            }
        },
        "9": {
            "7": {
                "dayhour": 0.7590046296296297,
                "type": "Total",
                "part-time": 209,
                "total-time": 82,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        }
    },
    "2026": {
        "3": {
            "3": {
                "dayhour": 0.4825462962962963,
                "type": "Total",
                "part-time": 207,
                "total-time": 58,
                "visibility": "e Asia, Australia, Pacific, Americas"
            }
        },
        "8": {
            "28": {
                "dayhour": 0.1764351851851852,
                "type": "Partial",
                "part-time": 198,
                "total-time": null,
                "visibility": "e Pacific, Americas, Europe, Africa"
            }
        }
    },
    "2027": {
        "2": {
            "20": {
                "dayhour": 0.968125,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas, Europe, Africa, Asia"
            }
        },
        "7": {
            "18": {
                "dayhour": 0.6695486111111111,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "e Africa, Asia, Australia, Pacific"
            }
        },
        "8": {
            "17": {
                "dayhour": 0.3020717592592593,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Pacific, Americas"
            }
        }
    },
    "2028": {
        "1": {
            "12": {
                "dayhour": 0.17653935185185185,
                "type": "Partial",
                "part-time": 56,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        },
        "7": {
            "6": {
                "dayhour": 0.7645486111111112,
                "type": "Partial",
                "part-time": 141,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        },
        "12": {
            "31": {
                "dayhour": 0.7036458333333333,
                "type": "Total",
                "part-time": 209,
                "total-time": 71,
                "visibility": "Europe, Africa, Asia, Australia, Pacific"
            }
        }
    },
    "2029": {
        "6": {
            "26": {
                "dayhour": 0.14122685185185185,
                "type": "Total",
                "part-time": 220,
                "total-time": 102,
                "visibility": "Americas, Europe, Africa, Mid East"
            }
        },
        "12": {
            "20": {
                "dayhour": 0.9466666666666667,
                "type": "Total",
                "part-time": 213,
                "total-time": 54,
                "visibility": "Americas, Europe, Africa, Asia"
            }
        }
    },
    "2030": {
        "6": {
            "15": {
                "dayhour": 0.7740046296296297,
                "type": "Partial",
                "part-time": 144,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        },
        "12": {
            "9": {
                "dayhour": 0.9367013888888889,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas, Europe, Africa, Asia"
            }
        }
    },
    "2031": {
        "5": {
            "7": {
                "dayhour": 0.16113425925925925,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        },
        "6": {
            "5": {
                "dayhour": 0.4897800925925926,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "East Indies, Australia, Pacific"
            }
        },
        "10": {
            "30": {
                "dayhour": 0.32413194444444443,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas"
            }
        }
    },
    "2032": {
        "4": {
            "25": {
                "dayhour": 0.6353125,
                "type": "Total",
                "part-time": 211,
                "total-time": 66,
                "visibility": "e Africa, Asia, Australia, Pacific"
            }
        },
        "10": {
            "18": {
                "dayhour": 0.794212962962963,
                "type": "Total",
                "part-time": 196,
                "total-time": 47,
                "visibility": "Africa, Europe, Asia, Australia"
            }
        }
    },
    "2033": {
        "4": {
            "14": {
                "dayhour": 0.8012847222222222,
                "type": "Total",
                "part-time": 215,
                "total-time": 49,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        },
        "10": {
            "8": {
                "dayhour": 0.4558217592592593,
                "type": "Total",
                "part-time": 202,
                "total-time": 79,
                "visibility": "Asia, Australia, Pacific, Americas"
            }
        }
    },
    "2034": {
        "4": {
            "3": {
                "dayhour": 0.7965162037037037,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        },
        "9": {
            "28": {
                "dayhour": 0.11640046296296297,
                "type": "Partial",
                "part-time": 27,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        }
    },
    "2035": {
        "2": {
            "22": {
                "dayhour": 0.37930555555555556,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "e Asia, Pacific, Americas"
            }
        },
        "8": {
            "19": {
                "dayhour": 0.05017361111111111,
                "type": "Partial",
                "part-time": 77,
                "total-time": null,
                "visibility": "Americas, Europe, Africa, Mid East"
            }
        }
    },
    "2036": {
        "2": {
            "11": {
                "dayhour": 0.9257638888888889,
                "type": "Total",
                "part-time": 202,
                "total-time": 74,
                "visibility": "Americas, Europe, Africa,, Asia, w Australia"
            }
        },
        "8": {
            "7": {
                "dayhour": 0.11981481481481482,
                "type": "Total",
                "part-time": 231,
                "total-time": 95,
                "visibility": "Americas, Europe, Africa, w Asia"
            }
        }
    },
    "2037": {
        "1": {
            "31": {
                "dayhour": 0.5844675925925926,
                "type": "Total",
                "part-time": 197,
                "total-time": 64,
                "visibility": "e Europe, e Africa, Asia, Australia, Pacific, N.A."
            }
        },
        "7": {
            "27": {
                "dayhour": 0.17353009259259258,
                "type": "Partial",
                "part-time": 192,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        }
    },
    "2038": {
        "1": {
            "21": {
                "dayhour": 0.15962962962962962,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        },
        "6": {
            "17": {
                "dayhour": 0.11460648148148148,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "e N. America, C. & S. America, Africa, w Europe"
            }
        },
        "7": {
            "16": {
                "dayhour": 0.483287037037037,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Australia, e Asia, Pacific, w Americas"
            }
        },
        "12": {
            "11": {
                "dayhour": 0.7395833333333334,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        }
    },
    "2039": {
        "6": {
            "6": {
                "dayhour": 0.7877893518518518,
                "type": "Partial",
                "part-time": 179,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        },
        "11": {
            "30": {
                "dayhour": 0.7058796296296296,
                "type": "Partial",
                "part-time": 206,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia, Pacific"
            }
        }
    },
    "2040": {
        "5": {
            "26": {
                "dayhour": 0.4905324074074074,
                "type": "Total",
                "part-time": 211,
                "total-time": 92,
                "visibility": "e Asia, Australia, Pacific, w Americas"
            }
        },
        "11": {
            "18": {
                "dayhour": 0.7949189814814814,
                "type": "Total",
                "part-time": 220,
                "total-time": 88,
                "visibility": "e Americas, Europe, Africa, Asia, Australia"
            }
        }
    },
    "2041": {
        "5": {
            "16": {
                "dayhour": 0.029895833333333333,
                "type": "Partial",
                "part-time": 58,
                "total-time": null,
                "visibility": "e Americas, Europe, Africa, w Asia"
            }
        },
        "11": {
            "8": {
                "dayhour": 0.1910300925925926,
                "type": "Partial",
                "part-time": 90,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        }
    },
    "2042": {
        "4": {
            "5": {
                "dayhour": 0.6042939814814815,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Asia, Australia, Pacific"
            }
        },
        "9": {
            "29": {
                "dayhour": 0.4484606481481481,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Asia, Australia, Pacific, Americas"
            }
        }
    },
    "2043": {
        "3": {
            "25": {
                "dayhour": 0.6056018518518519,
                "type": "Total",
                "part-time": 215,
                "total-time": 53,
                "visibility": "e Africa, e Europe, Asia, Australia, Pacific, w N.A."
            }
        },
        "9": {
            "19": {
                "dayhour": 0.07766203703703704,
                "type": "Total",
                "part-time": 206,
                "total-time": 72,
                "visibility": "Americas, Europe, Africa, w Asia"
            }
        }
    },
    "2044": {
        "3": {
            "13": {
                "dayhour": 0.8184375,
                "type": "Total",
                "part-time": 209,
                "total-time": 66,
                "visibility": "e S America, Europe, Africa, Asia, Australia"
            }
        },
        "9": {
            "7": {
                "dayhour": 0.4727314814814815,
                "type": "Total",
                "part-time": 206,
                "total-time": 34,
                "visibility": "e Asia, Australia, Pacific, Americas"
            }
        }
    },
    "2045": {
        "3": {
            "3": {
                "dayhour": 0.3218287037037037,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas"
            }
        },
        "8": {
            "27": {
                "dayhour": 0.5797453703703703,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Asia, Australia, w N America"
            }
        }
    },
    "2046": {
        "1": {
            "22": {
                "dayhour": 0.5434837962962963,
                "type": "Partial",
                "part-time": 50,
                "total-time": null,
                "visibility": "Asia, Australia, N America"
            }
        },
        "7": {
            "18": {
                "dayhour": 0.045891203703703705,
                "type": "Partial",
                "part-time": 115,
                "total-time": null,
                "visibility": "Americas, Europe, Africa, w Asia"
            }
        }
    },
    "2047": {
        "1": {
            "12": {
                "dayhour": 0.05988425925925926,
                "type": "Total",
                "part-time": 209,
                "total-time": 70,
                "visibility": "Americas, Europe, Africa, Asia"
            }
        },
        "7": {
            "7": {
                "dayhour": 0.44149305555555557,
                "type": "Total",
                "part-time": 219,
                "total-time": 101,
                "visibility": "e Asia, Australia, Pacific, Americas"
            }
        }
    },
    "2048": {
        "1": {
            "1": {
                "dayhour": 0.2874421296296296,
                "type": "Total",
                "part-time": 214,
                "total-time": 56,
                "visibility": "ne Asia, Pacific, Americas, w Europe, w Africa"
            }
        },
        "6": {
            "26": {
                "dayhour": 0.0850462962962963,
                "type": "Partial",
                "part-time": 159,
                "total-time": null,
                "visibility": "Americas, Europe, Africa"
            }
        },
        "12": {
            "20": {
                "dayhour": 0.2693055555555556,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Americas, Europe, w Africa"
            }
        }
    },
    "2049": {
        "5": {
            "17": {
                "dayhour": 0.47684027777777777,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "e Asia, Australia, Pacific, w Americas"
            }
        },
        "6": {
            "15": {
                "dayhour": 0.8015277777777777,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia"
            }
        },
        "11": {
            "9": {
                "dayhour": 0.661238425925926,
                "type": "Penumbral",
                "part-time": null,
                "total-time": null,
                "visibility": "Europe, Africa, Asia, Australia, Pacific, nw N.A."
            }
        }
    },
    "2050": {
        "5": {
            "6": {
                "dayhour": 0.9389120370370371,
                "type": "Total",
                "part-time": 206,
                "total-time": 43,
                "visibility": "e Americas, Europe, Africa, Asia, w Australia"
            }
        },
        "10": {
            "30": {
                "dayhour": 0.1401273148148148,
                "type": "Total",
                "part-time": 193,
                "total-time": 34,
                "visibility": "Americas, Europe, Africa, w Asia"
            }
        }
    }
}

let sun_eclipses = {
    "2021": {
        "6": {
            "10": {
                "dayhour": 0.4465972222222222,
                "type": "Annular",
                "top-time": 231,
                "visibility": "n N. America, Europe, Asia"
            }
        },
        "12": {
            "4": {
                "dayhour": 0.3157175925925926,
                "type": "Total",
                "top-time": 114,
                "visibility": "Antarctica, S. Africa, s Atlantic"
            }
        }
    },
    "2022": {
        "4": {
            "30": {
                "dayhour": 0.8629166666666667,
                "type": "Partial",
                "top-time": null,
                "visibility": "se Pacific, s S. America"
            }
        },
        "10": {
            "25": {
                "dayhour": 0.45924768518518516,
                "type": "Partial",
                "top-time": null,
                "visibility": "Europe, ne Africa, Mid East, w Asia"
            }
        }
    },
    "2023": {
        "4": {
            "20": {
                "dayhour": 0.1791087962962963,
                "type": "Hybrid",
                "top-time": 76,
                "visibility": "se Asia, E. Indies, Australia, Philippines. N.Z."
            }
        },
        "10": {
            "14": {
                "dayhour": 0.750462962962963,
                "type": "Annular",
                "top-time": 317,
                "visibility": "N. America, C. America, S. America"
            }
        }
    },
    "2024": {
        "4": {
            "8": {
                "dayhour": 0.7628356481481482,
                "type": "Total",
                "top-time": 268,
                "visibility": "N. America, C. America"
            }
        },
        "10": {
            "2": {
                "dayhour": 0.7820949074074074,
                "type": "Annular",
                "top-time": 445,
                "visibility": "Pacific, s S. America"
            }
        }
    },
    "2025": {
        "3": {
            "29": {
                "dayhour": 0.4504166666666667,
                "type": "Partial",
                "top-time": null,
                "visibility": "nw Africa, Europe, n Russia"
            }
        },
        "9": {
            "21": {
                "dayhour": 0.8215740740740741,
                "type": "Partial",
                "top-time": null,
                "visibility": "s Pacific, N.Z., Antarctica"
            }
        }
    },
    "2026": {
        "2": {
            "17": {
                "dayhour": 0.5090856481481482,
                "type": "Annular",
                "top-time": 140,
                "visibility": "s Argentina & Chile, s Africa, Antarctica"
            }
        },
        "8": {
            "12": {
                "dayhour": 0.7410300925925926,
                "type": "Total",
                "top-time": 138,
                "visibility": "n N. America, w Africa, Europe"
            }
        }
    },
    "2027": {
        "2": {
            "6": {
                "dayhour": 0.6672106481481481,
                "type": "Annular",
                "top-time": 471,
                "visibility": "S. America, Antarctica, w & s Africa"
            }
        },
        "8": {
            "2": {
                "dayhour": 0.4220949074074074,
                "type": "Total",
                "top-time": 383,
                "visibility": "Africa, Europe, Mid East, w & s Asia"
            }
        }
    },
    "2028": {
        "1": {
            "26": {
                "dayhour": 0.6312268518518519,
                "type": "Annular",
                "top-time": 627,
                "visibility": "e N. America, C. & S. America, w Europe, nw Africa"
            }
        },
        "7": {
            "22": {
                "dayhour": 0.12267361111111111,
                "type": "Total",
                "top-time": 310,
                "visibility": "SE Asia, E. Indies, Australia, N.Z."
            }
        }
    },
    "2029": {
        "1": {
            "14": {
                "dayhour": 0.7179050925925926,
                "type": "Partial",
                "top-time": null,
                "visibility": "N. America, C. America"
            }
        },
        "6": {
            "12": {
                "dayhour": 0.1709837962962963,
                "type": "Partial",
                "top-time": null,
                "visibility": "Arctic, Scandanavia, Alaska, n Asia, n Canada"
            }
        },
        "7": {
            "11": {
                "dayhour": 0.6509027777777778,
                "type": "Partial",
                "top-time": null,
                "visibility": "s Chile, s Argentina"
            }
        },
        "12": {
            "5": {
                "dayhour": 0.6277430555555555,
                "type": "Partial",
                "top-time": null,
                "visibility": "s Argentina, s Chile, Antarctica"
            }
        }
    },
    "2030": {
        "6": {
            "1": {
                "dayhour": 0.2702893518518519,
                "type": "Annular",
                "top-time": 321,
                "visibility": "Europe, n Africa, Mid East, Asia, Arctic, Alaska"
            }
        },
        "11": {
            "25": {
                "dayhour": 0.2858449074074074,
                "type": "Total",
                "top-time": 224,
                "visibility": "s Africa, s Indian Oc., E. Indies, Australia, Antarctica"
            }
        }
    },
    "2031": {
        "5": {
            "21": {
                "dayhour": 0.3028240740740741,
                "type": "Annular",
                "top-time": 326,
                "visibility": "Africa, s Asia, E. Indies, Australia"
            }
        },
        "11": {
            "14": {
                "dayhour": 0.8802083333333334,
                "type": "Hybrid",
                "top-time": 68,
                "visibility": "Pacific, s US, C. America, nw S. America"
            }
        }
    },
    "2032": {
        "5": {
            "9": {
                "dayhour": 0.5602083333333333,
                "type": "Annular",
                "top-time": 22,
                "visibility": "s S. America, s Africa"
            }
        },
        "11": {
            "3": {
                "dayhour": 0.23208333333333334,
                "type": "Partial",
                "top-time": null,
                "visibility": "Asia"
            }
        }
    },
    "2033": {
        "3": {
            "30": {
                "dayhour": 0.7517939814814815,
                "type": "Total",
                "top-time": 157,
                "visibility": "N. America"
            }
        },
        "9": {
            "23": {
                "dayhour": 0.5795254629629629,
                "type": "Partial",
                "top-time": null,
                "visibility": "s S. America, Antarctica"
            }
        }
    },
    "2034": {
        "3": {
            "20": {
                "dayhour": 0.4296875,
                "type": "Total",
                "top-time": 249,
                "visibility": "Africa, Europe, w Asia"
            }
        },
        "9": {
            "12": {
                "dayhour": 0.6801736111111111,
                "type": "Annular",
                "top-time": 178,
                "visibility": "C. America, S. America"
            }
        }
    },
    "2035": {
        "3": {
            "9": {
                "dayhour": 0.9624189814814815,
                "type": "Annular",
                "top-time": 48,
                "visibility": "Australia, New Zealand, s Pacific, Mexico, Antarctica"
            }
        },
        "9": {
            "2": {
                "dayhour": 0.08108796296296296,
                "type": "Total",
                "top-time": 174,
                "visibility": "e Asia, Pacific"
            }
        }
    },
    "2036": {
        "2": {
            "27": {
                "dayhour": 0.19917824074074075,
                "type": "Partial",
                "top-time": null,
                "visibility": "Antarctica, s Australia, New Zealand"
            }
        },
        "7": {
            "23": {
                "dayhour": 0.43895833333333334,
                "type": "Partial",
                "top-time": null,
                "visibility": "s Atlantic"
            }
        },
        "8": {
            "21": {
                "dayhour": 0.7262152777777777,
                "type": "Partial",
                "top-time": null,
                "visibility": "Alaska, Canada, Arctic, w Europe, nw Africa"
            }
        }
    },
    "2037": {
        "1": {
            "16": {
                "dayhour": 0.4089699074074074,
                "type": "Partial",
                "top-time": null,
                "visibility": "n Africa, Europe, Mid East, w Asia"
            }
        },
        "7": {
            "13": {
                "dayhour": 0.1115162037037037,
                "type": "Total",
                "top-time": 238,
                "visibility": "E. Indies, Australia, Pacific"
            }
        }
    },
    "2038": {
        "1": {
            "5": {
                "dayhour": 0.5744212962962963,
                "type": "Annular",
                "top-time": 198,
                "visibility": "e N. America, n S. America, Atlantic, Africa, Europe"
            }
        },
        "7": {
            "2": {
                "dayhour": 0.5645138888888889,
                "type": "Annular",
                "top-time": 60,
                "visibility": "N. & C. America, S. America, Africa, Europe, Mid East"
            }
        },
        "12": {
            "26": {
                "dayhour": 0.04178240740740741,
                "type": "Total",
                "top-time": 138,
                "visibility": "se Asia, E. Indies, Australia, New Zealand, s Pacific, Antarctica"
            }
        }
    },
    "2039": {
        "6": {
            "21": {
                "dayhour": 0.7172800925925926,
                "type": "Annular",
                "top-time": 245,
                "visibility": "N. America, w Europe"
            }
        },
        "12": {
            "15": {
                "dayhour": 0.6831712962962962,
                "type": "Total",
                "top-time": 111,
                "visibility": "s S. America, Antarctica"
            }
        }
    },
    "2040": {
        "5": {
            "11": {
                "dayhour": 0.15488425925925925,
                "type": "Partial",
                "top-time": null,
                "visibility": "Australia, N.Z., Antarctica"
            }
        },
        "11": {
            "4": {
                "dayhour": 0.7979282407407408,
                "type": "Partial",
                "top-time": null,
                "visibility": "N. & C. America"
            }
        }
    },
    "2041": {
        "4": {
            "30": {
                "dayhour": 0.4946759259259259,
                "type": "Total",
                "top-time": 111,
                "visibility": "Brazil, Africa, Mid East"
            }
        },
        "10": {
            "25": {
                "dayhour": 0.06690972222222222,
                "type": "Annular",
                "top-time": 367,
                "visibility": "e Asia, Pacific"
            }
        }
    },
    "2042": {
        "4": {
            "20": {
                "dayhour": 0.0954861111111111,
                "type": "Total",
                "top-time": 291,
                "visibility": "e Asia, se Asia, Australia, Pacific"
            }
        },
        "10": {
            "14": {
                "dayhour": 0.08380787037037037,
                "type": "Annular",
                "top-time": 464,
                "visibility": "se Asia, E. Indies, Australia, , s Pacific, Antarctica"
            }
        }
    },
    "2043": {
        "4": {
            "9": {
                "dayhour": 0.790150462962963,
                "type": "Total",
                "top-time": null,
                "visibility": "n N. America, ne Asia"
            }
        },
        "10": {
            "3": {
                "dayhour": 0.12625,
                "type": "Annular",
                "top-time": null,
                "visibility": "Antarctica, sw Australia, Indian Ocean"
            }
        }
    },
    "2044": {
        "2": {
            "28": {
                "dayhour": 0.8504513888888889,
                "type": "Annular",
                "top-time": 147,
                "visibility": "Antarctica, S. America"
            }
        },
        "8": {
            "23": {
                "dayhour": 0.05348379629629629,
                "type": "Total",
                "top-time": 124,
                "visibility": "n Asia, w N. America, Greenland"
            }
        }
    },
    "2045": {
        "2": {
            "16": {
                "dayhour": 0.9972916666666667,
                "type": "Annular",
                "top-time": 467,
                "visibility": "Australia, New Zealand, Pacific, Hawaii"
            }
        },
        "8": {
            "12": {
                "dayhour": 0.7379513888888889,
                "type": "Total",
                "top-time": 366,
                "visibility": "N. & C. America, S. America, w Africa"
            }
        }
    },
    "2046": {
        "2": {
            "5": {
                "dayhour": 0.9628009259259259,
                "type": "Annular",
                "top-time": 582,
                "visibility": "Australia, Papua New Guinea, w US"
            }
        },
        "8": {
            "2": {
                "dayhour": 0.43140046296296297,
                "type": "Total",
                "top-time": 291,
                "visibility": "Brazil, Africa"
            }
        }
    },
    "2047": {
        "1": {
            "26": {
                "dayhour": 0.0647800925925926,
                "type": "Partial",
                "top-time": null,
                "visibility": "e Asia, Alaska"
            }
        },
        "6": {
            "23": {
                "dayhour": 0.453125,
                "type": "Partial",
                "top-time": null,
                "visibility": "n Canada, Greenland, ne Asia"
            }
        },
        "7": {
            "22": {
                "dayhour": 0.9418518518518518,
                "type": "Partial",
                "top-time": null,
                "visibility": "se Australia, New Zealand"
            }
        },
        "12": {
            "16": {
                "dayhour": 0.9931944444444445,
                "type": "Partial",
                "top-time": null,
                "visibility": "Antarctica, s Chile, s Argentina"
            }
        }
    },
    "2048": {
        "6": {
            "11": {
                "dayhour": 0.5408796296296297,
                "type": "Annular",
                "top-time": 298,
                "visibility": "N. America, Caribbean, n Africa, Europe, w Asia"
            }
        },
        "12": {
            "5": {
                "dayhour": 0.6496180555555555,
                "type": "Total",
                "top-time": 208,
                "visibility": "s S. America, sw Africa"
            }
        }
    },
    "2049": {
        "5": {
            "31": {
                "dayhour": 0.5833101851851852,
                "type": "Annular",
                "top-time": 285,
                "visibility": "se US, C. America, S. America, Africa, s Europe"
            }
        },
        "11": {
            "25": {
                "dayhour": 0.23179398148148148,
                "type": "Hybrid",
                "top-time": 38,
                "visibility": "e Africa, s Asia, East Indies, Australia"
            }
        }
    },
    "2050": {
        "5": {
            "20": {
                "dayhour": 0.8630787037037037,
                "type": "Hybrid",
                "top-time": 21,
                "visibility": "N.Z., s Pacific, sw S. America"
            }
        },
        "11": {
            "14": {
                "dayhour": 0.5631018518518518,
                "type": "Partial",
                "top-time": null,
                "visibility": "ne US, e Canada, n Africa, Europe"
            }
        }
    }
}

/*************************************************    js/TResultCalendar.js **********************************************/
class TResultCalendar 
{
	constructor() {
		this.BEFORE_DAYS = 8;
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
		sdate.day = 1
		this.CalculateCalendar(loc, sdate, GregorianDateTime.GetMonthMaxDays(nYear, nMonth))
	}

    // CalculateCalendar(GCLocation loc, GregorianDateTime begDate, int iCount)
    CalculateCalendar(loc, begDate, iCount) {
		var i, weekday;
		var nTotalCount = this.BEFORE_DAYS + iCount + this.BEFORE_DAYS;
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
		date.SubtractDays(this.BEFORE_DAYS);
		date.InitWeekDay();

		weekday = date.dayOfWeek;

		var exec = new GCFestivalSpecialExecutor();
		exec.calendar = this;

		var utcDayStart = date.GetJulianComplete() * 86400;
		var utcDayEnd = -1;

		// 1
		// initialization of days
		for (i = 0; i < nTotalCount; i++)
		{
			var vday = new VAISNAVADAY();
			vday.date = new GregorianDateTime(date);
			vday.date.dayOfWeek = weekday;
			vday.moonrise.SetValue(-1);
			vday.moonset.SetValue(-1);
			vday.UtcDayStart = utcDayStart;
			vday.earth = earth;

			this.m_pData.push(vday);

			// move to next day
			date.NextDay();
			utcDayStart += 86400;
			weekday = (weekday + 1) % 7;
		}

		for(i = 1; i < nTotalCount; i++)
		{
			this.m_pData[i].Previous = this.m_pData[i - 1];
		}

		for(i = 0; i < nTotalCount-1; i++)
		{
			this.m_pData[i].Next = this.m_pData[i + 1];
		}

		var recentEvents = null;

		// 2
		// calculating DST data and core events
		for (var t of this.m_pData)
		{
			t.BiasMinutes = loc.TimeZone.GetBiasMinutesForDay(t.date);
			if (t.Previous != null)
			{
				t.DstDayType = (t.BiasMinutes == 0
					? (t.Previous.BiasMinutes == 0 ? DstTypeChange.DstOff : DstTypeChange.DstEnd)
					: (t.Previous.BiasMinutes == 0 ? DstTypeChange.DstStart : DstTypeChange.DstOn));
			}

			utcDayStart = t.UtcDayStart - (t.Previous != null ? t.Previous.BiasMinutes * 60 : 0);
			utcDayEnd = t.UtcDayStart + 86400 - t.BiasMinutes*60;

			if (recentEvents == null || recentEvents.p_events.length == 0 || recentEvents.Year != t.date.year || recentEvents.Month != t.date.month)
				recentEvents = GCCoreAstronomy.GetCoreEventsMonth(loc, t.date.year, t.date.month);
			t.coreEvents = new TCoreEventCollection();
			recentEvents.GetCoreEvents(t.coreEvents, utcDayStart, utcDayEnd);
			utcDayStart = utcDayEnd;
		}

		// 3
		if (bCalcMoon)
		{
			for (var t of this.m_pData)
			{
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
		for (var t of this.m_pData)
		{
			t.astrodata = new GCAstroData();
			t.astrodata.DayCalc(t.date, earth);

			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunArunodaya.TotalSeconds,
				CoreEventType.CCTYPE_S_ARUN));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunRise.TotalSeconds,
				CoreEventType.CCTYPE_S_RISE));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunNoon.TotalSeconds,
				CoreEventType.CCTYPE_S_NOON));
			t.coreEvents.InsertByTime(TCoreEvent.NewWithTimeType(
				t.UtcDayStart + t.astrodata.sunSet.TotalSeconds,
				CoreEventType.CCTYPE_S_SET));
		}

		// 5
		// init of masa
		for (var t of this.m_pData)
		{
			if (t.Previous == null
				|| t.astrodata.sunRise.Paksa != t.Previous.astrodata.sunRise.Paksa)
			{
				t.astrodata.MasaCalc(t.date, earth);
				lastMasa = t.astrodata.Masa;
				lastGYear = t.astrodata.GaurabdaYear;
			}
			t.astrodata.Masa = lastMasa;
			t.astrodata.GaurabdaYear = lastGYear;

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_SUN_LONG) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} (*)", "Sun Longitude"
					, t.astrodata.sunRise.longitude);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_SUN_LONG, tempStr);
			}

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_MOON_LONG) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} (*)", "Moon Longitude"
					, t.astrodata.sunRise.longitudeMoon);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_MOON_LONG, tempStr);
			}

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_AYANAMSHA) != 0)
			{
				tempStr = GCStrings.Format("{0} {1} ({2}) (*)", "Ayanamsha"
					, t.astrodata.Ayanamsa
					, GCAyanamsha.GetAyanamsaName(GCAyanamsha.GetAyanamsaType()));
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_AYANAMSHA, tempStr);
			}

			if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_JULIAN) != 0)
			{
				tempStr = GCStrings.Format("{0} {1} (*)", "Julian Time"
					, t.astrodata.JulianDay);
				t.AddEvent(DisplayPriorities.PRIO_ASTRO, GCDS.CAL_JULIAN, tempStr);
			}
		}


		if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_MASA_CHANGE) != 0)
		{
			var str;

			for (var t of this.m_pData)
			{
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

		if (!this.EkadasiOnly && gds.getValue(GCDS.CAL_DST_CHANGE) != 0)
		{
			for (var t of this.m_pData)
			{
				if (t.Previous != null && t.Previous.BiasMinutes == 0 && t.BiasMinutes != 0)
					t.AddEvent(DisplayPriorities.PRIO_DST_CHANGE, GCDS.CAL_DST_CHANGE, "First day of Daylight Saving Time");
				else if (t.Next != null && t.BiasMinutes != 0 && t.Next.BiasMinutes == 0)
					t.AddEvent(DisplayPriorities.PRIO_DST_CHANGE, GCDS.CAL_DST_CHANGE, "Last day of Daylight Saving Time");
			}
		}

		// 6
		// init of mahadvadasis
		for (var t of this.m_pData)
		{
			t.MahadvadasiCalc(earth);
		}

		//
		// init for Ekadasis
		for (var t of this.m_pData)
		{
			if (t.Previous == null)
				continue;
			t.EkadasiCalc(earth);
		}

		for (var t of this.m_pData)
		{
			if (t.Previous != null && t.Previous.nFastID == FastType.FAST_EKADASI)
			{
				t.CalculateEParana(earth);
			}
		}

		if (this.EkadasiOnly)
			return 1;


		if (gds.getBoolValue(71)) {
			for (var t of this.m_pData) {
				if (t.date.year in sun_eclipses && t.date.month in sun_eclipses[t.date.year]
					&& t.date.day in sun_eclipses[t.date.year][t.date.month]) {
						var rec = sun_eclipses[t.date.year][t.date.month][t.date.day];
						//console.log('Date in sun eclipses:', rec)
						var A = this.GetTimeInDay(t, rec.dayhour);
						var curr = A[0];
						var dayt1 = A[1];
						if (curr != null) {
							var text = sprintf("%s Solar Eclipse around %s. Visibility: %s", rec.type, dayt1.ToShortTimeString() ,rec.visibility);
							curr.AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
							//console.log('Timezone offset x:', text)	
						}
				} else if (t.date.year in moon_eclipses && t.date.month in moon_eclipses[t.date.year]
					&& t.date.day in moon_eclipses[t.date.year][t.date.month]) {
						var rec = moon_eclipses[t.date.year][t.date.month][t.date.day];
						console.log('Date in moon eclipses:', rec)
						var t1 = null, t2 = null;
						var mult = 1 / 1440.0;
						if (rec['part-time'] !=null) {
							t1 = rec.dayhour - rec['part-time']/2880;
							t2 = rec.dayhour + rec['part-time']/2880;
						}
						if (rec['total-time'] !=null) {
							t1 = rec.dayhour - rec['total-time']/2880;
							t2 = rec.dayhour + rec['total-time']/2880;
						}
						var A = this.GetTimeInDay(t, t1);
						var B = this.GetTimeInDay(t, t2);
						var curr = null;
						if (A[0] != null && B[0] != null) {
							var text;
							if (A[0].date.day == t.date.day && B[0].date.day == t.date.day) {
								text = sprintf("%s Moon Eclipse between %s - %s. Visibility: %s", rec.type, A[1].ToShortTimeString(), B[1].ToShortTimeString() ,rec.visibility);
								A[0].AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
							} else {
								if (A[0].date.day != t.date.day && B[0].date.day == t.date.day) {
									text = sprintf("%s Moon Eclipse before %s. Visibility: %s", rec.type, B[1].ToShortTimeString(), rec.visibility);
									B[0].AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
								}
								if (A[0].date.day == t.date.day && B[0].date.day != t.date.day) {
									text = sprintf("%s Moon Eclipse after %s. Visibility: %s", rec.type, A[1].ToShortTimeString(), rec.visibility);
									A[0].AddEvent(DisplayPriorities.PRIO_SUN, GCDS.CAL_ECLIPSE, text)
								}
							}
							console.log('Timezone offset x:', A[0])	
						}
					}

			}
		}

		// init ksaya data
		// init of second day of vriddhi
		this.CalculateKsayaVriddhiTithis(earth);

		//
		// calculate sankrantis
		this.CalculateSankrantis();

		// 7
		// init of festivals
		this.AddMatchedFestivals(exec);

		//
		// apply daylight saving time
		this.ApplyDaylightSavingHours();

		//
		// resolve festivals fasting
		for (i = this.BEFORE_DAYS; i < this.m_PureCount + this.BEFORE_DAYS; i++)
		{
			this.ResolveFestivalsFasting(i);

			var td = this.m_pData[i];

			if (gds.getValue(GCDS["CAL_SUN_RISE"]) != 0)
			{
				tempStr = GCStrings.Format("{0}-{1}-{2}  {3} - {4} - {5} ({6})",
					"Sunrise",
					"Noon",
					"Sunset",
					td.astrodata.sunRise.ToShortTimeString(),
					td.astrodata.sunNoon.ToShortTimeString(),
					td.astrodata.sunSet.ToShortTimeString(),
					GCStrings.GetDSTSignature(td.BiasMinutes));
				td.AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_SUN_RISE"], tempStr);
			}

			if (gds.getValue(GCDS["CAL_SUN_SANDHYA"]) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1} | {2} | {3}   ({4})",
					"Sandhyas",
					td.astrodata.sunRise.ShortSandhyaString(),
					td.astrodata.sunNoon.ShortSandhyaString(),
					td.astrodata.sunSet.ShortSandhyaString(),
					GCStrings.GetDSTSignature(td.BiasMinutes));
				td.AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_SUN_SANDHYA"], tempStr);
			}

			if (gds.getValue(GCDS["CAL_BRAHMA_MUHURTA"]) != 0)
			{
				tempStr = GCStrings.Format("{0}: {1}   ({2})",
					"Brahma Muhurta",
					td.astrodata.sunRise.ShortMuhurtaString(-2),
					GCStrings.GetDSTSignature(td.BiasMinutes));
				td.AddEvent(DisplayPriorities["PRIO_SUN"], GCDS["CAL_BRAHMA_MUHURTA"], tempStr);
			}
		}

		if (gds.getValue(GCDS.CAL_COREEVENTS) != 0)
		{
			var number = 1;
			for(var today of this.m_pData) {
				for(var tde of today.coreEvents.items()) {
					today.AddEvent(DisplayPriorities["PRIO_ASTRO"] + number, GCDS["CAL_COREEVENTS"],
						tde.TypeString + "   " + today.GetCoreEventTime(tde));
					number++;
				}
			}
		}


		// sorting day events according priority
		for(var element of this.m_pData) {
			element.SortDayEvents();
		}


		return 1;

	}

	GetTimeInDay(curr, dayhours)
	{
		var doff = (this.m_Location.OffsetUtcHours*60 + curr.BiasMinutes);
		doff = dayhours + doff * 60 / 86400;
		console.log('doff:', doff);
		if (doff < 0.0 && curr.Previous != null) {
			doff += 1.0;
			curr = curr.Previous;
		} else if (doff >= 0.0 && doff < 1.0) {
		} else if (doff >= 1.0 && curr.Next != null) {
			doff -= 1.0;
			curr = curr.Next;
		} else {
			return [null, null];
		}

		var dt = new GCHourTime();
		dt.SetDayTime(doff);

		return [curr, dt];
	}

	ApplyDaylightSavingHours()
	{
		for(var today of this.m_pData) {
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

			for(var core of today.coreEvents.items()) {
				core.ApplyDstType(today.UtcDayStart, today.DstDayType);
			}
		}
	}

	CalculateKsayaVriddhiTithis(earth) 
	{
		for(var t of this.m_pData) {
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

				if (tithiTimes.length == 2)
				{
					str = sprintf("Kshaya tithi: %s -- %s to %s (%s)",
						t.prevTithiName,
						tithiTimes[0].dateTimeOfEvent.Format("{day} {monthAbr} {hour}:{minRound}"),
						tithiTimes[1].dateTimeOfEvent.Format("{day} {monthAbr} {hour}:{minRound}"),
						GCStrings.GetDSTSignature(t.BiasMinutes));

					t.AddEvent(DisplayPriorities.PRIO_KSAYA, GCDS.CAL_KSAYA, str);
				}
			}
		}
	}

	CalculateSankrantis()
	{
		var targetDay = null;
		for(var today of this.m_pData) {
			targetDay = null;
			var n = 0;
			for (var ce of today.coreEvents.items()) {
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
			}
		}
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
		for (i = this.BEFORE_DAYS; i < this.m_PureCount + this.BEFORE_DAYS - 1; i++)
		{
			//console.log('festival check -> ', i)
			for(var book of gEvents) {
				if (!gEventsVisible[book.bookid])
					continue;
				for(var fb of book.events) {
					if (fb.nReserved != 1 && fb.nReserved != undefined) continue;
					if (fb.nVisible == 0) continue;
					//console.log('========', this.m_pData[i], fb);
					if (this.IsFestivalDay(this.m_pData, i, fb))
					{
						currFestTop = this.AddEventToDay(i, 0, currFestTop, fb, book.bookid);
					}
				}
			}
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
	AddEventToDay(idx, offsetWithToday, currFestTop, fb, bookID) 
	{
		var t = this.m_pData[idx + offsetWithToday];
		var md = t.AddEvent(DisplayPriorities.PRIO_FESTIVALS_0 + bookID * 100 + currFestTop,
			GCDS.CAL_FEST_0 + bookID, fb.name);
		currFestTop += 5;
		if (fb.fast > 0)
		{
			md.fasttype = fb.fast;
			md.fastsubject = fb.fastSubj;
		}

		if (gds.getValue(51) != 2 && fb.start != undefined && fb.start > -7000)
		{
			var ss1;
			var years = t.astrodata.GaurabdaYear - (fb.start - 1496);
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

		if (fb.events != undefined && fb.events.length > 0)
		{
			for(var related of fb.events) {
				if (related.type == "R") {
					this.AddEventToDay(idx, fb.dayoff + related.dayoff, 0, related, bookID);
				}
			}
		}

		return currFestTop;
	}

	GetDay(nIndex)
	{
		var nReturn = nIndex + this.BEFORE_DAYS;

		if (nReturn >= this.m_nCount)
			return null;

		return this.m_pData[nReturn];
	}

	FindDate(vc) 
	{
		var i;
		for (i = this.BEFORE_DAYS; i < this.m_nCount; i++)
		{
			if ((this.m_pData[i].date.day == vc.day) && (this.m_pData[i].date.month == vc.month) && (this.m_pData[i].date.year == vc.year))
				return (i - this.BEFORE_DAYS);
		}

		return -1;
	}

	ResolveFestivalsFasting(nIndex)
	{
		var s = this.m_pData[nIndex - 1];
		var t = this.m_pData[nIndex];
		var u = this.m_pData[nIndex + 1];

		var str;
		var subject = '';
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

/*************************************************    js/TResultToday.js **********************************************/
class TResultToday
{
	constructor()
	{
		this.calendar = new TResultCalendar()
		this.currentDay = new GregorianDateTime()
	}

	// GregoriandateTime, GCLocation
	Calculate(dateTime, location)
	{
		var vc2 = new GregorianDateTime();
		this.currentDay = new GregorianDateTime();
		this.currentDay.Set(dateTime);
		this.currentDay.InitWeekDay();
		vc2.Set(currentDay);

		vc2.TimezoneHours = location.OffsetUtcHours;
		vc2.PreviousDay();
		vc2.PreviousDay();
		vc2.PreviousDay();
		vc2.PreviousDay();
		this.calendar = new TResultCalendar();
		this.calendar.CalculateCalendar(location, vc2, 9);

	}


	GetCurrentDay()
	{
		var i = this.calendar.FindDate(this.currentDay);
		return this.calendar.GetDay(i);
	}

}

/*************************************************    js/TResultApp.js **********************************************/
class AppDayBase
{
  constructor() {
    this.DsCondition = -1;
  }
  static NewEmptyLine() {
    var ad = new AppDayInfo();
    ad.Type = "L";
    return ad;
  }
  static NewLineCond(cond) {
    var ad = new AppDayInfo();
    ad.Type = "L";
    ad.DsCondition = cond;
    return ad;
  }
  static NewSeparator(name) {
    var ad = new AppDayBase();
    ad.Type = "S";
    ad.Name = name;
    return ad;
  }
  static NewValue(name,value) {
    var ad = new AppDayBase();
    ad.Type = "V";
    ad.Name = name;
    ad.Value = value;
    return ad;
  }

}

class TResultApp
{
  constructor() {
    this.TRESULT_APP_CELEBS = 3;
    this.Location = myLocation;
    this.eventTime = new GregorianDateTime();
    this.details = new GCAstroData();
    this.b_adhika = false;
    this.celeb_gy = [];
    this.celeb_date = [];
    this.MainInfo = [];
  }

  //calculateAppDay(GCLocation location, GregorianDateTime eventDate)
  calculateAppDay(location,eventDate) {
      //MOONDATA moon;
      //SUNDATA sun;
      var d = this.details = new GCAstroData();
      var vc = new GregorianDateTime();
      var vcsun = new GregorianDateTime();
      var m_earth = location.GetEarthData();

      vc.Set(eventDate);
      vcsun.Set(eventDate);

      this.b_adhika = false;
      this.eventTime = GregorianDateTime.NewWithDate(eventDate);
      this.Location = location;

      //d.nTithi = GetPrevTithiStart(m_earth, vc, dprev);
      //GetNextTithiStart(m_earth, vc, dnext);
      vcsun.shour -= vcsun.TimezoneHours / 24.0;
      vcsun.NormalizeValues();
      vcsun.TimezoneHours = 0.0;
      d.sunRise = new GCHourTime();
      d.sunRise.TotalDays = vc.shour;
      d.sunRise.longitude = GCCoreAstronomy.GetSunLongitude(vcsun, m_earth);
      d.sunRise.longitudeMoon = GCCoreAstronomy.GetMoonLongitude(vcsun, m_earth);
      d.Ayanamsa = GCAyanamsha.GetAyanamsa(vc.GetJulianComplete());
      d.sunRise.Ayanamsa = d.Ayanamsa;

      // tithi


      d.Masa = d.MasaCalc(vc, m_earth);
      if (d.Masa == MasaId.ADHIKA_MASA)
      {
          d.Masa = d.sunRise.RasiOfSun;
          this.b_adhika = true;
      }

      vc.Today();
      vc.TimezoneHours = m_earth.OffsetUtcHours;
      var m = 0;
      var i;
      var va = new GaurabdaDate();
      var vctemp;

      va.tithi = d.sunRise.Tithi;
      va.masa = d.Masa;
      va.gyear = GCCalendar.GetGaurabdaYear(vc, m_earth);
      if (va.gyear < d.GaurabdaYear)
          va.gyear = d.GaurabdaYear;

      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(7), eventDate.ToString()));
      MainInfo.push(AppDayBase.NewEmptyLine());
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(8), eventDate.ShortTimeString()));
      MainInfo.push(AppDayBase.NewEmptyLine());
      MainInfo.push(AppDayBase.NewEmptyLine());
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(9), location.Title));
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(10), location.GetLatitudeString()));
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(11), location.GetLongitudeString()));
      MainInfo.push(AppDayBase.NewValue("Timezone", location.TimeZoneName));
      MainInfo.push(AppDayBase.NewValue("DST", "N/A"));
      MainInfo.push(AppDayBase.NewEmptyLine());
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(13), GCTithi.GetName(d.sunRise.Tithi)));
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(14), GCStrings.Format("{0:00.000}%", d.sunRise.TithiElapse)));
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(15), GCNaksatra.GetName(d.sunRise.Naksatra)));
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(16), GCStrings.Format("{0:00.000}% ({1} pada)", d.sunRise.NaksatraElapse, GCStrings.getString(811 + d.sunRise.NaksatraPada))));
      MainInfo.push(AppDayBase.NewValue("Moon Rasi", GCRasi.GetName(d.sunRise.RasiOfMoon)));
      MainInfo.push(AppDayBase.NewValue("Sun Rasi", GCRasi.GetName(d.sunRise.RasiOfSun)));
      MainInfo.push(AppDayBase.NewValue(GCStrings.getString(20), GCPaksa.GetName(d.sunRise.Paksa)));

      if (b_adhika == true)
      {
          MainInfo.Add(AppDayBase.NewValue(GCStrings.getString(22), GCMasa.GetName(d.Masa) + GCStrings.getString(21)));
      }
      else
          MainInfo.Add(AppDayBase.NewValue(GCStrings.getString(22), GCMasa.GetName(d.Masa)));
      MainInfo.Add(AppDayBase.NewValue(GCStrings.getString(23), d.GaurabdaYear.ToString()));

      if (gds.getValue(48) == 1)
      {
          MainInfo.Add(AppDayBase.NewLineCond(GCDS.APP_CHILDNAMES));
          MainInfo.Add(AppDayBase.NewSeparator(GCStrings.getString(17)));
          MainInfo.Add(AppDayBase.NewLineCond(GCDS.APP_CHILDNAMES));

          MainInfo.Add(AppDayBase.NewValue(GCDS.APP_CHILDNAMES, GCStrings.getString(18), GCStrings.GetNaksatraChildSylable(d.sunRise.Naksatra, d.sunRise.NaksatraPada) + "..."));
          MainInfo.Add(AppDayBase.NewValue(GCDS.APP_CHILDNAMES, GCStrings.getString(19), GCStrings.GetRasiChildSylable(d.sunRise.RasiOfMoon) + "..."));
      }

      MainInfo.Add(AppDayBase.NewEmptyLine());
      MainInfo.Add(AppDayBase.NewSeparator(GCStrings.getString(24)));
      MainInfo.Add(AppDayBase.NewEmptyLine());


      celeb_date = [];
      celeb_gy = [];

      for (i = 0; i < TRESULT_APP_CELEBS + 3; i++)
      {
          vctemp = GCCalendar.VATIMEtoVCTIME(va, m_earth);
          if (va.gyear > d.GaurabdaYear)
          {
              if (this.celeb_gy.length < TRESULT_APP_CELEBS)
              {
                  MainInfo.Add(AppDayBase.NewValue("Gaurabda " + va.gyear.toString(), vctemp.ToString()));
                  this.celeb_date.push(GregorianDateTime.NewWithDate(vctemp));
                  this.celeb_gy.push(va.gyear);
                  m++;
              }
          }
          va.gyear++;
      }
  }
}

/*************************************************    js/TResultCoreEvents.js **********************************************/

    class TResultCoreEvents
    {
      constructor() {
        this.Full = false;
        this.Year = 2020;
        this.EarthLocation = new GCLocation();
        this.p_events = [];
      }

      Clear() {
          this.p_events = [];
      }

      //AddEvent(GregorianDateTime gTime, int inType, int inData)
      AddEvent(gTime, inType, inData)
      {
          var de = new TCoreEvent();
          var inTime = gTime.GetJulianComplete() * 86400;

          de.Time = inTime;
          de.nDst = 0;
          de.nData = inData;
          de.nType = inType;

          this.p_events.push(de);
          return true;
      }


    Sort()
    {
        this.p_events.sort(function(a,b) { return a.Time - b.Time; })
    }


      LoadFile(filePath)
      {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
               this.p_events = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", filePath, true);
        xhttp.send();
      }

      SaveFile()
      {
        return JSON.stringify(this.p_events);
      }

      //CalculateEvents(GCLocation loc, int nYear)
      CalculateEvents(loc,nYear,nMonth) {
          //GCSunData sun = new GCSunData();
          //DstTypeChange ndst = DstTypeChange.DstOff;
          var nData;
          this.Clear();
          this.EarthLocation = loc;
          this.Year = nYear;
          var vcStart = GregorianDateTime.fromComponents(this.Year - 1, 12, 29);
          var vcEnd = GregorianDateTime.fromComponents(this.Year + 1, 1, 2);
          if (nMonth != undefined) {
              vcStart = GregorianDateTime.fromComponents(nYear, nMonth, 1);
              vcEnd = GregorianDateTime.fromComponents(nYear, nMonth, GregorianDateTime.GetMonthMaxDays(nYear,nMonth));
          }

          var vc = GregorianDateTime.fromDate(vcStart).setOffset(loc.OffsetUtcHours);
          var vcAdd = GregorianDateTime.fromDate(vc).InitWeekDay();
          var vcNext = new GregorianDateTime();
          var earth = loc.GetEarthData();

          /*while (vcAdd.IsBeforeThis(vcEnd))
          {
              ndst = loc.TimeZone.DetermineDaylightChange(vcAdd);
              vcAdd.NextDay();
          }*/


          if (this.Full || gds.getValue(GCDS.COREEVENTS_TITHI) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData, vcNext] = GCTithi.GetNextTithiStart(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_TITHI, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.2;
                  if (vcAdd.shour >= 1.0)
                  {
                      vcAdd.shour -= 1.0;
                      vcAdd.NextDay();
                  }
              }
          }

          if (this.Full || gds.getValue(GCDS.COREEVENTS_NAKSATRA) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData,vcNext] = GCNaksatra.GetNextNaksatra(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_NAKS, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.2;
                  if (vcAdd.shour >= 1.0)
                  {
                      vcAdd.shour -= 1.0;
                      vcAdd.NextDay();
                  }
              }
          }

          if (this.Full || gds.getValue(GCDS.COREEVENTS_YOGA) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData,vcNext] = GCYoga.GetNextYogaStart(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_YOGA, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.2;
                  if (vcAdd.shour >= 1.0)
                  {
                      vcAdd.shour -= 1.0;
                      vcAdd.NextDay();
                  }
              }
          }

          if (this.Full || gds.getValue(GCDS.COREEVENTS_SANKRANTI) != 0)
          {
              vcNext = new GregorianDateTime();
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              var nSan;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nSan,nData] = GCSankranti.GetNextSankranti(vcAdd, earth);
                  vcNext.Set(nSan);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_SANK, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.NextDay();
              }
          }

          if (this.Full || gds.getValue(GCDS.COREEVENTS_MOONRASI) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              var vmr;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData, vmr] = GCMoonData.GetNextMoonRasi(earth, vcAdd);
                  vcNext.Set(vmr);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_M_RASI, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.5;
                  vcAdd.NormalizeValues();
              }

          }
          if (this.Full || gds.getValue(GCDS.COREEVENTS_CONJUNCTION) != 0)
          {
              var dlong;
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [dlong,vcNext] = GCConjunction.GetNextConjunction(vcAdd, true, earth);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_CONJ, GCRasi.GetRasi(dlong, GCAyanamsha.GetAyanamsa(vcNext.GetJulianComplete())));
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.NextDay();
              }
          }

          this.Sort();
      }

      //GetCoreEvents(List<TCoreEvent> coreEvents, long utcDayStart, long utcDayEnd)
        GetCoreEvents(coreEvents, utcDayStart, utcDayEnd) {
            for(var ce of this.p_events) {
                if (ce.Time >= utcDayStart && ce.Time < utcDayEnd) {
                    coreEvents.push(ce);
                }
            }
          return coreEvents;
        }
    }

  class TCoreEventCollection
  {
    constructor() {
      this.list = []
    }
    length() {
        return this.list.length;
    }
    push(a) 
    {
        this.list.push(a)
    }

    items() {
        return this.list;
    }

    item(idx) {
        return this.list[idx];
    }

    InsertByTime(/*TCoreEvent*/ coreEvent)
    {
      var i;
        for(i = 0; i < this.list.length; i++)
        {
            if (this.list[i].Time > coreEvent.Time)
            {
                this.list.splice(i, 0, coreEvent);
                return;
            }
        }

        this.list.push(coreEvent);
    }

    FindIndexOf(/*int*/ nType, /*int*/ idx) {
        if (idx < 0) {
            idx = 0;
        }
        var i;
        for(i = idx; i < this.list.length; i++)
        {
            if (this.list[i].nType == nType)
                return i;
        }

        return -1;
    }

    FindBackIndexOf(/*int*/ nType, /*int*/ idx) {
        if (idx >= this.list.length) {
            idx = this.list.length - 1;
        }
        if (idx < 0) {
            return -1;
        }
        var i;

        for(i = idx; i >= 0; i--)
        {
            if (this.list[i].nType == nType)
                return i;
        }

        return -1;
    }
  }

/*************************************************    js/TResultMasaList.js **********************************************/
class TResultMasaList {
  constructor() {
    this.arr = [];
    this.vc_end = new GregorianDateTime();
    this.vc_start = new GregorianDateTime();
    this.n_countYears = 0;
    this.n_countMasa = 0;
    this.n_startYear = 0;
    this.m_location = new GCLocation();
  }

  /// Calculation of Masa List
  /// </summary>
  /// <param name="loc">Location</param>
  /// <param name="nYear">Starting year</param>
  /// <param name="nCount">Number of years</param>
  /// <returns></returns>
  CalculateMasaList(loc, nYear, nCount) {
      var day = new GCAstroData();
      var d = new GregorianDateTime(), de = new GregorianDateTime(), t = new GregorianDateTime();
      var lm = -1;
      var mlist = this;
      var earth = loc.GetEarthData();

      mlist.n_startYear = nYear;
      mlist.n_countYears = nCount;
      mlist.vc_start = new GregorianDateTime();
      mlist.vc_end = new GregorianDateTime();
      mlist.vc_start.Set(GCAstroData.GetFirstDayOfYear(earth, nYear));
      mlist.vc_end.Set(GCAstroData.GetFirstDayOfYear(earth, nYear + nCount));
      mlist.m_location = loc;

      d.Set(mlist.vc_start);
      de.Set(mlist.vc_end);

      var i = 0;
      var prev_paksa = -1;
      var current = 0;


      while (d.IsBeforeThis(de))
      {
          day.DayCalc(d, earth);
          if (prev_paksa != day.sunRise.Paksa)
          {
              day.Masa = day.MasaCalc(d, earth);

              if (lm != day.Masa)
              {
                  if (lm >= 0)
                  {
                      t.Set(d);
                      t.PreviousDay();
                      if (mlist.arr.length <= current)
                          mlist.arr.push(new TResultMasa());
                      mlist.arr[current].vc_end = new GregorianDateTime(t);
                      current++;
                  }
                  lm = day.Masa;
                  if (mlist.arr.length <= current)
                      mlist.arr.push(new TResultMasa());
                  mlist.arr[current].masa = day.Masa;
                  mlist.arr[current].year = day.GaurabdaYear;
                  mlist.arr[current].vc_start = new GregorianDateTime(d);
              }
          }
          prev_paksa = day.sunRise.Paksa;
          d.NextDay();
          i++;
      }

      mlist.arr[current].vc_end = new GregorianDateTime(d);
      current++;
      mlist.n_countMasa = current;

      return 1;
  }
}

class TResultMasa	{
  constructor() {
    this.masa = 0;
    this.year = 0;
    this.vc_start = new GregorianDateTime();
    this.vc_end = new GregorianDateTime();
  }
}

/*************************************************    js/TCalendarFormatter.js **********************************************/


function getDayBkgColorCode(/*VAISNAVADAY */ p)
{
	if (p == null)
		return "";
	if (p.nFastID == FastType.FAST_EKADASI)
		return "#FFFFBB";
	if (p.nFastID != 0)
		return "#BBFFBB";
	return "";
}

function getDateRangeText(d1, d2) {
	return sprintf(" %s %d - %s %d ", 
		GregorianDateTime.GetMonthAbreviation(d1.month), d1.day,
		GregorianDateTime.GetMonthAbreviation(d2.month), d2.day);
}
/******************************************************************************************/
/*                                                                                        */
/******************************************************************************************/
function writeCalendarHtml(daybuff)
{
	var k;
	var str, st;
	var pvd;
	var nPrevMasa = -1;

	var xml = document;
	var curTable = null;
	var curRow = null;
	var curCell = null;
	var main = document.createElement('div');
	var pp, sp;

	var thisStart = daybuff.GetDay(0).date;
	var dates = [ thisStart.cloneDays(-daybuff.m_vcCount),
				  thisStart.cloneDays(-1),
				  thisStart,
				  thisStart.cloneDays(daybuff.m_vcCount - 1),
				  thisStart.cloneDays(daybuff.m_vcCount),
				  thisStart.cloneDays(2*daybuff.m_vcCount - 1)];

	for (k = 0; k < daybuff.m_vcCount; k++)
	{
		pvd = daybuff.GetDay(k);
		if (pvd)
		{
			if (nPrevMasa != pvd.astrodata.Masa)
			{
				pp = document.createElement('p');
				pp.style.textAlign = 'center';
				pp.style.fontWeight = 'bold';
				main.appendChild(pp);

				sp = document.createElement('span');
				sp.style.fontSize = '14pt';
				if (nPrevMasa == MasaId.ADHIKA_MASA) {
					sp.innerText = sprintf('%s Masa %s', GCMasa.GetName(pvd.astrodata.Masa), GCStrings.getString(109));
				} else {
					sp.innerText = sprintf('%s Masa', GCMasa.GetName(pvd.astrodata.Masa));
				}
				pp.appendChild(sp);
				pp.appendChild(document.createElement('br'));
				
				sp = document.createElement('span');
				sp.style.fontSize = '10pt';
				sp.innerText = sprintf('Gaurabda %d', pvd.astrodata.GaurabdaYear);
				pp.appendChild(sp);
				pp.appendChild(document.createElement('br'));
				
				sp = document.createElement('span');
				sp.className = 'loclink';
				//sp.style.fontSize = '10pt';
				//sp.style.color = 'blue';
				//sp.style.cursor = 'pointer';
				sp.innerText = daybuff.m_Location.GetFullName();
				sp.onclick = function() {
					setTab('loc');
				};
				pp.appendChild(sp);
				pp.appendChild(document.createElement('br'));

				/* link to prev date range */
				sp = document.createElement('span');
				sp.className = 'datelink';
				sp.onclick = function() {
					setStartDate(this.getAttribute('data_start'));
				}
				sp.setAttribute('data_start', dates[0].triplet);
				sp.innerText = sprintf(" %s %s ", getDateRangeText(dates[0], dates[1]), String.fromCharCode(10096));
				pp.appendChild(sp);
				/* info about current date range */
				sp = document.createElement('span');
				sp.className = 'datelinkbase';
				sp.innerText = getDateRangeText(dates[2], dates[3]);
				pp.appendChild(sp);
				/* link to next date range */
				sp = document.createElement('span');
				sp.className = 'datelink';
				sp.onclick = function() {
					setStartDate(this.getAttribute('data_start'));
				}
				sp.setAttribute('data_start', dates[4].triplet);
				sp.innerText = sprintf(" %s %s ", String.fromCharCode(10097), getDateRangeText(dates[4], dates[5]));
				pp.appendChild(sp);

				/* calendar days are in the table  */
				curTable = document.createElement('table');
				curTable.align = 'center';
				main.appendChild(curTable);

				curRow = document.createElement('tr');
				curTable.appendChild(curRow);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.colSpan = 2;
				curCell.innerText = 'DATE';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'TITHI';
				curCell.style.minWidth = '20em';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'P';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'NAKSATRA';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'YOGA';
				curRow.appendChild(curCell);

				
				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'FAST';
				curRow.appendChild(curCell);
			}

			nPrevMasa = pvd.astrodata.Masa;

			curRow = document.createElement('tr');
			curTable.appendChild(curRow);

			// date data
			curCell = document.createElement('td');
			curCell.innerText = pvd.date.toString();
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			st = GCStrings.getString(pvd.date.dayOfWeek);
			curCell.innerText = st.substring(0, 2);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.setAttribute('data_dets', 'd' + k.toString());
			curCell.onclick = function() {
				var a = this.getAttribute('data_dets');
				var el1 = document.getElementById(a);
				if (el1.style.display == 'none') {
					el1.style.display = 'block';
				} else {
					el1.style.display = 'none';
				}
			}
			//curCell.innerText = pvd.GetFullTithiName();
			sp = document.createElement('span');
			sp.className = 'clickable_tithi_name';
			sp.innerText = pvd.GetFullTithiName();
			curCell.appendChild(sp);
			pp = document.createElement('div');
			pp.style.paddingLeft = 20;
			pp.style.marginTop = 16;
			pp.style.marginBottom = 16;
			pp.style.display = 'none';
			pp.id = 'd' + k.toString();
			curCell.appendChild(pp);
			for (var ce of pvd.coreEvents.items())
			{
				sp = document.createElement('p');
				sp.className = 'core-events';
				sp.innerText = sprintf("%s %s", ce.TypeString(), ce.getTimeString(pvd.UtcDayStart));
				pp.appendChild(sp);
			}
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.innerText = GCPaksa.GetAbbr(pvd.astrodata.sunRise.Paksa);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.innerText = GCNaksatra.GetName(pvd.astrodata.sunRise.Naksatra);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.innerText = GCYoga.GetName(pvd.astrodata.sunRise.Yoga);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			if (pvd.nFastID != FastType.FAST_NULL) {
				curCell.innerText = '*';
			}
			curRow.appendChild(curCell);


			curRow = document.createElement('tr');
			curTable.appendChild(curRow);
			curCell = document.createElement('td');
			curCell.colSpan = 2;
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.colSpan = 4;
			curRow.appendChild(curCell);

			for(var ed of pvd.dayEvents)
			{
				var disp = ed.disp;
				if (disp == undefined || disp == -1 || gds.getValue(disp))
				{
					if (ed.spec == 1)
					{
						sp = document.createElement('span');
						sp.style.color = 'blue';
						sp.innerText = ed.text;
						curCell.appendChild(sp);
					}
					else
					{
						curCell.appendChild(document.createTextNode(ed.text));
					}
					curCell.appendChild(document.createElement('br'));
				}
			}
		}
	}

	pp = document.createElement('hr');
	pp.align = 'center';
	pp.width = '65%';
	main.appendChild(pp);

	pp = document.createElement('p');
	pp.align = 'center';
	pp.innerText = sprintf('Generated by %s', GCStrings.getString(130));
	main.appendChild(pp);


	pp = document.createElement('p');
	main.appendChild(pp);
	pp.style.textAlign = 'center';
	pp.style.marginTop = '16pt';
	pp.innerHTML = sprintf('<a href="?st=1">Table Calendar</a>')

	return main;
}

function monthString(m, y, o) {
	while (o > 0) {
		m += 1;
		o -= 1;
		if (m > 12) {
			m = 1;
			y += 1;
		}
	}
	while (o < 0) {
		m -= 1;
		o += 1;
		if (m < 1) {
			m = 12;
			y -= 1;
		}
	}
	return sprintf("%s %d", GCStrings.getString(m + 759), y)
}

function linkMonthString(m, y, o) {
	while (o > 0) {
		m += 1;
		o -= 1;
		if (m > 12) {
			m = 1;
			y += 1;
		}
	}
	while (o < 0) {
		m -= 1;
		o += 1;
		if (m < 1) {
			m = 12;
			y -= 1;
		}
	}
	return sprintf("%04d-%02d-01", y, m);
}

function writeTableHtml(daybuff)
{
	let g_firstday_in_week = daybuff.m_Location.FirstDayOfWeek;
	var str, st;
	var nroot, ntable, nrow, ncell;
	var n1, n2, n3, n4;
	var pvd;
	var nPrevMonth = -1;
	var prevMas = -1;
	var brw = 0;
	var isFirstRow = true;
	var isFirstCol = true;
	var colNum = 0;

	// first = 1
	//int i_end[7] = {0, 6, 5, 4, 3, 2, 1}; //(6-(i-first))%7
	//int i_beg[7] = {6, 0, 1, 2, 3, 4, 5}; //(i-first)%7

	nroot = document.createElement('div');

	var masa_str = '';
	for (var k=0; k < daybuff.m_vcCount; k++) {
		pvd = daybuff.GetDay(k);
		if (prevMas<0) {
			prevMas = pvd.astrodata.Masa;
			masa_str += sprintf("%s Masa ", GCMasa.GetName(prevMas));
		}
		if (pvd.astrodata.Masa != prevMas) {
			masa_str += sprintf(" till %s", pvd.Previous.date.toString());
			masa_str += sprintf(", %s Masa ", GCMasa.GetName(pvd.astrodata.Masa));
			masa_str += sprintf(" from %s", pvd.date.toString());
			prevMas = pvd.astrodata.Masa;
		}
	}

	for (var k = 0; k < daybuff.m_vcCount; k++)
	{
		pvd = daybuff.GetDay(k);
		if (pvd)
		{
			var bSemicolon = false;
			var bBr = false;
			var lwd = pvd.date.dayOfWeek;
			if (nPrevMonth != pvd.date.month)
			{
				if (nPrevMonth != -1)
				{
					for(var y = colNum; y < 7; y++)
					{
						ncell = document.createElement('td');
						ncell.style.border = 'solid windowtext 1pt';
						ncell.style.padding = '3pt 3pt 3pt 3pt';
						ncell.innerHTML = '&nbsp;'
						nrow.appendChild(ncell);
						colNum += 1;
					}
					n1 = document.createElement('p');
					n1.innerHTML = '&nbsp;';
					nroot.appendChild(n1);
				}
				ntable = document.createElement('table');
				nroot.appendChild(ntable);
				ntable.width = '100%';
				ntable.border=0;
				ntable.frame='bottom';
				ntable.cellSpacing = 0;
				ntable.cellPadding = 0;

				nrow = document.createElement('tr');
				ntable.appendChild(nrow);

				ncell = document.createElement('td');
				ncell.width = '60%';
				nrow.appendChild(ncell);
				n1 = document.createElement('p');
				n1.className = 'month'
				ncell.appendChild(n1);
				n1.innerHTML = sprintf("%s %d<br><span class='tnote'>%s</span>", 
							GCStrings.getString(pvd.date.month + 759), 
							pvd.date.year,
							masa_str);

				ncell = document.createElement('td');
				nrow.appendChild(ncell);
				n1 = document.createElement('p');
				ncell.appendChild(n1);
				n1.classList.add('tnote');
				n1.style.textAlign = 'right';
				n1.innerHTML = sprintf("%s<br>Timezone: %s",
					daybuff.m_Location.GetLocationText(),
					daybuff.m_Location.GetTimeZoneText());

				nroot.appendChild(document.createElement('hr'));
				nPrevMonth = pvd.date.month;

				ntable = document.createElement('table');
				nroot.appendChild(ntable);
				ntable.width = '100%';
				ntable.cellPadding = 0;
				ntable.cellSpacing = 0;

				nrow = document.createElement('tr');
				ntable.appendChild(nrow);
				for(var y = 0; y < 7; y++)
				{
					ncell = document.createElement('td');
					ncell.width = '14%';
					ncell.align = 'center';
					ncell.style.fontSize = '10pt';
					ncell.style.border = 'none';
					ncell.innerText = GCStrings.getString((y + g_firstday_in_week) % 7);
					nrow.appendChild(ncell);
				}
				nrow = document.createElement('tr');
				ntable.appendChild(nrow);
				colNum = 0;
				for(var y = g_firstday_in_week; y < pvd.date.dayOfWeek; y++) {
					ncell = document.createElement('td');
					ncell.style.borderBottom = '1pt solid black';
					ncell.style.borderRight = '1pt solid black';
					if (isFirstCol) {
						ncell.style.borderLeft = '1pt solid black';
					}
					ncell.style.borderTop = '1pt solid black';
					ncell.style.padding = '3pt 3pt 3pt 3pt';
					ncell.innerHTML = '&nbsp;'
					nrow.appendChild(ncell);
					colNum += 1;
					isFirstCol = false;
				}
			}
			else
			{
				if (pvd.date.dayOfWeek == g_firstday_in_week) {
					nrow = document.createElement('tr');
					ntable.appendChild(nrow);
					isFirstRow = false;
					isFirstCol = true;
					colNum = 0;
				}
			}

			// date data
			ncell = document.createElement('td');
			ncell.vAlign = 'top';
			ncell.style.borderBottom = '1pt solid black';
			ncell.style.borderRight = '1pt solid black';
			if (isFirstCol) {
				ncell.style.borderLeft = '1pt solid black';
			}
			if (isFirstRow) {
				ncell.style.borderTop = '1pt solid black';
			}
			ncell.style.padding = '3pt';
			ncell.style.overflow = 'hidden';
			ncell.bgColor = getDayBkgColorCode(pvd);
			ncell.height = '120px';
			nrow.appendChild(ncell);
			colNum += 1;
			isFirstCol = false;

			n1 = document.createElement('table');
			ncell.appendChild(n1);
			n1.width = '100%';
			n1.border = 0;
			n2 = document.createElement('tr');
			n1.appendChild(n2);
			n3 = document.createElement('td');
			n2.appendChild(n3);
			n4 = document.createElement('p');
			n4.classList.add('text');
			n4.classList.add('dayt');
			n3.appendChild(n4);
			n4.innerText = pvd.date.day.toString();
			n3 = document.createElement('td');
			n3.classList.add('tithiname');
			n2.appendChild(n3);
			n3.innerHTML = '<p class="tithiname"><span>' + pvd.GetFullTithiName()
				+ '</span><br><span style="color:sienna;font-size:80%;">' 
				+ pvd.astrodata.naksatraName
				+ ' Naksatra</span></p>';

			brw = 0;

			n1 = document.createElement('span');
			ncell.appendChild(n1);
			n1.classList.add('text');

			str = '';

			if (pvd.dayEvents.length > 0)
			{
				brw = 1;
				bSemicolon = false;
			}

			for(var ed of pvd.dayEvents)
			{
				var disp = ed.disp;
				if (disp == undefined || disp == -1 || gds.getValue(disp))
				{
					if (bSemicolon)
						str += "; ";
					bSemicolon=true;
					if (ed.spec != 1)
					{
						str += ed.text;
					}
					else
					{
						str += sprintf('<i>%s</i>', ed.text);
					}
				}
			}


			if (prevMas != pvd.astrodata.Masa)
			{
				if (brw)
					str += "<br>";
				brw = 1;
				str += sprintf('<b>[%s Masa]</b>', GCMasa.GetName(pvd.astrodata.Masa));
				prevMas = pvd.astrodata.Masa;
			}
			n1.innerHTML = str;
		}
	}

	for(var y = colNum; y < 7; y++)
	{
		ncell = document.createElement('td');
		nrow.appendChild(ncell);
		ncell.style.borderBottom = '1pt solid black';
		ncell.style.borderRight = '1pt solid black';
		ncell.style.padding = '3pt';
		ncell.innerHTML = '&nbsp;'
	}

	var m0 = [monthString(pvd.date.month, pvd.date.year, -2),
		monthString(pvd.date.month, pvd.date.year, -1),
		monthString(pvd.date.month, pvd.date.year, 0),
		monthString(pvd.date.month, pvd.date.year, 1),
		monthString(pvd.date.month, pvd.date.year, 2)];
	var m1 = [linkMonthString(pvd.date.month, pvd.date.year, -2),
		linkMonthString(pvd.date.month, pvd.date.year, -1),
		linkMonthString(pvd.date.month, pvd.date.year, 0),
		linkMonthString(pvd.date.month, pvd.date.year, 1),
		linkMonthString(pvd.date.month, pvd.date.year, 2)];
		
	n1 = document.createElement('p');
	nroot.appendChild(n1);
	n1.style.textAlign = 'center';
	n1.innerHTML = sprintf('<a href="?date=%s">&lt;&lt; %s</a> | <a href="?date=%s">&lt; %s</a> | %s | <a href="?date=%s">%s &gt;</a> | <a href="?date=%s">%s &gt;&gt;</a>',
		m1[0], m0[0], m1[1], m0[1], m0[2], m1[3], m0[3], m1[4], m0[4]);

	n1 = document.createElement('p');
	nroot.appendChild(n1);
	n1.style.textAlign = 'center';
	n1.style.marginTop = '16pt';
	n1.innerHTML = sprintf('<a href="?st=0">List Calendar</a>')

	return nroot;
} 
