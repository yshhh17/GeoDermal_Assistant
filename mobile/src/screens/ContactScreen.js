import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';
import AppFooter from '../components/layout/AppFooter';
import { colors } from '../theme/colors';

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        <Text style={styles.title}>Contact</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Project</Text>
          <Text style={styles.value}>GeoDermal</Text>
          <Text style={styles.label}>Support</Text>
          <Text style={styles.value}>Reach the project team through your deployment channel.</Text>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.value}>This mobile client uses the same backend services as the web app.</Text>
        </View>
        <AppFooter />
      </AnimatedScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16, paddingBottom: 32 },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  card: {
    marginTop: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
  },
  label: {
    color: colors.textMuted,
    marginTop: 8,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.textPrimary,
    marginTop: 4,
    lineHeight: 20,
  },
});
