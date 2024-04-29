import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require('../../assets/img1.png')}
        style={styles.imageBackground}>
        <View style={styles.overlay}>
          <Text style={styles.header}>Welcome to Beauty Store</Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Sign in"
              titleStyle={styles.buttonText}
              buttonStyle={styles.button}
              onPress={() => navigation.navigate('SignIn')}
            />
            <Button
              title="Sign up"
              titleStyle={styles.signUpButtonText}
              buttonStyle={styles.signUpButton}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </ImageBackground>
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
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
  },
  button: {
    backgroundColor: 'white',
    width: 300,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  signUpButton: {
    backgroundColor: 'tomato',
    marginTop: 20,
    width: 300,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'tomato',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
});

export default Welcome;
