import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';
import Colors from './colors';
import Racer from './components/Racer';

let laps = [
  {name: 'Lap 1', value: '00.00.01'},
  {name: 'Lap 2', value: '00.00.02'},
  {name: 'Lap 3', value: '00.00.03'},
  {name: 'Lap 4', value: '00.00.04'},
]

let ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

let names= [
             'Carl',
             'John',
             'Ryan',
             'John',
             'Shelly',
             'Jane',
          ]

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(laps),
      isRunning: false,
      mainTimer: null,
      mainTimerStart: null
    }
  }
  _renderTitle(){
    return(
      <View style={styles.header}>
        <Text>StopWatch</Text>
      </View>
    );
  }
  _renderTimer(){
    return(
      <View style={styles.timerWrapper}>
        <Text style={styles.mainTimer}>
        { TimeFormatter(this.state.mainTimer) }
        </Text>
      </View>
    );
  }
  _renderButtons(){
    return(
      <View style={styles.buttonWrapper}>
        <TouchableHighlight underlayColor='#777'  style={styles.button}
          onPress={this.handleReset.bind(this)}
        >
          <Text>RESET</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='#777'  style={styles.button}
          onPress={this.handleStartStop.bind(this)}
        >
          <Text style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>
            {this.state.isRunning? 'STOP' : 'START'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderLaps(){
    return(
      <View style={styles.lapsWrapper}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={ (rowData) => (
            <View style={styles.lapRow}>
              <Text style={styles.lapNumber}>{rowData.name}</Text>
              <Text style={styles.lapTime}>{rowData.value}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  deleteRacer(name){
    let index = names.indexOf(name);
    console.log(names);

    if (index > -1) {
        names.splice(index, 1);
    }
    console.log(names);

  }

  _renderRacers(){
    return names.map((data, i) =>{
      return(
        <View key={i} style={{flex:1,}}>
          <TouchableHighlight underlayColor='#777'  style={{backgroundColor: '#fff', width: 20, height: 20, alignItems:'center'}}
            onPress={this.deleteRacer.bind(this,data)}
          >
          <Text>X</Text>
          </TouchableHighlight>

          <Racer key={i} name={data} time={this.state.mainTimer} />
        </View>
      )
    });
  }

  handleStartStop() {
    let { isRunning, firstTime, mainTimer } = this.state;

    //Case1: Stop Button Pressed
    if(isRunning){
      clearInterval(this.interval);
      this.setState({
        isRunning: false
      });
      return;
    }
    //Case 2 Start button pressed
    this.setState({
      mainTimerStart: new Date(),
      isRunning: true
    });

    this.interval = setInterval(() => {
      this.setState({
        mainTimer: new Date() - this.state.mainTimerStart + mainTimer
      });
    }, 30);
  }

  handleReset(){
    let {isRunning, mainTimer, mainTimerStart} = this.state;

    //Case 1 Restart Clicked
    if (mainTimerStart && !isRunning){
      laps: [],
      this.setState({
        mainTimerStart: null,
        mainTimer: 0,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {this._renderTimer()}
          {this._renderButtons()}
        </View>

        <View style={styles.bottom}>
          <ScrollView style={{flex:1,margin: 10, marginTop: 0}}>
            {this._renderRacers()}
          </ScrollView>

        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back,
  },
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  timerWrapper: {
    paddingTop: 5,
    backgroundColor: '#fff',
    borderColor: Colors.back,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .3,
    margin: 10,
    marginTop: 35,
    marginBottom: 5,
  },
  top: {
    flex: 1,
    //borderBottomWidth: 5,
    //borderBottomColor: '#fff',
    backgroundColor: Colors.main2,
    justifyContent: 'space-around',
    paddingBottom: 15,
  },
  bottom: {
    flex: 3,
    zIndex: -20,
  },
  mainTimer: {
    color: Colors.back,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    height: 60,
    width: 80,
    borderRadius: 10,
    borderColor: Colors.back,
    borderWidth: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: .3,
  },
  startBtn: {
    color: '#00cc00',
    fontWeight: 'bold',
  },
  stopBtn: {
    color:'red',
    fontWeight: 'bold',
  },
 
});
