"use client";

import React, {useState} from 'react';
import Link from 'next/link';

import { NavBarType } from '@/types/navBar';


const Navbar = () => {
  const [location, setLocation] = useState<NavBarType>('ingresos-egresos')
  return (
    <nav className='shadow-md flex fixed top-0 z-40 gap-4 md:gap-0 items-center justify-between w-screen bg-white text-custom-primary px-6 md:px-16 2xl:pl-40 text-base xl:text-lg min-h-16'>
      <div
        className='flex items-center justify-start md:justify-center lg:justify-between xl:mx-auto md:w-[80%] min-w-20'>
        <Link href='/'>Logo</Link>
        <ul className={`py-16 top-16 left-0 lg:left-auto lg:w-auto lg:top-auto lg:py-0 bg-white lg:bg-transparent w-full transition-all duration-300 ease-in-out pointer-events-auto absolute lg:relative flex flex-col lg:flex-row items-center justify-end gap-16`}>
          <li className={`${location === "ingresos-egresos" && "text-custom-red font-bold"}`}>
            <Link href={'/'} onClick={() => setLocation('ingresos-egresos')}>Ingresos y egresos</Link>
          </li>
          <li className={`${location === "usuarios" && "text-custom-red font-bold"}`}>
            <Link href={'/usuarios'} onClick={() => setLocation('usuarios')}>Usuarios</Link>
          </li>
          <li className={`${location === "reportes" && "text-custom-red font-bold"}`}>
            <Link href={'/reportes'} onClick={() => setLocation('reportes')}>Reportes</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;