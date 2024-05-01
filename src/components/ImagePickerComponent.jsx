import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from '../config/Firebase.js';
import { Button } from '@rneui/themed';
import LoadingIndicator from './LoadingIndicator';
import Toast from 'react-native-toast-message';

const ImagePickerComponent = ({ imageUrl, setImageUrl, isEditing }) => {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(isEditing);

  const takePhoto = async () => {
    try {
      setLoading(true);
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split('/').pop();
        const resp = await uploadToFirebase(uri, fileName);
        setImageUrl(resp);
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error Uploading Image',
        text2: e.message,
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const pickImageFromGallery = async () => {
    try {
      setLoading(true);
      const galleryResp = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!galleryResp.canceled) {
        const { uri } = galleryResp.assets[0];
        const fileName = uri.split('/').pop();
        const resp = await uploadToFirebase(uri, fileName);
        setImageUrl(resp);
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error Uploading Image',
        text2: e.message,
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
  };

  const handleEditImage = () => {
    setIsEditingImage((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <LoadingIndicator
          message={isEditingImage ? 'Editing Image...' : 'Uploading Image...'}
        />
      )}
      {permission?.status !== ImagePicker.PermissionStatus.GRANTED && (
        <View style={styles.permissionContainer}>
          <Text>Permission Not Granted - {permission?.status}</Text>
          <StatusBar style="auto" />
          <Button
            title="Request Permission"
            onPress={requestPermission}></Button>
        </View>
      )}
      <View style={styles.imagePickerContainer}>
        <StatusBar style="auto" />
        {!isEditingImage && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color="tomato" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImageFromGallery}>
              <Ionicons name="image-outline" size={24} color="tomato" />
              <Text style={styles.buttonText}>Pick Image</Text>
            </TouchableOpacity>
          </View>
        )}
        {imageUrl && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveImage}>
              <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editIcon} onPress={handleEditImage}>
              <Ionicons name="create-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  permissionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'tomato',
    margin: 5,
  },
  buttonText: {
    marginLeft: 10,
    color: 'tomato',
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 5,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 5,
  },
});

export default ImagePickerComponent;
