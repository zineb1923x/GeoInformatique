import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMesAnnonces, deleteAnnouncement, getInterestsByAnnonce } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyAnnouncementsScreen({ navigation }) {
  const { user } = useAuth();
  const route = useRoute();
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
  });

  // Rechargement automatique quand l'écran devient actif
  useFocusEffect(
    useCallback(() => {
      loadMyAnnouncements();
    }, [])
  );

  // Rechargement si on revient avec refresh:true
  useEffect(() => {
    if (route.params?.refresh) {
      loadMyAnnouncements();
      navigation.setParams({ refresh: undefined });
    }
  }, [route.params?.refresh]);

  useEffect(() => {
    applyFilters();
  }, [filters, announcements]);

  const loadMyAnnouncements = async () => {
    try {
      const data = await getMesAnnonces();
      
      // Charger le nombre de demandeurs pour chaque annonce
      const withRequests = await Promise.all(
        data.map(async (annonce) => {
          try {
            const interests = await getInterestsByAnnonce(annonce.id);
            return { ...annonce, requestsCount: interests.length };
          } catch {
            return { ...annonce, requestsCount: 0 };
          }
        })
      );
      
      setAnnouncements(withRequests);
    } catch (error) {
      console.error('Erreur chargement annonces:', error);
      Alert.alert('Erreur', 'Impossible de charger vos annonces');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMyAnnouncements();
    setRefreshing(false);
  };

  const applyFilters = () => {
    let filtered = [...announcements];

    if (filters.category !== 'all') {
      filtered = filtered.filter(item => 
        (item.category === filters.category) || (item.categorie?.toLowerCase() === filters.category)
      );
    }

    if (filters.status !== 'all') {
      if (filters.status === 'available') {
        filtered = filtered.filter(item => (item.quantity || item.quantiteRestante) > 0);
      } else if (filters.status === 'assigned') {
        filtered = filtered.filter(item => (item.quantity || item.quantiteRestante) === 0);
      }
    }

    setFilteredAnnouncements(filtered);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer cette annonce ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAnnouncement(id);
              Alert.alert('Succès', 'Annonce supprimée');
              loadMyAnnouncements();
            } catch (error) {
              Alert.alert('Erreur', error.message || 'Erreur lors de la suppression');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    const qty = item.quantity ?? item.quantiteRestante ?? 0;
    const cat = item.categorie || item.category || 'Autre';
    
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AnnouncementDetails', { announcement: item })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.category}>{cat}</Text>
            <Text style={[styles.status, qty === 0 && styles.statusAssigned]}>
              {qty === 0 ? 'Attribué' : 'Disponible'}
            </Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={14} color="#666" />
              <Text style={styles.commune}>{item.commune}</Text>
            </View>
            <Text style={styles.quantity}>Qté: {qty}</Text>
          </View>
          <View style={styles.requestsContainer}>
            <Icon name="account-multiple" size={16} color="#2196F3" />
            <Text style={styles.requests}>
              {item.requestsCount || 0} demandeur{item.requestsCount > 1 ? 's' : ''}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="delete" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="alert-circle-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Veuillez vous connecter</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Annonces</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddAnnouncement')}
        >
          <Icon name="plus-circle" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
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
          selectedValue={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <Picker.Item label="Tous les statuts" value="all" />
          <Picker.Item label="Disponible" value="available" />
          <Picker.Item label="Attribué" value="assigned" />
        </Picker>
      </View>

      {filteredAnnouncements.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="package-variant" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Aucune annonce</Text>
          <Text style={styles.emptySubtext}>
            Appuyez sur + pour créer votre première annonce
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAnnouncements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
  status: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  statusAssigned: {
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
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commune: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  quantity: {
    fontSize: 12,
    color: '#666',
  },
  requestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  requests: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 10,
    textAlign: 'center',
  },
});