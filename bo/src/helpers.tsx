/* eslint-disable @typescript-eslint/no-explicit-any */
export const showError = (obj: any, nameChanger: Function) => {
  const keys = Object.keys(obj)
  for(const field of keys) {
    if(obj[field] === ''){
      return true && (
        <p style={{color: 'red', width: '100%', marginLeft: 30, marginBottom: 20, marginTop: 20}}>
        {`El campo ${nameChanger(field)} no puede estar vacio`}
      </p>
      )
    }
  }
  return false
}