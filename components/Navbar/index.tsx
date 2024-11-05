"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { PersonCircle } from 'react-bootstrap-icons';

import { NavBarType } from '@/types/navBar';

const Navbar = () => {
  const [location, setLocation] = useState<NavBarType>('ingresos-egresos');
  const [singOutShow, setSingOutShow] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <nav className='shadow-md flex fixed top-0 z-40 gap-4 md:gap-0 items-center justify-between w-screen bg-white text-custom-primary px-6 md:px-16 2xl:pl-40 text-base xl:text-lg min-h-16'>
      <div
        className='flex items-center justify-between xl:mx-auto w-[80%] min-w-20'>
        <Link href='/'>Logo</Link>
        <ul className={` bg-transparent w-full transition-all duration-300 ease-in-out pointer-events-auto relative flex items-center justify-end gap-16`}>
          <li className={`${location === "ingresos-egresos" && "text-custom-red font-bold"}`}>
            <Link href={'/'} onClick={() => setLocation('ingresos-egresos')}>Ingresos y egresos</Link>
          </li>
          {
            session?.user.role === 'ADMIN' && <>
            <li className={`${location === "usuarios" && "text-custom-red font-bold"}`}>
              <Link href={'/usuarios'} onClick={() => setLocation('usuarios')}>Usuarios</Link>
            </li>
            <li className={`${location === "reportes" && "text-custom-red font-bold"}`}>
              <Link href={'/reportes'} onClick={() => setLocation('reportes')}>Reportes</Link>
            </li>
            </>
          }
          
        </ul>
      </div>
      <button>
        <PersonCircle size={30} onClick={()=> setSingOutShow(!singOutShow)}/>
          {
            singOutShow && <section className='bg-white shadow-md rounded-lg fixed right-[3%] top-14 z-10 w-52'>
              <button className='inline-flex py-1' onClick={() => signOut()}>
                Salir 
                <span className='ml-2 w-6 h-6 border-2 border-custom-accents rounded-full flex relative'>
                  <span className='h-4 w-1 flex -mt-1 bg-custom-text absolute left-1/2 -translate-x-1/2 rounded-md'></span>
                </span>
              </button>
            </section>
          }
      </button>
    </nav>
  );
};

export default Navbar;