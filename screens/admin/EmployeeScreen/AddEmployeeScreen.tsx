import React, {useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const AddEmployeeScreen = ({navigation}: any) => {
    const [fullName, setFullName] = useState("");
    const [userName, setUsername] = useState("");
    const [address, setAddress] = useState("");

    const [errorFullName, setErrorFullName] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorAddress, setErrorAddress] = useState("");

    const PageBack = () => {
        navigation.goBack();
    }

    const Submit = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={PageBack}>
                <Icon name={"arrow-back"} style={styles.backIcon} />
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
                            // value={categoryName}
                            onChangeText={(value) => setFullName(value)}
                        />
                        <Text style={{ color: 'red' }}>{fullName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Tài khoản:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Nhập vào tài khoản"}
                            // value={categoryName}
                            onChangeText={(value) => setUsername(value)}
                        />
                        <Text style={{ color: 'red' }}>{fullName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Nhập vào địa chỉ"}
                            // value={categoryName}
                            onChangeText={(value) => setAddress(value)}
                        />
                        <Text style={{ color: 'red' }}>{fullName}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btnAdd} onPress={Submit}>
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
    imagePicker: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    imagePickerText: {
        color: '#007BFF',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    btnAdd: {
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        height: 30,
        marginTop: 10,
        backgroundColor: '#1bcdff'
    },
    titleBTN: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    }
});
