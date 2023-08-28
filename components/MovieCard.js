import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import movies from "../data/movies";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";

const MovieCard = () => {
  const data = movies;
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={Header}
        data={data}
        renderItem={({ item }) => (
          <Pressable style={{ margin: 10, marginHorizontal: 15 }}>
            <Image
              style={{ aspectRatio: 2 / 3, height: 240 }}
              source={{ uri: item.image }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                width: 170,
                marginTop: 10,
              }}
            >
              {item.name.substr(0, 16)}
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
              U/A • {item.language}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "500", marginTop: 4 }}>
              {item.genre}
            </Text>
            <Pressable
            onPress={()=>navigation.navigate("Movies",{
                name:item.name
            })}
              style={{
                backgroundColor: "#ffc40c",
                padding: 10,
                borderRadius: 6,
                marginRight: 10,
                width:100,
                marginTop:10,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}
              >
                B00K
              </Text>
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
