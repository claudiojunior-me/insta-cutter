import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  touchableStyles: {
    position: 'absolute',
    bottom: 15,
    left: Dimensions.get('window').width / 2 - 40,
    zIndex: 0,
    width: 80,
    height: 80,
    borderRadius: 40
  },
  addButton: {
    backgroundColor: '#1E88E5',
    width: 80,
    height: 80,
    borderColor: '#616161',
    borderWidth: 10,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 8
  }
});
