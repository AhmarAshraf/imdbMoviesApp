import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function MovieCard({ movie, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <Text numberOfLines={1} style={styles.title}>{movie.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', marginBottom: 20 },
  poster: { width: '100%', height: 220, borderRadius: 10 },
  title: { color: COLORS.textPrimary, marginTop: 8, fontWeight: '600' }
});
