import React from 'react'

const useEditMovies = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const editMovies = async(movieid) =>{
        setLoading(true)
        try{
            const res = await fetch(`http://127.0.0.1:5000/update_movie${movieid}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username,password})
            })

            const data = await res.json()
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
            }

        }catch(error){
            console.log(error)
            alert(error)
        }finally {
            setLoading(false)
        }
    }

    return {loading, editMovies};
}

export default useEditMovies