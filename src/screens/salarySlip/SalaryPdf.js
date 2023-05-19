import * as React from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import WebView from 'react-native-webview';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const SalaryPdf = ({navigation, route}) => {
  const [pdfPath, setPdfPath] = React.useState('');
  const element = route.params;
  let options = {
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid black;
          }
    
          th,
          td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid black;
            border-right: 1px solid black;
          }
    
          th {
            border-top: 1px solid black;
          }
    
          tr:last-child td {
            border-bottom: none;
          }
        </style>
      </head>
      <body>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            flex-direction: column;
            margin-top: 3%;
          ">
          <div style="justify-content: center">
            <img
              src="https://trms.thinksys.com/logo.png"
              style="width: 40%; margin-left: 30%" />
          </div>
          <div style="text-align: center; width: 65%">
            <h3 style="text-align: center; width: 100%">
              ThinkSys Software Pvt. Ltd. 7th Floor, Discovery Tower A-17 Block A,
              Sector 62, Noida, UP 201309
            </h3>
          </div>
          <div style="text-align: end; width: 90%; line-height: 0.3cm">
            <p>Salary Slip</p>
            <p>${element.employeeName}</p>
          </div>
          <div style="justify-content: flex-start; width: 90%; line-height: 0.3cm">
            <p>Employee Name : ${element.employeeName}</p>
            <p>Employee ID : ${element.employeeId}</p>
            <p>Designation : ${element.designation}</p>
            <p>Month & Year : January, 2023</p>
            <p>Fiscal Year : ${element.fiscalYear}</p>
            <p>Payment Days : ${element.paymentDays}</p>
            <p>Leave Without Pay : </p>
            <p>Bank Name : ${element.bankName}</p>
            <p>Pan No : ${element.panNumber}</p>
          </div>
          <div style="width: 90%">
            <table>
              <tr>
                <th>Earnings</th>
                <th>Amount</th>
                <th>Deduction</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>Basic</td>
                <td>${element.salarySlipEarningDTOs[0].eAmount}</td>
                <td>Employee PF</td>
                <td>${element.salarySlipDeductionDTOs[0].dAmount}</td>
              </tr>
              <tr>
                <td>House Rent Allowance</td>
                <td>${element.salarySlipEarningDTOs[1].eAmount}</td>
                <td>Meal Charges</td>
                <td>4000.00</td>
              </tr>
              <tr>
                <td>Parking Reimbursement</td>
                <td>${element.salarySlipEarningDTOs[2].eAmount}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Spacial Allowance</td>
                <td>${element.salarySlipEarningDTOs[3].eAmount}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Standard Deduction</td>
                <td>${element.salarySlipEarningDTOs[4].eAmount}</td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <div style="text-align: end; width: 90%; line-height: 0.2cm">
            <p>Gross Pay ${element.grossPay}</p>
            <p>Total Deduction : ${element.totalDeduction}</p>
            <p>Net Pay ${element.netPay}</p>
            <p>Rounded Total ${element.roundedTotal}</p>
          </div>
          <div>
            <p>Net Payable Amount : Ruppes ${element.totalInWords} only</p>
          </div>
        </div>
      </body>
    </html>
    `,
    fileName: `${element.employeeName}.pdf`,
    directory: 'Downloads',
  };

  const openPDFPreview = async () => {
    let file = await RNHTMLtoPDF.convert(options);
    setPdfPath(file.filePath);
    console.log(`file:/${file.filePath}`);
  };

  React.useEffect(() => {
    openPDFPreview();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log('File: ' + pdfPath);
            requestStoragePermission();
          }}>
          <View>
            <Image style={styles.downloadBTN} source={MonthImages.download} />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <WebView source={options} style={styles.pdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginTop: 30,
  },
  downloadBTN: {
    width: wp(10),
    height: hp(5),
  },
});

export default SalaryPdf;
