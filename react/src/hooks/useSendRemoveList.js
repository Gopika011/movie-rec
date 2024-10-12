import React, { useState } from 'react'

const useSendRemoveList = () => {
    const [loading,setLoading] = useState(false)

    const sendRemoveList = async(userid, movieid)=>{
        setLoading(true)
        try{
            const res = await fetch(`http://127.0.0.1:5000/remove_list/${userid}/${movieid}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await res.json()
            return data;
        }catch(error){
            console.log(error)
            return [];
        }finally {
            setLoading(false)
        }
    }

    return {loading, sendRemoveList};
}

export default useSendRemoveList