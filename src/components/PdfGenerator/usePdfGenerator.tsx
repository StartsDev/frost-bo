import { useEffect, useState } from 'react'

interface Props {
  receivedData: any
}

export const usePdfGenerator = ({receivedData}: Props) => {
  const [techImageSrc, setTechImageSrc] = useState(null);
  const [customerImageSrc, setCustomerImageSrc] = useState(null);

  useEffect(() => {
    const contentType           = 'image/jpeg';

    if(receivedData['Firma técnico']) {
      const techBase64Data      = receivedData['Firma técnico'].split(',')[1];
      const techBlob            = base64ToBlob(techBase64Data, contentType);
      const techUrl             = URL.createObjectURL(techBlob);
      setTechImageSrc(techUrl as never);
      return () => URL.revokeObjectURL(techUrl);

    }
    if(receivedData['Firma cliente']) {
      const customerBase64Data  = receivedData['Firma cliente'].split(',')[1];
      const customerBlob        = base64ToBlob(customerBase64Data, contentType);
      const customerUrl         = URL.createObjectURL(customerBlob);
      setCustomerImageSrc(customerUrl as never);
      return () => URL.revokeObjectURL(customerUrl);
    }
    

  }, [receivedData]);

  const base64ToBlob = (base64: string, contentType = '') => {
    const byteCharacters    = atob(base64);
    const byteNumbers       = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray         = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };


  return {
    techImageSrc,
    customerImageSrc
  }
}
