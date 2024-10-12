import React from 'react'

const useGetRandom = () => {
  const getRandom = async()=>{
    try {
        const res = await fetch(`http://127.0.0.1:5000/random_movies`)
        const data = await res.json();
        return data;
    }catch(error){
        console.log(error)
        alert(data.error)
        return [];
    }
  }

  return getRandom;
}

export default useGetRandom