import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setToken = async (token) => {
    await SecureStore.setItemAsync('secure_token', token);
  };

  const handleSubmit = () => {
    fetch("http://192.168.1.5:8085/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'email':email,
        'password':password
      }),
    })
    .then(response =>  response.json()
    
       )
    .then(data => {
      console.log(data)
      if (data.token) {
        setToken(data.token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainContainer' }],
        });
      } else {
        console.log(data.message || "Failed Login");
      }
    })
    .catch(error => console.log(error));
  };

  const home=()=>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainContainer' }],
    });
  }
  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={home}>
      <AntDesignIcon name="home" color="white" size={45} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email / Username"
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#7C4CEC",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.4)",
    width: "100%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 25,
    color: "grey",
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#7C4CEC",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpLink: {
    color: "#7C4CEC",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  back:{
    position:'absolute',
    left:10,
    top:40,
    backgroundColor:'rgba(0, 0, 25, 0.2)',
    borderRadius:10,
    padding:10
  }
});

export default Login;
