import {View, Text} from 'react-native';
import styles from '../leaves/LeavesDetailsStyles';

const AttaindanceDetails = (route, navigation) => {
  const card = (leftText, rightText, index) => {
    return (
      <View key={index} style={styles.card}>
        <View>
          <Text style={styles.cardLeftText}>{leftText}</Text>
        </View>
        <View style={styles.cardRightTextContainer}>
          <Text>{rightText}</Text>
        </View>
      </View>
    );
  };

  const {params: data} = route.route;

  const details = [
    ['Employee Name', data?.employeeName || 'Employee Sharma'],
    ['In-Time', data?.intime || '11:11:11'],
    ['Out-Time', data?.outtime || '12:12:12'],
    ['Total Hour', data?.totalHrs || '10:10:10'],
    ['Effective Hour', data?.effectHrs || '10:10:10'],
    ['Fiscal Year', data.fiscalYear || 2000 - 2001],
    ['Status', data?.status || 'Not Present'],
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{data.attDate}</Text>
      </View>
      <View>{details.map((item, index) => card(item[0], item[1], index))}</View>
    </View>
  );
};

export default AttaindanceDetails;
