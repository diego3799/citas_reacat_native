import React from 'react';

import { View, Text,StyleSheet, TouchableHighlight } from 'react-native'
const Cita = ({item,borrar}) => {
    return ( 
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.texto}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>
            <View>
            <Text style={styles.label} >Sintomas: </Text>
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={()=>borrar(item.id)}  style={styles.btnEliminar}  >
                    <Text style={styles.textoEliminar}>Eliminar&times;</Text>
                    
                </TouchableHighlight>
            </View>
        </View>
     );
}
const styles=StyleSheet.create({
    cita:{
        backgroundColor:"#fff",
        borderBottomColor:"#e1e1e1",
        borderStyle:"solid",
        borderWidth:1,
        paddingVertical:20,
        paddingHorizontal:10
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:20
    },
    texto:{
        fontSize:18
    },
    btnEliminar:{
        padding:10,
        backgroundColor:'red',
        marginVertical:10
    },
    textoEliminar:{
        color:"#fff",
        textTransform:"uppercase",
        fontWeight:'bold',
        textAlign:'center'
    }
})
 
export default Cita;