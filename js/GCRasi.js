
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
