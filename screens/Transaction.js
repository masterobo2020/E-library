import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Image} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";
import { Button } from "react-native-web";
import db from '../config.js';

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png")

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      bookId: "",
      studentId: "",
    }
  }

  getCameraPermissions=async domState =>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status==="granted",
      domState: domState,
      scanned: false,
    })
  }

  handleBarCodeScanned=async({ type,data })=>{
    const {domState}=this.state;
    if (domState==="bookId"){
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      })
    }
    else if (domState==="studentId"){
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      })
    }   
  }

  handleTransaction=()=>{
    var {bookId}=this.state;
    db.collection("Books")
    .doc(bookId)
    .get()
    .then(doc => {
      var book=doc.data();
      if (book.is_Book_Available){
        this.initiateBookIssue();
      }
      else{
        this.initiateBookReturn();
      }
    })
  }

  initiateBookIssue=()=>{
    console.log("Book Issued to the Student");
  }

  initiateBookReturn=()=>{
    console.log("Book Returned to the Library");
  }

  render() {
    const {domState, scanned, bookId, studentId}=this.state;
    if (domState!=="normal"){
      return (
        <BarCodeScanner
        onBarCodeScanned = {scanned? undefined: this.handleBarCodeScanned()}
        style={StyleSheet.absoluteFillObject}/>
      )
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View styles={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon}/>
            <Image source={appName} style={styles.appName}/>
            </View>
          <View style={styles.lowerContainer}>            
            <View style={styles.textInputConainer}>
          <TextInput
          style={styles.textInput}
          placeholder={"Book Id"}
          placeholderTextColor={"#ffffff"}
          value={bookId}/>
          <TouchableOpacity style={styles.scanButton}
            onPress={()=> this.getCameraPermissions("bookId")}>
            <Text style={styles.scanButtonText}>Scan</Text> 
          </TouchableOpacity>
          </View>
          <View style={[styles.textInputConainer, {marginTop: 25}]}>
            <TextInput 
            style={styles.textInput}
            placeholder={"Student Id"}
            placeholderTextColor={"#ffffff"}
            value={studentId}/>
          <TouchableOpacity style={styles.scanButton}
            onPress={()=> this.getCameraPermissions("studentId")}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
        style = {[styles.button, {marginTop: 25}]}
        onPress={this.handleTransaction}>
          <Text style = {styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F48D20",
    borderRadius: 15,
  },
  btnText:{
    fontSize: 24,
    color: "#ffffff"
  },
  textInputConainer:{
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#ffffff",
  },
  textInput: { 
    width: "57%", 
    height: 50, 
    padding: 10, 
    borderColor: "#FFFFFF", 
    borderRadius: 10, 
    borderWidth: 3, 
    fontSize: 18, 
    backgroundColor: "#5653D4", 
    fontFamily: "Rajdhani_600SemiBold", 
    color: "#FFFFFF" 
  }, 
  scanButton: { 
    width: 100, 
    height: 50, 
    backgroundColor: "#9DFD24", 
    borderTopRightRadius: 10, 
    borderBottomRightRadius: 10, 
    justifyContent: "center", 
    alignItems: "center" 
  }, 
  scanButtonText: { 
    fontSize: 24, 
    color: "#0A0101", 
    fontFamily: "Rajdhani_600SemiBold" 
  },
  bgImage: { 
    flex: 1, 
    resizeMode: "cover", 
    justifyContent: "center" 
  }, 
  upperContainer: { 
    flex: 0.5,
    justifyContent: "center", 
    alignItems: "center" 
  }, 
  appIcon: {
     width: 200, 
     height: 200, 
     resizeMode: "contain",
    marginTop: 80 
  }, 
  appName: { 
    width: 80, 
    height: 80, 
    resizeMode: "contain" 
  }, 
  lowerContainer: { 
    flex: 0.5,
    alignItems: "center" 
  },
  button:{
    width: '43%',
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15,
  },
  buttonText:{
    fontSize: 24,
    color: "#ffffff",
    fontFamily: "Rajdhani_600SemiBold",
  }
});
