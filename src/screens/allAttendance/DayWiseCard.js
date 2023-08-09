import {Image, Text, View} from 'react-native';
import styles from './DayWiseStyles';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';

const DayWiseCard = ({item}) => {
  let {
    employeeName,
    image,
    employeeId,
    isRegularized,
    status,
    inTime,
    outTime,
  } = item;

  const firstName = item?.firstName;
  const middleName = item?.middleName;
  const lastName = item?.lastName;
  const userName = `${firstName ? firstName : ''} ${
    middleName ? middleName : ''
  } ${lastName ? lastName : ''}`;

  const inHours =
    new Date(inTime).getHours() > 9
      ? new Date(inTime).getHours()
      : '0' + new Date(inTime).getHours();
  const inMinutes =
    new Date(inTime).getMinutes() > 9
      ? new Date(inTime).getMinutes()
      : '0' + new Date(inTime).getMinutes();
  const outHours =
    new Date(outTime).getHours() > 9
      ? new Date(outTime).getHours()
      : '0' + new Date(outTime).getHours();
  const outMinutes =
    new Date(outTime).getMinutes() > 9
      ? new Date(outTime).getMinutes()
      : '0' + new Date(outTime).getMinutes();

  function getFirstLetters(inputString) {
    const wordsArray = inputString.split(' ');
    const firstLettersArray = wordsArray?.map(word =>
      word.charAt(0).toUpperCase(),
    );
    const outputString = firstLettersArray.join('');
    return outputString;
  }
  status = getFirstLetters(status);

  // employeeId:10727
  // employeeName:Kalpana Bisht
  // fromDate:2023-07-24T00:00:00
  // toDate:2023-07-26T00:00:00
  // leaveType:Work From Home
  // totalLeaveDays:3
  // status:Open
  // description:Testingg
  // leaveApprover:pant.amit@thinksys.com
  // leaveApproverName:Utkarsh Gupta

  return (
    <View style={styles.mainContainer}>
      <View style={styles.empDetailsContainer}>
        <View style={styles.empDetailsLeft}>
          <View style={styles.imageContainer}>
            {/* <Image source={{uri: image}} style={styles.image} /> */}
            {image ? (
              <Image
                resizeMode="stretch"
                // source={{uri: `${baseUrl}${image}`}}
                source={{uri: `data:image/jpeg;base64,${image}`}}
                style={styles.image}
              />
            ) : (
              <Image style={styles.image} source={MonthImages.ProfileIcon} />
            )}
          </View>
          <View style={styles.mainDetailsContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{userName}</Text>
            </View>
            <View style={styles.empIdRegularizeContainer}>
              <Text style={styles.employeeIdText}>#{employeeId}</Text>
              <Text style={styles.regularizedText}>regularized</Text>
              <Text style={styles.regularizeStatus}>
                {isRegularized ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.attendanceStatusContainer,
            {
              backgroundColor:
                status.toLowerCase() === 'p'
                  ? Colors.veryLightGreen
                  : status.toLowerCase() === 'a'
                  ? Colors.veryLightRed
                  : status.toLowerCase() === 'hd'
                  ? '#FFF0E2'
                  : status.toLowerCase() === 'rh'
                  ? Colors.lightGreen
                  : '#e9fac8',
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  status.toLowerCase() === 'p'
                    ? Colors.green
                    : status.toLowerCase() === 'a'
                    ? Colors.red
                    : status.toLowerCase() === 'hd'
                    ? Colors.brown
                    : status.toLowerCase() === 'rh'
                    ? Colors.green
                    : Colors.gold,
              },
            ]}>
            {status}
          </Text>
        </View>
      </View>
      <View style={styles.checkInOutContainer}>
        <View style={{width: '68%'}}>
          <Text style={styles.checkInOutText}>
            Check In :{' '}
            <Text style={styles.checkInOutTime}>
              {status.toLowerCase() === 'a' ? ' -' : `${inHours}:${inMinutes}`}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={styles.checkInOutText}>
            Check out :{' '}
            <Text style={styles.checkInOutTime}>
              {status.toLowerCase() === 'a'
                ? ' -'
                : `${outHours}:${outMinutes}`}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DayWiseCard;
