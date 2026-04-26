#!/usr/bin/env python3
"""Generate placeholder JPEGs under public/catalog/ for offline demos."""
from __future__ import annotations

import hashlib
import os
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "public", "catalog")
PROD = os.path.join(OUT, "products")

SLUGS = [
    "ridgeline-shell-jacket",
    "alder-flannel",
    "field-tee",
    "summit-down-vest",
    "trailwright-pant",
    "harbor-shorts",
    "scout-sneaker",
    "basecamp-boot",
    "carryall-tote",
    "foundry-cap",
    "merino-crew-socks",
    "kettle-coffee",
    "wool-throw",
    "ceramic-mug",
    "trail-beanie",
]


def run_ffmpeg(args: list[str]) -> None:
    r = subprocess.run(
        args,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.PIPE,
        text=True,
    )
    if r.returncode != 0:
        sys.stderr.write(r.stderr or "")
        raise SystemExit(r.returncode)


def muted_rgb(slug: str) -> str:
    h = hashlib.sha256(slug.encode()).digest()
    r = (h[0] % 140) + 50
    g = (h[1] % 130) + 55
    b = (h[2] % 150) + 45
    return f"0x{r:02x}{g:02x}{b:02x}"


def main() -> None:
    os.makedirs(PROD, exist_ok=True)
    for slug in SLUGS:
        color = muted_rgb(slug)
        path = os.path.join(PROD, f"{slug}.jpg")
        run_ffmpeg(
            [
                "ffmpeg",
                "-y",
                "-f",
                "lavfi",
                "-i",
                f"color={color}:s=900x1125:duration=1",
                "-frames:v",
                "1",
                "-q:v",
                "2",
                path,
            ]
        )
        print("wrote", path)

    hero = os.path.join(OUT, "hero.jpg")
    run_ffmpeg(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "color=0x5a7f92:s=1200x1500:duration=1",
            "-frames:v",
            "1",
            "-q:v",
            "2",
            hero,
        ]
    )
    print("wrote", hero)


if __name__ == "__main__":
    main()
