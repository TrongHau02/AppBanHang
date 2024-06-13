import React, {useEffect, useState} from "react";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import {Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Waiting from "../../components/Waiting.tsx";
import CONFIG from "../../../config/config.ts";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    quantity?: number; // Optional field for quantity
}

const ProductList = ({navigation, tableId, userId, dishs}: any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [addedDishes, setAddedDishes] = useState<Product[]>([]);

    const getAPI = async () => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/dishes`);
            const data = await response.json();
            const resData = data.data;
            setProducts(resData);
            /*console.log(userId);
            console.log(tableId);*/
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAPI();
    }, []);

    const handleAddPress = (item: Product) => {
        const quantity = quantities[item.id] || 0;
        if (quantity === 0) {
            Alert.alert("Thông báo", "Vui lòng nhập số lượng món ăn");
            return;
        }

        setAddedDishes(prevAddedDishes => {
            const existingDish = prevAddedDishes.find(dish => dish.id === item.id);
            if (existingDish) {
                return prevAddedDishes.map(dish =>
                    dish.id === item.id ? { ...dish, quantity: dish.quantity! + quantity } : dish
                );
            } else {
                return [...prevAddedDishes, { ...item, quantity }];
            }
        });
        Alert.alert("Thành công", "Món ăn đã được thêm vào giỏ hàng");
    };

    const handleOrderPress = async () => {
        const orderDetails = addedDishes.map(dish => ({
            dishId: dish.id,
            quantity: dish.quantity,
            price: dish.price
        }));

        if (orderDetails.length === 0) {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất một món ăn");
            return;
        }

        const orderData = {
            userId: userId,
            tableId: tableId,
            dishs: orderDetails
        };

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                Alert.alert("Thành công", "Đơn hàng của bạn đã được thêm");
                setQuantities({});
                setAddedDishes([]);
            } else {
                Alert.alert("Lỗi", "Không thể thêm đơn hàng");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm đơn hàng");
        }
    };

    const handleQuantityChange = (productId: number, quantity: string) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: parseInt(quantity) || 0
        }));
    };

    return (
        <View>
            <AbstractComponent title="Món ăn" textBTN="Đặt món" onAddPress={handleOrderPress}/>
            {isLoading ? <Waiting/> : (
                <FlatList
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    data={dishs}
                    renderItem={({item}) =>
                        <View style={styles.block}>
                            <View style={styles.item}>
                                <Image style={styles.image} source={{uri: item.imageUrl}}/>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.title}>Giá: {item.price} VNĐ</Text>
                                <View style={styles.quantity}>
                                    <Text style={styles.title}>Số lượng:</Text>
                                    <TextInput
                                        style={styles.inputText}
                                        onChangeText={(value) => handleQuantityChange(item.id, value)}
                                        value={quantities[item.id]?.toString() || ''}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <TouchableOpacity style={styles.add} onPress={() => handleAddPress(item)}>
                                    <Text style={styles.title}>Thêm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        marginVertical: 5,
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
    },
    inputText: {
        color: 'black',
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        height: 45,
        width: 50,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    block: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'lightblue',
        flexDirection: "column",
        alignItems: "center"
    },
    add: {
        marginTop: 5,
        width: 100,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#1bcdff',
        marginBottom: 5
    },
    quantity: {
        flexDirection: "row",
        alignItems: "center"
    }
});

export default ProductList;
