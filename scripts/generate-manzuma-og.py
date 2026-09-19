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

for font_name in ['segoeuib.ttf', 'arialbd.ttf', 'tahomabd.ttf', 'arial.ttf']:
    font_path = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts', font_name)
    if os.path.exists(font_path):
        try:
            font_title = ImageFont.truetype(font_path, 54)
            font_sub = ImageFont.truetype(font_path, 28)
            font_badge = ImageFont.truetype(font_path, 22)
            font_small = ImageFont.truetype(font_path, 18)
            font_pill = ImageFont.truetype(font_path, 20)
            break
        except Exception:
            continue

if not font_title:
    font_title = font_sub = font_badge = font_small = font_pill = ImageFont.load_default()

# 1. Top Category Pill: طلب الإجازة بالسند
top_pill = [(w // 2 - 160, 55), (w // 2 + 160, 95)]
draw.rounded_rectangle(top_pill, radius=20, fill=(6, 78, 59), outline='#34d399', width=2)
draw.text((w // 2, 75), 'طلب الإجازة بالسند المتصل', fill='#6ee7b7', font=font_pill, anchor='mm')

# 2. Main Title: منظومة الوقف على كلا وبلى
draw.text((w // 2, 150), 'مَنظُومَةُ الوَقْفِ عَلَى كَلَّا وَبَلَى', fill='#ffffff', font=font_title, anchor='mm')

# 3. Author Subtitle
draw.text((w // 2, 215), 'لِفَضِيلَةِ الشَّيْخِ عَلِيّ بْنِ مُحَمَّد تَوْفِيق النَّحَّاسِ رَحِمَهُ اللَّهُ', fill='#fde68a', font=font_sub, anchor='mm')

# 4. Central Featured Card for Ijāzah & WhatsApp
card_box = [(w // 2 - 420, 260), (w // 2 + 420, 475)]
draw.rounded_rectangle(card_box, radius=24, fill=(4, 47, 46), outline='#f59e0b', width=2)

# Inner details inside card
draw.text((w // 2, 305), 'نيل الإجازة بالسند المتصل إلى ناظمها رحمه الله تعالى', fill='#ffffff', font=font_sub, anchor='mm')
draw.text((w // 2, 345), 'حفظ وضبط أبيات المنظومة العشرة والتسميع والاختبار عن بعد', fill='#99f6e4', font=font_badge, anchor='mm')

# WhatsApp Green CTA Box
wa_box = [(w // 2 - 250, 390), (w // 2 + 250, 450)]
draw.rounded_rectangle(wa_box, radius=18, fill='#25D366', outline='#ffffff', width=2)
draw.text((w // 2, 420), 'واتساب الإجازة: 4148 016 71 212+', fill='#ffffff', font=font_badge, anchor='mm')

# 5. 3 Bottom Pillars / Badges
badges = [
    ('10 أبيات تعليمية جامعة', w // 2 - 280),
    ('جلسات تسميع معتمدة', w // 2),
    ('سند متصل إلى الناظم', w // 2 + 280)
]

for text, cx in badges:
    box = [(cx - 125, 495), (cx + 125, 545)]
    draw.rounded_rectangle(box, radius=14, fill=(15, 23, 42), outline=(52, 211, 153), width=1)
    draw.text((cx, 520), text, fill='#e2e8f0', font=font_small, anchor='mm')

# 6. Site URL at the bottom
draw.text((w // 2, 580), 'https://kalla-bala.vercel.app/manzuma', fill='#38bdf8', font=font_small, anchor='mm')

os.makedirs('public', exist_ok=True)
img.save('public/og-manzuma.png', 'PNG', optimize=True)
img.save('public/twitter-manzuma.png', 'PNG', optimize=True)
print('Successfully generated public/og-manzuma.png and public/twitter-manzuma.png (1200x630)')
