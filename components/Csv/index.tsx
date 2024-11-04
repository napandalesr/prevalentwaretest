"use client"

import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

import { dataSourceMovement } from '@/types/table';

type props = {
  findMovement: dataSourceMovement[]
}

const Csv = ({ findMovement }: props) => {
  const [datasourceCVS, setDatasourceCVS] = useState<string[][]>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const csvData: string[][] = [];
    csvData.push(["Concepto", "Monto", "Fecha", "Usuario"]);
    let tot = 0;
    findMovement.map(item => {
      if(item.type === 'EXPENSE') {
        tot -= parseFloat(item.amount);
      }
      if(item.type === 'INCOME') {
        tot += parseFloat(item.amount);
      }
      csvData.push([item.concept, item.amount, item.date, item.user.name]);
    });
    setTotal(tot);
    setDatasourceCVS(csvData);
  }, [findMovement]);

  return <>
  Saldo: $ {total}
  {
    datasourceCVS && <CSVLink filename={"file.csv"} data={datasourceCVS} className='px-6 py-3 flex rounded-xl bg-custom-secondary text-white font-bold w-max'>Descargar CVS</CSVLink>
  }
  </>
}

export default Csv;