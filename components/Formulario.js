import React, { Fragment, useState } from 'react';

import { Text,StyleSheet,View, TextInput,Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';
const Formulario = ({setCitas,citas,setShow}) => {
    const [paciente,setPaciente]=useState('')
    const [propietario,setPropietario]=useState('')
    const [telefono,setTelefono]=useState('')
    const [sintomas,setSintomas]=useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [fecha,setFecha]=useState();
    const [hora,setHora]=useState();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);

    hideDatePicker();
    const conf={year:'numeric',month:'long',day:'2-digit'};
    setFecha(date.toLocaleDateString('es-ES',conf))
  };
  /**Time Picker */
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (hora) => {
    // console.warn("A date has been picked: ", date);
    hideTimePicker();
    const conf={hour:'numeric',minute:'2-digit'};
    setHora(hora.toLocaleString('en-US',conf))
  };
  const crearCita=()=>{
    
      /**TODO:Validar formulario */
      if(
          paciente.trim()===""||
          propietario.trim()==""||
          telefono.trim()===""||
          fecha.trim()===""||
          sintomas.trim()===""
      ){
        //   console.log("Error")
          mostrarAlerta()
          return ;
      }
      const cita={
          id:shortid.generate(),
          paciente,
          propietario,
          telefono,
          hora,
          sintomas
      }
    //   console.log(cita)
      setCitas([...citas,cita]);
      setShow(false);


  }
  const mostrarAlerta=()=>{
      Alert.alert(
          "Error",
          "Todos los campos son obligatorios",
          [
              {
                  text:'ok'
              },{

              }
          ]
      )
  }
    return (
        <Fragment>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente</Text>
                    <TextInput
                    onChangeText={e=>setPaciente(e)}
                    style={styles.input}
                    value={paciente}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño</Text>
                    <TextInput
                    onChangeText={e=>setPropietario(e)}
                    style={styles.input}
                    value={propietario}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono Contacto:</Text>
                    <TextInput
                    onChangeText={e=>setTelefono(e)}
                    style={styles.input}
                    value={telefono}
                    keyboardType='numeric'
                    />
                </View>
                <View>
                <Text style={styles.label}>Elegir Fecha:</Text>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        // locale='es_ES'
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                <Text style={styles.label}>Elegir Hora:</Text>
                <Button title="Show Time Picker" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode='time'
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        // locale='es_ES'
                    />
                </View>
                        <Text>{hora}</Text>
                <View>
                    <Text style={styles.label}>Síntomas:</Text>
                    <TextInput
                    multiline
                    onChangeText={e=>setSintomas(e)}
                    style={styles.input}
                    value={sintomas}
                    // keyboardType='numeric'
                    
                    />
                </View>
                <TouchableOpacity onPress={crearCita}  style={styles.btnSubmit}  >
                    <Text style={styles.textoSubmit}> Enviar </Text>
                </TouchableOpacity>
                
                
            </ScrollView>
        </Fragment>
    )
}
const styles=StyleSheet.create({
    formulario:{
        backgroundColor:"#fff",
        paddingHorizontal:20,
        paddingVertical:10,

    },  
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:20
    },
    input:{
        marginTop:20,
        height:50,
        borderColor:"#e1e1e1",
        borderWidth:1,
        borderStyle:'solid'
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
    }
})
export default Formulario;