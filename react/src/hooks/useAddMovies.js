import React, { useState } from 'react'

const useAddMovies = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const addMovies = async(movieData) =>{
        setLoading(true)
        try{
            const res = await fetch(`http://127.0.0.1:5000/add_movie`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(movieData)
            })
            const data = await res.json();
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
            }
        }catch(error){
            console.log(error)
            alert(data.error)
        }finally {
            setLoading(false)
        }
    }

    return {loading, addMovies};
}

export default useAddMovies