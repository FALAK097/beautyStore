import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const Charts = ({ route }) => {
  const navigation = useNavigation();
  const { chartType } = route.params;
  const { colors } = useTheme();

  const chartData = {
    CategoryChart: [
      { category: 'Category A', count: 10 },
      { category: 'Category B', count: 20 },
      { category: 'Category C', count: 15 },
    ],
    ProductChart: [
      { product: 'Product A', count: 30 },
      { product: 'Product B', count: 25 },
      { product: 'Product C', count: 20 },
    ],
    UserChart: [
      { user: 'User 1', count: 5 },
      { user: 'User 2', count: 8 },
      { user: 'User 3', count: 10 },
    ],
    InventoryChart: [
      { item: 'Item 1', count: 3 },
      { item: 'Item 2', count: 6 },
      { item: 'Item 3', count: 9 },
    ],
  };

  const data = chartData[chartType];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{chartType}</Text>
      </View>
      <View style={styles.chartContainer}>
        <VictoryChart
          domainPadding={{ x: 20 }}
          domain={{ y: [1, Math.max(...data.map((item) => item.count)) + 1] }}>
          <VictoryBar
            theme={VictoryTheme.material}
            data={data}
            x={
              chartType === 'InventoryChart' ? 'item' : chartType.toLowerCase()
            }
            y="count"
            barWidth={30}
            style={{ data: { fill: colors.primary } }}
            labels={({ datum }) => ` ${datum.count}`}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

export default Charts;
