import React from 'react'
import Header from '../components/Header/Header'
import CreatePodcastForm from '../components/StartPodcaste/CreatePodcastForm';

function CreateAPodcastepage() {
    
  return (
    <div className='input-wrapper'>
      <Header/>
      <h1>Create A Podcast</h1>
      <CreatePodcastForm />
    </div>
  )
}

export default CreateAPodcastepage;
