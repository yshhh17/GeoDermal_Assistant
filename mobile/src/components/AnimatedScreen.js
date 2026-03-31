import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function AnimatedScreen({ children, style }) {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(translate, {
        toValue: 0,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, translate]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fade,
          transform: [{ translateY: translate }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
