import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { getAnnouncements } from '../services/api';

// Fonction pour calculer la distance entre deux points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function HomeScreen({ navigation }) {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    distance: 'all',
    sortBy: 'date',
  });

  useEffect(() => {
    loadAnnouncements();
    getUserLocation();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, announcements, userLocation]);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyFilters = () => {
    let filtered = [...announcements];

    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.search) {
      filtered = filtered.filter(item =>
        item.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (userLocation) {
      filtered = filtered.map(item => ({
        ...item,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          item.latitude,
          item.longitude
        )
      }));

      if (filters.distance !== 'all') {
        const maxDistance = parseInt(filters.distance);
        filtered = filtered.filter(item => item.distance <= maxDistance);
      }

      if (filters.sortBy === 'distance') {
        filtered.sort((a, b) => a.distance - b.distance);
      }
    }

    if (filters.sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredAnnouncements(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AnnouncementDetails', { announcement: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={16} color="#666" />
          <Text style={styles.location}>{item.commune}</Text>
          {item.distance && (
            <Text style={styles.distance}> • {item.distance.toFixed(1)} km</Text>
          )}
        </View>
        <Text style={styles.quantity}>Quantité: {item.quantity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={filters.search}
          onChangeText={(text) => setFilters({ ...filters, search: text })}
        />

        <Picker
          style={styles.picker}
          selectedValue={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <Picker.Item label="Toutes catégories" value="all" />
          <Picker.Item label="Vêtements" value="vetements" />
          <Picker.Item label="Nourriture" value="nourriture" />
          <Picker.Item label="Meubles" value="meubles" />
          <Picker.Item label="Électronique" value="electronique" />
          <Picker.Item label="Livres" value="livres" />
          <Picker.Item label="Autres" value="autres" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={filters.distance}
          onValueChange={(value) => setFilters({ ...filters, distance: value })}
        >
          <Picker.Item label="Toutes distances" value="all" />
          <Picker.Item label="Moins de 5 km" value="5" />
          <Picker.Item label="Moins de 10 km" value="10" />
          <Picker.Item label="Moins de 20 km" value="20" />
          <Picker.Item label="Moins de 50 km" value="50" />
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={filters.sortBy}
          onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
        >
          <Picker.Item label="Trier par date" value="date" />
          <Picker.Item label="Trier par distance" value="distance" />
        </Picker>
      </View>

      <FlatList
        data={filteredAnnouncements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 5,
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  distance: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 12,
    color: '#666',
  },
});
