import codecs
import re

#
# Utility for joining all Javascript into single file
#

text = ''
with open('index.html', 'rt', encoding='utf-8') as cf:
    text = cf.read()
    text = text.strip()

regex = r'<script src=[\"\']([a-zA-z/\.]+)[\"\']><\/script>'
files = [tup for tup in re.findall(regex, text)]

with open('release/gcal.js', 'wb') as outf:
    for filename in files:
        t = b''
        with open(filename, 'rb') as inf:
            t = inf.read()
        outf.write(b'/***********************************************')
        outf.write(('**    ' + filename).encode('utf-8'))
        outf.write(b' **********************************************/')
        outf.write(b'\r\n')
        t = t.replace(codecs.BOM_UTF8, b'')
        outf.write(t)
        outf.write(b'\r\n')
