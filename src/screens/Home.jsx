import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

import { useAuth } from '../utils/hooks/useAuth';
import { signOut } from 'firebase/auth';

const Home = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome {user.email}!</Text>
          <Text>Welcome {user.displayName}!</Text>
        </View>
      ) : (
        <Text>Welcome!</Text>
      )}

      <Button
        title="Log Out"
        style={styles.button}
        onPress={() => signOut(user.auth)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
});

export default Home;
