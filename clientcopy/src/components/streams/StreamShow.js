import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import streamsStyles from './streamsStyles.module.css'

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        if(this.player) {
            this.player.destroy();
        }
    }

    buildPlayer() {
        const { id } = this.props.match.params;
        if(this.player || !this.props.stream) {
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls/>
                <h1>{title}</h1>
                <div className={streamsStyles.streamDataShow}>
                    <img className="ui tiny avatar image middle aligned" src={this.props.stream.streamerPic} />
                    <div className={streamsStyles.username}>
                        {this.props.stream.username}
                    </div>      
                </div>
                <h5>{description}</h5>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream }) (StreamShow);