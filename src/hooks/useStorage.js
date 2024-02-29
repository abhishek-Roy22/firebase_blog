import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/FirebaseConfig';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './useAuth';

const useStorage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const uploadImage = (file, title, desc) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsLoading(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Error uploading image: ', error);
      },
      async () => {
        // Handle successful uploads on complete
        const DownloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(db, 'blogs'), {
          title,
          description: desc,
          imageUrl: DownloadURL,
          user: user,
          createdAt: serverTimestamp(),
        });
      }
    );
  };

  return { uploadImage, isLoading };
};

export default useStorage;
