import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Greeting } from './Greeting';
import { ChildDashBoard } from './ChildDashBoard';
import { SavingPlansProvider } from './Context';


export const DashBoard = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userIdFromLocalStorage = localStorage.getItem("userid")
    useEffect(() => {
        const fetchUserdata = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/user/${userIdFromLocalStorage}`)
                setUser(res.data);
                console.log(res.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }
        fetchUserdata();
    }, []);


  return (
    <div>
        <SavingPlansProvider>
        <ChildDashBoard data={user} setUser={setUser} />
        </SavingPlansProvider>
    </div>
  )
}
