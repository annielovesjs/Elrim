import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions'
import streamsStyles from './streamsStyles.module.css'


class StreamFind extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            searchResults: null
        }
    }

    componentDidMount() {
        this.props.fetchStreams();
        const { term } = this.props.match.params;
        this.setState({ searchTerm: term })
    }

    renderSearchResults(resultsArr) {
        return resultsArr.map((stream) => {
            return (
                <React.Fragment>
                    <Link to={`/streams/${stream.id}`} className={streamsStyles.streamItem} key={stream.id}>
                        <div className={streamsStyles.streamPicFrame}>
                            <img style={{width: "100%", height: "100%"}} className="ui tiny image middle aligned streamPic" src={`data:image/jpeg;base64, ${stream.image.url}`}></img>
                        </div>
                        <div className={streamsStyles.infoStream}>
                            <img className="ui tiny avatar image middle aligned" src={stream.streamerPic} />

                            <div className={streamsStyles.streamData}>
                                <div className={streamsStyles.title}>{stream.title}</div>
                                <div className={streamsStyles.description}>
                                    {stream.username}
                                </div>
                            </div>
                        </div>
                    </Link>
                </React.Fragment>
            )
        })
    }
    

    render() {
        if(this.props.streams === {}) {
            return <div>find</div>
        }
        let results = [];
        for(const [key, value] of Object.entries(this.props.streams)) {
            const title = value.title;
            if(title.indexOf(this.state.searchTerm) !== -1) {
                results.push(value);
            } else if(value.username === this.state.searchTerm) {
                results.push(value);
            }
        }
        if(results.length === 0) {
            return <div>{`No results found for: ${this.state.searchTerm}`}</div>
        }
        return <div className={streamsStyles.grid}>{this.renderSearchResults(results)}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        streams: state.streams
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamFind);