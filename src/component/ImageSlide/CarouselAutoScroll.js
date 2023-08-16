import {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './AutoscrollStyle';
import {FlashList} from '@shopify/flash-list';

import BirthdayAnniV from 'modals/BirthdayAnniV';
import {Colors} from 'colors/Colors';
import {useSelector} from 'react-redux';
import moment from 'moment';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import BriefCase from 'assets/newDashboardIcons/briefcase.svg';
import HappyBirthday from 'assets/newDashboardIcons/cake-candles.svg';
import {FontFamily} from 'constants/fonts';

const CarouselAutoScroll = ({navigation}) => {
  const [calenderEventData, setCalenderEventData] = useState([]);
  const {calendereventData: calenderData} = useSelector(state => state.home);

  const birthdays = calenderData?.calenderEvent;
  const anniversaries = calenderData?.anniversaryEvent;

  const keyOfObject = Object?.keys(calenderData);

  useEffect(() => {
    let arr = [];
    const events = [];

    birthdays?.forEach(birthday => {
      const newBirthday = {...birthday};
      newBirthday.isBirthday = true;
      events.push(newBirthday);
    });

    anniversaries?.forEach(anniversary => {
      const newAnniversary = {...anniversary};
      newAnniversary.isBirthday = false;
      events.push(newAnniversary);
    });

    keyOfObject?.map(el => {
      calenderData[el]?.map(element => {
        arr.push(element);
      });
    });

    setCalenderEventData(events);
  }, [calenderData]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [scrolled, setScrolled] = useState({
    scrollStart: false,
    scrollStop: false,
  });
  const imageRef = useRef();
  const [active, setActive] = useState(0);
  const indexRef = useRef(active);

  indexRef.current = active;
  useInterval(() => {
    if (
      calenderEventData &&
      calenderEventData.length > 0 &&
      !scrolled.scrollStop &&
      !scrolled.scrollStart
    ) {
      if (active < Number(calenderEventData?.length) - 1) {
        setActive(active + 1);
      } else {
        setActive(0);
      }
    }
  }, 5000);

  useEffect(() => {
    let timerId;
    if (scrolled.scrollStop) {
      setTimeout(() => {
        timerId = setScrolled(prevScrollObj => ({
          ...prevScrollObj,
          scrollStop: false,
        }));
      }, 16000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [scrolled.scrollStop]);

  useEffect(() => {
    if (calenderEventData && calenderEventData.length > 0) {
      imageRef?.current?.scrollToIndex({index: active, animated: true});
    }
  }, [active]);

  const handleScrollBeginDrag = () => {
    setScrolled({scrollStart: true, scrollStop: false});
  };

  const handleScrollEndDrag = () => {
    setScrolled({scrollStart: false, scrollStop: true});
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      {showModal ? (
        <BirthdayAnniV modalData={modalData} showModal={showModal} />
      ) : null}
      {calenderEventData?.length ? (
        <FlatList
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          ref={imageRef}
          // pagingEnabled
          estimatedItemSize={200}
          data={calenderEventData}
          horizontal
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              imageRef?.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            const name = `${item.firstName ? item.firstName : ''} ${
              item.middleName ? item.middleName + ' ' : ''
            }${item.lastName ? item.lastName : ''}`;

            return (
              <View
                style={{
                  marginRight: wp(5),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.isBirthday ? (
                    <>
                      <Image
                        source={MonthImages.Balloons}
                        style={{height: 40, width: 40, marginRight: 24}}
                      />
                      <Text style={styles.happyText}>Happy </Text>
                      <Text style={styles.wishText}>Birthday</Text>
                    </>
                  ) : (
                    <>
                      <Image
                        source={MonthImages.AnniversaryIcon}
                        style={{height: 40, width: 40, marginRight: 24}}
                      />
                      <Text style={styles.happyText}>Happy </Text>
                      <Text style={styles.wishText}>Anniversary</Text>
                    </>
                  )}
                </View>

                <Pressable
                  style={styles.container}
                  key={index}
                  onPress={() => {
                    console.log('itemm:', item);
                    setModalData({
                      startsOn: item.startsOn,
                      dateOfJoining: item.dateOfJoining,
                      name,
                      description: item.description,
                      isBirthday: item.isBirthday,
                      dateOfBirth: item.dateOfBirth,

                      setShowModal: setShowModal,
                    });
                    setShowModal(true);
                  }}>
                  <Image source={defaultUserIcon} style={styles.image} />
                  <Text style={styles.birthdayBoyOrGirl}>{name}</Text>
                  <Text style={styles.designation}>{item?.designation}</Text>
                </Pressable>
                <View style={styles.eventDate}>
                  {item.isBirthday ? (
                    <HappyBirthday height={16} width={16} marginRight={10} />
                  ) : (
                    <BriefCase height={16} width={16} marginRight={10} />
                  )}
                  <Text style={styles.eventDateText}>
                    {item?.isBirthday
                      ? moment(item?.dateOfBirth).format('DD MMM')
                      : moment(item?.dateOfJoining).format('DD MMM')}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            No Events found for this Month.
          </Text>
        </View>
      )}

      {/* {calenderEventData?.length ? (
        <FlashList
          ref={imageRef}
          estimatedItemSize={200}
          data={calenderEventData}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginRight: wp(5),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={MonthImages.Balloons}
                    style={{height: 40, width: 40, marginRight: 24}}
                  />
                  <Text style={styles.happyText}>Happy </Text>
                  <Text style={styles.wishText}>Birthday</Text>
                </View>

                <Pressable
                  style={styles.container}
                  key={index}
                  onPress={() => {
                    setModalData({
                      startsOn: item.startsOn,
                      dateOfJoining: item.dateOfJoining,
                      name: item.employeeName,
                      description: item.description,
                      isBirthday: item.isBirthday,

                      setShowModal: setShowModal,
                    });
                    setShowModal(true);
                  }}>
                  <Image source={defaultUserIcon} style={styles.image} />
                  <Text style={styles.birthdayBoyOrGirl}>
                    {item.employeeName}
                  </Text>
                  <Text style={styles.designation}>{item?.designation}</Text>
                </Pressable>
                <View style={styles.eventDate}>
                  {item.isBirthday ? (
                    <HappyBirthday height={16} width={16} marginRight={10} />
                  ) : (
                    <BriefCase height={16} width={16} marginRight={10} />
                  )}
                  <Text style={styles.eventDateText}>
                    {item?.isBirthday
                      ? moment(item?.dateOfBirth).format('DD MMM')
                      : moment(item?.dateOfJoining).format('DD MMM')}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      ) : null} */}
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

{
  /* <ImageBackground
                source={
                  !item.isBirthday
                    ? MonthImages.workAnniversaryy
                    : MonthImages.BirthdayImage
                }
                resizeMode="stretch"
                imageStyle={{
                  borderRadius: 15,
                }}
                style={styles.backgroundImage}> */
}
{
  /* <View style={styles.textView}>
                <Text
                  numberOfLines={2}
                  style={{color: Colors.white, textAlign: 'center'}}>
                  {!item.isBirthday
                    ? `Happy Work Aniversary ${item.employeeName} on ${moment(
                        item.dateOfJoining,
                      ).format('DD MMM ')}`
                    : `Happy Birthday ${item.employeeName} on ${moment(
                        item.startsOn,
                      ).format('DD MMM ')}`}
                </Text>
              </View> */
}
{
  /* </ImageBackground> */
}
{
  /* <View
                style={{
                  borderWidth: 5,
                  borderColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}> */
}
