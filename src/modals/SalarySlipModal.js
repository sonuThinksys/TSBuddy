import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {authLoginStatus} from 'Auth/LoginSlice';
import CustomModal from 'customComponents/CustomModal';
import {getSalarySlipData} from 'redux/homeSlice';
import {Colors} from 'colors/Colors';
const SalarSlipModal = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);
  const token = useSelector(state => state.auth.userToken);
  return (
    <CustomModal>
      <View style={styles.container}>
        <Text style={styles.textline}>
          Please authenticate with your password
        </Text>
        <TextInput
          style={styles.textinput}
          placeholder="Password"
          placeholderTextColor={Colors.grey}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp(1),
          }}
          onPress={() => {
            dispatch(authLoginStatus(true));
            dispatch(getSalarySlipData(token));
          }}>
          <View style={styles.secondTextView}>
            <Text style={styles.contnueText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: hp(2),
    shadowOpacity: 0.2,
    elevation: 20,
    width: '100%',
  },
  textline: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  textinput: {
    backgroundColor: Colors.white,
    paddingVertical: hp(2),
    paddingHorizontal: wp(1),
  },
  secondTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    shadowOpacity: 0.4,
    backgroundColor: Colors.darkpurple,
    width: '25%',
  },
  contnueText: {
    paddingHorizontal: wp(2),
    textAlign: 'center',
    paddingVertical: hp(1),
    color: Colors.white,
    borderRadius: 5,
    elevation: 10,
  },
});
export default SalarSlipModal;
