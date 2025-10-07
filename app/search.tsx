import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  searchMovies,
  getImageUrl,
  fetchPopularMovies,
  TmdbMovie,
} from "../src/api/tmdb";
import { COLORS } from "../src/constants/colors";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<TmdbMovie[]>([]);
  const [popular, setPopular] = useState<TmdbMovie[]>([]);
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (q.length > 1) {
        searchMovies(q)
          .then(setResults)
          .catch(() => setResults([]));
      } else {
        setResults([]);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  React.useEffect(() => {
    fetchPopularMovies()
      .then(setPopular)
      .catch(() => setPopular([]));
  }, []);
  const insets = useSafeAreaInsets();
  const categories: Array<{ id: number; name: string; image?: string }> =
    popular
      .slice(0, 10)
      .map((m) => ({
        id: m.id,
        name: (m.title || "").split(" ")[0],
        image: getImageUrl(m.backdrop_path || m.poster_path),
      }));

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.searchRow}>
        <View style={styles.inputWrap}>
          <Ionicons
            name="search-outline"
            size={18}
            color={COLORS.textSecondary}
            style={styles.leftIcon}
          />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="TV shows, movies and more"
            placeholderTextColor={COLORS.placeholder}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setQ("")}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="close"
              size={18}
              color={COLORS.textSecondary}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {q.length > 1 ? (
        <FlatList
          key="results"
          data={results}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Link href={`/movie/${item.id}`} asChild>
              <TouchableOpacity style={styles.row}>
                <Image
                  source={{ uri: getImageUrl(item.poster_path) }}
                  style={styles.thumb}
                />
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.overview}>
                    {item.overview}
                  </Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No results</Text>}
        />
      ) : (
        <FlatList
          key="categories-2cols"
          data={categories}
          keyExtractor={(i) => String(i.id)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          renderItem={({ item }) => (
            <Link href={`/movie/${item.id}`} asChild>
              <TouchableOpacity style={styles.catCard}>
                <Image source={{ uri: item.image }} style={styles.catImage} />
                <View style={styles.catOverlay} />
                <Text style={styles.catLabel}>{item.name}</Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16 },
  searchRow: { marginBottom: 12 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 12,
  },
  leftIcon: { marginHorizontal: 8 },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textPrimary,
    paddingHorizontal: 4,
  },
  rightIcon: { marginRight: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  thumb: { width: 72, height: 100, borderRadius: 6 },
  title: { color: COLORS.textPrimary, fontWeight: "700" },
  overview: { color: COLORS.textSecondary, marginTop: 4 },
  empty: { color: COLORS.textSecondary, marginTop: 20, textAlign: "center" },
  catCard: {
    width: "48%",
    height: 104,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  catImage: { width: "100%", height: "100%" },
  catOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 8,
    backgroundColor: COLORS.overlayGradient,
  },
  catLabel: { color: COLORS.white, fontWeight: "700" },
});
