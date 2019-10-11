import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'
import styles from './styles.module.css'

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
        searchResults: null
    }

    render() {
        return (
            <form action={`/streams/search/${this.state.searchTerm}`} className={styles.search}>
                <div className={styles.iconInput}>
                    <input className={styles.prompt} 
                        type="text" 
                        placeholder="Search streams..." 
                        onChange={(e) => this.setState({searchTerm: e.target.value})}
                    />
                    <i className={styles.searchIcon}></i>
                </div>
                <div className="results"></div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: state.streams
    }
}

export default connect(mapStateToProps, { fetchStreams })(SearchBar);