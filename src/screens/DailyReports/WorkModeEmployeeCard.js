import React, {useState} from 'react';
import {Image, Pressable, Switch, Text, View} from 'react-native';
import styles from './EmployeeCardStyles';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import HouseIcon from 'assets/allImage/house/house-building.svg';
import Modal from 'react-native-modal';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import Radio from 'component/Radio/Radio';

const WorkModeEmployeeCard = ({
  employeeName,
  rmName,
  employeeId,
  department,
  from,
  to,
  mode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onExpandHandler = () => {
    setIsExpanded(isPrevExpanded => !isPrevExpanded);
  };
  const [daysStatus, setDaysStatus] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isWFO, setIsWFO] = useState(true);

  const DUMMY_EXPANDED_DATA = [
    {id: 1, fromDate: 'Aug 07, 2023', toDate: 'Sep 12, 2023', mode: 'Office'},
    {id: 2, fromDate: 'Jul 20, 2023', toDate: 'Aug 06, 2023', mode: 'Home'},
    {id: 3, fromDate: 'Jun 27, 2023', toDate: 'Jul 19, 2023', mode: 'Home'},
    {id: 4, fromDate: 'Mar 17, 2023', toDate: 'Jun 19, 2023', mode: 'Office'},
  ];

  const onInfoIconClickHandler = () => {};
  const onHouseIconClickHandler = () => {
    setOpenModal(prevModalStatus => !prevModalStatus);
  };

  const modalCloseHandler = () => {
    setOpenModal(false);
  };

  const handleStartConfirm = () => {
    setStartDatePickerVisible(false);
  };

  const handleEndConfirm = () => {
    setEndDatePickerVisible(false);
  };

  const hideDatePicker = pickerToClose => {
    pickerToClose(false);
  };

  const expandedContent = (
    <View style={styles.expandedMainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.expandedHeader}>
          <View style={styles.headerTableTitle}>
            <Text style={[styles.expandedHeaderText]}>From:</Text>
          </View>
          <View style={styles.headerTableTitle}>
            <Text style={[styles.expandedHeaderText]}>To:</Text>
          </View>
          <View style={styles.headerTableTitle}>
            <Text style={[styles.expandedHeaderText]}>Mode:</Text>
          </View>
        </View>
        <View style={styles.extraContainer} />
      </View>

      {DUMMY_EXPANDED_DATA.map(el => (
        <View style={styles.expandedRowContainer} key={el.id}>
          <View style={styles.expandedRowLeft}>
            <View style={styles.tableRowElementContainer}>
              <Text style={[styles.expendedRowText]}>{el.fromDate}</Text>
            </View>
            <View style={styles.tableRowElementContainer}>
              <Text style={[styles.expendedRowText]}>{el.toDate}</Text>
            </View>
            <View style={styles.tableRowElementContainer}>
              <Text style={[styles.expendedRowText]}>{el.mode}</Text>
            </View>
          </View>
          <View
            style={[
              styles.expandedRowIconsContainer,
              el.id === 1 && styles.justifyContentSpaceBetween,
            ]}>
            <Pressable onPress={onInfoIconClickHandler}>
              <Image source={MonthImages.info_scopy} style={styles.infoIcon} />
            </Pressable>
            {el.id === 1 && (
              <Pressable onPress={onHouseIconClickHandler}>
                <HouseIcon height={19} width={19} fill={Colors.lovelyPurple} />
              </Pressable>
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            closeOnClick={true}
            isVisible={openModal}
            onBackdropPress={modalCloseHandler}
            onBackButtonPress={modalCloseHandler}
            onRequestClose={modalCloseHandler}
            style={styles.modal}>
            <View style={styles.modalChildContainer}>
              <View style={styles.nameContainer}>
                <Text style={[styles.modalHeaderNameText]}>Work Mode - </Text>
                <Text
                  style={[styles.modalHeaderNameText, styles.textUnderline]}>
                  {employeeName}
                </Text>
              </View>
              <View style={styles.modeContainer}>
                <View>
                  <Text style={styles.modeText}>Current Mode:</Text>
                </View>
                <View style={styles.modeRightContainer}>
                  <MonthImages.BriefCaseIcon
                    style={styles.briefCaseIcon}
                    height={18}
                    width={18}
                  />
                  <Text style={styles.modeText}>{mode}</Text>
                </View>
              </View>
              <View style={styles.checkBoxesContainer}>
                <View style={styles.mode}>
                  <Text style={styles.checkBoxModeText}>Work From Home</Text>
                  <Pressable onPress={() => setIsWFO(false)}>
                    <Radio isActive={!isWFO} />
                  </Pressable>
                </View>
                <View style={styles.mode}>
                  <Text style={styles.checkBoxModeText}>Work From Office</Text>
                  <Pressable onPress={() => setIsWFO(true)}>
                    <Radio isActive={isWFO} />
                  </Pressable>
                </View>
              </View>
              <View style={styles.datesContainer}>
                <View style={styles.fromDateContainer}>
                  <Text style={styles.dateTitleText}>From Date :</Text>
                  <Pressable
                    onPress={() => {
                      setStartDatePickerVisible(true);
                    }}>
                    <View style={styles.fromDateSelect}>
                      <Text style={styles.fromDatePlaceholder}>Select</Text>
                      <CalenderIcon
                        fill={Colors.lightGray1}
                        height={hp(2)}
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                </View>

                <View style={styles.toDateMainContainer}>
                  <Text style={styles.toDateTitleText}>To Date :</Text>
                  <Pressable
                    onPress={() => {
                      setEndDatePickerVisible(true);
                    }}>
                    <View style={styles.toDateSelect}>
                      <Text style={styles.toDatePlaceholder}>Select</Text>
                      <CalenderIcon
                        fill={Colors.lightGray1}
                        height={hp(2)}
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={styles.selectDaysMainContainer}>
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
              <View style={styles.buttonsContainer}>
                <Pressable onPress={modalCloseHandler} style={[styles.button]}>
                  <Text style={[styles.buttonText, styles.buttonCancelText]}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable style={[styles.button, styles.saveButton]}>
                  <Text style={[styles.buttonText, styles.buttonSaveText]}>
                    Save
                  </Text>
                </Pressable>
              </View>
              <View>
                <DateTimePickerModal
                  isVisible={startDatePickerVisible}
                  mode="date"
                  onConfirm={handleStartConfirm}
                  onCancel={hideDatePicker.bind(
                    null,
                    setStartDatePickerVisible,
                  )}
                />
                <DateTimePickerModal
                  isVisible={endDatePickerVisible}
                  mode="date"
                  onConfirm={handleEndConfirm}
                  onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
                />
              </View>
            </View>
          </Modal>
        </View>
      ))}
    </View>
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profile}>
        <View style={styles.empDetailsMain}>
          <View style={styles.profileImageContainer}>
            <Image source={defaultUserIcon} style={styles.profileImage} />
          </View>
          <View style={styles.namesContainer}>
            <View>
              <Text style={[styles.employeeNameText, styles.darkDune]}>
                {employeeName}
              </Text>
            </View>
            <View>
              <Text style={[styles.RMNameText, styles.lightDune]}>
                RM: {rmName}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.employeeDepartmentMainContainer}>
          <View>
            <Text style={[styles.empIdText, styles.darkDune]}>
              #{employeeId}
            </Text>
          </View>
          <View style={styles.departmentContainer}>
            <MonthImages.GroupIconSVG
              height={20}
              width={20}
              color={Colors.lightGray1}
            />
            <Text style={[styles.lightDune]}>{department}</Text>
          </View>
        </View>
      </View>
      <View style={styles.checkInDetails}>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>From: </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>{from}</Text>
        </View>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>To: </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>{to}</Text>
        </View>
        <View style={[styles.checkInSubDetails]}>
          <Text style={[styles.checkInText, styles.darkDune]}>Mode: </Text>
          <Text style={[styles.checkIn, styles.lightDune]}>{mode}</Text>
        </View>
      </View>
      <View style={styles.allDays}>
        <View style={styles.allDaysLeft}>
          <View>
            <Text style={styles.workingText}>Working Days: </Text>
          </View>
          <View style={styles.daysContainer}>
            <View style={[styles.dayContainer, styles.greenBackground]}>
              <Text style={[styles.dayText, styles.greenColor]}>M</Text>
            </View>
            <View style={[styles.dayContainer, styles.purpleBackground]}>
              <Text style={[styles.dayText, styles.purpleColor]}>T</Text>
            </View>
            <View style={[styles.dayContainer, styles.purpleBackground]}>
              <Text style={[styles.dayText, styles.purpleColor]}>W</Text>
            </View>
            <View style={[styles.dayContainer, styles.purpleBackground]}>
              <Text style={[styles.dayText, styles.purpleColor]}>T</Text>
            </View>
            <View style={[styles.dayContainer, styles.greenBackground]}>
              <Text style={[styles.dayText, styles.greenColor]}>F</Text>
            </View>
            <View style={[styles.dayContainer, styles.greyBackground]}>
              <Text style={[styles.dayText, styles.greyColor]}>S</Text>
            </View>
            <View style={[styles.dayContainer, styles.greyBackground]}>
              <Text style={[styles.dayText, styles.greyColor]}>S</Text>
            </View>
          </View>
        </View>
        <Pressable onPress={onExpandHandler}>
          <MonthImages.DropDownIconSVG
            height={22}
            width={22}
            color={Colors.lightDune}
          />
        </Pressable>
      </View>
      {isExpanded && expandedContent}
    </View>
  );
};

export default WorkModeEmployeeCard;
