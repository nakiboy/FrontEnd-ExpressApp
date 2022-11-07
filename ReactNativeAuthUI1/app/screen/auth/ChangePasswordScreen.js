import { View, Text, Button, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import { useChangeUserPasswordMutation } from "../../../services/userAuthApi";
import { getToken } from "../../../services/AsyncStorageService";

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [userLToken, setUserLToken] = useState();

  const clearTextInput = () => {
    setPassword("");
    setPassword_confirmation("");
  };

  const [changeUserPassword] = useChangeUserPasswordMutation();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setUserLToken(token);
    })();
  });

  const handleFormSubmit = async () => {
    if (password && password_confirmation) {
      if (password === password_confirmation) {
        const formdata = { password, password_confirmation };
        const res = await changeUserPassword({ formdata, userLToken });
        // console.log(res);
        if (res.data.status === "success") {
          clearTextInput();
          Toast.show({
            type: "done",
            position: "top",
            topOffset: 0,
            text1: "Таны нууц үг амжилттай солигдлоо",
          });
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
          text1:
            "Шинэ нууц үг болон баталгаажуулах шинэ нууц үг таарахгүй байна?",
        });
      }
    } else {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "Та шинэ нууц үг ээ бичнэ үү!",
      });
    }
  };
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginHorizontal: 30 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              marginVertical: 5,
              textAlign: "center",
              padding: 30,
            }}
          >
            Нууц үг солих уу?
          </Text>
          <View style={[styles.inputWithLabel, { marginBottom: 15 }]}>
            <Text style={styles.labelText}>Шинэ нууц үг оруулах</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Шинэ нууц үг оруулах"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Нууц үг давтах</Text>
            <TextInput
              style={styles.input}
              value={password_confirmation}
              onChangeText={setPassword_confirmation}
              placeholder="Нууц үг давтах"
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
              title="Хадгалах"
              onPress={handleFormSubmit}
              color="#5ACBF6"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
