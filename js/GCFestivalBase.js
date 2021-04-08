
var globalEventId = 1;

class GCFestivalBase
{
  static StringToSafe(s)
  {
      if (s == null)
          return string.Empty;
      return s.Replace("&", "&amp;").Replace("|", "&sep;");
  }

  static SafeToString(s)
  {
      return s.Replace("&amp;", "&").Replace("&sep;", "|");
  }

  static StringToInt(s,defaultValue)
  {
    if (s == null || s.length = 0) {
      return defaultValue
    }
    return parseInt(s);
  }

    /// returns true, if on exec.day(0) should be observed this event
    /// </summary>
    /// <param name="exec"></param>
    /// <returns></returns>
    static IsFestivalDay(days,idx,fb)
    {
        return false;
    }
}

class GCFestivalTithiMasa {

  // test if today is tithi of given masa, or day after tithi of given masa
  // while in second cas yesterday is tithi before given tithi and masa
  static TestFestival(days, index, fb, stickToMasa)
  {
      var yesterday = days[index - fb.DayOffset - 1];
      var today = days[index - fb.DayOffset];
      var tomorrow = days[index - fb.DayOffset + 1];

      if (today.astrodata.Masa == fb.masa && today.astrodata.sunRise.Tithi == fb.tithi)
      {
          if (yesterday.astrodata.Masa == fb.masa && yesterday.astrodata.sunRise.Tithi == fb.tithi)
              return false;
          else
              return true;
      }

      if (stickToMasa || GCMasa.IS_EXTRA(today.astrodata.Masa))
      {
          if (today.ksayaMasa == fb.masa && today.ksayaTithi == fb.tithi)
          {
              return true;
          }
      }
      else
      {
          if (yesterday.ksayaMasa == fb.masa && yesterday.ksayaTithi == fb.tithi)
          {
              return true;
          }
      }

      return false;
  }

  static IsFestivalDay(days, index, fb)
  {
      return TestFestival(days, index, fb, false);
  }
}

class GCFestivalMasaDay {
  IsFestivalDay(days,idx,fb)
  {
      return GCFestivalTithiMasa.TestFestival(days,idx,fb,true);
  }
}


class GCFestivalEkadasi {
  IsFestivalDay(days,idx,fb)
  {
      var testDay = days[idx-fb.DayOffset];

      return (testDay.astrodata.Masa == fb.masa
          && testDay.astrodata.sunRise.Paksa == fb.paksa
          && (GCTithi.TITHI_EKADASI(testDay.astrodata.sunRise.Tithi)
          || GCTithi.TITHI_DVADASI(testDay.astrodata.sunRise.Tithi))
          && testDay.nFastID == FastType.FAST_EKADASI);
  }
}


class GCFestivalSankranti {
  IsFestivalDay(days,idx,fb)
  {
      return (days[idx-fb.DayOffset].sankranti_zodiac == fb.sankranti);
  }
}

class GCFestivalSpecial {

  static IsFestivalDay(days,idx,fb)
  {
      var t = days[idx-fb.DayOffset];

      if (fb.masa1 <= fb.masa2)
      {
          if (t.astrodata.Masa < fb.masa1 || t.astrodata.Masa > fb.masa2)
              return false;
      }
      else
      {
          if (t.astrodata.Masa < fb.masa1 && t.astrodata.Masa > fb.masa2)
              return false;
      }

      return fb.script(days,idx);
  }
}
