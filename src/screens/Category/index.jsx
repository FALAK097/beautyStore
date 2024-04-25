import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../../utils/data';

const Category = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Categories</Text>
        <Button
          type="outline"
          onPress={() => navigation.navigate('AddCategory')}
          buttonStyle={styles.addButton}
          title="ADD CATEGORY"
          titleStyle={styles.addButtonLabel}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() =>
              navigation.navigate('CategoryDetails', { category: category })
            }>
            <View style={styles.categoryCard}>
              <Image source={category.image} style={styles.categoryImage} />
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>
                  {category.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'tomato',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'tomato',
  },
  addButtonLabel: {
    // color: 'tomato',
    color: 'white',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Category;
