import os
from PIL import Image, ImageDraw, ImageFont

w, h = 1200, 630
img = Image.new('RGB', (w, h), color='#022c22')
draw = ImageDraw.Draw(img)

# Vertical background gradient (deep emerald / teal / dark slate)
for y in range(h):
    ratio = y / h
    r = int(2 + (10 - 2) * ratio)
    g = int(44 + (30 - 44) * ratio)
    b = int(34 + (48 - 34) * ratio)
    draw.line([(0, y), (w, y)], fill=(r, g, b))

# Outer & Inner golden frame
draw.rounded_rectangle([(24, 24), (w - 24, h - 24)], radius=28, outline='#f59e0b', width=3)
draw.rounded_rectangle([(36, 36), (w - 36, h - 36)], radius=20, outline=(5, 150, 105), width=1)

# Fonts
font_title = None
font_sub = None
font_badge = None
font_small = None
font_pill = None
font_sanad = None

for font_name in ['segoeuib.ttf', 'arialbd.ttf', 'tahomabd.ttf', 'arial.ttf']:
    font_path = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts', font_name)
    if os.path.exists(font_path):
        try:
            font_title = ImageFont.truetype(font_path, 52)
            font_sub = ImageFont.truetype(font_path, 26)
            font_badge = ImageFont.truetype(font_path, 21)
            font_sanad = ImageFont.truetype(font_path, 22)
            font_small = ImageFont.truetype(font_path, 17)
            font_pill = ImageFont.truetype(font_path, 19)
            break
        except Exception:
            continue

if not font_title:
    font_title = font_sub = font_badge = font_small = font_pill = font_sanad = ImageFont.load_default()

# 1. Top Category Pill: طلب الإجازة بالسند المتصل
top_pill = [(w // 2 - 180, 50), (w // 2 + 180, 90)]
draw.rounded_rectangle(top_pill, radius=20, fill=(6, 78, 59), outline='#34d399', width=2)
draw.text((w // 2, 70), 'طلب الإجازة بالسند المتصل (قراءةً وسماعًا)', fill='#6ee7b7', font=font_pill, anchor='mm')

# 2. Main Title: منظومة الوقف على كلا وبلى
draw.text((w // 2, 140), 'مَنظُومَةُ الوَقْفِ عَلَى كَلَّا وَبَلَى', fill='#ffffff', font=font_title, anchor='mm')

# 3. Author Subtitle
draw.text((w // 2, 195), 'لِفَضِيلَةِ الشَّيْخِ عَلِيّ بْنِ مُحَمَّد تَوْفِيق النَّحَّاسِ رَحِمَهُ اللَّهُ', fill='#fde68a', font=font_sub, anchor='mm')

# 4. Central Featured Card for Ijāzah & Sanad
card_box = [(w // 2 - 470, 235), (w // 2 + 470, 485)]
draw.rounded_rectangle(card_box, radius=24, fill=(4, 47, 46), outline='#f59e0b', width=2)

# Sanad chain label & chain box
draw.text((w // 2, 270), 'سلسلة الإسناد المتصل قراءةً وسماعًا إلى الناظم رحمه الله تعالى:', fill='#fcd34d', font=font_badge, anchor='mm')

# Sanad chain representation box
sanad_box = [(w // 2 - 440, 298), (w // 2 + 440, 365)]
draw.rounded_rectangle(sanad_box, radius=16, fill=(15, 23, 42, 220), outline=(52, 211, 153), width=1)
draw.text((w // 2, 331), 'الشيخ صلاح الدين أحمد  ←  الشيخ توفيق ضمرة  ←  الناظم الشيخ علي توفيق النحاس', fill='#ffffff', font=font_sanad, anchor='mm')

# Subtitle condition
draw.text((w // 2, 395), 'حفظ وضبط أبيات المنظومة العشرة والتسميع والاختبار لنيل الإجازة بالسند', fill='#99f6e4', font=font_badge, anchor='mm')

# WhatsApp Green CTA Box
wa_box = [(w // 2 - 270, 425), (w // 2 + 270, 472)]
draw.rounded_rectangle(wa_box, radius=16, fill='#25D366', outline='#ffffff', width=2)
draw.text((w // 2, 448), 'واتساب طلب الإجازة: 4148 016 71 212+', fill='#ffffff', font=font_badge, anchor='mm')

# 5. 3 Bottom Pillars / Badges
badges = [
    ('10 أبيات تعليمية جامعة', w // 2 - 280),
    ('جلسات تسميع عن بُعد', w // 2),
    ('سند متصل إلى الناظم', w // 2 + 280)
]

for text, cx in badges:
    box = [(cx - 125, 505), (cx + 125, 550)]
    draw.rounded_rectangle(box, radius=14, fill=(15, 23, 42), outline=(52, 211, 153), width=1)
    draw.text((cx, 527), text, fill='#e2e8f0', font=font_small, anchor='mm')

# 6. Site URL at the bottom
draw.text((w // 2, 585), 'https://kalla-bala.vercel.app/manzuma', fill='#38bdf8', font=font_small, anchor='mm')

os.makedirs('public', exist_ok=True)
img.save('public/og-manzuma.png', 'PNG', optimize=True)
img.save('public/twitter-manzuma.png', 'PNG', optimize=True)
print('Successfully generated public/og-manzuma.png and public/twitter-manzuma.png (1200x630)')
