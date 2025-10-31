import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { createAnnouncement } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { COMMUNES_MAROC, getCommuneCoordinates } from '../data/communes';

export default function AddAnnouncementScreen({ navigation }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: 'vetements',
    quantity: '1',
    description: '',
    photos: [],
    commune: '',
    latitude: null,
    longitude: null,
  });

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photos: result.assets.map(asset => asset.uri) });
    }
  };

  const handleCommuneChange = (communeValue) => {
    const coordinates = getCommuneCoordinates(communeValue);
    setFormData({
      ...formData,
      commune: communeValue,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.description || !formData.commune || formData.photos.length === 0) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour publier une annonce');
      return;
    }

    try {
      await createAnnouncement(formData);
      Alert.alert('Succès', 'Annonce créée avec succès', [
        { 
          text: 'OK', 
          onPress: () => {
            // Réinitialiser le formulaire
            setFormData({
              category: 'vetements',
              quantity: '1',
              description: '',
              photos: [],
              commune: '',
              latitude: null,
              longitude: null,
            });
            // Naviguer vers Mes Annonces avec flag refresh
            navigation.navigate('Mes Annonces', { refresh: true });
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Erreur lors de la création de l\'annonce');
      console.error('Erreur création annonce:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Catégorie *</Text>
        <Picker
          style={styles.picker}
          selectedValue={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <Picker.Item label="Vêtements" value="vetements" />
          <Picker.Item label="Nourriture" value="nourriture" />
          <Picker.Item label="Meubles" value="meubles" />
          <Picker.Item label="Électronique" value="electronique" />
          <Picker.Item label="Livres" value="livres" />
          <Picker.Item label="Autres" value="autres" />
        </Picker>

        <Text style={styles.label}>Quantité *</Text>
        <TextInput
          style={styles.input}
          value={formData.quantity}
          onChangeText={(text) => setFormData({ ...formData, quantity: text })}
          keyboardType="numeric"
          placeholder="Ex: 5"
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
          placeholder="Décrivez votre don..."
        />

        <Text style={styles.label}>Commune *</Text>
        <Picker
          style={styles.picker}
          selectedValue={formData.commune}
          onValueChange={handleCommuneChange}
        >
          <Picker.Item label="Sélectionnez une commune" value="" />
          {COMMUNES_MAROC.map((commune) => (
            <Picker.Item key={commune.value} label={commune.label} value={commune.value} />
          ))}
        </Picker>

        {formData.latitude && (
          <Text style={styles.coordsText}>
            📍 Coordonnées: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
          </Text>
        )}

        <Text style={styles.label}>Photos *</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImages}>
          <Text style={styles.imageButtonText}>
            {formData.photos.length > 0 ? `${formData.photos.length} photo(s) sélectionnée(s)` : 'Choisir des photos'}
          </Text>
        </TouchableOpacity>

        {formData.photos.length > 0 && (
          <View style={styles.imagePreview}>
            {formData.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.previewImage} />
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Publier l'annonce</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  picker: {
    height: 50,
    marginBottom: 15,
  },
  coordsText: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 15,
  },
  imageButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  imagePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});