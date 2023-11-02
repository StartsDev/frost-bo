import React from 'react';
import logoImported from '../../assets/logo.png';
import './style.css'

export interface PdfParameters {
  logo: string;
  ot:string;
  type: string;
  customer: string;
  city: string;
  contact: string;
  headQuarter: string;
  location: string;
  brand: string;
  reference: string;
  activities: string;
  voltajel1l2?: string;
  voltajel1l3?: string;
  voltajel2l3?: string;
  compressor1l1?: string;
  compressor1l2?: string;
  compressor1l3?: string;
  compressor2l1?: string;
  compressor2l2?: string;
  compressor2l3?: string;
  ampEngine1?: string;
  ampEngine2?: string;
  ampEngine3?: string;
  ampEngine4?: string;
  voltageControl?: string;
  temperatureEntrance?: string;
  temperatureExit?: string;
  dischargedPressure?: string;
  suctionPressure?: string;
  sprinklerStatus?: string;
  floatStatus?: string;
  waterTempIn?: string;
  waterTempOut?: string;
  date: string;
  hour: string;
  customerSign?: string;
  techSign?:string;
  evapMotor?: string
  observations?: string;
}


export const HtmlTemplate = ({
  logo,
  ot,
  type,
  customer,
  contact,
  activities,
  brand,
  city,
  date,
  headQuarter,
  hour,
  location,
  reference,
  techSign,
  ampEngine1 = 'n/a',
  ampEngine2 = 'n/a',
  ampEngine3 = 'n/a',
  // ampEngine4 = 'n/a',
  compressor1l1 = 'n/a',
  compressor1l2 = 'n/a',
  compressor1l3 = 'n/a',
  compressor2l1 = 'n/a',
  compressor2l2 = 'n/a',
  compressor2l3 = 'n/a',
  customerSign = '-',
  dischargedPressure = 'n/a',
  suctionPressure = 'n/a',
  temperatureEntrance = 'n/a',
  temperatureExit = 'n/a',
  voltageControl = 'n/a',
  voltajel1l2 = 'n/a',
  voltajel1l3 = 'n/a',
  voltajel2l3 = 'n/a',
  evapMotor = 'n/a',
  // sprinklerStatus = 'n/a',
  // floatStatus = 'n/a',
  // waterTempIn = 'n/a',
  // waterTempOut = 'n/a',
  observations = '',
}: PdfParameters) => {
  // console.log(logo);
  return (
    <>
      <div>
        {/* <head> */}
          {/* <meta charset="UTF-8"/> */}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}
          {/* <title>Informe de Mantenimiento</title> */}
        {/* </head> */}
        <body className='body__container'>
          <div className='body__container__header'>
            <img src={logo} alt="logo" className='body__container__logo'/>
            <h1 className='body__container__title'>AIRE APLICADO SAS</h1>
            <h2 className='body__container__subtitle' >Especialistas en soluciones</h2>
          </div>
          <h4 className='body__container__report'>INFORME DE SERVICIO</h4>
          <div className="body__container__infoCustomer">
            <div className='infoCustomer__container'>
              <table style={{width: '100%'}}>
                <tbody>
                  <tr style={{marginBottom: '3px'}}>
                    <td className='infoCustomer__container__title__column'>Cliente:</td>
                    <td className='infoCustomer__container__title__value'>{customer}</td>
                  </tr>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Sede:</td>
                    <td className='infoCustomer__container__title__value'>{headQuarter}</td>
                  </tr>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Ciudad:</td>
                    <td className='infoCustomer__container__title__value'>{city ? city : '---'}</td>
                  </tr>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Contacto:</td>
                    <td className='infoCustomer__container__title__value'>{contact}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='infoCustomer__container'>
              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Orden de Trabajo:</td>
                    <td className='infoCustomer__container__title__value'>{ot}</td>
                  </tr>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Tipo de Equipo:</td>
                    <td className='infoCustomer__container__title__value'>{type}</td>
                  </tr>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Ubicación:</td>
                    <td className='infoCustomer__container__title__value'>{location}</td>
                  </tr>
                  <tr>
                    <td className='infoCustomer__container__title__column'>Marca / Modelo:</td>
                    <td className='infoCustomer__container__title__value'>{brand} ${reference}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="body__container__infoCustomer_2">
            <h4 className='body__container__infoCustomer_2__title'>Actividades Ejecutadas</h4>
            <div className='body__container__infoCustomer_2__activities__container'>
              <span className='body__container__infoCustomer_2__activities__container__value'>
                {activities}
              </span>
            </div>
          </div>
          <div style={{width: '100%'}}>
            <h4 className='parameters__title'>Parametros de Operación</h4>
            <div className='parameters__container'>
              <table className="parameters__container__table">
                <tbody>
                  <tr>
                    <td className='parameters__container__table__column'>V. Entrada L1L2:</td>
                    <td className='parameters__container__table__value'>{voltajel1l2}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>V. Entrada L1L3:</td>
                    <td className='parameters__container__table__value'>{voltajel1l3}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>V. Entrada L2L3:</td>
                    <td className='parameters__container__table__value'>{voltajel2l3}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Compresor 1 Amp. L1:</td>
                    <td className='parameters__container__table__value'>{compressor1l1}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Compresor 1 Amp. L2:</td>
                    <td className='parameters__container__table__value'>{compressor1l2}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Compresor 1 Amp. L3:</td>
                    <td className='parameters__container__table__value'>{compressor1l3}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Compresor 2 Amp. L1:</td>
                    <td className='parameters__container__table__value'>{compressor2l1}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Compresor 2 Amp. L2:</td>
                    <td className='parameters__container__table__value'>{compressor2l2}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Compresor 2 Amp. L3:</td>
                    <td className='parameters__container__table__value'>{compressor2l3}</td>
                  </tr>
                </tbody>
              </table>
              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <td className='parameters__container__table__column'>Amp. Motor 1:</td>
                    <td className='parameters__container__table__value'>{ampEngine1}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Amp. Motor 2:</td>
                    <td className='parameters__container__table__value'>{ampEngine2}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Amp. Motor 3:</td>
                    <td className='parameters__container__table__value'>{ampEngine3}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Amp. Motor Evap:</td>
                    <td className='parameters__container__table__value'>{evapMotor}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Voltaje Control:</td>
                    <td className='parameters__container__table__value'>{voltageControl}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Temp. Suminsitro:</td>
                    <td className='parameters__container__table__value'>{temperatureEntrance}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Temp. Retorno:</td>
                    <td className='parameters__container__table__value'>{temperatureExit}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Presión Succión:</td>
                    <td className='parameters__container__table__value'>{suctionPressure}</td>
                  </tr>
                  <tr>
                    <td className='parameters__container__table__column'>Presión Descarga:</td>
                    <td className='parameters__container__table__value'>{dischargedPressure}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
          <div style={{marginTop: '30px'}}>
            <h4 className='date__containter__title'>Fecha y hora de ejecución del servicio</h4>
            <div className='date__container'>
              <span className='date__container__values'>{date}</span>
              <span style={{marginInline: "20px;"}}>-</span>
              <span className='date__container__values'>{hour}</span>
            </div>
          </div>
          <div className='observations__container'>
            <h4 className='observations__container__title'>Observaciones adicionales</h4>
            <div className='observations__container__column'>
              <span className='observations__container__value'>
                {observations}
              </span>
            </div>
          </div>
          <div className='sign__container'>
            <div className='sign__container__box'>
              <img src={techSign} alt="tech-sign" className='sign__container__box__img'/>
              <span className='sign__container__box__sign'>Firma tecnico</span>
            </div>
            <div className='sign__container__box'>
              <img src={customerSign} alt="customer-sign" className='sign__container__box__img'/>
              <span className='sign__container__box__sign'>Firma cliente</span>
            </div>
          </div>
          <div>
            <span className='footer'>Informe generado el:</span>
            <span className='footer'>{new Date().toLocaleDateString()}</span>
          </div>
          
        </body>
      </div>
    </>
  );
};