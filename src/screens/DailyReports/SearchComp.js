import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {TextInput, View} from 'react-native';
import SearchIconSVG from 'assets/newDashboardIcons/search.svg';
import {Colors} from 'colors/Colors';

const Search = forwardRef(({styles, searchEmployeesHandler}, ref) => {
  const [enteredValue, setEnteredValue] = useState('');
  const searchInputHandler = enteredText => {
    setEnteredValue(enteredText);
  };

  useEffect(() => {
    searchEmployeesHandler && searchEmployeesHandler(enteredValue);
  }, [enteredValue, searchEmployeesHandler]);

  useImperativeHandle(ref, () => ({
    resetEnteredValue() {
      setEnteredValue('');
    },
  }));

  return (
    <View style={[styles?.searchContainer, styles.customSearchContainer]}>
      <View style={styles?.textInputContainer}>
        <TextInput
          value={enteredValue}
          onChangeText={searchInputHandler}
          placeholder="Search"
          style={styles?.textInput}
        />
        <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
      </View>
    </View>
  );
});
export default Search;
