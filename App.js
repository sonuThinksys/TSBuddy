import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import {Colors} from 'colors/Colors';
import reactotron from 'reactotron-react-native';
import NetInfo from '@react-native-community/netinfo';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {FontFamily} from 'constants/fonts';
import Loader from 'component/loader/Loader';

const checkInternetConnection = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
};

const App = () => {
  if (__DEV__) {
    const yeOldeConsoleLog = console.log;
    console.log = (...args) => {
      yeOldeConsoleLog(...args);
      reactotron.display({
        name: 'CONSOLE.LOG',
        value: args,
        preview:
          args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
      });
    };
  }

  const [isInternedConnected, setIsInternedConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const isConnected = await checkInternetConnection();
      setIsLoading(false);
      setIsInternedConnected(isConnected);
    })();
  }, []);

  if (isLoading) return <Loader />;

  if (!isInternedConnected) {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'orange',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={MonthImages.NotFound}
          style={{height: 120, width: 160}}
        />
        <Text style={{fontSize: 16, fontFamily: FontFamily.RobotoBold}}>
          Please turn on your Internet connection.
        </Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: Colors.whitishBlue}} />
      <MainNavigator />
    </>
  );
};

export default App;
