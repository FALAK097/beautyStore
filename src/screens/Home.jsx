import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageSlider from '../components/ImageSlider';
import ConfirmationModal from '../components/ConfirmationModal';
import CategoriesCard from '../components/CategoriesCard';
import ProductsCard from '../components/ProductsCard';
import { Ionicons } from '@expo/vector-icons';
import { images } from '../utils/data';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { toggleTheme, colors } = useTheme();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const emailPrefix = user ? user.email.split('@')[0].toUpperCase() : '';

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.59.237:3000/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.59.237:3000/products');
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

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    signOut(user.auth);
  };

  const toggleThemeHandler = () => {
    toggleTheme();
  };

  const themeIcon = colors.background === '#F0F0F0' ? 'sunny' : 'moon';

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
    fetchProducts();
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome, {user ? user.displayName.toUpperCase() : emailPrefix}
        </Text>
        <TouchableOpacity
          onPress={toggleThemeHandler}
          style={styles.themeToggle}>
          <Ionicons name={themeIcon} size={24} color={colors.text} />
        </TouchableOpacity>
        <Button
          type="outline"
          onPress={handleLogout}
          buttonStyle={[styles.logoutButton, { borderColor: colors.primary }]}
          title="Log Out"
          titleStyle={[styles.logoutText, { color: colors.primary }]}
        />
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
      <ConfirmationModal
        visible={logoutModalVisible}
        message="Are you sure you want to log out?"
        onConfirm={confirmLogout}
        onCancel={() => setLogoutModalVisible(false)}
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
  logoutButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 5,
    borderRadius: 50,
  },
});

export default Home;
