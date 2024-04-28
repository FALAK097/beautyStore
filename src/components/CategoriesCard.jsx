import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const CategoryItem = ({ title }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.categoryItem, { borderColor: colors.text }]}>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const CategoriesCard = ({ title, categories, onViewAllPress }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.categoryHeading, { color: colors.text }]}>
          {title}
        </Text>
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
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 14,
  },
});

export default CategoriesCard;
