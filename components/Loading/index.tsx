import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

type props = {
  text: string,
  type: LoadingType
}

const Loading = ({ text, type } : props) => {
  return <section className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center flex-col text-custom-secondary bg-black/10 z-50'>
    <span className='text-2xl'>{text}</span>
    <ReactLoading type={type} color='#33B0E2' height={'10%'} width={'10%'}/>
  </section>;
}

export default Loading;