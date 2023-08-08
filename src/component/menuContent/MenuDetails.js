import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import Modal from 'react-native-modal';
import styles from './MenudetailStyle';
import RequestLunch from 'screens/requestLunch/RequestLunch';
import {RequestLunchScreen} from 'navigation/Route';
import {FontFamily, FontSize} from 'constants/fonts';
import {Colors} from 'colors/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {addDailyMenuDetails} from 'redux/homeSlice';
import Loader from 'component/loader/Loader';

const MenuDetails = () => {
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = token && jwt_decode(token);
  const isAdmin = decoded?.role?.includes('Admin Executive') || false;
  const navigation = useNavigation();
  const [openAddMenuModal, setOpenAddMenuModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [menu, setMenu] = useState({
    breakfast: '',
    lunch: '',
    eveningSnack: '',
  });

  const openAddMenu = () => {
    setOpenAddMenuModal(true);
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const menuAdded = await dispatch(
        addDailyMenuDetails({token, body: {...menu, date: new Date()}}),
      );

      if (!menuAdded?.error) {
        alert('Menu added successfully.');
      }
    } catch (err) {
      console.log('err:', err);
    } finally {
      setMenu({
        breakfast: '',
        lunch: '',
        eveningSnack: '',
      });
      setIsLoading(false);
      setOpenAddMenuModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Today's Menu</Text>

      <Modal
        animationType="slide"
        transparent={true}
        closeOnClick={true}
        isVisible={openAddMenuModal}
        onBackdropPress={() => {
          setOpenAddMenuModal(false);
        }}
        onBackButtonPress={() => {
          setOpenAddMenuModal(false);
        }}
        onRequestClose={() => {
          setOpenAddMenuModal(false);
        }}>
        <View style={styles.modalBackground}>
          <Text style={styles.newDailyMenuHeading}>New Daily Menu</Text>
          <View style={styles.modal}>
            <View style={styles.foodContainer}>
              <Text style={styles.foodTypeText}>Enter today Breakfast :</Text>
              <TextInput
                onChangeText={enteredInput => {
                  setMenu(menu => ({...menu, breakfast: enteredInput}));
                }}
                style={styles.textInput}
              />
            </View>
            <View style={styles.foodContainer}>
              <Text style={styles.foodTypeText}>Enter today Lunch :</Text>
              <TextInput
                onChangeText={enteredInput => {
                  setMenu(menu => ({...menu, lunch: enteredInput}));
                }}
                style={styles.textInput}
              />
            </View>
            <View style={styles.foodContainer}>
              <Text style={styles.foodTypeText}>
                Enter today Evening Snack :
              </Text>
              <TextInput
                onChangeText={enteredInput => {
                  setMenu(menu => ({...menu, eveningSnack: enteredInput}));
                }}
                style={styles.textInput}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={[styles.buttonContainer, {backgroundColor: Colors.red}]}
                onPress={() => setOpenAddMenuModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable
                disabled={
                  !menu.breakfast.trim() ||
                  !menu.lunch.trim() ||
                  !menu.eveningSnack.trim()
                }
                onPress={submitHandler}
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: Colors.green,
                    opacity:
                      !menu.breakfast.trim() ||
                      !menu.lunch.trim() ||
                      !menu.eveningSnack.trim()
                        ? 0.4
                        : 1,
                  },
                ]}>
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
        {isLoading ? <Loader /> : null}
      </Modal>

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate(RequestLunchScreen);
        }}>
        <Text style={styles.text2}>Lunch Request</Text>
      </Pressable>
      {isAdmin ? (
        <Pressable onPress={openAddMenu} style={styles.button}>
          <Text style={styles.text2}>Add +</Text>
        </Pressable>
      ) : null}
      {/* </LinearGradient> */}
    </View>
  );
};

export default MenuDetails;
