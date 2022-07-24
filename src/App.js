import React, { useState, useEffect } from 'react';
import Form from './Form';
// import Header from './components/Header';
// import {Link} from 'react-router-dom'
const App = () => {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState('Articles');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`);
        const articles = await res.json();
        setArticles(articles.response.docs);
        setIsLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchArticle();
  }, [term]);

  return (
    <>
      <header className="flex items-center justify-between bg-black text-white p-4">
        <div className="logo">
        
         <h2 className="font-bold text-xl md:text-2xl lg:text-3xl"> VY Article Website
          </h2>
    
        </div>
        <nav>
          <ul className="flex">
            <li className="mr-5 lg:text-lg"><button> Home</button></li>
            <li className="lg:text-lg"> <button> About </button> </li>
          </ul>
        </nav>
</header>
   
      <div className="showcase">
        <div className="overlay">
        {/* <Header/> */}
          <h1 className="text-4xl font-bold capitalize  text-white text-center mb-5 lg:text-7xl">
            Viewing articles about {term}
          </h1>
          <Form searchText={(text) => setTerm(text)} />
        </div>
      </div>

      {isLoading ? (<h1 className="text-center mt-20 font-bold text-6xl">Loading...</h1>) : (
        <section className="px-5 pt-10 pb-20 grid grid-cols-1 gap-10">
          {articles.map((article) => {
            const { abstract ,headline: { main }, byline: { original }, lead_paragraph, news_desk, section_name, web_url, _id, word_count } = article
            return (

              <article key={_id} className=" bg-white py-10 px-5 rounded-lg md:w-[70%] mx-auto lg:w-[70%] mx-auto">
                <h2 className="font-bold text-2xl mb-2">{main}</h2>
<p>{abstract}</p>
                <p>{lead_paragraph}</p>
                <ul className="my-4">
                  <li>{original}</li>
                  <li><span className="font-bold">News Desk:</span>{news_desk}</li>
                  <li><span className="font-bold">Section Name:</span>{section_name}</li>
                  <li><span className="font-bold">Word Count:</span>{word_count}</li>
                </ul>
                <a href={web_url} target="_blank" rel="noreferrer" className="underline"> web Resource</a>
              </article>
            )
          })}
        </section>


      )}
    </>
  );
}

export default App;
