import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const ProductItem = ({ title, price, image }) => (
  <TouchableOpacity style={styles.productItem}>
    <Image source={image} style={styles.productImage} />
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>Price: {price}</Text>
    </View>
  </TouchableOpacity>
);

const ProductsCard = ({ title, products, onViewAllPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.productHeading}>{title}</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            title={item.title}
            price={item.price}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 16,
    color: 'tomato',
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    width: 300,
    height: 200,
  },
  productImage: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    marginBottom: 5,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductsCard;
