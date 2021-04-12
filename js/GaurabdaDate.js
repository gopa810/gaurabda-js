
class GaurabdaDate {

	constructor() {
		this.tithi = 0
		this.masa = 0
		this.gyear = 500
	}

	Set(t,m,y) {
		this.tithi = t;
		this.masa = m;
		this.gyear = y;
	}

	next() {
		this.tithi++;
		if (this.tithi >= 30)
		{
			this.tithi %= 30;
			this.masa++;
		}
		if (this.masa >= 12)
		{
			this.masa %= 12;
			this.gyear++;
		}
	}

	prev() {
		if (this.tithi == 0)
		{
			if (this.masa == 0)
			{
				this.masa = 11;
				this.tithi = 29;
			}
			else
			{
				this.masa--;
				this.tithi = 29;
			}
		}
		else
		{
			this.tithi--;
		}
	}

	Set(va) {
		if (va instanceof GaurabdaDate) {
			this.tithi = va.tithi;
			this.masa = va.masa;
			this.gyear = va.gyear;
		}
	}

}
