
    class TResultCoreEvents
    {
      constructor() {
        this.Full = false;
        this.Year = 2020;
        this.EarthLocation = new GCLocation();
        this.p_events = [];
      }

      Clear() {
          this.p_events = [];
      }

      //AddEvent(GregorianDateTime gTime, int inType, int inData)
      AddEvent(gTime, inType, inData)
      {
          var de = new TCoreEvent();
          var inTime = gTime.GetJulianComplete() * 86400;

          de.Time = inTime;
          de.nDst = 0;
          de.nData = inData;
          de.nType = inType;

          this.p_events.push(de);
          return true;
      }


      Sort()
      {
        this.p_events.sort(function(a,b) { a.Time - b.Time; })
      }


      LoadFile(filePath)
      {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
               this.p_events = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", filePath, true);
        xhttp.send();
      }

      SaveFile()
      {
        return JSON.stringify(this.p_events);
      }

      //CalculateEvents(GCLocation loc, int nYear)
      CalculateEvents(loc,nYear) {
          //GCSunData sun = new GCSunData();
          //DstTypeChange ndst = DstTypeChange.DstOff;
          var nData;
          var inEvents = this;
          this.Clear();
          this.EarthLocation = loc;
          this.Year = nYear;
          var vcStart = new GregorianDateTime(Year - 1, 12, 29);
          var vcEnd = new GregorianDateTime(Year + 1, 1, 2);

          var vc = new GregorianDateTime();
          var vcAdd = new GregorianDateTime();
          var vcNext = new GregorianDateTime();
          var earth = loc.GetEarthData();

          vc.Set(vcStart);
          vc.TimezoneHours = loc.OffsetUtcHours;
          vcAdd.Set(vc);
          vcAdd.InitWeekDay();

          /*while (vcAdd.IsBeforeThis(vcEnd))
          {
              ndst = loc.TimeZone.DetermineDaylightChange(vcAdd);
              vcAdd.NextDay();
          }*/


          if (Full || gds.getValue(GCDS.COREEVENTS_TITHI) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData, vcNext] = GCTithi.GetNextTithiStart(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      inEvents.AddEvent(vcNext, CoreEventType.CCTYPE_TITHI, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.2;
                  if (vcAdd.shour >= 1.0)
                  {
                      vcAdd.shour -= 1.0;
                      vcAdd.NextDay();
                  }
              }
          }

          if (Full || gds.getValue(GCDS.COREEVENTS_NAKSATRA) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData,vcNext] = GCNaksatra.GetNextNaksatra(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      inEvents.AddEvent(vcNext, CoreEventType.CCTYPE_NAKS, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.2;
                  if (vcAdd.shour >= 1.0)
                  {
                      vcAdd.shour -= 1.0;
                      vcAdd.NextDay();
                  }
              }
          }

          if (Full || gds.getValue(GCDS.COREEVENTS_YOGA) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData,vcNext] = GCYoga.GetNextYogaStart(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      inEvents.AddEvent(vcNext, CoreEventType.CCTYPE_YOGA, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.2;
                  if (vcAdd.shour >= 1.0)
                  {
                      vcAdd.shour -= 1.0;
                      vcAdd.NextDay();
                  }
              }
          }

          if (Full || gds.getValue(GCDS.COREEVENTS_SANKRANTI) != 0)
          {
              vcNext = new GregorianDateTime();
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              var nSan;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nSan,nData] = GCSankranti.GetNextSankranti(vcAdd, earth);
                  vcNext.Set(nSan);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      inEvents.AddEvent(vcNext, CoreEventType.CCTYPE_SANK, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.NextDay();
              }
          }

          if (Full || gds.getValue(GCDS.COREEVENTS_MOONRASI) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData,vcNext] = GCMoonData.GetNextMoonRasi(earth, vcAdd);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      inEvents.AddEvent(vcNext, CoreEventType.CCTYPE_M_RASI, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.shour += 0.5;
                  vcAdd.NormalizeValues();
              }

          }
          if (Full || gds.getValue(GCDS.COREEVENTS_CONJUNCTION) != 0)
          {
              var dlong;
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [dlong,vcNext] = GCConjunction.GetNextConjunction(vcAdd, true, earth);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      inEvents.AddEvent(vcNext, CoreEventType.CCTYPE_CONJ, GCRasi.GetRasi(dlong, GCAyanamsha.GetAyanamsa(vcNext.GetJulianComplete())));
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.NextDay();
              }
          }

          inEvents.Sort();
      }

      //GetCoreEvents(List<TCoreEvent> coreEvents, long utcDayStart, long utcDayEnd)
      GetCoreEvents(coreEvents, utcDayStart, utcDayEnd) {
          if (p_events.length == 0)
              return;

          var first = p_events[0];
          var last = p_events[p_events.Count - 1];

          if (first.Time > utcDayEnd || last.Time < utcDayStart || first.Time == last.Time)
              return;

          var indexf =  (utcDayStart - first.Time) * 1.0 * p_events.Count / (last.Time - first.Time);
          var index = parseInt(indexf.toString());
          var max = p_events.length - 1;
          while (index > 0 && index <= max && p_events[index].Time > utcDayStart)
              index--;

          while (index > 0 && index < max && p_events[index].Time < utcDayStart)
              index++;

          while(index > 0 && index < max && p_events[index].Time < utcDayEnd)
          {
              coreEvents.push(p_events[index]);
              index++;
          }
          return coreEvents;
      }
  }

  class TCoreEventCollection
  {
    constructor() {
      this.list = []
    }
    InsertByTime(/*TCoreEvent*/ coreEvent)
    {
      var i;
        for(i = 0; i < this.list.length; i++)
        {
            if (this.list[i].Time > coreEvent.Time)
            {
                this.list.splice(i, 0, coreEvent);
                return;
            }
        }

        this.list.push(coreEvent);
    }

    FindIndexOf(/*int*/ nType, /*int*/ idx) {
        if (idx < 0) {
            idx = 0;
        }
        var i;
        for(i = idx; i < Count; i++)
        {
            if (this.list[i].nType == nType)
                return i;
        }

        return -1;
    }

    FindBackIndexOf(/*int*/ nType, /*int*/ idx) {
        if (idx >= Count) {
            idx = Count - 1;
        }
        if (idx < 0) {
            return -1;
        }
        var i;

        for(i = idx; i >= 0; i--)
        {
            if (this.list[i].nType == nType)
                return i;
        }

        return -1;
    }
  }
