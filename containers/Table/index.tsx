"use client"

import React, { memo } from 'react';

import { columnType, dataSourceMovement } from '@/types/table';

type props = {
  columns: columnType[];
  datasource: dataSourceMovement[];
};

/**Tabla para la lista de movimientos */
const Table = memo(({ columns, datasource }: props) => {
  return <table className='w-[80%] mx-auto mt-8'>
  <thead className='border-b-2 border-b-custom-secondary text-custom-red'>
    {
      columns.map(col => <th key={col.key} className='h-12 w-[25%]'>{col.title}</th>)
    }
  </thead>
  <tbody>
    {
      datasource.map((cell, index) =><tr key={cell.key} className={`h-12 text-custom-text ${index%2 == 0 ? 'bg-black/5' : ''}`}>
        <th>{cell.concept}</th>
        <th>{cell.amount}</th>
        <th>{cell.date}</th>
        <th>{cell.user.name}</th>
      </tr>)
    }
  </tbody>
  </table>;
});

export default Table;