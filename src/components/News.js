import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [

    ]
    constructor(){
    super();
    this.state = {
      articles: this.articles,
      loading: false
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h2>NewZy - Top Headlines</h2>
        <div className='row'>
        <div classname='col-md-4'>
         <NewsItem title="myTitle" description= "mydesc"imageUrl = "too" newsUrl= "too"/>
        </div>
        <div classname='col-md-4'>
         <NewsItem title="myTitle" description= "mydesc"/>
        </div>
        <div classname='col-md-4'>
         <NewsItem title="myTitle" description= "mydesc"/>
        </div>
        </div>
      </div>
    )
  }
}

export default News
