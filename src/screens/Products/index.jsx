import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Button, Image } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { products } from '../../utils/data';
import { useTheme } from '../../context/ThemeContext';

const Products = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    fetchProducts();
  }, [route.params?.shouldRefresh]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.1.105:3000/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params?.newProduct) {
      setProducts((prevProducts) => [...prevProducts, route.params.newProduct]);
    }
  }, [route.params?.newProduct]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.heading, { color: colors.text }]}>Products</Text>
        <Button
          type="outline"
          onPress={() => navigation.navigate('AddProduct')}
          buttonStyle={[styles.addButton, { borderColor: colors.primary }]}
          title="ADD PRODUCT"
          titleStyle={[styles.addButtonLabel, { color: colors.primary }]}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() =>
                navigation.navigate('ProductDetails', { product: product })
              }>
              <View style={[styles.productCard, { borderColor: colors.text }]}>
                <Image
                  source={{ uri: product.imageUrl }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={[styles.productTitle, { color: colors.text }]}>
                    {product.title}
                  </Text>
                  <Text
                    style={[
                      styles.productDescription,
                      { color: colors.secondary },
                    ]}>
                    {product.description}
                  </Text>
                  <Text style={[styles.productDetail, { color: colors.text }]}>
                    Price: ${product.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    borderWidth: 1,
  },
  addButtonLabel: {
    fontWeight: 'bold',
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
  },
  productDetail: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default Products;
