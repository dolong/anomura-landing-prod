import React, { useState, useCallback } from "react";
import s from "/sass/inventory/index.module.css";
import Nav from "./Nav";
import Inventory from "./Inventory";
import useDeviceDetect from "lib/useDeviceDetect";

export default function InventoryContainer({ user, balances }) {
    const { isMobile } = useDeviceDetect();

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <Nav user={user} isMobile={isMobile} />
                {(balances.hasOwnProperty("anomuras") || balances.hasOwnProperty("bowls")) && (
                    <Inventory nfts={balances} isMobile={isMobile} />
                )}
            </div>
        </div>
    );
}
