import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from '@rneui/themed';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import { db } from '../config/Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const auth = getAuth();

const SignUp = ({ navigation }) => {
  const { colors } = useTheme();
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

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Account created successfully.',
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 4000,
        autoHide: true,
        swipeable: true,
      });
    }
  }

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
      </View>
      <Text style={[styles.heading, { color: colors.primary }]}>SignUp</Text>
      <Text style={[styles.subheading, { color: colors.secondary }]}>
        Create an Account
      </Text>

      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          style={styles.controls}
          showsVerticalScrollIndicator={false}>
          <Input
            placeholder="Username"
            inputStyle={{ color: colors.text }}
            placeholderTextColor={'grey'}
            containerStyle={styles.control}
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
            leftIcon={<Icon name="user" color={'grey'} size={16} />}
          />

          <Input
            placeholder="Email"
            inputStyle={{ color: colors.text }}
            placeholderTextColor={'grey'}
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon name="envelope" color={'grey'} size={16} />}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            inputStyle={{ color: colors.text }}
            placeholderTextColor={'grey'}
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
            autoCapitalize="none"
            leftIcon={<Icon name="key" color={'grey'} size={16} />}
          />

          <Input
            placeholder="Confirm Password"
            inputStyle={{ color: colors.text }}
            placeholderTextColor={'grey'}
            containerStyle={styles.control}
            value={value.confirmPassword}
            onChangeText={(text) =>
              setValue({ ...value, confirmPassword: text })
            }
            secureTextEntry={true}
            autoCapitalize="none"
            leftIcon={<Icon name="key" color={'grey'} size={16} />}
          />

          <Input
            placeholder="Phone"
            inputStyle={{ color: colors.text }}
            placeholderTextColor={'grey'}
            containerStyle={styles.control}
            value={value.phone}
            onChangeText={(text) => setValue({ ...value, phone: text })}
            keyboardType="phone-pad"
            leftIcon={<Icon name="phone" color={'grey'} size={16} />}
          />

          <Button
            title="SignUp"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={signUp}
          />
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={[styles.control, { color: colors.text }]}>
            Already have an Account?
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backIcon: {
    marginRight: 20,
    marginLeft: 20,
  },
  heading: {
    fontSize: 20,
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
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default SignUp;
