# remotion-parallel-test

Repo tes buat workflow render Remotion PARALEL via GitHub Actions
(matrix sampai 10 job, tiap job render satu range frame, lalu digabung).

- Composition: `TestComp` — 300 frame @30fps (10 detik), 960x540.
  Isinya: background hue yang muter ikut frame, kotak yang meluncur,
  counter frame besar, dan track tone di `public/tone.wav`.
- Workflow: `.github/workflows/render-parallel.yml`
  (chunk dirender `--muted`; audio di-mux kembali di job merge dari
  `public/tone.wav` — pola yang sama dengan skill claude-animated-shorts).
- Cara jalanin: Actions -> "Render Remotion Parallel" -> Run workflow,
  atau `gh workflow run render-parallel.yml -f composition=TestComp -f total_frames=300 -f chunks=5 -f audio_file=public/tone.wav -f output_name=final.mp4`
