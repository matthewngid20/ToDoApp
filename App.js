import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button, Header, Divider } from 'react-native-elements';
import Constants from 'expo-constants'

export default function App() {
  const [date, setDate] = useState("")
  const [form, setForm] = useState(false)
  const [textTask, setTextTask] = useState('')
  const [tasks, setTasks] = useState([{ id: "1", title: "To do today", status: false },])

  const id = new Date().getTime().toString()
  console.log(tasks);
  useEffect(() => {
    setTextTask(null)
  }, [])


  const getText = (text) => {
    setTextTask(text)
  }

  const handleAdd = () => {
    setForm(!form)
    if( form && textTask !== ""){
      const addTask = [...tasks, { id: id, title: textTask, date: date }]
      setTasks(addTask)
    }
  }
  const addTaskForm = () => {
    return (
      <>
        <View style={styles.inputContainer}>
          <TextInput style={styles.Input}
            placeholder='Your task'
            onChangeText={(text) => { getText(text) }} />

        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.Input}
            placeholder='Date' />
        </View>
      </>
    )
  }

 
  // <View style={styles.header}>
  //     <Text style={styles.task}> Testing</Text>
  //   </View>


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
        onPress={() => handleAdd()}
      />
      {(form) ? addTaskForm() : true}

      <Divider
        orientation="horizontal"
        subHeader="Your task"
        subHeaderStyle={styles.divider}
      />
      {tasks.map((task) => {
        return (
          <View style={styles.header} key = {task.id}>
            <Text style={styles.task}> {task.title}</Text>
          </View>
        )
      })} 
      
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
