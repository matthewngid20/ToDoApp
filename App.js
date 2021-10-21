import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button, Header, Divider } from 'react-native-elements';
import Constants from 'expo-constants'

export default function App() {
  const [date,setDate] = useState("Today")
  const [form, setForm] = useState(false)


  const handleAdd =() => {
     setForm(!form)
  }
  const addTaskForm = () => {
      return(
        <>
        <View style={styles.inputContainer}>
          <TextInput style={styles.Input}
            placeholder='Your task' />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.Input}
            placeholder='Date' />
        </View>
        </>
      )
    }
    
  


  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.topBar}
        placement='left'
        centerContainerStyle={{ flex: 2 }}
        centerComponent={{ text: 'To Do Lists', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={{ text: <Text>{date}</Text>, style: { color: '#fff', fontSize: 20 } }}
      />
      <Button buttonStyle={styles.addButton}
        title="Add more task"
        onPress = { () => handleAdd()}
      />
      {(form) ? addTaskForm(): true}
      
      <Divider
        orientation="horizontal"
        subHeader="Your task"
        subHeaderStyle={styles.divider}
      />
      <View style={styles.header} >
          <Text style={styles.task}> test</Text>
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
    backgroundColor: '#63474D',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    
  },
  task: {
    backgroundColor: '#FEC196',
    fontSize: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    padding: 5,
    flex: 1,
    margin: 5,
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
    flexDirection: 'row',
    margin: 5,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#FFA686',
  },
  topBar: {
    backgroundColor: '#FFA686',
  },
  divider: {
    color: '#FFA686',
    fontSize: 20, 
  },

});
