import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MovieCard } from "../Context";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useStripe } from "@stripe/stripe-react-native";
const TheaterScreen = () => {
  const route = useRoute();
  //   console.log(route.params);
  const navigation = useNavigation();
  const { seats, setSeats } = useContext(MovieCard);
  const onSeatSelect = (item) => {
    //if selected seat == item selected
    const seatSelected = seats.find((seat) => seat === item);
    if (seatSelected) {
      setSeats(seats.filter((seat) => seat !== item));
    } else {
      setSeats([...seats, item]);
    }
  };
  const fee = 87;
  const noOfSeats = seats.length;
  const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;
  console.log(seats, "seats selected");
  const showSeats = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {seats.map((seat, index) => (
          <Text style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4 }}>
            {seat}
          </Text>
        ))}
      </View>
    );
  };
  const stripe = useStripe();
  const subscribe = async () => {
    // const response = await fetch("http://192.168.1.7:8000/payment", {
    const response = await fetch("http:/192.168.68.140:8000/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: Math.floor(total * 100),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
     console.log(data);
    if (!response.ok) return Alert.alert(data.message);
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      // customerId: customer,
      // customerEphemeralKeySecret: ephemeralKey,
     
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Example Inc.",
    });

    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      // customer,
      // ephemeralKey,
      clientSecret,
      // merchantDisplayName
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    else {
      navigation.navigate("Ticket");
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />

          <View style={{ marginLeft: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {route.params.name}
            </Text>
            <Text style={{ marginTop: 4, color: "gray", fontWeight: "500" }}>
              {route.params.mall}
            </Text>
          </View>
        </View>
        <AntDesign
          style={{ marginRight: 12 }}
          name="sharealt"
          size={24}
          color="black"
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {route.params.timeSelected}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "gray",
          marginTop: 10,
        }}
      >
        CLASSIC(240)
      </Text>
      <View style={{ marginTop: 20 }} />
      <FlatList
        numColumns={7}
        data={route.params.tableSeats}
        renderItem={({ item }) => (
          <Pressable onPress={() => onSeatSelect(item)} style={{ margin: 10 }}>
            <Text
              style={{
                backgroundColor: "gray",
                borderWidth: 0.5,
                padding: 8,
                borderRadius: 5,
              }}
            >
              {seats.includes(item) ? (
                <Text style={{ backgroundColor: "#ffc40c", padding: 8 }}>
                  {item}
                </Text>
              ) : (
                <Text style={{ padding: 8 }}>{item}</Text>
              )}
            </Text>
          </Pressable>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 20,
          backgroundColor: "#D8D8D8",
          padding: 10,
          paddingLeft: 50,
        }}
      >
        <View>
          <FontAwesome name="square" size={24} color="#ffc40c" />
          <Text>Selected</Text>
        </View>
        <View>
          <FontAwesome name="square" size={24} color="white" />
          <Text>Vacant</Text>
        </View>
        <View>
          <FontAwesome name="square" size={24} color="#989898" />
          <Text>Occupied</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, marginBottom: 4, fontWeight: "500" }}>
            Show Time Approx: 6:50 PM
          </Text>

          {seats.length > 0 ? (
            showSeats()
          ) : (
            <Text style={{ fontSize: 18 }}>No Seats Selected</Text>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#E0E0E0",
            padding: 6,
            borderRadius: 6,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            marginTop: 10,
          }}
        >
          <Text style={{ width: 100 }}>Now with ticket cancellation</Text>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#ffc40c",
          padding: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {seats.length > 0 ? (
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {" "}
            {seats.length} seat's selected
          </Text>
        ) : (
          <Text> </Text>
        )}
        <Pressable onPress={subscribe}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>PAY {total}</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default TheaterScreen;

const styles = StyleSheet.create({});
