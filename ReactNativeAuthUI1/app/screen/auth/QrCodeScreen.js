import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ProductSplit = () => {
  console.log("");
};

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanner, setScanner] = useState(false);
  const [object, setobject] = useState({
    productField: {
      productName: "",
      productCode: "",
      productQuantity: "",
      productPrice: "",
      productDate: "",
      productRegister: "",
      productAccount: "",
      productOwner: "",
    },
  });
  ProductSplit();

  const [text, setText] = useState("QR Уншуулах");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    const name = data.split("#").map((s) => s.split(/\s+/g).join(""))[0];
    const code = data.split("#").map((s) => s.split(/\s+/g).join(""))[1];
    const quantity = data.split("#").map((s) => s.split(/\s+/g).join(""))[2];
    const price = data.split("#").map((s) => s.split(/\s+/g).join(""))[3];
    const date = data.split("#").map((s) => s.split(/\s+/g).join(""))[4];
    const register = data.split("#").map((s) => s.split(/\s+/g).join(""))[5];
    const account = data.split("#").map((s) => s.split(/\s+/g).join(""))[6];
    const owner = data.split("#").map((s) => s.split(/\s+/g).join(""))[7];
    const product = {
      productField: {
        productName: name,
        productCode: code,
        productQuantity: quantity,
        productPrice: price,
        productDate: date,
        productRegister: register,
        productAccount: account,
        productOwner: owner,
      },
    };
    console.log(product.productField.productName);
    console.log(product.productField.productCode);
    console.log(product.productField.productQuantity);
    console.log(product.productField.productPrice);
    console.log(product.productField.productDate);
    console.log(product.productField.productRegister);
    console.log(product.productField.productAccount);
    console.log(product.productField.productOwner);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 700, width: 700 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && (
        <Button
          title={"Дахин уншуулах"}
          onPress={() => setScanned(false)}
          color="#B161F9"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 320,
    width: 310,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "black",
  },
  Button: {
    padding: 20,
    width: 170,
  },
});
