import os
import base64
import io
from PIL import Image
import numpy as np

logo_path = 'frontend/src/assets/logo.png'
im = Image.open(logo_path).convert('RGBA')
arr = np.array(im)
alpha = arr[:, :, 3]

# Create deep black/navy version (#0E1620)
black_arr = np.zeros_like(arr)
black_arr[:, :, 0] = 14
black_arr[:, :, 1] = 22
black_arr[:, :, 2] = 32
black_arr[:, :, 3] = alpha

black_im = Image.fromarray(black_arr, 'RGBA')
bbox = black_im.getbbox()
cropped = black_im.crop(bbox)

# Save dark logo
cropped.save('frontend/src/assets/logo-black.png', 'PNG')
cropped.save('frontend/public/logo-black.png', 'PNG')

w, h = cropped.size
max_dim = max(w, h)
pad = int(max_dim * 0.1)
canvas_size = max_dim + 2 * pad

square_fav = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
offset = (pad + (max_dim - w) // 2, pad + (max_dim - h) // 2)
square_fav.paste(cropped, offset, cropped)

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

print('Success: all favicons are now black/dark on transparent background for crystal clear tab visibility.')
