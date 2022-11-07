import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../services/AsyncStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../features/userSlice";
import { setUserToken } from "../../features/authSlice";
import { List } from "react-native-paper";
import ProgramEhlel from "./Zaawar/ProgramEhlel";

const DashboardScreen = ({ Navigation }) => {
  const navigation = useNavigation();
  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setUserLToken(token);
      dispatch(setUserToken({ token: token }));
    })();
  });

  const { data, isSuccess } = useGetLoggedUserQuery(userLToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ email: data.user.email, name: data.user.name }));
    }
  });
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          marginVertical: 5,
          textAlign: "center",
          padding: 10,
        }}
      >
        CTSSYSTEM 6.0 Програмын заавар
      </Text>
      {/* <Text>{userLToken}</Text> */}
      <View style={styles.item}>
        <List.Item
          onPress={() => navigation.navigate("ProgramEhlel")}
          title="Програмын эхлэл"
          description="CTSYSTEM 6.0"
          left={(props) => <List.Icon {...props} color="green" icon="file" />}
        />
        <List.Item
          onPress={() => navigation.navigate("ProgramEhlel")}
          title="Бараа материал"
          description="CTSYSTEM 6.0"
          left={(props) => <List.Icon {...props} color="green" icon="file" />}
        />
        <List.Item
          onPress={() => navigation.navigate("ProgramEhlel")}
          title="Мөнгөн хөрөнгө"
          description="CTSYSTEM 6.0"
          left={(props) => <List.Icon {...props} color="green" icon="file" />}
        />
        <List.Item
          onPress={() => navigation.navigate("ProgramEhlel")}
          title="Баланс журнал"
          description="CTSYSTEM 6.0"
          left={(props) => <List.Icon {...props} color="green" icon="file" />}
        />
        <List.Item
          onPress={() => navigation.navigate("ProgramEhlel")}
          title="Үндсэн хөрөнгө"
          description="CTSYSTEM 6.0"
          left={(props) => <List.Icon {...props} color="green" icon="file" />}
        />
        <List.Item
          onPress={() => navigation.navigate("ProgramEhlel")}
          title="Цалин хөлс"
          description="CTSYSTEM 6.0"
          left={(props) => <List.Icon {...props} color="green" icon="file" />}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 25,
    marginHorizontal: 16,
  },
});

export default DashboardScreen;
