#!/usr/bin/env python3
"""Create realistic Instagram feed mockups showing before/after"""
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

def create_post(width=600, height=750):
    return Image.new('RGB', (width, height), color=WHITE)

def get_font(size):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

# ===== STRATEGY BEFORE: 3 chaotic posts =====
img = Image.new('RGB', (1200, 800), color=WHITE)
draw = ImageDraw.Draw(img)

# Posts with bad design
posts_before = [
    ("Random post ideas\nno strategy", "#FF6B6B"),
    ("Just posting\nno plan", "#FFE66D"),
    ("Who knows what\nthis is for", "#4ECDC4"),
]

for i, (text, color) in enumerate(posts_before):
    x = 50 + i * 380
    # Post box
    draw.rectangle([(x, 50), (x+350, 650)], outline=BLACK, width=2)
    # Image area
    draw.rectangle([(x+10, 60), (x+340, 400)], fill=color)
    draw.text((x+80, 200), "?", fill=WHITE, font=get_font(80))
    # Caption area
    draw.text((x+20, 430), text, fill=BLACK, font=get_font(20))
    # Likes/comments
    draw.text((x+20, 600), "3 likes  0 comments", fill=DARK_GRAY, font=get_font(14))

draw.text((250, 750), "Chaotic. Unplanned. No direction.", fill=DARK_GRAY, font=get_font(20))

img.save('public/images/diagnostics/social-strategy-before.png')
print("[OK] Strategy BEFORE created")

# ===== STRATEGY AFTER: 3 strategic posts =====
img = Image.new('RGB', (1200, 800), color=WHITE)
draw = ImageDraw.Draw(img)

posts_after = [
    ("Brand story\nWho we are", GOLD),
    ("Behind the scenes\nHow we work", LAVENDER),
    ("Call to action\nLet's build", BLUE),
]

for i, (text, color) in enumerate(posts_after):
    x = 50 + i * 380
    # Post box
    draw.rectangle([(x, 50), (x+350, 650)], outline=BLACK, width=2)
    # Image area with gradient effect
    draw.rectangle([(x+10, 60), (x+340, 400)], fill=color)
    draw.text((x+100, 180), "→", fill=WHITE, font=get_font(80))
    # Caption area
    draw.text((x+20, 430), text, fill=BLACK, font=get_font(20))
    draw.text((x+20, 520), "Strategic. Purposeful.", fill=DARK_GRAY, font=get_font(14))
    # Likes/comments
    draw.text((x+20, 600), "247 likes  18 comments", fill=DARK_GRAY, font=get_font(14))

draw.text((150, 750), "Strategic. Every post serves a purpose. Engagement up 3x.", fill=DARK_GRAY, font=get_font(20))

img.save('public/images/diagnostics/social-strategy-after.png')
print("[OK] Strategy AFTER created")

# ===== DESIGN BEFORE: Chaotic feed =====
img = Image.new('RGB', (1200, 900), color=WHITE)
draw = ImageDraw.Draw(img)

colors_bad = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF9999']
for i in range(6):
    x = 50 + (i % 3) * 380
    y = 50 + (i // 3) * 400
    # Post box
    draw.rectangle([(x, y), (x+350, y+350)], outline=BLACK, width=1)
    # Image
    draw.rectangle([(x+5, y+5), (x+345, y+280)], fill=colors_bad[i])
    # Bad caption
    draw.text((x+10, y+300), "Post", fill=BLACK, font=get_font(14))

draw.text((200, 850), "Colors clash. No brand consistency. Looks amateur.", fill=DARK_GRAY, font=get_font(18))

img.save('public/images/diagnostics/social-consistency-before.png')
print("[OK] Design BEFORE created")

# ===== DESIGN AFTER: Cohesive feed =====
img = Image.new('RGB', (1200, 900), color=WHITE)
draw = ImageDraw.Draw(img)

colors_good = [GOLD, LAVENDER, BLUE, GOLD, LAVENDER, BLUE]
for i in range(6):
    x = 50 + (i % 3) * 380
    y = 50 + (i // 3) * 400
    # Post box
    draw.rectangle([(x, y), (x+350, y+350)], outline=BLACK, width=1)
    # Image
    draw.rectangle([(x+5, y+5), (x+345, y+280)], fill=colors_good[i])
    draw.text((x+130, y+110), "N.", fill=WHITE, font=get_font(40))
    # Caption
    draw.text((x+10, y+300), "Branded post", fill=BLACK, font=get_font(14))

draw.text((150, 850), "Cohesive. Professional. Instantly recognizable brand identity.", fill=DARK_GRAY, font=get_font(18))

img.save('public/images/diagnostics/social-consistency-after.png')
print("[OK] Design AFTER created")

# ===== ANALYTICS BEFORE: No data =====
img = Image.new('RGB', (1200, 600), color=WHITE)
draw = ImageDraw.Draw(img)

# Confused dashboard mockup
draw.rectangle([(50, 50), (550, 550)], outline=BLACK, width=2)
draw.text((150, 250), "No Data", fill=DARK_GRAY, font=get_font(60))

draw.rectangle([(650, 50), (1150, 550)], outline=BLACK, width=2)
draw.text((700, 150), "Just posting", fill=DARK_GRAY, font=get_font(28))
draw.text((700, 220), "No tracking", fill=DARK_GRAY, font=get_font(28))
draw.text((700, 290), "No insights", fill=DARK_GRAY, font=get_font(28))
draw.text((700, 360), "Guessing strategy", fill=DARK_GRAY, font=get_font(28))

img.save('public/images/diagnostics/social-conversion-before.png')
print("[OK] Analytics BEFORE created")

# ===== ANALYTICS AFTER: Full dashboard =====
img = Image.new('RGB', (1200, 600), color=WHITE)
draw = ImageDraw.Draw(img)

# Professional dashboard
draw.rectangle([(50, 50), (1150, 550)], outline=BLACK, width=2)
draw.text((100, 70), "PERFORMANCE DASHBOARD", fill=GOLD, font=get_font(28))

metrics = [
    ("ENGAGEMENT", "4.2%", GOLD),
    ("REACH", "2,847", BLUE),
    ("CLICKS", "156", LAVENDER),
    ("GROWTH", "+47", GOLD),
]

for i, (label, value, color) in enumerate(metrics):
    x = 100 + (i % 2) * 500
    y = 150 + (i // 2) * 150
    draw.rectangle([(x, y), (x+450, y+130)], outline=color, width=2)
    draw.text((x+20, y+20), label, fill=color, font=get_font(20))
    draw.text((x+20, y+60), value, fill=BLACK, font=get_font(48))

img.save('public/images/diagnostics/social-conversion-after.png')
print("[OK] Analytics AFTER created")

print("[DONE] Realistic Instagram mockups created!")
