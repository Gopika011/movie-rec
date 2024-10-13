import React from 'react'

const useGetRecommend = () => {
    const getRecommend = async(userid)=>{
        try {
            const res = await fetch(`http://127.0.0.1:5000/recommend/${userid}`)
            const data = await res.json();
            return data;
        }catch(error){
            console.log(error)
            alert(data.error)
            return [];
        }
      }
    
      return getRecommend;
}

export default useGetRecommend