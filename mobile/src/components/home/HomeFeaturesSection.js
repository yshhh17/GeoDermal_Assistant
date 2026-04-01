import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function HomeFeaturesSection({ features }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionEyebrow}>Why Choose GeoDermal</Text>
      <Text style={styles.sectionTitle}>Intelligence stacked for faster decisions</Text>
      <Text style={styles.sectionSubtitle}>A focused flow from environment signals to practical daily care.</Text>

      <View style={styles.featuresRail}>
        {features.map((item) => (
          <View key={item.title} style={styles.featureCard}>
            <View style={[styles.featureIconWrap, { backgroundColor: item.accent + '1F' }]}>
              <Ionicons name={item.icon} size={20} color={item.accent} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureBody}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  sectionEyebrow: {
    color: colors.primaryBlue,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sectionTitle: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 30,
  },
  sectionSubtitle: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  featuresRail: {
    marginTop: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryGreen,
    paddingLeft: 10,
    gap: 10,
  },
  featureCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 3,
  },
  featureBody: {
    color: colors.textSecondary,
    lineHeight: 19,
    fontSize: 13,
  },
});
