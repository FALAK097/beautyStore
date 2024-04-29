import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import ImagePickerComponent from './ImagePickerComponent';
import { useTheme } from '../context/ThemeContext';

const CategoryForm = ({
  title,
  description,
  setTitle,
  setDescription,
  imageUrl,
  setImageUrl,
  onSubmit,
  isEditing,
}) => {
  const { colors } = useTheme();
  const buttonTitle = isEditing ? 'Update Category' : 'Add Category';

  return (
    <View>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Title"
        placeholderTextColor={'grey'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Description"
        placeholderTextColor={'grey'}
        value={description}
        onChangeText={setDescription}
      />
      <ImagePickerComponent imageUrl={imageUrl} setImageUrl={setImageUrl} />
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

export default CategoryForm;
