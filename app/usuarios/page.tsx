"use client"

import React, { useEffect, useState } from 'react';

import TableUsers from '@/containers/TableUsers';
import { columnType } from '@/types/table';
import ModalUser from '@/containers/ModalUser';
import Loading from '@/components/Loading';
import { useGetUsers } from '@/hooks/queries/useGetUsers';
import { dataSourceUser, userType } from '@/types/user';
import { useUpdateUser } from '@/hooks/mutations/useUpdateUser';
import Alert from '@/components/Alert';

const columns: columnType[] = [
  {
    key: "1",
    title: "Nombre"
  },
  {
    key: "2",
    title: "Correo"
  },
  {
    key: "3",
    title: "Teléfono"
  },
  {
    key: "4",
    title: "Acciones"
  },
]

const Users = () => {
  const [showForm, setShowForm] = useState <userType>({
    show: false,
    name: '',
    role: 'USER',
    phone: '',
    id: ""
  });
  const [activeAlert, setActiveAlert] = useState<{key: number, active: boolean, message: string, type: 'success' | 'error'}>({
    key: 0,
    active: false,
    message: '',
    type: 'success'
  }); 
  const { dataSourceUsers, loadingUsers, errorUsers, refetchUsers } = useGetUsers();
  const [datasource, setDatasource] = useState<dataSourceUser[]>();
  const { useHandleUpdateUser, mutationUserUpdateLoading } = useUpdateUser();

  const hide = () => {
    setShowForm({
      ...showForm,
      show: false
    });
  };

  useEffect(() => {
    if(dataSourceUsers) {
      const newData: dataSourceUser[] = []
      dataSourceUsers.findUsers.map((item: any) => {
        newData.push({
          ...item,
          actions: <span className='bg-white' style={{backgroundColor: "#EA7402", color: "#fff", padding: '0.5rem 1rem', borderRadius: "1rem"}}>
            <button onClick={() => setShowForm({show: true, name: item.name, role: item.role, id: item.id, phone: item.phone})}>Editar</button>
          </span>
        })
      });
      setDatasource(newData)
    }
  }, [dataSourceUsers]);
  
  if (loadingUsers) return <Loading text="Cargando..." type="spinningBubbles"/>
  if (errorUsers) return <p>Error: {errorUsers.message}</p>;

  const handleUpdateUser = async (data: any) => {
    try {
      const response = await useHandleUpdateUser(data);
      if(response.data) {
        setActiveAlert({
          key: activeAlert.key+1,
          active: true,
          message: "Datos actualizados correctamente",
          type: 'success'
        });
      }
      setShowForm({
        ...showForm,
        show: false
      });
      refetchUsers();
    } catch (error) {
      console.log('Error '+error);
      setActiveAlert({
        key: activeAlert.key+1,
        active: true,
        message: "Hubo un error",
        type: 'error'
      });
    }
  }

  return <main className=" my-28">
    <Alert key={activeAlert.key} type={activeAlert.type} text={activeAlert.message} active={activeAlert.active}/>
    {
      mutationUserUpdateLoading && <Loading text="Cargando..." type="spinningBubbles"/>
    }
    <section className="w-[80%] mx-auto flex justify-between text-custom-primary">
      {
        showForm.show && 
        <ModalUser 
          hide={hide} 
          handleUpdateUser={handleUpdateUser} 
          name={showForm.name} 
          role={showForm.role ?? "USER"} 
          id={showForm.id ?? ''} 
          phone={showForm.phone ?? ''}/>
      }
      <h3 className="text-2xl font-bold">Lista de usuarios</h3>
    </section>
    {
      datasource && <TableUsers columns={columns} datasource={datasource}/>
    }
  </main>;
}

export default Users;