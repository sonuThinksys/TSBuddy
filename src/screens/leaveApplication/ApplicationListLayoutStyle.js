import {FontFamily} from 'constants/fonts';
const {Colors} = require('colors/Colors');
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  request: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 0.1,
    elevation: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 0,
  },
  noDataFoundText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
