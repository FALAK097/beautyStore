import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useTheme } from '../../context/ThemeContext';

const CategoryDetails = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Function to handle deletion
  const handleDelete = () => {
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
          Category Details
        </Text>
      </View>
      <Image source={category.image} style={styles.categoryImage} />
      <View style={styles.categoryInfo}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {category.title}
        </Text>
        <Text style={[styles.categoryDescription, { color: colors.secondary }]}>
          {category.description}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          type="outline"
          buttonStyle={styles.editButton}
          title="Edit"
          titleStyle={styles.editButtonLabel}
          onPress={() => {
            navigation.navigate('EditCategory', { category });
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
        message="Are you sure you want to delete this category?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  categoryImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  categoryInfo: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 14,
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

export default CategoryDetails;
