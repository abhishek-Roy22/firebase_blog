import React from 'react';
import Blogs from '../components/Blogs';

const Home = () => {
  return (
    <section className="w-full mt-4 mb-4">
      <h1 className="text-3xl text-slate-900 font-semibold mt-4 mb-4 font-serif">
        Recent blog Posts
      </h1>
      <Blogs />
    </section>
  );
};

export default Home;
