import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';
import Spinner from 'react-native-loading-spinner-overlay';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';
import AddFloatButton from '../../components/AddFloatButton';
import TrimFloatButton from '../../components/TrimFloatButton';
import ResetButton from '../../components/ResetButton';

const RNFS = require('react-native-fs');

class Home extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="ios-cut" size={35} color="#1E88E5" />
        <Text style={{ color: 'white', fontSize: 25, marginLeft: 10 }}>
          Insta Cutter
        </Text>
      </View>
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      path: '',
      videoStartTime: 0,
      videoEndTime: 500,
      selectedVideoLengthIdx: 1,
      selectedVideoLength: 15,
      spinnerVisible: false
    };
  }

  componentDidMount() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-5398707650805959/4910653668');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial => adClosed');
      AdMobInterstitial.requestAd().catch(error => console.warn(error));
      this.setState({
        path: '',
        videoStartTime: 0,
        videoEndTime: 500,
        selectedVideoLengthIdx: 1,
        selectedVideoLength: 15,
        spinnerVisible: false
      });
      this.props.navigation.navigate('DoneStack');
    });
    AdMobInterstitial.requestAd().catch(error => console.warn(error));
  }

  selectedVideo(path) {
    this.setState({ path });
  }

  changeTrimmer = evt => {
    this.setState({
      videoStartTime: evt.startTime * 1000,
      videoEndTime: evt.endTime * 1000
    });
  };

  trimVideo = async () => {
    try {
      const { duration } = await this.videoPlayerRef.getVideoInfo();
      const trimLoops = parseInt(duration / this.state.selectedVideoLength);

      this.setState({ spinnerVisible: true });

      // Display an interstitial
      AdMobInterstitial.showAd();

      let currentTime = 0;
      for (let trimLoop = 0; trimLoop < trimLoops; trimLoop++) {
        const options = {
          startTime: currentTime,
          endTime: currentTime + this.state.selectedVideoLength
        };

        console.log(options);
        currentTime += this.state.selectedVideoLength + 1;

        const newSource = await this.videoPlayerRef.trim(options);
        await this.moveFiles(newSource, trimLoop);
      }
    } catch (err) {
      this.setState({ spinnerVisible: false });
      console.log('trimVideo err ->', err);
    }
  };

  moveFiles = async (filePath, loop = 0) => {
    const destPath = '/storage/emulated/0/InstaCutter/';
    const originFilePath = filePath.split('/');
    const fileName = originFilePath[originFilePath.length - 1];
    const originPath = originFilePath.join('/').replace(fileName, '');

    try {
      await RNFS.mkdir(destPath);
      await RNFS.moveFile(
        originFilePath.join('/'),
        destPath + '/' + loop + '_' + fileName
      );
    } catch (err) {
      this.setState({ spinnerVisible: false });
      console.log('err ->', err);
    }
  };

  updateSelectedVideoLengthIndex = idx => {
    let videoLength;

    switch (idx) {
      case 0:
        videoLength = 10;
        break;
      case 1:
        videoLength = 15;
        break;
      case 2:
        videoLength = 30;
        break;
      case 3:
        videoLength = 60;
        break;
      default:
        videoLength = 15;
    }

    this.setState({
      selectedVideoLengthIdx: idx,
      selectedVideoLength: videoLength
    });
  };

  resetSelectedVideo = () => {
    this.setState({
      path: '',
      videoStartTime: 0,
      videoEndTime: 500,
      selectedVideoLengthIdx: 1,
      selectedVideoLength: 15,
      spinnerVisible: false
    });
  };

  render() {
    const {
      path,
      videoStartTime,
      videoEndTime,
      selectedVideoLengthIdx
    } = this.state;
    const videoLengthAvailable = ['10s', '15s', '30s', '1m'];

    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinnerVisible}
          textContent={''}
          textStyle={{ color: '#FFF' }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.adContainer}>
            <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-5398707650805959/6683842286"
              testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.error(error)}
            />
          </View>
          <View style={styles.videoContainer}>
            {path !== '' ? (
              <VideoPlayer
                ref={ref => (this.videoPlayerRef = ref)}
                startTime={videoStartTime} // seconds
                endTime={videoEndTime} // seconds
                play={true} // default false
                replay={true} // should player play video again if it's ended
                rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
                source={path}
                style={{
                  backgroundColor: 'black',
                  flex: 1,
                  marginHorizontal: 10
                }}
                playerWidth={300} // iOS only
                playerHeight={500} // iOS only
                resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
              />
            ) : (
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions}>1 - Selecione o video</Text>
                <Text style={styles.instructions}>2 - Escolhe o tempo</Text>
                <Text style={styles.instructions}>3 - Corte</Text>
                <Text style={styles.instructions}>4 - Compartilhe!</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            {path !== '' ? (
              <ButtonGroup
                onPress={this.updateSelectedVideoLengthIndex}
                selectedIndex={selectedVideoLengthIdx}
                buttons={videoLengthAvailable}
                selectedButtonStyle={{
                  backgroundColor: '#1E88E5'
                }}
                selectedTextStyle={{
                  color: '#FFFFFF',
                  fontWeight: '900'
                }}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {path !== '' ? (
            <ResetButton onPress={this.resetSelectedVideo.bind(this)} />
          ) : null}
        </View>

        {path !== '' ? (
          <TrimFloatButton onPress={this.trimVideo.bind(this)} />
        ) : (
          <AddFloatButton onSelectVideo={this.selectedVideo.bind(this)} />
        )}
      </View>
    );
  }
}

export default Home;
