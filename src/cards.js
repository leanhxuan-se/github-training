import { examples } from './examples.js';

export const organizerId = 'leanhxuan-se';
export const repository = `https://github.com/${organizerId}/github-training`;

const records = import.meta.glob('../members/*/card.json', {
  eager: true,
  import: 'default',
  query: '?raw',
});

const images = import.meta.glob('../members/*/{avatar,cover}.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?url',
});

const themes = ['mint', 'lavender', 'peach', 'blue', 'yellow', 'rose'];
const patterns = ['orbit', 'arches', 'grid', 'steps', 'petals', 'waves', 'none'];
const imageExtensions = ['webp', 'png', 'jpg', 'jpeg'];
const username = /^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/;

function findImage(directory, type) {
  return imageExtensions.map((extension) => images[`${directory}/${type}.${extension}`]).find(Boolean);
}

function cleanTags(tags) {
  return Array.isArray(tags)
    ? [...new Set(tags.filter((tag) => typeof tag === 'string').map((tag) => tag.trim()).filter(Boolean))]
    : [];
}

function readCard(path, source) {
  const directory = path.slice(0, path.lastIndexOf('/'));
  const id = directory.split('/').at(-1);
  const card = JSON.parse(source);
  const name = typeof card?.name === 'string' ? card.name.trim() : '';

  if (!username.test(id) || !name) {
    throw new Error('Cần tên thư mục GitHub hợp lệ và trường name.');
  }

  return {
    id,
    name,
    role: typeof card.role === 'string' ? card.role.trim() : '',
    bio: typeof card.bio === 'string' ? card.bio.trim() : '',
    tags: cleanTags(card.tags),
    theme: themes.includes(card.theme) ? card.theme : 'mint',
    pattern: patterns.includes(card.pattern) ? card.pattern : 'orbit',
    initials: typeof card.initials === 'string' ? card.initials.trim() : '',
    avatar: findImage(directory, 'avatar'),
    cover: findImage(directory, 'cover'),
  };
}

export const invalidCards = [];
export const members = Object.entries(records).flatMap(([path, source]) => {
  try {
    return [readCard(path, source)];
  } catch (error) {
    invalidCards.push({
      path: path.replace(/^\.\.\//, ''),
      reason: error instanceof SyntaxError ? 'Kiểm tra cú pháp JSON.' : error.message,
    });
    return [];
  }
}).sort((a, b) => {
  if (a.id === organizerId) return -1;
  if (b.id === organizerId) return 1;
  return a.name.localeCompare(b.name, 'vi') || a.id.localeCompare(b.id);
});

export const showExamples = members.every((member) => member.id === organizerId);
export const cards = showExamples ? [...members, ...examples] : members;
