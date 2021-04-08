
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