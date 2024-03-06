/*
Created by:   Willem Toews
Purpose:      CIT-2269 Assignment #3
Desciption:   A soundboard app that can record and playback audio

TODO:       

*/ 

import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={{}}>

    {/* Instructions */}
    <Text style={{}}>Soundboard</Text>
    <Text style={{}}></Text>
    

    {/* Linked Buttons */}
    <View style={{}}>
    <Link href={{
                pathname: "/soundboard",
                params: {},
            }} asChild>
                <Pressable 
                    onPress={() => {}}
                    style={{}}
                >
                    <Text style={{}}>Easy</Text>
                </Pressable>
            </Link>
    </View>

    <View style={{}}>
    <Link href={{
                pathname: "",
                params: {},
            }} asChild>
                <Pressable 
                    onPress={() => {}}
                >
                    <Text style={{}}>Normal</Text>
                </Pressable>
            </Link>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
