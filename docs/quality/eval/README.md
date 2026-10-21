# Evaluation set

Six pieces of material, one for each domain in [QUALITY.md](../QUALITY.md) (investing, psychology, history, science, books, technology). `set.json` names the file, the two styles to run it in, and the length.

Run one with the studio, or from a built checkout:

```bash
node apps/cli/dist/cli.js run docs/quality/eval/fee.md --style warm-story --duration 60 --lang en
```

Use the second style in `set.json` for the pair. The numbers in each file are the only numbers the film may put on screen.

These notes are written for Frametell. Where a public code-rendered film suggested the subject, the post is linked from `set.json` and from the note. The prompt from that post is not in this directory. Lessons taken from that kind of film, and the decision not to import the prompts, are in [../lessons.md](../lessons.md).

What is still missing is a scored run: gate results and a fixed review sheet, compared before and after a change to a prompt, the engine or a style.
