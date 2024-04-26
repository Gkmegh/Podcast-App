import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

function PodcastsCard({id, title , displayImage}) {
  return (
    <Link to={`/podcast/${id}`} >
        <div className='podcast-card'>
            <img className='podcasts-display-image' src={displayImage} />
            <p className='podcasts-title'>{title}</p>
        </div>
    </Link> 
  )
}

export default PodcastsCard
