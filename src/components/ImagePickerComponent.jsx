import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ imageUrl, setImageUrl }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const getImageMimeType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'image/jpeg';
    }
  };

  const uploadImage = async (result) => {
    try {
      const uri = result.assets[0].uri;
      const fileName = uri.split('/').pop();
      const type = getImageMimeType(fileName);
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: fileName,
        type: type || 'image/jpeg',
      });

      const response = await fetch('http://192.168.1.105:3000/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const responseData = await response.json();
      // console.log('Image uploaded successfully:', responseData.imageUrl);
      setImageUrl(responseData.imageUrl);
    } catch (error) {
      setError(error.message);
      // console.error('Error uploading image:', error);
      Alert.alert('Error', error.message);
    }
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log('Image Picker Result:', result);

    if (!result.canceled) {
      setImage(result.uri);
      uploadImage(result);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
          <Ionicons name="image" size={24} color="black" />
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
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
});

export default ImagePickerComponent;
