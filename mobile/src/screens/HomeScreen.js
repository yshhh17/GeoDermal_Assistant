import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedScreen from '../components/AnimatedScreen';
import { colors } from '../theme/colors';

const HIGHLIGHTS = [
  {
    icon: 'partly-sunny-outline',
    title: 'Live Climate Signals',
    text: 'Temperature, humidity, UV and AQI are combined for trip-specific analysis.',
  },
  {
    icon: 'water-outline',
    title: 'Water Quality Context',
    text: 'Uses local water conditions to adjust skin and hair recommendations.',
  },
  {
    icon: 'sparkles-outline',
    title: 'Personalized Routine',
    text: 'Risk scores plus practical steps tailored to your profile and duration.',
  },
];

export default function HomeScreen({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1700,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const floatingStyle = {
    transform: [
      {
        translateY: floatAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        <LinearGradient colors={[colors.bgSecondary, '#E6F6FF', colors.bgAccent]} style={styles.hero}>
          <View style={styles.topPill}>
            <Ionicons name="sparkles" size={14} color={colors.primaryGreen} />
            <Text style={styles.topPillText}>Travel-ready skin & hair intelligence</Text>
          </View>

          <Text style={styles.title}>GeoDermal</Text>
          <Text style={styles.subtitle}>Know how your destination climate will affect your skin and hair before you travel.</Text>

          <View style={styles.heroStatsWrap}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>30+</Text>
              <Text style={styles.heroStatLabel}>Cities</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>2</Text>
              <Text style={styles.heroStatLabel}>Modes</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>Real-time</Text>
              <Text style={styles.heroStatLabel}>Signals</Text>
            </View>
          </View>

          <View style={styles.ctaRow}>
            <Pressable style={styles.cta} onPress={() => navigation.navigate('Analyze')}>
              <Text style={styles.ctaText}>Start Analysis</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </Pressable>
            <Pressable style={styles.secondaryCta} onPress={() => navigation.navigate('How it Works')}>
              <Text style={styles.secondaryCtaText}>How it Works</Text>
            </Pressable>
          </View>

          <Animated.View style={[styles.floatingBadge, floatingStyle]}>
            <Ionicons name="shield-checkmark" size={14} color={colors.primaryBlue} />
            <Text style={styles.floatingBadgeText}>Actionable recommendations</Text>
          </Animated.View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You Get</Text>
          {HIGHLIGHTS.map((item) => (
            <View key={item.title} style={styles.featureRow}>
              <View style={styles.featureIconWrap}>
                <Ionicons name={item.icon} size={18} color={colors.primaryGreen} />
              </View>
              <View style={styles.featureTextWrap}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureBody}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipCard}>
          <Ionicons name="information-circle-outline" size={20} color={colors.primaryBlue} />
          <Text style={styles.tipText}>Tip: Use your home city and exact destination for more accurate risk scoring.</Text>
        </View>
      </AnimatedScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  hero: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#DCEAF4',
    overflow: 'hidden',
  },
  topPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFFCC',
    borderRadius: 999,
    paddingHorizontal: 10,
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
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 22,
    fontSize: 15,
    maxWidth: '95%',
  },
  heroStatsWrap: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFFCC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8E6F1',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  heroStatValue: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 15,
  },
  heroStatLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  ctaRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },
  secondaryCta: {
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  secondaryCtaText: {
    color: colors.primaryBlue,
    fontWeight: '700',
    fontSize: 14,
  },
  cta: {
    backgroundColor: colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  floatingBadge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFFE6',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8E6F1',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  floatingBadgeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  featureIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 2,
  },
  featureBody: {
    color: colors.textSecondary,
    lineHeight: 20,
    fontSize: 13,
  },
  tipCard: {
    marginTop: 12,
    backgroundColor: '#EEF5FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7E5FA',
    padding: 12,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    color: colors.textSecondary,
    lineHeight: 19,
    fontSize: 13,
  },
});
