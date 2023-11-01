import logoImported from '../../assets/logo.png';

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


export const html = ({
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
  return `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Informe de Mantenimiento</title>
</head>
<body style="width: 800px;">
  <div style="margin-bottom: 50px;">
    <img src=${logo} alt="logo" style="position: absolute; left: 20px; top: 30px;">
    <h1 style="text-align: center; color: #072D8D; font-size: 28px;">AIRE APLICADO SAS</h1>
    <h2 style="text-align: center; font-size: 20px; font-family: 'Calibri', sans-serif, monospace;" >Especialistas en soluciones</h2>
  </div>
  <h4 style="text-align: center; font-size: 16px; font-family: 'Calibri', sans-serif, monospace; margin-top: 80px;">INFORME DE SERVICIO</h4>
  <div style="display: flex; flex-direction: row; width: 100%; justify-content: space-between;">
    <div style="width: 360px; border-radius: 3px; padding: 5px;">
      <table style="width: 100%;">
        <tbody>
          <tr style="margin-bottom: 3px;">
            <td style="width: 40%; background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Cliente:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${customer}</td>
          </tr>
          <tr>
            <td style="width: 40%;background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Sede:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${headQuarter}</td>
          </tr>
          <tr>
            <td style="width: 40%;background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Ciudad:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${city ? city : '---'}</td>
          </tr>
          <tr>
            <td style="width: 40%;background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Contacto:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${contact}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width: 400px ;border-radius: 3px; padding: 5px;">
      <table style="width: 100%;">
        <tbody>
          <tr>
            <td style="width: 50%; background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Orden de Trabajo:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${ot}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Tipo de Equipo:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${type}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Ubicación:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${location}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(230, 228, 228); border-radius: 3px; padding: 5px; font-weight: 600; font-family: 'Calibri', sans-serif, monospace;">Marca / Modelo:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209)">${brand} ${reference}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div style="width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center;">
    <h4 style="font-family: 'Calibri', sans-serif, monospace;">Actividades Ejecutadas</h4>
    <div style="width: 100%; height: 150px; background-color:rgb(240, 239, 239); border-radius: 5px;">
      <span style="font-family: 'Calibri', sans-serif, monospace; padding: 5px; text-align: justify;">
        ${activities}
      </span>
    </div>
  </div>
  <div style="width: 100%;">
    <h4 style="font-family: 'Calibri', sans-serif, monospace; text-align: center;">Parametros de Operación</h4>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
      <table style="width: 100%; margin-right: 50px;">
        <tbody>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">V. Entrada L1L2:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${voltajel1l2}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">V. Entrada L1L3:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${voltajel1l3}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">V. Entrada L2L3:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${voltajel2l3}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Compresor 1 Amp. L1:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${compressor1l1}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Compresor 1 Amp. L2:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${compressor1l2}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Compresor 1 Amp. L3:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${compressor1l3}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Compresor 2 Amp. L1:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${compressor2l1}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Compresor 2 Amp. L2:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${compressor2l2}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Compresor 2 Amp. L3:</td>
            <td style="width: 50%; font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${compressor2l3}</td>
          </tr>
        </tbody>
      </table>
      <table style="width: 100%;">
        <tbody>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Amp. Motor 1:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${ampEngine1}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Amp. Motor 2:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${ampEngine2}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Amp. Motor 3:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${ampEngine3}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Amp. Motor Evap:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${evapMotor}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Voltaje Control:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${voltageControl}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Temp. Suminsitro:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${temperatureEntrance}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Temp. Retorno:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${temperatureExit}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Presión Succión:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${suctionPressure}</td>
          </tr>
          <tr>
            <td style="width: 50%; background-color: rgb(240, 239, 239); border-radius: 3px; padding: 5px; font-weight: 600; font-size: 14px; font-family: 'Calibri', sans-serif, monospace;">Presión Descarga:</td>
            <td style="width: 100%;font-family: 'Calibri', sans-serif, monospace; border-bottom: 1px solid rgb(211, 209, 209); font-size: 14px; text-align: center;">${dischargedPressure}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
  <div style="margin-top: 30px;">
    <h4 style="font-family: 'Calibri', sans-serif, monospace; font-size: 14px;">Fecha y hora de ejecución del servicio</h4>
    <div style="display: flex; flex-direction: row;">
      <span style="font-family: 'Calibri', sans-serif, monospace; font-size: 16px;">${date}</span>
      <span style="margin-inline: 20px;">-</span>
      <span style="font-family: 'Calibri', sans-serif, monospace; font-size: 16px;">${hour}</span>
    </div>
  </div>
  <div style="width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center; margin-top: 50px">
    <h4 style="font-family: 'Calibri', sans-serif, monospace;">Observaciones adicionales</h4>
    <div style="width: 100%; height: 100px; background-color:rgb(240, 239, 239); border-radius: 5px;">
      <span style="font-family: 'Calibri', sans-serif, monospace; padding: 5px; text-align: justify;">
        ${observations}
      </span>
    </div>
  </div>
  <div style="display: flex; flex-direction: row; justify-content: center; margin-top: 70px; margin-bottom: 100px;">
    <div style="display: flex; flex-direction: column; margin-right: 200px;">
      <img src=${techSign} alt="tech-sign" style="width: 150px; height: 100px;">
      <span style="font-family: 'Calibri', sans-serif, monospace; text-align: center; margin-top: 20px; font-weight: 700;">Firma tecnico</span>
    </div>
    <div style="display: flex; flex-direction: column; margin-left: 200px;">
      <img src=${customerSign} alt="customer-sign" style="width: 150px; height: 100px;">
      <span style="font-family: 'Calibri', sans-serif, monospace; text-align: center; margin-top: 20px; font-weight: 700;">Firma cliente</span>
    </div>
  </div>
  <div>
    <span style="font-family: 'Calibri', sans-serif, monospace;">Informe generado el:</span>
    <span style="font-family: 'Calibri', sans-serif, monospace;">${new Date().toLocaleDateString()}</span>
  </div>
  
</body>
</html>
`;
};