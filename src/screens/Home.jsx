import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../utils/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageSlider from '../components/ImageSlider';
import { category, images, products } from '../utils/data';
import ConfirmationModal from '../components/ConfirmationModal';
import CategoriesCard from '../components/CategoriesCard';
import ProductsCard from '../components/ProductsCard';

const Home = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const emailPrefix = user ? user.email.split('@')[0].toUpperCase() : '';

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    signOut(user.auth);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, {user ? user.displayName.toUpperCase() : emailPrefix}
        </Text>
        <Button
          type="outline"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          title="Log Out"
          titleStyle={styles.logoutText}
        />
      </View>
      <ImageSlider images={images} />
      <CategoriesCard
        title="Categories"
        categories={category}
        onViewAllPress={() => navigation.navigate('Category')}
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
    backgroundColor: '#fff',
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
    color: '#333',
  },
  logoutButton: {
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500',
  },
});

export default Home;
