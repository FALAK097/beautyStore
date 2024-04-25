import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const CategoryItem = ({ title }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Text style={styles.categoryTitle}>{title}</Text>
  </TouchableOpacity>
);

const CategoriesCard = ({ title, categories, onViewAllPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryHeading}>{title}</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategoryItem title={item.title} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 16,
    color: 'tomato',
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 14,
  },
});

export default CategoriesCard;
