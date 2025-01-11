import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import React from "react";

export const Dashboard = () => {
    return (
        <div className="bg-slate-300 w-full h-screen">
            <Appbar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    );
};
