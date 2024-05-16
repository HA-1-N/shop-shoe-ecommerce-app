import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalConfirm from "../../components/modal/ModalConfirm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutApi } from "../../api/auth.api";
import { getCurrentUserByIdApi } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { incrementCountNumberLogin } from "../../redux/features/auth.slice";

const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const countNumberLogin = useSelector((state) => state?.auth?.countNumberLogin);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [userDetail, setUserDetail] = useState({});

  const getIdLocalStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      setUserId(Number(userId));
    } catch (error) {
      console.log("Error getting user id", error);
    }
  };

  const getRefreshToken = async () => {
    // Add your refresh token logic here
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      setRefreshToken(refreshToken);
    } catch (error) {
      console.log("Error getting refresh token", error);
    }
  };

  const getUserById = async () => {
    // Add your get user by id logic here
    try {
      const res = await getCurrentUserByIdApi(userId);
      setUserDetail(res.data);
    } catch (error) {
      console.log("Error getting user by id", error);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      getUserById();
    }
  }, [userId, countNumberLogin]);

  useEffect(() => {
    getRefreshToken();
    getIdLocalStorage();
  }, [userId, countNumberLogin]);

  const onPressEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const onPressChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleLogout = async () => {
    const params = {
      refreshToken: refreshToken,
    };

    // Add your logout logic here
    try {
      const res = await logoutApi(params.refreshToken);
      if (res) {
        // clear storage
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("refreshToken");
        dispatch(incrementCountNumberLogin());
        navigation.navigate("NavigationAuth");
        alert("You have been logged out");
      }
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  const handleCloseModalLogout = () => {
    setOpenModalConfirm(false);
  };

  const handleClickBtnNavigateLogin = () => {
    navigation.navigate("NavigationAuth");
  }

  const onPressClearStorage = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("refreshToken");
    dispatch(incrementCountNumberLogin());
  };

  return (
    <>
      {openModalConfirm && (
        <ModalConfirm
          open={openModalConfirm}
          onClose={handleCloseModalLogout}
        />
      )}
      {userId ? (
        <View style={styles.container}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            {/* <Image
                source={require('./path/to/avatar.png')}
                style={styles.avatar}
              /> */}
            <View>
              <Text style={styles.greeting}>Hello, {userDetail?.name}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Your Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Wishlist</Text>
                </TouchableOpacity>
                {/* Add more buttons as needed */}
              </View>
            </View>
          </View>

          {/* Account Settings */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={onPressEditProfile}
          >
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={onPressChangePassword}
          >
            <Text>Change Password</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.menuItem}>
        <Text>Saved Cards & Wallet</Text>
      </TouchableOpacity> */}

          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text>Logout</Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}

          {/* Clear storage */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={onPressClearStorage}
          >
            <Text>Clear Storage</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{ marginVertical: 10 }}>You are not logged in</Text>
          <Button
            onPress={handleClickBtnNavigateLogin}
            title="Click to Login"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    marginRight: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default SettingScreen;
