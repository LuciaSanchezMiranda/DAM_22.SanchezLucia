import React from 'react';
import { Pressable, Text } from 'react-native';
import { useMyList } from '../context/MyListContext';

export default function MyListButton({ movie, style, textStyle }) {
  const { contains, toggleMovie, disabled, loading, saving } = useMyList();
  const saved = contains(movie.id);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${saved ? 'Quitar' : 'Agregar'} ${movie.title} ${saved ? 'de' : 'a'} Mi lista`}
      accessibilityState={{ disabled, selected: saved }}
      disabled={disabled}
      onPress={() => toggleMovie(movie)}
      style={({ pressed }) => [style, (pressed || disabled) && { opacity: 0.55 }]}
    >
      <Text style={textStyle}>
        {loading ? 'Cargando lista…' : saving ? 'Guardando…' : saved ? '✓ En mi lista' : '+ Mi lista'}
      </Text>
    </Pressable>
  );
}
