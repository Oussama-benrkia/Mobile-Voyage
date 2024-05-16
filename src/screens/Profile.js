import React, { useState ,useEffect} from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/EvilIcons";
import { Picker } from "@react-native-picker/picker";
import BottomPopup from "./BottomPopup"; // Corrected import
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState("edit");
  const deleteToken = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    navigation.navigate("Login"); // Navigate to login screen
  };
  const togglePopup = (post) => {
    setSelectedPost(post);
    setPopupVisible(!popupVisible);
  };

  const handleEditAction = () => {
    // Implement edit post functionality
    setPickerVisible(false);
  };

  const handleDeleteAction = () => {
    // Implement delete post functionality
    setPickerVisible(false);
  };
  
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  

                
  const user_info =  () =>{

    fetch("http://192.168.1.5:8085/api/users/mycompte",  {
      headers: {
          Authorization: `Bearer  ${token} `
      }
  }  )
      .then((response) => response.json())
      .then((data) => {
       console.log(data)
      })
      .catch((error) => console.error("Error fetching voyages: ", error));
      
  }              
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('secure_token');
        if (storedToken) {
          setToken(storedToken);
          user_info();
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } catch (error) {
        console.error('Failed to get token', error);
      } finally {
        setLoading(false);
      }
    };

    getToken();
  }, [navigation]);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    return null; // or a loading spinner
  }
  const user = {
    username: "JohnDoe",
    email: "user@gmail.com",
    profileImage: null,
    posts: [
      {
        id: 1,
        username: "JohnDoe",
        imagePost: require("./assests/post.jpg"),
        content: "This is the content of the first post. It may be a long content that exceeds the screen size.",
        datePosted: "May 12, 2024",
        likes: 10,
        views: 100,
        comments: [
          {
            id: 1,
            username: "JaneSmith",
            comment: "Nice post!",
            datePosted: "May 13, 2024",
          },
          {
            id: 2,
            username: "JohnDoe",
            comment: "Thanks!",
            datePosted: "May 14, 2024",
          },
        ],
      },
      {
        id: 2,
        username: "JohnDoe",
        imagePost: require("./assests/post.jpg"),
        content: "Another post content here.",
        datePosted: "May 13, 2024",
        likes: 20,
        views: 200,
        comments: [
          {
            id: 1,
            username: "JaneSmith",
            comment: "Great post!",
            datePosted: "May 14, 2024",
          },
        ],
      },
    ],
  };

  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileInfoContainer}>
          {user.profileImage ? (
            <Image source={user.profileImage} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultProfileContainer}>
              <AntDesignIcon name="user" color="rgba(0,0,0,0.5)" size={120} style={styles.defaultProfileImage} />
            </View>
          )}
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoText}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnlog} onPress={deleteToken}>
          <Text style={styles.textbtnlog}>
            Log out
          </Text>
        </TouchableOpacity>
        <View style={styles.postsContainer}>
          {user.posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <View style={styles.postHeader}>
                <Text style={styles.usernameTop}>{post.username}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={handleEditAction} style={styles.actionButton}>
                    <AntDesignIcon name="edit" color="#b0bec5" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeleteAction} style={styles.actionButton}>
                    <AntDesignIcon name="delete" color="#b0bec5" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <Image source={post.imagePost} style={styles.imagePost} />
              <View style={styles.postInfoContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <AntDesignIcon name="hearto" color="#b0bec5" size={20} />
                </TouchableOpacity>
                <Text style={styles.likesCount}>{post.likes}</Text>
                <View style={styles.viewsContainer}>
                  <MaterialCommunityIcons name="eye-outline" color="#b0bec5" size={20} style={styles.viewsIcon} />
                  <Text style={styles.viewsCount}>{post.views}</Text>
                </View>
                <TouchableOpacity onPress={() => togglePopup(post)} style={styles.actionButton}>
                    <Icons name="comment" color="#b0bec5" size={30} />
                  </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.content}>{post.content}</Text>
              </View>
              <Text style={styles.datePosted}>Posted on {post.datePosted}</Text>
            </View>
          ))}
        </View>
      </View>
      {popupVisible && (
        <BottomPopup
          visible={popupVisible}
          onTouchOutside={() => setPopupVisible(false)}
          title="Comments"
          comments={selectedPost ? selectedPost.comments : []}
        />
      )}
      {pickerVisible && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label="Edit post" value="edit" />
            <Picker.Item label="Delete post" value="delete" />
          </Picker>
          <TouchableOpacity onPress={handleEditAction} style={styles.pickerButton}>
            <Text style={styles.pickerButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  defaultProfileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor:'rgba(0,0,0,0.1)',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  defaultProfileImage: {
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  userInfoLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  userInfoText: {
    flex: 1,
  },
  postsContainer: {
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  usernameTop: {
    marginVertical: 10,
  },
  content: {
    flex: 1,
    color: "black",
  },
  imagePost: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 9,
  },
  postInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  likesCount: {
    alignSelf: "center",
    marginLeft: 5,
    color: "#b0bec5",
  },
  datePosted: {
    fontStyle: "italic",
    marginBottom: 10,
    color: "#b0bec5",
  },
  viewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  viewsIcon: {
    marginRight: 5,
  },
  viewsCount: {
    color: "#b0bec5",
  },
  pickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  pickerButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  pickerButtonText: {
    color: "#fff",
  },
});

export default Profile;
