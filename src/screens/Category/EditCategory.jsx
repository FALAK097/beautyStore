import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryForm from '../../components/CategoryForm';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const EditCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const { category } = route.params;

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setDescription(category.description);
      setImage(category.imageUrl);
    }
  }, [category]);

  const handleEditCategory = async () => {
    try {
      await axios.put(`http://192.168.1.103:3000/categories/${category.id}`, {
        title,
        description,
        imageUrl: image,
      });
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Category updated successfully',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
      navigation.navigate('CategoryMain', { shouldRefresh: true });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to update category',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
      console.error('Error updating category:', error);
    }
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
          Edit Category
        </Text>
      </View>
      <View style={styles.formContainer}>
        <CategoryForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          imageUrl={image}
          setImageUrl={setImage}
          onSubmit={handleEditCategory}
          isEditing
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

export default EditCategory;
