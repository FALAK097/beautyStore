import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import ImagePickerComponent from './ImagePickerComponent';

const CategoryForm = ({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
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
      <ImagePickerComponent />
      <Button
        title="Add Category"
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
