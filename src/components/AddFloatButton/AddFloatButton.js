import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const ImagePicker = require('react-native-image-picker');
var RNGRP = require('react-native-get-real-path');

import styles from './style';

function AddFloatButton(props) {
  videoPick = async () => {
    var options = {
      title: 'Select Avatar',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images'
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
        if (props.onSelectVideo) props.onSelectVideo(response.path);
      }
    });

    /* ImagePicker.showImagePicker(options, response => {
      RNGRP.getRealPathFromURI(response.uri).then(filePath => {
        _props.videoSelected(filePath);
      });
    }); */
  };

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="#424242"
      onPress={() => videoPick()}
      style={styles.touchableStyles}
    >
      <View style={styles.addButton}>
        <Icon name="ios-add" size={45} color="white" />
      </View>
    </TouchableHighlight>
  );
}

export default AddFloatButton;
