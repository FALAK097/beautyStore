import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@rneui/themed';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/Firebase';

const LOW_INVENTORY_THRESHOLD = 10;

const Dashboard = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    users: 0,
    lowInventoryProducts: 0,
  });

  useEffect(() => {
    const unsubscribeCategory = onSnapshot(
      collection(db, 'categories'),
      (snapshot) => {
        setCounts((prevCounts) => ({
          ...prevCounts,
          categories: snapshot.size,
        }));
      }
    );

    const unsubscribeProduct = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const lowInventoryProductCount = snapshot.docs.filter(
          (doc) => doc.data().quantity < LOW_INVENTORY_THRESHOLD
        ).length;
        setCounts((prevCounts) => ({
          ...prevCounts,
          products: snapshot.size,
          lowInventoryProducts: lowInventoryProductCount,
        }));
      }
    );

    const unsubscribeUser = onSnapshot(collection(db, 'users'), (snapshot) => {
      setCounts((prevCounts) => ({
        ...prevCounts,
        users: snapshot.size,
      }));
    });

    return () => {
      unsubscribeCategory();
      unsubscribeProduct();
      unsubscribeUser();
    };
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Ionicons name="speedometer" size={32} color={colors.text} />
        <Text style={[styles.heading, { color: colors.text }]}>Dashboard</Text>
        <Button
          type="outline"
          onPress={() => navigation.navigate('Charts', { counts })}
          buttonStyle={[styles.addButton, { borderColor: colors.primary }]}
          title="VIEW CHARTS"
          titleStyle={[styles.addButtonLabel, { color: colors.primary }]}
        />
      </View>
      <TouchableOpacity
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <View style={styles.box}>
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Category
          </Text>
          <Text style={styles.boxNumber}>{counts.categories}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.box}>
          <Ionicons name="cart" size={32} color={colors.text} />
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Products
          </Text>
          <Text style={styles.boxNumber}>{counts.products}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.box}>
          <Ionicons name="people" size={32} color={colors.text} />
          <Text style={[styles.boxTitle, { color: colors.text }]}>Users</Text>
          <Text style={styles.boxNumber}>{counts.users}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.box}>
          <Ionicons name="alert" size={32} color={colors.text} />
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Products Low In Inventory
          </Text>
          <Text style={styles.boxNumber}>{counts.lowInventoryProducts}</Text>
        </TouchableOpacity>
      </View>
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
    marginRight: 20,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addButtonLabel: {
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    margin: 5,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boxNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'tomato',
  },
});

export default Dashboard;
