import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedScreen from '../components/AnimatedScreen';
import MetricCard from '../components/MetricCard';
import AppFooter from '../components/layout/AppFooter';
import { analyzeDestination } from '../services/api';
import { colors } from '../theme/colors';
import { getRiskMeta } from '../utils/mappers';

const SKIN_RISKS = [
  { key: 'dryness', label: 'Dryness Risk' },
  { key: 'acne', label: 'Acne Risk' },
  { key: 'irritation', label: 'Irritation Risk' },
  { key: 'uv_damage', label: 'UV Damage Risk' },
  { key: 'pigmentation', label: 'Pigmentation Risk' },
];

const HAIR_RISKS = [
  { key: 'dryness', label: 'Dryness Risk' },
  { key: 'frizz', label: 'Frizz Risk' },
  { key: 'breakage', label: 'Breakage Risk' },
  { key: 'hairfall', label: 'Hair Fall Risk' },
  { key: 'dandruff', label: 'Dandruff Risk' },
];

function AnimatedRiskBar({ score }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: (Number(score) / 10) * 100,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [score, widthAnim]);

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, { width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
    </View>
  );
}

export default function ResultsScreen({ route, navigation }) {
  const { analysisData } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const resetToAnalyzeStart = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AnalyzeFlow' }],
      }),
    );
  };

  const riskCategories = useMemo(() => {
    return analysisData?.analysisType === 'hair' ? HAIR_RISKS : SKIN_RISKS;
  }, [analysisData?.analysisType]);

  useEffect(() => {
    if (!analysisData) {
      resetToAnalyzeStart();
      return;
    }

    async function loadResults() {
      try {
        setLoading(true);
        setError(null);
        const response = await analyzeDestination(analysisData);
        setResults(response);
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to analyze destination');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [analysisData, navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (event) => {
      const actionType = event.data.action?.type;
      if (!['GO_BACK', 'POP', 'POP_TO_TOP'].includes(actionType)) {
        return;
      }

      event.preventDefault();
      resetToAnalyzeStart();
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <AnimatedScreen>
          <View style={styles.centerCard}>
            <ActivityIndicator color={colors.primaryGreen} size="large" />
            <Text style={styles.loadingTitle}>Analyzing destination...</Text>
            <Text style={styles.loadingSub}>Fetching weather, AQI, water quality and building recommendations.</Text>
          </View>
          <AppFooter />
        </AnimatedScreen>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <AnimatedScreen>
          <View style={styles.centerCard}>
            <Ionicons name="warning-outline" size={44} color={colors.danger} />
            <Text style={styles.errorTitle}>Something went wrong</Text>
            <Text style={styles.errorSub}>{error}</Text>
            <Pressable style={styles.retryBtn} onPress={() => navigation.replace('Results', { analysisData })}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
          <AppFooter />
        </AnimatedScreen>
      </ScrollView>
    );
  }

  if (!results) return null;

  const env = results.env_report || {};
  const risks = results.risks || {};
  const recommendations = results.recommendations || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        <LinearGradient colors={[colors.primaryGreen, colors.primaryBlue]} style={styles.tripCard}>
          <Text style={styles.tripTitle}>Your Trip</Text>
          <Text style={styles.tripText}>{analysisData.cities.homeCity} → {analysisData.cities.destinationCity}</Text>
          <Text style={styles.tripSub}>{analysisData.analysisType === 'hair' ? 'Hair' : 'Skin'} analysis</Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Environmental Conditions</Text>
          <View style={styles.metricGrid}>
            <MetricCard label="Temperature" value={env.temperature_c != null ? `${env.temperature_c}°C` : '-'} />
            <MetricCard label="Humidity" value={env.humidity != null ? `${env.humidity}%` : '-'} />
            <MetricCard label="UV Index" value={env.uv_index ?? '-'} />
            <MetricCard label="AQI" value={env.aqi ?? '-'} />
            <MetricCard label="PM2.5" value={env.pm25 != null ? `${env.pm25} µg/m³` : '-'} />
            <MetricCard label="Water pH" value={env.water_ph ?? '-'} />
          </View>
          {env.coords?.display_name ? <Text style={styles.coords}>📍 {env.coords.display_name}</Text> : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Risk Assessment</Text>
          {riskCategories.map((item) => {
            const score = Number(risks[item.key]) || 0;
            const meta = getRiskMeta(score);
            return (
              <View key={item.key} style={styles.riskRow}>
                <View style={styles.riskTop}>
                  <Text style={styles.riskLabel}>{item.label}</Text>
                  <Text style={[styles.riskValue, { color: meta.color }]}>{score}/10 · {meta.label}</Text>
                </View>
                <AnimatedRiskBar score={score} />
              </View>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          {recommendations.length ? (
            recommendations.map((item, index) => (
              <View key={`${item}-${index}`} style={styles.recItem}>
                <View style={[styles.badge, { backgroundColor: analysisData.analysisType === 'hair' ? colors.primaryBlue : colors.primaryGreen }]}>
                  <Text style={styles.badgeText}>{index + 1}</Text>
                </View>
                <Text style={styles.recText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No recommendations available</Text>
          )}

          {results.confidence ? (
            <View style={styles.confidencePill}>
              <Text style={styles.confidenceText}>Confidence: {results.confidence}</Text>
            </View>
          ) : null}
        </View>
        <AppFooter />
      </AnimatedScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16, paddingBottom: 32 },
  centerCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    minHeight: 240,
    marginBottom: 14,
  },
  loadingTitle: {
    marginTop: 10,
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 20,
  },
  loadingSub: {
    marginTop: 6,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorTitle: {
    marginTop: 10,
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 20,
  },
  errorSub: {
    marginTop: 6,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryBtn: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
  tripCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  tripTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  tripText: {
    color: '#fff',
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  tripSub: {
    marginTop: 2,
    color: '#E5F4EE',
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  metricGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  coords: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 12,
  },
  riskRow: {
    marginBottom: 10,
  },
  riskTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  riskLabel: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  riskValue: {
    fontWeight: '700',
  },
  track: {
    height: 8,
    borderRadius: 99,
    backgroundColor: '#DFE9EF',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primaryGreen,
    borderRadius: 99,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F6FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
  recText: {
    flex: 1,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  emptyText: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  confidencePill: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 999,
    backgroundColor: '#EEF7F2',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  confidenceText: {
    color: colors.success,
    fontWeight: '700',
  },
});
