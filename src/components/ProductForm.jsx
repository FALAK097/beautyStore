import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ImagePickerComponent from './ImagePickerComponent';
import { Button } from '@rneui/themed';
import { useTheme } from '../context/ThemeContext';

const ProductForm = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  quantity,
  setQuantity,
  weight,
  setWeight,
  imageUrl,
  setImageUrl,
  onSubmit,
  isEditing,
}) => {
  const { colors } = useTheme();
  const buttonTitle = isEditing ? 'Update Product' : 'Add Product';
  return (
    <View>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Title"
        placeholderTextColor={colors.text}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Description"
        placeholderTextColor={colors.text}
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.horizontalContainer}>
        <TextInput
          style={[styles.input, styles.halfInput, { color: colors.text }]}
          placeholder="Price (USD)"
          placeholderTextColor={colors.text}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={[styles.input, styles.halfInput, { color: colors.text }]}
          placeholder="Quantity(Units)"
          placeholderTextColor={colors.text}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>
      <View style={styles.horizontalContainer}>
        <TextInput
          style={[styles.input, styles.halfInput, { color: colors.text }]}
          placeholder="Weight(Kg)"
          placeholderTextColor={colors.text}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      <ImagePickerComponent
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        isEditing={isEditing}
      />
      <Button
        title={buttonTitle}
        onPress={onSubmit}
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
