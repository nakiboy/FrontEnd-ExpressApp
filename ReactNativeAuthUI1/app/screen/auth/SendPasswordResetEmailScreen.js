import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { styles, toastConfig } from "../../../style";
import { useSendPasswordResetEmailMutation } from "../../../services/userAuthApi";

const SendPasswordResetEmailScreen = () => {
  const [email, setEmail] = useState("");
  const clearTextInput = () => {
    setEmail("");
  };
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();

  const handleFormSubmit = async () => {
    if (email) {
      const formdata = { email };
      const res = await sendPasswordResetEmail(formdata);
      if (res.data.status === "success") {
        clearTextInput();
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: "Имайл илгээсэн. Та имайл шалгана уу?...",
        });
      }
      if (res.data.status === "failed") {
        clearTextInput();
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
        text1: "Имайл оруулна уу?",
      });
    }
  };
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <View style={{ marginHorizontal: 30, padding: 50 }}>
        <Text
          style={{
            fontWeight: "Bold",
            fontSize: 20,
            marginVertical: 5,
            textAlign: "center",
            padding: 30,
          }}
        >
          Нууц үг сэргээх
        </Text>
        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Имайл</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Имайл оруулна уу?"
            keyboardType="email-address"
          />
        </View>
        <View style={{ width: 200, alignSelf: "center", margin: 20 }}>
          <Button title="Илгээх" onPress={handleFormSubmit} color="#5ACBF6" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendPasswordResetEmailScreen;
