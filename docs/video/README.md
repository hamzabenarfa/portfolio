# Case-study films

Narrated films on the AutoParts, BeadCraft and Menu QR case-study pages. Each film was made with a different
engine from one shared brief, so the engines can be compared on equal terms.

| Film | Engine | Source (local, gitignored) | Deliverables |
|---|---|---|---|
| AutoParts Tunisia | [Brag](https://github.com/latent-spaces/brag) `--full --voice` on HyperFrames 0.8.204 | `video/autopart/` | `public/videos/autopart/` |
| BeadCraft Studio | [HyperFrames](https://github.com/heygen-com/hyperframes) 0.8.204 | `video/beadcraft/` | `public/videos/beadcraft/` |
| Menu QR | [Remotion](https://github.com/remotion-dev/remotion) 4.0.539 | `video/menu-qr/` | `public/videos/menu-qr/` |

Held constant across all three: the brief (`FILM-PROMPT.md` + `PROJECT-SLOTS.md`), the voice (Kokoro-82M `af_heart`
at 0.92, generated locally), the music bed (Happy Beats / Business Moves vol. 12, Sascha Ende, ende.app, CC BY 4.0),
Kenney CC0 sound effects, the ffmpeg mastering step (−14 LUFS, H.264 CRF 21), the 4 h / 3-render budget, and the model
(Claude Fable). Each source folder holds a `PROCESS.md` with the script, scene table, truth checks and engine review.

## Voice: Kokoro-82M

[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (Apache-2.0) is the open-source TTS. It runs on CPU here
(~6 s to synthesize 8 s of speech, no GPU) through `hyperframes tts`. Considered and not used: Chatterbox (MIT,
better expressiveness and cloning but much slower on CPU), Piper (fast, flatter prosody), F5/CosyVoice (heavier).

Setup on a fresh machine:

```bash
uv venv --python 3.12 ~/.local/share/kokoro-venv
uv pip install --python ~/.local/share/kokoro-venv/bin/python kokoro-onnx soundfile
export HYPERFRAMES_PYTHON=~/.local/share/kokoro-venv/bin/python
npx -y hyperframes@0.8.204 tts "warm up" -v af_heart -o /tmp/warm.wav   # downloads the 311 MB model once
```

## Mastering note

The brief's limiter (`alimiter` at 48 kHz) only catches sample peaks; the mixes carry ~3 dB of inter-sample
overshoot, so the first Menu QR master measured −14.3 LUFS but +0.9 dBTP. All three films are mastered with the
limiter oversampled instead, which is otherwise the brief's exact step:

```bash
-af "volume=${G}dB,aresample=192000,alimiter=limit=0.8:attack=5:release=60:level=false,aresample=48000"
```

## Engine comparison

(Filled in from each film's `PROCESS.md` once all three are delivered.)
