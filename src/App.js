import React,{useState,useRef,useEffect} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [word ,setWord] = useState();
  const [phonetic , setPhonetic] = useState("undefined");
  const [partofspeech , setPartofspeech] = useState("undefined");
  const [definition , setDefinition] = useState("undefined");
  const [example , setExample] = useState("undefined");
  const [synonyms , setSynonyms] = useState(["undefined","undefined"]);
  const [writingsynonyms ,setWritingsynonyms] = useState();
  const SearchInput = useRef();
  
  function UpdateWord(){
    setWord(SearchInput.current.value);
  }

  function Search(){
    axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then((res) => {
      setPhonetic(res.data[0].phonetic)
      setPartofspeech(res.data[0].meanings[0].partOfSpeech)
      setDefinition(res.data[0].meanings[0].definitions[0].definition)
      setExample(res.data[0].meanings[0].definitions[0].example)
      setSynonyms(res.data[0].meanings[0].definitions[0].synonyms)
    })
    .catch(() => {
      setPhonetic("undefined")
      setPartofspeech("undefined")
      setDefinition("undefined")
      setExample("undefined")
      setSynonyms("undefined")
    })
    setWritingsynonyms(synonyms[0] +","+synonyms[1] +","+synonyms[2] +","+synonyms[3] +","+synonyms[4])
  }
  


  return (
    <div className="App">
      <div className='MainDiv'> 
        <h1>English Dictionary</h1>
        <div className="MainInputDiv">
          <div className="InputDiv" >
            <input type='text' onChange={UpdateWord} ref={SearchInput} placeholder="Search a word" />
          </div>
          <button id="Searchbtn" onClick={Search}>Search</button>
        </div>
        <div className='WordAndSpeak'>
          <h2>{word}</h2>
          <p>{partofspeech} /{phonetic}/</p>
        </div>
        <div className='MainMeaning'>
          <div className="Meaning">
            <h3>Meaning</h3>
            <p>{definition} </p>
            
          </div>
        </div>
        <div className='MainExample'>
          <div className="Example">
            <h3>Example</h3>
            <p>{example} </p>
          </div>
        </div>
        <div className="MainSynonyms">
          <div className="Synonyms">
            <h3>Synonyms</h3>
            <p> {writingsynonyms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
