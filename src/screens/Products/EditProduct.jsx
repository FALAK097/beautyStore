import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductForm from '../../components/ProductForm';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const EditProduct = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  const { product } = route.params;

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setWeight(product.weight);
      setPrice(product.price);
      setQuantity(product.quantity);
      setImage(product.imageUrl);
    }
  }, [product]);

  const handleEditProduct = async () => {
    try {
      await axios.put(`http://192.168.1.103:3000/products/${product.id}`, {
        title,
        description,
        weight,
        price,
        quantity,
        imageUrl: image,
      });
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Product updated successfully',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
      navigation.navigate('ProductsMain', { shouldRefresh: true });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to update product',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
      console.error('Error updating product:', error);
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
          Edit Product
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            weight={weight}
            setWeight={setWeight}
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            onSubmit={handleEditProduct}
            imageUrl={image}
            setImageUrl={setImage}
            isEditing
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
  form: {
    flex: 1,
  },
});

export default EditProduct;
