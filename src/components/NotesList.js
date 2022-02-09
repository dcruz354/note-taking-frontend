import React, {useRef, useState} from "react";

const NotesList = () => {
    const baseUrl = "/notes/v1";

    const get_id = useRef(null);
    
    const[getResult, setGetResult] = useState(null);
    const[getResultById, setGetResultById] = useState(null);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      }
    
    async function getAllNotes() {
        try {
            const res = await fetch(`${baseUrl}/notes`);

            if(!res.ok) {
                const message = `An error has occurred: ${res.status} - ${res.statusText}`;
                throw new Error(message);
              }
            
            const data = await res.json();
            setGetResult(data);
        } catch (err) {
            setGetResult(err.message);
        }
    }

    const clearGetOutput = () => {
        setGetResult(null);
        setGetResultById(null);
      }

    async function getNoteByID() {
        const id = get_id.current.value;

        if(id) {
            try {
                const res = await fetch(`${baseUrl}/notes/${id}`);

                if(!res.ok) {
                    const message = `An error has occurred: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                  }
          
                  const data = await res.json();
          
                  const result = {
                    data: data,
                    status: res.status,
                    statusText: res.statusText,
                    headers: {
                      "Content-Type": res.headers.get("Content-Type"),
                      "Content-Length": res.headers.get("Content-Length"),
                    },
                  };

                  setGetResultById(formatResponse(result));
            } catch (err) {
                setGetResultById(err.message);
            }
        }
    }

    return (
        <div className="card">
            <div className="card-header text-center">
                Note-Taking Frontend
            </div>
            <div className="card-body">
                <div className="input-group input-group-sm">
                    <button className="btn btn-sm btn-primary" onClick={getAllNotes}>Get All Notes</button>

                    <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
                    <div className="input-group-append">
                        <button className="btn btn-sm btn-primary" onClick={getNoteByID}>Get Note by Id</button>
                    </div>

                    <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
                </div>
                { getResultById && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResultById}</pre></div> }
                { getResult && 
                    <div className="table-responsive">
                        <table className="card-table table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getResult.map(note => {
                                    return (
                                        <tr>
                                            <th scope="row" key={note.id}>{note.id}</th>
                                            <td>{note.title}</td>
                                            <td>{note.category}</td>
                                            <td>{note.description}</td>
                                            <td>{note.localDateTime}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default NotesList;