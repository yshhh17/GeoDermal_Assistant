import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function HomeSpotlightCard({ cards, activeIndex, onPressPrev, onPressNext, onPressDot }) {
  const current = cards[activeIndex];

  return (
    <View style={styles.spotlightCard}>
      <View style={styles.spotlightTop}>
        <Text style={styles.spotlightLabel}>Live Travel Spotlight</Text>
        <View style={styles.spotlightControls}>
          <Pressable style={styles.circleBtn} onPress={onPressPrev}>
            <Ionicons name="chevron-back" size={16} color={colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.circleBtn} onPress={onPressNext}>
            <Ionicons name="chevron-forward" size={16} color={colors.textPrimary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.spotlightBody}>
        <View style={[styles.spotlightIconWrap, { backgroundColor: current.accent + '20' }]}>
          <Ionicons name={current.icon} size={22} color={current.accent} />
        </View>
        <View style={styles.spotlightTextWrap}>
          <Text style={styles.spotlightTitle}>{current.title}</Text>
          <Text style={styles.spotlightStat}>{current.stat}</Text>
          <Text style={styles.spotlightDetail}>{current.detail}</Text>
        </View>
      </View>

      <View style={styles.dotRow}>
        {cards.map((item, index) => {
          const active = index === activeIndex;
          return (
            <Pressable key={item.title} onPress={() => onPressDot(index)} style={[styles.dot, active && styles.dotActive]} />
          );
        })}
      </View>

      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatCard}>
          <Text style={styles.quickStatKey}>AQI</Text>
          <Text style={styles.quickStatValue}>Live</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Text style={styles.quickStatKey}>UV</Text>
          <Text style={styles.quickStatValue}>Tracked</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Text style={styles.quickStatKey}>Water</Text>
          <Text style={styles.quickStatValue}>Compared</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spotlightCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
    shadowColor: colors.textPrimary,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  spotlightTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  spotlightLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  spotlightControls: {
    flexDirection: 'row',
    gap: 8,
  },
  circleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgMain,
  },
  spotlightBody: {
    flexDirection: 'row',
    gap: 12,
  },
  spotlightIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotlightTextWrap: {
    flex: 1,
  },
  spotlightTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 27,
  },
  spotlightStat: {
    marginTop: 4,
    color: colors.primaryBlue,
    fontWeight: '700',
    fontSize: 13,
  },
  spotlightDetail: {
    marginTop: 5,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primaryBlue,
  },
  quickStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  quickStatCard: {
    flex: 1,
    borderRadius: 11,
    backgroundColor: colors.bgMain,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    alignItems: 'center',
  },
  quickStatKey: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  quickStatValue: {
    color: colors.textPrimary,
    marginTop: 2,
    fontWeight: '800',
    fontSize: 13,
  },
});
