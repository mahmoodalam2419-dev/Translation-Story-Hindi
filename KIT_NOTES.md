# Translation Story Hindi — build kit (updated)

## Folder layout (what goes in your GitHub repo)
```
.github/workflows/build-apk.yml   (the only copy of the workflow)
package.json
capacitor.config.json
patch-android.js
audio.zip                          (60 story clips, unzipped by the build)
www/
  index.html                       (master app: stories, games, English tile, Maths tile)
  sw.js
  ganit-yatra.html                 (Maths course. REPLACE with your 17-day file)
  spoken-english.html              (LearnWell English course page)
  refresh.css, assets/ (logo + icons), vocabulary/ (word lists used by the lessons)
  spoken-english/
    css/course.css
    js/course.js, phrases.js, wordtask.js, engine.js
    js/native-tts.js               (NEW: speaks through the phone's own voices in the APK)
    days/day-01.js ... day-14.js
```

## What changed
- `www/index.html` is the version that has the Maths section (the newer one).
- "Learn English" now opens the LearnWell course (same lessons as the website) in a frame,
  the same way "Ganit Yatra" opens the Maths file. Old in-app English course code is left in place but unused.
- `native-tts.js` lets LearnWell's audio use the Capacitor text-to-speech plugin. In a normal browser it does nothing.
- Duplicate `build-apk.yml` in the root removed.

## Adding a new English day later
1. Add `www/spoken-english/days/day-05.js`.
2. Add one line in `www/spoken-english.html`: `<script src="spoken-english/days/day-05.js"></script>` (above the "ADD NEW DAYS" comment).
3. Commit. GitHub builds a new APK.

## Replacing the Maths file
Upload your new file as `www/ganit-yatra.html` (same name). Commit.

## Update (Days 1–14 · PleasantLearn)
- The LearnWell course is now the current PleasantLearn course: Days 1–14 (Day 7 and Day 14 are weekly tests), the "name 10 words" warm-ups, and the newest engine.
- New folders: `www/vocabulary/` (word lists), `www/assets/` (logo, icons), file `www/refresh.css`. Keep them next to `spoken-english.html`.
- `native-tts.js` is loaded BEFORE `wordtask.js` and `engine.js` in `spoken-english.html`. Do not move it.
- Website analytics and the "testing noindex" line are removed from the app copy of `spoken-english.html`.
- Adding Day 15 later: put `day-15.js` in `www/spoken-english/days/`, add its `<script>` line in `www/spoken-english.html` after day-14, commit.
- Tested here with a fake phone speech plugin: all 14 days load, speaker buttons show, and speech reaches the plugin. The real test is on the phone after the build.
