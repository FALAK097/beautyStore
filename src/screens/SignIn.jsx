import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext';
import Toast from 'react-native-toast-message';

const auth = getAuth();

const schema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be minimum 8 characters'),
});

const SignIn = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Signed in successfully',
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
      <Text style={[styles.heading, { color: colors.primary }]}>SignIn</Text>
      <Text style={[styles.subheading, { color: colors.secondary }]}>
        Welcome Back
      </Text>

      <KeyboardAvoidingView behavior="padding">
        <View style={styles.controls}>
          <Controller
            name={'email'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Email"
                  inputStyle={{ color: colors.text }}
                  containerStyle={styles.control}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Icon name="envelope" color={'grey'} size={16} />}
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
          <Button
            title="SignIn"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={handleSubmit(onSubmit)}
          />
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.control, { color: colors.text }]}>
            Don't have an account? SignUp
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  backIcon: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
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
    backgroundColor: 'white',
    borderColor: 'tomato',
  },

  buttonText: {
    color: 'tomato',
    fontWeight: 'bold',
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

export default SignIn;
