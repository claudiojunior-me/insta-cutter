import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';

import styles from './style';
import AddFloatButton from '../../components/AddFloatButton';
import TrimFloatButton from '../../components/TrimFloatButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '/storage/emulated/0/DCIM/Camera/V_20180901_202355_vHDR_On.mp4',
      videoStartTime: 0,
      videoEndTime: 500,
      selectedVideoLength: 1
    };
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

  trimVideo = () => {
    this.videoPlayerRef
      .getVideoInfo()
      .then(info => console.log('info ->', info))
      .catch(console.warn);

    const options = {
      startTime: 0,
      endTime: 15
    };
    this.videoPlayerRef
      .trim(options)
      .then(newSource => console.log('newSource ->', newSource))
      .catch(console.warn);
  };

  updateSelectedVideoLengthIndex = idx => {
    this.setState({ selectedVideoLength: idx });
  };

  render() {
    const {
      path,
      videoStartTime,
      videoEndTime,
      selectedVideoLength
    } = this.state;
    const videoLengthAvailable = ['10s', '15s', '30s', '1m'];

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.adContainer}>
            <Text>Ad</Text>
            <Text>
              {videoStartTime} --> {videoEndTime}
            </Text>
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
                <Text style={styles.instructions}>
                  2 - Escolhe o tempo dos clipes
                </Text>
                <Text style={styles.instructions}>3 - Corte os clipes</Text>
                <Text style={styles.instructions}>4 - Compartilhe!</Text>
              </View>
            )}
          </View>
          <View style={styles.videoTimelineContainer}>
            {path !== '' ? (
              <Trimmer
                source={path}
                height={150}
                width={Dimensions.get('window').width - 20}
                onTrackerMove={e => console.log(e.currentTime)} // iOS only
                themeColor={'white'} // iOS only
                thumbWidth={30} // iOS only
                trackerColor={'green'} // iOS only
                onChange={e => this.changeTrimmer(e)}
              />
            ) : null}
          </View>

          <View style={styles.buttonsContainer}>
            {path !== '' ? (
              <ButtonGroup
                onPress={this.updateSelectedVideoLengthIndex}
                selectedIndex={selectedVideoLength}
                buttons={videoLengthAvailable}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.bottomContainer} />

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
