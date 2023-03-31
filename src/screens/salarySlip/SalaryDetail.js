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
import styles from './SalaryDetailsStyles';
import moment from 'moment';
import {deductionData, earnindData} from 'utils/DummyData';
import {SalaryPDFDownloadScreen} from 'navigation/Route';
const SalaryDetail = ({route, navigation}) => {
  const data = route.params;
  console.log('data in salary details:-----------------------------', data);
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);
  const renderData = [
    {lable: 'Arrear Amount', value: data.arrearAmount},
    {lable: 'Bank Account No', value: data.bankAccountNo},
    {lable: 'Bank Name', value: data.bankName},
    {lable: 'Creation', value: moment(data.creation).format(`DD-MMM-YYYY`)},
    {lable: 'Employee ID', value: data.employeeId},
    {lable: 'Employee Name', value: data.employeeName},
    {lable: 'Fiscal Year', value: data.fiscalYear},
    {lable: 'Gross Pay', value: data.grossPay},
    {lable: 'Leave Encashment Amount', value: data.leaveEncashmentAmount},
    {lable: 'Month', value: data.monthName},
    {lable: 'Net Pay', value: data.netPay},
    {lable: 'Pan Number', value: data.panNumber},
    {lable: 'Payment Days', value: data.paymentDays},
    {lable: 'Rounded Total', value: data.roundedTotal},
    {lable: 'Total Days', value: data.totalDaysInMonth},
    {lable: 'Total Deduction', value: data.totalDeduction},
  ];

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
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
        <View style={styles.textView}>
          <Text style={styles.text1}>Salary Detail</Text>
        </View>
      </View>
      <View style={styles.imageView}>
        <Image
          source={data.monthImage}
          style={{height: 80, width: 120, marginRight: wp(4)}}
        />
        <Text style={styles.monthText}>
          {data?.monthName} {data?.fiscalYear.substring(0, 4)}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // setSalaryDetailsData(elemnt);
            navigation.navigate(SalaryPDFDownloadScreen, data);
          }}>
          <Image
            source={MonthImages.download}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{flex: 1, marginBottom: hp(2)}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: wp(1)}}>
          {renderData.map((element, index) => {
            return (
              <View key={index} style={styles.labelView}>
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
            <View style={styles.earningView}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Earnings
              </Text>
              <View style={styles.minusImageView}>
                <Image
                  source={show ? MonthImages.plus : MonthImages.minus}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>
          {show ? (
            <View>
              {data.salarySlipEarningDTOs.map((elemnt, index) => {
                return (
                  <View key={index} style={styles.earningTextView}>
                    <Text style={{flex: 0.6}}>{elemnt.eType}</Text>
                    <Text style={{color: 'gray', flex: 0.4}}>
                      {elemnt.eAmount}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setSecondShow(secondShow ? false : true);
            }}>
            <View style={styles.deductionView}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Deductions
              </Text>
              <View style={styles.deductionImageView}>
                <Image
                  source={secondShow ? MonthImages.plus : MonthImages.minus}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>
          {secondShow ? (
            <View>
              {data.salarySlipDeductionDTOs.map((elemnt, index) => {
                return (
                  <View key={index} style={styles.deductionTextView}>
                    <Text style={{flex: 0.6}}>{elemnt.dType}</Text>
                    <Text style={{color: 'gray', flex: 0.4}}>
                      {elemnt.dAmount}
                    </Text>
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

export default SalaryDetail;
