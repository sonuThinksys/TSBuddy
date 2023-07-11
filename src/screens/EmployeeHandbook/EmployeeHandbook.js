import {Colors} from 'colors/Colors';
import {styles} from 'modals/FoodFeedbackStyles';
import CustomHeader from 'navigation/CustomHeader';
import {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {employeeHandbookData} from 'utils/defaultData';
const {
  Text,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} = require('react-native');
let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

const EmployeeHandbook = ({navigation}) => {
  const [display, setDisplay] = useState(1);

  const renderItem = ({item}) => {
    return (
      <>
        <View
          style={{
            width: width - 20,
            margin: 10,
            height: height - 220,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={item}
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 1,
            }}
            resizeMode="contain"
          />
        </View>
      </>
    );
  };

  const handleNext = () => {
    setDisplay(display + 1);
  };

  const handlePriv = () => {
    setDisplay(display - 1);
  };
  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Employee Handbook"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <FlatList
        data={employeeHandbookData.slice(display - 1, display)}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={index => index}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={handlePriv} disabled={display == 1}>
          <View
            style={{
              width: wp(15),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: hp(5),
              backgroundColor:
                display > 1 ? Colors.lovelyBlue : Colors.lightGray,
            }}>
            <Text style={{color: 'white', fontSize: 17}}>Prev</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={display == employeeHandbookData.length}>
          <View
            style={{
              width: wp(15),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: hp(5),
              backgroundColor:
                display < employeeHandbookData.length
                  ? Colors.lovelyBlue
                  : Colors.lightGray,
            }}>
            <Text style={{color: 'white', fontSize: 17}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EmployeeHandbook;
