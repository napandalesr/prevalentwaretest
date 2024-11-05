"use client"

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import Loading from '@/components/Loading';
import { useGetMovements } from '@/hooks/queries/useGetMovements';
import { useGetLasMovements } from '@/hooks/queries/useGetLasMovements';
import Csv from '@/components/Csv';
import { graphType } from '@/types/chart';
import { useFindByEmail } from '@/hooks/queries/useGetUserByEmail';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [datasource, setDatasource] = useState<graphType>();
  const { findMovement, loadingMovement, errorMovement } = useGetMovements();
  const { getLastMovements, loadingGetLastMovements, errorGetLastMovements, refetch } = useGetLasMovements();
  const { data: session, status } = useSession();
  const router = useRouter();

  /**Redirigir a la página de inicio si no es administrador */
  useEffect(() => {
    if(session) {
      if (status === "authenticated" && session.user.role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [session, status]);
  
  
  /**Actualización de datos para la grafica con últimos 4 movimientos al rendizar nuevamenta la pagina */
  useEffect(() => {
    if(getLastMovements) {
      const labels: any[] = [];
      const dataNumbers: any[] = []
      getLastMovements.getLastMovements.map((item: any) => {
        if(item.type == 'EXPENSE') {
          dataNumbers.push(-item.amount)
        }
        dataNumbers.push(item.amount)
        labels.push(item.date);
      });
      setDatasource({
        labels: labels,
        datasets: [
          {
            label: 'Últimos movimientos',
            data: dataNumbers,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
    refetch();
  }, [getLastMovements]);

  if (loadingMovement || loadingGetLastMovements) return <Loading text="Cargando..." type="spinningBubbles"/>
  if (errorMovement) return <p>Error: {errorMovement.message}</p>;
  if (errorGetLastMovements) return <p>Error: {errorGetLastMovements.message}</p>;

  return <main className=" my-28">
    <section className="w-[80%] mx-auto flex flex-col justify-between text-custom-primary">
      <h3 className="text-2xl font-bold">Reportes</h3>
      <section className='flex w-[90%] gap-12'>
        {
          datasource && <Bar data={datasource} />
        }
        <section className='w-[30%]'>
          <Csv findMovement={findMovement}/>
        </section>
      </section>
    </section>
  </main>;
}

export default Reports;