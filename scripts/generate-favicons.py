import os
from PIL import Image, ImageDraw, ImageFont

def create_icon(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded rectangle background with emerald gradient
    corner_radius = int(size * 0.26)
    
    # Create gradient background
    base = Image.new('RGB', (size, size), '#059669')
    base_draw = ImageDraw.Draw(base)
    for y in range(size):
        ratio = y / size
        # from teal/emerald to darker emerald
        r = int(16 + (4 - 16) * ratio)
        g = int(185 + (120 - 185) * ratio)
        b = int(129 + (87 - 129) * ratio)
        base_draw.line([(0, y), (size, y)], fill=(r, g, b))
        
    # Mask for rounded rectangle
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=corner_radius, fill=255)
    
    # Paste gradient with mask
    img.paste(base, (0, 0), mask)
    
    # Inner border / ring
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([(1, 1), (size - 2, size - 2)], radius=corner_radius, outline=(52, 211, 153, 200), width=max(1, int(size * 0.04)))
    
    # Try finding font
    font = None
    font_size = int(size * 0.58)
    for font_name in ['segoeuib.ttf', 'arialbd.ttf', 'tahomabd.ttf', 'arial.ttf']:
        font_path = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts', font_name)
        if os.path.exists(font_path):
            try:
                font = ImageFont.truetype(font_path, font_size)
                break
            except Exception:
                continue
    if not font:
        font = ImageFont.load_default()
        
    # Draw letter 'ك'
    # In Arabic, 'ك' centered
    draw.text((size // 2, int(size * 0.46)), 'ك', fill=(255, 255, 255, 255), font=font, anchor='mm')
    
    return img

# Generate 512x512 master icon
icon_512 = create_icon(512)
icon_192 = create_icon(192)
icon_180 = create_icon(180)
icon_48 = create_icon(48)
icon_32 = create_icon(32)
icon_16 = create_icon(16)

# Save to public/
os.makedirs('public', exist_ok=True)
os.makedirs('src/app', exist_ok=True)

icon_512.save('public/icon.png', 'PNG')
icon_180.save('public/apple-touch-icon.png', 'PNG')
icon_512.save('src/app/icon.png', 'PNG')

# Save multi-size favicon.ico
icon_48.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[icon_32, icon_16])
icon_48.save('src/app/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[icon_32, icon_16])

print('Successfully generated favicons in public/ and src/app/')
