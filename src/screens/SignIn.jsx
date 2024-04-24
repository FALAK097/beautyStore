import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignIn = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <Text style={styles.subheading}>Welcome Back!</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" size={16} />}
        />

        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          autoCapitalize="none"
          leftIcon={<Icon name="key" size={16} />}
        />

        <Button title="Sign in" buttonStyle={styles.button} onPress={signIn} />
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={styles.control}>
          Don't have an account? Sign up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  subheading: {
    fontSize: 16,
    color: '#26d526',
  },

  controls: {
    flex: 1,
    width: 300,
  },

  control: {
    marginTop: 10,
  },

  button: {
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignIn;
