import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button,Header } from 'react-native-elements';
import Constants from 'expo-constants'

export default function App() {
  const [date] = useState("Today")


  return (
    <View style={styles.container}>
      <Header  
        containerStyle={styles.topBar}
        placement = 'left'
        centerContainerStyle = {{flex:2}}
        centerComponent={{ text: 'To Do Lists', style: { color: '#fff',fontSize: 20}}}

        rightComponent={{ text:'20/10/2021', color: '#fff' }}
      />
      <Button style={styles.addButton}
        title="Add your task"
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.Input}
          placeholder='Your task' />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.Input}
          placeholder='Date' />
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
  Input: {
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  addButton: {
    marginTop: 20,
  },
  topBar: {
    backgroundColor: 'red',
  
  }
});