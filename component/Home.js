import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Picker} from 'react-native';
import Soal from './Soal.json';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { 
      name: '',
      condition: 1,
      soal: Soal,
      nomor_soal: 1,
      soal_dipakai: Soal[Math.floor(Math.random()*Soal.length)],
      total_soal_dikerjakan: 0,
      soal_test:[] ,
      nilai: 0,
      jawaban: "",
    }
    this.getData()
  }

  getData(){
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
    if(this.state.total_soal_dikerjakan === 19){
      this.setState({
        condition : 3
      })
    }
  }

  render() {
    {if(this.state.condition === 1){ 
      return (
      <View style={styles.container}>
        <Text style={styles.font_login}>Masukan Nama{this.state.soal_test[0]}</Text>
        <TextInput style={styles.login_name} onChangeText={(name) => this.setState({name})} placeholder="Input Nama Anda" />
        <Button color="#a3a2f1" title="login" type="clear" onPress={() => this.cekUser()} />
      </View>
      )}else if(this.state.condition == 2){ 
        return (
      <View style={{flex: 1, flexDirection: "column"}}>
        <Text style={{fontWeight: "bold", justifyContent:"center", alignSelf:"center", color: "blue", marginBottom: 20}}>Silakan Mengerjakan {this.state.name}</Text>
        <Text>{this.state.nomor_soal}.{this.state.soal_dipakai.Soal}</Text>
          {this.state.soal_dipakai.jawaban.map((item, i ) => {
          return(
          <View key={i} style={{ backgroundColor: "white"}}>
            <Text>{String.fromCharCode(i + 1 + 64)}</Text>
            <Button onPress={() => this.cekNilai(this, i, item)} title={item} />
          </View>
          )
          })}
      </View>
      )}else{
        return (
        <View style={styles.container}>
          <Text>nilai Anda {this.state.nilai}</Text>
          { this.state.nilai < 50 ? (
            <Text>Anda Bodoh Sekali</Text>
          ):(
            <Text>OK</Text>
          )
          }
          <Button title="Reset" onPress={() => this.setState({ condition : 1, nomor_soal: 1, name : "", nilai: 0, total_soal_dikerjakan: 0})} />
        </View>
        )
      }
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
