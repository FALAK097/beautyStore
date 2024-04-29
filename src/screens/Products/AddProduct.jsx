import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductForm from '../../components/ProductForm';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AddProduct = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.105:3000/products', {
        title,
        description,
        weight,
        price,
        quantity,
        imageUrl,
      });
      const newProduct = response.data;
      Alert.alert('Success', 'Product added successfully');
      navigation.navigate('ProductsMain', { shouldRefresh: true });
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
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
          Add Product
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
            onSubmit={handleSubmit}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
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

export default AddProduct;
