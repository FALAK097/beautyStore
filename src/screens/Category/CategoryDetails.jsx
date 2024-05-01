import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const CategoryDetails = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.1.103:3000/categories/${category.id}`
      );

      if (response.status === 200) {
        setDeleteModalVisible(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Category deleted successfully',
          visibilityTime: 4000,
          autoHide: true,
          swipeable: true,
        });
        navigation.navigate('CategoryMain', { shouldRefresh: true });
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to delete category',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
      console.error('Error deleting category:', error);
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
          Category Details
        </Text>
      </View>
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <View style={styles.categoryInfo}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {category.title}
        </Text>
        <Text style={[styles.categoryDescription, { color: colors.secondary }]}>
          {category.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          type="outline"
          buttonStyle={[styles.actionButton, styles.editButton]}
          onPress={() => {
            navigation.navigate('EditCategory', { category });
          }}>
          <Ionicons name="create-outline" size={24} color="tomato" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </Button>
        <Button
          type="outline"
          buttonStyle={[styles.actionButton, styles.deleteButton]}
          onPress={() => setDeleteModalVisible(true)}>
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </Button>
      </View>
      <ConfirmationModal
        visible={deleteModalVisible}
        message="Are you sure you want to delete this category?"
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setDeleteModalVisible(false)}
      />
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
  categoryImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  categoryInfo: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default CategoryDetails;
