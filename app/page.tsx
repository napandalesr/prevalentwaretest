"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";
import Table from "@/containers/Table";
import { columnType } from "@/types/table";

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;4


export default function Home() {
  const { data, loading, error } = useQuery(HELLO_QUERY);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("session", session);
    
  }, [session])

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
  ] 
  return (
    <div className="">
      <p>{data.hello}</p>
      <main className=" mt-16">
        <section className="w-[80%] mx-auto flex justify-between text-custom-primary">
          <h3 className="text-2xl font-bold">Lista de ingresos y egresos</h3>
          <button className="px-4 py-2 bg-custom-secondary rounded text-white font-bold">Nuevo</button>
        </section>
        <Table columns={columns} datasource={[
          {
            key: 1,
            amount: '100',
            concep: 'Concepto',
            date: '20-5-1354',
            user: "Neider"
          },
          {
            key: 1,
            amount: '100',
            concep: 'Concepto',
            date: '20-5-1354',
            user: "Neider"
          },
          {
            key: 1,
            amount: '100',
            concep: 'Concepto',
            date: '20-5-1354',
            user: "Neider"
          }
        ]}/>
      </main>
    </div>
  );
}
