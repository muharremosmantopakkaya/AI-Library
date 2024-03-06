import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
export const colorBackground = '#ffffff';
export const colorText = '#000000';
export const colorHighlight = '#e5e5e5';
export const colorDanger = '#e91e63';
export const colorInfo = '#2196f3';
export const colorWarning = '#ffeb3b';
export const colorSuccess = '#4caf50';
export const colorDangerText = '#660000';
export const colorInfoText = '#0000cc';
export const colorWarningText = '#8e5500';
export const colorSuccessText = '#004c45';
export const backButtonWidth = 75;
export const openWidth = backButtonWidth * 2;
export const fontSize = 18;
export const padding = 18;
const App = () => {
  // eslint-disable-next-line prettier/prettier
  const [fruits] = useState([ 'Apple', 'Avocado', 'Banana', 'Blueberry', 'Coconut', 'Durian', 'Guava', 'Kiwifruit', 'Jackfruit', 'Mango', 'Olive', 'Pear', 'Sugar-apple', ]);
const handleDanger = (item: string) => {
    Alert.alert(`Danger ${item}`);
  };
  const handleInfo = (item: string) => {
    Alert.alert(`Info ${item}`);
  };
  const handleSuccess = (item: string) => {
    Alert.alert(`Success ${item}`);
  };
  const handleWarning = (item: string) => {
    Alert.alert(`Warning ${item}`);
  };
  return (
    <SafeAreaView>
      <SwipeListView
        data={fruits}
        renderItem={({item}) => (
          <TouchableHighlight
            style={styles.rowFront}
            underlayColor={colorHighlight}
            onPress={() => console.log(item)}>
            <Text style={styles.frontText}>{item}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item}
        renderHiddenItem={({item}) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backLeftBtn, styles.successBtn]}
              onPress={() => handleSuccess(item)}>
              <Text style={styles.backTextSuccess}>Suces</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backLeftBtn, styles.warningBtn]}
              onPress={() => handleWarning(item)}>
              <Text style={styles.backTextWarning}>Warn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.infoBtn]}
              onPress={() => handleInfo(item)}>
              <Text style={styles.backTextNeutral}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.dangerBtn]}
              onPress={() => handleDanger(item)}>
              <Text style={styles.backTextDanger}>Danger</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={openWidth}
        rightOpenValue={-openWidth}
        stopLeftSwipe={openWidth}
        stopRightSwipe={-openWidth}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  rowFront: {
    justifyContent: 'center',
    padding: padding,
    backgroundColor: colorBackground,
    borderBottomColor: colorHighlight,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  frontText: {
    color: colorText,
    fontSize: fontSize,
  },
  rowBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colorBackground,
    flexDirection: 'row',
    paddingHorizontal: padding,
  },
  backTextNeutral: {
    color: colorInfoText,
    fontSize: fontSize,
  },
  backTextDanger: {
    color: colorDangerText,
    fontSize: fontSize,
  },
  backTextWarning: {
    color: colorWarningText,
    fontSize: fontSize,
  },
  backTextSuccess: {
    color: colorSuccessText,
    fontSize: fontSize,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: backButtonWidth,
  },
  infoBtn: {
    backgroundColor: colorInfo,
    right: backButtonWidth,
  },
  dangerBtn: {
    backgroundColor: colorDanger,
    right: 0,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: backButtonWidth,
  },
  successBtn: {
    backgroundColor: colorSuccess,
    left: backButtonWidth,
  },
  warningBtn: {
    backgroundColor: colorWarning,
    left: 0,
  },
});
export default App;