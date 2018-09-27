import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const ImagePicker = require('react-native-image-picker');

import styles from './style';

class AddFloatButton extends Component {
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
      duration: 500,
      easing: Easing.out(Easing.quad),
      delay: 100
    }).start();
  }

  videoPick = async () => {
    var options = {
      title: 'Selecione um video',
      cancelButtonTitle: 'FECHAR',
      takePhotoButtonTitle: 'Gravar Video...',
      chooseFromLibraryButtonTitle: 'Escolher na Galeria...',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: false
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (this.props.onSelectVideo) this.props.onSelectVideo(response.path);
      }
    });
  };

  render() {
    const right = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, Dimensions.get('window').width / 2 - 45]
    });

    const AnimatedTouchable = Animated.createAnimatedComponent(
      TouchableOpacity
    );

    return (
      <AnimatedTouchable
        activeOpacity={1}
        underlayColor="#424242"
        onPress={() => this.videoPick()}
        style={[styles.touchableStyles, { right }]}
      >
        <View style={styles.addButton}>
          <Icon name="ios-add" size={45} color="white" />
        </View>
      </AnimatedTouchable>
    );
  }
}

export default AddFloatButton;
