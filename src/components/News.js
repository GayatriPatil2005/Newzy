import React, { Component } from 'react'
import NewsItem from './NewsItem'
import spinnerGif from './Spin@1x-1.0s-200px-200px.gif'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'top'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: true,
      error: null
    }
  }

  async componentDidMount(){
    try {
      this.setState({loading: true});
      let url = `http://localhost:5000/api/news?country=${this.props.country}&category=${this.props.category.toLowerCase()}&size=${this.props.pageSize || 20}`;
      let Data = await fetch(url);
      if (!Data.ok) {
        throw new Error(`HTTP error! status: ${Data.status}`);
      }
      let parsedData = await Data.json()
      this.setState({articles: parsedData.results || [], loading: false});
    } catch (error) {
      console.error('Fetch error:', error);
      this.setState({loading: false, error: 'Failed to load news. Please check your connection or try again.'});
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
        {this.state.articles.map((element, index)=>{
         return <div className='col-md-4' key={element.url || index}>
         <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.image_url} newsUrl={element.link}/>
        </div>
        })}
        </div>
      </div>
    )
  }
}

export default News
