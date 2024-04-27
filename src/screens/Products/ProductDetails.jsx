import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useTheme } from '../../context/ThemeContext';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Function to handle delete confirmation
  const handleDeleteConfirmation = () => {
    setDeleteModalVisible(false);
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
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, { color: colors.text }]}>
          {product.title}
        </Text>
        <Text style={[styles.productDescription, { color: colors.secondary }]}>
          {product.description}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Quantity: {product.quantity}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Weight: {product.weight}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Dimensions: {product.dimensions}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          SKU: {product.SKU}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Price: {product.price}
        </Text>
        <Text style={[styles.productDetail, { color: colors.text }]}>
          Category: {product.category}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          type="outline"
          buttonStyle={styles.editButton}
          title="Edit"
          titleStyle={styles.editButtonLabel}
          onPress={() => {
            navigation.navigate('EditProduct', { product });
          }}
        />
        <Button
          type="outline"
          buttonStyle={styles.deleteButton}
          title="Delete"
          titleStyle={styles.deleteButtonLabel}
          onPress={() => setDeleteModalVisible(true)}
        />
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
  },
  editButton: {
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'tomato',
  },
  editButtonLabel: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  deleteButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductDetails;
