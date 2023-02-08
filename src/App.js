import React,{useState,useEffect} from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [input, setInput] = useState("");
  const [inputFromButton, setInputFromButton] = useState("Hong Kong");

  function handleChange(event) {
    setInput(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    setInputFromButton(input);
    setInput("");
   
  }



  useEffect(()=>{
   async function getStoreData() {
    const res = await axios.get(`https://newsapi.org/v2/everything?q=${inputFromButton}&language=en&sortBy=publishedAt&pageSize=10&apiKey=e7c8bdae136d4c64ab24547d5d808e09`);
    setNewsData(res.data.articles);
    }
    getStoreData();
  },[inputFromButton])


  return (
    <div>
      <input type="text" value={input} onChange={handleChange}></input>
      <button type="submit" onClick={handleSubmit}>Search</button>
      <div>
        <table>
          <tr>
            <td onClick={(()=> {
              setInputFromButton("Business")
            })}>Business</td>
            <td onClick={(()=> {
              setInputFromButton("Technology")
            })}>Technology</td>
            <td onClick={(()=> {
              setInputFromButton("Sports")
            })}>Sports</td>
            <td onClick={(()=> {
              setInputFromButton("Gaming")
            })}>Gaming</td>
            <td onClick={(()=> {
              setInputFromButton("Entertainment")
            })}>Entertainment</td>
          </tr>
        </table>
      </div>
      <h1>LATEST NEWS</h1>
      {newsData.map((news,index)=>{
        return (
          <div className="news">
            <img className="newsImage" src={news.urlToImage} alt="picture"></img>
            <div className="content">
              <div className="date">
                <h3>published at: {moment(news.publishedAt).format('DD/MM/YY HH:mm')}</h3>
              </div>
              <a href={news.url} className="title">{news.title}</a>
              <h3>{news.description}</h3>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
