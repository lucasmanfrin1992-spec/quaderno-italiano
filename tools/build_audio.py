"""Gera os áudios gravados do PWA (audio/<chave>.mp3 + audio/index.json) com uma voz italiana offline (Piper).

Uso:
  1) python3 tools/harvest_audio.py        -> lista as frases que o app lê em voz alta (precisa do Playwright e do Chrome)
  2) python3 tools/build_audio.py MODELO.onnx
     MODELO: voz it_IT-paola-medium do projeto Piper (https://huggingface.co/rhasspy/piper-voices, pasta it/it_IT/paola/medium),
     com o .onnx.json ao lado. Requer: pip install piper-tts; ffmpeg.
Só gera o que ainda não existe (--max N gera um lote de N); apaga os arquivos que não são mais usados.
As notícias (tools/audio_texts_news.json, de tools/harvest_audio_news.py) saem em 24 kbps para ocupar menos.
"""
import io, json, os, subprocess, sys, wave
from multiprocessing import Pool
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'audio')
LISTS = [(os.path.join(ROOT, 'tools', 'audio_texts.json'), '32k'), (os.path.join(ROOT, 'tools', 'audio_texts_news.json'), '24k')]  # (lista, taxa do MP3)
_voice = None

def _init(model):
    global _voice
    from piper import PiperVoice
    _voice = PiperVoice.load(model)

def _synth(item):
    key, text, br = item
    dst = os.path.join(OUT, key + '.mp3')
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as w:
        if hasattr(_voice, 'synthesize_wav'):
            _voice.synthesize_wav(text, w)
        else:
            _voice.synthesize(text, w)
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'wav', '-i', 'pipe:0',
                        '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.12',
                        '-ac', '1', '-ar', '22050', '-b:a', br, dst], input=buf.getvalue())
    return key if r.returncode == 0 and os.path.exists(dst) else None

def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    model = sys.argv[1]
    limit = int(sys.argv[sys.argv.index('--max') + 1]) if '--max' in sys.argv else None  # gera em lotes
    items = []
    for path, br in LISTS:
        if os.path.exists(path):
            items += [(k, t, br) for k, t in json.load(open(path, encoding='utf-8'))]
    os.makedirs(OUT, exist_ok=True)
    want = {k for k, _, _ in items}
    todo = [i for i in items if not os.path.exists(os.path.join(OUT, i[0] + '.mp3'))]
    if limit is not None:
        todo = todo[:limit]
    print(f'{len(items)} frases; {len(todo)} para gerar agora')
    done = 0
    if todo:
        with Pool(max(1, (os.cpu_count() or 2) - 0), initializer=_init, initargs=(model,)) as pool:
            for k in pool.imap_unordered(_synth, todo, chunksize=8):
                done += 1 if k else 0
                if done % 250 == 0:
                    print(' ', done, 'prontos', flush=True)
    removed = 0
    for f in os.listdir(OUT):
        if f.endswith('.mp3') and f[:-4] not in want:
            os.remove(os.path.join(OUT, f)); removed += 1
    keys = sorted(k for k in want if os.path.exists(os.path.join(OUT, k + '.mp3')))
    size = sum(os.path.getsize(os.path.join(OUT, k + '.mp3')) for k in keys)
    import hashlib
    v = str(len(keys)) + '-' + hashlib.md5(' '.join(keys).encode()).hexdigest()[:6]
    json.dump({'v': v, 'voz': 'Paola', 'keys': keys}, open(os.path.join(OUT, 'index.json'), 'w'), separators=(',', ':'))
    print(f'gerados {done}, removidos {removed}; total {len(keys)} arquivos, {size/1048576:.1f} MB')

if __name__ == '__main__':
    main()
