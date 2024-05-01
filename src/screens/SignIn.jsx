import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext';
import Toast from 'react-native-toast-message';

const auth = getAuth();

const SignIn = ({ navigation }) => {
  const { colors } = useTheme();
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

      <View style={styles.controls}>
        <Input
          placeholder="Email"
          inputStyle={{ color: colors.text }}
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="envelope" color={'grey'} size={16} />}
        />

        <Input
          placeholder="Password"
          inputStyle={{ color: colors.text }}
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          autoCapitalize="none"
          leftIcon={<Icon name="key" color={'grey'} size={16} />}
        />

        <Button
          title="SignIn"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={signIn}
        />
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={[styles.control, { color: colors.text }]}>
          Don't have an account? SignUp
        </Text>
      </View>
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
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default SignIn;
