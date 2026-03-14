import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults: 0
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462&page=1&pageSize=20";
    let Data = await fetch(url);
    let parsedData = await Data.json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462&page=${this.state.page - 1}&pageSize=20`;
    let Data = await fetch(url);
    let parsedData = await Data.json()
    this.setState({ 
      page: this.state.page - 1,
      articles: parsedData.articles 
    });
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462&page=${this.state.page + 1}&pageSize=20`;
      let Data = await fetch(url);
      let parsedData = await Data.json()
      this.setState({ 
        page: this.state.page + 1,
        articles: parsedData.articles 
      });
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewZy - Top Headlines</h1>
       
        <div className='row'>
        {this.state.articles.map((element)=>{
         return <div className='col-md-4' key={element.url}>
         <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}

        </div>
      <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>← Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next →</button>

      </div>
      </div>
    )
  }
}

export default News
