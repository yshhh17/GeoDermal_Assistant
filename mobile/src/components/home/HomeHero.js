import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function HomeHero({ onPressAnalyze, onPressHowItWorks }) {
  return (
    <LinearGradient colors={[colors.bgSecondary, colors.bgAccent, colors.bgSecondary]} style={styles.hero}>
      <View style={styles.topPill}>
        <Ionicons name="location-outline" size={14} color={colors.primaryBlue} />
        <Text style={styles.topPillText}>Climate-aware beauty, city by city</Text>
      </View>

      <Text style={styles.title}>Empowering Your Skin and Hair</Text>
      <Text style={styles.titleAccent}>on Every Journey</Text>
      <Text style={styles.subtitle}>Get science-backed recommendations for skin and hair health wherever you go.</Text>

      <View style={styles.ctaRow}>
        <Pressable style={styles.cta} onPress={onPressAnalyze}>
          <Text style={styles.ctaText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </Pressable>
        <Pressable style={styles.secondaryCta} onPress={onPressHowItWorks}>
          <Text style={styles.secondaryCtaText}>Learn More</Text>
        </Pressable>
      </View>

      <View style={styles.heroSignals}>
        <View style={styles.signalBadge}>
          <Text style={styles.signalEmoji}>🌍</Text>
          <Text style={styles.signalText}>Live Environmental Data</Text>
        </View>
        <View style={styles.signalBadge}>
          <Text style={styles.signalEmoji}>🔬</Text>
          <Text style={styles.signalText}>Science-Backed Insights</Text>
        </View>
        <View style={styles.signalBadge}>
          <Text style={styles.signalEmoji}>✨</Text>
          <Text style={styles.signalText}>Personalized Care</Text>
        </View>
      </View>

      <View style={styles.infoBadge}>
        <Ionicons name="shield-checkmark-outline" size={14} color={colors.primaryBlue} />
        <Text style={styles.infoBadgeText}>Actionable recommendations</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 22,
    borderRadius: 24,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  topPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  topPillText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 31,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  titleAccent: {
    marginTop: 2,
    fontSize: 31,
    fontWeight: '800',
    color: colors.primaryGreen,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 21,
    fontSize: 15,
    maxWidth: '96%',
  },
  ctaRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  cta: {
    backgroundColor: colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    shadowColor: colors.textPrimary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ctaText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryCta: {
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  secondaryCtaText: {
    color: colors.primaryBlue,
    fontWeight: '700',
    fontSize: 14,
  },
  heroSignals: {
    marginTop: 14,
    gap: 8,
  },
  signalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  signalEmoji: {
    fontSize: 14,
  },
  signalText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  infoBadge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  infoBadgeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
});
