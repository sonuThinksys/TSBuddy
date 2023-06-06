import {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './AutoscrollStyle';

import BirthdayAnniV from 'modals/BirthdayAnniV';
import {Colors} from 'colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import {widthPercentageToDP as wp} from 'utils/Responsive';

const CarouselAutoScroll = ({navigation}) => {
  const dispatch = useDispatch();
  const [CalaenderEventData, setCalenderEventData] = useState([]);

  const {calendereventData: calenderData} = useSelector(state => state.home);
  const birthdays = calenderData?.calenderEvent;
  const anniversaries = calenderData?.anniversaryEvent;
  const keyOfObject = Object.keys(calenderData);

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

    keyOfObject.map(el => {
      calenderData[el].map(element => {
        arr.push(element);
      });
    });

    setCalenderEventData(events);
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
      imageRef?.current?.scrollToIndex({index: active, animated: true});
    }
  }, [active]);

  // if (CalaenderEventData?.length === 0) {
  //   return (
  //     <View>
  //       <Text>No Events found in this Month.</Text>
  //     </View>
  //   );
  // }

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
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        ref={imageRef}
        pagingEnabled
        data={CalaenderEventData}
        horizontal
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => (
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

            <TouchableOpacity
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
              <Text style={styles.birthdayBoyOrGirl}>{item.employeeName}</Text>
              <Text style={styles.designation}>Head of Department</Text>
            </TouchableOpacity>
            <View style={styles.eventDate}>
              <Text style={styles.eventDateText}>
                {item?.isBirthday
                  ? moment(item.dateOfBirth).format('DD MMM')
                  : moment(item.dateOfJoining).format('DD MMM')}
              </Text>
            </View>
          </View>
        )}
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
