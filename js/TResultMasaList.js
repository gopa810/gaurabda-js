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
