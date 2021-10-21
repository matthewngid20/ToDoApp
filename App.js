import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants'

export default function App() {



  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder='Your task' />
        <TouchableOpacity>
          <Text>Add to list</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>

        <Text style={styles.task}> Testing</Text>

      </View>
      <View style={styles.header}>
        <Text style={styles.task}> Testing</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.task}> Testing</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  task: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    padding: 5,
    flex: 1,


  },
});
