import React,{Component} from 'react';
import './App.css';
import Form from './Form.js';
import {Link} from 'react-router-dom';
// import {BrowserRouter as Router,Route} from 'react-router-dom';
// import  { Redirect } from 'react-router-dom'
// import $ from 'jquery';

class App extends Component {

  constructor(){
    super();
    this.state = {
      hideloader : false,
      coinlist : [],
      searchlabel : false,
      container:false,
      title : null,
      url:null,
      countryOrigin:null,
      cgRank:null,
      date : null,
      cgScore : null,
      score:null,
      communityScore:null,
      liquidityScore:null,
      publicInterestScore:null,
      capRank : null,
      details : null,
      homepage:null

    }
    this.infoHandler=this.infoHandler.bind(this);
  }

async infoHandler(x){
  var id = x.toLowerCase();
  console.log("lower case");
  console.log(id);
  const coinsList = this.state.coinlist;
  var search;
  coinsList.forEach(function(value,index){
      if(value.id===id){
        search = value.id;
      }
  });
  console.log(search);
  const res = await fetch("https://api.coingecko.com/api/v3/coins/"+search);
  const data = await res.json();
  console.log(data);
  this.setState({searchlabel : true,title: data.name,url : data.image.large,container:true,countryOrigin: data.country_origin,score: data.developer_score,communityScore: data.community_score,liquidityScore: data.liquidity_score,publicInterestScore: data.public_interest_score,cgRank: data.coingecko_rank,cgScore:data.coingecko_score,capRank: data.market_data.market_cap_rank, date : data.genesis_date, details: data.description.en,homepage: data.links.subreddit_url});
  console.log(this.state.homepage);
}
async componentDidMount(){
  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const data = await res.json();
  this.setState({ hideloader:true,coinlist : data});
  console.log(this.state.coinlist);
}

render(){
  const style = this.state.searchlabel ? {display : 'none'}:{};
  const style1 = this.state.container ? {}:{display : 'none'};
  var title = this.state.title;
  var url = this.state.url;
  var origin = this.state.countryOrigin;
  var score = this.state.score;
  var date = this.state.date;
  var communityScore = this.state.communityScore;
  var liquidityScore= this.state.liquidityScore;
  var publicInterestScore = this.state.publicInterestScore;
  var coinGeckoRank= this.state.cgRank;
  var coinGeckoScore= this.state.cgScore;
  var marketCapRank= this.state.capRank;
  var details = this.state.details;
  var homepageurl = this.state.homepage;
    return (
    <div className="main" >
       
       <h1 className="header">Crypto Wiki</h1>
        {this.state.hideloader ? <div><div><Form  infoHandler={this.infoHandler}/><div className="label" style={style}><h4>Search For a Coin</h4></div></div></div> : <div className="loader">Loading The Coin List.......</div>   }
      <div className="component-container" style={style1}>
    <a href={homepageurl}><div className="panelTitle" >{title}</div></a>
        <div className="panelLeft">
          <div className="coinImage">
            <img src ={url} style={{width : '100%'}} alt={title}/>
          </div>
          <div className="coinDetail">
            <div className="deatailabel">Country of Origin -</div>
            <div className="info">{origin}</div>
            <div className="deatailabel">Date Of Apperance -</div>
            <div className="info">{date}</div>
            <div className="deatailabel">Market Cap Rank -</div>
            <div className="info">{marketCapRank}</div>
            <div className="deatailabel">Coin Gecko -</div>
            <div className="info">Rank - {coinGeckoRank}</div>
            <div className="info">Score - {coinGeckoScore}</div>
            <div className="deatailabel">Developer Score -</div>
            <div className="info">{score}</div>
            <div className="deatailabel">Community Score -</div>
            <div className="info">{communityScore}</div>
            <div className="deatailabel">Liquidity Score -</div>
            <div className="info">{liquidityScore}</div>
            <div className="deatailabel">Public Interest Score -</div>
            <div className="info">{publicInterestScore}</div>
          </div>
        </div>
        <div className="panelRight">{details}</div>
      </div>
    
    </div>
   );
 }
 }

export default App;
