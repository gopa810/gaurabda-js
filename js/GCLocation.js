class GCLocation {
  constructor() {
    this.Title = "";
    this.Longitude = 0.0;
    this.Latitude = 0.0;
    this.Altitude = 6378.0;
    this.p_timezone = TTimeZone.GetDefaultTimeZone();
    this.p_timezonename = this.p_timezone.Name;

    this.OffsetUtcHours = function() {
      if (this.TimeZone() == null) {
        return 0.0;
      }
      return this.TimeZone().OffsetMinutes / 60.0;
    }
    this.TimeZoneName = function() {
      return p_timezonename;
    }
    this.SetTimeZoneName = function(value) {
      this.p_timezonename = value;
      this.p_timezone = null;
    }
    this.TimeZone = function() {
      if (p_timezone != null) return p_timezone;
      p_timezone = TTimeZone.FindTimeZoneByName(p_timezonename);
      return p_timezone;
    }
    this.SetTimeZone = function(value) {
      p_timezone = value;
      p_timezonename = p_timezone.Name;
    }
    this.Country = null;
    this.CountryCode = function() {
      if (Country != null) return Country.ISOCode;
      return "";
    };
    this.SetCountryCode = function(value) {
      if (value == null || value == "")
          this.Country = null;
      this.Country = TCountry.FindCountryByISOCode(value);
    };
    this.FirstDayOfWeek = function() {
      if (this.Country != null)
          return this.Country.FirstDayOfWeek;
      return gds.getValue(GCDS.GENERAL_FIRST_DOW);
    }
  }
  // !!!!!!!!
  // when adding new properties, dont forget to modify EncodedString and DefaultEncodedString properties

  NewWithLocation(cl)
  {
      Set(cl);
  }

  NewWithData(/*TLocation*/ loc)
  {
    var L = new GCLocation();
    L.Title = loc.CityName + " (" + loc.Country.Name + ")";
    L.Longitude = loc.Longitude;
    L.Latitude = loc.Latitude;
    L.TimeZone = loc.TimeZone;
  }

  /*      public override bool Equals(object obj)
        {
            if (obj is GCLocation)
            {
                GCLocation arg = obj as GCLocation;
                return arg.Title.Equals(Title)
                    && arg.TimeZoneName.Equals(TimeZoneName)
                    && arg.GetLatitudeString().Equals(GetLatitudeString())
                    && arg.GetLongitudeString().Equals(GetLongitudeString());
            }
            else if (obj is string)
            {
                return (obj as string).Equals(GetFullName());
            }
            else
                return base.Equals(obj);
        }

        public void SetCoordinates(double longitude, double latitude)
        {
            Longitude = longitude;
            Latitude = latitude;
            if (TimeZone != null)
            {
                TimeZone.OffsetMinutes = GCMath.IntFloor((longitude - 7.5) / 15) * 60;
            }
        }
*/

    GetEarthData() {
        var e = new GCEarthData();
        e.TimeZone = TimeZone;
        e.latitudeDeg = Latitude;
        e.longitudeDeg = Longitude;
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

    GetFullName() {
      return this.Title + " (" +
         GCEarthData.GetTextLatitude(this.Latitude) + ", " +
         GCEarthData.GetTextLongitude(this.Longitude) + ", Timezone: " +
         this.TimeZoneName;
    }

    isLetter(str) {
      return str.length === 1 && str.match(/[a-z]/i);
    }

    GetNameAsFileName() {
        var m = 0;
        var sb = "";
        var i;
        for (i = 0; i < this.Title.length; i++) {
          var c = this.Title[i];
          if (isLetter(c))
          {
              if (m == 0) {
                  sb += c.toUpper();
              } else {
                  sb += c.toLower();
              }
              m = 1;
          }
          else
          {
              m = 0;
          }
        }
        return sb.ToString();
    }

    EncodedString() {
        if (this.Title == null)
            return "";
        return GCFestivalBase.StringToSafe(this.Title) + "|" +
            this.Longitude.toString() + "|" + this.Latitude.toString() + "|" +
            this.TimeZoneName + "|" + this.CountryCode;
    }
    SetEncodedString(value) {
      if (value == null) {
          Title = null;
          return;
      }
      var a = value.split("|");
      if (a.length >= 4)
      {
          var LO = parseFloat(a[1]);
          var LA = parseFloat(a[2]);

          this.Title = GCFestivalBase.SafeToString(a[0]);
          this.Longitude = LO;
          this.Latitude = LA;
          this.TimeZoneName = a[3];
      }
      if (a.Length >= 5)
      {
          this.CountryCode = a[4];
      }
    }

    static DefaultEncodedString()
    {
        return "Vrindavan (India)|77.73|27.583|Asia/Calcutta|IN";
    }
}
