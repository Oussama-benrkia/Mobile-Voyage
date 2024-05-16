import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';

export default function Signup(props) {
  global.image_filename;
  global.image_type;

  const savetoken = async (token )=>{
    await SecureStore.setItemAsync('secure_token',token);
  }
  const gettoken = async()=>{
    return await SecureStore.getItemAsync('secure_token');
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // const pickImage = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  
  //     console.log("ImagePicker result:", result);
  
  //     if (!result.canceled) {
  //       const selectedImage = result.assets[0];

  //     // Convert image URI to Blob
  //     const response = await fetch(selectedImage.uri);
  //     const blob = await response.blob();

  //     // Convert Blob to File
  //     const file = new File([blob], selectedImage.fileName, { type: selectedImage.type });

  //     setImage({
  //       uri: selectedImage.uri,
  //       file: file,
  //       filename: selectedImage.fileName,
  //       type: selectedImage.type,
  //     });
        
        
  //     }
  //   } catch (error) {
  //     console.error("Error picking image:", error);
  //   }
  // };
  function handleSubmit(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    
    
     
    fetch("http://192.168.1.5:8085/api/auth/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.token) {
          gettoken()
          .then(token => {
            console.log(token); // daba rah tiji token 
          });
          
          props.navigation.navigate("MainContainer");
        } else {
          console.log(data.message);
          setErrorMessage(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
  
  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.c2}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.txtW} >Register</Text>
          <View style={styles.c3}>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            {/* <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
              />
            )} */}


            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <LinearGradient
                colors={["#54B5F4", "#7C4CEC"]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }} // From left
                end={{ x: 1, y: 0 }} // To right
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.vNoAcc}>
              <Text style={styles.txtNoAcc}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={styles.txtGoSignup}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6", // Change background color
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20, // Add margin bottom
    borderRadius: 10, // Add border radius
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Change background color
    alignItems: "center",
    justifyContent: "center",
  },
  c2: {
    flex: 1,
    width: "100%",
  },
  txtW: {
    fontSize: 55,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    color: "black", // Change text color
  },
  txtV: {
    fontSize: 40,
    color: "#7C4CEC",
    fontWeight: "bold",
    marginBottom: 10, // Adjust margin bottom
  },
  txtG: {
    color: "#4B5563", // Change text color
    fontSize: 18, // Adjust font size
    marginBottom: 20,
  },
  c3: {
    backgroundColor: "white",
    width: "90%", // Adjust width
    borderRadius: 20, // Add border radius
    padding: 20, // Add padding
    alignItems: "center",
  },
  input: {
    width: "100%", // Adjust width
    height: 50,
    borderColor: "#D1D5DB", // Change border color
    borderWidth: 1,
    borderRadius: 10, // Add border radius
    color: "#4B5563", // Change text color
    fontSize: 18, // Adjust font size
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#EDF2F7", // Change background color
  },
  button: {
    width: "100%", // Adjust width
    paddingVertical: 12,
    borderRadius: 10, // Add border radius
    marginBottom: 20,
    height: 50,
    backgroundColor: "#7C4CEC", // Change background color
  },
  buttonGradient: {
    width: "100%", // Adjust width
    paddingVertical: 12,
    borderRadius: 10, // Add border radius
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
    height: 50,
    backgroundColor: "#7C4CEC", // Change background color
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  vNoAcc: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20, // Adjust margin top
  },
  txtGoSignup: {
    color: "#7C4CEC",
    fontWeight: "bold",
    fontSize: 16,
  },
  txtNoAcc: {
    color: "#4B5563", // Change text color
    fontWeight: "bold",
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
  }
});

