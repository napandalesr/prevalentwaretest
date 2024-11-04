"use client"

import React, { memo, useEffect, useState } from 'react';
import { X } from 'react-bootstrap-icons';

type props = {
  type: 'success' | 'error',
  text: string
  active: boolean
  key: number
}
const Alert = memo(({ type, text, active, key }: props) => {
  const [showEffect, setShowEffect] = useState<boolean>(false);
  useEffect(() => {
    setShowEffect(active);
    if(active) {
      setTimeout(() => {
        setShowEffect(false);
      }, 5000);
    }
  }, [active]);

  return <section key={key} className={`w-72 h-20 shadow-lg fixed top-16 z-50 rounded-lg bg-white border-2 border-custom-text/30 transition-all ease-in-out delay-500 ${showEffect ? 'right-4' : '-right-80'}`}>
    <p className={`p-4 text-base font-bold ${type === 'success' ? 'text-custom-secondary' : 'text-custom-red'}`}>{text}</p>
    <span className='absolute right-3 top-3 cursor-pointer' onClick={() => setShowEffect(false)}><X/></span>
    <span className={`absolute w-full h-4 bottom-0 rounded-b-lg ${type === 'success' ? 'bg-custom-secondary' : 'bg-custom-red'}`}></span>
  </section>;
})

export default Alert;