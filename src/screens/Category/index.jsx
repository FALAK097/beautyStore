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
import { useTheme } from '../../context/ThemeContext';

const Category = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.text }]}>Categories</Text>
        <Button
          type="outline"
          onPress={() => navigation.navigate('AddCategory')}
          buttonStyle={[styles.addButton, { borderColor: colors.primary }]}
          title="ADD CATEGORY"
          titleStyle={[styles.addButtonLabel, { color: colors.primary }]}
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
            <View style={[styles.categoryCard, { borderColor: colors.text }]}>
              <Image source={category.image} style={styles.categoryImage} />
              <View style={styles.categoryInfo}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>
                  {category.title}
                </Text>
                <Text
                  style={[
                    styles.categoryDescription,
                    { color: colors.secondary },
                  ]}>
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addButtonLabel: {
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
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
  },
});

export default Category;
