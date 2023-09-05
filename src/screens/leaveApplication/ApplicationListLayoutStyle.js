const {Colors} = require('colors/Colors');
const {StyleSheet} = require('react-native');

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
});

export default styles;
