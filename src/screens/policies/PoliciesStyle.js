import {Colors} from 'colors/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  request: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    margin: 3,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    marginLeft: 0,
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
