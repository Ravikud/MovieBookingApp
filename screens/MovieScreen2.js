import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import malls from "../data/malls";
const MovieScreen2 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [mall, setMall] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const mallsData = malls;

  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
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
          <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 5 }}>
            {route.params.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Ionicons
            style={{ marginLeft: 5 }}
            name="search"
            size={24}
            color="black"
          />
          <Ionicons
            style={{}}
            name="ios-filter-outline"
            size={24}
            color="black"
          />
          <Ionicons style={{}} name="share-outline" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          marginTop: 10,
          marginLeft: 5,
        }}
      >
        <AntDesign name="Safety" size={24} color="orange" />
        <Text style={{ paddingTop: 4, paddingLeft: 4 }}>
          Your safety is our priority
        </Text>
      </View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2020-08-24")}
        endDate={new Date("2020-08-30")}
        initialSelectedDate={new Date("2020-08-22")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      {mallsData.map((item, index) => (
        <Pressable
          onPress={() => {
            setMall(item.name);
            setSeatsData(item.tableData);
          }}
          style={{ margin: 10 }}
          key={index}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.name}</Text>
          {mall.includes(item.name) ? (
            <FlatList
            numColumns={3}
            data={item.showtimes}
            renderItem={({item}) => (
                <Pressable onPress={() => navigation.navigate("Theatre",{
                    mall:mall,
                    name:route.params.name,
                    timeSelected:item,

                    tableSeats:seatsData,   
                })}
                 style={{borderColor:"green",borderWidth:0.5,width:80,borderRadius:3,margin:10,padding:5,}}>
                    {/* showtiming shown */}
                    <Text style={{fontSize:15,color:"green",fontWeight: "500", textAlign:"center" }}>{item}</Text>
                </Pressable>   
            )} />
          ) : (null)}
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default MovieScreen2;

const styles = StyleSheet.create({});
