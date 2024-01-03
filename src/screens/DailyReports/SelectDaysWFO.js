import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

const SelectDaysWFO = ({isPaddingHorizontal}) => {
  const [daysStatus, setDaysStatus] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  return (
    <View style={[styles.selectDaysMainContainer, isPaddingHorizontal]}>
      <Text style={styles.selectDaysTitle}>Select Days:</Text>
      <View style={styles.allDaysContainer}>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Monday</Text>
          <Switch
            value={daysStatus.monday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                monday: newValue,
              }))
            }
          />
        </View>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Tuesday</Text>
          <Switch
            value={daysStatus.tuesday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                tuesday: newValue,
              }))
            }
          />
        </View>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Wednesday</Text>
          <Switch
            value={daysStatus.wednesday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                wednesday: newValue,
              }))
            }
          />
        </View>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Thursday</Text>
          <Switch
            value={daysStatus.thursday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                thursday: newValue,
              }))
            }
          />
        </View>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Friday</Text>
          <Switch
            value={daysStatus.friday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                friday: newValue,
              }))
            }
          />
        </View>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Saturday</Text>
          <Switch
            value={daysStatus.saturday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                saturday: newValue,
              }))
            }
          />
        </View>
        <View style={styles.specificDayContainer}>
          <Text style={styles.allDayText}>Sunday</Text>
          <Switch
            value={daysStatus.sunday}
            onValueChange={newValue =>
              setDaysStatus(currentDaysStatus => ({
                ...currentDaysStatus,
                sunday: newValue,
              }))
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SelectDaysWFO;

const styles = StyleSheet.create({
  selectDaysMainContainer: {
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  selectDaysTitle: {
    fontSize: FontSize.h15,
    fontFamily: FontFamily.RobotoMedium,
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  allDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  specificDayContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allDayText: {
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
    fontSize: FontSize.h16,
  },
});
