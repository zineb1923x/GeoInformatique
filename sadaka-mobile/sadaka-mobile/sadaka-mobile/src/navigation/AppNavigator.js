import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Écrans
import HomeScreen from '../screens/HomeScreen';
import MyAnnouncementsScreen from '../screens/MyAnnouncementsScreen';
import InterestsScreen from '../screens/InterestsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddAnnouncementScreen from '../screens/AddAnnouncementScreen';
import AnnouncementDetailsScreen from '../screens/AnnouncementDetailsScreen';
import MapScreen from '../screens/MapScreen';
import NewsletterScreen from '../screens/NewsletterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack pour l'onglet Accueil
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AccueilList" 
        component={HomeScreen} 
        options={{ title: 'Accueil' }}
      />
      <Stack.Screen 
        name="AnnouncementDetails" 
        component={AnnouncementDetailsScreen}
        options={{ title: 'Détails de l\'annonce' }}
      />
      <Stack.Screen 
        name="Map" 
        component={MapScreen}
        options={{ title: 'Carte' }}
      />
    </Stack.Navigator>
  );
}

// Stack pour l'onglet Mes Annonces
function MyAnnouncesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MesAnnoncesList" 
        component={MyAnnouncementsScreen}
        options={{ title: 'Mes Annonces' }}
      />
      <Stack.Screen 
        name="AddAnnouncement" 
        component={AddAnnouncementScreen}
        options={{ title: 'Nouvelle Annonce' }}
      />
      <Stack.Screen 
        name="AnnouncementDetails" 
        component={AnnouncementDetailsScreen}
        options={{ title: 'Détails' }}
      />
    </Stack.Navigator>
  );
}

// Stack pour l'onglet Intérêts
function InterestsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="InteretsList" 
        component={InterestsScreen}
        options={{ title: 'Mes Intérêts' }}
      />
      <Stack.Screen 
        name="AnnouncementDetails" 
        component={AnnouncementDetailsScreen}
        options={{ title: 'Détails' }}
      />
    </Stack.Navigator>
  );
}

// Stack pour l'onglet Profil
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfilMain" 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
      <Stack.Screen 
        name="Newsletter" 
        component={NewsletterScreen}
        options={{ title: 'Newsletter' }}
      />
    </Stack.Navigator>
  );
}

// Navigation principale avec onglets
export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen 
        name="Accueil" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Mes Annonces" 
        component={MyAnnouncesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Intérêts" 
        component={InterestsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profil" 
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}