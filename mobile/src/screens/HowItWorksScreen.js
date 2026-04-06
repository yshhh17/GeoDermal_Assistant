import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedScreen from '../components/AnimatedScreen';
import AppFooter from '../components/layout/AppFooter';
import { colors } from '../theme/colors';

const STEPS = [
  'Select your home city and destination.',
  'Choose whether you want skin or hair analysis.',
  'Answer quick profile questions for personalization.',
  'Set your trip duration.',
  'Get risk scores based on environmental data.',
  'Follow personalized recommendations during travel.',
];

export default function HowItWorksScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 10) + 10 }]}>
      <AnimatedScreen>
        <Text style={styles.title}>How It Works</Text>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Simple 6-step flow</Text>
          {STEPS.map((step, index) => (
            <Text key={step} style={styles.stepText}>{index + 1}. {step}</Text>
          ))}

          <Text style={styles.sectionHeading}>What you get</Text>
          <Text style={styles.bodyText}>A clear report with risk scores and practical recommendations tailored to your destination and profile.</Text>

          <Text style={styles.sectionHeading}>Time needed</Text>
          <Text style={styles.bodyText}>Most analyses take only a few minutes from start to result.</Text>
        </View>

        <AppFooter />
      </AnimatedScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  title: {
    color: colors.textPrimary,
    fontSize: 46,
    fontWeight: '800',
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 6,
  },
  stepText: {
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  bodyText: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
