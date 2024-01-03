import React, {useState} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {getWorkModeByEmployeeId} from 'redux/homeSlice';
import SelectDaysWFO from './SelectDaysWFO';
import Buttons from './Buttons';

const WorkModeEmployeeCard = ({
  employeeName,
  rmName,
  employeeId,
  department,
  from,
  to,
  mode,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}) => {
  const {userToken: token} = useSelector(state => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [expandedData, setExpandedData] = useState([]);
  const [isExpandedLoading, setIsExpandedLoading] = useState(false);
  const dispatch = useDispatch();

  const onExpandHandler = async () => {
    setIsExpanded(isPrevExpanded => !isPrevExpanded);
    if (!isExpanded) {
      try {
        setIsExpandedLoading(true);
        const {payload: expanded} = await dispatch(
          getWorkModeByEmployeeId({employeeId, token}),
        );

        const finalExpandedData = expanded.map((data, index) => {
          const fromDateObj = new Date(data.fromDate);
          const toDateObj = new Date(data.toDate);

          const fromDay = fromDateObj.getDate();
          const fromMonth = fromDateObj.toLocaleDateString('en-US', {
            month: 'short',
          });
          const fromYear = fromDateObj.getFullYear();

          const toDay = toDateObj.getDate();
          const toMonth = toDateObj.toLocaleDateString('en-US', {
            month: 'short',
          });
          const toYear = toDateObj.getFullYear();

          const empMode = data.workMode;
          const id = index;

          const presentDate = new Date();
          let isChangePossible = false;
          if (toDateObj > presentDate) {
            isChangePossible = true;
          }

          return {
            fromDate: `${fromMonth} ${fromDay}, ${fromYear}`,
            toDate: `${toMonth} ${toDay}, ${toYear}`,
            mode: empMode,
            id,
            isChangePossible,
          };
        });

        setExpandedData(finalExpandedData);
      } catch (err) {
      } finally {
        setIsExpandedLoading(false);
      }
    }
  };

  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isWFO, setIsWFO] = useState(true);

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

      {isExpandedLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator />
        </View>
      ) : expandedData.length > 0 ? (
        expandedData.map(el => {
          return (
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
                  el.isChangePossible && styles.justifyContentSpaceBetween,
                ]}>
                <Pressable onPress={onInfoIconClickHandler}>
                  <Image
                    source={MonthImages.info_scopy}
                    style={styles.infoIcon}
                  />
                </Pressable>
                {el.isChangePossible && (
                  <Pressable onPress={onHouseIconClickHandler}>
                    <HouseIcon
                      height={19}
                      width={19}
                      fill={Colors.lovelyPurple}
                    />
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
                    <Text style={[styles.modalHeaderNameText]}>
                      Work Mode -{' '}
                    </Text>
                    <Text
                      style={[
                        styles.modalHeaderNameText,
                        styles.textUnderline,
                      ]}>
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
                      <Text style={styles.checkBoxModeText}>
                        Work From Home
                      </Text>
                      <Pressable onPress={() => setIsWFO(false)}>
                        <Radio isActive={!isWFO} />
                      </Pressable>
                    </View>
                    <View style={styles.mode}>
                      <Text style={styles.checkBoxModeText}>
                        Work From Office
                      </Text>
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
                  {isWFO ? <SelectDaysWFO /> : null}
                  <Buttons modalCloseHandler={modalCloseHandler} />
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
                      onCancel={hideDatePicker.bind(
                        null,
                        setEndDatePickerVisible,
                      )}
                    />
                  </View>
                </View>
              </Modal>
            </View>
          );
        })
      ) : (
        <Text style={styles.noExpandedDataText}>No Data Found.</Text>
      )}
    </View>
  );

  const officeIndicator = day => (
    <View style={[styles.dayContainer, styles.greenBackground]}>
      <Text style={[styles.dayText, styles.greenColor]}>{day}</Text>
    </View>
  );

  const homeIndicator = day => (
    <View style={[styles.dayContainer, styles.purpleBackground]}>
      <Text style={[styles.dayText, styles.purpleColor]}>{day}</Text>
    </View>
  );

  const weekOffIndicator = day => (
    <View style={[styles.dayContainer, styles.greyBackground]}>
      <Text style={[styles.dayText, styles.greyColor]}>{day}</Text>
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
            {monday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('M')
              : monday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('M')
              : weekOffIndicator('M')}

            {tuesday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('T')
              : tuesday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('T')
              : weekOffIndicator('T')}

            {wednesday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('W')
              : wednesday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('W')
              : weekOffIndicator('W')}

            {thursday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('T')
              : thursday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('T')
              : weekOffIndicator('T')}

            {friday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('F')
              : friday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('F')
              : weekOffIndicator('F')}

            {saturday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('S')
              : saturday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('S')
              : weekOffIndicator('S')}

            {sunday?.trim()?.toLowerCase() === 'home'
              ? homeIndicator('S')
              : sunday?.trim()?.toLowerCase() === 'office'
              ? officeIndicator('S')
              : weekOffIndicator('S')}
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
