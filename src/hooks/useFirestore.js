import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import { useEffect, useState } from 'react';

const useFirestore = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, 'blogs'), orderBy('createdAt', 'desc')),
      (querySnapshot) => {
        const blogs = [];
        querySnapshot.forEach((doc) => {
          const { imageUrl, createdAt, user, title, description } = doc.data();
          blogs.push({
            imageUrl,
            createdAt,
            user,
            id: doc.id,
            title,
            description,
          });
        });
        setDocs(blogs);
        setIsLoading(false);
      },
      (error) => {
        console.error(error.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { docs, isLoading };
};

export default useFirestore;
