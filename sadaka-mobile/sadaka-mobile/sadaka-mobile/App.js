import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import AddAnnouncementScreen from './src/screens/AddAnnouncementScreen';
import MyAnnouncementsScreen from './src/screens/MyAnnouncementsScreen';
import AnnouncementDetailsScreen from './src/screens/AnnouncementDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NewsletterScreen from './src/screens/NewsletterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Accueil') iconName = 'home';
          else if (route.name === 'Carte') iconName = 'map-marker';
          else if (route.name === 'Ajouter') iconName = 'plus-circle';
          else if (route.name === 'Mes Annonces') iconName = 'format-list-bulleted';
          else if (route.name === 'Profil') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Carte" component={MapScreen} />
      <Tab.Screen name="Ajouter" component={AddAnnouncementScreen} />
      <Tab.Screen name="Mes Annonces" component={MyAnnouncementsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Inscription' }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="AnnouncementDetails" component={AnnouncementDetailsScreen} options={{ title: 'Détails' }} />
          <Stack.Screen name="Newsletter" component={NewsletterScreen} options={{ title: 'Newsletter' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
