import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Linking, Alert, TextInput, Modal } from 'react-native';
import { getAnnouncementRequests, createRequest, assignDonation, deleteRequest, getMyRequests } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AnnouncementDetailsScreen({ route, navigation }) {
  const { announcement } = route.params;
  const { token, user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [hasRequested, setHasRequested] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [assignQuantity, setAssignQuantity] = useState('1');

  useEffect(() => {
    if (announcement.userId === user.id) {
      loadRequests();
    }
    checkMyRequest();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getAnnouncementRequests(announcement.id, token);
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkMyRequest = async () => {
    try {
      const myReqs = await getMyRequests(token);
      const hasReq = myReqs.some(req => req.announcementId === announcement.id);
      setHasRequested(hasReq);
      setMyRequests(myReqs.filter(req => req.announcementId === announcement.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequest = async () => {
    try {
      await createRequest(announcement.id, token);
      setHasRequested(true);
      Alert.alert('Succès', 'Demande envoyée avec succès');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'envoi de la demande');
    }
  };

  const handleDeleteRequest = async (requestId) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer cette demande ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRequest(requestId, token);
              setHasRequested(false);
              Alert.alert('Succès', 'Demande supprimée');
            } catch (error) {
              Alert.alert('Erreur', 'Erreur lors de la suppression');
            }
          },
        },
      ]
    );
  };

  const openAssignModal = (request) => {
    setSelectedRequest(request);
    setAssignQuantity('1');
    setAssignModalVisible(true);
  };

  const handleAssign = async () => {
    const quantity = parseInt(assignQuantity);

    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert('Erreur', 'Quantité invalide');
      return;
    }

    if (quantity > announcement.quantity) {
      Alert.alert('Erreur', 'Quantité supérieure à la quantité disponible');
      return;
    }

    try {
      await assignDonation(announcement.id, selectedRequest.id, quantity, token);
      Alert.alert('Succès', `${quantity} unité(s) attribuée(s) avec succès`);
      setAssignModalVisible(false);
      loadRequests();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'attribution');
    }
  };

  const handleContact = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <Text style={styles.requestName}>{item.userName}</Text>
        <TouchableOpacity onPress={() => handleContact(item.userPhone)}>
          <Text style={styles.contactButton}>📞 {item.userPhone}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.requestDate}>
        Demandé le {new Date(item.date).toLocaleDateString()}
      </Text>
      {announcement.userId === user.id && (
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => openAssignModal(item)}
        >
          <Text style={styles.assignButtonText}>Attribuer</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.category}>{announcement.category}</Text>
        <Text style={styles.date}>{new Date(announcement.date).toLocaleDateString()}</Text>
      </View>

      {announcement.photos && announcement.photos.length > 0 && (
        <ScrollView horizontal style={styles.imageScroll}>
          {announcement.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.image} />
          ))}
        </ScrollView>
      )}

      <View style={styles.content}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{announcement.description}</Text>

        <Text style={styles.label}>Quantité disponible:</Text>
        <Text style={styles.value}>{announcement.quantity}</Text>

        <Text style={styles.label}>Localisation:</Text>
        <Text style={styles.value}>{announcement.commune}</Text>

        {announcement.userId !== user.id && !hasRequested && (
          <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
            <Text style={styles.requestButtonText}>Demander ce don</Text>
          </TouchableOpacity>
        )}

        {announcement.userId !== user.id && hasRequested && (
          <View>
            <Text style={styles.requestedText}>✓ Vous avez déjà demandé ce don</Text>
            {myRequests.map(req => (
              <TouchableOpacity
                key={req.id}
                style={styles.deleteRequestButton}
                onPress={() => handleDeleteRequest(req.id)}
              >
                <Text style={styles.deleteRequestText}>Annuler ma demande</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {announcement.userId === user.id && (
          <View style={styles.requestsSection}>
            <Text style={styles.sectionTitle}>Demandeurs ({requests.length})</Text>
            <FlatList
              data={requests}
              renderItem={renderRequest}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>

      <Modal
        visible={assignModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAssignModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Attribuer le don</Text>
            <Text style={styles.modalText}>
              À: {selectedRequest?.userName}
            </Text>
            <Text style={styles.modalText}>
              Quantité disponible: {announcement.quantity}
            </Text>

            <Text style={styles.modalLabel}>Quantité à attribuer:</Text>
            <TextInput
              style={styles.modalInput}
              value={assignQuantity}
              onChangeText={setAssignQuantity}
              keyboardType="numeric"
              placeholder="1"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAssignModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAssign}
              >
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  imageScroll: {
    height: 250,
  },
  image: {
    width: 300,
    height: 250,
    marginRight: 10,
  },
  content: {
    padding: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  requestButton: {
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestedText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  deleteRequestButton: {
    height: 40,
    backgroundColor: '#f44336',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteRequestText: {
    color: '#fff',
    fontSize: 14,
  },
  requestsSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requestCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  requestName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contactButton: {
    color: '#2196F3',
    fontSize: 12,
  },
  requestDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  assignButton: {
    height: 35,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
