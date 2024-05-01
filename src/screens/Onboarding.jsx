import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const images = [
    require('../../assets/img6.png'),
    require('../../assets/img9.png'),
    require('../../assets/img7.png'),
  ];

  const imageTexts = [
    {
      title: 'Discover the Beauty World',
      subtitle: 'Explore a wide range of beauty products and services',
    },
    {
      title: 'Explore Different Categories',
      subtitle: 'Find the best products for your skin and hair type',
    },
    {
      title: 'Custom Dashboard for You',
      subtitle:
        'Discover the best products and services for you with our custom dashboard',
    },
  ];

  const onNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Welcome');
    }
  };

  const onSkip = () => {
    navigation.navigate('Welcome');
  };

  const onPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.imageContainer}>
        <Image
          source={images[currentIndex]}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{imageTexts[currentIndex].title}</Text>
          <Text style={styles.subtitle}>
            {imageTexts[currentIndex].subtitle}
          </Text>
        </View>
        {(currentIndex === 0 || currentIndex === 1) && (
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={onSkip}>
            <Text style={[styles.buttonText, styles.skipButtonText]}>Skip</Text>
          </TouchableOpacity>
        )}
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={onPrevious}>
            <AntDesign name="arrowleft" size={24} color="#f57309" />
          </TouchableOpacity>
        )}
        {currentIndex < images.length - 1 && (
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={onNext}>
            <AntDesign name="arrowright" size={24} color="#f57309" />
          </TouchableOpacity>
        )}
        {currentIndex === images.length - 1 && (
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={onNext}>
            <AntDesign name="arrowright" size={24} color="#f57309" />
          </TouchableOpacity>
        )}
        <View style={styles.dotContainer}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  skipButtonText: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  skipButton: {
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  previousButton: {
    bottom: 50,
    left: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
  },
  nextButton: {
    bottom: 50,
    right: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'tomato',
  },
});

export default Onboarding;
