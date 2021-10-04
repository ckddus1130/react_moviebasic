import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";
const App = () => {

  const [isLoading, setisLoading] = useState(true);
  const [movies,setMovies] = useState();

  // react class 형 컴포넌트 라이프 사이클 componentDidMout componentDidUpdate를 대신하는 useEffect
  // 아래와 같이 [] 아무런 값이 없다면 마운트,없데이트 됬을 때 마운트가 찍힙니다.

  useEffect(()=>{
    setTimeout(() => {
      setisLoading(false);
    },4000)
  },[])

  useEffect(async ()=> {
    const {data:{data:{movies}}} = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=rating');
    //console.log(movies);
    return setMovies(movies);  // Expected an assignment or function call and instead saw an expression  에러는 { 안에는 return 이 필수} 아니면 {} 를 ()로 바꿔줘야합니다.

    },[])

  return(
    <section className="container">
      {isLoading ? 
          <div className="loader">
          <span className="loader__text">Loading....</span>
          </div>
          : <div className="movies">
            {movies.map((movie) => {
              return <Movie 
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}/>
            })};
            </div>}
    </section>
  )
}


export default App;