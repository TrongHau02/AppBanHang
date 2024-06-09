import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import CONFIG from "../../../config/config";
import axios from "axios";

const AddDishScreen = ({ navigation }) => {
    const [dishName, setDishName] = useState("");
    const [dishPrice, setDishPrice] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [errorDishName, setErrorDishName] = useState("");
    const [errorDishPrice, setErrorDishPrice] = useState("");
    const [errorDishCategory, setErrorDishCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    // Sử dụng cho Dropdown loại món ăn
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAPI();
    }, []);

    const getAPI = async () => {
        try {
            const response = await axios.get(`${CONFIG.API_BASE_URL}/categorys`);
            if (Array.isArray(response.data.data)) {
                const data = response.data.data.map(item => ({
                    label: item.name,
                    value: item.id,
                    icon: () => <Image source={{ uri: item.imageUrl }} style={styles.iconStyle} />
                }));
                setItems(data);
            } else {
                console.error('Data is not an array:', response.data);
                Alert.alert('Error', 'Invalid data format received from API');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
            }
        });
    };

    const Submit = async () => {
        if (dishName === '') {
            setErrorDishName("Vui lòng nhập tên món ăn");
            return;
        } else {
            setErrorDishName("");
        }

        if (dishPrice === '' || isNaN(Number(dishPrice))) {
            setErrorDishPrice("Vui lòng nhập giá món ăn hợp lệ");
            return;
        } else {
            setErrorDishPrice("");
        }

        if (!value) {
            setErrorDishCategory("Vui lòng chọn loại món ăn");
            return;
        } else {
            setErrorDishCategory("");
        }

        try {
            const formData = new FormData();
            formData.append('name', dishName);
            formData.append('price', dishPrice);
            formData.append('categoryId', value);

            if (imageUri) {
                const filename = imageUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image';
                formData.append('image', { uri: imageUri, name: filename, type });
            }

            const response = await fetch(`${CONFIG.API_BASE_URL}/dishes`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const responseData = await response.json();

            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    'Thêm món ăn thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setDishName("");
                setDishPrice("");
                setValue(null);
                setImageUri(null);
            } else {
                ToastAndroid.showWithGravity(
                    responseData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            ToastAndroid.showWithGravity(
                "Đã xảy ra lỗi khi gửi request",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name={"arrow-back"} style={styles.backIcon} />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Thêm món mới</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Loại món ăn:</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select a product..."
                        style={styles.dropdown}
                    />
                    <Text style={{ color: 'red' }}>{errorDishCategory}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên món ăn:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nhập vào tên món ăn'}
                        value={dishName}
                        onChangeText={(value) => setDishName(value)}
                    />
                    <Text style={{ color: 'red' }}>{errorDishName}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Giá:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nhập vào giá'}
                        value={dishPrice}
                        onChangeText={(value) => setDishPrice(value)}
                        keyboardType='numeric'
                    />
                    <Text style={{ color: 'red' }}>{errorDishPrice}</Text>
                </View>
                <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Text style={styles.imagePickerText}>Chọn hình ảnh</Text>
                    )}
                </TouchableOpacity>
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
    dropdown: {
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
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 10
    }
});

export default AddDishScreen;
