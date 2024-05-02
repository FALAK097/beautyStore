import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { signOut, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import { app, db } from '../config/Firebase';
import { useAuth } from '../utils/hooks/useAuth';

import ConfirmationModal from '../components/ConfirmationModal';
import LoadingIndicator from '../components/LoadingIndicator';
import { useTheme } from '../context/ThemeContext';

const firestore = getFirestore();

const Profile = () => {
  const { user } = useAuth();
  const auth = getAuth(app);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleLogOutConfirmation = () => {
    signOut(user.auth);
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Success',
      text2: 'Logged out successfully',
      visibilityTime: 4000,
      autoHide: true,
      swipeable: true,
    });
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteDoc(doc(firestore, 'users', user.uid));

      await auth.currentUser.delete();

      await signOut(user.auth);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Account deleted successfully',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    } catch (error) {
      console.error('Error deleting account:', error);

      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'An error occurred while deleting your account',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.text }]}>Profile</Text>
        <Button
          type="outline"
          onPress={handleLogout}
          buttonStyle={[styles.logoutButton, { borderColor: colors.primary }]}
          title="Log Out"
          titleStyle={[styles.logoutText, { color: colors.primary }]}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/profile.png')}
          resizeMode="cover"
          style={styles.profilePicture}
        />
      </View>
      {loading ? (
        <View style={{ marginTop: 20 }}>
          <LoadingIndicator message="Fetching User Data..." />
        </View>
      ) : (
        userData && (
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoItem}>
              <FontAwesome name="user" size={24} color="tomato" />
              <Text style={[styles.userInfoText, { color: 'tomato' }]}>
                Username:
              </Text>
              <Text style={[styles.userInfoData, { color: colors.text }]}>
                {userData.username}
              </Text>
            </View>
            <View style={styles.userInfoItem}>
              <FontAwesome name="envelope" size={24} color="skyblue" />
              <Text style={[styles.userInfoText, { color: 'skyblue' }]}>
                Email:
              </Text>
              <Text style={[styles.userInfoData, { color: colors.text }]}>
                {userData.email}
              </Text>
            </View>
            <View style={styles.userInfoItem}>
              <FontAwesome name="phone" size={24} color="orange" />
              <Text style={[styles.userInfoText, { color: 'orange' }]}>
                Phone:
              </Text>
              <Text style={[styles.userInfoData, { color: colors.text }]}>
                {userData.phone}
              </Text>
            </View>
          </View>
        )
      )}
      <View style={styles.actions}>
        <Button
          type="outline"
          buttonStyle={[styles.actionButton, styles.editButton]}>
          <Ionicons name="create-outline" size={24} color="tomato" />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Edit Profile
          </Text>
        </Button>
        <Button
          type="outline"
          buttonStyle={[styles.actionButton, styles.deleteButton]}
          onPress={() => setDeleteModalVisible(true)}>
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Delete Account</Text>
        </Button>
      </View>
      <ConfirmationModal
        visible={logoutModalVisible}
        message="Are you sure you want to log out?"
        onConfirm={handleLogOutConfirmation}
        onCancel={() => setLogoutModalVisible(false)}
      />
      <ConfirmationModal
        visible={deleteModalVisible}
        message="Are you sure you want to delete this account?"
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginBottom: 20,
    borderRadius: 60,
    padding: 5,
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userInfoContainer: {
    marginTop: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoData: {
    marginLeft: 5,
    fontSize: 16,
  },
  actions: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'tomato',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
