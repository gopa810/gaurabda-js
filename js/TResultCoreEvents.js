
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
        this.p_events.sort(function(a,b) { return a.Time - b.Time; })
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
      CalculateEvents(loc,nYear,nMonth) {
          //GCSunData sun = new GCSunData();
          //DstTypeChange ndst = DstTypeChange.DstOff;
          var nData;
          this.Clear();
          this.EarthLocation = loc;
          this.Year = nYear;
          var vcStart = GregorianDateTime.fromComponents(this.Year - 1, 12, 29);
          var vcEnd = GregorianDateTime.fromComponents(this.Year + 1, 1, 2);
          if (nMonth != undefined) {
              vcStart = GregorianDateTime.fromComponents(nYear, nMonth, 1);
              vcEnd = GregorianDateTime.fromComponents(nYear, nMonth, GregorianDateTime.GetMonthMaxDays(nYear,nMonth));
          }

          var vc = GregorianDateTime.fromDate(vcStart).setOffset(loc.OffsetUtcHours);
          var vcAdd = GregorianDateTime.fromDate(vc).InitWeekDay();
          var vcNext = new GregorianDateTime();
          var earth = loc.GetEarthData();

          /*while (vcAdd.IsBeforeThis(vcEnd))
          {
              ndst = loc.TimeZone.DetermineDaylightChange(vcAdd);
              vcAdd.NextDay();
          }*/


          if (this.Full || gds.getValue(GCDS.COREEVENTS_TITHI) != 0)
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
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_TITHI, nData);
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

          if (this.Full || gds.getValue(GCDS.COREEVENTS_NAKSATRA) != 0)
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
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_NAKS, nData);
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

          if (this.Full || gds.getValue(GCDS.COREEVENTS_YOGA) != 0)
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
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_YOGA, nData);
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

          if (this.Full || gds.getValue(GCDS.COREEVENTS_SANKRANTI) != 0)
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
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_SANK, nData);
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.NextDay();
              }
          }

          if (this.Full || gds.getValue(GCDS.COREEVENTS_MOONRASI) != 0)
          {
              vcAdd.Set(vc);
              vcAdd.shour = 0.0;
              var vmr;
              while (vcAdd.IsBeforeThis(vcEnd))
              {
                  [nData, vmr] = GCMoonData.GetNextMoonRasi(earth, vcAdd);
                  vcNext.Set(vmr);
                  if (vcNext.GetDayInteger() < vcEnd.GetDayInteger())
                  {
                      //vcNext.InitWeekDay();
                      //ndst = loc.TimeZone.DetermineDaylightChange(vcNext);
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_M_RASI, nData);
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
          if (this.Full || gds.getValue(GCDS.COREEVENTS_CONJUNCTION) != 0)
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
                      this.AddEvent(vcNext, CoreEventType.CCTYPE_CONJ, GCRasi.GetRasi(dlong, GCAyanamsha.GetAyanamsa(vcNext.GetJulianComplete())));
                  }
                  else
                  {
                      break;
                  }
                  vcAdd.Set(vcNext);
                  vcAdd.NextDay();
              }
          }

          this.Sort();
      }

      //GetCoreEvents(List<TCoreEvent> coreEvents, long utcDayStart, long utcDayEnd)
        GetCoreEvents(coreEvents, utcDayStart, utcDayEnd) {
            for(var ce of this.p_events) {
                if (ce.Time >= utcDayStart && ce.Time < utcDayEnd) {
                    coreEvents.push(ce);
                }
            }
          return coreEvents;
        }
    }

  class TCoreEventCollection
  {
    constructor() {
      this.list = []
    }
    length() {
        return this.list.length;
    }
    push(a) 
    {
        this.list.push(a)
    }

    items() {
        return this.list;
    }

    item(idx) {
        return this.list[idx];
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
        for(i = idx; i < this.list.length; i++)
        {
            if (this.list[i].nType == nType)
                return i;
        }

        return -1;
    }

    FindBackIndexOf(/*int*/ nType, /*int*/ idx) {
        if (idx >= this.list.length) {
            idx = this.list.length - 1;
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
