import {Colors} from 'colors/Colors';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from 'utils/Responsive';
export default StyleSheet.create({
  container: {
    margin: 10,
  },
  textHeader: {
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  dropdownCont: {
    marginLeft: 10,
    marginRight: 10,
  },
  halfFullCont: {
    marginLeft: 12,
    marginRight: 22,
    marginTop: 20,
  },
  commentCont: {
    marginLeft: 10,
    marginRight: 10,
  },
  comentBox: {
    borderWidth: 1,
    height: 100,
    borderRadius: 4,
    textAlignVertical: 'top',
    backgroundColor: Colors.white,
  },
  btnCont: {
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  btn: {
    borderRadius: 17,
    width: '100%',
    alignItems: 'center',
    padding: 2,
    height: heightPercentageToDP(5),
    justifyContent: 'center',
  },
  checkbox: {
    width: widthPercentageToDP(5),
    height: heightPercentageToDP(2.5),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.red,
  },
});
