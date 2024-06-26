import React from "react";
import Header from "../../components/Header.tsx";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import CategoryScreen from "../Category/CategoryScreen.tsx";
import ProductScreen from "../ProductScreen/ProductScreen.tsx";
import EmployeeScreen from "../EmployeeScreen/EmployeeScreen.tsx";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import InformationScreen from "../InfomationScreen/InfomationScreen.tsx";
import AddCategoryScreen from "../Category/AddCategoryScreen.tsx";
import UpdateCategoryScreen from "../Category/UpdateCategoryScreen.tsx";
import TableScreen from "../Table/TableScreen.tsx";
import AddTableScreen from "../Table/AddTableScreen.tsx";
import UpdateTableScreen from "../Table/UpdateTableScreen.tsx";
import AddDishScreen from "../ProductScreen/AddDishScreen.tsx";
import {UpdateEmployeeScreen} from "../EmployeeScreen/UpdateEmployeeScreen.tsx";
import {AddEmployeeScreen} from "../EmployeeScreen/AddEmployeeScreen.tsx";
import {UpdateInformationScreen} from "../InfomationScreen/UpdateInformationScreen.tsx";
import {UpdateDishScreen} from "../ProductScreen/UpdateDishScreen.tsx";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({userData}: any) => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName: any;

                    if (route.name === 'Table') {
                        iconName = focused ? 'tablet-landscape' : 'tablet-landscape-outline';
                    } else if (route.name === 'Category') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Product') {
                        iconName = focused ? 'fast-food' : 'fast-food-outline';
                    } else if (route.name === 'Employee') {
                        iconName = focused ? 'user-circle' : 'user-circle-o';
                        return <Icons name={iconName} size={size} color={color}/>;
                    } else if (route.name === 'Information') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name={"Table"} component={TableScreen}/>
            <Tab.Screen name={"Category"} component={CategoryScreen}/>
            <Tab.Screen name={"Product"} component={ProductScreen}/>
            <Tab.Screen name={"Employee"} component={EmployeeScreen}/>
            {/*<Tab.Screen name={"Information"} component={InformationScreen}/>*/}
            <Tab.Screen name="Information">
                {props => <InformationScreen {...props} userData={userData} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const AdminHomeScreen = ({route}: any) => {
    const { userData } = route.params;

    return (
        <>
            <Stack.Navigator initialRouteName="TabNavigator">
                {/*<Stack.Screen name={"TabNavigator"} component={TabNavigator} options={{headerShown: false}}/>*/}
                <Stack.Screen name="TabNavigator" options={{ headerShown: false }}>
                    {props => <TabNavigator {...props} userData={userData} />}
                </Stack.Screen>
                <Stack.Screen name={"AddCategory"} component={AddCategoryScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddTable"} component={AddTableScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddDish"} component={AddDishScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddEmployee"} component={AddEmployeeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateEmployee"} component={UpdateEmployeeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateCategory"} component={UpdateCategoryScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateTable"} component={UpdateTableScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateDish"} component={UpdateDishScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"UpdateInformation"} component={UpdateInformationScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </>
    )
}

export default AdminHomeScreen;
