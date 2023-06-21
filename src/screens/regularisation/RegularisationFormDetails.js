import {View, Text} from 'react-native';
import styles from '../leaves/LeavesDetailsStyles';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeeRegularizationRequest} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import ResourceProfileDetails from 'reusableComponents/ResourceProfileDetails';
import RegularisationList from 'reusableComponents/RegularisationList';
import CustomHeader from 'navigation/CustomHeader';

const RegularisationFormDetails = ({navigation, route}) => {
  const {
    designation,
    image,
    employeeName,
    managerInfoDto,
    name,
    cellNumber,
    companyEmail,
  } = route.params;
  const empId = name.split('/')[1];

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Regularizations"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <ResourceProfileDetails
        empDetails={{
          employeeName,
          image,
          companyEmail,
          cellNumber,
          designation,
          managerInfoDto,
        }}
      />
      <RegularisationList
        employeeID={empId}
        navigateTo={'regularisationTabDetailsScreen'}
        employeeName={employeeName}
      />
    </>
  );
};

export default RegularisationFormDetails;
