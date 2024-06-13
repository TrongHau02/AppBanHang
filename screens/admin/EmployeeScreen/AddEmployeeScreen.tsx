import React, {useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CONFIG from "../../../config/config.ts";

export const AddEmployeeScreen = ({navigation}: any) => {
    const [fullName, setFullName] = useState("");
    const [userName, setUsername] = useState("");
    const [address, setAddress] = useState("");

    const [errorFullName, setErrorFullName] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorAddress, setErrorAddress] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const PageBack = () => {
        navigation.goBack();
    }

    const Submit = async () => {
        // Clear previous errors
        setErrorFullName("");
        setErrorUserName("");
        setErrorAddress("");

        // Validate input
        let isValid = true;
        if (fullName.trim() === "") {
            setErrorFullName("Vui lòng nhập họ tên");
            isValid = false;
        }
        if (userName.trim() === "") {
            setErrorUserName("Vui lòng nhập tài khoản");
            isValid = false;
        }
        if (address.trim() === "") {
            setErrorAddress("Vui lòng nhập địa chỉ");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userName,
                    password: "123456",
                    fullname: fullName,
                    address: address
                }),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    'Thêm nhân viên thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setUsername("");
                setFullName("");
                setAddress("");
            } else {
                ToastAndroid.showWithGravity(
                    responseData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                "Đã xảy ra lỗi khi gửi request",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={PageBack}>
                <Icon name={"arrow-back"} style={styles.backIcon}/>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Nhân viên</Text>
                <View style={styles.inputContainer}>
                    <View>
                        <Text style={styles.label}>Họ tên:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Nhập vào họ tên"}
                            value={fullName}
                            onChangeText={(value) => {
                                setFullName(value);
                                setErrorFullName("");
                            }}
                        />
                        <Text style={{color: 'red'}}>{errorFullName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Tài khoản:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Nhập vào tài khoản"}
                            value={userName}
                            onChangeText={(value) => {
                                setUsername(value);
                                setErrorUserName("");
                            }}
                        />
                        <Text style={{color: 'red'}}>{errorUserName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Nhập vào địa chỉ"}
                            value={address}
                            onChangeText={(value) => {
                                setAddress(value);
                                setErrorAddress("");
                            }}
                        />
                        <Text style={{color: 'red'}}>{errorAddress}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btnAdd} onPress={Submit} disabled={isSubmitting}>
                    <Text style={styles.titleBTN}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        padding: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: 10,
        width: '100%',
    },
    label: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        color: 'black',
        fontSize: 16,
        width: '100%',
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 25,
        color: '#007BFF',
    },
    backButtonText: {
        fontSize: 16,
        color: '#007BFF',
        marginLeft: 5,
    },
    btnAdd: {
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        height: 30,
        marginTop: 10,
        backgroundColor: '#1bcdff',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    titleBTN: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    }
});
