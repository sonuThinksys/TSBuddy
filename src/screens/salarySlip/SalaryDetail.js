import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/Responsive';
import moment from 'moment';
import {deductionData, earnindData} from 'utils/DummyData';
const SalaryDetail = ({route, navigation}) => {
  const data = route.params;
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);
  const renderData = [
    {lable: 'Arrear Amount', value: data.arrear_amount},
    {lable: 'Bank Account No', value: data.bank_account_no},
    {lable: 'Bank Name', value: data.bank_name},
    {lable: 'Creation', value: moment(data.creation).format(`DD-MMM-YYYY`)},
    {lable: 'Employee ID', value: data.employee},
    {lable: 'Employee Name', value: data.employee_name},
    {lable: 'Fiscal Year', value: data.fiscal_year},
    {lable: 'Gross Pay', value: data.gross_pay},
    {lable: 'Leave Encashment Amount', value: data.leave_encashment_amount},
    {lable: 'Month', value: data.month},
    {lable: 'Net Pay', value: data.net_pay},
    {lable: 'Pan Number', value: data.pan_number},
    {lable: 'Payment Days', value: data.payment_days},
    {lable: 'Rounded Total', value: data.rounded_total},
    {lable: 'Total Days', value: data.total_days_in_month},
    {lable: 'Total Deduction', value: data.total_deduction},
  ];

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.darkBlue,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: wp(2),
          paddingVertical: hp(1.5),
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            // justifyContent: 'center',
            paddingTop: hp(0.5),
          }}>
          <Text
            style={{
              color: Colors.white,
              marginRight: wp(2),
              fontSize: 18,
              fontWeight: '500',
            }}>
            Salary Detail
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 150,
          backgroundColor: Colors.lightBlue,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(3),
        }}>
        <Image
          source={data.monthImage}
          style={{height: 80, width: 120, marginRight: wp(4)}}
        />
        <Text
          style={{
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: 18,
            marginRight: wp(3),
          }}>
          {data.month} {data.year}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // setSalaryDetailsData(elemnt);
            navigation.navigate('SalaryPdf', data);
          }}>
          <Image
            source={MonthImages.download}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: wp(1)}}>
          {renderData.map((element, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  // justifyContent: 'space-between',
                  paddingVertical: hp(0.5),
                  paddingHorizontal: wp(4),
                }}>
                <Text style={{flex: 0.6}}>{element.lable}</Text>
                <Text style={{color: Colors.grey, flex: 0.4}}>
                  {element.value}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              setShow(show ? false : true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: hp(1),
                backgroundColor: Colors.lightBlue,
                borderRadius: 5,
                alignItems: 'center',
                paddingHorizontal: wp(3),
                justifyContent: 'space-between',
                marginVertical: hp(1),
              }}>
              <Text
                style={{color: Colors.white, fontWeight: 'bold', fontSize: 16}}>
                Earnings
              </Text>
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderColor: Colors.white,
                  borderRadius: 20,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={show ? MonthImages.plus : MonthImages.minus}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>
          {show ? (
            <View>
              {earnindData.map((elemnt, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: hp(0.5),
                      paddingHorizontal: wp(4),
                    }}>
                    <Text>{elemnt.lable}</Text>
                    <Text style={{color: Colors.grey}}>{elemnt.value}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setSecondShow(secondShow ? false : true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: hp(1),
                backgroundColor: Colors.lightBlue,
                borderRadius: 5,
                alignItems: 'center',
                paddingHorizontal: wp(3),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{color: Colors.white, fontWeight: 'bold', fontSize: 16}}>
                Deductions
              </Text>
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderColor: Colors.white,
                  borderRadius: 20,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={secondShow ? MonthImages.plus : MonthImages.minus}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>
          {secondShow ? (
            <View>
              {deductionData.map((elemnt, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: hp(0.5),
                      paddingHorizontal: wp(4),
                    }}>
                    <Text>{elemnt.lable}</Text>
                    <Text style={{color: Colors.grey}}>{elemnt.value}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
});

export default SalaryDetail;
