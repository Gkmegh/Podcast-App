import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { setPodcasts } from '../slices/podcastSlice';
import PodcastsCard from '../components/Podcasts/PodcastsCard';
import InputComponent from '../components/input/input'

function PodcastsPage() {

    const dispatch = useDispatch();
    const podcasts = useSelector((state)=> state.podcasts.podcasts)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) => {
                    podcastsData.push({id: doc.id, ...doc.data()});
            });
            dispatch(setPodcasts(podcastsData));
        },
        (error)=>{
            console.error("Error fetching podcasts", error);
        }
        );
        return ()=>{
            unsubscribe();
        };
    },[dispatch]);

    let filteredPodcasts = podcasts.filter((item)=> item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>

        <h1>Discover Podcasts</h1>
        <InputComponent
            type='text'
            state={search}
            setState={setSearch}
            placeholder="Search By Title"
            required={true}
        />
        
        {
            filteredPodcasts.length > 0 ? 
            <div className='podcast-flex' style={{marginTop: "1.5rem"}}>
                {
                    filteredPodcasts.map((item)=>{
                        return (<PodcastsCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}  />)
                 })}
            </div>:
            
            (<p>{search ? "Podcast Not Found" : "No Podcasts on the Platform" }</p>)
            
            }
      </div>
    </div>
  )
}

export default PodcastsPage
