import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';
import { colors } from '../theme/colors';

const STEPS = [
  {
    title: '1. Choose Cities',
    text: 'Pick your home city and your destination from the supported list.',
  },
  {
    title: '2. Select Analysis',
    text: 'Choose skin or hair mode and complete your quick profile quiz.',
  },
  {
    title: '3. Set Trip Duration',
    text: 'Add your travel duration so risk scoring is weighted correctly.',
  },
  {
    title: '4. Get Recommendations',
    text: 'The app calls the existing backend and returns risk scores with care guidance.',
  },
];

export default function HowItWorksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        <Text style={styles.title}>How it Works</Text>
        <Text style={styles.subtitle}>Built on your existing GeoDermal backend pipeline.</Text>
        {STEPS.map((step) => (
          <View key={step.title} style={styles.card}>
            <Text style={styles.cardTitle}>{step.title}</Text>
            <Text style={styles.cardText}>{step.text}</Text>
          </View>
        ))}
      </AnimatedScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16, paddingBottom: 24 },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 16,
  },
  cardText: {
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },
});
