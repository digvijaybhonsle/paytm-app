import React from 'react';
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    const handleButtonClick = () => {
        console.log('Sign in button clicked');
        navigate("/dashboard"); 
        alert("Signedin Successfully!!")
    };
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox onChange={handleInputChange} placeholder="dgvj@gmail.com" label={"Email"} />
                    <InputBox onChange={handleInputChange} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={handleButtonClick} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
