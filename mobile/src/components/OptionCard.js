import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function OptionCard({ title, subtitle, emoji, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  selected: {
    borderColor: colors.primaryGreen,
    backgroundColor: '#E9F8F0',
  },
  emoji: {
    fontSize: 26,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 2,
    fontSize: 13,
  },
});
