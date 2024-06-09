import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const UpdateInformationScreen = ({route, navigation}: any) => {
    const {userData} = route.params;

    const [userName, setUserName] = useState(userData.username);
    const [fullName, setFullName] = useState(userData.fullname);
    const [password, setPassword] = useState(userData.password);
    const [address, setAddress] = useState(userData.address);

    const [errorUserName, setErrorUserName] = useState("");
    const [errorFullName, setErrorFullName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorAddress, setErrorAddress] = useState("");

    const PageBack = () => {
        navigation.goBack();
    };

    const Submit = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={PageBack}>
                <Icon name={"arrow-back"} style={styles.backIcon}/>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Thông tin cá nhân</Text>
                <View style={styles.inputContainer}>
                    <View>
                        <Text style={styles.label}>Họ tên:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={fullName}
                            value={fullName}
                            onChangeText={(value) => setFullName(value)}
                        />
                        <Text style={{color: 'red'}}>{errorFullName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Tên đăng nhập:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={userName}
                            value={userName}
                            onChangeText={(value) => setUserName(value)}
                        />
                        <Text style={{color: 'red'}}>{errorUserName}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Mật khẩu:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={password}
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                        />
                        <Text style={{color: 'red'}}>{errorPassword}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={address}
                            value={address}
                            onChangeText={(value) => setAddress(value)}
                        />
                        <Text style={{color: 'red'}}>{errorAddress}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btnAdd} onPress={Submit}>
                    <Text style={styles.titleBTN}>Cập nhật</Text>
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
