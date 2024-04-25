import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Category from '../screens/Category';
import Products from '../screens/Products';
import Dashboard from '../screens/Dashboard';

const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            bottom: 5,
            left: 10,
            right: 10,
            borderRadius: 20,
            backgroundColor: '#ffffff',
            height: 60,
            paddingBottom: 10,
            paddingVertical: 8,
          },
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Category') {
              iconName = 'list-outline';
            } else if (route.name === 'Products') {
              iconName = 'cart-outline';
            } else if (route.name === 'Dashboard') {
              iconName = 'analytics-outline';
            }

            return <Ionicons name={iconName} size={28} color={color} />;
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Products"
          component={Products}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
