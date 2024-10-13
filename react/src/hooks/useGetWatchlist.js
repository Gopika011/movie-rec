import React, { useState } from 'react'

const useGetWatchlist = () => {
    const [loading,setLoading] = useState(false)

    const getWatchlist = async(id)=>{
        setLoading(true)
        try{
            const res = await fetch(`http://127.0.0.1:5000/view_list/${id}`)
            const data = await res.json()
            return data;
        }catch(error){
            console.log(error)
            return [];
        }finally {
            setLoading(false)
        }
    }

    return {loading, getWatchlist};
}

export default useGetWatchlist