"use client"

import React from 'react';

import { columnType, dataSourceUser } from '@/types/table';

type props = {
  columns: columnType[];
  datasource: dataSourceUser[];
};

const TableUsers = ({ columns, datasource }: props) => {
  return <table className='w-[80%] mx-auto mt-8'>
  <thead className='border-b-2 border-b-custom-secondary text-custom-red'>
    {
      columns.map(col => <th key={col.key} className='h-12 w-[25%]'>{col.title}</th>)
    }
  </thead>
  <tbody>
    {
      datasource.map((cell, index) =><tr key={cell.key} className={`h-12 text-custom-text ${index%2 == 0 ? 'bg-black/5' : ''}`}>
        <th>{cell.name}</th>
        <th>{cell.email}</th>
        <th>{cell.phone}</th>
        <th>{cell.actions}</th>
      </tr>)
    }
  </tbody>
  </table>;
}

export default TableUsers;