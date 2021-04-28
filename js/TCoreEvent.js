


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
