import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Button, Header, Divider } from 'react-native-elements';
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'

export default function App() {
  const [date, setDate] = useState("")
  const [form, setForm] = useState(false)
  const [status, setStatus] = useState(true)
  const [textTask, setTextTask] = useState('')
  const [tasks, setTasks] = useState([{ id: "1", title: "To do today", status: status }, { id: "2", title: "finish today", status: status }])

  const id = new Date().getTime().toString()
  const today = new Date().getTime().toString()
  const todayDate = new Date().toDateString();
  const invalidMessage = "Please enter at least 3 characters"


  useEffect(() => {
    setDate(todayDate)
  }, [])

  const changeStatus = (id) => {
    let statusTasks = [...tasks]
    statusTasks.map((task) => {
      if (id == task.id) {
        task.status = !task.status
      }
      setTasks(statusTasks)
    })
  }

  const deleteTask = (id) => {
    let filteredDate = [...tasks]
    let deleteTasks = filteredDate.filter((task) => {
      if (id !== task.id) {
        return task
      }
    })
    setTasks(deleteTasks)
  }

  const getText = (text) => {
    setTextTask(text)
  }

  const handleAdd = () => {
    setForm(!form)
    if (form && textTask.length < 3){
      alert(invalidMessage)
    }
    else if (form && textTask !== '') {
      const addTask = [...tasks, { id: id, title: textTask, date: date, status: status }]
      setTasks(addTask)
      console.log(addTask);
    }
    setTextTask('')
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
        centerComponent={{ text: 'To Do Lists', style: { color: '#E7E7CE', fontSize: 20 } }}
        rightComponent={{ text: <Text style={{ color: '#E7E7CE', fontSize: 17 }}>{date}</Text> }}
      />
      <Button buttonStyle={styles.addButton}
        onPress={() => handleAdd()}
        type="clear"
        icon={
          <Icon
            reverse
            name='add-circle'
            color='#17EA41'
            reverseColor="#fff"
          />
        }

      />
      {(form) ? addTaskForm() : true}

      <Divider
        orientation="horizontal"
        subHeader="Your task"
        subHeaderStyle={styles.divider}
      />
      <ScrollView
        style={{
          flexDirection: 'row',
        }}
      >
        {tasks.map((task) => {
          return (
            <View style={styles.header} key={task.id}>
              <Text style={styles.task}>
                {task.title} {"\n"}
                <Text style={styles.textCreated}> created on {date} </Text>
              </Text>
              {(task.status) ?
                <Icon
                  reverse
                  name="check-box"
                  color='#5F661A'
                  onPress={() => changeStatus(task.id)} /> :
                <Icon
                  reverse
                  name='delete-sweep'
                  color='red'
                  onPress={() => deleteTask(task.id)} />}
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6ECEC',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  task: {
    textAlign: 'left',
    backgroundColor: '#C3BDBD',
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    margin: 5,
    color: "#020807",
    width: 260,
    textDecorationLine: 'line-through'
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
  },
  topBar: {
    backgroundColor: '#0C0C00',
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
  textCreated: {
    color: '#610000',
    fontSize: 12,
    textAlign: 'right',
  }

});
