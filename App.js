import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button, Header, Divider } from 'react-native-elements';
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'

export default function App() {
  const [date, setDate] = useState("")
  const [form, setForm] = useState(false)
  const [status, setStatus] = useState(true)
  const [textTask, setTextTask] = useState('')
  const [tasks, setTasks] = useState([{ id: "1", title: "To do today", status: status }, {id: "2", title: "finish today", status: status }])

  const id = new Date().getTime().toString()
  const today = new Date().getTime().toString()
  const todayDate = new Date().toDateString();

  
  
  useEffect(() => {
    setDate(todayDate)
  }, [])

  const changeStatus = (id)=> {
    let statusTasks = [...tasks]
    statusTasks.map( (task) => {
      if(id == task.id){
        task.status = !task.status
      }
      setTasks(statusTasks)
    })
  }

  const getText = (text) => {
    setTextTask(text)
  }

  const handleAdd = () => {
    setForm(!form)
    if (form && textTask !== '') {
      const addTask = [...tasks, { id: id, title: textTask, date: date, status: status }]
      setTasks(addTask)
      console.log(addTask);
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


  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.topBar}
        placement='left'
        centerContainerStyle={{ flex: 2 }}
        centerComponent={{ text: 'To Do Lists', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={{ text: <Text style = {{color: '#fff',fontSize: 17 }}>{date}</Text> }}
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
          <View style={styles.header} key={task.id}>
            <Text style={styles.task}> {task.title}
              <Text style = {styles.textCreated}> created on {date} </Text>
            </Text>
            {(task.status) ? 
            <Icon
            reverse
            name=  "check-box"
            color='red'
            onPress={() => changeStatus(task.id)}/>:
          <Icon
          raised
            name='delete-sweep'
            color='red'
            onPress={() => setStatus(!task.status) } />}
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
    paddingVertical: 12,
    paddingHorizontal: 10,
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
  buttons: {
    backgroundColor: '#EE6055',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
  textCreated:{
    color: '#7F7CAF',
    fontSize: 14
  }

});
