import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  wholeContainerNotHeader: {
    marginHorizontal: 8,
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  rowRenderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  rowRenderTitle: {
    fontSize: FontSize.h18,
    fontFamily: FontFamily.RobotoMedium,
    width: '40%',
  },
  approverSelectContainerStyle: {
    flex: 1,
  },
  leaveApproverSelect: {
    borderRadius: 4,
    borderColor: Colors.lightGray1,
    borderWidth: 1,
  },
  datePickersContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 8,
  },
  fromDatePicker: {
    flex: 1,
  },
  toDatePicker: {
    flex: 1,
  },
  pickerTitle: {
    fontSize: FontSize.h18,
    color: Colors.dune,
    marginLeft: 6,
    marginBottom: 6,
  },
  openPickerButton: {
    backgroundColor: Colors.whiteGreyTint,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  fromButton: {
    marginRight: 8,
  },
  toButton: {
    marginLeft: 8,
  },
  reasonTextInput: {
    height: 80,
    fontSize: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.lightGray1,
    flex: 1,
    backgroundColor: Colors.grayishWhite,
    borderRadius: 4,
    padding: 8,
  },
  leaveCountTextInput: {
    // fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray1,
    flex: 1,
    backgroundColor: Colors.grayishWhite,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
  },
  errorText: {
    color: Colors.red,
    fontSize: FontSize.h15,
    fontFamily: FontFamily.RobotoMedium,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray1,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  submitButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.purpleShade,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  cancelText: {
    color: Colors.dune,
    fontSize: FontSize.h20,
    fontFamily: FontFamily.RobotoRegular,
  },
  submitText: {
    color: Colors.purpleShade,
    fontSize: FontSize.h20,
    fontFamily: FontFamily.RobotoRegular,
  },
  lessOpacity60: {
    opacity: 0.6,
  },
});

export default styles;
