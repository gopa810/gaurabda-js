

function getDayBkgColorCode(/*VAISNAVADAY */ p)
{
	if (p == null)
		return "";
	if (p.nFastID == FastType.FAST_EKADASI)
		return "#FFFFBB";
	if (p.nFastID != 0)
		return "#BBFFBB";
	return "";
}

function getDateRangeText(d1, d2) {
	return sprintf(" %s %d - %s %d ", 
		GregorianDateTime.GetMonthAbreviation(d1.month), d1.day,
		GregorianDateTime.GetMonthAbreviation(d2.month), d2.day);
}
/******************************************************************************************/
/*                                                                                        */
/******************************************************************************************/
function writeCalendarHtml(daybuff)
{
	var k;
	var str, st;
	var pvd;
	var nPrevMasa = -1;

	var xml = document;
	var curTable = null;
	var curRow = null;
	var curCell = null;
	var main = document.createElement('div');
	var pp, sp;

	var thisStart = daybuff.GetDay(0).date;
	var dates = [ thisStart.cloneDays(-daybuff.m_vcCount),
				  thisStart.cloneDays(-1),
				  thisStart,
				  thisStart.cloneDays(daybuff.m_vcCount - 1),
				  thisStart.cloneDays(daybuff.m_vcCount),
				  thisStart.cloneDays(2*daybuff.m_vcCount - 1)];

	for (k = 0; k < daybuff.m_vcCount; k++)
	{
		pvd = daybuff.GetDay(k);
		if (pvd)
		{
			if (nPrevMasa != pvd.astrodata.Masa)
			{
				pp = document.createElement('p');
				pp.style.textAlign = 'center';
				pp.style.fontWeight = 'bold';
				main.appendChild(pp);

				sp = document.createElement('span');
				sp.style.fontSize = '14pt';
				if (nPrevMasa == MasaId.ADHIKA_MASA) {
					sp.innerText = sprintf('%s Masa %s', GCMasa.GetName(pvd.astrodata.Masa), GCStrings.getString(109));
				} else {
					sp.innerText = sprintf('%s Masa', GCMasa.GetName(pvd.astrodata.Masa));
				}
				pp.appendChild(sp);
				pp.appendChild(document.createElement('br'));
				
				sp = document.createElement('span');
				sp.style.fontSize = '10pt';
				sp.innerText = sprintf('Gaurabda %d', pvd.astrodata.GaurabdaYear);
				pp.appendChild(sp);
				pp.appendChild(document.createElement('br'));
				
				sp = document.createElement('span');
				sp.className = 'loclink';
				//sp.style.fontSize = '10pt';
				//sp.style.color = 'blue';
				//sp.style.cursor = 'pointer';
				sp.innerText = daybuff.m_Location.GetFullName();
				sp.onclick = function() {
					setTab('loc');
				};
				pp.appendChild(sp);
				pp.appendChild(document.createElement('br'));

				/* link to prev date range */
				sp = document.createElement('span');
				sp.className = 'datelink';
				sp.onclick = function() {
					setStartDate(this.getAttribute('data_start'));
				}
				sp.setAttribute('data_start', dates[0].triplet);
				sp.innerText = sprintf(" %s %s ", getDateRangeText(dates[0], dates[1]), String.fromCharCode(10096));
				pp.appendChild(sp);
				/* info about current date range */
				sp = document.createElement('span');
				sp.className = 'datelinkbase';
				sp.innerText = getDateRangeText(dates[2], dates[3]);
				pp.appendChild(sp);
				/* link to next date range */
				sp = document.createElement('span');
				sp.className = 'datelink';
				sp.onclick = function() {
					setStartDate(this.getAttribute('data_start'));
				}
				sp.setAttribute('data_start', dates[4].triplet);
				sp.innerText = sprintf(" %s %s ", String.fromCharCode(10097), getDateRangeText(dates[4], dates[5]));
				pp.appendChild(sp);

				/* calendar days are in the table  */
				curTable = document.createElement('table');
				curTable.align = 'center';
				main.appendChild(curTable);

				curRow = document.createElement('tr');
				curTable.appendChild(curRow);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.colSpan = 2;
				curCell.innerText = 'DATE';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'TITHI';
				curCell.style.minWidth = '20em';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'P';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'NAKSATRA';
				curRow.appendChild(curCell);

				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'YOGA';
				curRow.appendChild(curCell);

				
				curCell = document.createElement('td');
				curCell.className = 'hed';
				curCell.innerText = 'FAST';
				curRow.appendChild(curCell);
			}

			nPrevMasa = pvd.astrodata.Masa;

			curRow = document.createElement('tr');
			curTable.appendChild(curRow);

			// date data
			curCell = document.createElement('td');
			curCell.innerText = pvd.date.toString();
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			st = GCStrings.getString(pvd.date.dayOfWeek);
			curCell.innerText = st.substring(0, 2);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.setAttribute('data_dets', 'd' + k.toString());
			curCell.onclick = function() {
				var a = this.getAttribute('data_dets');
				var el1 = document.getElementById(a);
				if (el1.style.display == 'none') {
					el1.style.display = 'block';
				} else {
					el1.style.display = 'none';
				}
			}
			//curCell.innerText = pvd.GetFullTithiName();
			sp = document.createElement('span');
			sp.className = 'clickable_tithi_name';
			sp.innerText = pvd.GetFullTithiName();
			curCell.appendChild(sp);
			pp = document.createElement('div');
			pp.style.paddingLeft = 20;
			pp.style.marginTop = 16;
			pp.style.marginBottom = 16;
			pp.style.display = 'none';
			pp.id = 'd' + k.toString();
			curCell.appendChild(pp);
			for (var ce of pvd.coreEvents.items())
			{
				sp = document.createElement('p');
				sp.className = 'core-events';
				sp.innerText = sprintf("%s %s", ce.TypeString(), ce.getTimeString(pvd.UtcDayStart));
				pp.appendChild(sp);
			}
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.innerText = GCPaksa.GetAbbr(pvd.astrodata.sunRise.Paksa);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.innerText = GCNaksatra.GetName(pvd.astrodata.sunRise.Naksatra);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.innerText = GCYoga.GetName(pvd.astrodata.sunRise.Yoga);
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			if (pvd.nFastID != FastType.FAST_NULL) {
				curCell.innerText = '*';
			}
			curRow.appendChild(curCell);


			curRow = document.createElement('tr');
			curTable.appendChild(curRow);
			curCell = document.createElement('td');
			curCell.colSpan = 2;
			curRow.appendChild(curCell);

			curCell = document.createElement('td');
			curCell.colSpan = 4;
			curRow.appendChild(curCell);

			for(var ed of pvd.dayEvents)
			{
				var disp = ed.disp;
				if (disp == undefined || disp == -1 || gds.getValue(disp))
				{
					if (ed.spec == 1)
					{
						sp = document.createElement('span');
						sp.style.color = 'blue';
						sp.innerText = ed.text;
						curCell.appendChild(sp);
					}
					else
					{
						curCell.appendChild(document.createTextNode(ed.text));
					}
					curCell.appendChild(document.createElement('br'));
				}
			}
		}
	}

	pp = document.createElement('hr');
	pp.align = 'center';
	pp.width = '65%';
	main.appendChild(pp);

	pp = document.createElement('p');
	pp.align = 'center';
	pp.innerText = sprintf('Generated by %s', GCStrings.getString(130));
	main.appendChild(pp);


	pp = document.createElement('p');
	main.appendChild(pp);
	pp.style.textAlign = 'center';
	pp.style.marginTop = '16pt';
	pp.innerHTML = sprintf('<a href="?st=1">Table Calendar</a>')

	return main;
}

function monthString(m, y, o) {
	while (o > 0) {
		m += 1;
		o -= 1;
		if (m > 12) {
			m = 1;
			y += 1;
		}
	}
	while (o < 0) {
		m -= 1;
		o += 1;
		if (m < 1) {
			m = 12;
			y -= 1;
		}
	}
	return sprintf("%s %d", GCStrings.getString(m + 759), y)
}

function linkMonthString(m, y, o) {
	while (o > 0) {
		m += 1;
		o -= 1;
		if (m > 12) {
			m = 1;
			y += 1;
		}
	}
	while (o < 0) {
		m -= 1;
		o += 1;
		if (m < 1) {
			m = 12;
			y -= 1;
		}
	}
	return sprintf("%04d-%02d-01", y, m);
}

function writeTableHtml(daybuff)
{
	let g_firstday_in_week = daybuff.m_Location.FirstDayOfWeek;
	var str, st;
	var nroot, ntable, nrow, ncell;
	var n1, n2, n3, n4;
	var pvd;
	var nPrevMonth = -1;
	var prevMas = -1;
	var brw = 0;
	var isFirstRow = true;
	var isFirstCol = true;
	var colNum = 0;

	// first = 1
	//int i_end[7] = {0, 6, 5, 4, 3, 2, 1}; //(6-(i-first))%7
	//int i_beg[7] = {6, 0, 1, 2, 3, 4, 5}; //(i-first)%7

	nroot = document.createElement('div');

	var masa_str = '';
	for (var k=0; k < daybuff.m_vcCount; k++) {
		pvd = daybuff.GetDay(k);
		if (prevMas<0) {
			prevMas = pvd.astrodata.Masa;
			masa_str += sprintf("%s Masa ", GCMasa.GetName(prevMas));
		}
		if (pvd.astrodata.Masa != prevMas) {
			masa_str += sprintf(" till %s", pvd.Previous.date.toString());
			masa_str += sprintf(", %s Masa ", GCMasa.GetName(pvd.astrodata.Masa));
			masa_str += sprintf(" from %s", pvd.date.toString());
			prevMas = pvd.astrodata.Masa;
		}
	}

	for (var k = 0; k < daybuff.m_vcCount; k++)
	{
		pvd = daybuff.GetDay(k);
		if (pvd)
		{
			var bSemicolon = false;
			var bBr = false;
			var lwd = pvd.date.dayOfWeek;
			if (nPrevMonth != pvd.date.month)
			{
				if (nPrevMonth != -1)
				{
					for(var y = colNum; y < 7; y++)
					{
						ncell = document.createElement('td');
						ncell.style.border = 'solid windowtext 1pt';
						ncell.style.padding = '3pt 3pt 3pt 3pt';
						ncell.innerHTML = '&nbsp;'
						nrow.appendChild(ncell);
						colNum += 1;
					}
					n1 = document.createElement('p');
					n1.innerHTML = '&nbsp;';
					nroot.appendChild(n1);
				}
				ntable = document.createElement('table');
				nroot.appendChild(ntable);
				ntable.width = '100%';
				ntable.border=0;
				ntable.frame='bottom';
				ntable.cellSpacing = 0;
				ntable.cellPadding = 0;

				nrow = document.createElement('tr');
				ntable.appendChild(nrow);

				ncell = document.createElement('td');
				ncell.width = '60%';
				nrow.appendChild(ncell);
				n1 = document.createElement('p');
				n1.className = 'month'
				ncell.appendChild(n1);
				n1.innerHTML = sprintf("%s %d<br><span class='tnote'>%s</span>", 
							GCStrings.getString(pvd.date.month + 759), 
							pvd.date.year,
							masa_str);

				ncell = document.createElement('td');
				nrow.appendChild(ncell);
				n1 = document.createElement('p');
				ncell.appendChild(n1);
				n1.classList.add('tnote');
				n1.style.textAlign = 'right';
				n1.innerHTML = sprintf("%s<br>Timezone: %s",
					daybuff.m_Location.GetLocationText(),
					daybuff.m_Location.GetTimeZoneText());

				nroot.appendChild(document.createElement('hr'));
				nPrevMonth = pvd.date.month;

				ntable = document.createElement('table');
				nroot.appendChild(ntable);
				ntable.width = '100%';
				ntable.cellPadding = 0;
				ntable.cellSpacing = 0;

				nrow = document.createElement('tr');
				ntable.appendChild(nrow);
				for(var y = 0; y < 7; y++)
				{
					ncell = document.createElement('td');
					ncell.width = '14%';
					ncell.align = 'center';
					ncell.style.fontSize = '10pt';
					ncell.style.border = 'none';
					ncell.innerText = GCStrings.getString((y + g_firstday_in_week) % 7);
					nrow.appendChild(ncell);
				}
				nrow = document.createElement('tr');
				ntable.appendChild(nrow);
				colNum = 0;
				for(var y = g_firstday_in_week; y < pvd.date.dayOfWeek; y++) {
					ncell = document.createElement('td');
					ncell.style.borderBottom = '1pt solid black';
					ncell.style.borderRight = '1pt solid black';
					if (isFirstCol) {
						ncell.style.borderLeft = '1pt solid black';
					}
					ncell.style.borderTop = '1pt solid black';
					ncell.style.padding = '3pt 3pt 3pt 3pt';
					ncell.innerHTML = '&nbsp;'
					nrow.appendChild(ncell);
					colNum += 1;
					isFirstCol = false;
				}
			}
			else
			{
				if (pvd.date.dayOfWeek == g_firstday_in_week) {
					nrow = document.createElement('tr');
					ntable.appendChild(nrow);
					isFirstRow = false;
					isFirstCol = true;
					colNum = 0;
				}
			}

			// date data
			ncell = document.createElement('td');
			ncell.vAlign = 'top';
			ncell.style.borderBottom = '1pt solid black';
			ncell.style.borderRight = '1pt solid black';
			if (isFirstCol) {
				ncell.style.borderLeft = '1pt solid black';
			}
			if (isFirstRow) {
				ncell.style.borderTop = '1pt solid black';
			}
			ncell.style.padding = '3pt';
			ncell.style.overflow = 'hidden';
			ncell.bgColor = getDayBkgColorCode(pvd);
			ncell.height = '120px';
			nrow.appendChild(ncell);
			colNum += 1;
			isFirstCol = false;

			n1 = document.createElement('table');
			ncell.appendChild(n1);
			n1.width = '100%';
			n1.border = 0;
			n2 = document.createElement('tr');
			n1.appendChild(n2);
			n3 = document.createElement('td');
			n2.appendChild(n3);
			n4 = document.createElement('p');
			n4.classList.add('text');
			n4.classList.add('dayt');
			n3.appendChild(n4);
			n4.innerText = pvd.date.day.toString();
			n3 = document.createElement('td');
			n3.classList.add('tithiname');
			n2.appendChild(n3);
			n3.innerHTML = '<p class="tithiname"><span>' + pvd.GetFullTithiName()
				+ '</span><br><span style="color:sienna;font-size:80%;">' 
				+ pvd.astrodata.naksatraName
				+ ' Naksatra</span></p>';

			brw = 0;

			n1 = document.createElement('span');
			ncell.appendChild(n1);
			n1.classList.add('text');

			str = '';

			if (pvd.dayEvents.length > 0)
			{
				brw = 1;
				bSemicolon = false;
			}

			for(var ed of pvd.dayEvents)
			{
				var disp = ed.disp;
				if (disp == undefined || disp == -1 || gds.getValue(disp))
				{
					if (bSemicolon)
						str += "; ";
					bSemicolon=true;
					if (ed.spec != 1)
					{
						str += ed.text;
					}
					else
					{
						str += sprintf('<i>%s</i>', ed.text);
					}
				}
			}


			if (prevMas != pvd.astrodata.Masa)
			{
				if (brw)
					str += "<br>";
				brw = 1;
				str += sprintf('<b>[%s Masa]</b>', GCMasa.GetName(pvd.astrodata.Masa));
				prevMas = pvd.astrodata.Masa;
			}
			n1.innerHTML = str;
		}
	}

	for(var y = colNum; y < 7; y++)
	{
		ncell = document.createElement('td');
		nrow.appendChild(ncell);
		ncell.style.borderBottom = '1pt solid black';
		ncell.style.borderRight = '1pt solid black';
		ncell.style.padding = '3pt';
		ncell.innerHTML = '&nbsp;'
	}

	var m0 = [monthString(pvd.date.month, pvd.date.year, -2),
		monthString(pvd.date.month, pvd.date.year, -1),
		monthString(pvd.date.month, pvd.date.year, 0),
		monthString(pvd.date.month, pvd.date.year, 1),
		monthString(pvd.date.month, pvd.date.year, 2)];
	var m1 = [linkMonthString(pvd.date.month, pvd.date.year, -2),
		linkMonthString(pvd.date.month, pvd.date.year, -1),
		linkMonthString(pvd.date.month, pvd.date.year, 0),
		linkMonthString(pvd.date.month, pvd.date.year, 1),
		linkMonthString(pvd.date.month, pvd.date.year, 2)];
		
	n1 = document.createElement('p');
	nroot.appendChild(n1);
	n1.style.textAlign = 'center';
	n1.innerHTML = sprintf('<a href="?date=%s">&lt;&lt; %s</a> | <a href="?date=%s">&lt; %s</a> | %s | <a href="?date=%s">%s &gt;</a> | <a href="?date=%s">%s &gt;&gt;</a>',
		m1[0], m0[0], m1[1], m0[1], m0[2], m1[3], m0[3], m1[4], m0[4]);

	n1 = document.createElement('p');
	nroot.appendChild(n1);
	n1.style.textAlign = 'center';
	n1.style.marginTop = '16pt';
	n1.innerHTML = sprintf('<a href="?st=0">List Calendar</a>')

	return nroot;
} 