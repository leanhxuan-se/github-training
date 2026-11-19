export const organizerId = import.meta.env.VITE_ORGANIZER_GITHUB?.trim().toLowerCase() || 'leanhxuan-se';
export const repository = import.meta.env.VITE_REPOSITORY_URL?.trim() || 'https://github.com/leanhxuan-se/github-training';

const records = import.meta.glob('../members/*/card.json', {
  eager: true,
  import: 'default',
  query: '?raw',
});

const images = import.meta.glob([
  '../members/*/{avatar,cover}.{webp,png,jpg,jpeg}',
  '../members/*/img/*.{webp,png,jpg,jpeg,avif,WEBP,PNG,JPG,JPEG,AVIF}',
], {
  eager: true,
  import: 'default',
  query: '?url',
});

export const themes = ['mint', 'lavender', 'peach', 'blue', 'yellow', 'rose'];
const patterns = ['orbit', 'arches', 'grid', 'steps', 'petals', 'waves', 'none'];
const imageExtensions = ['webp', 'png', 'jpg', 'jpeg'];
const username = /^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/;

function themeForMember(id) {
  // Assign a palette from the username so reloads and new cards keep existing colors stable.
  let hash = 2166136261;
  for (const character of id) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  }
  return themes[(hash >>> 0) % themes.length];
}

function findDefaultImage(directory, type) {
  return imageExtensions.map((extension) => images[`${directory}/${type}.${extension}`]).find(Boolean);
}

function resolveImage(directory, cardPath, type, value) {
  const relativePath = typeof value === 'string' ? value.trim() : '';
  const selectedImage = relativePath.startsWith('img/') ? images[`${directory}/${relativePath}`] : undefined;
  if (relativePath && !selectedImage) {
    const label = type === 'cover' ? 'ảnh bìa' : 'ảnh đại diện';
    invalidCards.push({
      path: cardPath.replace(/^\.\.\//, ''),
      reason: `Không tìm thấy ${label} ${relativePath}. Kiểm tra tên tệp trong thư mục img.`,
    });
  }
  return selectedImage || findDefaultImage(`${directory}/img`, type) || findDefaultImage(directory, type);
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

  const selectedTheme = typeof card.theme === 'string' ? card.theme.trim().toLowerCase() : '';

  return {
    id,
    name,
    role: typeof card.role === 'string' ? card.role.trim() : '',
    bio: typeof card.bio === 'string' ? card.bio.trim() : '',
    tags: cleanTags(card.tags),
    theme: themes.includes(selectedTheme) ? selectedTheme : themeForMember(id),
    pattern: patterns.includes(card.pattern) ? card.pattern : 'orbit',
    initials: typeof card.initials === 'string' ? card.initials.trim() : '',
    avatar: resolveImage(directory, path, 'avatar', card.avatar),
    cover: resolveImage(directory, path, 'cover', card.cover),
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
