/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, Fragment } from 'react';
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



const App= () => {
  const [show,setShow]=useState(true);
  const [citas,setCitas]=useState([
    {id:'1', paciente:'Hook', propietario:'Juan', sintomas:'no Come'},

    {id:'2', paciente:'Redux', propietario:'Diego', sintomas:'no duerme'},

    {id:'3', paciente:'Native', propietario:'Luis', sintomas:'no vive'},
  ])
  const borrar=(id)=>{object
    setCitas(citasActuales=>citasActuales.filter(item=>item.id!==id));
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
              <Formulario setCitas={setCitas} citas={citas} setShow={setShow}/>
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
