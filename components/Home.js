import React, {
  useState,
  useReducer,
  useEffect,
  useCallback,
  moment,
} from "react";
import {
  Platform,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Picker,
  FlatList,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase, { database } from "firebase";
import { set } from "react-native-reanimated";

const Home = ({ onRouteChange }) => {
  const [bool, setBool] = useState(false);
  const [inputplus, setInputplus] = useState(false);
  const [arrob, setArrob] = useState([]);
  const [km, setKm] = useState(0);
  const [aom, setAom] = useState(0);
  const [ap, setAp] = useState(0);
  const [dis, setDis] = useState("");
  const [pick, SetPick] = useState("");
  const [key, Setkey] = useState(0);
  const [advancedModal, setAdvancedmodal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      let dbref = firebase.database().ref("/users/" + user.uid + "/nodes");
      if (user) {
        dbref.on("value", function (snapshot) {
          let indexkey = Object.keys(snapshot.val());
          let maxi = 0;
          let newArr = [];
          for (let i = 0; i < indexkey.length; i++) {
            let k = indexkey[i];
            newArr[i] = snapshot.val()[k];
            if (maxi < snapshot.val()[k].key) {
              maxi = snapshot.val()[k].key;
            }
          }
          setArrob(newArr);
          Setkey(maxi + 1);
        });
      }
    });
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const complex = (index, trueorfalse) => {
    let arrCopy = JSON.parse(JSON.stringify(arrob));
    arrCopy[index].modalvisible = trueorfalse;
    setArrob(arrCopy);
  };

  const changeBool = (change) => {
    setBool(change);
  };
  const logOut = () => {
    firebase.auth().signOut();
  };
  const combo = () => {
    onRouteChange("signin");
    logOut();
  };
  const advanced = () => {
    setBool(false);
    setAdvancedmodal(true);
  };
  const comboSubmit = () => {
    let time = new Date();
    setArrob(
      arrob.concat({
        kilometers: km,
        amountonmeter: aom,
        amountpaid: ap,
        dispatched: dis,
        pickup: pick,
        date: time.toDateString(),
        time: time.toTimeString(),
        modalvisible: false,
        key: key,
      })
    );
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .database()
          .ref("/users/" + user.uid)
          .child("/nodes")
          .push({
            kilometers: km,
            amountonmeter: aom,
            amountpaid: ap,
            dispatched: dis,
            pickup: pick,
            date: time.toDateString(),
            time: time.toTimeString(),
            modalvisible: false,
            key: key,
          });
      } else {
        onRouteChange("signin");
      }
    });
    Setkey(key + 1);
    setInputplus(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.safeareaviewstyle}
      enabled={false}
    >
      <View style={styles.topportion}>
        <View style={styles.topportionleftside}>
          <TextInput placeholder={"Search"}></TextInput>
        </View>
        <View style={styles.topportionrightside}>
          <TouchableOpacity>
            <Text style={{ fontSize: 40 }} onPress={() => setInputplus(true)}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hamburger}>
          <TouchableOpacity onPress={() => changeBool(true)}>
            <Text style={{ fontSize: 30 }}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomportion}>
        <Modal transparent={true} visible={bool}>
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View style={styles.modalstyle}>
              <TouchableOpacity
                style={styles.buttoninsidemod}
                onPress={() => combo()}
              >
                <Text style={{ fontSize: 30 }}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttoninsidemod}>
                <Text style={{ fontSize: 30 }} onPress={() => advanced()}>
                  Advanced
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttoninsidemod}
                onPress={() => changeBool(false)}
              >
                <Text style={{ fontSize: 30 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal transparent={true} visible={advancedModal}>
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View style={styles.advancedmodalstyle}>
              <Button title="Show Date Picker" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
        </Modal>
        <Modal transparent={true} visible={inputplus}>
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View style={styles.inputmodal}>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Kilometers:
              </Text>
              <TextInput
                style={styles.textunderline}
                onChangeText={(text) => setKm(text)}
              ></TextInput>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Amount on meter:
              </Text>
              <TextInput
                style={styles.textunderline}
                onChangeText={(text) => setAom(text)}
              ></TextInput>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Amount paid:
              </Text>
              <TextInput
                style={styles.textunderline}
                onChangeText={(text) => setAp(text)}
              ></TextInput>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Dispatched:
              </Text>
              <TextInput
                style={styles.textunderline}
                onChangeText={(text) => setDis(text)}
              ></TextInput>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Pickup:
              </Text>
              <TextInput
                style={styles.textunderline}
                onChangeText={(text) => SetPick(text)}
              ></TextInput>
              <TouchableOpacity style={styles.buttoninsidelistmod}>
                <Text
                  style={{ fontSize: 30, textAlign: "center" }}
                  onPress={() => comboSubmit()}
                >
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelinsidelistmod}>
                <Text
                  style={{ fontSize: 30, textAlign: "center" }}
                  onPress={() => setInputplus(false)}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <FlatList
          data={arrob}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity onPress={() => complex(item.key, true)}>
                <Text style={styles.nodestyle}>
                  {item.date} | {item.time} |{item.key}
                </Text>
              </TouchableOpacity>
              <Modal transparent={true} visible={item.modalvisible}>
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                  <View style={styles.modalstyle}>
                    <Text>Kilometers: {item.kilometers}km</Text>

                    <Text>Amount on meter: ${item.amountonmeter}</Text>
                    <Text>Amount paid: ${item.amountpaid}</Text>
                    <Text>Dispatched: {item.dispatched}</Text>
                    <Text>Pickup: {item.pickup}</Text>
                    <TouchableOpacity style={styles.indcancel}>
                      <Text
                        style={{ fontSize: 30, textAlign: "center" }}
                        onPress={() => complex(item.key, false)}
                      >
                        Back
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        ></FlatList>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeareaviewstyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FAFAD2",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topportion: {
    flex: 1.3 / 20,
    flexDirection: "row",
  },
  topportionleftside: {
    flex: 6.8 / 10,
    backgroundColor: "white",
    borderRadius: 50,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 30,
  },
  topportionrightside: {
    flex: 1.5 / 10,
    backgroundColor: "white",
    borderRadius: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  bottomportion: {
    flex: 18.7 / 20,
  },
  viewinsidescrollview: {
    flex: 1,
    backgroundColor: "white",
  },
  modalstyle: {
    backgroundColor: "#ffffff",
    margin: 50,
    marginBottom: 150,
    marginTop: 250,
    borderRadius: 50,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttoninsidemod: {
    backgroundColor: "lightgrey",
    borderRadius: 50,
    padding: 10,
    margin: 20,
  },
  hamburger: {
    flex: 1.5 / 10,
    borderRadius: 55,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  inputmodal: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 50,
    flex: 1,

    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  textunderline: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignSelf: "stretch",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
    padding: 10,
  },
  buttoninsidelistmod: {
    width: "80%",
    backgroundColor: "#31d4d4",
    borderRadius: 5,
  },
  cancelinsidelistmod: {
    width: "80%",
    backgroundColor: "lightgrey",
    borderRadius: 5,
    marginTop: 100,
    padding: 20,
  },
  nodestyle: {
    flex: 1 / 5,
    backgroundColor: "lightgrey",
    margin: 5,
    padding: 5,
    fontSize: 25,
    borderRadius: 20,
  },
  indcancel: {
    width: "80%",
    backgroundColor: "lightblue",
    borderRadius: 5,
    marginTop: 10,
    padding: 25,
  },
  advancedmodalstyle: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
export { Home };
