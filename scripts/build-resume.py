"""Generate public resume assets from the same data used by the portfolio.

Run node scripts/export-resume.mjs first. Requires reportlab; no private sources.
"""
from pathlib import Path
import hashlib
import html
import json
import os
import reportlab

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
source = ROOT / '.cache' / 'resume.json'
data = json.loads(source.read_text(encoding='utf-8'))
out = ROOT / 'public' / 'resume'
out.mkdir(parents=True, exist_ok=True)
pdf_path = out / 'Kyle_Willems_Resume.pdf'

font_dir = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts'
font_files = ['arial.ttf', 'arialbd.ttf', 'ariali.ttf', 'arialbi.ttf']
if not (font_dir / font_files[0]).exists():
    font_dir = Path(reportlab.__file__).parent / 'fonts'
    font_files = ['Vera.ttf', 'VeraBd.ttf', 'VeraIt.ttf', 'VeraBI.ttf']
for name, file in zip(['ResumeSans', 'ResumeSans-Bold', 'ResumeSans-Italic', 'ResumeSans-BoldItalic'], font_files):
    pdfmetrics.registerFont(TTFont(name, str(font_dir / file)))
pdfmetrics.registerFontFamily('ResumeSans', normal='ResumeSans', bold='ResumeSans-Bold', italic='ResumeSans-Italic', boldItalic='ResumeSans-BoldItalic')

styles = {
    'name': ParagraphStyle('Name', fontName='Helvetica-Bold', fontSize=21, leading=24, spaceAfter=5, textColor=colors.black),
    'headline': ParagraphStyle('Headline', fontName='Helvetica', fontSize=8.6, leading=12, spaceAfter=4),
    'link': ParagraphStyle('Link', fontName='Helvetica', fontSize=9, leading=12, spaceAfter=11),
    'section': ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=10.3, leading=13, spaceBefore=7, spaceAfter=4, keepWithNext=True),
    'entry': ParagraphStyle('Entry', fontName='Helvetica-Bold', fontSize=9.5, leading=11.5, spaceBefore=1, spaceAfter=1, keepWithNext=True),
    'meta': ParagraphStyle('Meta', fontName='Helvetica-Oblique', fontSize=9, leading=11.3, spaceAfter=2, keepWithNext=True),
    'body': ParagraphStyle('Body', fontName='Helvetica', fontSize=9.5, leading=11.5, spaceAfter=2, alignment=TA_LEFT),
    'bullet': ParagraphStyle('Bullet', fontName='Helvetica', fontSize=9.5, leading=11.5, leftIndent=10, firstLineIndent=0, bulletIndent=0, spaceAfter=2),
}
for style in styles.values():
    style.fontName = style.fontName.replace('Helvetica', 'ResumeSans').replace('-Oblique', '-Italic')
for key in ['body', 'bullet', 'entry']:
    styles[key].fontSize = 10.2
    styles[key].leading = 12.5

def para(text, style):
    return Paragraph(html.escape(text), styles[style])

story = [para(data['name'].upper(), 'name'), para(data['headline'].upper(), 'headline')]
story.append(Paragraph('<link href="' + data['linkedIn'] + '">linkedin.com/in/kyle-willems</link>', styles['link']))
for section in data['sections']:
    story.append(para(section['title'].upper(), 'section'))
    for entry in section['entries']:
        if section['id'] == 'skills' and len(entry.get('paragraphs', [])) == 1:
            story.append(Paragraph('<b>' + html.escape(entry['title']) + ':</b> ' + html.escape(entry['paragraphs'][0]), styles['body']))
            story.append(Spacer(1, 2))
            continue
        entry_heading = html.escape(entry['title'])
        if entry.get('meta'):
            entry_heading += ' <font name="ResumeSans" size="9.3">| ' + html.escape(entry['meta']) + '</font>'
        story.append(Paragraph(entry_heading, styles['entry']))
        for text in entry.get('paragraphs', []):
            story.append(para(text, 'body'))
        for text in entry.get('bullets', []):
            story.append(Paragraph(html.escape(text), styles['bullet'], bulletText='\u2022'))
        story.append(Spacer(1, 1))

def footer(canvas, doc):
    canvas.setTitle('Kyle Willems - Cybersecurity and IT Resume')
    canvas.setAuthor('Kyle Willems')
    canvas.setSubject('Public professional resume - November 2026')
    canvas.setCreator('Kyle Willems Portfolio')
    canvas.setFont('ResumeSans', 8)
    canvas.setFillColor(colors.HexColor('#505050'))
    canvas.drawString(38, 24, 'Kyle Willems | ' + data['version'])
    canvas.drawRightString(letter[0] - 38, 24, str(doc.page))

doc = SimpleDocTemplate(str(pdf_path), pagesize=letter, leftMargin=38, rightMargin=38,
                        topMargin=30, bottomMargin=38, title='Kyle Willems Resume',
                        author='Kyle Willems', allowSplitting=True)
doc.build(story, onFirstPage=footer, onLaterPages=footer)

parts = []
for section in data['sections']:
    parts.append('<section aria-labelledby="' + section['id'] + '"><h2 id="' + section['id'] + '">' + html.escape(section['title']) + '</h2>')
    for entry in section['entries']:
        parts.append('<article><h3>' + html.escape(entry['title']) + '</h3>')
        if entry.get('meta'):
            parts.append('<p class="meta">' + html.escape(entry['meta']) + '</p>')
        parts.extend('<p>' + html.escape(text) + '</p>' for text in entry.get('paragraphs', []))
        if entry.get('bullets'):
            parts.append('<ul>' + ''.join('<li>' + html.escape(text) + '</li>' for text in entry['bullets']) + '</ul>')
        parts.append('</article>')
    parts.append('</section>')

page = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Kyle Willems — cybersecurity and IT resume, experience, hands-on training, certifications, and education.">
<meta name="theme-color" content="#16212e"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="resume.css"><title>Kyle Willems | Resume</title></head><body>
<a class="skip" href="#resume-main">Skip to resume</a><nav aria-label="Resume actions"><a href="/">← Portfolio</a>
<a class="download" href="Kyle_Willems_Resume.pdf" download>Download PDF</a></nav>
<main id="resume-main"><header><h1>Kyle Willems</h1><p class="position">''' + html.escape(data['headline']) + '''</p>
<a href="''' + data['linkedIn'] + '''" rel="noopener noreferrer">linkedin.com/in/kyle-willems</a></header>
''' + '\n'.join(parts) + '''</main><footer>November 2026 · Kyle Willems</footer></body></html>'''
(out / 'index.html').write_text(page, encoding='utf-8')
(out / 'resume.css').write_text('''
:root{font-family:Arial,sans-serif;color:#172737;background:#edf0f5;line-height:1.7}*{box-sizing:border-box}body{margin:0}nav{display:flex;justify-content:space-between;align-items:center;max-width:900px;margin:auto;padding:22px 24px}a{color:#274660;text-underline-offset:3px}a:focus-visible{outline:3px solid #a47620;outline-offset:4px}.download{background:#182b3e;color:#fff;padding:9px 15px;border-radius:4px;text-decoration:none;font-size:14px}main{max-width:900px;margin:0 auto;padding:36px 48px;background:white;border:1px solid #d5dde6;border-radius:5px}header{border-bottom:2px solid #af873b;padding-bottom:24px}h1{font-family:Georgia,serif;font-size:34px;line-height:1.2;margin:0 0 12px}.position{font-size:14px;margin:0 0 8px}h2{text-transform:uppercase;font-size:15px;letter-spacing:.06em;border-bottom:1px solid #cbd4df;padding-bottom:9px;margin:29px 0 14px}h3{font-size:14px;margin:15px 0 5px}p,li{font-size:14px}p{margin:5px 0 10px}.meta{font-size:13px;color:#655125}ul{padding-left:20px}li+li{margin-top:7px}footer{max-width:900px;margin:auto;padding:22px 24px;font-size:12px;color:#526171}.skip{position:absolute;top:-70px;left:12px;background:#f2bf55;padding:12px}.skip:focus{top:12px}@media(max-width:600px){main{padding:26px 22px;margin:0 12px}h1{font-size:29px}nav{padding:18px 14px}}@media print{nav,.skip,footer{display:none}body{background:white}main{padding:0;border:0;max-width:none}h2,h3{break-after:avoid}li{break-inside:avoid}a{color:black}}
'''.strip() + '\n', encoding='utf-8')

digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
manifest = {
    'sourceSha256': digest(source),
    'assets': {str(p.relative_to(ROOT)).replace('\\', '/'): digest(p) for p in [pdf_path, out / 'index.html', out / 'resume.css']},
}
(ROOT / 'scripts' / 'resume-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print('Generated public PDF and matching standalone HTML resume.')
