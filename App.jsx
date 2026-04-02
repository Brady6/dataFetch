/*This jsx REACT file obtains an image with metadata from a REST API and displays in a table */

import { useState, useEffect } from 'react'

import './App.css'
import './Grid.css'


function parseArtworkURL(url) {

  const jsonString = JSON.stringify(url);
  console.log("jsonString: " + jsonString);
  const newImageUrl = jsonString.replace("amp;", "");   //remove amp; part in string so image can be retrieved
  console.log("newImageUrl: " + newImageUrl);
  console.log(newImageUrl);
 
  const rawString = newImageUrl.slice(1, -1);   //remove surounding ""
  console.log(rawString);

  return rawString;

}

function convertDateTimes(datetime_str)
{
  const datetime_obj = new Date(datetime_str);
  const datetime_formatted = datetime_obj.toLocaleString();

  return datetime_formatted;

}



function App() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await fetch('http://devlibretime.soundfm.ca/api/live-info');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  //default image is RadioWaterloo logo 
  //check if previous artwork_url exists and return clean url
  let prev_artwork_url_clean="";
  if (data.previous.metadata.artwork_url===undefined)
    {prev_artwork_url_clean="http://libretime.soundfm.ca/api/track?id=37301&return=artwork";}
  else
    {prev_artwork_url_clean=parseArtworkURL(data.previous.metadata.artwork_url);}
  

  //check if current artwork_url exists and return clean url
  let cur_artwork_url_clean="";
  if (data.current.metadata.artwork_url===undefined)
    {cur_artwork_url_clean="http://libretime.soundfm.ca/api/track?id=37301&return=artwork";}
  else
    {cur_artwork_url_clean=parseArtworkURL(data.current.metadata.artwork_url);}
  
  //check if next artwork_url exists and return clean url
  let next_artwork_url_clean="";
  if (data.next.metadata.artwork_url===undefined)
    {next_artwork_url_clean="http://libretime.soundfm.ca/api/track?id=37301&return=artwork";}
  else
    {next_artwork_url_clean=parseArtworkURL(data.next.metadata.artwork_url);}
  

  //test image which works
  //const newUrl='http://libretime.soundfm.ca/api/track?id=37301&return=artwork';
 

  //convert datetimes
 
  const prev_starts=convertDateTimes(data.previous.starts);
  const cur_starts=convertDateTimes(data.current.starts);
  const next_starts=convertDateTimes(data.next.starts);
 
  /*
  console.log("prev_starts: " + prev_starts);
  console.log("cur_starts: " + cur_starts);
  console.log("next_starts: " + next_starts);
  */
  


  return (
    <div>
      
      <h1>{data.previous.starts}</h1>
      <h1>{data.previous.ends}</h1>
      <h1>{data.previous.name}</h1>
      <h1>{data.previous.metadata.artist_name}</h1>
      <h1>{data.previous.metadata.artwork_url}</h1>
      
      
      
      <h2>{prev_artwork_url_clean}</h2>
      <h2>{cur_artwork_url_clean}</h2>
      <h2>{next_artwork_url_clean}</h2>
  

      <img src={prev_artwork_url_clean} />   
      <img src={cur_artwork_url_clean} />   
      <img src={next_artwork_url_clean} />   
      
     
     <div class="grid-container">

      <div class="header1">start time</div>
      <div class="header2">artist</div>
      <div class="header3">track</div>
      <div class="header4">length</div>
      <div class="header5">genre</div>
      <div class="header6">artwork</div>


      <div class="item1">{prev_starts}</div>
      <div class="item2">{data.previous.metadata.artist_name}</div>
      <div class="item3">{data.previous.metadata.track_title}</div>
      <div class="item4">{data.previous.metadata.length}</div>
      <div class="item5">{data.previous.metadata.genre}</div>
      <div class="item6"><img src={prev_artwork_url_clean}/> </div>

      <div class="item7">{cur_starts}</div>
      <div class="item8">{data.current.metadata.artist_name}</div>
      <div class="item9">{data.current.metadata.track_title}</div>
      <div class="item10">{data.current.metadata.length}</div>
      <div class="item11">{data.current.metadata.genre}</div>
      <div class="item12"><img src={cur_artwork_url_clean}/></div>
      
      <div class="item13">{next_starts}</div>
      <div class="item14">{data.next.metadata.artist_name}</div>
      <div class="item15">{data.next.metadata.track_title}</div>
      <div class="item16">{data.next.metadata.length}</div>
      <div class="item17">{data.next.metadata.genre}</div>
      <div class="item18"><img src={next_artwork_url_clean}/></div>
      

      </div>
  
  

    </div>

   

  );

}

export default App
