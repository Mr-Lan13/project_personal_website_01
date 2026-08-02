from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math
import random

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
ASSETS.mkdir(parents=True, exist_ok=True)


def gradient_image(width, height, start, end):
    img = Image.new("RGB", (width, height), start)
    pix = img.load()
    for y in range(height):
        t = y / max(height - 1, 1)
        for x in range(width):
            u = x / max(width - 1, 1)
            mix = (t * 0.68 + u * 0.32)
            pix[x, y] = tuple(int(start[i] * (1 - mix) + end[i] * mix) for i in range(3))
    return img


def add_noise(img, amount=18):
    random.seed(9)
    px = img.load()
    width, height = img.size
    for _ in range(width * height // 22):
        x = random.randrange(width)
        y = random.randrange(height)
        r, g, b = px[x, y]
        n = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + n)), max(0, min(255, g + n)), max(0, min(255, b + n)))
    return img


def glow(draw, xy, color, blur=28, size=None):
    x0, y0, x1, y1 = xy
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse(xy, fill=color)
    return layer.filter(ImageFilter.GaussianBlur(blur))


def save_portrait():
    w, h = 1180, 1480
    img = gradient_image(w, h, (5, 7, 9), (24, 22, 31)).convert("RGBA")
    img.alpha_composite(glow(None, (120, 90, 720, 720), (99, 231, 210, 54), 70, img.size))
    img.alpha_composite(glow(None, (610, 190, 1160, 790), (171, 132, 255, 46), 80, img.size))
    draw = ImageDraw.Draw(img, "RGBA")

    for i in range(34):
        y = 170 + i * 34
        draw.line((80, y, w - 80, y + math.sin(i) * 20), fill=(255, 255, 255, 12), width=1)

    draw.ellipse((360, 228, 820, 688), fill=(33, 34, 40, 255), outline=(148, 244, 223, 76), width=3)
    draw.rectangle((430, 644, 750, 1210), fill=(20, 22, 26, 255))
    draw.polygon([(270, 1260), (910, 1260), (760, 760), (420, 760)], fill=(15, 17, 20, 255))
    draw.arc((340, 260, 840, 760), 202, 340, fill=(245, 245, 238, 120), width=9)
    draw.line((420, 810, 742, 810), fill=(120, 241, 218, 88), width=2)
    draw.line((470, 860, 692, 860), fill=(189, 168, 255, 82), width=2)
    draw.text((96, h - 124), "LAN / AI DESIGNER", fill=(245, 245, 238, 168))
    draw.text((96, h - 86), "PORTRAIT PLACEHOLDER", fill=(120, 241, 218, 150))
    add_noise(img.convert("RGB"), 9).save(ASSETS / "portrait-lan.png", quality=95)


def save_project(name, palette, title):
    w, h = 1500, 1000
    img = gradient_image(w, h, palette[0], palette[1]).convert("RGBA")
    img.alpha_composite(glow(None, (80, 60, 660, 640), (*palette[2], 74), 80, img.size))
    img.alpha_composite(glow(None, (820, 180, 1450, 830), (*palette[3], 62), 90, img.size))
    draw = ImageDraw.Draw(img, "RGBA")

    for i in range(19):
        x = 120 + i * 70
        draw.line((x, 80, x + math.sin(i) * 90, h - 90), fill=(255, 255, 255, 15), width=1)
    for i in range(11):
        y = 150 + i * 72
        draw.line((90, y, w - 90, y + math.cos(i) * 28), fill=(255, 255, 255, 13), width=1)

    for i in range(7):
        left = 170 + i * 132
        top = 230 + (i % 3) * 68
        draw.rounded_rectangle((left, top, left + 360, top + 210), radius=18, fill=(255, 255, 255, 17), outline=(255, 255, 255, 28), width=2)

    draw.rounded_rectangle((120, h - 250, w - 120, h - 105), radius=18, fill=(5, 7, 9, 170), outline=(255, 255, 255, 34), width=2)
    draw.text((156, h - 210), title.upper(), fill=(245, 245, 238, 210))
    draw.text((156, h - 170), "VISUAL / AI / PRODUCT DESIGN", fill=(120, 241, 218, 175))

    add_noise(img.convert("RGB"), 10).save(ASSETS / f"{name}.png", quality=95)


save_portrait()
save_project("project-ai-system", ((5, 7, 9), (12, 24, 25), (120, 241, 218), (189, 168, 255)), "AI Design System")
save_project("project-campaign", ((8, 7, 10), (32, 23, 15), (244, 212, 123), (120, 241, 218)), "Creative Campaign Lab")
save_project("project-product", ((6, 9, 11), (18, 18, 27), (189, 168, 255), (120, 241, 218)), "Product Experience Console")
