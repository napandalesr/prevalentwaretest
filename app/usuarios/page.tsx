"use client"

import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";

import TableUsers from '@/containers/TableUsers';
import { columnType, dataSourceUser } from '@/types/table';
import ModalUser from '@/containers/ModalUser';
import Loading from '@/components/Loading';

const FindUsers = gql`
query FindUsers {
  findUsers {
    id
    email
    name
    phone
    role
  }
}`;

const UpdateUser = gql`
mutation UpdateUser($updateUserId: String!, $name: String!, $role: Role!, $phone: String!) {
  updateUser(id: $updateUserId, name: $name, role: $role, , phone: $phone ) {
    id
    name
    role
    phone
  }
}
`

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

type findUsersType = {
  findUsers: dataSourceUser[]
}

const Usuarios = () => {
  const [showForm, setShowForm] = useState({
    show: false,
    name: '',
    role: '',
    phone: '',
    id: ""
  });
  const { data, loading, error, refetch } = useQuery<findUsersType>(FindUsers);
  const [datasource, setDatasource] = useState<dataSourceUser[]>();
  const [updateUser, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(UpdateUser);

  const hide = () => {
    setShowForm({
      ...showForm,
      show: false
    });
  };

  useEffect(() => {
    data?.findUsers.map
    if(data) {
      const newData: dataSourceUser[] = []
      data.findUsers.map((item: any) => {
        newData.push({
          ...item,
          actions: <span className='bg-white' style={{backgroundColor: "#EA7402", color: "#fff", padding: '0.5rem 1rem', borderRadius: "1rem"}}>
            <button onClick={() => setShowForm({show: true, name: item.name, role: item.role, id: item.id, phone: item.phone})}>Editar</button>
          </span>
        })
      });
      setDatasource(newData)
    }
  }, [data])

  
  if (loading) return <Loading text="Cargando..." type="spinningBubbles"/>
  if (error) return <p>Error: {error.message}</p>;

  const handleUpdateUser = async (data: any) => {
    await updateUser({
      variables: {
        ...data
      }
    });
    setShowForm({
      ...showForm,
      show: false
    });
    refetch();
  }

  return <main className=" mt-28">
    {
      mutationLoading && <Loading text="Cargando..." type="spinningBubbles"/>
    }
    <section className="w-[80%] mx-auto flex justify-between text-custom-primary">
      {
        showForm.show && <ModalUser hide={hide} handleUpdateUser={handleUpdateUser} name={showForm.name} role={showForm.role} id={showForm.id} phone={showForm.phone}/>
      }
      <h3 className="text-2xl font-bold">Lista de usuarios</h3>
    </section>
    {
      datasource && <TableUsers columns={columns} datasource={datasource}/>
    }
  </main>;
}

export default Usuarios;