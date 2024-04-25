import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button, Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../utils/data';

const Products = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Products</Text>
        <Button
          type="outline"
          onPress={() => navigation.navigate('AddProduct')}
          buttonStyle={styles.addButton}
          title="ADD PRODUCT"
          titleStyle={styles.addButtonLabel}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() =>
              navigation.navigate('ProductDetails', { product: product })
            }>
            <View style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productDescription}>
                  {product.description}
                </Text>
                <Text style={styles.productDetail}>Price: {product.price}</Text>
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
    color: 'white',
    fontWeight: 'bold',
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#666',
  },
  productDetail: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
});

export default Products;
