import React, { useState } from 'react'
import Header from '../components/Header/Header'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputComponent from '../components/input/input'
import FileInput from '../components/input/FileInput'
import Button from '../components/Button/Button'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

function CreateEpisodePage() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title , setTitle] = useState("")
    const [desc, setDesc]= useState("")
    const [audioFile, setAudioFile] = useState();
    const [loading, setLoading] = useState(false)

    const audiofileHandle = (file) =>{
        setAudioFile(file);
    }

    const handleSubmit = async () =>{
        setLoading(true);
        if((title, desc, audioFile, id)){
            try {
                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes (audioRef, audioFile);

                const audioUrl = await getDownloadURL(audioRef);
                const episodeData = {
                    title: title,
                    description: desc,
                    audioFile: audioUrl,
                };

                await addDoc(
                    collection(db, "podcasts", id, "episodes"),
                    episodeData
                );
                toast.success("Episode Created Successfully")
                setLoading(false)
                navigate(`/podcast/${id}`)
                setTitle("")
                setDesc("")
                setAudioFile("")
                setLoading(false)

            } catch (e) {
                toast.error(e.message);
                setLoading(false)
            }
        }
        else{
            toast.error("All files are required");
            setLoading(false)
        }
    }

  return (
    <div>
      <Header />
      <div className='input-wrapper'>
        <h1>Create An Episode</h1>

        <InputComponent
            type='text'
            state={title}
            setState={setTitle}
            placeholder="Title"
            required={true}
        />

        <InputComponent
            type='text'
            state={desc}
            setState={setDesc}
            placeholder="Description"
            required={true}
        />

        <FileInput 
            accept={"audio/*"} 
            id="audio-file-input" 
            fileHandle={audiofileHandle} 
            text="Audio File Upload" 
        />

        <Button
            text={loading ? "Loading..." : "Create Episode"} 
            disabled={loading}     
            onClick={handleSubmit}
        />

      </div>
    
    </div>
  )
}

export default CreateEpisodePage
