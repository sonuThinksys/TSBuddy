import {Colors} from 'colors/Colors';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  mainContainer: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lighterBlue,
    backgroundColor: Colors.almostWhite,
  },
  insideContainer: {
    height: 12,
    width: 12,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: Colors.lighterBlue,
  },
  borderGrey: {borderColor: Colors.lightGray1},
  backgroundWhite: {
    backgroundColor: Colors.white,
  },
});

export default styles;
