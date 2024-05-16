// VoyageDetailsScreen.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const VoyageDetailsScreen = ({ navigation, route }) => {
  const { voyage } = route.params;

  const handleReservation = () => {
    // Hna fin handiro reservation process
    //
    //
    //
    //
    //
    //
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: `http://192.168.1.5:8085/api/images/${voyage.image}` }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{voyage.name}</Text>
          <Text style={styles.description}>{voyage.description}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Start Date:</Text>
            <Text style={styles.date}>{voyage.date_debut}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>End Date:</Text>
            <Text style={styles.date}>{voyage.date_fin}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Make Reservation"
          onPress={handleReservation}
          color="#007bff" // You can customize the button color here
        />
        <Button
          title="Go back to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default VoyageDetailsScreen;
