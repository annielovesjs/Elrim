import React from 'react';
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'
import streamsStyles from './streamsStyles.module.css'


class StreamCreate extends React.Component {
    onSubmit = (formProps) => {
        this.props.createStream({...formProps, username: this.props.username, streamerPic: this.props.streamerPic});
    }

    render() {
        return (
            <div className={streamsStyles.streamForm}>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const validate = (formValues) => {
    const errors = {} //hooked up it render of the input title name 
    if(!formValues.title) {
        errors.title = "You need to enter a valid title"
    }

    if(!formValues.description) {
        errors.description = "You need to enter a valid description"
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        streamerPic: state.auth.imageUrl
    }
}
export default connect(mapStateToProps, {createStream})(StreamCreate);