import { useEffect, useState } from 'react';
import { db } from '../firebase/FirebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import deleteIcon from '../assets/delete.svg';
import moment from 'moment';
import { useAuth } from '../hooks/useAuth';

const BlogDetails = () => {
  const [documentData, setDocumentData] = useState(null);
  const date = documentData?.createdAt.toDate();

  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]);

  const handleDelete = async () => {
    if (user === documentData?.user) {
      await deleteDoc(doc(db, 'blogs', id));
      navigate('/');
    }
  };

  return (
    <div className="w-full flex flex-col mt-10 mb-10">
      <div className="w-full h-[400px] overflow-hidden rounded-md">
        <img
          src={documentData?.imageUrl}
          alt="cover-img"
          className="w-full h-full bg-cover object-cover"
        />
      </div>
      {user === documentData?.user && (
        <div className="flex items-center gap-3 justify-end mt-3 mb-3">
          <img
            src={deleteIcon}
            alt="delete_icon"
            className="w-5 h-5 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-5 mb-5">
        <span className="font-serif font-semibold">{documentData?.user}</span>
        <span className="font-serif font-semibold">
          {moment(date).format('MMM Do YY')}
        </span>
      </div>
      <h1 className="text-3xl mb-5">{documentData?.title}</h1>
      <div
        className="font-sans font-normal text-slate-800"
        dangerouslySetInnerHTML={{
          __html: documentData?.description,
        }}
      />
    </div>
  );
};

export default BlogDetails;
kkkkk;
