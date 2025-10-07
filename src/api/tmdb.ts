const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.warn('EXPO_PUBLIC_TMDB_API_KEY is not set. Please add it to your env.');
}

export type TmdbMovie = {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
};

export function getImageUrl(path: string | null | undefined, size: 'w500' | 'w780' | 'original' = 'w780') {
  if (!path) return undefined as unknown as string;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

async function request<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const usp = new URLSearchParams({ api_key: API_KEY || '', language: 'en-US', ...Object.fromEntries(Object.entries(params).map(([k,v]) => [k, String(v)])) });
  const res = await fetch(`${BASE_URL}${endpoint}?${usp.toString()}`);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchPopularMovies(page = 1): Promise<TmdbMovie[]> {
  const data = await request<{ results: TmdbMovie[] }>(`/movie/popular`, { page });
  return data.results;
}

export async function searchMovies(query: string, page = 1): Promise<TmdbMovie[]> {
  const data = await request<{ results: TmdbMovie[] }>(`/search/movie`, { query, page, include_adult: 0 });
  return data.results;
}

export async function fetchMovieDetail(id: string | number): Promise<TmdbMovie> {
  return request<TmdbMovie>(`/movie/${id}`);
}


