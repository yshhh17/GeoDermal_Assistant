import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedScreen from '../components/AnimatedScreen';
import AppFooter from '../components/layout/AppFooter';
import HomeHero from '../components/home/HomeHero';
import HomeSpotlightCard from '../components/home/HomeSpotlightCard';
import HomeFeaturesSection from '../components/home/HomeFeaturesSection';
import { FEATURE_CARDS, SPOTLIGHT_CARDS } from '../constants/homeContent';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % SPOTLIGHT_CARDS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingTop: 12, paddingBottom: 94 + insets.bottom },
        ]}
      >
        <AnimatedScreen>
          <HomeHero
            onPressAnalyze={() => navigation.navigate('Analyze')}
            onPressHowItWorks={() => navigation.navigate('How it Works')}
          />
          <HomeSpotlightCard
            cards={SPOTLIGHT_CARDS}
            activeIndex={activeCard}
            onPressPrev={() => setActiveCard((prev) => (prev === 0 ? SPOTLIGHT_CARDS.length - 1 : prev - 1))}
            onPressNext={() => setActiveCard((prev) => (prev + 1) % SPOTLIGHT_CARDS.length)}
            onPressDot={(index) => setActiveCard(index)}
          />
          <HomeFeaturesSection features={FEATURE_CARDS} />
          <AppFooter />
        </AnimatedScreen>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  content: {
    padding: 16,
  },
});
