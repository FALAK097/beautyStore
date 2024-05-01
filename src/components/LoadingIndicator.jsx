import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingIndicator = ({ message }) => {
  const [segment1Opacity] = useState(new Animated.Value(0));
  const [segment2Opacity] = useState(new Animated.Value(0));
  const [segment3Opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateSegments = () => {
      Animated.sequence([
        Animated.timing(segment1Opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(segment2Opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(segment3Opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(segment1Opacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(segment2Opacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(segment3Opacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => {
        animateSegments();
      });
    };

    animateSegments();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingIndicator}>
        <Animated.View
          style={[styles.loadingSegment, { opacity: segment1Opacity }]}
        />
        <Animated.View
          style={[styles.loadingSegment, { opacity: segment2Opacity }]}
        />
        <Animated.View
          style={[styles.loadingSegment, { opacity: segment3Opacity }]}
        />
      </View>
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  loadingSegment: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
    marginHorizontal: 5,
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default LoadingIndicator;
