"use client";

import React, {HTMLInputTypeAttribute, useState} from "react";

type props = {
    type?: HTMLInputTypeAttribute | "area",
    required?: boolean,
    name: string,
    autoComplete?: string,
    label?: string,
    handleChange: (name: string, value: string) => void,
    defaultValue?: string
}

export const TextField = (
    {
        type,
        required,
        name,
        autoComplete,
        label,
        handleChange,
        defaultValue = ''
    }: props) => {

    const [hasText, setHasText] = useState<boolean>(type === 'date' || defaultValue !== '');

    const baseOuter: string = `bg-transparent relative flex flex-col-reverse items-start ${type === "area" ? "h-36" : "h-16"} w-full`;
    const baseLabel: string = `bg-transparent absolute ${hasText ? "top-0" : "top-6"} transition-all duration-150 ease-in-out peer-focus:top-0 left-6 peer-focus:text-custom-primary peer-focus:font-bold`;
    const innerClassName: string = `bg-transparent h-full w-full text-custom-text px-6 pt-6 pb-2 peer outline-none resize-none border-b-2 border-custom-text transition-all duration-150 ease-in-out focus:border-custom-primary focus:text-custom-primary`;

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const text = e.target.value.trim();
        setHasText(text !== undefined && text !== "");
        const { name, value } = e.target;
        handleChange(name, value)
    }

    return (
        <div className={baseOuter}>
            {type !== "area" ?
                <input type={type} className={innerClassName} name={name}
                       required={required} autoComplete={autoComplete} onChange={(e) => handleChangeInput(e)} defaultValue={defaultValue}/>
                :
                <textarea className={innerClassName} name={name}
                          required={required} autoComplete={autoComplete} onChange={(e) => handleChangeInput(e)}/>
            }
            {
                label && <label className={baseLabel}>{label}{required && "*"}</label>
            }
            
        </div>
    );
}