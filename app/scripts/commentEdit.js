import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { API_URL } from './global';

module.exports = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(comments) {
            this.setState(comments[0]);
        }.bind(this));
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function() {
        var updatedComment = {
            author: this.state.author.trim(),
            text: this.state.text.trim()
        }
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedComment),
            success: function(comments) {
                this.setState(comments[0]);
            }.bind(this)
        });
    },
    handleDelete: function() {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
            success: function(comments) {
                this.setState(comments[0]);
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
		<form className="commentForm" onSubmit={this.handleSubmit}>
		    <h1>Comment Edit - {this.state.id}</h1>
		    <input
			type="text"
			value={this.state.author}
			onChange={this.handleAuthorChange}
		    />
		    <input
			type="text"
			value={this.state.text}
			onChange={this.handleTextChange}
		    />
		    <input type="submit" value="Update" />
		    <button type="button" onClick={this.handleDelete}>Delete</button>
		</form>
		<Link to='/'>Back</Link>
            </div>
        );
    }
});
