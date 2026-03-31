import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';
import { colors } from '../theme/colors';

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        <Text style={styles.title}>About GeoDermal</Text>
        <Text style={styles.subtitle}>
          GeoDermal helps travelers adapt skin and hair care routines to destination climate and pollution patterns.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Signals</Text>
          <Text style={styles.cardText}>- Temperature, humidity, UV index</Text>
          <Text style={styles.cardText}>- Air quality including AQI and PM2.5</Text>
          <Text style={styles.cardText}>- Water-quality context where available</Text>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.linkText}>Contact</Text>
          </Pressable>
          <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('Privacy')}>
            <Text style={styles.linkText}>Privacy</Text>
          </Pressable>
        </View>
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
    marginTop: 8,
    lineHeight: 21,
  },
  card: {
    marginTop: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 8,
  },
  cardText: {
    color: colors.textSecondary,
    marginBottom: 4,
  },
  row: {
    marginTop: 14,
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
