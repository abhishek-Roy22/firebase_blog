import React, { useState } from 'react';
import Camera from '../assets/camera.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useStorage from '../hooks/useStorage';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { uploadImage } = useStorage();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
    }
  };

  const handleChange = (content, delta, source, editor) => {
    setDesc(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images) {
      return;
    }
    setUploading(true);
    try {
      await uploadImage(images, title, desc); // Await the image upload
      navigate('/');
      setImages(null);
      setTitle('');
      setDesc('');
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full mt-5 mb-5 flex flex-col">
      <h1 className="text-2xl text-slate-900 mb-2 font-serif">
        Create a New Blog
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 mt-10">
        <label className="flex items-center gap-5 w-fit">
          <img
            src={Camera}
            alt="Upload-file"
            className="relative w-10 p-2 bg-indigo-500 text-slate-100 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer"
          />
          <span className="mt-2 text-base pb-2 leading-normal font-serif">
            {images ? images.name : 'Select a file'}
          </span>
          <input
            type="file"
            onChange={handleImageChange}
            required
            className="hidden"
          />
        </label>
        <input
          type="text"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-b-2 border-indigo-500 rounded-md text-2xl font-serif outline-none focus:outline-none py-2 px-3 w-1/2"
        />
        <ReactQuill
          className="w-[700px]"
          value={desc}
          onChange={handleChange}
          placeholder="Write your description..."
          theme="snow"
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'link',
            'image',
            'video',
          ]}
        />
        <button className="w-fit bg-indigo-500 text-slate-100 cursor-pointer rounded-md p-3 font-serif">
          {uploading ? 'Uploading...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default Create;
