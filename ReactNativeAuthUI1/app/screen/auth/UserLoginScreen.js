import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../../../services/userAuthApi";
import { storeToken } from "../../../services/AsyncStorageService";

const UserLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearTextInput = () => {
    setEmail("");
    setPassword("");
  };

  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async () => {
    if (email && password) {
      const formData = { email, password };
      const res = await loginUser(formData);
      if (res.data.status === "success") {
        await storeToken(res.data.token);
        clearTextInput();
        navigation.navigate("UserPanelTab");
      }
      if (res.data.status === "failed") {
        Toast.show({
          type: "warning",
          position: "top",
          topOffset: 0,
          text1: res.data.message,
        });
      }
    } else {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "Мэдээлэл дутуу байна?",
      });
    }
  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginHorizontal: 30 }}>
          <View style={{ alignSelf: "center", marginBottom: 10, padding: 30 }}>
            <MaterialIcon name="qr-code" color="#5ACBF6" size={100} />
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              marginVertical: 5,
              textAlign: "center",
            }}
          >
            Qr бараа материал бүртгэх
          </Text>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Имайл</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Имайл оруулна уу?"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Нууц үг</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Нууц үг оруулна уу?"
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: 200,
              alignSelf: "center",
              margin: 20,
            }}
          >
            <Button
              title="Нэвтрэх"
              onPress={handleFormSubmit}
              color="#5ACBF6"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("SendPasswordResetEmail");
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                    fontSize: 15,
                  }}
                >
                  Нууц үг мартсан?
                </Text>
              </TouchableWithoutFeedback>
            </View>
            {/* <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Registration");
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  New User? Registration
                </Text>
              </TouchableWithoutFeedback>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;
