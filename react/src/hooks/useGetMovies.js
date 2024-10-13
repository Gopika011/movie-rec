import React from 'react'

const useGetMovies = () => {
    const getMovies= async()=>{
        try{
            const res = await fetch('http://127.0.0.1:5000/view_movies')
            const data = await res.json()
            return data;
            
        }catch(error){
            console.log(error)
            return [];
        }
    }

    return getMovies;
}

export default useGetMovies