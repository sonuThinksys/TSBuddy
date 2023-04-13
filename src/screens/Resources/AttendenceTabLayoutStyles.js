import {Colors} from 'colors/Colors';
import {FontSize} from 'constants/fonts';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 80,
    borderRadius: 10,
    backgroundColor: '#ebfbee',
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: Colors.grey,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  left: {
    justifyContent: 'center',
    backgroundColor: '#8ce99a',
    paddingHorizontal: 32,
  },
  right: {
    justifyContent: 'space-evenly',
    paddingLeft: 7,
    flex: 1,
  },
  inOutTimeCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalEffHours: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalHoursSubCont: {
    flexDirection: 'row',
  },
  inOutSubCont: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: FontSize.h20,
  },
  timeHeading: {
    fontSize: FontSize.h15,
  },
  time: {
    fontSize: FontSize.h12,
    color: Colors.dune,
  },
  hourHeading: {
    fontSize: FontSize.h13,
  },
});

export default styles;
