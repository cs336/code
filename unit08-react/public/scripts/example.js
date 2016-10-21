var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, err.toString());
         }.bind(this));
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: comments});
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor" >
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.author} onChange={this.handleAuthorChange}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="comment..."
                    value={this.state.text} onChange={this.handleTextChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval="{2000}"/>,
    document.getElementById('content')
);
