import React, { useState, useEffect } from 'react';

import { useAuth } from '../utils/hooks/useAuth';
import AuthStack from './authStack';
import UserStack from './userStack';
import LoadingIndicator from '../components/LoadingIndicator';

export default function RootNavigation() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  useEffect(() => {
    setLoading(user === undefined && authLoading);
  }, [user, authLoading]);

  if (loading) {
    return (
      <LoadingIndicator
        message={
          user === undefined ? 'Checking authentication...' : 'Loading...'
        }
      />
    );
  }

  return user ? <UserStack /> : <AuthStack />;
}
