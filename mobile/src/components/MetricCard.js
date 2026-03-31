import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function MetricCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ?? '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    width: '48%',
    marginBottom: 10,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
