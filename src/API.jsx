import { useEffect, useState } from "react";
import axios from "axios";

const APIExample = () => {
  const [news, setNews] = useState([]);
  const [page,setPage]  = useState(1)

  useEffect(() => {
     axios.get("https://newsapi.org/v2/top-headlines?country=in&apikey=5bbaeb1c319541028a4615d92c508322")
      .then((res) => {
        console.log(res.data)
        setNews(res.data.articles)
      })
    },[])

    const SelectedPage=(selected)=>{
        if(selected>=1&&
           selected<=news.length/5&&
           selected!=page )
        setPage(selected)
    }

      return (
        <>
        <div className="container my-5">
          <div className="row text-center">
        {news.slice(page*5-5,page*5).map((val)=>{
            return(
                <div className="col my-3">
            <div className="card" style={{width: "18rem"}}>
        <img src={val.urlToImage} className="card-img-top" alt="..."></img>
      <div className="card-body">
      <h5 className="card-title">{val.title}</h5>
      <p className="card-text">{val.description} </p>
      <a href="#" className="btn btn-primary">Read Later</a>
       </div>
       </div>
       </div>
         );
        } ) };
          
          </div>
          <div className="Pagination"> 
          <span className={page>1?"":"ArrowDisabled"} onClick={()=>SelectedPage(page-1)}>⬅️</span>
         {[...Array(news.length/5)].map((_,i)=>{
            return <span className={page===i+1?"Page_Pointer":""} onClick={()=>SelectedPage(i+1)} key={i}>{i+1}</span>
            
         })}
          <span className={page<news.length/5?"":"ArrowDisabled"} onClick={()=>SelectedPage(page+1)}>➡️</span>
          </div>
          </div>
        </>
      );

}
export default APIExample 
{/* <div className="Container">
          <div className="Card">
          <ul>
            {news.map((item) => {
              return (
                <li>
                    <img src={item.urlToImage} style={{height:200}} alt="" />
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                    <button>Read Later</button>
                </li>
              );
            })}
          </ul> 
          </div>
          </div> */}