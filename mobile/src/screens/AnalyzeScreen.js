import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AnimatedScreen from '../components/AnimatedScreen';
import StepIndicator from '../components/StepIndicator';
import OptionCard from '../components/OptionCard';
import PrimaryButton from '../components/PrimaryButton';
import AppFooter from '../components/layout/AppFooter';
import { colors } from '../theme/colors';
import { INDIAN_CITIES } from '../constants/cities';
import {
  ANALYSIS_TYPES,
  DURATION_OPTIONS,
  HAIR_CONCERNS,
  HAIR_TEXTURES,
  HAIR_TYPES,
  SKIN_CONCERNS,
  SKIN_SENSITIVITY,
  SKIN_TYPES,
} from '../constants/options';

export default function AnalyzeScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [analysisData, setAnalysisData] = useState({
    cities: { homeCity: '', destinationCity: '' },
    analysisType: null,
    typeAnswers: null,
    duration: null,
  });

  const [skinAnswers, setSkinAnswers] = useState({ skinType: '', sensitivity: '', concerns: [] });
  const [hairAnswers, setHairAnswers] = useState({ hairType: '', texture: '', concerns: [] });
  const [duration, setDuration] = useState('');
  const [customDays, setCustomDays] = useState('');

  const totalSteps = 4;

  const canContinueStep1 = useMemo(() => {
    return analysisData.cities.homeCity && analysisData.cities.destinationCity;
  }, [analysisData.cities.destinationCity, analysisData.cities.homeCity]);

  const canContinueStep3 = useMemo(() => {
    if (analysisData.analysisType === 'skin') return Boolean(skinAnswers.skinType && skinAnswers.sensitivity);
    if (analysisData.analysisType === 'hair') return Boolean(hairAnswers.hairType && hairAnswers.texture);
    return false;
  }, [analysisData.analysisType, hairAnswers.hairType, hairAnswers.texture, skinAnswers.sensitivity, skinAnswers.skinType]);

  const canFinish = duration && (duration !== 'custom' || customDays);

  const toggleConcern = (concern, mode) => {
    if (mode === 'skin') {
      setSkinAnswers((prev) => ({
        ...prev,
        concerns: prev.concerns.includes(concern)
          ? prev.concerns.filter((item) => item !== concern)
          : [...prev.concerns, concern],
      }));
      return;
    }

    setHairAnswers((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((item) => item !== concern)
        : [...prev.concerns, concern],
    }));
  };

  const handleFinish = () => {
    const finalDuration = duration === 'custom' ? `${customDays} days` : duration;
    const typeAnswers = analysisData.analysisType === 'skin' ? skinAnswers : hairAnswers;

    const finalData = {
      ...analysisData,
      typeAnswers,
      duration: finalDuration,
    };

    navigation.navigate('Results', { analysisData: finalData });
  };

  const renderCityStep = () => (
    <View>
      <Text style={styles.title}>Where are you traveling?</Text>
      <Text style={styles.subtitle}>Select your home city and destination.</Text>

      <View style={styles.fieldWrap}>
        <Text style={styles.label}>Home City</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={analysisData.cities.homeCity}
            onValueChange={(value) =>
              setAnalysisData((prev) => ({
                ...prev,
                cities: { ...prev.cities, homeCity: value },
              }))
            }
          >
            <Picker.Item label="Select home city" value="" />
            {INDIAN_CITIES.map((city) => (
              <Picker.Item key={`home-${city}`} label={city} value={city} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.fieldWrap}>
        <Text style={styles.label}>Destination City</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={analysisData.cities.destinationCity}
            onValueChange={(value) =>
              setAnalysisData((prev) => ({
                ...prev,
                cities: { ...prev.cities, destinationCity: value },
              }))
            }
          >
            <Picker.Item label="Select destination" value="" />
            {INDIAN_CITIES.map((city) => (
              <Picker.Item key={`dest-${city}`} label={city} value={city} />
            ))}
          </Picker>
        </View>
      </View>

      <PrimaryButton
        title="Continue"
        disabled={!canContinueStep1}
        onPress={() => setStep(2)}
        style={styles.buttonTop}
      />
    </View>
  );

  const renderTypeStep = () => (
    <View>
      <Text style={styles.title}>What do you want to analyze?</Text>
      <Text style={styles.subtitle}>Choose a personalized analysis path.</Text>
      {ANALYSIS_TYPES.map((item) => (
        <OptionCard
          key={item.value}
          title={item.title}
          subtitle={item.subtitle}
          emoji={item.emoji}
          selected={analysisData.analysisType === item.value}
          onPress={() => setAnalysisData((prev) => ({ ...prev, analysisType: item.value }))}
        />
      ))}
      <PrimaryButton
        title="Continue"
        disabled={!analysisData.analysisType}
        onPress={() => setStep(3)}
        style={styles.buttonTop}
      />
    </View>
  );

  const renderSkinQuiz = () => (
    <View>
      <Text style={styles.title}>Tell us about your skin</Text>
      <Text style={styles.subtitle}>We use this to personalize risks and recommendations.</Text>

      <Text style={styles.label}>Skin Type</Text>
      {SKIN_TYPES.map((item) => (
        <OptionCard
          key={item.value}
          title={item.label}
          subtitle={item.description}
          selected={skinAnswers.skinType === item.value}
          onPress={() => setSkinAnswers((prev) => ({ ...prev, skinType: item.value }))}
        />
      ))}

      <Text style={styles.label}>Sensitivity</Text>
      {SKIN_SENSITIVITY.map((item) => (
        <OptionCard
          key={item.value}
          title={item.label}
          selected={skinAnswers.sensitivity === item.value}
          onPress={() => setSkinAnswers((prev) => ({ ...prev, sensitivity: item.value }))}
        />
      ))}

      <Text style={styles.label}>Concerns (Optional)</Text>
      <View style={styles.chipWrap}>
        {SKIN_CONCERNS.map((concern) => {
          const active = skinAnswers.concerns.includes(concern);
          return (
            <Pressable
              key={concern}
              onPress={() => toggleConcern(concern, 'skin')}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{concern}</Text>
            </Pressable>
          );
        })}
      </View>

      <PrimaryButton title="Continue" disabled={!canContinueStep3} onPress={() => setStep(4)} style={styles.buttonTop} />
    </View>
  );

  const renderHairQuiz = () => (
    <View>
      <Text style={styles.title}>Tell us about your hair</Text>
      <Text style={styles.subtitle}>We use this to personalize risks and recommendations.</Text>

      <Text style={styles.label}>Hair Type</Text>
      {HAIR_TYPES.map((item) => (
        <OptionCard
          key={item.value}
          title={item.label}
          subtitle={item.description}
          selected={hairAnswers.hairType === item.value}
          onPress={() => setHairAnswers((prev) => ({ ...prev, hairType: item.value }))}
        />
      ))}

      <Text style={styles.label}>Texture</Text>
      {HAIR_TEXTURES.map((item) => (
        <OptionCard
          key={item.value}
          title={item.label}
          selected={hairAnswers.texture === item.value}
          onPress={() => setHairAnswers((prev) => ({ ...prev, texture: item.value }))}
        />
      ))}

      <Text style={styles.label}>Concerns (Optional)</Text>
      <View style={styles.chipWrap}>
        {HAIR_CONCERNS.map((concern) => {
          const active = hairAnswers.concerns.includes(concern);
          return (
            <Pressable
              key={concern}
              onPress={() => toggleConcern(concern, 'hair')}
              style={[styles.chip, active && styles.chipActiveBlue]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{concern}</Text>
            </Pressable>
          );
        })}
      </View>

      <PrimaryButton title="Continue" disabled={!canContinueStep3} onPress={() => setStep(4)} variant="blue" style={styles.buttonTop} />
    </View>
  );

  const renderDurationStep = () => (
    <View>
      <Text style={styles.title}>How long is your trip?</Text>
      <Text style={styles.subtitle}>Duration helps weight temporary vs long-term risks.</Text>

      {DURATION_OPTIONS.map((item) => (
        <OptionCard
          key={item.value}
          title={item.label}
          emoji={item.emoji}
          selected={duration === item.value}
          onPress={() => {
            setDuration(item.value);
            if (item.value !== 'custom') setCustomDays('');
          }}
        />
      ))}

      {duration === 'custom' ? (
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Number of days</Text>
          <TextInput
            value={customDays}
            onChangeText={setCustomDays}
            keyboardType="number-pad"
            placeholder="e.g. 10"
            style={styles.input}
          />
        </View>
      ) : null}

      <PrimaryButton
        title="Get Results"
        disabled={!canFinish}
        variant={analysisData.analysisType === 'hair' ? 'blue' : 'green'}
        onPress={handleFinish}
        style={styles.buttonTop}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedScreen>
        {step > 1 ? <StepIndicator currentStep={step - 1} totalSteps={totalSteps} /> : null}
        <View style={styles.card}>
          {step === 1 && renderCityStep()}
          {step === 2 && renderTypeStep()}
          {step === 3 && analysisData.analysisType === 'skin' && renderSkinQuiz()}
          {step === 3 && analysisData.analysisType === 'hair' && renderHairQuiz()}
          {step === 4 && renderDurationStep()}
        </View>
        <AppFooter />
      </AnimatedScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 12,
    lineHeight: 20,
  },
  fieldWrap: {
    marginBottom: 12,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  pickerWrap: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FBFDFD',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: '#E9F8F0',
    borderColor: colors.primaryGreen,
  },
  chipActiveBlue: {
    backgroundColor: '#EAF2FF',
    borderColor: colors.primaryBlue,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
  },
  buttonTop: {
    marginTop: 8,
  },
});
