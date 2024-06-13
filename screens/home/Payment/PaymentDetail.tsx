import React, {useState} from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import CONFIG from "../../../config/config.ts";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";

export const PaymentDetail = ({navigation, route}: any) => {
    const {item} = route.params;

    const [dishes, setDishes] = useState(item.dishs);

    const PageBack = () => {
        navigation.goBack();
    };

    const PaymentBill = async (orderId: number) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/payments/${item.orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                // No body needed for a POST request in this case
            });
            console.log(item.orderId);
            if (response.ok) {
                Alert.alert('Thanh toán thành công');
                // Perform any additional actions after successful payment
            } else {
                Alert.alert('Đã xảy ra lỗi', 'Thanh toán thất bại');
            }
        } catch (error) {
            console.error('Error while processing payment:', error);
            Alert.alert('Đã xảy ra lỗi', 'Không thể kết nối đến máy chủ');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={PageBack}>
                <Icon name={"arrow-back"} style={styles.backIcon}/>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={{color: 'black', fontSize: 40, textAlign: "center"}}>Chi tiết hóa đơn</Text>
                <View style={styles.detailSection}>
                    <View style={{flexDirection: "row", alignItems: "baseline"}}>
                        <Text style={styles.label}>Tên bàn ăn:</Text>
                        <Text style={styles.detailText}>{item.tableName}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "baseline"}}>
                        <Text style={styles.label}>Tên nhân viên phục vụ:</Text>
                        <Text style={styles.detailText}>{item.userFullName}</Text>
                    </View>
                </View>
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>STT</Text>
                        <Text style={styles.tableHeaderText}>Tên món ăn</Text>
                        <Text style={styles.tableHeaderText}>SL</Text>
                        <Text style={styles.tableHeaderText}>Giá</Text>
                        <Text style={styles.tableHeaderText}>Tổng</Text>
                    </View>
                    <FlatList
                        data={dishes}
                        renderItem={({item, index}) => (
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{item.dishName}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.price} VNĐ</Text>
                                <Text style={styles.tableCell}>{item.amount} VNĐ</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={styles.tableFooter}>
                        <Text style={styles.tableFooterText}>Tổng cộng:</Text>
                        <Text style={styles.tableFooterText}>{item.totalAmount} VNĐ</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.paymentButton} onPress={() => PaymentBill(item.orderId)}>
                    <Text style={styles.paymentButtonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        paddingTop: 70
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    detailSection: {
        marginVertical: 10,
    },
    detailText: {
        marginStart: 5,
        color: "black",
        fontSize: 20,
        marginBottom: 5,
    },
    tableContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        paddingVertical: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black"
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    tableCell: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: "black"
    },
    tableFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
        backgroundColor: '#f1f1f1',
    },
    tableFooterText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    paymentButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: '#1bcdff',
        borderRadius: 5,
        alignItems: 'center',
    },
    paymentButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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
    label: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold"
    }

});
