import React from 'react';
import {Pressable, View, Text} from 'react-native';
import styles from './LeavesListItemStyles';

const LeavesListItem = ({item, onClickItemHandler}) => {
  return (
    <Pressable
      style={styles.flateListView}
      onPress={() => onClickItemHandler(item)}>
      <View
        style={[
          styles.leftStatus,
          item.status === 'Rejected' || item.status === 'Dismissed'
            ? styles.backgroundGrey
            : item.status === 'Open'
            ? styles.backgroundPink
            : styles.backgroundGreen,
        ]}>
        <Text style={styles.leaveType}>
          {item.totalLeaveDays}{' '}
          {item.leaveType
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')}
        </Text>
        <Text style={styles.textAlignCenter}>({item.status})</Text>
      </View>
      <View style={styles.secondView}>
        <Text style={styles.leaveAppIdText}>{item.leaveApplicationId}</Text>
        <Text style={styles.lessOpacity}>
          {`${new Date(item.fromDate).getDate()} ${new Date(
            item.fromDate,
          ).toLocaleString('default', {month: 'short'})} ${new Date(
            item.fromDate,
          ).getFullYear()}`}
          {' - '}
          {`${new Date(item.toDate).getDate()} ${new Date(
            item.toDate,
          ).toLocaleString('default', {month: 'short'})} ${new Date(
            item.toDate,
          ).getFullYear()}`}
        </Text>
        <Text style={styles.lessOpacity}>{item.currentStatus}</Text>
      </View>
    </Pressable>
  );
};

export default LeavesListItem;
