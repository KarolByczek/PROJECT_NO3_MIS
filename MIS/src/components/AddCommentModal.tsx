import React from 'react'

const AddCommentModal = (props:any) => {
    return (
        <div id='add_comment_modal'>
            <form action="post">
                <label htmlFor="the_comment">Your Comment<input id='the_comment' type="text" /></label>
                <label htmlFor="the_signature">Your Signature<input id='the_signature' type="text" /></label>
            </form>
            <button
                onClick={() => {
                    props.setter01(false);
                }}>
                    IF YOU'D RATHER KEEP IT TO YOURSELF, THIS IS THE CHANCE
            </button>
        </div>
    )
}

export default AddCommentModal
