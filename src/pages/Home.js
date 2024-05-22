import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid'; // for random user id
import toast from 'react-hot-toast'; //to get notifications
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault(); // to stop reloading of page
        const id = uuidV4(); // to generate a random user id, we use version 4 of uuid
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // if username or roomid available, then redirect user to editorpage
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    // to joinroom on pressing enter after entering room information
    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                />
                <h4 className="mainLabel">Enter Room Informations :</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href=""
                            className="createNewBtn"
                        >
                            New Room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Realtime code collaboration | Built by&nbsp;
                    <a href="https://github.com/Shivamsharma9425">Shivam</a> 
                </h4>
            </footer>
        </div>
    );
};

export default Home;
