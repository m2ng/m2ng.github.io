// Static site generator for Matthew Ng's CV.
//
// Runs under Bun (bun run build). It uses only `node:` built-ins plus the
// pure-JS `sass` package, so the output is plain static HTML/CSS that renders
// without any JavaScript. The CV content lives in ./data (JSON) and the styling
// in ./styles (SCSS); both are the single source of truth.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.CV_OUT || path.resolve(__dirname, '../../build');

const dataDir = path.join(__dirname, 'data');
const stylesDir = path.join(__dirname, 'styles');
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(root, 'assets');

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

/** Escape a value for safe insertion into HTML text content. */
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Port of the old React `parseTag` utility: resolve a `#tag` token to its
 * display name and (optional) tooltip for the given section.
 */
function parseTag(raw, section) {
  const tagName = raw.replace(/#/g, '').replace(/_/g, ' ').replace(/\s{2,}/, '_');
  const tooltips = tags
    .filter((x) => x.section === section)
    .flatMap((x) => x.tags)
    .filter((x) => x.name === tagName)
    .flatMap((x) => x.tooltip);
  return [tagName, tooltips.length ? tooltips[0] : null];
}

/**
 * Render a single desc-item row as ONE contiguous run of text, with tag tokens
 * inlined as `<span class="tag">` elements. This is what makes the HTML source
 * read like a normal sentence instead of a list of fragmented text nodes.
 */
function descItem(row, section) {
  const highlight = row.startsWith('!!');
  const splits = row.replace(/^!!/, '').trim().split(' ');
  const out = [];
  for (const token of splits) {
    if (token.startsWith('#')) {
      const [tagName, tooltip] = parseTag(token, section);
      const tip = tooltip ? `<div class="tooltip disable-select">${esc(tooltip)}</div>` : '';
      out.push(`<span class="tag"><span>${esc(tagName)}</span>${tip}</span>`);
    } else {
      out.push(esc(token));
    }
  }
  return { html: out.join(' '), highlight };
}

/** Render the "place" of an entry, wrapped in a link when a URL is present. */
function placeLink(place, url) {
  const text = esc(place);
  return url && url.length > 0
    ? `<a class="place" href="${esc(url)}">${text}</a>`
    : text;
}

// ---------------------------------------------------------------------------
// Load the CV content (single source of truth)
// ---------------------------------------------------------------------------

const json = async (name) =>
  JSON.parse(await readFile(path.join(dataDir, name), 'utf8'));

const experience = await json('experience.json');
const skills = await json('skills.json');
const tags = await json('tags.json');

// ---------------------------------------------------------------------------
// Section renderers
// ---------------------------------------------------------------------------

function nameFor(item) {
  const { title, nature, education_details } = item;
  if (nature === 'job') {
    return `<span class="position">${esc(title)}&nbsp;</span>`;
  }
  const { type, major, grade } = education_details;
  return (
    `<span class="education-level">` +
    `<span class="level">${esc(type)}</span> ` +
    `in ` +
    `<span class="major">${esc(major)}&nbsp;</span>` +
    `<span class="grade">(${esc(grade.type)}: ${esc(grade.score)} / ${esc(grade.max_score)})</span>` +
    `&nbsp;</span>`
  );
}

function detailsFor(item) {
  if (!item.details || !item.details.length) return '';
  const lis = item.details
    .map((row) => {
      const { html, highlight } = descItem(row, 'experience');
      const cls = ['desc-item', highlight ? 'highlight' : ''].filter(Boolean).join(' ');
      return `<li class="${cls}"><div>${html}</div></li>`;
    })
    .join('\n                ');
  return `\n              <ul class="history-field desc">\n                ${lis}\n              </ul>`;
}

function historyBlock(item) {
  const cls = ['history', item.effective ? 'present' : ''].filter(Boolean).join(' ');
  return (
    `<div class="${cls}">` +
    `\n              <div class="history-header names">${nameFor(item)}` +
    `<span class="place-group"><span class="at">at</span>&nbsp;${placeLink(item.place, item.url)}</span>` +
    `\n              </div>` +
    `\n              <div class="history-header history-time${item.effective ? ' present' : ''}">${esc(item.time)}</div>` +
    `\n              <div class="full-row history-content${item.effective ? ' present' : ''}">${detailsFor(item)}` +
    `\n              </div>` +
    `\n            </div>`
  );
}

function historyContainer(nature) {
  const items = experience
    .filter(({ visible, nature: n }) => visible && n === nature)
    .map((item) => `            ${historyBlock(item)}`)
    .join('\n');
  return `\n        <div class="history-container">\n${items}\n        </div>`;
}

function skillsHtml() {
  const groups = skills
    .map(({ group, skills: list }) => {
      const lis = list
        .map((row) => {
          const [name] = parseTag(row, 'skills');
          return `<li class="skill tag">${esc(name)}</li>`;
        })
        .join('\n                        ');
      return (
        `\n              <div class="skills-subgroup">\n` +
        `                <div class="subgroup-header">${esc(group)}</div>\n` +
        `                <ul class="skills-list">\n                        ${lis}\n                </ul>\n` +
        `              </div>`
      );
    })
    .join('\n');
  return `\n        ${groups}\n      `;
}

// Contact icons (Material "baseline" SVGs, same as the old React app).
const ICONS = {
  phone:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>',
  mail:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  social:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>',
  location:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
};

function meHtml() {
  const contact = `
          <ul class="contact">
            <li class="contact-method">${ICONS.phone}<span class="default">Print to see my number</span><span class="only-in-print">(+852) 9349 1019</span></li>
            <li class="contact-method">${ICONS.mail}<span><a href="mailto:ngmhmatthew@gmail.com">ngmhmatthew@gmail.com</a></span></li>
            <li class="contact-method social">${ICONS.social}<span><a href="https://www.linkedin.com/in/matthew-ng-85690213b/" target="_blank" rel="noreferrer">LinkedIn</a> | <a href="https://github.com/m2ng/" target="_blank" rel="noreferrer">GitHub</a></span></li>
            <li class="contact-method">${ICONS.location}<span><a href="https://m2ng.github.io/">m2ng.github.io</a><span style="margin-left:2px; margin-right:2px;">/</span><a href="https://m2ng.github.io/blog/">blog</a></span></li>
          </ul>`;
  return `
      <div class="me left subcontainer">
        <img class="profile-pic" src="/assets/MatthewNg_pic.jpg" alt="profile">
        <div class="name">Matthew Ng</div>
        <div class="title"><i>Aiming to be</i> <br>a Full Stack Data Scientist</div>
        ${contact}
        <div class="intro"></div>
      </div>`;
}

function footerHtml() {
  return `
    <div class="footer">
      Feel free to visit the source code of my résumé in <a href="https://github.com/m2ng/m2ng.github.io">https://github.com/m2ng/m2ng.github.io</a>. All rights reserved.
    </div>`;
}

function bodyHtml() {
  return `
    <div class="container">
      <div class="main">
        ${meHtml()}
        <div class="skills left subcontainer">
          <div class="header">Skills</div>
          ${skillsHtml()}
        </div>
        <div class="experience right">
          <div class="subcontainer">
            <div class="header">Working experience</div>
            ${historyContainer('job')}
          </div>
          <div class="subcontainer">
            <div class="header">Education</div>
            ${historyContainer('degree')}
          </div>
        </div>
      </div>
      ${footerHtml()}
    </div>`;
}

// ---------------------------------------------------------------------------
// Assemble the page
// ---------------------------------------------------------------------------

const FONT_STACK = [
  'Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400;1,500',
  'Roboto+Slab:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400;1,500',
  'Roboto+Mono:wght@300',
].map((f) => `https://fonts.googleapis.com/css2?family=${f}&display=swap`);

const fontLink = (extra) => FONT_STACK.map(
  (href) => `<link${extra ? ' ' + extra : ''} href="${href}" rel="stylesheet">`,
).join('\n      ');

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <meta name="description" content="Matthew Ng's CV" />
    ${fontLink('media="print" onload="this.onload=null;this.removeAttribute(\'media\');"')}
    <noscript>
      ${fontLink()}
    </noscript>
    <link rel="stylesheet" href="/assets/index.css" />
    <title>MatthewNg_CV</title>
  </head>
  <body>${bodyHtml()}
  </body>
</html>
`;

// ---------------------------------------------------------------------------
// Emit the site
// ---------------------------------------------------------------------------

async function emitCss() {
  const base = sass.compile(path.join(stylesDir, 'base.scss'), { style: 'expanded' }).css;
  const app = sass.compile(path.join(stylesDir, 'app.scss'), { style: 'expanded' }).css;
  await writeFile(path.join(assetsDir, 'index.css'), base + '\n' + app);
}

async function copyAssets() {
  await copyFile(path.join(publicDir, 'favicon.ico'), path.join(root, 'favicon.ico'));
  await copyFile(path.join(publicDir, 'robots.txt'), path.join(root, 'robots.txt'));
  await copyFile(path.join(publicDir, 'manifest.json'), path.join(root, 'manifest.json'));
  await copyFile(
    path.join(publicDir, 'assets', 'MatthewNg_pic.jpg'),
    path.join(assetsDir, 'MatthewNg_pic.jpg'),
  );
}

await mkdir(root, { recursive: true });
await mkdir(assetsDir, { recursive: true });
await emitCss();
await copyAssets();
await writeFile(path.join(root, 'index.html'), html);

console.log(`Built static CV -> ${root}`);
if (!existsSync(path.join(root, 'index.html'))) throw new Error('index.html missing');
