import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import Modal from 'react-native-modal';
import {Colors} from 'colors/Colors';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {addMealFeedback} from 'redux/homeSlice';
import {styles} from './FoodFeedbackStyles';
import Loader from 'component/loader/Loader';

const FoodFeedback = ({modalData, showModal}) => {
  const [text, setText] = useState('');
  const [reaction, setReaction] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [emojidata, setEmojiData] = useState([
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
  console.log('emojidata:', emojidata);

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);

  const onSelectItem = (item, index) => {
    let tempArr = [];
    emojidata &&
      emojidata.map((emoji, ind) => {
        if (index === ind) {
          tempArr.push((emoji.isSelected = true));
        } else {
          emojidata[index].isSelected = false;
          tempArr.push((emoji.isSelected = false));
        }
      });
    setReaction(item.tag);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.emoji} key={index}>
        <TouchableOpacity
          onPress={() => {
            onSelectItem(item, index);
          }}>
          <Image
            style={[
              styles.emojiImages,
              {
                borderWidth: 2,
                // borderWidth: item.isSelected ? 2 : 0,
                // borderColor: item.isSelected
                //   ? Colors.blackishGreen
                //   : Colors.white,
                borderColor: 'black',
              },
            ]}
            source={item.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onCancelModal = () => {
    setReaction(0);
    setText('');
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const bodyToSend = {
      dailyMenuId: dailyMenuID,
      employeeId: employeeID,
      feedback: text,
      reaction: reaction,
      type: type,
    };
    setIsLoading(true);

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
      console.log('errEmoji:', err);
    } finally {
      setIsLoading(false);
      onCancelModal();
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
              onCancelModal();
            }}
            onBackButtonPress={() => {
              onCancelModal();
            }}
            onRequestClose={() => {
              onCancelModal();
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
                    onCancelModal(false);
                  }}>
                  <Text style={[styles.textStyle, {color: Colors.dune}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  // disabled={reaction === 0 || text === ''}
                  style={[
                    styles.buttonCancel,
                    styles.buttonSubmit,
                    // {opacity: reaction === 0 || text === '' ? 0.5 : 1},
                  ]}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isLoading ? <Loader /> : null}
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};

export default FoodFeedback;
