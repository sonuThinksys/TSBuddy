import {Colors} from 'colors/Colors';
import {styles} from 'modals/FoodFeedbackStyles';
import CustomHeader from 'navigation/CustomHeader';
import {react} from 'plotly.js';
import React, {useEffect, useState} from 'react';
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
  const [index, setIndex] = useState(0);
  const ref = React.useRef(null);

  useEffect(() => {
    ref.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);

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
    if (employeeHandbookData.length - 1 == index) return;

    setIndex(index + 1);
  };

  const handlePriv = () => {
    if (index == 0) return;
    setIndex(index - 1);
  };

  const handleScroll = event => {
    if (index == 0) return;
    if (index == employeeHandbookData.length - 1) return;
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
        ref={ref}
        initialScrollIndex={index}
        onScroll={handleScroll}
        data={employeeHandbookData}
        pagingEnabled={true}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={index => index}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={handlePriv} disabled={index == 0}>
          <View
            style={{
              width: wp(15),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: hp(5),
              backgroundColor:
                index != 0 ? Colors.lovelyBlue : Colors.lightGray,
            }}>
            <Text style={{color: 'white', fontSize: 17}}>Prev</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={index == employeeHandbookData.length - 1}>
          <View
            style={{
              width: wp(15),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: hp(5),
              backgroundColor:
                index != employeeHandbookData.length - 1
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
