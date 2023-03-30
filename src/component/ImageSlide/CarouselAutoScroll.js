import {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './AutoscrollStyle';

import BirthdayAnniV from 'modals/BirthdayAnniV';
import {Colors} from 'colors/Colors';
import {getCalendereventData} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
const width = Dimensions.get('screen').width;
import {imageArr} from 'utils/DummyData';

const CarouselAutoScroll = () => {
  const dispatch = useDispatch();
  const [CalaenderEventData, setCalenderEventData] = useState([]);
  const {userToken: token} = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(getCalendereventData(token));
  }, []);
  const {calendereventData: calenderData} = useSelector(state => state.home);
  const keyOfObject = Object.keys(calenderData);

  useEffect(() => {
    let arr = [];
    keyOfObject.map(el => {
      calenderData[el].map(element => {
        arr.push(element);
      });
    });
    setCalenderEventData(arr);
  }, [calenderData]);
  useEffect(() => {}, [calenderData]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const imageRef = useRef();
  const [active, setActive] = useState(0);
  const indexRef = useRef(active);

  indexRef.current = active;
  useInterval(() => {
    if (CalaenderEventData && CalaenderEventData.length > 0) {
      if (active < Number(CalaenderEventData?.length) - 1) {
        setActive(active + 1);
      } else {
        setActive(0);
      }
    }
  }, 5000);

  useEffect(() => {
    if (CalaenderEventData && CalaenderEventData.length > 0) {
      imageRef.current.scrollToIndex({index: active, animated: true});
    }
  }, [active]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      {showModal ? (
        <BirthdayAnniV modalData={modalData} showModal={showModal} />
      ) : null}
      <FlatList
        showsHorizontalScrollIndicator={false}
        // onViewableItemsChanged={onViewableItemsChangedHandler}
        // viewabilityConfig={{
        //   itemVisiblePercentThreshold: 50,
        // }}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        ref={imageRef}
        pagingEnabled
        data={CalaenderEventData}
        horizontal
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          // <View >
          <TouchableOpacity
            key={index}
            style={styles.container}
            // style={{marginHorizontal: 10}}
            onPress={() => {
              setModalData({
                startsOn: item.startsOn,
                dateOfJoining: item.dateOfJoining,
                name: item.employeeName,
                description: item.description,

                setShowModal: setShowModal,
              });
              setShowModal(true);
            }}>
            <ImageBackground
              source={
                item.description === null
                  ? MonthImages.workAnniversaryy
                  : MonthImages.BirthdayImage
              }
              resizeMode="stretch"
              imageStyle={{
                borderRadius: 15,
              }}
              style={styles.backgroundImage}>
              <View style={styles.textView}>
                <Text
                  numberOfLines={2}
                  style={{color: Colors.white, textAlign: 'center'}}>
                  {item.description === null
                    ? `Happy Work Aniversary ${item.employeeName} on ${moment(
                        item.dateOfJoining,
                      ).format('DD MMM ')}`
                    : `Happy Birthday ${item.employeeName} on ${moment(
                        item.startsOn,
                      ).format('DD MMM ')}`}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          // </View>
        )}
        // style={{...StyleSheet.AbsoluteFill}}
      />
    </View>
  );
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default CarouselAutoScroll;
