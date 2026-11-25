"""Generate static, width-specific WebP assets from approved original images.
Requires cwebp and dwebp. Originals are never modified.
"""
from pathlib import Path
import subprocess
import tempfile
import re
import json
root=Path(__file__).resolve().parents[1]
source=root/'public/images'
out=source/'responsive'
out.mkdir(exist_ok=True)
manifest={}
with tempfile.TemporaryDirectory() as tmp:
    for p in sorted(source.glob('*.webp')):
        raw=Path(tmp)/(p.stem+'.png')
        subprocess.run(['dwebp',str(p),'-quiet','-o',str(raw)],check=True)
        # PNG header stores original dimensions.
        data=raw.read_bytes()
        width=int.from_bytes(data[16:20],'big')
        widths=[w for w in (256,384,512,640,800,1024) if w<width and (p.stem=='kevin' or w>=384)]
        variants=[]
        for w in widths:
            dst=out/f'{p.stem}-{w}.webp'
            subprocess.run(['cwebp','-quiet','-q','82' if p.stem=='kevin' else '85','-resize',str(w),'0',str(raw),'-o',str(dst)],check=True)
            variants.append(dict(url=f'/images/responsive/{dst.name}',width=w))
        variants.append(dict(url=f'/images/{p.name}',width=width))
        manifest[f'/images/{p.name}']=variants
(root/'app/responsive-images.json').write_text(json.dumps(manifest,indent=2)+'\n')
