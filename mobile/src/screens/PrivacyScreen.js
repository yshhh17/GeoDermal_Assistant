import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';
import AppFooter from '../components/layout/AppFooter';
import { colors } from '../theme/colors';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        <Text style={styles.title}>Privacy</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            GeoDermal stores analysis records through your backend service to improve environmental recommendation quality.
          </Text>
          <Text style={styles.text}>
            This mobile app sends selected city, analysis type and travel duration to the same backend endpoints used by your web app.
          </Text>
          <Text style={styles.text}>
            Avoid embedding secret API keys in mobile code; keep credentials only in backend environment configuration.
          </Text>
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
  text: {
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 10,
  },
});
