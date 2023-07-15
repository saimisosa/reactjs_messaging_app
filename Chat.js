import {useEffect, useState} from "react";
import {auth, db} from "../firebase-config";
import "../styles/Chat.css"
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore"

export const Chat = (props) => {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessage] = useState([])

    const messagesRef = collection(db, "messages")

    useEffect(
        () => {
            const queryMessages = query(
                messagesRef,
                where("room", "==", room),
                orderBy("createdAt")
            );

            const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id});
                })
                setMessage(messages);
            })
            return () => unsubscribe()
        }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    }

    return <div className="chat-app">
        <div className="header"> <h1> Welcome to: {room} </h1> </div>
        <div className="messages">
            {messages.map((message) => (
                <div className="message" key={message.id}>
                    <span className ="user">{message.user}</span>
                    {message.text}
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className = "new-message-form">
            <input
                className= "new-message-input"
                placeholder= "Start chatting!"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button type="submit" className="send-button">
                Send
            </button>
        </form>
    </div>
}