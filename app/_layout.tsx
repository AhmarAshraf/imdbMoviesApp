import React from "react";
import { Stack } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constants/colors";
import { usePathname, useRouter } from "expo-router";

export default function Layout() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Stack screenOptions={{ headerShown: false }} />

      {/* Custom Bottom Navigation */}
      <View style={[styles.navContainer, { backgroundColor: COLORS.bottomNav, borderTopColor: COLORS.divider }]}>
        <TouchableOpacity onPress={() => router.push("/")} style={styles.navItem}>
          <Ionicons
            name="film-outline"
            size={24}
            color={pathname === "/" ? COLORS.bottomNavActive : COLORS.bottomNavInactive}
          />
          <Text style={[styles.label, pathname === "/" && styles.activeLabel]}>Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/search")} style={styles.navItem}>
          <Ionicons
            name="search-outline"
            size={24}
            color={pathname === "/search" ? COLORS.bottomNavActive : COLORS.bottomNavInactive}
          />
          <Text style={[styles.label, pathname === "/search" && styles.activeLabel]}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/seats")} style={styles.navItem}>
          <Ionicons
            name="grid-outline"
            size={24}
            color={pathname === "/seats" ? COLORS.bottomNavActive : COLORS.bottomNavInactive}
          />
          <Text style={[styles.label, pathname === "/seats" && styles.activeLabel]}>
            Seats
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.bottomNav,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    borderTopLeftRadius:22,
    borderTopRightRadius:22,
    
  },
  navItem: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: COLORS.bottomNavInactive,
    marginTop: 2,
  },
  activeLabel: {
    color: COLORS.bottomNavActive,
    fontWeight: "600",
  },
});
