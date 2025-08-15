import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');
const swipeThreshold = screenWidth * 0.25; // How far to drag before a swipe is triggered

const SwipeableCard = ({ children, onSwipeLeft, onSwipeRight }) => {
  const translateX = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      if (translationX > swipeThreshold) {
        onSwipeRight();
      } else if (translationX < -swipeThreshold) {
        onSwipeLeft();
      } else {
        // If not swiped far enough, spring back to the center
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const cardStyle = {
    transform: [
      { translateX },
      {
        rotate: translateX.interpolate({
          inputRange: [-screenWidth / 2, 0, screenWidth / 2],
          outputRange: ['-10deg', '0deg', '10deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeableCard;
