#!/usr/bin/env python3
"""Create Instagram mockups - larger detailed feeds except Conversion"""
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public/images/diagnostics', exist_ok=True)

BLACK = '#131313'
GOLD = '#EBC773'
LAVENDER = '#B097BE'
BLUE = '#89B0CC'
WHITE = '#FFFFFF'
GRAY = '#E8E8E8'
DARK_GRAY = '#3A3A3A'

def get_font(size):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

# ===== STRATEGY BEFORE: 3 chaotic posts (FULL WIDTH) =====
img = Image.new('RGB', (1000, 700), color=BLACK)
draw = ImageDraw.Draw(img)

posts_before = [
    ("Random post ideas\nno strategy", "#FF6B6B"),
    ("Just posting\nno plan", "#FFE66D"),
    ("Who knows what\nthis is for", "#4ECDC4"),
]

for i, (text, color) in enumerate(posts_before):
    x = 30 + i * 310
    # Post box
    draw.rectangle([(x, 50), (x+300, 620)], outline=GOLD, width=2)
    # Image area
    draw.rectangle([(x+10, 60), (x+290, 380)], fill=color)
    draw.text((x+100, 200), "?", fill=WHITE, font=get_font(60))
    # Caption area
    draw.text((x+20, 420), text, fill=WHITE, font=get_font(16))
    # Likes/comments
    draw.text((x+20, 580), "3 likes  0 comments", fill=DARK_GRAY, font=get_font(12))

draw.text((200, 660), "Chaotic. Unplanned. No direction.", fill=DARK_GRAY, font=get_font(18))

img.save('public/images/diagnostics/social-strategy-before.png')
print("[OK] Strategy BEFORE")

# ===== STRATEGY AFTER: 3 strategic posts (FULL WIDTH) =====
img = Image.new('RGB', (1000, 700), color=BLACK)
draw = ImageDraw.Draw(img)

posts_after = [
    ("Brand story\nWho we are", GOLD),
    ("Behind the scenes\nHow we work", LAVENDER),
    ("Call to action\nLet's build", BLUE),
]

for i, (text, color) in enumerate(posts_after):
    x = 30 + i * 310
    # Post box
    draw.rectangle([(x, 50), (x+300, 620)], outline=GOLD, width=2)
    # Image area with color
    draw.rectangle([(x+10, 60), (x+290, 380)], fill=color)
    draw.text((x+120, 200), "→", fill=WHITE, font=get_font(60))
    # Caption area
    draw.text((x+20, 420), text, fill=WHITE, font=get_font(16))
    draw.text((x+20, 500), "Strategic. Purposeful.", fill=DARK_GRAY, font=get_font(12))
    # Likes/comments
    draw.text((x+20, 580), "247 likes  18 comments", fill=DARK_GRAY, font=get_font(12))

draw.text((80, 660), "Strategic. Every post serves a purpose. Engagement up 3x.", fill=DARK_GRAY, font=get_font(18))

img.save('public/images/diagnostics/social-strategy-after.png')
print("[OK] Strategy AFTER")

# ===== DESIGN BEFORE: Chaotic feed (FULL WIDTH) =====
img = Image.new('RGB', (1000, 750), color=BLACK)
draw = ImageDraw.Draw(img)

colors_bad = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF9999']
for i in range(6):
    x = 40 + (i % 3) * 320
    y = 50 + (i // 3) * 320
    # Post box
    draw.rectangle([(x, y), (x+300, y+300)], outline=GOLD, width=1)
    # Image
    draw.rectangle([(x+5, y+5), (x+295, y+240)], fill=colors_bad[i])
    # Caption
    draw.text((x+10, y+260), "Post", fill=WHITE, font=get_font(12))

draw.text((150, 700), "Colors clash. No brand consistency. Looks amateur.", fill=DARK_GRAY, font=get_font(16))

img.save('public/images/diagnostics/social-consistency-before.png')
print("[OK] Design BEFORE")

# ===== DESIGN AFTER: Cohesive feed (FULL WIDTH) =====
img = Image.new('RGB', (1000, 750), color=BLACK)
draw = ImageDraw.Draw(img)

colors_good = [GOLD, LAVENDER, BLUE, GOLD, LAVENDER, BLUE]
for i in range(6):
    x = 40 + (i % 3) * 320
    y = 50 + (i // 3) * 320
    # Post box
    draw.rectangle([(x, y), (x+300, y+300)], outline=GOLD, width=1)
    # Image
    draw.rectangle([(x+5, y+5), (x+295, y+240)], fill=colors_good[i])
    draw.text((x+110, y+100), "N.", fill=WHITE, font=get_font(40))
    # Caption
    draw.text((x+10, y+260), "Branded post", fill=WHITE, font=get_font(12))

draw.text((100, 700), "Cohesive. Professional. Instantly recognizable brand identity.", fill=DARK_GRAY, font=get_font(16))

img.save('public/images/diagnostics/social-consistency-after.png')
print("[OK] Design AFTER")

# ===== CONVERSION BEFORE: No data (NARROWER TO FIT) =====
img = Image.new('RGB', (700, 500), color=BLACK)
draw = ImageDraw.Draw(img)

draw.rectangle([(40, 40), (660, 460)], outline=GOLD, width=2)
draw.text((200, 180), "No Data", fill=WHITE, font=get_font(48))

img.save('public/images/diagnostics/social-conversion-before.png')
print("[OK] Conversion BEFORE")

# ===== CONVERSION AFTER: Dashboard (NARROWER TO FIT) =====
img = Image.new('RGB', (700, 500), color=BLACK)
draw = ImageDraw.Draw(img)

draw.rectangle([(40, 40), (660, 460)], outline=GOLD, width=2)
draw.text((80, 60), "PERFORMANCE DASHBOARD", fill=GOLD, font=get_font(24))

metrics = [
    ("ENGAGEMENT", "4.2%", GOLD),
    ("REACH", "2,847", BLUE),
    ("CLICKS", "156", LAVENDER),
    ("GROWTH", "+47", GOLD),
]

for i, (label, value, color) in enumerate(metrics):
    x = 70 + (i % 2) * 310
    y = 130 + (i // 2) * 120
    draw.rectangle([(x, y), (x+280, y+100)], outline=color, width=1)
    draw.text((x+15, y+15), label, fill=color, font=get_font(16))
    draw.text((x+15, y+50), value, fill=WHITE, font=get_font(36))

img.save('public/images/diagnostics/social-conversion-after.png')
print("[OK] Conversion AFTER")

print("[DONE] All mockups created!")
