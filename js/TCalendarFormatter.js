

function getDayBkgColorCode(/*VAISNAVADAY */ p)
{
	if (p == null)
		return "";
	if (p.nFastID == FAST_EKADASI)
		return "#FFFFBB";
	if (p.nFastID != 0)
		return "#BBFFBB";
	return "";
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

	for (k = 0; k < daybuff.m_vcCount; k++)
	{
		pvd = daybuff.GetDay(k);
		if (pvd)
		{
			if (nPrevMasa != pvd.astrodata.nMasa)
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

			nPrevMasa = pvd.astrodata.nMasa;

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
			curCell.innerText = pvd.GetFullTithiName();
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

	return main;
}
 