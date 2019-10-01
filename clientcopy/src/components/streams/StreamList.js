import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions'
import streamsStyles from './streamsStyles.module.css'

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className={streamsStyles.adminButtons}>
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map((stream) => {
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
                        {this.renderAdmin(stream)}
                    </Link>
                </React.Fragment>
            )
        })
    }

    renderCreate() {
        return (
            <Link to="/streams/new" className="ui button primary">
                Create Stream
            </Link>
        )
    }

    render() {
        return (
            <div>
                <div className={streamsStyles.streamTitleContainer}>
                    <h2>Streams</h2>
                    {this.props.isSignedIn ? this.renderCreate() : null}
                </div>
                <div className={streamsStyles.grid}>{this.renderList()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        userImageUrl: state.auth.imageUrl,
        isSignedIn: state.auth.isSignedIn,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList); 