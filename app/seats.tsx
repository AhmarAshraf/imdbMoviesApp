import { COLORS } from "../src/constants/colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ROWS = 8;
const COLS = 10;

export default function Seats() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const insets = useSafeAreaInsets();

  const toggle = (r: number, c: number) => {
    const key = `${r}-${c}`;
    setSelected((s) => ({ ...s, [key]: !s[key] }));
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const price = selectedCount * 60;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <ScrollView>
        <Text style={styles.title}>The King's Man</Text>
        <View style={styles.dateRow}>
          {["5 Mar", "6 Mar", "7 Mar"].map((d, i) => (
            <View
              key={d}
              style={[styles.dateChip, i === 1 && styles.dateChipActive]}
            >
              <Text style={[styles.dateText, i === 1 && styles.dateTextActive]}>
                {d}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.screen} />
        {Array.from({ length: ROWS }).map((_, r) => (
          <View key={r} style={styles.row}>
            {Array.from({ length: COLS }).map((_, c) => {
              const key = `${r}-${c}`;
              const isSelected = !!selected[key];
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => toggle(r, c)}
                  style={[styles.seat, isSelected && styles.seatSelected]}
                />
              );
            })}
          </View>
        ))}

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: COLORS.seatSelectedBg },
              ]}
            />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                {
                  backgroundColor: COLORS.seatRegularBg,
                  borderWidth: 1,
                  borderColor: COLORS.seatRegularBorder,
                },
              ]}
            />
            <Text style={styles.legendText}>Regular</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: COLORS.blueChipBorder },
              ]}
            />
            <Text style={styles.legendText}>VIP</Text>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>Total Price</Text>
            <Text style={styles.bottomPrice}>$ {price}</Text>
          </View>
          <TouchableOpacity style={styles.cta}>
            <Text style={{ color: COLORS.white, fontWeight: "700" }}>
              Proceed to pay
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16 },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  dateRow: { flexDirection: "row", marginBottom: 12 },
  dateChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceAlt,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateChipActive: {
    backgroundColor: COLORS.blueChipBg,
    borderColor: COLORS.blueChipBorder,
  },
  dateText: { color: COLORS.textMuted, fontWeight: "600" },
  dateTextActive: { color: COLORS.blueChipText },
  screen: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 12,
  },
  row: { flexDirection: "row", justifyContent: "center", marginBottom: 8 },
  seat: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.seatRegularBg,
    margin: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.seatRegularBorder,
  },
  seatSelected: {
    backgroundColor: COLORS.seatSelectedBg,
    borderColor: COLORS.seatSelectedBorder,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendDot: { width: 12, height: 12, borderRadius: 3, marginRight: 6 },
  legendText: { color: COLORS.textSecondary },
  bottomBar: {
    marginTop: 10,
    padding: 12,
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bottomLabel: { color: COLORS.textSecondary, fontSize: 12 },
  bottomPrice: { color: COLORS.textPrimary, fontWeight: "800", marginTop: 2 },
  cta: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
