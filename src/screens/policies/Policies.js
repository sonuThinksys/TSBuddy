import CustomHeader from 'navigation/CustomHeader';
const {Text, FlatList, View} = require('react-native');
import styles from './PoliciesStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPolicies} from 'redux/homeSlice';
import {useIsFocused} from '@react-navigation/native';
import {ERROR} from 'utils/string';
import ShowAlert from 'customComponents/CustomError';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Loader from 'component/LoadingScreen/LoadingScreen';

const Policies = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [policiesData, setPoliciesData] = useState([]);
  const isFocussed = useIsFocused();

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        setLoading(true);
        const policies = await dispatch(
          getPolicies({
            token,
          }),
        );

        setPoliciesData(policies.payload);

        setLoading(false);

        if (policies?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: policies?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();
    }
  }, [isFocussed]);

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{marginTop: 10}}
        onPress={() => {
          navigation.navigate('policiesDetails', item.policy);
          // navigation.navigate('practice');
        }}>
        <View style={styles.request}>
          <View style={styles.appliedRequestsLeft}>
            <View
              style={{
                alignItems: 'center',
                marginRight: wp(4),
                backgroundColor: '#68C19E',
                paddingLeft: 10,
                paddingRight: 10,
                paddingVertical: 5,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FontFamily.RobotoLight,
                  color: Colors.white,
                }}>
                {item.policyId}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FontFamily.RobotoRegular,
                  color: Colors.dune,
                }}>
                {item.policyName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Policies"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={policiesData}
          keyExtractor={key => key.policyId}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default Policies;
