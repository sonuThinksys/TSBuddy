import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';

export default StyleSheet.create({
  policy: {
    marginTop: 10,
  },
  request: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    marginVertical: 3,
    flex: 1,
    marginRight: 10,
    marginLeft: 0,
    borderWidth: 2,
    // elevation: 1,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    marginLeft: 0,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(4),
    backgroundColor: '#68C19E',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  titleText: {
    fontSize: 16,
    fontFamily: FontFamily.RobotoLight,
    color: Colors.white,
  },
  policyTextContainer: {
    flex: 1,
  },
  policyText: {
    fontSize: 18,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
  },
  requestText: {
    fontSize: 11.5,
  },
  requestType: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 40,
    color: Colors.dune,
  },
  requestTypeContainer: {
    backgroundColor: Colors.whitishPink,
    borderRadius: 8,
    marginRight: 16,
  },
  cancelButton: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.white,
  },
  image: {
    width: 20,
    aspectRatio: 1,
  },
  datesContainer: {
    flexDirection: 'row',
    zIndex: -1,
  },
});
