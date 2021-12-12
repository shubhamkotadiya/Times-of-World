import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let  {title, description, imageUrl, newsUrl, author, date}  = this.props ;
        return (
            
            <div>
                <div className="card my-3" style={{width:' 18rem'}}>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString() }</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-dark  btn-sm">read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
