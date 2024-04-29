import { StatusBar } from 'expo-status-bar';
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
import { uploadToFirebase } from '../config/Firebase.js';
import { Button } from '@rneui/themed';

const ImagePickerComponent = ({ imageUrl, setImageUrl }) => {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const takePhoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split('/').pop();
        const resp = await uploadToFirebase(uri, fileName, (v) =>
          console.log(v)
        );
        console.log(resp);
        setImageUrl(resp);
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Permission Not Granted - {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title="Request Permission" onPress={requestPermission}></Button>
      </View>
    );
  }

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePickerContainer}>
        <StatusBar style="auto" />
        <Button title="Take Picture" onPress={takePhoto}></Button>
        {/* <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
          <Ionicons name="image" size={24} color="black" />
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color="black" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity> */}
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
