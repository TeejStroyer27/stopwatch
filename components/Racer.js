import React, {Component} from 'react';
import { View, Text, Button, TouchableHighlight, ListView, ScrollView } from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';
import Colors from '../colors';


export default class Racer extends Component{
  constructor(props) {
    super(props);
    this.state={
      time: null,
      splits: []
    };
  }

  
  componentWillReceiveProps(newProps) {
    if(newProps.time) {
      this.setState({time: newProps.time});
    } 
  }

  newSplit(time){
    if(time){
      let newTimes = this.state.splits.slice()
      newTimes.push(this.state.time)
      this.setState({splits: newTimes});
    }
  }
  
  _renderSplits(){
    return this.state.splits.slice(0).reverse().map((data,i) =>{
      return(
        <Text key={i} style={{color: Colors.back, fontSize: 30, alignSelf: 'flex-end'}}>
          {TimeFormatter(data)}
        </Text>
      )
    });
  }

  reset(){
    this.setState({splits:[]});
  }

  render(){
    return(
      <View style = {styles.container}>
        <View style = {{flexDirection: 'row', justifyContent:'space-around'}}>
          <Text style={styles.racerName}>{this.props.name}</Text>
          <TouchableHighlight style={{alignItems: 'center'}} onPress={() => this.reset()}>
              <Text style={styles.reset}>Reset</Text>
          </TouchableHighlight>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight style={styles.splitButton} onPress={() => this.newSplit(this.state.time)}>
            <Text style={styles.splitText}>SPLIT</Text>
          </TouchableHighlight>
          
          <ScrollView style={styles.splits}>
            {this._renderSplits()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: Colors.main1/*'#0DFFCE'*/,
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,

    shadowColor:'#000', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,

  },
  racerName: {
    flex: 1,
    fontSize: 20,
    color: Colors.back,
    fontWeight: 'bold',
    marginBottom: 10
  
  },
  splitButton: {
    flex: 1,
    backgroundColor: Colors.main2,
    borderRadius: 20,
    margin: 1,
    borderRadius: 10,
    borderColor: Colors.back,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: .1,
  },
  splitText:{
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
  reset: {
    color: '#fff',
    fontWeight: 'bold',
    borderWidth: .5,
    padding: 2,
    backgroundColor: Colors.back,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: .3,
  },
  splits: {
    height: 50,
    flex: 2,
    backgroundColor: '#fff',
    borderColor: Colors.back,
    borderWidth: 1.5,
  }
}
