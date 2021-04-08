
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