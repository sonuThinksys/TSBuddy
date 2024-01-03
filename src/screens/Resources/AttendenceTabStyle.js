import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  noLeavesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noLeavesText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 17,
    color: Colors.dune,
  },
});

export default styles;
