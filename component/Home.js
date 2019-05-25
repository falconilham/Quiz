import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Picker} from 'react-native';
import * as Soal from './Soal.json';

const soal_test = Soal
const soal = 0
export default class Home extends Component {
  constructor() {
    super();
    this.state = { 
      name: '',
      condition: 1,
      soal: soal_test,
      soal_i: 0,
      nomor_soal: 1,
      soal_dipakai: soal_test[0],
      nilai: 0,
      jawaban: "",
    }
  }

  getData(){
    return fetch(Soal)
    .then((response) => response.json())
    .then((res) => {  
      alert(res);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
      //this.getData();
  }
  cekUser = () =>{
    if (this.state.name === ""){
      alert("user Tidak Boleh Kosong");
      this.setState({
        condition : 1
      })
    }else{
      this.setState({
        condition : 2
      })
    }
  }
  cekNilai = (e, i,item) => {
    if(item === this.state.soal_dipakai.jawaban_benar){
      this.setState({
        nilai: this.state.nilai + 1 * 10,
        soal_i : this.state.soal_i + 1,
        nomor_soal : this.state.nomor_soal + 1 
      })
    }else{
      this.setState({
        nilai : this.state.nilai + 0 * 10,
        soal_i : this.state.soal_i + 1,
        nomor_soal : this.state.nomor_soal + 1
      })
    }
    this.setState({
      soal_dipakai: soal_test[this.state.soal_i + 1]
    })
  }

  render() {
    {if (this.state.condition === 1){ 
      return (
      <View style={styles.container}>
        <Text style={styles.font_login}>Masukan Nama </Text>
        <TextInput style={styles.login_name} onChangeText={(name) => this.setState({name})} placeholder="Input Nama Anda" />
        <Button color="#a3a2f1" title="login" type="clear" onPress={() => this.cekUser()} />
      </View>
      )}else {
        return (
      <View>
        <Text>Silakan Mengerjakan {this.state.name}</Text>
        <Button title="Ganti Nama" width="10" onPress={() => this.setState({condition : 1})} />
        <Text>{this.state.nomor_soal}.{this.state.soal_dipakai.Soal}</Text>
          {this.state.soal_dipakai.jawaban.map((item, i ) => {
          return(
          <View key={i} style={{ justifyContent: 'center', alignItems: "center"}}>
            <Text>{i.toString(26).toUpperCase()}</Text>
            <Button onPress={() => this.cekNilai(this, i, item)} title={item} />
          </View>
          )
          })}
          <View style={{fontSize: 50, justifyContent: 'center', alignItems: "center"}}>
            <Text>Nilai Anda</Text>
            <Text>{this.state.nilai}</Text>
          </View>
      </View>
      )}
    }
  }
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#60c7e6"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: "blue"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  login_name: {
    height: 40,
    backgroundColor: "red",
    width: "80%",
    margin: 10,
    backgroundColor:"#eae9e9",
    color:"grey"
  },
  button_login:{
    width: "30%",
  },
  font_login:{
    color:"black"
  }
});
