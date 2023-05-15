import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useSelector, useDispatch} from 'react-redux';
import {addMealFeedback} from 'redux/homeSlice';
import {styles} from './FoodFeedbackStyles';

const FoodFeedback = ({modalData, showModal}) => {
  const [submit, setSubmit] = useState({});
  const [text, setText] = useState('');
  const [reaction, setReaction] = useState(0);
  const [emojidata, setEmojidata] = useState([
    {
      image: MonthImages.angry,
      tag: 1,
      isSelected: false,
    },
    {image: MonthImages.sad, tag: 2, isSelected: false},
    {image: MonthImages.newtraly, tag: 3, isSelected: false},
    {image: MonthImages.smily, tag: 4, isSelected: false},
    {image: MonthImages.lovely, tag: 5, isSelected: false},
  ]);
  const {setShowModal, type, dailyMenuID, employeeID} = modalData || {};

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);

  const onSelectItem = (item, index) => {
    let tempArr = [];
    emojidata &&
      emojidata.map((item, ind) => {
        if (index === ind) {
          tempArr.push((item.isSelected = true));
        } else {
          tempArr.push((item.isSelected = false));
        }
      });
    setReaction(item.tag);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{paddingHorizontal: wp(2)}} key={index}>
        <TouchableOpacity
          onPress={() => {
            onSelectItem(item, index);
          }}>
          <Image
            style={[
              styles.emojiImages,
              {
                borderWidth: item.isSelected ? 3 : 0,
                borderColor: item.isSelected ? Colors.blackishGreen : 'white',
              },
            ]}
            source={item.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleSubmit = async () => {
    const response = await dispatch(
      addMealFeedback({
        token,
        dailyMenuId: dailyMenuID,
        employeeId: employeeID,
        feedback: text,
        reaction: reaction,
        type: type,
      }),
    );

    if (response?.error) {
      alert(response?.error?.message || 'Something went wrong.');
    } else {
      Alert.alert('Success', 'Feedback sent successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            showModal = false;
          },
        },
      ]);
    }
  };

  return (
    <>
      {showModal ? (
        <TouchableWithoutFeedback onPress={() => {}}>
          <Modal
            animationType="slide"
            transparent={true}
            closeOnClick={true}
            isVisible={showModal}
            onBackdropPress={() => {
              setShowModal(false);
            }}
            onBackButtonPress={() => {
              setShowModal(false);
            }}
            onRequestClose={() => {
              setShowModal(false);
            }}>
            <View style={styles.modalBackground}>
              <View style={styles.emojiConteiner}>
                <FlatList
                  data={emojidata}
                  renderItem={renderItem}
                  keyExtractor={item => item.tag}
                  horizontal={true}
                />
              </View>
              <TextInput
                style={styles.txtInputFeedback}
                placeholder="   Enter your feedback here.."
                onChangeText={e => {
                  setText(e);
                }}
              />
              <View style={styles.btnContainer}>
                <LinearGradient
                  locations={[0.1, 1, 0.01]}
                  colors={[
                    Colors.blackishGreen,
                    Colors.reddishTint,
                    Colors.grey,
                  ]}
                  style={styles.btn}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    <Text style={styles.textStyle}> Cancle </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  locations={[0.1, 1, 0.01]}
                  colors={[Colors.blackishGreen, Colors.green, Colors.grey]}
                  style={styles.btn}>
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                      console.log('Press Submit', text, submit);
                    }}>
                    <Text style={styles.textStyle}> Submit </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};

export default FoodFeedback;
