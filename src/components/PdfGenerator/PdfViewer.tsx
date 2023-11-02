import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import { MyDocument } from './MaintenanceTemplate';
import { useLocation  } from 'react-router-dom';


export const PdfViewer = () => {

  const location = useLocation();
  const maintenance = location?.state?.maintenance;
  
 return  (
    <>
      <PDFViewer height={'100%'} >
        <MyDocument receivedData={maintenance}/>
      </PDFViewer>
    </>
  );
}