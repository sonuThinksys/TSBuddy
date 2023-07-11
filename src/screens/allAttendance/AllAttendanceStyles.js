import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  mainContainer: {},
  selectDateContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  selectText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h20,
    color: Colors.darkBrown,
    marginRight: 14,
  },
  selectDatePressable: {
    justifyContent: 'center',
  },
  singleCard: {},
});

export default styles;
