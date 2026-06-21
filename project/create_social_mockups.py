#!/usr/bin/env python3
"""
Generate before/after mockup images for Social Media Marketing page
Creates 3 pairs: Strategy, Design Consistency, Analytics
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create images directory if it doesn't exist
os.makedirs('public/images/diagnostics', exist_ok=True)

# Color scheme (NicheUX brand)
BLACK = '#131313'
GOLD = '#EBC773'
LAVENDER = '#B097BE'
BLUE = '#89B0CC'
WHITE = '#FFFFFF'
GRAY = '#3A3A3A'

def create_mockup(width=1200, height=800):
    """Create a blank mockup canvas"""
    return Image.new('RGB', (width, height), color=BLACK)

def add_text(img, text, position, font_size=32, color=WHITE, bold=False):
    """Add text to image"""
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()
    draw.text(position, text, fill=color, font=font)
    return img

# ============================================================================
# MOCKUP 1: STRATEGY/PLANNING BEFORE VS AFTER
# ============================================================================

img1 = create_mockup(1400, 800)
draw = ImageDraw.Draw(img1)

# Split line down middle
draw.line([(700, 0), (700, 800)], fill=GRAY, width=2)

# BEFORE SIDE (Left)
draw.rectangle([(50, 50), (650, 150)], outline=GOLD, width=3)
draw.text((250, 80), "BEFORE", fill=GOLD, font=ImageFont.load_default())

# Draw chaotic elements on left
draw.rectangle([(100, 200), (250, 280)], fill=GRAY)
draw.text((120, 220), "Sticky Notes", fill=WHITE, font=ImageFont.load_default())

draw.rectangle([(300, 200), (450, 280)], fill=GRAY)
draw.text((320, 220), "Random Ideas", fill=WHITE, font=ImageFont.load_default())

draw.rectangle([(550, 200), (620, 280)], fill=GRAY)
draw.text((560, 220), "???", fill=WHITE, font=ImageFont.load_default())

draw.text((150, 350), "No Strategy", fill=LAVENDER, font=ImageFont.load_default())
draw.text((150, 400), "Random Posting", fill=LAVENDER, font=ImageFont.load_default())
draw.text((150, 450), "No Planning", fill=LAVENDER, font=ImageFont.load_default())

# AFTER SIDE (Right)
draw.rectangle([(750, 50), (1350, 150)], outline=GOLD, width=3)
draw.text((1000, 80), "AFTER NICHEUX", fill=GOLD, font=ImageFont.load_default())

# Draw organized calendar elements on right
draw.rectangle([(800, 200), (1300, 650)], outline=BLUE, width=2)
draw.text((900, 220), "3-WEEK CONTENT CALENDAR", fill=BLUE, font=ImageFont.load_default())

draw.rectangle([(820, 270), (1280, 320)], fill=BLUE)
draw.text((840, 280), "MON: Strategy Insights", fill=BLACK, font=ImageFont.load_default())

draw.rectangle([(820, 340), (1280, 390)], fill=LAVENDER)
draw.text((840, 350), "WED: Behind-The-Scenes", fill=BLACK, font=ImageFont.load_default())

draw.rectangle([(820, 410), (1280, 460)], fill=GOLD)
draw.text((840, 420), "FRI: Call-To-Action", fill=BLACK, font=ImageFont.load_default())

draw.text((1050, 550), "Strategic. Organized. Purpose-Driven.", fill=GOLD, font=ImageFont.load_default())

img1.save('public/images/diagnostics/social-strategy-before.png')
img1.save('public/images/diagnostics/social-strategy-after.png')
print("[OK] Strategy mockup created")

# ============================================================================
# MOCKUP 2: DESIGN CONSISTENCY BEFORE VS AFTER
# ============================================================================

img2 = create_mockup(1400, 900)
draw = ImageDraw.Draw(img2)

# Split line
draw.line([(700, 0), (700, 900)], fill=GRAY, width=2)

# BEFORE SIDE - Chaotic feed
draw.rectangle([(50, 50), (650, 150)], outline=GOLD, width=3)
draw.text((250, 80), "BEFORE", fill=GOLD, font=ImageFont.load_default())

# Draw mismatched Instagram posts (2x3 grid with different colors)
colors_before = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#FF9999']
for i in range(6):
    x = 100 + (i % 3) * 150
    y = 200 + (i // 3) * 150
    draw.rectangle([(x, y), (x+120, y+120)], fill=colors_before[i])
    draw.text((x+30, y+50), "Post", fill=WHITE, font=ImageFont.load_default())

draw.text((150, 700), "Mismatched colors", fill=LAVENDER, font=ImageFont.load_default())
draw.text((150, 750), "No brand consistency", fill=LAVENDER, font=ImageFont.load_default())

# AFTER SIDE - Cohesive feed
draw.rectangle([(750, 50), (1350, 150)], outline=GOLD, width=3)
draw.text((1000, 80), "AFTER NICHEUX", fill=GOLD, font=ImageFont.load_default())

# Draw cohesive Instagram posts with brand colors
colors_after = [GOLD, LAVENDER, BLUE, GOLD, LAVENDER, BLUE]
for i in range(6):
    x = 800 + (i % 3) * 150
    y = 200 + (i // 3) * 150
    draw.rectangle([(x, y), (x+120, y+120)], fill=colors_after[i])
    draw.text((x+30, y+50), "Post", fill=BLACK, font=ImageFont.load_default())

draw.text((1000, 700), "Unified Brand Identity", fill=BLUE, font=ImageFont.load_default())
draw.text((1000, 750), "Consistent Design System", fill=BLUE, font=ImageFont.load_default())

img2.save('public/images/diagnostics/social-consistency-before.png')
img2.save('public/images/diagnostics/social-consistency-after.png')
print("[OK] Design consistency mockup created")

# ============================================================================
# MOCKUP 3: ANALYTICS/REPORTING BEFORE VS AFTER
# ============================================================================

img3 = create_mockup(1400, 900)
draw = ImageDraw.Draw(img3)

# Split line
draw.line([(700, 0), (700, 900)], fill=GRAY, width=2)

# BEFORE SIDE - No data
draw.rectangle([(50, 50), (650, 150)], outline=GOLD, width=3)
draw.text((250, 80), "BEFORE", fill=GOLD, font=ImageFont.load_default())

# Draw phone mockup (no data)
draw.rectangle([(120, 200), (580, 700)], outline=GRAY, width=3)
draw.text((200, 350), "Just Posting...", fill=LAVENDER, font=ImageFont.load_default())
draw.text((200, 400), "No insights", fill=LAVENDER, font=ImageFont.load_default())
draw.text((200, 450), "No tracking", fill=LAVENDER, font=ImageFont.load_default())
draw.text((200, 500), "Guessing strategy", fill=LAVENDER, font=ImageFont.load_default())

# AFTER SIDE - Full analytics
draw.rectangle([(750, 50), (1350, 150)], outline=GOLD, width=3)
draw.text((1000, 80), "AFTER NICHEUX", fill=GOLD, font=ImageFont.load_default())

# Draw dashboard elements
draw.rectangle([(800, 200), (1300, 280)], outline=BLUE, width=1)
draw.text((820, 210), "ENGAGEMENT RATE: 4.2%", fill=BLUE, font=ImageFont.load_default())

draw.rectangle([(800, 300), (1300, 380)], outline=BLUE, width=1)
draw.text((820, 310), "REACH: 2,847 | CLICKS: 156", fill=BLUE, font=ImageFont.load_default())

draw.rectangle([(800, 400), (1300, 480)], outline=GOLD, width=1)
draw.text((820, 410), "FOLLOWER GROWTH: +47", fill=GOLD, font=ImageFont.load_default())

draw.rectangle([(800, 500), (1300, 580)], outline=LAVENDER, width=1)
draw.text((820, 510), "MONTHLY REPORT + A/B TESTING", fill=LAVENDER, font=ImageFont.load_default())

draw.text((1050, 700), "Data-Driven Decisions", fill=GOLD, font=ImageFont.load_default())
draw.text((1050, 750), "Clear Metrics & Insights", fill=GOLD, font=ImageFont.load_default())

img3.save('public/images/diagnostics/social-conversion-before.png')
img3.save('public/images/diagnostics/social-conversion-after.png')
print("[OK] Analytics/Reporting mockup created")

print("[DONE] All mockup images created successfully!")
