import React from 'react';
import Remarkable from 'remarkable';

import style from '../css/base.css';

module.exports = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="comment">
                <span className={style.commentAuthor} >
                    {this.props.author}&nbsp;&mdash;&nbsp;
                </span>
                <span className={style.commentText} dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});
