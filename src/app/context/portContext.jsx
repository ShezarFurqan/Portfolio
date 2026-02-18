"use client"

import { createContext, useEffect, useState } from "react";

export const PortContext = createContext();

const PortContextProvider = (props) => {

    const [name, fullName] = useState("Shezar")


    let value = {
        name
    }


    return (
        <PortContext.Provider value={value}>
            {props.children}
        </PortContext.Provider>
    )

}

export default PortContextProvider;
