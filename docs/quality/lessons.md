# Lessons

Each entry is a practice, the evidence for it, why it is so, and when to use it. The motion entries below are what Frametell keeps from public code-rendered films people made with Claude Opus 5.5, collected in [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos). The prompt texts stay with their authors. Nothing in that repository is copied into this one.

## The picture is a pure function of time

**Practice.** A frame depends only on the time being drawn. No CSS transition or animation, no timer, no `requestAnimationFrame`, no value remembered from the previous frame. Anything that changes goes in `P.tick(lt => …)`, and any random number comes from `PV.rng(seed)`.

**Evidence.** The films in that collection that a seekable renderer can actually reshoot say the same thing in the creator's own post: one `draw(t)` or `seek(t)`, no timers, no state carried between frames, a contact sheet, then ffmpeg. See the token-bucket explainer ([ParkerRex](https://x.com/ParkerRex/status/2103206747846701462)), the note that the rule is the pure function rather than the wording ([yankis0x](https://x.com/yankis0x/status/2103502194578174321)), and a 15-second film built as one `seek(t)` rendered with Playwright and ffmpeg ([_koushikde_](https://x.com/_koushikde_/status/2105730717455937635)). The same collection also tags 86 films as GSAP. Those timelines do not seek cleanly.

**Why.** Export and the determinism check draw frames out of order, and draw the same frame twice. A picture that only moves forward cannot be rendered that way.

**When.** Every page. The rule is already in the page agent. Do not relax it to match a GSAP prompt.

## A value that changes target sums one spring per change

**Practice.** One arrival eases with `PV.ease.out`. A value that changes target more than once uses `PV.springTo(lt, [[t, v], …], dur)`: the first value is where it already rests, and each later change adds one closed-form spring. `PV.spring(lt, at, dur)` is the single step, from 0 to a few percent past 1 and then to rest. Clamp either before using it as an opacity. The camera stays on `P.push`, `P.pan` and `P.slam`.

**Evidence.** The one-shape UI films ask for closed-form springs, one spring per target change, summed, so the motion is still a pure function of time, with a tiny overshoot and no bounce ([verbove](https://x.com/verbove/status/2103483957266268381) describes that build). `PV.keys` eases each segment from rest, so a level that rises and then falls stops dead at the joint.

**Why.** The render seeks. A spring that stores velocity from the last frame would be wrong on a second visit to the same time. Summing closed-form steps does not store anything.

**When.** A level, a size or a position retargets inside one page. Not for a single entrance. Not for the camera. Not to fake a loop.

## One object goes through the states

**Practice.** When several beats are the same thing in a new state, the storyboard keeps one `object` and changes what it does. On the page, that object stays. New words come in after it starts to change, and the old words leave before the next change.

**Evidence.** The motion films that hold up repeat one direction: one shape, no cut, the contents swap so two labels never overlap. A fresh card for each beat is the slide-deck look the storyboard lint already rejects.

**Why.** Viewers follow one thing. A new card per sentence throws that away and reads as a deck.

**When.** A process with states of one thing: a jar filling, a balance tipping, a bucket spending tokens. A warm-story film that pans along one world to a new place still pans; this does not replace that.

## A change on the narration's beat, then a hold

**Practice.** Each change lands on a cue (`P.c`, `P.cw`). Something changes every few seconds while the voice runs, and the page holds for about a second after the last move, so the cut to the next page leaves a still picture.

**Evidence.** Many of those films put an event on every beat of a 120 BPM grid and make the last frame equal the first so the clip loops. The beat is the useful part. A Frametell page is not a loop: the next page is a cut, and the voice is the clock.

**Why.** Empty time reads as a stalled film. A loop fights the narration and the cut.

**When.** Every page. Do not lock the picture to a song's BPM unless the film has no voice.

## What this collection does not become

**Practice.** Do not import the prompts, the GSAP timelines, the playable games, the shader reels, or a one-line request such as "make a four-minute short". A subject that is worth telling is rewritten as a Frametell brief, with the numbers the film is allowed to show. Six of those briefs are in `docs/quality/eval/`.

**Evidence.** The collection is 703 prompts: 369 motion, 117 3D, 101 interactive, 116 explainer. The median prompt is 221 characters, and 207 are only part of what the creator used. Its credits say each prompt belongs to its creator. The product here is a narrated explainer with a style pack, a storyboard and a seekable render.

**Why.** Pasting those prompts into the director would fight the grammar cards, and it would republish other people's text.

**When.** Someone proposes a new style, a new example, or a bulk import of that repository. Take the subject and the seek rule. Leave the prompt.
