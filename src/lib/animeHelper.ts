// Universal resilient helper for Anime.js across SSR, Webpack, and browser runtimes
let animeInstance: any = null;

const getAnime = () => {
  if (typeof window === 'undefined') return null;
  if (animeInstance) return animeInstance;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkg = require('animejs');
    animeInstance = pkg.default || pkg;
  } catch (err) {
    console.warn('Anime.js runtime loading:', err);
  }
  return animeInstance;
};

export const animate = (targets: any, params: Record<string, any>) => {
  const anime = getAnime();
  if (typeof anime === 'function') {
    return anime({
      targets,
      ...params,
    });
  }
};

export const stagger = (val: number, options?: any) => {
  const anime = getAnime();
  if (anime && typeof anime.stagger === 'function') {
    return anime.stagger(val, options);
  }
  return (el: any, i: number) => i * val;
};
