import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function FactCard({ title = 'Quick Fact', fact, variant = 'green' }) {
  const isBlue = variant === 'blue';

  return (
    <View style={[styles.card, isBlue ? styles.cardBlue : styles.cardGreen]}>
      <Text style={[styles.title, isBlue ? styles.titleBlue : styles.titleGreen]}>{title}</Text>
      <Text style={styles.fact}>{fact}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cardGreen: {
    backgroundColor: colors.bgSecondary,
    borderColor: colors.primaryGreen,
  },
  cardBlue: {
    backgroundColor: colors.bgAccent,
    borderColor: colors.primaryBlue,
  },
  title: {
    fontWeight: '800',
    marginBottom: 4,
  },
  titleGreen: {
    color: colors.success,
  },
  titleBlue: {
    color: colors.primaryBlue,
  },
  fact: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
