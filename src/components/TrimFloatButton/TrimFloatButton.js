import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

function TrimFloatButton(props) {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#424242"
      onPress={() => props.onPress()}
      style={styles.touchableStyles}
    >
      <View style={styles.addButton}>
        <Icon name="ios-cut" size={40} color="white" />
      </View>
    </TouchableHighlight>
  );
}

export default TrimFloatButton;
