import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country:'in',
        pagesize:5,
        categories:'general'
    }
    static propTypes = {
        country: propTypes.string,
        
        categories: propTypes.string
    }
    articles = [
        {
            "source": {
                "id": "bbc-sport",
                "name": "BBC Sport"
            },
            "author": "BBC Sport",
            "title": "India v New Zealand - Cricket - BBC Sport",
            "description": "Find out the in depth batting and bowling figures for India v New Zealand in the International Test Match Series on BBC Sport.",
            "url": "https://www.bbc.co.uk/sport/cricket/scorecard/ECKO51920",
            "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
            "publishedAt": "2021-12-03T15:22:21.6805036Z",
            "content": "<table><tr><th>Batter</th><th>How Out</th><th>Bowler</th><th>Runs</th><th>Balls</th><th>4s</th><th>6s</th><th>Mins</th><th>SR</th></tr>\r\n<tr><th>Total</th><th>(70.0 overs)</th><th>221-for4wickets</th… [+2223 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ];
    constructor(props){
        super(props);
        console.log("hello i am a constructor from news component");
        document.title = `Times of World - ${this.props.categories}`
        this.state = {
            articles: this.articles,
            loading: false,
            page : 1,
            pagesize :6,
            
        }
    }

    async componentDidMount(){
        this.setState({loading:true})
        let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categories}&apiKey=c803448eae404c429ec46ae36ea0a68e&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({articles: parsedData.articles,loading:false, totalResults : parsedData.totalResults});

    }

    handleNextClick = async ()=>{
        this.setState({loading:true})
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categories}&apiKey=c803448eae404c429ec46ae36ea0a68e&page=${this.state.page+1}&pagesize=${this.props.pagesize}` ;
       let data = await fetch(url);
       let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false,
        })

       
    }
    handlePrevClick = async ()=>{
        this.setState({loading:true})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categories}&apiKey=c803448eae404c429ec46ae36ea0a68e&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
       let data = await fetch(url);
       let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles, 
            loading:false,
        })
    }
    
    
    render() {
        return (
            <div className="container my-3">
                <h1>Times of World - Top Headlines - {this.props.categories} </h1>
                {this.state.loading && <Spinner/>}  
                {/* spinner will appear while loading is true */}
                <div className="row">

                    {!this.state.loading && this.state.articles.map((element)=>{

                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title = {element.title} description = {element.description} newsUrl = {element.url} imageUrl = {element.urlToImage} element={element.author} date={element.publishedAt}/>
                    </div>

                    }) }
                </div>
                <div className="container" className="d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                <button type="button" disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pagesize)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
