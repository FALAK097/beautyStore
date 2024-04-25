import { useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
          <Ionicons name="image" size={24} color="black" />
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        {image && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
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
