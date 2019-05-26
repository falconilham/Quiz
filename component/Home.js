import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Picker} from 'react-native';
import Soal from './Soal.json';

const soal_test = Soal
const soal = 0
export default class Home extends Component {
  constructor() {
    super();
    this.state = { 
      name: '',
      condition: 1,
      soal: Soal,
      soal_i: 0,
      nomor_soal: 1,
      soal_dipakai: Soal[Math.floor(Math.random()*Soal.length)],
      total_soal_dikerjakan: 0,
      nilai: 0,
      jawaban: "",
    }
  }

  //gantisoal
  changeSoal = () =>{
  }
  componentDidMount(){
    //this.getData();
  }

  //Cek User
  cekUser = () =>{
    if (this.state.name === ""){
      alert("Username Tidak Boleh Kosong");
      this.setState({
        condition : 1
      })
    }else{
      this.setState({
        condition : 2
      })
    }
  }
  //cek nilai
  cekNilai = (e, i,item) => {
    if(this.state.total_soal_dikerjakan === 20){
      alert("total nilai anda "+this.state.nilai)
    }else{
      if(item === this.state.soal_dipakai.jawaban_benar){
        this.setState({
          nilai: this.state.nilai + 1 * 10 / 2,
          nomor_soal : this.state.nomor_soal + 1,
        })
      }else{
        this.setState({
          nilai : this.state.nilai + 0 * 10 / 2,
          nomor_soal : this.state.nomor_soal + 1
        })
      }
      this.setState({
        soal_dipakai: this.state.soal[Math.floor(Math.random()*Soal.length)],
        total_soal_dikerjakan : this.state.total_soal_dikerjakan + 1 
      })
    }
  }

  render() {
    {if (this.state.condition === 1){ 
      return (
      <View style={styles.container}>
        <Text style={styles.font_login}>Masukan Nama{this.state.soal.length}</Text>
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
            <Text>{this.state.total_soal_dikerjakan}</Text>
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
