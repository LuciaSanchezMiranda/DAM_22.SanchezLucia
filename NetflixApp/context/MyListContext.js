import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMyListStorage } from '../services/myListStorage';

const MyListContext = createContext(null);
const storage = createMyListStorage(AsyncStorage);

export function MyListProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const busy = useRef(true);
  const currentMovies = useRef([]);

  async function load() {
    busy.current = true;
    setLoading(true);
    setError(null);
    try {
      const saved = await storage.load();
      currentMovies.current = saved;
      setMovies(saved);
      setReady(true);
    } catch {
      setReady(false);
      setError('No se pudo recuperar tu lista. Reintenta para acceder a tus títulos guardados.');
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggleMovie(movie) {
    // El bloqueo inmediato también evita escrituras simultáneas por toques rápidos.
    if (!ready || busy.current) return;
    busy.current = true;
    setSaving(true);
    setError(null);
    const previous = currentMovies.current;
    const next = previous.some((item) => item.id === movie.id)
      ? previous.filter((item) => item.id !== movie.id)
      : [movie, ...previous];
    try {
      await storage.save(next);
      currentMovies.current = next;
      setMovies(next);
    } catch {
      setError('No se pudo guardar el cambio. Tu lista anterior se conserva; vuelve a intentarlo.');
    } finally {
      busy.current = false;
      setSaving(false);
    }
  }

  return (
    <MyListContext.Provider value={{
      movies, loading, saving, error, ready,
      disabled: loading || saving || !ready,
      contains: (id) => movies.some((movie) => movie.id === id),
      toggleMovie,
      retry: load,
    }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  return useContext(MyListContext);
}
