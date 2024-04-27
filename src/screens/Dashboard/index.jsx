import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleCardPress = (chart) => {
    navigation.navigate(chart, { chartType: chart });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="speedometer" size={32} color={colors.text} />
        <Text style={[styles.headerText, { color: colors.text }]}>
          Dashboard
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.boxContainer, { backgroundColor: colors.background }]}
        onPress={() => handleCardPress('CategoryChart')}>
        <View style={styles.box}>
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Category
          </Text>
          <Text style={styles.boxNumber}>10+</Text>
        </View>
      </TouchableOpacity>
      <View
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleCardPress('ProductChart')}>
          <Ionicons name="cart" size={32} color={colors.text} />
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Products
          </Text>
          <Text style={styles.boxNumber}>20+</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleCardPress('UserChart')}>
          <Ionicons name="people" size={32} color={colors.text} />
          <Text style={[styles.boxTitle, { color: colors.text }]}>Users</Text>
          <Text style={styles.boxNumber}>5+</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.boxContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleCardPress('InventoryChart')}>
          <Ionicons name="alert" size={32} color={colors.text} />
          <Text style={[styles.boxTitle, { color: colors.text }]}>
            Products Low In Inventory
          </Text>
          <Text style={styles.boxNumber}>3+</Text>
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
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
