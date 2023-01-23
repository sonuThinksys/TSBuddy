import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {authLoginStatus} from 'Auth/LoginSlice';
import CustomModal from 'components/CustomModal';
const SalarSlipModal = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <CustomModal>
      {/* <Text>Hello world!</Text> */}
      <View
        style={{
          backgroundColor: '#0073cf',
          justifyContent: 'center',
          borderRadius: 10,
          paddingTop: hp(2),
          shadowOpacity: 0.2,
          elevation: 20,
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            marginVertical: hp(1),
            paddingHorizontal: wp(4),
          }}>
          Please authenticate with your password
        </Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={{
            backgroundColor: 'white',
            paddingVertical: hp(2),
            paddingHorizontal: wp(1),
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp(1),
          }}
          onPress={() => dispatch(authLoginStatus(true))}>
          <View
            style={{
              // paddingHorizontal: wp(32),
              flexDirection: 'row',
              justifyContent: 'center',
              // paddingTop: hp(1),
              borderRadius: 5,
              shadowOpacity: 0.4,
              backgroundColor: '#088bf3',
              // borderWidth: 1,
              // borderColor: '#1b5583',
              width: '25%',
            }}>
            <Text
              style={{
                paddingHorizontal: wp(2),
                textAlign: 'center',
                paddingVertical: hp(1),

                color: 'white',
                borderRadius: 5,
                elevation: 10,
              }}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );

  return (
    <View
      style={{
        // borderColor: '#000',
        // borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(32, 33, 36, 0.4)',
        // opacity: 0.5,
      }}

      //   onRequestClose={() => {
      //     Alert.alert('Modal has been closed.');
      //     setModalVisible(!modalVisible);
      //   }}
    >
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // borderColor: '#000',
          // borderWidth: 10,
        }}> */}
      <View
        style={{
          backgroundColor: '#0073cf',
          marginHorizontal: wp(7),
          justifyContent: 'center',
          borderRadius: 10,
          shadowOpacity: 0.2,
          paddingTop: hp(2),
          elevation: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            marginVertical: hp(1),
            paddingHorizontal: wp(5),
          }}>
          Please authenticate with your password
        </Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          style={{
            backgroundColor: 'white',
            paddingVertical: hp(2),
            paddingHorizontal: wp(1),
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp(1),
          }}
          onPress={() => dispatch(authLoginStatus(true))}>
          <View
            style={{
              // paddingHorizontal: wp(32),
              flexDirection: 'row',
              justifyContent: 'center',
              // paddingTop: hp(1),
              borderRadius: 5,
              shadowOpacity: 0.4,
              backgroundColor: '#088bf3',
              // borderWidth: 1,
              // borderColor: '#1b5583',
              width: '25%',
            }}>
            <Text
              style={{
                paddingHorizontal: wp(2),
                textAlign: 'center',
                paddingVertical: hp(1),

                color: 'white',
                borderRadius: 5,
                elevation: 10,
              }}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};
export default SalarSlipModal;
