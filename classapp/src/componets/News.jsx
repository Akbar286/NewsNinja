import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general" 
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    console.log("hello i am a constructor from News components ");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c68dda0ca5364b06a6a72b5c00c17474&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false })
  }
  //handle the Previous buttton
  handlePrevious = async () => {
    console.log("pervious");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c68dda0ca5364b06a6a72b5c00c17474&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
     
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false
    });
  };
  // handle the next button
  handleNext = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
      console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c68dda0ca5364b06a6a72b5c00c17474&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData = await data.json();
      
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      });
    } 
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsNinja - Top Headlines</h2>
        {this.state.loading && <Spinner/>} {/*if loading is true than it will display Spinner component*/}
        {/* first row */}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element ? element.title.slice(0, 45) : ""} //this will limit the title character upto 45 characters
                  description={
                    element.description !== null? element.description.slice(0, 80) : ""
                  } //this will limit the description character upto 88 characters
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-5">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handlePrevious}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
