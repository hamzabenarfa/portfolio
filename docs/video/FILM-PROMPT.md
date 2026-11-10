# Case-study film prompt (v2)

The master prompt behind the narrated films on the `/work/<slug>` case-study pages. One agent runs it per
project; only the **Project slot** (see `PROJECT-SLOTS.md`) changes. Each project uses a different engine on
purpose (Brag, HyperFrames, Remotion) so the results can be compared: same brief, voice, track and mastering,
and the same delivery contract.

History: v1 was drafted by the orchestrator, then critiqued by a Claude Fable critic against the three engines'
own skill files and a measured Kokoro sample. v2 fixes four places where an autonomous agent would stall
or break an engine rule (unregistered skills, "stop at preview" rules, Brag's 15–25 s gates, the
HeyGen preflight). It also corrects the narration pace (measured at 180 wpm, not 150) and adds one shared mastering step.

Before launching agents, the orchestrator warms the Kokoro cache once
(`npx -y hyperframes@0.8.204 tts "warm up" -v af_heart -o /tmp/warm.wav`).

---

## The prompt

You are a senior motion designer and product-film editor making a **narrated case-study film** for one
project in Hamza Benarfa's developer portfolio (https://benarfa.com/work/<slug>). You work autonomously:
nobody will answer questions, approve previews or pick between options. Decide, record the decision in
`PROCESS.md`, continue.

### Who watches and what they leave with

Founders, product leads and hiring managers deciding whether to hire Hamza (full-stack product engineer,
Tunis). They click play on the case-study page and give it 10 seconds. By the end they can say:
1. what the product is and who it's for (one sentence),
2. the one hard problem it solves, shown working in the real UI,
3. that the engineering underneath is serious (one concrete mechanism, not a list of logos).

A case-study film, not an ad: no hype, no fake metrics, no testimonials.

### Fixed spec (identical for all three)

| Item | Value |
|---|---|
| Canvas | 1920×1080, 30 fps, landscape; displayed about 1000 px wide on the page |
| Length | 45–60 s; the narration sets it |
| Voice | Kokoro-82M, `af_heart`, `--speed 0.92`, English, generated locally |
| Music | `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (CC BY 4.0); choose your own in-point |
| SFX | Kenney CC0 from the shared library, only on visible actions |
| Captions | Soft captions in `captions.en.vtt`; nothing burned in |
| Mastering | The shared ffmpeg step below, identical for all three |

### Story shape

Write the script and a scene table before any animation. Five beats, as proportions:

1. **Hook (~5%).** The problem as one concrete image a viewer recognizes, plus one line. Frame 0 already
   shows it: no logo, no black.
2. **Reveal (~10%).** Product name and one-line promise over its real UI.
3. **In use (~45%).** Two or three moments of the real flow, entry → key action → result. The cursor or
   finger does real things; at least one push-in on the detail being narrated.
4. **The hard part (~25%).** The mechanism named in the slot, made visible: drawn over or growing out of
   the UI it governs, readable in 3 s. Not a slide of boxes on a dark ground.
5. **End card (~10%).** Name, live domain, 3–5 item stack line, "Case study by Hamza Benarfa". Built, not
   a still; then held ≥ 2.5 s over the music tail.

Each beat carries one on-screen line (≤ 6 words) stating its point, so the film reads with the sound off.
Something moves or changes at least every 2–3 s (the UI acting counts); the end-card hold is exempt. Use
two or more distinct stagings (browser frame on the brand ground, phone, full-bleed crop, the diagram over
the UI) and transitions caused by something on screen; at most a third of the seams are hard cuts.

### Narration

- Kokoro `af_heart` at 0.92 reads about 2.75 words/s including its own sentence pauses (measured).
  Budget **115–145 words**, 10–16 sentences of 6–16 words, one idea each.
- Write for the ear: contractions, concrete nouns, numbers as words ("twenty percent"). Third or second
  person, never "I" or "we". Say what the picture can't; never read on-screen text aloud word for word.
- Banned: streamline, seamless, revolutionize, game-changer, cutting-edge, leverage, empower, unlock,
  robust, effortless, "in today's world", "say goodbye to", stacked rhetorical questions.
- Keep two files: `script.txt` (real spelling; the VTT and transcript come from it) and `script.tts.txt`
  (what Kokoro reads). Avoid acronyms in the voice; where unavoidable, respell: "Meilisearch" → "Meili
  search", "Next.js" → "Next J S", "QR" → "Q R", "RTL" → "right to left", "TND"/"DT" → "dinars",
  "D17" → "D seventeen", "OTP" → "a one-time code", "SaaS" → "software as a service", "PostgreSQL" → "Postgres".
- **One clip per sentence:** `npx -y hyperframes@0.8.204 tts "<sentence>" -v af_heart --speed 0.92 -o vo/NN.wav`;
  measure each with `ffprobe`; place clips with 0.3–0.6 s between sentences inside a beat and 0.6–1.0 s
  across beats. The picture follows the voice: a UI action or a line lands on the word that names it, never
  before its sentence starts. No voiceless gap over 1.2 s except the end-card tail.
- Check pronunciation once: concatenate the clips, `npx -y hyperframes@0.8.204 transcribe vo/all.wav --model small.en`,
  diff against `script.txt`, respell and regenerate the sentences that came back wrong.
- VTT cues are clip offsets: one cue per sentence, `[start, start + duration]`, text from `script.txt`.

### Visual rules

- **Brand:** colors, fonts and radii from the project's code (the slot lists the files); ship fonts inside
  the film project. The film looks like the product, not the portfolio.
- **Real UI, in this order:** (1) the live site's public pages, captured with Playwright (`playwright-core` in
  the portfolio's `node_modules`, Chrome at `/usr/bin/google-chrome`; desktop 1440×900 @2x, mobile 390×844 @3x;
  `recordVideo` for real scroll and interaction); (2) the real captures already in the portfolio's `public/`;
  (3) screens rebuilt from the project's real markup, styles and assets, for anything behind a login, labelled
  "Demo data" in 22 px type (exempt from the size floor). No stock footage, no AI-generated UI, no lorem ipsum.
  Don't run the projects locally: their env files point at production services.
- **No slideshow.** A capture never sits still under a pan. Every capture is staged: in a device or browser
  frame with a cursor or finger acting, a push-in to the narrated detail, or a layered rebuild. A full-page
  shot is an establishing shot (≤ 1.5 s); anything narrated is framed so its UI text is ≥ 24 px in the 1080 frame.
- **Film-authored type:** ≥ 40 px (labels ≥ 28 px), ≤ 8 words per line, held 0.5 s + 0.3 s per word once
  settled, dead still after landing, inside the 90% safe box, WCAG AA (4.5:1) against what is behind it.
  Judge legibility on a 50%-scaled snapshot; that is the page size.
- **Motion:** eased, 250–700 ms for UI moves, expo-out or a 0.7–0.85 damped spring for arrivals, exits
  shorter than entrances, one transition language for the film. No breathing or floating loops, no click
  rings, not every element fading and sliding up.
- **Sound:** the voice is the clock. The bed enters on a strong bar, sits 14–18 dB under the voice while
  anyone speaks (a volume envelope, not a constant), comes up under the end card and fades on a bar. SFX:
  clicks on cursor clicks, pops on a status change, one impact on the reveal; each 3–6 dB over the bed,
  peaking a frame after its picture; rotate takes. Nothing synthesized.

### Truth rules (non-negotiable)

- Every claim in narration and on screen is verifiable in the code or on the live site; code beats portfolio
  copy; list mismatches in `PROCESS.md`. No numbers that aren't in the code or the portfolio copy.
- Live sites are production: browse and capture public pages only. Never sign in, sign up, order, submit a
  form or trigger an OTP or magic link there. Authenticated screens come from the existing captures or a rebuild.
- Never open, print or copy `.env*` files, secrets, tokens or internal hostnames.
- No real customer, supplier, restaurant or user data on screen; if a live page shows third-party data,
  don't use that capture (the seeded demo tenants and demo catalogues are fine).

### Shared resources

- `export HYPERFRAMES_PYTHON=$HOME/.local/share/kokoro-venv/bin/python`; the Kokoro model is
  `~/.cache/hyperframes/tts/models/kokoro-v1.0.onnx` (verify it exists before the first `tts`).
- Pin `hyperframes` to `0.8.204` everywhere (`npx -y hyperframes@0.8.204 …` or package.json scripts).
- Music: `~/.local/share/video-skills/brag/skills/brag/assets/music/`, beat maps in `music/cues/`.
  SFX: `…/brag/assets/sfx/`, catalogued in `sfx-analysis.md`.
- Heavy renders are serialized: wrap every full render in `flock /tmp/claude-1000/portfolio-render.lock <command>`
  and cap workers at 6 (HyperFrames `--workers 6`, Remotion `--concurrency 6`). Checks, previews and stills
  don't need the lock. Free RAM is ~10 GB shared by four agents: keep one browser per agent and close it.
- Budget: 4 h wall-clock and 3 full-quality renders per film. Over budget: deliver what you have and say so.

### Engine notes (this brief wins over the engine's own rules on these points)

The Brag and HyperFrames skills are not registered as slash commands; read them from disk and follow them:
Brag `~/.local/share/video-skills/brag/skills/brag/SKILL.md` and `references/`; HyperFrames
`~/.local/share/video-skills/hyperframes/skills/{hyperframes,hyperframes-cli,hyperframes-registry,media-use}/SKILL.md`;
Remotion `~/.claude/skills/remotion-best-practices/SKILL.md`.

- **All three.** No stops: you have approval to render; don't wait for a preview review or a storyline pick.
  The media-use HeyGen preflight is already decided: local Kokoro, no sign-in, no `resolve` for voice or
  music. No `publish`, `cloud`, `lambda`, `feedback` or `usage`. Stop every preview or dev server you started.
- **Brag.** Run the equivalent of `/brag --full --voice --tone polished --format landscape --duration 55`,
  with cwd = the source folder from the slot; the project to inspect is the repo path in the slot (read it
  by path; don't write into it). The 15–25 s law and the "scene durations sum to 15–25 s" gates are replaced
  by 45–60 s; scene count follows the five beats, not the tone table. Use per-sentence voice clips, not one
  `voiceover.wav` at `data-start=0`. Skip the poster-as-frame-0 bake and `share-copy.txt`; audio-reactive and
  beat-lock checklist items are optional. Brag's own skip of HyperFrames `story.md`, `SPEC.md` and `REVIEW.md` stands.
- **HyperFrames.** Follow the full loop: `story.md` (build your recommended storyline, name the other two
  in `STORYLINES.md`), `SPEC.md`, `check --json` with 0 errors, `snapshot --review`, `REVIEW.md`. The five
  beats are the spine. No in-film captions track.
- **Remotion.** `npx create-video@latest --yes --blank --no-tailwind <source folder>`. Don't open Studio;
  rendering is explicitly requested. Voice clips are files in `public/voice/` with measured durations in a
  scene table (the ElevenLabs path in `voiceover.md` doesn't apply); `calculateMetadata` sizes the
  composition. Audio via `@remotion/media`, fonts via `@remotion/fonts`, scenes via `<TransitionSeries>`.
  Don't use `@remotion/captions`; write the VTT from clip offsets.
  Render: `npx remotion render <id> raw.mp4 --codec h264 --crf 16 --concurrency 6`.

### Delivery contract

Render a high-quality master `raw.mp4` (CRF 16–18) with your engine, then master it with this exact step so
the three films are encoded and loudness-matched identically:

```bash
ffmpeg -i raw.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary   # read integrated I
G=$(python3 -c "print(round(-14 - (<I>), 2))")
ffmpeg -y -i raw.mp4 -af "volume=${G}dB,alimiter=limit=0.8:attack=5:release=60:level=false,aresample=48000" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -r 30 -crf 21 -maxrate 1800k -bufsize 3600k \
  -c:a aac -b:a 160k -movflags +faststart film.mp4
ffmpeg -i film.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary   # expect I −14 ±1, TP ≤ −1.5
ffmpeg -y -ss <posterTime> -i film.mp4 -frames:v 1 -q:v 3 poster.jpg
```

Write to `public/videos/<slug>/` in the portfolio:

| File | Spec |
|---|---|
| `film.mp4` | H.264 High, yuv420p, 1920×1080, 30 fps, AAC 48 kHz 160 kbps, `+faststart`, ≤ 14 MB (raise CRF to 23 if over) |
| `poster.jpg` | 1920×1080, the settled reveal frame (product name over real UI), never black or mid-transition, ≤ 250 KB |
| `captions.en.vtt` | WebVTT, one cue per sentence from clip offsets, real spelling |
| `film.json` | `{ "slug", "title", "duration": seconds, "engine": "remotion"\|"hyperframes"\|"brag", "engineVersion", "workflow", "voice": "Kokoro-82M · af_heart", "music": "Happy Beats / Business Moves vol. 12 · Sascha Ende, ende.app (CC BY 4.0)", "sfx": "Kenney (CC0)", "posterTime": seconds, "chapters": [{ "start": seconds, "label": "≤ 3 words" }] (one per beat), "transcript": "<script.txt>" }` |

Keep the editable project in the source folder with a `PROCESS.md`: the script, the scene table (beat,
start, duration, VO clip, visual, on-screen line), every truth check and mismatch, capture method per
screen, commands to re-render, wall-clock per phase, render count, and an honest engine review (what was
fast, what fought you, what you'd change) scored 1–5 on authoring speed, motion quality, audio handling,
render reliability, iteration loop.

### Quality gates (all pass before you report)

1. Engine checks: `npx hyperframes check --json` with 0 errors (list kept warnings with reasons), or
   `tsc --noEmit` plus a successful `npx remotion still`.
2. Snapshot the first frame, the last frame and one settled frame per beat; scale one per beat to 50%.
   **Open every PNG and look.** Fix clipped text, overlaps, illegible type, empty frames, off-brand colors.
3. `ffprobe` confirms codec, size, fps, duration 45–60 s, file ≤ 14 MB; `ebur128` confirms loudness.
4. Timing table: each VO clip's start against the scene it describes; nothing narrates a screen that isn't on yet.
5. Muted scrub: the five beats read from the on-screen lines alone.
6. VTT cue count equals sentence count; cues joined equal `transcript`. Re-read the script against the
   banned list and the truth rules.

### Boundaries

- Don't edit anything under `app/`, `components/`, `data/` or `lib/` in the portfolio, nor anything in the
  project repos. Don't commit, push or deploy; don't touch other projects' video folders.
- No money: no paid APIs, cloud renders or HeyGen sign-in.
- Blocked after three attempts: stop and report it with evidence.

### Report back

Deliverable paths, duration, file size, loudness numbers, the script, truth-check findings, capture method,
phase times, engine scores, and 3 frame paths that best represent the film.
