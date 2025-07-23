import { doc, updateDoc } from "firebase/firestore";
import { thirdDb } from "../../AUXILIARY_OBJECTS/PortraitsDB";
import { useCurrentPortrait } from './CurrentPortraitContext';
import { useState } from "react";

const AddCommentModal = (props) => {
    const { currentPortrait } = useCurrentPortrait();
    const portraitKey = currentPortrait?.portraitKey;
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!portraitKey) {
        console.error("No portraitKey found in currentPortrait");
        return;
    }

    function makeComment(formdata) {
        return {
            id: Date.now().toString(),
            content: formdata.get("the_content"),
            signature: formdata.get("the_signature")
        };
    }

    const handleAddComment = async (event) => {
        event.preventDefault();
        setLoading(true); // ⏳ Start loading

        const form = event.target;
        const specformdata = new FormData(form);
        const specComment = makeComment(specformdata);

        const CommentRef = doc(thirdDb, "PortraitData", "NsXOGRWHw71ZuLGxy2BQ");

        const commentKey = `comment_${Date.now()}`; // or use a UUID

        try {
            await updateDoc(CommentRef, {
                [`${portraitKey}.portrait_comments.${commentKey}`]: specComment
            });
            // ✅ Update local UI immediately
            props.setter02(portraitKey, specComment);
            console.log("Comment added successfully!");
            setSuccess(true); // ✅ Show success message
            // Optional: hide modal after 2 seconds
            setTimeout(() => {
                props.setter01(false);
            }, 2000);

        } catch (error) {
            console.error("Error adding comment: ", error);
        }
        finally {
            setLoading(false); // ✅ Always stop loading
        }
    };

    return (
        <div id='add_comment_modal'>
            {success ? (
                <div className="success-message">
                    ✅ Comment submitted!
                </div>
            ) : (
                <>
                    <form className="add_employee_form" onSubmit={handleAddComment}>
                        <label htmlFor="the_content">
                            Your Comment
                            <textarea name='the_content' required />
                        </label>
                        <label htmlFor="the_signature">
                            Your Signature
                            <input name='the_signature' type="text" required placeholder="Your name or nickname (maximum 30 characters)" maxLength={30}/>
                        </label>
                        <button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "SUBMIT"}
                        </button>
                    </form>
                    <button onClick={() => props.setter01(false)}>
                        IF YOU'D RATHER KEEP IT TO YOURSELF, THIS IS THE CHANCE
                    </button>
                </>
            )}
        </div>
    );
};

export default AddCommentModal;