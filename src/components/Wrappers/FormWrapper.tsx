import React, { ReactNode } from 'react'

const FormWrapper = ({children} : {children : ReactNode}) => {
  return (
    <div className='border py-4'>
        {children}
    </div>
  )
}

export default FormWrapper