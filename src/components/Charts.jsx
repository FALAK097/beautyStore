import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const Charts = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { counts } = route.params;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.text }]}>Charts</Text>
      </View>
      <View style={styles.chartContainer}>
        <VictoryChart
          domainPadding={{ x: 20 }}
          theme={VictoryTheme.material}
          width={350}>
          <VictoryBar
            data={[
              { x: 'Categories', y: counts.categories },
              { x: 'Products', y: counts.products },
              { x: 'Users', y: counts.users },
              {
                x: 'Low Products',
                y: counts.lowInventoryProducts,
              },
            ]}
            barWidth={30}
            style={{ data: { fill: colors.primary } }}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 20,
    marginLeft: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Charts;
