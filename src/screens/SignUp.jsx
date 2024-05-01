import React from 'react';
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
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

const schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be minimum 3 characters')
    .max(20, 'Username must be maximum 20 characters'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be minimum 8 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be minimum 8 characters')
    .refine((data) => data.confirmPassword === data.password, {
      message: 'Passwords do not match',
    }),
  phone: z.string().min(10).max(10, 'Phone number must be 10 digits'),
});

const SignUp = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.username });

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        username: data.username,
        email: data.email,
        phone: data.phone,
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
          <Controller
            name={'username'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Username"
                  inputStyle={{ color: colors.text }}
                  placeholderTextColor={'grey'}
                  containerStyle={styles.control}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  leftIcon={<Icon name="user" color={'grey'} size={16} />}
                />
                {errors.username && (
                  <Text style={styles.error}>{errors.username.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Email"
                  inputStyle={{ color: colors.text }}
                  placeholderTextColor={'grey'}
                  containerStyle={styles.control}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  leftIcon={<Icon name="envelope" color={'grey'} size={16} />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            name={'password'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Password"
                  inputStyle={{ color: colors.text }}
                  placeholderTextColor={'grey'}
                  containerStyle={styles.control}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  leftIcon={<Icon name="key" color={'grey'} size={16} />}
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            name={'confirmPassword'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Confirm Password"
                  inputStyle={{ color: colors.text }}
                  placeholderTextColor={'grey'}
                  containerStyle={styles.control}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  leftIcon={<Icon name="key" color={'grey'} size={16} />}
                />
                {errors.confirmPassword && (
                  <Text style={styles.error}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </>
            )}
          />
          <Controller
            name={'phone'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Phone"
                  inputStyle={{ color: colors.text }}
                  placeholderTextColor={'grey'}
                  containerStyle={styles.control}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  leftIcon={<Icon name="phone" color={'grey'} size={16} />}
                />
                {errors.phone && (
                  <Text style={styles.error}>{errors.phone.message}</Text>
                )}
              </>
            )}
          />
          <Button
            title="SignUp"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={handleSubmit(onSubmit)}
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
    marginTop: 4,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    color: 'red',
  },
});

export default SignUp;
