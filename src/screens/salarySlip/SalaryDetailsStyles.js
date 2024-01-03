import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
  },
  textView: {
    flexDirection: 'row',
    flex: 2,
    // justifyContent: 'center',
    paddingTop: hp(0.5),
  },
  text1: {
    color: Colors.white,
    marginRight: wp(2),
    fontSize: 18,
    fontWeight: '500',
  },
  mainContainerExceptHeader: {
    flex: 1,
  },
  imageView: {
    height: 150,
    backgroundColor: Colors.lighterBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  monthImage: {height: 80, width: 120, marginRight: wp(4)},
  monthText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: wp(3),
  },
  downloadIcon: {
    height: 40,
    width: 40,
  },
  salaryDetails: {
    flex: 1,
    marginBottom: hp(2),
  },
  salaryDetailsContainerStyle: {flexGrow: 1},
  labelView: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(4),
  },
  fieldLabel: {
    flex: 0.6,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h16,
    color: Colors.royalBlue,
  },
  fieldValue: {
    color: Colors.dune,
    fontFamily: FontFamily.RobotoMedium,
    flex: 0.4,
    fontSize: FontSize.h15,
  },
  earningView: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    backgroundColor: Colors.lightBlue,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  minusImageView: {
    height: 25,
    width: 25,
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    height: 15,
    width: 15,
  },
  earningTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(4),
  },
  deductionView: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    backgroundColor: Colors.lightBlue,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  salaryPart: {color: Colors.white, fontWeight: 'bold', fontSize: 16},
  deductionImageView: {
    height: 25,
    width: 25,
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandIcon: {height: 15, width: 15},
  deductionTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(4),
  },
});
