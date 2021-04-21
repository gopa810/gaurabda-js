
function sprintf_convert_value(a, arg) {
  var res = ''
  var sign = a[0];
  var numb = a[1];
  var typ = a[2];
  var padding = ' '
  var digits = 0;
  var value = '';

  if (typ === 'd') {
    if (numb[0] === '0') {
      padding = '0';
    }
    digits = parseInt(numb, 10);
    value = arg.toString();
    while (value.length < digits) {
      value = padding + value;
    }
    res = value;
  } else if (typ === 'f') {
    var wp = '';
    var dp = '';
    var ppos = numb.split('.');
    ppos.push('')
    wp = ppos[0];
    dp = ppos[1];
    value = arg.toString();
    var vpos = value.split('.')
    var v1 = vpos[0]
    var v2 = ''
    if (wp !== '') {
      digits = parseInt(wp, 10);
      while (v1.length < digits) {
        v1 = ' ' + v1;
      }      
    }
    if (dp !== '') {
      digits = parseInt(dp, 10);
      if (vpos.length === 1) {
        v2 = '.';
      } else {
        v2 = '.' + vpos[1];
      }
      while (v2.length <= digits) {
        v2 += '0';
      }
      if (v2.length > digits + 1) {
        v2 = v2.substr(0, digits + 1);
      }
    }
    res = v1 + v2;
  } else if (typ === 's') {
    digits = parseInt(numb, 10);
    value = arg == undefined ? "(undefined)" : arg.toString();
    if ((sign === null && digits>0) || sign==='+') {
      while (value.length < digits) {
        value += padding;
      }
    } else if (sign ==='-') {
      while (value.length < digits) {
        value = padding + value;
      }
    }
    res = value;
  } else {
    res = arg.toString();    
  }
  return res;
}

function sprintf(fmt, ...args) {
  var curarg = 0;
  var res = ''
  var mode = 0;
  var sign = null;
  var numb = '';
  var typ = null;
  for (var c of fmt) {
    if (mode===0) {
      if (c==='%') {
        mode = 1;
        continue;
      } else {
        res += c;
      }
    }
    if (mode === 1) {
      if (c === '%') {
        res += c;
      } else {
        mode = 2;
      }
    }
    if (mode === 2) {
      if (c === '-' || c === '+') {
        sign = c;
      } else if ((c >= '0' && c <= '9') || c === '.') {
        numb += c;
      } else if (c >= 'a' && c <= 'z') {
        typ = c;
        res += sprintf_convert_value([sign, numb, typ], args[curarg])
        sign = null;
        numb = '';
        typ = '';
        curarg += 1
        mode = 0;
      }
    }
  }
  return res;
}
