import React from 'react';
import {TextInput, View} from 'react-native';
import SearchIconSVG from 'assets/newDashboardIcons/search.svg';
import {Colors} from 'colors/Colors';

const Search = ({styles}) => {
  return (
    <View style={[styles?.searchContainer, styles.customSearchContainer]}>
      <View style={styles?.textInputContainer}>
        <TextInput placeholder="Search" style={styles?.textInput} />
        <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
      </View>
    </View>
  );
};

export default Search;
