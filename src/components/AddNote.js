import React, { useRef, useState } from 'react';

const AddNote = () => {
    const baseUrl = "/notes/v1";

    const note_title = useRef(null);
    const note_category = useRef(null);
    const note_description = useRef(null);

    const [postResult, setPostResult ] = useState(null);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      }

    async function postNote () {
        const postNote = {
            title: note_title.current.value,
            category: note_category.current.value,
            description: note_description.current.value
        };

        try {
            const res = await fetch(`${baseUrl}/notes/create`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(postNote),
            });
            if(!res.ok) {
                const message = `An error has occurred: ${res.status} - ${res.statusText}`;
                throw new Error(message);
              }
              const data = await res.json();
              const result = {
                  status: res.status + "-" + res.statusText,
                  headers: {
                      "Content-Type": res.headers.get("Content-Type"),
                      "Content-Length": res.headers.get("Content-Length"),
                  },
                  data: data,
              };
              setPostResult(formatResponse(result));
        } catch (err) {
            setPostResult(err.message);
        }
    }

    const clearPostOutput = () => {
        setPostResult(null);
      }

    return (
        <div className='card'>
            <div className='card-header text-center'>Note-Taking Post</div>
            <div className='card-body'>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={note_title} placeholder='Note title'/>
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={note_category} placeholder='Note Category'/>
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={note_description} placeholder='Note Description'/>
                </div>
                <button className='btn btn-sm btn-primary' onClick={postNote}>Post Note</button>
                <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>
                { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
            </div>
        </div>
    )
}

export default AddNote;