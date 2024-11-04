"use client"

import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Table from "@/containers/Table";
import { columnType, dataSourceMovement } from "@/types/table";
import ModalIncome from "@/containers/ModalIncome";
import Loading from "@/components/Loading";

const FindMovement = gql`
  query FindMovement {
    findMovement{
      id
      concept
      amount
      date
      user {
        name
        id
      }
      type
    }
  }
`;

const CreateMovement = gql`
mutation CreateMovement($input: CreateMovementInput!) {
  createMovement(input: $input) {
    amount
    concept
    date
    type
  }
}
`;

type findMovementType = {
  findMovement: dataSourceMovement[]
}

export default function Home() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { data, loading, error, refetch } = useQuery<findMovementType>(FindMovement);
  const [createMovement, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CreateMovement);
  const { data: session, status } = useSession();
  

  useEffect(() => {
    console.log("session", session);
  }, [session])

  useEffect(() => {
    if(data) {
      let tot = 0;
      data.findMovement.map(item => {
        tot += parseFloat(item.amount);
      })
      setTotal(tot);
    }
  }, [data])

  if (loading) return <Loading text="Cargando..." type="spinningBubbles"/>
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateMovement = async (data: any) => {
    const { amount, concept, date, type, userId } = data;
    await createMovement({
      variables: {
        input: {
          amount: parseFloat(amount),
          concept,
          date,
          type,
          userId
        }
      }
    });
    setShowForm(false);
    refetch();
  }

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

  const hideForm = () => {
    setShowForm(false);
  }

  return (
    <>
      { showForm && <ModalIncome handleCreateMovement={handleCreateMovement} hide={hideForm}/>}
      {
        mutationLoading && <Loading text="Cargando..." type="spinningBubbles"/>
      }
      <main className=" mt-28">
        <section className="w-[80%] mx-auto flex justify-between text-custom-primary">
          <h3 className="text-2xl font-bold">Lista de ingresos y egresos</h3>
          <button className="px-4 py-2 bg-custom-secondary rounded text-white font-bold" onClick={() => setShowForm(true)}>Nuevo</button>
        </section>
        {
          data && <Table columns={columns} datasource={data.findMovement}/>
        }
        
        <section className="w-[80%] mx-auto mt-8 text-right text-custom-accents">
          <span className="px-6 py-2 bg-black/5">Total: $ {total}</span>
        </section>
      </main>
    </>
  );
}
