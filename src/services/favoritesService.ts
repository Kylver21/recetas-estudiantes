// Servicio para manejar favoritos en localStorage

const FAVORITES_KEY = 'recetas_favoritas';

export function getFavorites(): number[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addFavorite(id: number): number[] {
  const current = getFavorites();
  if (!current.includes(id)) {
    const updated = [...current, id];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
}

export function removeFavorite(id: number): number[] {
  const current = getFavorites();
  const updated = current.filter(favId => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
