import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageSlider from '../components/ImageSlider';
import CategoriesCard from '../components/CategoriesCard';
import ProductsCard from '../components/ProductsCard';
import { Ionicons } from '@expo/vector-icons';
import { images } from '../utils/data';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { toggleTheme, colors } = useTheme();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const emailPrefix = user ? user.email.split('@')[0].toUpperCase() : '';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategories();
      fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.1.103:3000/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.1.103:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleThemeHandler = () => {
    toggleTheme();
  };

  const themeIcon = colors.background === '#F0F0F0' ? 'sunny' : 'moon';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome,{' '}
          {user
            ? user.displayName
              ? user.displayName.toUpperCase()
              : emailPrefix
            : emailPrefix}
        </Text>
        <TouchableOpacity
          onPress={toggleThemeHandler}
          style={styles.themeToggle}>
          <Ionicons name={themeIcon} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ImageSlider images={images} />
      <CategoriesCard
        title="Categories"
        categories={categories}
        onViewAllPress={() => navigation.navigate('Categories')}
      />
      <ProductsCard
        title="Products"
        products={products}
        onViewAllPress={() => navigation.navigate('Products')}
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 5,
    borderRadius: 50,
  },
});

export default Home;
