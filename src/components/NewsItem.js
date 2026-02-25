import React, { Component } from 'react'

export class NewsItem extends Component {



  render() {
      let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
  <img src={!imageUrl?"https://platform.ny.eater.com/wp-content/uploads/sites/6/2026/02/Tin-Building_T-Brasserie-920x518-1.jpg?quality=90&strip=all&crop=0,3.5062362287493,100,92.987527542501}":imageUrl} className='card-img-top' alt='...'/>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">
     {description}
    </p>
    <a href={newsUrl} target="_blank" className='btn btn-sm btn-primary'>
      Read More
    </a>
  </div>
</div>
    )
  }
}

export default NewsItem
