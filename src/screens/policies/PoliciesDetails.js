import CustomHeader from 'navigation/CustomHeader';
import {Dimensions, Text, useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import {ScrollView} from 'react-native-gesture-handler';

const PoliciesDetails = ({navigation, route}) => {
  const policy = route.params;

  const source = {
    html: policy,
  };
  const {width} = useWindowDimensions();
  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Policy Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <ScrollView>
        <RenderHtml
          source={source}
          contentWidth={width}
          baseStyle={{margin: 20, color: 'black'}}
          ignoredDomTags={['o:p']}
        />
      </ScrollView>
    </>
  );
};

export default PoliciesDetails;
