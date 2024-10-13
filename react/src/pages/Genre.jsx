import React from 'react'
import GenrePage from '../components/GenrePage/GenrePage'
import { useParams } from 'react-router-dom'

const Genre = () => {
  const {genreName} = useParams(); //get genre name from url
  return (
    <div>
      <GenrePage genre={genreName}/>
    </div>
  )
}

export default Genre