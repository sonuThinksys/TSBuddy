import {Colors} from 'colors/Colors';
import {FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';

const styles = StyleSheet.create({
  drawerItemContainer: {
    paddingVertical: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedStyle: {
    backgroundColor: Colors.royalBlue,
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  drawerItemText: {
    color: Colors.white,
    fontSize: FontSize.h15,
    textAlign: 'center',
  },
  drawerContentContainerStyle: {
    flexGrow: 1,
  },
  drawerMainContainer: {
    flex: 1,
  },
});

export default styles;
