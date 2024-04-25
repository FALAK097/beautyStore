import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryForm from '../../components/CategoryForm';

const AddCategory = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Title:', title);
    console.log('Description:', description);
    // Add more logic to submit the form data
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
        <Text style={styles.heading}>Add Category</Text>
      </View>
      <View style={styles.formContainer}>
        <CategoryForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={handleSubmit}
        />
      </View>
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AddCategory;
