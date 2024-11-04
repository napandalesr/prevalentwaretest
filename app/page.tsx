"use client"

import React, { useEffect, useState } from "react";
import Table from "@/containers/Table";
import { columnType } from "@/types/table";
import ModalIncome from "@/containers/ModalIncome";
import Loading from "@/components/Loading";
import { useGetMovements } from "@/hooks/queries/useGetMovements";
import { MovementType } from "@/types/movement";
import { userCreateMovement } from "@/hooks/mutations/userCreateMovement";
import Alert from "@/components/Alert";
import { useSession } from "next-auth/react";

const columns: columnType[] = [
  {
    key: "1",
    title: "Concepto"
  },
  {
    key: "2",
    title: "Monto"
  },
  {
    key: "3",
    title: "Fecha"
  },
  {
    key: "4",
    title: "Usuario"
  },
];

export default function Home() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeAlert, setActiveAlert] = useState<{key: number, active: boolean, message: string, type: 'success' | 'error'}>({
    key: 0,
    active: false,
    message: '',
    type: 'success'
  }); 
  const [total, setTotal] = useState<number>(0);
  const { findMovement, loadingMovement, errorMovement, refetchMovement } = useGetMovements();
  const { useHandleCreateMovement, mutationLoading } = userCreateMovement()
  const { data: session, status } = useSession();
  

  useEffect(() => {
    console.log("session", session);
  }, [session])

  useEffect(() => {
    if(findMovement) {
      let tot = 0;
      findMovement.map(item => {
        tot += parseFloat(item.amount);
      })
      setTotal(tot);
    }
  }, [findMovement])

  if (loadingMovement) return <Loading text="Cargando..." type="spinningBubbles"/>
  if (errorMovement) return <p>Error: {errorMovement.message}</p>;

  const handleCreateMovement = async (data: MovementType) => {
    try {
      const response = await useHandleCreateMovement(data);
      if(response.data) {
        setActiveAlert({
          key: activeAlert.key+1,
          active: true,
          message: "Datos guardados correctamente",
          type: 'success'
        });
      }
      setShowForm(false);
      refetchMovement();
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
  
  const hideForm = () => {
    setShowForm(false);
  }

  return (
    <>
    <Alert key={activeAlert.key} type={activeAlert.type} text={activeAlert.message} active={activeAlert.active}/>
      { showForm && <ModalIncome handleCreateMovement={handleCreateMovement} hide={hideForm}/>}
      {
        mutationLoading && <Loading text="Cargando..." type="spinningBubbles"/>
      }
      <main className=" my-28">
        <section className="w-[80%] mx-auto flex justify-between text-custom-primary">
          <h3 className="text-2xl font-bold">Lista de ingresos y egresos</h3>
          <button className="px-4 py-2 bg-custom-secondary rounded text-white font-bold" onClick={() => setShowForm(true)}>Nuevo</button>
        </section>
        {
          findMovement && <Table columns={columns} datasource={findMovement}/>
        }
        
        <section className="w-[80%] mx-auto mt-8 text-right text-custom-accents">
          <span className="px-6 py-2 bg-black/5">Total: $ {total}</span>
        </section>
      </main>
    </>
  );
}
