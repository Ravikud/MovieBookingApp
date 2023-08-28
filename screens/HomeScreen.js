import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Movies from "../data/movies";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  return ( 
    <SafeAreaView style={{backgroundColor: "#F0F0F0", flex: 1}}>
        <MovieCard />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
