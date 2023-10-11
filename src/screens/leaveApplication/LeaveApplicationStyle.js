import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  attendanceTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: Colors.whitishBlue,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 100,
    overflow: 'hidden',
  },
  tabContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    // borderTopLeftRadius: 100,
    // borderBottomLeftRadius: 100,
  },
  middleType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rightType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  headerRightText: {
    color: Colors.white,
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoMedium,
  },
  headerRightContainer: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  textColorWhite: {
    color: Colors.white,
  },
  listContainer: {
    flex: 1,
  },
});

export default styles;
