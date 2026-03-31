import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function PrimaryButton({ title, onPress, disabled = false, variant = 'green', style }) {
  const scale = useRef(new Animated.Value(1)).current;

  const bgColor = variant === 'blue' ? colors.primaryBlue : colors.primaryGreen;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.button,
          { backgroundColor: bgColor },
          disabled && styles.disabled,
        ]}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
