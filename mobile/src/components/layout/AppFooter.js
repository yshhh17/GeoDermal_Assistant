import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

export default function AppFooter() {
  const navigation = useNavigation();

  const openUrl = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (_error) {
      // Ignore failure to keep footer resilient on all clients
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.brandBlock}>
        <View style={styles.brandRow}>
          <Ionicons name="leaf" size={18} color={colors.primaryGreen} />
          <Text style={styles.brandTitle}>GeoDermal</Text>
        </View>
        <Text style={styles.brandText}>Empowering your skin and hair health on every journey.</Text>
      </View>

      <View style={styles.linksGrid}>
        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Product</Text>
          <Pressable onPress={() => navigation.navigate('Analyze')}>
            <Text style={styles.linkText}>Analysis</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('How it Works')}>
            <Text style={styles.linkText}>How it Works</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.linkText}>Home</Text>
          </Pressable>
        </View>

        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Pressable onPress={() => navigation.navigate('About')}>
            <Text style={styles.linkText}>About Us</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.linkText}>Contact</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Privacy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.socialRow}>
        <Pressable style={styles.socialBtn} onPress={() => openUrl('https://github.com/yshhh17')}>
          <Ionicons name="logo-github" size={18} color={colors.white} />
        </Pressable>
        <Pressable style={styles.socialBtn} onPress={() => openUrl('https://www.linkedin.com/in/yash-tiwari-b36343289')}>
          <Ionicons name="logo-linkedin" size={18} color={colors.white} />
        </Pressable>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>© 2026 GeoDermal Assistant. All rights reserved.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: colors.textPrimary,
    padding: 14,
  },
  brandBlock: {
    marginBottom: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  brandText: {
    marginTop: 6,
    color: '#9FB3BF',
    lineHeight: 20,
    fontSize: 13,
  },
  linksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  linkSection: {
    flex: 1,
  },
  sectionTitle: {
    color: colors.white,
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 14,
  },
  linkText: {
    color: '#9FB3BF',
    marginBottom: 6,
    fontSize: 13,
  },
  socialRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
  socialBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#253642',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#304451',
  },
  bottomText: {
    color: '#9FB3BF',
    fontSize: 12,
    textAlign: 'center',
  },
});
