import React, { ChangeEvent, FormEvent, useState } from 'react';
import { X } from 'react-bootstrap-icons';

import { TextField } from '@/components/Textfield';
import { dataSourceMovement } from '@/types/table';
import { Selectfield } from '@/components/Selectfield';

type props = {
  hide: () => void,
  handleCreateMovement: (data: any) => void,
}

const ModalIncome = ({ hide, handleCreateMovement }: props) => {
  const [formData, setFormData] = useState({
    concept: '',
    amount: 0,
    date: '',
    type: ''
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCreateMovement({...formData, userId: "1"})
  };

  return <section className='fixed left-0 top-0 w-screen h-screen bg-black/50 flex items-center justify-center'>
    <form className='w-1/2 bg-white p-14 rounded-md relative' onSubmit={handleSubmit}>
      <span className='absolute right-10 top-8 cursor-pointer' onClick={hide}><X size={40}/></span>
      <h4 className='text-center font-bold text-custom-primary text-2xl'>Nuevo movimiendo de dinero</h4>
      <TextField label='Monto' name='amount' required type='number' handleChange={handleChange}/>
      <Selectfield name='type' options={[{text: 'Ingreso', value: 'INCOME'}, {text: 'Gastos', value: 'EXPENSE'}]} label='Tipo' required  handleChange={handleChange}/>
      <TextField label='Concepto' name='concept' required type='area' handleChange={handleChange}/>
      <TextField name='date' required type='date' handleChange={handleChange} label='Fecha'/>
      <button className='bg-custom-secondary text-white font-bold px-4 py-2 rounded mx-auto w-full mt-4'>Ingresar</button>
    </form>
  </section>;
}

export default ModalIncome;