import _slugify from 'slugify';

export const slugify = (value: string) => {
  return _slugify(value, {
    lower: true,
  });
};
