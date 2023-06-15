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
  Dimensions,
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
      <View
        style={{
          width: wp(16),
          // alignItems:
          //   index !== 0 && index !== 4
          //     ? 'center'
          //     : index === 0
          //     ? 'flex-start'
          //     : 'flex-end',
          alignItems: 'center',
          // borderWidth: 1,
        }}
        key={index}>
        <TouchableOpacity
          onPress={() => {
            onSelectItem(item, index);
          }}>
          <Image
            style={[
              styles.emojiImages,
              {
                borderWidth: item.isSelected ? 1 : 0,
                borderColor: item.isSelected
                  ? Colors.blackishGreen
                  : Colors.white,
              },
            ]}
            source={item.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleSubmit = async () => {
    const bodyToSend = {
      dailyMenuId: dailyMenuID,
      employeeId: employeeID,
      feedback: text,
      reaction: reaction,
      type: type,
    };

    try {
      const response = await dispatch(
        addMealFeedback({
          token,
          body: bodyToSend,
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
    } catch (err) {
      console.log('err:', err);
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
              <Text style={styles.foodTypeText}>{type}</Text>
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
                placeholder=" Write your feedback..."
                onChangeText={e => {
                  setText(e);
                }}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text style={[styles.textStyle, {color: Colors.dune}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.buttonCancel, styles.buttonSubmit]}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};

export default FoodFeedback;
