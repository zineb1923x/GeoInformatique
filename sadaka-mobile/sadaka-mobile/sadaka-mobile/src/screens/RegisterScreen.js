import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { register } from '../services/api';
import { getDeviceInfo } from '../services/deviceInfo';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    confirmEmail: '',
    password: '',
    photo: null,
    deviceInfo: null,
  });

  useEffect(() => {
    loadDeviceInfo();
  }, []);

  const loadDeviceInfo = async () => {
    const deviceInfo = await getDeviceInfo();
    setFormData(prev => ({ ...prev, deviceInfo }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0].uri });
    }
  };

  const handleRegister = async () => {
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.email) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.email !== formData.confirmEmail) {
      Alert.alert('Erreur', 'Les emails ne correspondent pas');
      return;
    }

    try {
      await register(formData);
      Alert.alert('Succès', 'Compte créé avec succès', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de la création du compte');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nom *</Text>
        <TextInput
          style={styles.input}
          value={formData.nom}
          onChangeText={(text) => setFormData({ ...formData, nom: text })}
        />

        <Text style={styles.label}>Prénom *</Text>
        <TextInput
          style={styles.input}
          value={formData.prenom}
          onChangeText={(text) => setFormData({ ...formData, prenom: text })}
        />

        <Text style={styles.label}>Numéro de téléphone *</Text>
        <TextInput
          style={styles.input}
          value={formData.telephone}
          onChangeText={(text) => setFormData({ ...formData, telephone: text })}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Confirmer Email *</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmEmail}
          onChangeText={(text) => setFormData({ ...formData, confirmEmail: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mot de passe *</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        <Text style={styles.label}>Photo personnelle</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          {formData.photo ? (
            <Image source={{ uri: formData.photo }} style={styles.image} />
          ) : (
            <Text style={styles.imageButtonText}>Choisir une photo</Text>
          )}
        </TouchableOpacity>

        {formData.deviceInfo && (
          <View style={styles.deviceInfo}>
            <Text style={styles.deviceInfoText}>
              Appareil: {formData.deviceInfo.model} ({formData.deviceInfo.os})
            </Text>
            <Text style={styles.deviceInfoText}>
              ID: {formData.deviceInfo.imei.substring(0, 20)}...
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
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
  },
  imageButton: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#4CAF50',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  deviceInfo: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  deviceInfoText: {
    fontSize: 12,
    color: '#666',
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
