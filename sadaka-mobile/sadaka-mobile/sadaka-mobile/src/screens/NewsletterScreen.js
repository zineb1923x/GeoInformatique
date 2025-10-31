import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { subscribeNewsletter, unsubscribeNewsletter } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function NewsletterScreen() {
  const { user, token } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer un email');
      return;
    }

    try {
      await subscribeNewsletter(email, token);
      setIsSubscribed(true);
      Alert.alert('Succès', 'Vous êtes maintenant abonné à la newsletter');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'abonnement');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeNewsletter(email, token);
      setIsSubscribed(false);
      Alert.alert('Succès', 'Vous êtes désabonné de la newsletter');
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors du désabonnement');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>📧</Text>
        <Text style={styles.title}>Newsletter SADAKA</Text>
        <Text style={styles.description}>
          Recevez les dernières annonces de dons directement dans votre boîte mail.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="votre@email.com"
        />

        {!isSubscribed ? (
          <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
            <Text style={styles.buttonText}>S'abonner</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.subscribedText}>✓ Vous êtes abonné</Text>
            <TouchableOpacity style={styles.unsubscribeButton} onPress={handleUnsubscribe}>
              <Text style={styles.unsubscribeButtonText}>Se désabonner</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Ce que vous recevrez :</Text>
          <Text style={styles.infoItem}>• Nouvelles annonces de dons</Text>
          <Text style={styles.infoItem}>• Dons près de chez vous</Text>
          <Text style={styles.infoItem}>• Statistiques mensuelles</Text>
          <Text style={styles.infoItem}>• Actualités de la plateforme</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  icon: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#4CAF50',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
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
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscribedText: {
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  unsubscribeButton: {
    height: 50,
    backgroundColor: '#f44336',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unsubscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
