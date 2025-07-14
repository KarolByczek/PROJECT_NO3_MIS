import React from 'react'

const AddCommentModal = () => {
  return (
    <div id='add_comment_modal'>
      <form action="post">
        <label htmlFor="the_comment">Your Comment<input id='the_comment' type="text" /></label>
        <label htmlFor="the_signature">Your Signature<input id='the_signature' type="text" /></label>
      </form>
    </div>
  )
}

export default AddCommentModal
