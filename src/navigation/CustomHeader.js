import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {setFromNavigatedScreen} from 'redux/homeSlice';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {employeeProfileScreen} from 'navigation/Route';
import SearchIcon from 'assets/newDashboardIcons/user-magnifying-glass.svg';
import {StackActions} from '@react-navigation/native';

const CustomHeader = function ({
  showDrawerMenu,
  title,
  navigation,
  isHome,
  showHeaderRight,
  headerRight,
  // navigation2,
}) {
  const dispatch = useDispatch();
  const route = useRoute();
  const screenName = route.name;
  // return {
  //   headerTitleAlign: 'center',
  //   headerShown: true,
  //   headerStyle: {
  //     backgroundColor: Colors.lighterBlue,
  //   },
  //   headerTitle: () => (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         marginRight: 'auto',
  //         marginLeft: 'auto',
  //       }}>
  //       {
  //         <Text
  //           style={{
  //             color: Colors.white,
  //             fontSize: 18,
  //             fontFamily: FontFamily.RobotoMedium,
  //           }}>
  //           {title}
  //         </Text>
  //       }
  //     </View>
  //   ),
  //   headerTintColor: Colors.white,
  //   headerShadowVisible: true,
  // };

  return (
    <View
      style={{
        backgroundColor: isHome ? '#EEF2FA' : Colors.lighterBlue,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        // marginHorizontal: 10,
        borderRadius: 2,
        alignItems: 'center',
      }}>
      {showDrawerMenu ? (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <MenuSVG
            fill={isHome ? Colors.black : Colors.white}
            height={24}
            width={24}
          />
        </TouchableOpacity>
      ) : (
        <Pressable
          onPress={() => {
            navigation.goBack();
            // navigation.pop();
          }}>
          <Image
            source={MonthImages.backArrowS}
            style={{height: 20, width: 20}}
          />
        </Pressable>
      )}

      <View
        style={{
          // display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
        {isHome ? (
          <Image
            source={MonthImages.TRMSIcon}
            style={{width: 108, height: 40}}
          />
        ) : (
          <Text
            style={{
              color: Colors.white,
              fontSize: 18,
              fontFamily: FontFamily.RobotoMedium,
            }}>
            {title}
          </Text>
        )}
        {/* <Text>TRMS</Text> */}

        {/* {headerIcon && (
          <Image
            source={headerIcon}
            fill={isHome ? Colors.black : Colors.white}
            style={{height: 22, width: 22}}
          />
        )} */}
      </View>

      {showHeaderRight ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                // dispatch(setFromNavigatedScreen({screenName}));
                navigation.navigate(employeeProfileScreen, {screenName});
              }}>
              <SearchIcon
                fill={isHome ? Colors.black : Colors.white}
                height={26}
                width={26}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        headerRight
      )}
    </View>
  );
};

export default CustomHeader;
