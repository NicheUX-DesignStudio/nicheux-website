#!/usr/bin/env python3
"""Generate elegant diagnostic mockups matching other service pages"""
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public/images/diagnostics', exist_ok=True)

BLACK = '#131313'
GOLD = '#EBC773'
LAVENDER = '#B097BE'
BLUE = '#89B0CC'
WHITE = '#FFFFFF'
GRAY = '#3A3A3A'
DARK_GRAY = '#2A2A2A'

def create_mockup(width=800, height=600):
    return Image.new('RGB', (width, height), color=BLACK)

def get_font(size, bold=False):
    try:
        name = "arialbd.ttf" if bold else "arial.ttf"
        return ImageFont.truetype(name, size)
    except:
        return ImageFont.load_default()

# ===== STRATEGY BEFORE: Chaotic =====
img = create_mockup()
draw = ImageDraw.Draw(img)

# Border frame
draw.rectangle([(40, 60), (760, 540)], outline=GRAY, width=2)

# Title
draw.text((180, 80), "Random Posting", fill=GOLD, font=get_font(36, bold=True))

# Scattered tasks
draw.rectangle([(80, 160), (280, 220)], outline=LAVENDER, width=1)
draw.text((100, 175), "Post #1?", fill=LAVENDER, font=get_font(20))

draw.rectangle([(320, 140), (520, 200)], outline=LAVENDER, width=1)
draw.text((340, 155), "Post #2?", fill=LAVENDER, font=get_font(20))

draw.rectangle([(560, 180), (730, 240)], outline=LAVENDER, width=1)
draw.text((580, 195), "Post #3?", fill=LAVENDER, font=get_font(20))

# Random question marks
draw.text((150, 280), "?", fill=LAVENDER, font=get_font(60))
draw.text((400, 320), "?", fill=LAVENDER, font=get_font(60))
draw.text((650, 260), "?", fill=LAVENDER, font=get_font(60))

# Caption
draw.text((150, 450), "No strategy. No direction.", fill=LAVENDER, font=get_font(24))
draw.text((150, 490), "Posts come and go.", fill=LAVENDER, font=get_font(24))

img.save('public/images/diagnostics/social-strategy-before.png')
print("[OK] Strategy BEFORE created")

# ===== STRATEGY AFTER: Organized =====
img = create_mockup()
draw = ImageDraw.Draw(img)

# Border frame
draw.rectangle([(40, 60), (760, 540)], outline=GOLD, width=2)

# Title
draw.text((100, 80), "Strategic Planning", fill=GOLD, font=get_font(36, bold=True))

# Calendar structure
draw.rectangle([(80, 160), (720, 220)], outline=BLUE, width=2)
draw.text((100, 175), "WEEK 1: Brand Story  |  WEEK 2: Behind-Scenes  |  WEEK 3: Action CTA", fill=BLUE, font=get_font(18))

# Posts aligned
draw.rectangle([(80, 260), (240, 320)], outline=GOLD, width=2)
draw.text((100, 280), "Post 1", fill=GOLD, font=get_font(20))
draw.text((100, 310), "Monday", fill=GOLD, font=get_font(14))

draw.rectangle([(280, 260), (440, 320)], outline=GOLD, width=2)
draw.text((300, 280), "Post 2", fill=GOLD, font=get_font(20))
draw.text((300, 310), "Wednesday", fill=GOLD, font=get_font(14))

draw.rectangle([(480, 260), (640, 320)], outline=GOLD, width=2)
draw.text((500, 280), "Post 3", fill=GOLD, font=get_font(20))
draw.text((500, 310), "Friday", fill=GOLD, font=get_font(14))

# Caption
draw.text((150, 420), "Purpose-driven strategy.", fill=GOLD, font=get_font(24))
draw.text((150, 460), "Every post aligned to business goals.", fill=GOLD, font=get_font(24))

img.save('public/images/diagnostics/social-strategy-after.png')
print("[OK] Strategy AFTER created")

# ===== DESIGN BEFORE: Chaotic =====
img = create_mockup()
draw = ImageDraw.Draw(img)

# Border frame
draw.rectangle([(40, 60), (760, 540)], outline=GRAY, width=2)

# Title
draw.text((120, 80), "Mismatched Designs", fill=GOLD, font=get_font(36, bold=True))

# Ugly colored posts in 2x3 grid
colors_bad = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF9999']
for i in range(6):
    x = 100 + (i % 3) * 220
    y = 180 + (i // 3) * 130
    draw.rectangle([(x, y), (x+180, y+110)], fill=colors_bad[i])

# Caption
draw.text((150, 460), "Colors don't match.", fill=LAVENDER, font=get_font(24))
draw.text((150, 500), "No visual identity.", fill=LAVENDER, font=get_font(24))

img.save('public/images/diagnostics/social-consistency-before.png')
print("[OK] Design BEFORE created")

# ===== DESIGN AFTER: Cohesive =====
img = create_mockup()
draw = ImageDraw.Draw(img)

# Border frame
draw.rectangle([(40, 60), (760, 540)], outline=GOLD, width=2)

# Title
draw.text((80, 80), "Unified Brand Design", fill=GOLD, font=get_font(36, bold=True))

# Cohesive colored posts in 2x3 grid
colors_good = [GOLD, LAVENDER, BLUE, GOLD, LAVENDER, BLUE]
for i in range(6):
    x = 100 + (i % 3) * 220
    y = 180 + (i // 3) * 130
    draw.rectangle([(x, y), (x+180, y+110)], fill=colors_good[i])

# Caption
draw.text((150, 460), "Consistent brand palette.", fill=GOLD, font=get_font(24))
draw.text((150, 500), "Professional visual identity.", fill=GOLD, font=get_font(24))

img.save('public/images/diagnostics/social-consistency-after.png')
print("[OK] Design AFTER created")

# ===== ANALYTICS BEFORE: No Data =====
img = create_mockup()
draw = ImageDraw.Draw(img)

# Border frame
draw.rectangle([(40, 60), (760, 540)], outline=GRAY, width=2)

# Title
draw.text((100, 80), "No Insights", fill=GOLD, font=get_font(36, bold=True))

# Big question mark
draw.text((300, 240), "?", fill=LAVENDER, font=get_font(100))

# Caption
draw.text((120, 420), "Just posting. No tracking.", fill=LAVENDER, font=get_font(24))
draw.text((120, 460), "No data. Guessing strategy.", fill=LAVENDER, font=get_font(24))
draw.text((120, 500), "Blind to what's working.", fill=LAVENDER, font=get_font(24))

img.save('public/images/diagnostics/social-conversion-before.png')
print("[OK] Analytics BEFORE created")

# ===== ANALYTICS AFTER: Full Dashboard =====
img = create_mockup()
draw = ImageDraw.Draw(img)

# Border frame
draw.rectangle([(40, 60), (760, 540)], outline=GOLD, width=2)

# Title
draw.text((120, 80), "Data Dashboard", fill=GOLD, font=get_font(36, bold=True))

# Metrics boxes
metrics = [
    ("ENGAGEMENT: 4.2%", BLUE),
    ("REACH: 2,847", BLUE),
    ("CLICKS: 156", GOLD),
    ("GROWTH: +47", GOLD),
]

for i, (text, color) in enumerate(metrics):
    x = 100 + (i % 2) * 340
    y = 160 + (i // 2) * 110
    draw.rectangle([(x, y), (x+300, y+90)], outline=color, width=2)
    draw.text((x+20, y+25), text, fill=color, font=get_font(22, bold=True))

# Caption
draw.text((150, 450), "Clear metrics. Clear decisions.", fill=GOLD, font=get_font(24))
draw.text((150, 490), "Data-driven strategy optimization.", fill=GOLD, font=get_font(24))

img.save('public/images/diagnostics/social-conversion-after.png')
print("[OK] Analytics AFTER created")

print("[DONE] All elegant diagnostic mockups created!")
