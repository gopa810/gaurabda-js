var g_location = null;
var g_start_date = new GregorianDateTime();

console.log(location);
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    if (key=='date') {
        g_start_date = GregorianDateTime.fromTriplet(value);
    } else if (key == 'bloc') {
        g_location = GCLocation.FindByName(value);
    }
}

//GCDisplaySettings.Reset()
if (g_location == null) {
    var loctext = window.localStorage.getItem('location');
    if (loctext != null && loctext != undefined) {
        var d = JSON.parse(loctext);
        g_location = new GCLocation(d);
    } else {
        g_location = GCLocation.FindByName("Bratislava");
        window.localStorage.setItem('location', g_location.Encoded);
    }
}

function calcCalendar(d1) {
    //document.write('<h2>Calendar</h2>');
    tc = new TResultCalendar();
    tc.CalculateCalendar(g_location, d1, 20);

    var elem = writeCalendarHtml(tc);
    var epar = document.getElementById('calendarText');
    while (epar.lastChild) {
        epar.removeChild(epar.lastChild);
    }
    epar.appendChild(elem);
  }


function setTab(tb) {
    function gd3(a) {
        return a == tb ? 'block' : 'none';
    }
    document.getElementById('calendarText').style.display = gd3('cal');
    document.getElementById('selectLoc').style.display = gd3('loc');
}

function setStartDate(dateTriplet) {
    g_start_date = GregorianDateTime.fromTriplet(dateTriplet);
    calcCalendar(g_start_date);
}

function setLoc(locEnc) {
    window.localStorage.setItem('location', locEnc);
    var locData = JSON.parse(locEnc);
    g_location = new GCLocation(locData);
    calcCalendar(g_start_date);
    setTab('cal');
}

function findLoc(srcId, targetId) {
    var text = document.getElementById(srcId).value;
    var target = document.getElementById(targetId);
    var locs = GCLocation.Search(text);
    while (target.lastChild) {
        target.removeChild(target.lastChild);
    }
    if (locs.length == 0) {
        var el = document.createElement('div');
        el.innerText = sprintf('No locations for \'%s\'', text);
        target.appendChild(el);
    } else {
        for (var L of locs) {
            var el = document.createElement('div');
            el.style.borderBottom = '1px solid gray';
            el.style.padding = '4px';
            el.style.cursor = 'pointer';
            el.setAttribute('data_loc', L.Encoded);
            el.onclick = function() {
                setLoc(this.getAttribute('data_loc'));
            }
            var subel = document.createElement('span');
            subel.style.fontSize = '120%';
            subel.innerText = L.Title;
            el.appendChild(subel);
            el.appendChild(document.createElement('br'));
            subel = document.createElement('span');
            subel.innerText = L.GetCoordinatesText();
            el.appendChild(subel);
            target.appendChild(el);
        }
    }
}

