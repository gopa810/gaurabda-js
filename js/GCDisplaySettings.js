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
