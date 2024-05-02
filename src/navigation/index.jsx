import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

import { useAuth } from '../utils/hooks/useAuth';
import AuthStack from './authStack';
import UserStack from './userStack';

export default function RootNavigation() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  useEffect(() => {
    setLoading(user === undefined || authLoading);
  }, [user, authLoading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="tomato" />
        <Text style={styles.loadingText}>
          {user === undefined ? 'Checking authentication...' : 'Loading...'}
        </Text>
      </View>
    );
  }

  return user ? <UserStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});
