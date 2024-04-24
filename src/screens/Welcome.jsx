import { StyleSheet, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Welcome to Beauty Store</Text>

      <Button
        title="Sign in"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Sign up"
        type="outline"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#666',
  },

  button: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    width: 300,
  },
});

export default Welcome;
