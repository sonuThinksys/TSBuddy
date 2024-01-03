import {useCallback, useEffect, useRef, useState} from 'react';
import React from 'react';
import {FlatList, View, Text, Image, Pressable} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './AutoscrollStyle';

import BirthdayAnniV from 'modals/BirthdayAnniV';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import BriefCase from 'assets/newDashboardIcons/briefcase.svg';
import HappyBirthday from 'assets/newDashboardIcons/cake-candles.svg';
import {getCalendereventData} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import Loader from 'component/loader/Loader';

const CarouselAutoScroll = ({navigation}) => {
  const dispatch = useDispatch();
  const [calenderEventData, setCalenderEventData] = useState([]);
  const {userToken: token, refreshToken} = useSelector(state => state.auth);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const {calendereventData: calenderData} = useSelector(state => state.home);

  const birthdays = calenderData?.calenderEvent;
  const anniversaries = calenderData?.anniversaryEvent;

  const keyOfObject = useCallback(
    () => Object?.keys(calenderData),
    [calenderData],
  );

  useEffect(() => {
    // if (isFocussed) {
    (async () => {
      try {
        setLoadingEvents(true);
        const events = await dispatch(
          getCalendereventData({token, dispatch, refreshToken}),
        );
        if (events?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: events?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
      } catch (err) {
        console.log('errorEvents:', err);
      } finally {
        setLoadingEvents(false);
      }
    })();
    // }
  }, [token, refreshToken, dispatch, navigation]);

  useEffect(() => {
    let arr = [];
    const events = [];

    birthdays?.forEach(birthday => {
      const isBirthdayTodayOrFuture =
        new Date(birthday.dateOfBirth).getDate() >= new Date().getDate();
      if (isBirthdayTodayOrFuture) {
        const newBirthday = {...birthday};
        newBirthday.isBirthday = true;
        events.push(newBirthday);
      }
    });

    anniversaries?.forEach(anniversary => {
      const newAnniversary = {...anniversary};
      newAnniversary.isBirthday = false;
      events.push(newAnniversary);
    });

    keyOfObject()?.map(el => {
      calenderData[el]?.map(element => {
        arr.push(element);
      });
    });

    setCalenderEventData(events);
  }, [calenderData, anniversaries, birthdays, keyOfObject]);

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
  }, [active, calenderEventData]);

  const handleScrollBeginDrag = () => {
    setScrolled({scrollStart: true, scrollStop: false});
  };

  const handleScrollEndDrag = () => {
    setScrolled({scrollStart: false, scrollStop: true});
  };

  return (
    <View style={styles.mainContainer}>
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
                <View style={styles.eventContainerHeader}>
                  {item.isBirthday ? (
                    <>
                      <Image
                        source={MonthImages.Balloons}
                        style={styles.eventImage}
                      />
                      <Text style={styles.happyText}>Happy </Text>
                      <Text style={styles.wishText}>Birthday</Text>
                    </>
                  ) : (
                    <>
                      <Image
                        source={MonthImages.AnniversaryIcon}
                        style={styles.eventImage}
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
        <View style={styles.noEventTextCont}>
          <Text style={styles.noEventText}>
            No Events found for this Month.
          </Text>
        </View>
      )}
      {loadingEvents ? <Loader /> : null}
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
