import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceLogo = path.resolve(
  root,
  "..",
  "apex technology",
  "public",
  "logo-apex.png",
);

const projects = [
  ["arc-interiors", "home design"],
  ["illuminate", "clinic management"],
  ["njmrf-pharmacy", "ecom"],
  ["avea-solutions", "va agency"],
  ["hm-dormitory", "dorm management"],
  ["cv-travel", "travel"],
  ["pinoy-online-venture", "pwa"],
  ["msmalabanan", "sevices"],
  ["kocoon-wellness", "wellness"],
  ["nrs-technologies", "it industry"],
  ["novaterra", "agency"],
  ["corenelius", "Construction"],
  ["r-and-e-travel", "travel and tours"],
  ["wulu-scanner", "trading scanner"],
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function isNearBlack(r, g, b) {
  return r < 22 && g < 22 && b < 22;
}

async function writeTransparentLogo() {
  const brandDir = path.join(root, "public", "brand");
  await ensureDir(brandDir);

  const { data, info } = await sharp(sourceLogo)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const light = Buffer.from(data);
  const dark = Buffer.from(data);
  const samples = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 8 || isNearBlack(r, g, b)) {
      light[i + 3] = 0;
      dark[i + 3] = 0;
      continue;
    }
    samples.push([r, g, b]);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // Silver wordmark disappears on white. Pull those pixels toward navy.
    if (luminance > 150 && b < r + 40) {
      light[i] = 12;
      light[i + 1] = 28;
      light[i + 2] = 52;
    }
  }

  const buckets = new Map();
  for (const [r, g, b] of samples) {
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  const top = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log("logo color buckets", top);

  async function save(buffer, name) {
    const trimmed = await sharp(buffer, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .trim({ threshold: 12 })
      .png()
      .toBuffer();
    await fs.writeFile(path.join(brandDir, name), trimmed);
    const meta = await sharp(trimmed).metadata();
    console.log(name, meta.width, meta.height);
  }

  await save(light, "logo-on-light.png");
  await save(dark, "logo-on-dark.png");

  const mark = await sharp(path.join(brandDir, "logo-on-light.png"))
    .extract({
      left: 0,
      top: 0,
      width: (await sharp(path.join(brandDir, "logo-on-light.png")).metadata()).width,
      height: Math.round(
        ((await sharp(path.join(brandDir, "logo-on-light.png")).metadata()).height ?? 200) *
          0.62,
      ),
    })
    .trim()
    .png()
    .toBuffer();
  await fs.writeFile(path.join(brandDir, "mark.png"), mark);

  const icon = await sharp(path.join(brandDir, "mark.png"))
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await fs.writeFile(path.join(root, "src", "app", "icon.png"), icon);
  await fs.writeFile(path.join(root, "src", "app", "apple-icon.png"), icon);
}

async function optimizeProjects() {
  for (const [slug, dir] of projects) {
    const sourceDir = path.join(root, dir);
    const outDir = path.join(root, "public", "projects", slug);
    await ensureDir(outDir);
    const files = (await fs.readdir(sourceDir))
      .filter((file) => /\.png$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    let index = 1;
    for (const file of files) {
      const input = path.join(sourceDir, file);
      const output = path.join(outDir, `${index}.webp`);
      await sharp(input)
        .rotate()
        .resize({ width: 1800, withoutEnlargement: true })
        .webp({ quality: 76, effort: 5 })
        .toFile(output);
      const meta = await sharp(output).metadata();
      console.log(slug, index, meta.width, meta.height, meta.size);
      index += 1;
    }
  }
}

await writeTransparentLogo();
await optimizeProjects();
