import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { normalizeRect } from "react-native/Libraries/StyleSheet/Rect";

export default class Transaction extends Component {
  constructor(){
    super()
    this.state= {domState:"normal",hasCameraPermission:null, scanned:false, scannedData:""}
  }
  getCameraPermissions = async(domState)=>{
    const{status}= await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission:status==="granted", scanned:false, domState:domState})
    console.log(status)
  }
  handledBarcodeScan = async({type,data})=>{
    console.log(type+data)
    this.setState({scannedData:data, domState:"normal", scanned:true})
  }
  render() {
    const{hasCameraPermission,scannedData,domState,scanned}= this.state
    if(domState==="scanner"){
      return(
        <BarCodeScanner onBarCodeScanned={scanned ? undefined: this.handledBarcodeScan} style={StyleSheet.absoluteFillObject}></BarCodeScanner>
      )
    }
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('images/appIcon.png')} />
        <Text>{hasCameraPermission?scannedData:"Request for Camera Permission"}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: 150,
            height: 30,
            borderRadius: 20,
          }}
          onPress={() => this.getCameraPermissions('scanner')}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Scan QR CODE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
