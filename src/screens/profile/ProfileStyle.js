import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingTop: hp(12),
    flexDirection: 'row',
  },
  profileView: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: 'gray',
  },
  text: {
    marginTop: hp(7.5),
    marginHorizontal: wp(4),
    color: 'steelblue',
    fontWeight: 'bold',
    fontSize: 18,
  },
  detailsView: {
    borderWidth: 0.3,
    borderTopWidth: 0.1,
    marginHorizontal: wp(2),
    borderRadius: 5,
    marginVertical: hp(1),
    height: hp(35),
    backgroundColor: 'white',
    shadowOpacity: 0.3,
  },
  managerDetailView: {
    marginHorizontal: wp(2),
    borderWidth: 0.1,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: hp(1),
    // paddingVertical: hp(0.),
    paddingBottom: hp(1),
    shadowOpacity: 0.5,
    borderRadius: 5,
  },
  managerDetailView1: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: '#0E5E6F',
  },
  managerDetailView2: {
    paddingHorizontal: wp(5),
    paddingTop: hp(0.5),
    display: 'flex',
    flexDirection: 'row',
  },
  roundIcon: {height: 80, width: 80, borderRadius: 40, backgroundColor: 'gray'},
  managerNameText: {
    marginTop: hp(1),
    marginHorizontal: wp(4),
    color: 'black',
    opacity: 0.6,
    fontSize: 18,
  },
  emailText: {marginHorizontal: wp(4), marginTop: hp(0.6), opacity: 0.7},
  socialIconView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
    justifyContent: 'space-around',
  },
  flatelistView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
});
