import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/Button/Button';
import EpisodeDetails from '../components/Podcasts/EpisodeDetails';
import AudioPlayer from '../components/Podcasts/AudioPlayer';

function PodcastsDetailsPage() {
    const {id} = useParams();
    const [podcast, setPodcast] = useState({})
    const navigate = useNavigate();
    const [episodes, setEpisodes] = useState([]);
    const [playingFile, setPlayingFile] = useState("")

    console.log("ID", id);

    useEffect(() => {
        if(id){
           return getData();
        }

    }, [id])

    const getData = async()=>{
       try {
        const docRef = doc(db, "podcasts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({id: id, ...docSnap.data() })
        toast.success("Podcast Found!")
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        toast.error("No such document!");
        navigate("/podcasts")
        }
       } catch (e) {
            toast.error(e.message)
       }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts", id, "episodes")),
            (querySnapshot) => {
                const episodeData = [];
                querySnapshot.forEach((doc) => {
                    episodeData.push({id: doc.id, ...doc.data()});
            });
            setEpisodes(episodeData);
        },
        (error)=>{
            console.error("Error fetching Episodes", error);
        }
        );
        return ()=>{
            unsubscribe();
        };
    },[id]);

    console.log("Playing File",playingFile)

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        {podcast.id && (
            <>
                <div className='podcasts-details-heading'>
                    <h1 className='podcasts-details-title' >{podcast.title}</h1>
                    {
                        podcast.createdBy == auth.currentUser.uid && (
                            <Button style={{width:"200px", margin:0 }} text={"Create Episode"} onClick={()=>{
                                navigate(`/podcast/${id}/create-episode`)
                            }}  />
                        )
                    }
                   

                </div>
                
                <div className='banner-image'>
                    <img src={podcast.bannerImage} />
                </div>
                <p className='podcast-description'>{podcast.description}</p>
                <h1 className='podcasts-details-title'>Episodes</h1>
                {
                    episodes.length>0 ? (
                        <>
                            {
                                episodes.map((episode, index)=>{
                                    return(
                                        <EpisodeDetails
                                            key={index}
                                            index={index + 1}
                                            title={episode.title}
                                            description={episode.description}
                                            audioFile={episode.audioFile}
                                            onClick={(file)=> setPlayingFile( file)}
                                        />
                                    )
                                })
                            }
                        </>
                    ):(
                        <p>No Episode</p>
                    )
                }
            </>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />}
    </div>
  )
}

export default PodcastsDetailsPage
