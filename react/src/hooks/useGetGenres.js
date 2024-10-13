import React, { useState } from 'react'

const useGetGenres = () => {
    const BaseUrl = 'http://127.0.0.1:5000'
    const [loading,setLoading] = useState(false)

    const getGenres = async(genre, limit=0)=>{
        setLoading(true)
        try{
            const url = limit > 0 ? `${BaseUrl}/movies/genre/${genre}?limit=${limit}` : `${BaseUrl}/movies/genre/${genre}`;
            console.log(url)
            const res = await fetch(url)
            const data = await res.json()
            return data;
        }catch(error){
            console.log(error)
            return [];
        }finally {
            setLoading(false)
        }
    }

    return {loading,getGenres};
}

export default useGetGenres