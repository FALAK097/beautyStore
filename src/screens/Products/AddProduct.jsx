import React, { useState } from 'react';
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

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [SKU, setSKU] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleAddProduct = () => {
    // Handle adding the product with the provided data
    console.log('Product added:', {
      title,
      description,
      weight,
      price,
      quantity,
      dimensions,
      SKU,
      category,
      image,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Add Product</Text>
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
            dimensions={dimensions}
            setDimensions={setDimensions}
            SKU={SKU}
            setSKU={setSKU}
            category={category}
            setCategory={setCategory}
            handleAddProduct={handleAddProduct}
            setImage={setImage}
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
