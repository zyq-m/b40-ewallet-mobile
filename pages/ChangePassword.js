import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { changeCafePass, changeStudentPass } from "../lib/API";
import { useUserContext } from "../hooks";
import { Button } from "../components";
import { popupMessage } from "../utils/popupMessage";

import { globals, loginStyle } from "../styles";

const ChangePassword = ({ navigation }) => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const { user } = useUserContext();

  const handleSend = async () => {
    const data = {
      currentPassword: currPass,
      newPassword: newPass,
    };

    // ! buat validation pass & re-type pass
    if (rePass !== newPass) {
      popupMessage({
        message: "Retype password doesn't match",
        title: "Alert",
      });

      return;
    }
    try {
      if (user.student) {
        await changeStudentPass(user.id, data);
      } else {
        await changeCafePass(user.id, data);
      }

      setCurrPass("");
      setRePass("");
      setNewPass("");
      navigation.navigate("Dashboard");
    } catch (error) {
      popupMessage({ message: "Wrong current password", title: "Alert" });
    }
  };

  return (
    <View style={globals.container}>
      <View style={{ padding: 16 }}>
        <Para>Current password</Para>
        <Input value={currPass} onChangeText={setCurrPass} />

        <Para>New Password</Para>
        <Input value={newPass} onChangeText={setNewPass} />

        <Para>Re-type password</Para>
        <Input value={rePass} onChangeText={setRePass} />

        <Button label={"Change"} onPress={handleSend} />
      </View>
    </View>
  );
};

const Para = ({ children, style }) => {
  return <Text style={[aboutStyle.para, style]}>{children}</Text>;
};

const Input = props => {
  return (
    <TextInput
      {...props}
      secureTextEntry={true}
      style={[loginStyle.inputContainer, aboutStyle.form]}
    />
  );
};

const aboutStyle = StyleSheet.create({
  para: {
    marginLeft: 6,
    marginBottom: 6,
  },
  form: {
    marginTop: 0,
    marginBottom: 24,
  },
});

export default ChangePassword;
