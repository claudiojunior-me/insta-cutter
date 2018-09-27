import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

class ResetButton extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      delay: 1000
    }).start();
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const AnimatedTouchable = Animated.createAnimatedComponent(
      TouchableOpacity
    );

    return (
      <AnimatedTouchable
        activeOpacity={0.5}
        underlayColor="#424242"
        onPress={() => this.props.onPress()}
        style={[styles.resetButton, { opacity }]}
      >
        <View>
          <Icon name="ios-refresh" size={20} color="rgba(255,255,255,.3)" />
        </View>
      </AnimatedTouchable>
    );
  }
}

export default ResetButton;
