import {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './AutoscrollStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import BirthdayAnniV from 'modals/BirthdayAnniV';
import {getCalendereventData} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
const width = Dimensions.get('screen').width;

const CarouselAutoScroll = () => {
  const dispatch = useDispatch();
  const [CalaenderEventData, setCalenderEventData] = useState([]);
  const token = useSelector(state => state.auth.userToken);
  useEffect(() => {
    dispatch(getCalendereventData(token));
  }, []);
  const calenderData = useSelector(
    state => state.dataReducer.calendereventData,
  );
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
  useEffect(() => {
    console.log(
      'CalaenderEventData:-------------------------------',
      CalaenderEventData.length,
    );
  }, [calenderData]);

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

        ref={imageRef}
        pagingEnabled
        data={CalaenderEventData}
        horizontal
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
          <View key={index} style={styles.container}>
            <TouchableOpacity
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
                resizeMode="cover"
                style={styles.backgroundImage}>
                <View style={styles.backgroundImageView}>
                  <Text
                    numberOfLines={2}
                    style={{color: 'white', textAlign: 'center'}}>
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
          </View>
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
