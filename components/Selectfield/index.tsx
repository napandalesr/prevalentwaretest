"use client";

import React, { useState } from "react";

type props = {
  required?: boolean,
  name: string,
  options: {value: string, text: string}[],
  autoComplete?: string,
  label?: string,
  handleChange: (name: string, value: string) => void,
  defaultValue?: string
}

export const Selectfield = (
    {
      required,
      name,
      label,
      options,
      handleChange,
      defaultValue = ""
    }: props) => {

    const [hasText, setHasText] = useState<boolean>(defaultValue !== "");

    const baseOuter: string = `bg-transparent relative flex flex-col-reverse items-start h-16 w-full text-custom-text`;
    const baseLabel: string = `bg-transparent absolute ${hasText ? "top-0" : "top-6"} transition-all duration-150 ease-in-out peer-focus:top-0 left-6 peer-focus:text-custom-primary peer-focus:font-bold`;
    const innerClassName: string = `bg-transparent h-full w-full px-6 pt-6 pb-2 peer outline-none resize-none border-b-2 border-custom-text transition-all duration-150 ease-in-out focus:border-custom-primary focus:text-custom-primary`;

    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
      const text = e.target.value.trim();
      setHasText(text !== undefined && text !== "");
      const { name, value } = e.target;
      handleChange(name, value);
    }

    return (
    <div className={baseOuter}>
      <select name={name} onChange={(e) => {handleChangeSelect(e)}} className={innerClassName} defaultValue={defaultValue}>
        <option value=""></option>
        {
          options.map((item, index) =><option key={index} value={item.value}>{item.text}</option> )
        }
      </select>
        {
            label && <label className={baseLabel}>{label}{required && "*"}</label>
        }
        
    </div>
    );
}