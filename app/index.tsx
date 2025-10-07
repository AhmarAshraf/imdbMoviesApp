import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constants/colors";
import React, { useEffect, useState } from "react";
import { fetchPopularMovies, getImageUrl, TmdbMovie } from "../src/api/tmdb";

const { width } = Dimensions.get("window");

export default function Home() {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  useEffect(() => {
    fetchPopularMovies()
      .then(setMovies)
      .catch(() => setMovies([]));
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.topBar}>
          <Text style={styles.topTitle}>Watch</Text>
          <Link href="/search" asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons
                name="search-outline"
                size={22}
                color={COLORS.textPrimary}
              />
            </TouchableOpacity>
          </Link>
        </View>

        <FlatList
          data={movies}
          keyExtractor={(i) => String(i.id)}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Link href={`/movie/${item.id}`} asChild>
              <TouchableOpacity style={styles.heroCard}>
                <Image
                  source={{ uri: getImageUrl(item.backdrop_path) }}
                  style={styles.heroImage}
                />
                <View style={styles.heroOverlay} />
                <Text numberOfLines={1} style={styles.heroTitle}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  topTitle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: "800" },
  searchBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },

  heroCard: {
    width: "100%",
    height: 190,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: COLORS.overlayGradient,
  },
  heroTitle: {
    position: "absolute",
    left: 14,
    bottom: 14,
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 18,
  },
});
