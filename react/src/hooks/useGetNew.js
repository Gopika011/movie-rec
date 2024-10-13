import React from 'react'

const useGetNew = () => {

    const getNew = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:5000/new_releases')
            const data = await res.json()
            return data;
        }catch(error){
            console.log(error)
            return [];
        }
    }

    return getNew;
}

export default useGetNew