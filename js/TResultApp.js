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
