import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedScreen from '../components/AnimatedScreen';
import AppFooter from '../components/layout/AppFooter';
import { colors } from '../theme/colors';

export default function AboutScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 10) + 10 }]}>
      <AnimatedScreen>
        <Text style={styles.title}>About</Text>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>What is GeoDermal?</Text>
          <Text style={styles.bodyText}>GeoDermal helps travelers adapt skin and hair care routines based on destination conditions like weather, UV, air quality, and water context.</Text>

          <Text style={styles.sectionHeading}>How it helps</Text>
          <Text style={styles.bodyText}>You provide your route and profile, and the app returns risk scores with practical recommendations that are easy to apply during your trip.</Text>

          <Text style={styles.sectionHeading}>Our focus</Text>
          <Text style={styles.bodyText}>We focus on clear insights, useful guidance, and privacy-first handling of your analysis inputs.</Text>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('Contact')}><Text style={styles.linkText}>Contact</Text></Pressable>
          <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('Privacy')}><Text style={styles.linkText}>Privacy</Text></Pressable>
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
    marginBottom: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
  },
  sectionHeading: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 6,
  },
  bodyText: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    gap: 10,
  },
  linkBtn: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  linkText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
