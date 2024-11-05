"use client"

import React, { useEffect, useState } from 'react';
import { X } from 'react-bootstrap-icons';

import { TextField } from '@/components/Textfield';
import { Selectfield } from '@/components/Selectfield';
import { userType } from '@/types/user';

type props = {
  hide: () => void,
  handleUpdateUser: (data: any) => void,
  name: string,
  role: "USER" | "ADMIN",
  id: string,
  phone: string
}

/**Modal para el formulario de actualización de usuario */
const ModalUser = ({ hide, handleUpdateUser, name, role, id, phone }: props) => {
  const [formData, setFormData] = useState<userType>({
    updateUserId: id,
    name: name,
    role: role,
    phone: phone
  });

  /**Se obtienen el texto digitado en el formulario */
  const handleChange = (name: string, value: string | number) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  /**Envía de datos para actualizar el usuario */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateUser({...formData});
  };

  return <section className='fixed left-0 top-0 w-screen h-screen bg-black/50 flex items-center justify-center'>
  <form className='w-1/2 bg-white p-10 rounded-md relative' onSubmit={handleSubmit}>
    <span className='absolute right-10 top-8 cursor-pointer' onClick={hide}><X size={40}/></span>
    <h4 className='text-center font-bold text-custom-primary text-2xl'>Editar usuario</h4>
    <TextField label='Nombre' name='name' required type='text' handleChange={handleChange} defaultValue={name}/>
    <TextField label='Teléfono' name='phone' required type='text' handleChange={handleChange} defaultValue={phone}/>
    <Selectfield name='role' options={[{text: 'Usuario', value: 'USER'}, {text: 'Administrador', value: 'ADMIN'}]} label='Rol' required  handleChange={handleChange} defaultValue={formData.role}/>
    <button type='submit' className='bg-custom-secondary text-white font-bold px-4 py-2 rounded mx-auto w-full mt-4'>Guardar</button>
  </form>
</section>;
}

export default ModalUser;