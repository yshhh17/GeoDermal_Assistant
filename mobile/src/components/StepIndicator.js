import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>Step {currentStep} / {totalSteps}</Text>
      <View style={styles.row}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index + 1 <= currentStep;
          return <View key={index} style={[styles.dot, isActive && styles.dotActive]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  text: {
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#D5E1E8',
  },
  dotActive: {
    backgroundColor: colors.primaryGreen,
  },
});
