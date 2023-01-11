import {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
const width = Dimensions.get('screen').width;

const CarouselAutoScroll = ({data}) => {
  console.log('data:----------', data);
  const imageRef = useRef();
  const [active, setActive] = useState(0);
  const indexRef = useRef(active);
  indexRef.current = active;

  useInterval(() => {
    if (active < Number(data?.length) - 1) {
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
    <FlatList
      showsHorizontalScrollIndicator={false}
      // onViewableItemsChanged={onViewableItemsChangedHandler}
      // viewabilityConfig={{
      //   itemVisiblePercentThreshold: 50,
      // }}
      ref={imageRef}
      pagingEnabled
      data={data}
      horizontal
      renderItem={({item, index}) => (
        <ImageBackground
          source={item}
          resizeMode="contain"
          style={{
            //height: hp(20),
            // width: wp(75),
            borderRadius: 10,
            marginVertical: hp(1),
            marginHorizontal: wp(4),
            borderColor: 'gray',
            borderWidth: 1,
          }}>
          <View
            style={{
              // height: hp(4),
              //  width: wp(40),
              paddingHorizontal: wp(3),
              paddingVertical: hp(1),
              backgroundColor: 'rgba(51, 51, 51, 0.8)',
              justifyContent: 'center',
              marginTop: hp(14),
              marginHorizontal: wp(20),
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              hello thinksys
            </Text>
          </View>
        </ImageBackground>
      )}
      style={{...StyleSheet.AbsoluteFill}}
    />
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
