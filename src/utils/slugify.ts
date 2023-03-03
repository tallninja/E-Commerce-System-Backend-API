import _slugify from 'slugify';

export const slugify = (text: string) => {
  return _slugify(text, { lower: true, trim: true });
};
