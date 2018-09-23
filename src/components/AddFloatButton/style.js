import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  touchableStyles: {
    position: 'absolute',
    bottom: 15,
    // left: -45,
    zIndex: 0,
    width: 90,
    height: 90,
    borderRadius: 45
  },
  addButton: {
    backgroundColor: '#1E88E5',
    width: 90,
    height: 90,
    borderColor: '#616161',
    borderWidth: 10,
    borderRadius: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 12
  }
});
