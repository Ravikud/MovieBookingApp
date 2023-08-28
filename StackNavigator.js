import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MovieScreen from "./screens/MovieScreen";
import MovieScreen2 from "./screens/MovieScreen2";
import TheaterScreen from "./screens/TheaterScreen";
import TicketScreen from "./screens/TicketScreen";

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Movies" component={MovieScreen2} options={{headerShown:false}} />
        <Stack.Screen name="Theatre" component={TheaterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Ticket" component={TicketScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
