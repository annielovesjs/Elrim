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
                    <Link to={`/streams/show/${stream._id}`} className={streamsStyles.streamItem} key={stream._id}>
                        <div className={streamsStyles.streamPicFrame}>
                            <img style={{width: "100%", height: "100%"}} alt="stream preview picture" className="ui tiny image middle aligned streamPic" src={ stream.image ? `data:image/jpeg;base64, ${stream.image.url}` : this.props.userImageUrl }></img>
                        </div>
                        <div className={streamsStyles.infoStream}>
                            <img className="ui tiny avatar image middle aligned" alt="streamer avatar" src={stream.streamerPic} />

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
            let title = value.title.toLowerCase();
            if(title.indexOf(this.state.searchTerm.toLowerCase()) !== -1) {
                results.push(value);
            } else if(value.username.toLowerCase() === this.state.searchTerm.toLowerCase()) {
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
        streams: state.streams,
        userImageUrl: state.auth.imageUrl
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamFind);