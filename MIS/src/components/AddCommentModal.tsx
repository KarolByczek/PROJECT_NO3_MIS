import { doc, updateDoc, setDoc } from "firebase/firestore";
import { thirdDb } from "../../AUXILIARY_OBJECTS/PortraitsDB";

const AddCommentModal = (props: any) => {

    //const collectionRef = collection(thirdDb, "PortraitData");

    function makeComment(formdata: any) {
        return {
            id: Date.now().toString(),
            content: formdata.get("the_content"),
            signature: formdata.get("the_signature")
        };
    }

    const handleAddComment = async (event: any) => {
        event.preventDefault();
        props.setter01(false);
        const form = event.target;
        const specformdata = new FormData(form);
        const specComment = makeComment(specformdata);

        const CommentRef = doc(thirdDb, "PortraitData", "NsXOGRWHw71ZuLGxy2BQ", props.portrait.portrait_comments);
        

        try {
            await updateDoc(CommentRef, specComment);
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    return (
        <div id='add_comment_modal'>
            <form className="add_employee_form" onSubmit={handleAddComment}>
                <label htmlFor="the_content">Your Comment<textarea name='the_content' /></label>
                <label htmlFor="the_signature">Your Signature<input name='the_signature' type="text" /></label>
                <button type="submit">
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
