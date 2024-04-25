import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from '@rneui/themed';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../config/Firebase';

const auth = getAuth();

const SignUp = ({ navigation }) => {
  const [value, setValue] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    error: '',
  });

  async function signUp() {
    if (
      value.email === '' ||
      value.password === '' ||
      value.confirmPassword === '' ||
      value.phone === ''
    ) {
      setValue({
        ...value,
        error: 'All fields are mandatory.',
      });
      return;
    }

    if (value.password !== value.confirmPassword) {
      setValue({
        ...value,
        error: 'Passwords do not match.',
      });
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      await updateProfile(user, { displayName: value.username });

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        username: value.username,
        email: value.email,
        phone: value.phone,
      });
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SignUp</Text>
      <Text style={styles.subheading}>Create an Account</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          style={styles.controls}
          showsVerticalScrollIndicator={false}>
          <Input
            placeholder="Username"
            containerStyle={styles.control}
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
            leftIcon={<Icon name="user" size={16} />}
          />

          <Input
            placeholder="Email"
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon name="envelope" size={16} />}
            keyboardType="email-address"
            autoCapitalize="none"
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

          <Input
            placeholder="Confirm Password"
            containerStyle={styles.control}
            value={value.confirmPassword}
            onChangeText={(text) =>
              setValue({ ...value, confirmPassword: text })
            }
            secureTextEntry={true}
            autoCapitalize="none"
            leftIcon={<Icon name="key" size={16} />}
          />

          <Input
            placeholder="Phone"
            containerStyle={styles.control}
            value={value.phone}
            onChangeText={(text) => setValue({ ...value, phone: text })}
            keyboardType="phone-pad"
            leftIcon={<Icon name="phone" size={16} />}
          />

          <Button
            title="SignUp"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={signUp}
          />
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={styles.control}>
            Already have an Account?
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: 300,
  },

  control: {
    marginTop: 10,
  },

  button: {
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'tomato',
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignUp;
