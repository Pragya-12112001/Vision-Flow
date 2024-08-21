import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Loading } from '../loadAnimation';
import DisplayPost from './DisplayPost';
import FormField from "./FormField"
import "../generator.css"
// import { InputMicClear } from './generator';

const Home = () => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(true);
  const postRef = collection(db, "post")

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = posts.filter((item) => item.user.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  useEffect(() => {
    setLoading(true)
    const getPost = () => {
      getDocs(postRef)
        .then(data => {
          setPost(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
          setLoading(false)
        })
    }
    getPost();
  }, [])
  return (
    <section className="home">
      <div>
        <h1 >The Community Showcase</h1>
        <p >Browse through a collection of imaginative and visually stunning images..</p>
      </div>

      {/* <InputMicClear  />      */}
      <div className='homeForm input-mic '>
        <FormField
          type="text" 
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div>
        {loading ? (
          <div >
            <Loading />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 >
                Showing Resuls for <span className="">{searchText}</span>:
              </h2>
            )}
            <div className="posts">
              {searchText && searchedResults ? (
                searchedResults.map(post=>(
                <DisplayPost
                  post={post}
                />
                ))
              ) : (posts.map(post=>(
                <DisplayPost
                  post={post}
                />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
export default  Home;
 