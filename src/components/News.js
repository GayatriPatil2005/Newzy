import React, { Component } from 'react'
import NewsItem from './NewsItem'
import spinnerGif from './Spin@1x-1.0s-200px-200px.gif'

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults: 0,
      error: null
    }
  }

  async componentDidMount(){
    try {
      this.setState({loading: true});
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462&page=1&pageSize=${this.props.pageSize || 20}`;
      let Data = await fetch(url);
      if (!Data.ok) {
        throw new Error(`HTTP error! status: ${Data.status}`);
      }
      let parsedData = await Data.json()
      this.setState({articles: parsedData.articles || [], totalResults: parsedData.totalResults || 0, loading: false});
    } catch (error) {
      console.error('Fetch error in componentDidMount:', error);
      this.setState({loading: false, error: 'Failed to load news. Please check your connection or try again.'});
    }
  }

  handlePreviousClick = async () => {
    try {
      this.setState({loading: true});
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462&page=${this.state.page - 1}&pageSize=${this.props.pageSize || 20}`;
      let Data = await fetch(url);
      if (!Data.ok) {
        throw new Error(`HTTP error! status: ${Data.status}`);
      }
      let parsedData = await Data.json()
      this.setState({ 
        page: this.state.page - 1,
        articles: parsedData.articles || [],
        loading: false
      });
    } catch (error) {
      console.error('Fetch error in handlePreviousClick:', error);
      this.setState({loading: false, error: 'Failed to load previous page.'});
    }
  }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize || 20)))) {
      try {
        this.setState({loading: true});
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a99e00a05ce43e39ae8a49b61365462&page=${this.state.page + 1}&pageSize=${this.props.pageSize || 20}`;
        let Data = await fetch(url);
        if (!Data.ok) {
          throw new Error(`HTTP error! status: ${Data.status}`);
        }
        let parsedData = await Data.json()
        this.setState({ 
          page: this.state.page + 1,
          articles: parsedData.articles || [],
          loading: false
        });
      } catch (error) {
        console.error('Fetch error in handleNextClick:', error);
        this.setState({loading: false, error: 'Failed to load next page.'});
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='container my-3'>
          <div className='text-center'>
            <img src={spinnerGif} alt="Loading..." />
          </div>
        </div>
      );
    }
    if (this.state.error) {
      return <div className='container my-3'><h1 className='text-center text-danger'>{this.state.error}</h1></div>;
    }
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewZy - Top Headlines</h1>
        <div className='row'>
        {this.state.articles.map((element)=>{
         return <div className='col-md-4' key={element.url}>
         <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}

        </div>
      <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize || 20))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
    )
  }
}

export default News

