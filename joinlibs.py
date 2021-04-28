import re

text = ''
with open('calendar.html', 'rt') as cf:
    text = cf.read()

regex = r'<script src=[\"\']([a-zA-z/\.]+)[\"\']><\/script>'
files = [tup for tup in re.findall(regex, text)]

with open('gcal.js', 'wt') as outf:
    for filename in files:
        t = ''
        with open(filename, 'rt') as inf:
            t = inf.read()
        print('/***********************************************', file=outf)
        print('**    ', filename, file=outf)
        print(' **********************************************/', file=outf)
        print('', file=outf)
        print(t, file=outf)
        print('', file=outf)
