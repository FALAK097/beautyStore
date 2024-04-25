import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { Image } from '@rneui/themed';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width;

const ImageSlider = ({ images }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        flatListRef.current.scrollToIndex({
          index: (currentIndex + 1) % images.length,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => {
    return <Image source={item} style={styles.image} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        onMomentumScrollEnd={(event) => {
          setCurrentIndex(
            Math.floor(event.nativeEvent.contentOffset.x / ITEM_WIDTH)
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 10,
  },
});

export default ImageSlider;
