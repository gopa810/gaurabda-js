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

