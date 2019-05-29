import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Picker} from 'react-native';
import Soal from './Soal.json';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { 
      name: '',
      condition: 1,
      nomor_soal: 1,
      total_soal_dikerjakan: 0,
      soal_dipakai: Soal.slice(),
      current: Math.floor(Math.random()*33),
      nilai: 0,
      jawaban: "",
    }
  }

  componentDidMount = () => {
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
    if(item === this.state.soal_dipakai[this.state.current].jawaban_benar){
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
    this.state.soal_dipakai.splice(this.state.current, 1)
    this.setState({
      current: Math.floor(Math.random() * this.state.soal_dipakai.length),
      total_soal_dikerjakan : this.state.total_soal_dikerjakan + 1 
    })
    if(this.state.total_soal_dikerjakan === 19){
      this.setState({
        condition : 3
      })
    }
  }
  
  render() 
  {
    {if(this.state.condition === 1){ 
      return (
      <View style={styles.container}>
        <View style={styles.form_login}>
          <Text style={styles.font_login}>Masukan Nama</Text>
          <TextInput style={styles.login_name} onChangeText={(name) => this.setState({name})} placeholder="Input Nama Anda" />
          <Button color="#a3a2f1" title="login" type="clear" onPress={() => this.cekUser()} />
        </View>
      </View>
      )}else if(this.state.condition == 2){ 
        return (
      <View style={styles.container}>
        <View style={styles.form_login}>
          <Text style={{fontWeight: "bold", justifyContent:"center", alignSelf:"center", color: "blue", marginBottom: 20}}>Silakan Mengerjakan {this.state.name}</Text>
          <Text>{this.state.nomor_soal}.{this.state.soal_dipakai[this.state.current].Soal}</Text>
          <View style={{flex : 1, flexDirection: 'row', flexWrap: "wrap", alignItems: 'flex-start', justifyContent: "space-around"}}>
            {this.state.soal_dipakai[this.state.current].jawaban.map((item, i ) => {
            return(
            <View key={i} style={{width: "35%", margin: 10}}>
              <Text>{String.fromCharCode(i + 1 + 64)}</Text>
              <Button onPress={() => this.cekNilai(this, i, item)} title={item} />
            </View>
            )
            })}
          </View>
        </View>
      </View>
      )}else{
        return (
        <View style={styles.container}>
          <View style={styles.form_login}>
            <Text>nilai Anda {this.state.nilai}</Text>
              <View style={{marginVertical: 25}}>
              { this.state.nilai < 50 && this.state.nilai > 20 ? (
                <Text>Coba lebih teliti</Text>
              ): this.state.nilai > 49 && this.state.nilai < 61 ? (
                <Text>Usaha yang bagus</Text>
              ): this.state.nilai > 60 && this.state.nilai < 80 ? (
                <Text>Hebat sekali</Text>
              ): this.state.nilai > 79 && this.state.nilai < 100 ? (
                <Text>Luar Biasa</Text>
              ): this.state.nilai === 100 ? (
                <Text>Kerja yang bagus,Pertahankan.</Text>
              ):(
                <Text>Belajar lebih giat lagi</Text>
              )
              }
              </View>
            <Button title="Reset" style={{marginVertical: 25}} onPress={() => this.setState({ condition : 1, nomor_soal: 1, name : "", nilai: 0, total_soal_dikerjakan: 0, soal_dipakai: Soal.slice()})} />
          </View>
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
    backgroundColor : "#20639B"
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
    fontSize: 10,
    marginVertical: 25,
  },
  button_login:{
    width: "30%",
  },
  font_login:{
    color:"black"
  },
  form_login:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white",
    height: "50%",
    width: "80%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset :{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  }
});
