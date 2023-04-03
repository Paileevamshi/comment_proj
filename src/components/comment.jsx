import React, { useEffect } from 'react'
import { useState } from 'react'
let reply = -1;
const handleStorage = () => {
    const storage = localStorage.getItem("comments")
    if (storage) {
        return JSON.parse(storage);
    }
    return []
}

const Comment = () => {
    const [inputbox, setInput] = useState("")
    const [inputReply, setReply] = useState("")

    const [comments, setComments] = useState(handleStorage());
    useEffect(() => {
        localStorage.setItem("comments", JSON.stringify(comments))

    }, [comments])


    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleClick = () => {
        const updated = [...comments, { comment: inputbox, creply: [] }];
        setComments(updated);
        setInput("");


    }
    const handleReply = (id) => {

        const modalbg = document.querySelector(".modal");
        document.querySelector(".replyInfo").value = "";
        modalbg.classList.add("active");
        reply = id;
        console.log(reply)
    }
    const handleKeyup = (e) => {
        if (e.keyCode === 13)
            handleClick();
    }
    const handleEnter = (e) => {

        if (e.keyCode === 13) {
            const newComments = [...comments]

            newComments[reply].creply.push(inputReply);
            setComments(newComments);
            document.querySelector(".modal").classList.remove("active");

        }



    }
    const handleDelete = (id) => {



        const updatedComments = comments.filter((comment, index) => {
            return id !== index;
        })


        setComments(updatedComments)



    }
    const handleCommentReply = (e) => {
        setReply(e.target.value)
    }

    return (
        <div className="comment">
            <div className="section-1">

                {
                    comments.map((comment, id) =>
                    (
                        <>
                            <div className="each-item" key="id">
                                <div className="img"></div>
                                <div className="info">{comment.comment}</div>
                                <div className="remove"><i class="fa-solid fa-trash" onClick={() => handleDelete(id)}></i></div>
                                <div className="reply"><i class="fa-solid fa-reply" onClick={() => handleReply(id)}></i></div>


                            </div>
                            {
                                comment.creply.map((each) => (
                                    <div className="creply">{each}</div>
                                ))
                            }

                        </>
                    ))
                }
            </div>
            <div className="section-2">
                <div className="img"> </div>
                <input type="text" placeholder='Type ur comment' onChange={handleChange}
                    value={inputbox} onKeyUp={handleKeyup}
                />
            </div>
            <div className="post">
                <button className="post" onClick={handleClick}>post</button>
            </div>
            <div className="modal">
                <div className="popup">
                    <p className="matter">Reply</p>
                    <input type="text" value={inputReply} onChange={handleCommentReply} onKeyUp={handleEnter} className='replyInfo' />
                </div>
            </div>
        </div>
    )
}

export default Comment
