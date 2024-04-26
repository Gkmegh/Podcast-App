import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import InputComponent from '../input/input'
import Button from '../Button/Button';
import FileInput from '../input/FileInput';
import {toast} from 'react-toastify'
import { getStorage, ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db} from '../../firebase';



function CreatePodcastForm() {
  const storage = getStorage();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title , setTitle] = useState("")
    const [desc, setDesc]= useState("")
    const [displayImage, setDisplayImage] = useState()
    const [bannerImage, setBannerImage] = useState()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(){
      console.log("Submitting form");
       
        if(title && desc && displayImage && bannerImage){
          setLoading(true)
          try {
            const bannerImageRef = ref(
              storage,
              `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );

            await uploadBytes(bannerImageRef, bannerImage);

            const bannerImageUrl = await getDownloadURL(bannerImageRef)

            const displayImageRef = ref(
              storage, 
              `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );

            await uploadBytes(displayImageRef, displayImage);

            const displayImageUrl = await getDownloadURL(bannerImageRef);

            const podcastData = {
              title: title,
              description: desc,
              bannerImage: bannerImageUrl,
              displayImage: displayImageUrl,
              createdBy : auth.currentUser.uid,
            }

            const docRef = await addDoc(collection(db, "podcasts"), podcastData);
            setTitle("")
            setDesc("")
            setBannerImage(null)
            setDisplayImage(null)
            
          toast.success("Podcast Created")
          setLoading(false)

          } catch (e) {
              toast.error(e.message)
              console.log(e)
              setLoading(false)
          }
           
           
        }
        else{
          toast.error("Please Enter All Values")
        }
    }
    
    const displayfileHandle = (file) =>{
      setDisplayImage(file)
    }
    const bannerfileHandle = (file)=>{
      setBannerImage(file)
    }

  return (
    <>
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

      <FileInput accept={"image/*"} id="display-image-input" fileHandle={displayfileHandle} text="Display Image Upload" />
      <FileInput accept={"image/*"} id="banner-image-input" fileHandle={bannerfileHandle} text="Banner Image Upload" />

      <Button text={loading ? "Loading..." : "Create A Podcast"} disabled={loading}  onClick={handleSubmit}/>

    </>
  )
}

export default CreatePodcastForm;
