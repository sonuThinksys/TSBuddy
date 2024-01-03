import React, {useState} from 'react';
import {DECRYPT_KEY} from '@env';
import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import styles from './SalaryDetailsStyles';
import moment from 'moment';
import {SalaryPDFDownloadScreen} from 'navigation/Route';
import CustomHeader from 'navigation/CustomHeader';
import {monthImages} from 'defaultData';
import {decryptData} from 'utils/utils';

const generateAndDownloadPDF = async () => {
  const htmlContent =
    '<html><body><h1>Hello, this is your PDF content!</h1></body></html>';

  const options = {
    html: htmlContent,
    fileName: 'generated_pdf', // Change this to the desired filename
    directory: 'Documents', // Use 'Documents' as the directory
  };

  try {
    const pdf = await RNHTMLtoPDF.convert(options);
    console.log('PDF generated:', pdf.filePath, pdf);
    alert('PDF generated:', pdf.filePath);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

const SalaryDetail = ({route, navigation}) => {
  const data = route.params;
  console.log('data:.salarySlipEarningDTOs', data.salarySlipDeductionDTOs);
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);
  const employeeFullName = `${data.firstName} ${
    data.middleName ? data.middleName + ' ' : ''
  }${data.lastName ? data.lastName : ''}`;
  const renderData = [
    {
      lable: 'Arrear Amount',
      value: data.arrearAmount
        ? decryptData(data.arrearAmount, DECRYPT_KEY)
        : 'N/A',
    },
    {
      lable: 'Bank Account No',
      value: data.bankAcNo ? decryptData(data.bankAcNo, DECRYPT_KEY) : 'N/A',
    },
    // {lable: 'Bank Name', value: data.bankName},
    {lable: 'Creation', value: moment(data.creation).format('DD-MMM-YYYY')},
    {lable: 'Employee ID', value: data.employeeId},
    {lable: 'Employee Name', value: employeeFullName},
    {lable: 'Fiscal Year', value: data.fiscalYear},
    {
      lable: 'Gross Pay',
      value: data.grossPay ? decryptData(data.grossPay, DECRYPT_KEY) : 'N/A',
    },
    {
      lable: 'Leave Encashment Amount',
      value: data.leaveEncashmentAmount
        ? decryptData(data.leaveEncashmentAmount, DECRYPT_KEY)
        : 'N/A',
    },
    {lable: 'Month', value: monthImages[data.month].monthName},
    {
      lable: 'Net Pay',
      value: data.netPay ? decryptData(data.netPay, DECRYPT_KEY) : 'N/A',
    },
    {
      lable: 'Pan Number',
      value: data.panNumber ? decryptData(data.panNumber) : 'N/A',
    },
    {lable: 'Payment Days', value: data.paymentDays},
    {
      lable: 'Rounded Total',
      value: data.roundedTotal
        ? decryptData(data.roundedTotal, DECRYPT_KEY)
        : 'N/A',
    },
    {lable: 'Total Days', value: data.totalDaysInMonth},
    {
      lable: 'Total Deduction',
      value: data.totalDeduction
        ? decryptData(data.totalDeduction, DECRYPT_KEY)
        : 'N/A',
    },
  ];

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Salary Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <View style={styles.mainContainerExceptHeader}>
        <View style={styles.imageView}>
          <Image source={data.monthImage} style={styles.monthImage} />
          <Text style={styles.monthText}>
            {monthImages[data.month].monthName}{' '}
            {data?.fiscalYear?.substring(0, 4)}
          </Text>
          <TouchableOpacity
            // disabled={true} // As downloading funtionality is not working now... will enable later
            onPress={() => {
              // setSalaryDetailsData(elemnt);
              generateAndDownloadPDF();
              alert('Downloaded Successfully.');
              console.log('Downloaded Success:');
              return;
              // navigation.navigate(SalaryPDFDownloadScreen, data);
            }}>
            <Image source={MonthImages.download} style={styles.downloadIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.salaryDetails}
          contentContainerStyle={styles.salaryDetailsContainerStyle}>
          <View style={{paddingHorizontal: wp(1)}}>
            {renderData?.map((element, index) => {
              return (
                <View key={index} style={styles.labelView}>
                  <Text style={styles.fieldLabel}>{element.lable}</Text>
                  <Text style={styles.fieldValue}>{element.value}</Text>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                setShow(show ? false : true);
              }}>
              <View style={styles.earningView}>
                <Text style={styles.title}>Earnings</Text>
                <View style={styles.minusImageView}>
                  <Image
                    source={show ? MonthImages.minus : MonthImages.plus}
                    style={styles.plusIcon}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {show ? (
              <View>
                {data.salarySlipEarningDTOs.map((elemnt, index) => {
                  return (
                    <View key={index} style={styles.earningTextView}>
                      <Text style={styles.fieldLabel}>{elemnt.typeName}</Text>
                      <Text style={styles.fieldValue}>
                        {elemnt.modifiedAmount
                          ? decryptData(elemnt.modifiedAmount, DECRYPT_KEY)
                          : 'N/A'}
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
                <Text style={styles.salaryPart}>Deductions</Text>
                <View style={styles.deductionImageView}>
                  <Image
                    source={secondShow ? MonthImages.minus : MonthImages.plus}
                    style={styles.expandIcon}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {secondShow ? (
              <View>
                {data.salarySlipDeductionDTOs.map((elemnt, index) => {
                  return (
                    <View key={index} style={styles.deductionTextView}>
                      <Text style={styles.fieldLabel}>{elemnt.typeName}</Text>
                      <Text style={styles.fieldValue}>
                        {elemnt.modifiedAmount
                          ? decryptData(elemnt.modifiedAmount, DECRYPT_KEY)
                          : 'N/A'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SalaryDetail;
