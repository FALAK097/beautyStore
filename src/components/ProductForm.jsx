import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ImagePickerComponent from './ImagePickerComponent';
import { Button } from '@rneui/themed';

const ProductForm = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  quantity,
  setQuantity,
  dimensions,
  setDimensions,
  weight,
  setWeight,
  SKU,
  setSKU,
  category,
  setCategory,
  setImage,
  handleAddProduct,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.horizontalContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>
      <View style={styles.horizontalContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Dimensions"
          keyboardType="numeric"
          value={dimensions}
          onChangeText={setDimensions}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <View style={styles.horizontalContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="SKU"
          value={SKU}
          onChangeText={setSKU}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
      </View>
      <ImagePickerComponent setImage={setImage} />
      <Button
        title="Add Product"
        onPress={handleAddProduct}
        buttonStyle={styles.addButton}
        titleStyle={styles.addButtonLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    marginRight: 5,
  },
  input: {
    height: 40,
    borderColor: 'tomato',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'tomato',
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductForm;
