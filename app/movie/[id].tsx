import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "../../src/constants/colors";
import { fetchMovieDetail, getImageUrl, TmdbMovie } from "../../src/api/tmdb";
import { Ionicons } from "@expo/vector-icons";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [movie, setMovie] = React.useState<TmdbMovie | null>(null);
  React.useEffect(() => {
    if (id)
      fetchMovieDetail(id)
        .then(setMovie)
        .catch(() => setMovie(null));
  }, [id]);
  const insets = useSafeAreaInsets();

  if (!movie)
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Movie not found</Text>
      </View>
    );

  return (
    <ScrollView>
      <View>
        <Image
          source={{ uri: getImageUrl(movie.backdrop_path) }}
          style={styles.backdrop}
        />
        {/* Back button and screen name overlay */}
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 16,
            right: 16,
            flexDirection: "row",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              borderRadius: 20,
              padding: 8,
              marginRight: 10,
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.ctaOverlayRow}>
          <TouchableOpacity
            style={[styles.overlayPrimary]}
            onPress={() => router.push("/seats")}
          >
            <Text style={styles.overlayPrimaryText}>Get Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.overlaySecondary]}>
            <Text style={styles.overlaySecondaryText}>Watch Trailer</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Genres</Text>
        <View style={styles.chipsRow}>
          {[
            {
              name: "Action",
              bg: COLORS.genreActionBg,
              fg: COLORS.genreActionFg,
            },
            {
              name: "Thriller",
              bg: COLORS.genreThrillerBg,
              fg: COLORS.genreThrillerFg,
            },
            {
              name: "Science",
              bg: COLORS.genreScienceBg,
              fg: COLORS.genreScienceFg,
            },
            {
              name: "Fiction",
              bg: COLORS.genreFictionBg,
              fg: COLORS.genreFictionFg,
            },
          ].map((g) => (
            <View key={g.name} style={[styles.chip, { backgroundColor: g.bg }]}>
              <Text style={[styles.chipText, { color: g.fg }]}>{g.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionLabel}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backdrop: { width: "100%", height: 280 },
  // backdropOverlay: { position:'absolute', left:0, right:0, bottom:0, height:110, backgroundColor: COLORS.overlayGradient },
  ctaOverlayRow: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  overlayPrimary: {
    width: "48%",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  overlayPrimaryText: { color: COLORS.white, fontWeight: "700" },
  overlaySecondary: {
    width: "48%",
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  overlaySecondaryText: { color: COLORS.white, fontWeight: "700" },

  card: {
    backgroundColor: COLORS.bg,
    margin: 16,
    marginTop: -12,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sectionLabel: {
    color: COLORS.textPrimary,
    fontWeight: "800",
    marginBottom: 8,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { fontWeight: "700", fontSize: 12 },
  overview: { color: COLORS.textSecondary, lineHeight: 20 },
});
