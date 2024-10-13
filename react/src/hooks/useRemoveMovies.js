import React, { useState } from 'react'

const useRemoveMovies = () => {
    const [loading,setLoading] = useState(false)

    const removeMovies = async(movieid)=>{
        setLoading(true)
        try{
            const res = await fetch(`http://127.0.0.1:5000/delete_movie/${movieid}`)
            const data = await res.json()

            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
            }
        }catch(error){
            console.log(data.error)
            alert(error)
        }finally {
            setLoading(false)
        }
    }

    return {loading, removeMovies};
}

export default useRemoveMovies