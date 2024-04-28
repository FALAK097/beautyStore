import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryForm from '../../components/CategoryForm';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

const AddCategory = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.105:3000/categories',
        {
          title,
          description,
          imageUrl,
        }
      );
      const newCategory = response.data;
      Alert.alert('Success', 'Category added successfully');
      navigation.navigate('CategoryMain', { shouldRefresh: true });
    } catch (error) {
      console.error('Error adding category:', error);
      Alert.alert('Error', 'Failed to add category');
    }
  };

  const handleImageUploadSuccess = (imageUrl) => {
    setImageUrl(imageUrl);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.text }]}>
          Add Category
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CategoryForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={handleSubmit}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onImageUploadSuccess={handleImageUploadSuccess}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AddCategory;
