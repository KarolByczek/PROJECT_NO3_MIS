
const AddCommentModal = (props:any) => {
    return (
        <div id='add_comment_modal'>
            <form action="post">
                <label htmlFor="the_comment">Your Comment<textarea id='the_comment'/></label>
                <label htmlFor="the_signature">Your Signature<input id='the_signature' type="text" /></label>
                <button 
                onClick={(event) => {
                    event.preventDefault;
                    
                    props.setter01(false);
                }}>
                    SUBMIT
                </button>
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
