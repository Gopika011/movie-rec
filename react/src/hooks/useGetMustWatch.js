import React from 'react'

const useGetMustWatch = () => {
    
    const getMustWatch = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:5000/must_watch')
            const data = await res.json()
            return data;
        }catch(error){
            console.log(error)
            return [];
        }
    }

    return getMustWatch;
}

export default useGetMustWatch