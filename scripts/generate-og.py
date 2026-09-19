import os
from PIL import Image, ImageDraw, ImageFont

w, h = 1200, 630
img = Image.new('RGB', (w, h), color='#022c22')
draw = ImageDraw.Draw(img)

# Diagonal/vertical background gradient
for y in range(h):
    ratio = y / h
    r = int(2 + (15 - 2) * ratio)
    g = int(44 + (23 - 44) * ratio)
    b = int(34 + (42 - 34) * ratio)
    draw.line([(0, y), (w, y)], fill=(r, g, b))

# Outer & Inner golden frame
draw.rounded_rectangle([(24, 24), (w - 24, h - 24)], radius=28, outline='#d97706', width=3)
draw.rounded_rectangle([(36, 36), (w - 36, h - 36)], radius=20, outline=(5, 150, 105), width=1)

# Try loading Arabic font from Windows Fonts
font_title = None
font_sub = None
font_badge = None
font_small = None

for font_name in ['segoeuib.ttf', 'arialbd.ttf', 'tahomabd.ttf', 'arial.ttf']:
    font_path = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts', font_name)
    if os.path.exists(font_path):
        try:
            font_title = ImageFont.truetype(font_path, 68)
            font_sub = ImageFont.truetype(font_path, 32)
            font_badge = ImageFont.truetype(font_path, 22)
            font_small = ImageFont.truetype(font_path, 18)
            break
        except Exception:
            continue

if not font_title:
    font_title = font_sub = font_badge = font_small = ImageFont.load_default()

# Draw Emblem / Logo box
emblem_box = [(w // 2 - 45, 70), (w // 2 + 45, 160)]
draw.rounded_rectangle(emblem_box, radius=24, fill='#059669', outline='#34d399', width=2)
draw.text((w // 2, 115), 'ك', fill='#ffffff', font=font_title, anchor='mm')

# Title
draw.text((w // 2, 215), 'كَلَّا وَبَلَى', fill='#ffffff', font=font_title, anchor='mm')

# Subtitle
draw.text((w // 2, 280), 'الوقف والابتداء خطوة بخطوة في القرآن الكريم', fill='#34d399', font=font_sub, anchor='mm')

# 3 Badges
badges = [
    ('33 موضعًا لـ كَلَّا', w // 2 - 270),
    ('55 تطبيقًا قرآنيًا', w // 2),
    ('22 موضعًا لـ بَلَى', w // 2 + 270)
]

for text, cx in badges:
    box = [(cx - 120, 350), (cx + 120, 410)]
    if '55' in text:
        draw.rounded_rectangle(box, radius=18, fill=(180, 83, 9), outline='#f59e0b', width=2)
        draw.text((cx, 380), text, fill='#fbbf24', font=font_badge, anchor='mm')
    else:
        draw.rounded_rectangle(box, radius=18, fill=(6, 78, 59), outline=(52, 211, 153), width=1)
        draw.text((cx, 380), text, fill='#f1f5f9', font=font_badge, anchor='mm')

# Author note & URL
draw.text((w // 2, 480), 'وفق اختيار وتحرير الشيخ علي بن محمد توفيق النحاس رحمه الله', fill='#94a3b8', font=font_badge, anchor='mm')
draw.text((w // 2, 535), 'https://kalla-bala.vercel.app', fill='#38bdf8', font=font_small, anchor='mm')

os.makedirs('public', exist_ok=True)
img.save('public/og.png', 'PNG', optimize=True)
img.save('public/twitter-image.png', 'PNG', optimize=True)
print('Successfully generated public/og.png and public/twitter-image.png (1200x630)')
