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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import BirthdayAnniV from 'modals/BirthdayAnniV';
const width = Dimensions.get('screen').width;

const CarouselAutoScroll = () => {
  const imageArr = [
    {
      image: MonthImages.workAnniversaryy,
      id: '1',
      text: 'Happy workAnniversary',
    },
    {
      image: MonthImages.BirthdayImage,
      id: '2',
      text: 'Happy Birthday',
    },
    {
      image: MonthImages.BirthdayImage,
      id: '3',
      text: 'Happy Birthday',
    },
    {
      image: MonthImages.workAnniversaryy,
      id: '4',
      text: 'Happy Birthday',
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const imageRef = useRef();
  const [active, setActive] = useState(0);
  const indexRef = useRef(active);
  indexRef.current = active;
  // console.log('showModal:--------------------', showModal);
  useInterval(() => {
    if (active < Number(imageArr?.length) - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  }, 5000);

  useEffect(() => {
    imageRef.current.scrollToIndex({index: active, animated: true});
  }, [active]);

  const onViewableItemsChangedHandler = useCallback(
    ({viewableItems, changed}) => {
      if (active != 0) {
        setActive(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      {showModal ? <BirthdayAnniV modalData={modalData} /> : null}
      <FlatList
        showsHorizontalScrollIndicator={false}
        // onViewableItemsChanged={onViewableItemsChangedHandler}
        // viewabilityConfig={{
        //   itemVisiblePercentThreshold: 50,
        // }}
        ref={imageRef}
        pagingEnabled
        data={imageArr}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalData({
                  id: item.id,
                  text: item.text,
                  showModal: showModal,
                  setShowModal: setShowModal,
                });
                setShowModal(true);
              }}>
              <ImageBackground
                source={item.image}
                resizeMode="contain"
                style={styles.backgroundImage}>
                <View style={styles.backgroundImageView}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    {item.text}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
        style={{...StyleSheet.AbsoluteFill}}
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

const styles = StyleSheet.create({
  backgroundImage: {
    borderRadius: 10,
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    borderColor: 'gray',
    borderWidth: 1,
  },
  backgroundImageView: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    justifyContent: 'center',
    marginTop: hp(14),
    marginHorizontal: wp(20),
    borderRadius: 5,
  },
});
export default CarouselAutoScroll;
