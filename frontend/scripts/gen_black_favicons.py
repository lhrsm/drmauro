import os
import base64
import io
from PIL import Image
import numpy as np

# 1. Load the new logo
raw_path = 'frontend/src/assets/logo.png'
im = Image.open(raw_path).convert('RGBA')
bbox = im.getbbox()
print('Raw bbox:', bbox)

# Tightly crop the white logo
cropped_white = im.crop(bbox)
print('Cropped white logo size:', cropped_white.size)

# Save cropped white logo
cropped_white.save('frontend/src/assets/logo.png', 'PNG')
cropped_white.save('frontend/public/logo.png', 'PNG')
cropped_white.save('frontend/public/logo1.png', 'PNG')

# 2. Generate dark/black version for favicons
arr = np.array(cropped_white)
alpha = arr[:, :, 3]

# Color: Pure Black / Deep Navy (#0E1620)
black_arr = np.zeros_like(arr)
black_arr[:, :, 0] = 14
black_arr[:, :, 1] = 22
black_arr[:, :, 2] = 32
black_arr[:, :, 3] = alpha

black_im = Image.fromarray(black_arr, 'RGBA')
black_bbox = black_im.getbbox()
black_cropped = black_im.crop(black_bbox)

black_cropped.save('frontend/src/assets/logo-black.png', 'PNG')
black_cropped.save('frontend/public/logo-black.png', 'PNG')

# 3. Create square canvas with padding for Favicons
w, h = black_cropped.size
max_dim = max(w, h)
pad = int(max_dim * 0.1)
canvas_size = max_dim + 2 * pad

square_fav = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
offset = (pad + (max_dim - w) // 2, pad + (max_dim - h) // 2)
square_fav.paste(black_cropped, offset, black_cropped)

dest = 'frontend/public'
os.makedirs(dest, exist_ok=True)
square_fav.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(dest, 'favicon-512x512.png'))
square_fav.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(dest, 'favicon-192x192.png'))
square_fav.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(dest, 'apple-touch-icon.png'))
square_fav.resize((64, 64), Image.Resampling.LANCZOS).save(os.path.join(dest, 'favicon.png'))
square_fav.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(dest, 'favicon-32x32.png'))
square_fav.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(dest, 'favicon-16x16.png'))
square_fav.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(dest, 'favicon.ico'))

buf = io.BytesIO()
square_fav.resize((512, 512), Image.Resampling.LANCZOS).save(buf, format='PNG')
b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
svg_code = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">\n  <image href="data:image/png;base64,{b64}" width="512" height="512" />\n</svg>'

with open(os.path.join(dest, 'favicon.svg'), 'w', encoding='utf-8') as f:
    f.write(svg_code)

print('Success: Processed new logo and generated complete black favicon suite!')
