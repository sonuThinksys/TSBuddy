import {Colors} from 'colors/Colors';
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
  },
  leftType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
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
});

export default styles;
