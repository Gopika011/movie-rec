import React from 'react'

const useGetSearch = () => {
  
    const getSearch = async(query) =>{
        try {
            const res = await fetch(`http://127.0.0.1:5000/movies/search?query=${query}`)
            const data = await res.json();
            return data;
        }catch(error){
            console.log(error)
            alert(data.error)
            return [];
        }
    }

    return getSearch;
}

export default useGetSearch