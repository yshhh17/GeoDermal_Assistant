import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import AnalyzeScreen from './src/screens/AnalyzeScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import HowItWorksScreen from './src/screens/HowItWorksScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const AnalyzeStack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bgMain,
  },
};

function AnalyzeStackScreen() {
  return (
    <AnalyzeStack.Navigator>
      <AnalyzeStack.Screen
        name="AnalyzeFlow"
        component={AnalyzeScreen}
        options={{ title: 'Analyze Destination', headerShadowVisible: false }}
      />
      <AnalyzeStack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Your Results', headerShadowVisible: false }}
      />
    </AnalyzeStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryGreen,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconMap = {
            Home: focused ? 'home' : 'home-outline',
            Analyze: focused ? 'flask' : 'flask-outline',
            'How it Works': focused ? 'sparkles' : 'sparkles-outline',
            About: focused ? 'information-circle' : 'information-circle-outline',
          };

          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analyze" component={AnalyzeStackScreen} />
      <Tab.Screen name="How it Works" component={HowItWorksScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="dark" />
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Contact" component={ContactScreen} />
        <RootStack.Screen name="Privacy" component={PrivacyScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
