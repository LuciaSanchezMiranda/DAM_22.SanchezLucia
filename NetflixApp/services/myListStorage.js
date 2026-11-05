export const MY_LIST_KEY = '@netflixapp/my-list:v1';

// Solo se guardan datos del catálogo; nunca credenciales del login.
export function normalizeMovies(value) {
  if (!Array.isArray(value)) throw new Error('Formato de lista inválido');
  const ids = new Set();
  return value.map((movie) => {
    if (!movie || typeof movie.id !== 'string' || !movie.id ||
        typeof movie.title !== 'string' || !movie.title ||
        typeof movie.image !== 'string' || !movie.image) {
      throw new Error('Título guardado inválido');
    }
    return {
      id: movie.id,
      title: movie.title,
      image: movie.image,
      ...(typeof movie.year === 'string' ? { year: movie.year } : {}),
      ...(typeof movie.genres === 'string' ? { genres: movie.genres } : {}),
    };
  }).filter((movie) => {
    if (ids.has(movie.id)) return false;
    ids.add(movie.id);
    return true;
  });
}

export function createMyListStorage(storage) {
  return {
    async load() {
      const raw = await storage.getItem(MY_LIST_KEY);
      return raw === null ? [] : normalizeMovies(JSON.parse(raw));
    },
    async save(movies) {
      await storage.setItem(MY_LIST_KEY, JSON.stringify(normalizeMovies(movies)));
    },
  };
}
