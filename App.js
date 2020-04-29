/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, Fragment, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-community/async-storage'

const App= () => {
  const [show,setShow]=useState(false);
  const [citas,setCitas]=useState([])
  const borrar=async(id)=>{
    const nuevo=citas.filter(item=>item.id!==id)
    setCitas(nuevo);
    guardarCitasStorage(JSON.stringify(nuevo))

  }
  useEffect(()=>{
    const obtenerCitas=async()=>{
      try {
        const r=await AsyncStorage.getItem('citas');
        if(r){
          setCitas(JSON.pxarse(r));
        }
        // console.log(r)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCitas()
  },[])
  const guardarCitasStorage=async(citasJson)=>{
    try {
      await AsyncStorage.setItem('citas',citasJson)
    } catch (error) {
      console.log(error)
    }
  }
  const cerrarTeclado=()=>{
    Keyboard.dismiss();
  }
  
  return (
    <TouchableWithoutFeedback onPress={cerrarTeclado}>

      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Administrador de Citas</Text>
        <TouchableOpacity onPress={()=>setShow(!show)}  style={styles.btnSubmit}  >
                      <Text style={styles.textoSubmit}> {!show?"Mostrar Formulario":"Mostrar Citas"} </Text>
        </TouchableOpacity>
        <View style={styles.contenido}>
          {show?(
            <Fragment>
              <Text style={styles.titulo} > Crear Nueva Cita</Text>
              <Formulario setCitas={setCitas} guardarCitasStorage={guardarCitasStorage} citas={citas} setShow={setShow}/>
            </Fragment>
          ):(
            <Fragment>
              <Text style={styles.titulo} > {citas.length>0?"Administra tus citas":"No hay citas Agrega Una"}</Text>
              
              <FlatList
              style={styles.listado}
                data={citas}
                renderItem={({item})=> <Cita item={item}  borrar={borrar}/>}
                keyExtractor={cita=>cita.id}
              />
            </Fragment>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles=StyleSheet.create({
  titulo:{
    textAlign:'center',
    marginTop:Platform.OS==="ios"? 40:20,
    fontSize:24,
    color:'#fff',
    fontWeight:'bold',
    marginBottom:20
  },
  btnSubmit:{
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical:10
  },
  textoSubmit:{
      color:"#fff",
      textTransform:"uppercase",
      fontWeight:'bold',
      textAlign:'center'
  },
  contenedor:{
    backgroundColor:"#aa076b",
    flex:1, 
  },
  contenido:{
    flex:1,
    marginHorizontal:"2.5%",
  },
  listado:{
    flex:1,

  }
})

export default App;
