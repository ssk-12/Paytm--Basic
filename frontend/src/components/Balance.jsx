import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState('Loading...'); // Initialize balance state

    useEffect(() => {
        // Define an async function inside useEffect
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No token found");
                    return;
                }

                // Make the API call with the token in the Authorization header
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });

                // Update state with the fetched balance
                setBalance(response.data.balance); // Adjust according to your API response structure
            } catch (error) {
                console.error("Failed to fetch balance", error);
                // Handle error, e.g., show error message or redirect
            }
        };

        fetchBalance();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance}
            </div>
        </div>
    );
};