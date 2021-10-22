import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { Button, Header, Divider, Text } from 'react-native-elements';
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [date, setDate] = useState("")
  const [form, setForm] = useState(false)
  const [status, setStatus] = useState(true)
  const [textTask, setTextTask] = useState('')
  const [tasks, setTasks] = useState([])

  const id = new Date().getTime().toString()
  const today = new Date()
  const todayDate = new Date().toDateString();
  const invalidMessage = "Please enter at least 3 characters"


  useEffect(() => {
    setDate(todayDate)
    loadData()
  }, [])

  const changeStatus = async (id) => {
    let statusTasks = [...tasks]
    statusTasks.map((task) => {
      if (id == task.id) {
        task.status = !task.status
        try {
          AsyncStorage.removeItem("listItems")
          AsyncStorage.setItem("listItems", JSON.stringify(statusTasks))
        } catch (error) {
          alert(error)
        }
      }
    })
    setTasks(statusTasks)
  }


  const deleteTask = async (task) => {
    const newData = tasks.filter((item) => item.id != task)
    setTasks(newData)
    try {
      await AsyncStorage.removeItem("listItems")
      await AsyncStorage.setItem("listItems", JSON.stringify(newData))
    } catch (error) {
      alert(error)
    }
  }

  const getText = (text) => {
    setTextTask(text)
  }

  const handleAdd = async () => {
    setForm(!form)
    if (form && textTask.length < 3) {
      alert(invalidMessage)
    }
    else if (form && textTask !== '') {
      const addTask = [...tasks, { id: id, title: textTask, date: date, status: status }]
      setTasks(addTask)
      console.log(addTask);
      try {
        console.log(tasks);
        const jsonValue = JSON.stringify(addTask)
        await AsyncStorage.setItem('listItems', jsonValue)
        console.log("Successful Added to listItems");
        console.log("Json value is" + jsonValue);
      } catch (error) {

      }
    }
    setTextTask('')
  }

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('listItems')
      return jsonValue != null ? setTasks(JSON.parse(jsonValue)) : null;
    } catch (error) {
      alert(error)
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
          {/* <DateTimePicker
            value={today}
            display="default" /> */}
        </View>
        <Button
          type="clear"
          icon={
            <Icon
              onPress={() => setForm(!form)}
              reverse
              name='close'
              color='#C80303'
              reverseColor="#fff"
            />
          }
        />
      </>
    )
  }

  const Task = () => {
    return (
      tasks.map((task) => {
        return (
          <View style={styles.header} key={task.id}>
            <Text style={[styles.task, (!task.status) ? styles.completeTask : false]}>
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
      })
    )
  }

  //Main code 
  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.topBar}
        placement='left'
        centerComponent={{ text: 'To Do Lists', style: { color: '#E7E7CE', fontSize: 20, fontFamily: "Cochin" } }}
        rightComponent={{ text: <Text style={{ color: '#E7E7CE', fontSize: 17, fontFamily: "Cochin" }}>{date}</Text> }}
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
      <Divider orientation="vertical" />
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
        {(tasks.length === 0) ?
          <Text style={styles.noDataText} h4> Well done! there is no tasks left</Text>

          : <Task />

        }
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
  },
  completeTask: {
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
    fontSize: 30,
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
  },
  noDataText: {
    textAlign: 'center',
    backgroundColor: '#C3BDBD',
    paddingVertical: 12,
    paddingHorizontal: 10,
    margin: 5,
    width: 350
  }

});
