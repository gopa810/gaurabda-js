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

