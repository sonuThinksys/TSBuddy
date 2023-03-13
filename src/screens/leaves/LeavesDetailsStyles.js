import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 8,
    marginTop: 8,
    borderWidth: 2,
    borderColor: Colors.parrotGreen,
    marginBottom: 40,
  },

  card: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.whitishGray,
  },
  header: {
    backgroundColor: Colors.parrotGreen,
    padding: 10,
  },
  headerText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  cardLeftText: {
    fontWeight: '700',
    width: wp(32),
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: Colors.whitishGray,
  },
  cardRightTextContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
