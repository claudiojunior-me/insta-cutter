import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND, SECONDARY } from '../../config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: BACKGROUND,
    justifyContent: 'space-between'
  },
  bottomContainer: {
    backgroundColor: SECONDARY,
    height: 60,
    width: Dimensions.get('window').width
  },
  contentContainer: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width
  },
  adContainer: {
    backgroundColor: '#C4C4C4',
    width: 300,
    height: 50,
    marginBottom: 10
  },
  videoContainer: {
    width: Dimensions.get('window').width - 20,
    height: 300,
    flex: 3,
    marginBottom: 10
  },
  videoTimelineContainer: {
    width: Dimensions.get('window').width - 20,
    flex: 1
  },
  instructionsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 80
  },
  instructions: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 23
  },
  buttonsContainer: {
    width: Dimensions.get('window').width,
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  }
});
