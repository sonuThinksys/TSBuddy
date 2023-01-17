import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Modal, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {authLoginStatus} from 'Auth/LoginSlice';
const SalarSlipModal = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}

      //   onRequestClose={() => {
      //     Alert.alert('Modal has been closed.');
      //     setModalVisible(!modalVisible);
      //   }}
    >
      <View
        style={{
          backgroundColor: '#0073cf',
          marginHorizontal: wp(7),
          marginVertical: '85%',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 10,
          shadowOpacity: 0.2,
          paddingVertical: hp(2),
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
        <TouchableOpacity onPress={() => dispatch(authLoginStatus(true))}>
          <View
            style={{
              paddingHorizontal: wp(32),
              paddingTop: hp(1),
              borderRadius: 5,
              shadowOpacity: 0.4,
            }}>
            <Text
              style={{
                paddingHorizontal: wp(2),
                textAlign: 'center',
                paddingVertical: hp(1),
                backgroundColor: '#1b5583',
                color: 'white',
                borderRadius: 5,
              }}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default SalarSlipModal;
