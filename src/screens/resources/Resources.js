import React, {useEffect, useState} from 'react';
import ResourcesList from 'reusableComponents/ResourcesList';
import {ResourcesDetailsScreen} from 'navigation/Route';
import CustomHeader from 'navigation/CustomHeader';
import {StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeesAtManagerEnd} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';

const Resources = ({navigation}) => {
  const {userToken: token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [resourcesEmployeeData, setResourcesEmployeeData] = useState([]);
  const [searchedEmployees, setSearchedEmployees] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const nav = useNavigation();

  const onSearchEmployee = text => {
    const filteredEmployees = resourcesEmployeeData.filter(
      employee =>
        employee.firstName?.includes(text) ||
        employee.middleName?.includes(text) ||
        employee.lastName?.includes(text),
    );

    setSearchedText(text);
    console.log('text:', text, filteredEmployees, resourcesEmployeeData);

    setSearchedEmployees(filteredEmployees);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const employeeData = await dispatch(getEmployeesAtManagerEnd(token));
        setResourcesEmployeeData(employeeData?.payload);
        if (employeeData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: employeeData?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, nav, token]);

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="My Team"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <TextInput
        placeholder="Search Employee..."
        style={styles.textInput}
        onChangeText={onSearchEmployee}
      />
      <ResourcesList
        isLoading={isLoading}
        navigateToScreen={ResourcesDetailsScreen}
        resourcesEmployeeData={
          searchedText ? searchedEmployees : resourcesEmployeeData
        }
      />
    </>
  );
};

export default Resources;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 20,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: FontFamily.RobotoRegular,
  },
});

// currentLeaveApplied:26.75
// totalLeavesAllocated:36.75
// currentLeaveBalance:10
// leaveType:Earned Leave
// status:null

// leaveType:Earned Leave
// allocated:36.75
// taken:26.75
// remaining:10
