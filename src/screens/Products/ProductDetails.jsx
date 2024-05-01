import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.1.103:3000/products/${product.id}`
      );
      if (response.status === 200) {
        setDeleteModalVisible(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Product deleted successfully',
          visibilityTime: 4000,
          autoHide: true,
          swipeable: true,
        });
        navigation.navigate('ProductsMain', { shouldRefresh: true });
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to delete product',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
      console.error('Error deleting product:', error);
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
          Product Details
        </Text>
      </View>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, { color: colors.text }]}>
          {product.title}
        </Text>
        <Text style={[styles.productDescription, { color: colors.secondary }]}>
          {product.description}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Quantity: {product.quantity} units
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Weight: {product.weight} kg
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Price: {product.price}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          type="outline"
          buttonStyle={[styles.actionButton, styles.editButton]}
          onPress={() => {
            navigation.navigate('EditProduct', { product });
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
        message="Are you sure you want to delete this product?"
        onConfirm={handleDeleteConfirmation}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  productInfo: {
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  productDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  actions: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default ProductDetails;
