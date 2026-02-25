import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
    super();
    this.state = {
      articles: [],
      loading: true
    }
  }

   async componentDidMount(){
    try {
      let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462"
      let Data =  await fetch(url);
      if (!Data.ok) {
        throw new Error('Failed to fetch news');
      }
      let parsedData =  await Data.json()
      this.setState({articles: parsedData.articles, loading: false})
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({loading: false, articles: []});
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h1>NewZy - Top Headlines</h1>
       
        <div className='row'>
        {this.state.articles.map((element)=>{
         return <div className='col-md-4' key={element.url}>
         <NewsItem   title={element.title?element.title:""} description= {element.description?element.description:""}imageUrl = {element.urlToImage} newsUrl= {element.url}/>
        </div>
        })}


        </div>
      </div>
    )
  }
}

export default News
