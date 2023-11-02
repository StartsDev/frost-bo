/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, } from '@react-pdf/renderer';
import placeholderSign from  '../../assets/placeholder_sign.png'


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    // backgroundColor: '#E4E4E4',
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 10
  },
    body__container: {
      width: '100%',
      // flexGrow: 1
    },
    
    body__container__header: {
      marginBottom: 35,
      width: '100%',
      // backgroundColor: 'red',
      // flexGrow: 1
    },
    
    body__container__logo: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 100,
      height: 70
    },
    
    body__container__title:{
      textAlign: 'center',
      color: '#072D8D',
      fontSize: '20px',
    },
    
    body__container__subtitle:{
      marginTop: 5,
      textAlign: 'center',
      fontSize: '13px',
      // fontFamily: "Calibri, sans-serif, monospace",
    },
    
    body__container__report: {
      textAlign: 'center',
      fontSize: 11,
      fontWeight: 'extrabold',
      marginBottom: 10
      // fontFamily: "'Calibri', sans-serif, monospace; margin-top: 80px",
    },
    
    body__container__infoCustomer:{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    
    body__container__infoCustomer_2:{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    infoCustomer__container: {
      width: '360px',
      borderRadius: '3px',
      padding: '5px',
    },
    
    body__container__infoCustomer_2__title: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      fontSize: 11,
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: 10,
      textDecoration: 'underline'
    },
    
    body__container__infoCustomer_2__activities__container:{
      width: '100%',
      height: 70,
      backgroundColor:'rgb(240, 239, 239)',
      borderRadius: '5px',
    },
    
    body__container__infoCustomer_2__activities__container__value: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      padding: '5px',
      textAlign: 'justify',
    },
    
    infoCustomer__container__title__column: {
      width: '40%',
      backgroundColor: 'rgb(240, 239, 239)',
      borderRadius: '3px',
      padding: '5px',
      fontWeight: 'semibold',
      fontSize: '8px'
      // fontFamily: "'Calibri', sans-serif, monospace",
    },
    
    infoCustomer__container__title__value:{
      width: '100%',
      // fontFamily: "'Calibri', sans-serif, monospace",
      borderBottom: '1px solid rgb(211, 209, 209)',
      padding: '5px',

      fontSize: '8px'

    },
    parameters__title: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      textAlign: 'center',
    },
    
    parameters__container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    
    parameters__container__table:{
      width: '100%',
      marginRight: '50px',
    },
    
    parameters__container__table__column:{
      width: '50%',
      backgroundColor: 'rgb(240, 239, 239)',
      borderRadius: '3px',
      padding: '5px',
      fontWeight: 'semibold',
      fontSize: '8px',
      // fontFamily: "'Calibri', sans-serif, monospace",
    },
    
    parameters__container__table__value: {
      width: '50%',
      // fontFamily: "'Calibri', sans-serif, monospace",
      borderBottom: '1px solid rgb(211, 209, 209)',
      fontSize: '8px',
      textAlign: 'center',
    },
    
    date__containter__title: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      fontSize: 10,
      marginBottom: 5,
      textDecoration: 'underline'
    },
    
    date__container:{
      display: 'flex',
       flexDirection: 'row',
    },
    
    date__container__values:{
      // fontFamily: "'Calibri', sans-serif, monospace",
      fontSize: '9px',
    },
    
    observations__container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '50px'
    },
    observations__container__title: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      fontSize: 10,
      fontWeight: 'bold',
      marginBottom: 10,
      textDecoration: 'underline',
    },
    
    observations__container__column: {
      width: '100%',
      height: 50,
      backgroundColor:'rgb(240, 239, 239)',
      borderRadius: '5px',
    },
    
    observations__container__value:{
      // fontFamily: "'Calibri', sans-serif, monospace",
      padding: '5px',
      textAlign: 'justify',
    },
    
    sign__container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '70px',
      marginBottom: '100px',
    },
    
    sign__container__box: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '200px',
    },
    
    sign__container__box__img:{
      width: '150px',
      height: '100px',
    },
    
    sign__container__box__sign: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      textAlign: 'center',
      marginTop: '20px',
      fontWeight: 'bold',
    },
    footer: {
      // fontFamily: "'Calibri', sans-serif, monospace",
      fontSize: '8px',
      flexDirection: 'row'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  
});

// Create Document Component
export const MyDocument = ({receivedData=''}: any) => {

  return (
    <Document title='Informe de Mantenimiento'  >
      <Page size="A4" style={styles.page}>
        <View style={styles.body__container__header}>
          <Image source='https://res.cloudinary.com/dlvvul5du/image/upload/v1692652050/logoAAES_wiirme.png' style={styles.body__container__logo}/>
          <Text style={styles.body__container__title}>AIRE APLICADO SAS</Text>
          <Text style={styles.body__container__subtitle}>Especialistas en soluciones</Text>
        </View>
        <Text style={styles.body__container__report}>INFORME DE SERVICIO</Text>
            <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
              <View style={styles.infoCustomer__container}>
                <View style={{width: '100%'}}>
                  <View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Cliente:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Cliente']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Sede:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Sede']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Ciudad:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Ciudad']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Contacto:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Contacto cliente']}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.infoCustomer__container}>
                <View style={{width: '100%'}}>
                  <View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Orden de Trabajo:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Orden de trabajo']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Tipo de Equipo:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Tipo']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Ubicación:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Ubicación']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.infoCustomer__container__title__column}>Marca / Modelo:</Text>
                      <Text style={styles.infoCustomer__container__title__value}>{receivedData['Marca']} {receivedData['Serial y Modelo']}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{textAlign: 'center'}}>
              <Text style={styles.body__container__infoCustomer_2__title}>Actividades Ejecutadas</Text>
              <View style={styles.body__container__infoCustomer_2__activities__container}>
                <Text style={{padding: '5px', textAlign: 'justify', fontSize: '10px'}}>
                  {receivedData.Actividades}
                </Text>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <Text style={{textAlign: 'center', fontSize: 11, fontWeight: 'bold', marginTop: 10, marginBottom: 10, textDecoration: 'underline'}}>Parametros de Operación</Text>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.parameters__container__table}>
                  <View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>V. Entrada L1L2:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Voltaje en L1L2']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>V. Entrada L1L3:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Voltaje en L1L3']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>V. Entrada L2L3:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Voltaje en L2L3']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Compresor 1 Amp. L1:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Compresor 1 amp L1']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Compresor 1 Amp. L2:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Compresor 1 amp L2']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Compresor 1 Amp. L3:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Compresor 1 amp L3']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Compresor 2 Amp. L1:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Compresor 2 amp L1']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Compresor 2 Amp. L2:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Compresor 2 amp L2']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Compresor 2 Amp. L3:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Compresor 3 amp L3']}</Text>
                    </View>
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Amp. Motor 1:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Amp motor 1']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Amp. Motor 2:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Amp motor 2']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Amp. Motor 3:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Amp motor 3']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Amp. Motor Evap:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Amp motor evap']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Voltaje Control:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Control de voltaje']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Temp. Suminsitro:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Temperatura de suministro']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Temp. Retorno:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Temperatura agua salida']}</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Presión Succión:</Text>
                      <Text style={styles.parameters__container__table__value}>suctionPressure</Text>
                    </View>
                    <View style={{marginBottom: '3px', flexDirection: 'row'}}>
                      <Text style={styles.parameters__container__table__column}>Presión Descarga:</Text>
                      <Text style={styles.parameters__container__table__value}>{receivedData['Descarga de presión']}</Text>
                    </View>
                  </View>
                </View>
  
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Text style={styles.date__containter__title}>Fecha y hora de ejecución del servicio</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.date__container__values}>{receivedData['Fecha Servicio']}</Text>
                <Text style={{marginLeft: "20px", marginRight: '20px', fontSize: '8px'}}>-</Text>
                <Text style={styles.date__container__values}>{receivedData['Hora Servicio']}</Text>
              </View>
            </View>
            <View style={{width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
              <Text style={styles.observations__container__title}>Observaciones adicionales</Text>
              <View style={styles.observations__container__column}>
                <Text style={{padding: '5px', textAlign: 'justify', fontSize: '8px'}}>
                  {receivedData['Observaciones']}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 20}}>
              <View style={{flexDirection: 'column', marginRight: '200px'}}>
                <Image source={receivedData['Firma técnico'] === null || receivedData['Firma técnico'] === ""  ? placeholderSign : receivedData['Firma técnico']} style={styles.sign__container__box__img}/>
                <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 10}}>Firma tecnico</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'column', marginRight: '200px'}}>
                <Image source={receivedData['Firma cliente'] === null  || receivedData['Firma cliente'] === "" ? placeholderSign : receivedData['Firma cliente']} style={styles.sign__container__box__img}/>
                <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 10}}>Firma cliente</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.footer}>Informe generado el:</Text>
              <Text style={styles.footer}>{new Date().toLocaleDateString()}</Text>
            </View>
      </Page>
    </Document>
  );

}
