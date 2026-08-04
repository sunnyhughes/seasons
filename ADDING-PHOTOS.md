# Adding photos to the gallery

You never need to edit `photo.html` by hand. Four steps:

### 1. Put the new photos in the inbox

Drop them into the `photos-inbox/` folder. Any size straight off your phone or
camera is fine — they get shrunk automatically. JPG, PNG, and WEBP all work.

### 2. Run the build script

From the site folder, in the Linux terminal:

```
cd /mnt/chromeos/MyFiles/seasons
python3 build-gallery.py
```

It will rotate each photo upright, shrink it, make a thumbnail, add it to
`photos.json`, and rebuild the gallery. Then it tells you which photos still
need a caption.

### 3. Write the captions

Open `photos.json`. Each new photo looks like this:

```json
{
  "file": "birthday2026.jpg",
  "caption": ""
}
```

Fill in the caption. It's shown under the photo in the grid, used as the
description in the pop-up viewer, and read aloud by screen readers — so write
it the way you'd describe the photo to someone who can't see it.

### 4. Run the script once more

```
python3 build-gallery.py
```

That's it. Preview with:

```
python3 -m http.server 8000
```

then open <http://localhost:8000/photo.html>.

---

## Other things you can do

**Reorder the gallery** — the photos appear in the same order as `photos.json`.
Move entries up or down in that file and run the script again.

**Remove a photo** — delete its entry from `photos.json` and run the script.
The image file stays in `images/`; nothing is thrown away.

**Change a caption** — edit it in `photos.json` and run the script.

---

## Good to know

- **Your originals are safe.** Every photo is copied to `images-original/`
  before being touched. That folder stays on your laptop and is never uploaded
  — it's in `.gitignore`.
- **Don't hand-edit the gallery block** in `photo.html`, between the
  `GALLERY:START` and `GALLERY:END` comments. The script overwrites it.
- **Photos are capped at 1600px** on the long edge with 500px thumbnails. The
  grid only loads thumbnails, so the page stays light on phones. If you ever
  want different sizes, change `FULL_MAX` and `THUMB_MAX` near the top of
  `build-gallery.py`.
- **If a photo comes out sideways**, it means the rotation step was skipped.
  In `build-gallery.py`, `-auto-orient` must always come *before* `-strip` —
  stripping first throws the rotation information away.
