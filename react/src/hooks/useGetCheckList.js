import React, { useState } from 'react'

const useGetCheckList = () => {
    const [cloading,setLoading] = useState(false)

    const getCheckList = async(userid,movieid)=>{
        setLoading(true)
        try{
            const res = await fetch(`http://127.0.0.1:5000/check_list/${userid}/${movieid}`)
            const data = await res.json()
            return data;
        }catch(error){
            console.log(error)
            return [];
        }finally {
            setLoading(false)
        }
    }

    return {cloading, getCheckList};
}

export default useGetCheckList


// import React, { useState, useEffect } from 'react';

// const useGetCheckList = (userId, movieId) => {
//     const [inWatchlist, setInWatchlist] = useState(false);
//     const [cloading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchInWatchlist = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(`http://127.0.0.1:5000/check_list/${userId}/${movieId}`);
//                 const data = await res.json();
//                 setInWatchlist(data.exists);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInWatchlist();
//     }, [userId, movieId]);

//     return { inWatchlist, cloading };
// };

// export default useGetCheckList;