import React from "react";
// import { BsTrash } from "react-icons/bs";
// import { AiFillEdit } from "react-icons/ai";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
// const axios = require("axios");

function Message({
  message,
  setIsEditing,
  setMessageId,
  setIsUpdatingData,
  setEditText,
  setEditFrom,
}) {
  const timeDifference = Date.parse(Date()) - Date.parse(message.timeSent)+10000;
  // var milliseconds = Math.floor((timeDifference % 1000) / 100),
  // seconds = Math.floor((timeDifference / 1000) % 60),
  let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

  // hours = hours < 10 ? "0" + hours : hours;
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? "0" + seconds : seconds;
  const sentTime = hours + ":" + minutes;

  console.log(sentTime);
  function handleDelete(id) {
    // console.log("hello from delete");
    // axios({
    //   method: "delete",
    //   url: `https://muratdemirtas-chat-server.glitch.me/messages/${id}`,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     handler();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    fetch(`https://muratdemirtas-chat-server.glitch.me/messages/${id}`, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setIsUpdatingData(true));
  }

  // function handleEdit(event) {
  //   event.preventDefault();
  //   event.preventDefault();
  //   console.log("hello from onSubmitHandleEdit");
  //   // setIsEditing(true);
  //   var body = {
  //     // text: editText,
  //     // from: editText,
  //   };

  //   axios({
  //     method: "put",
  //     // url: `https://muratdemirtas-chat-server.glitch.me/messages/${id}`,
  //     data: body,
  //   });
  // }

  return (
    <>
      <div className="message-wrapper">
        <div className="message-text-wrapper">
          <p> From: {message.from}</p>
          <p>Sent: {hours>1? (hours +" hour(s) and"+ minutes+" minutes ago") : minutes+" minutes ago" } </p>
          <p>{message.text}</p>
        </div>
        <div className="message-icons-wrapper">
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon
                fontSize="large"
                onClick={() => handleDelete(message.id)}
              />
            </IconButton>
          </Tooltip>
          {/* <BsTrash */}
          {/* size="30" className="icon" onClick={() => handleDelete(message.id)}
          /> */}
          {/* <button onClick={() => handleDelete(message.id)}>delete</button> */}
          <Tooltip title="Edit">
            <IconButton aria-label="edit">
              <EditIcon
                fontSize="large"
                onClick={() => {
                  setMessageId(message.id);
                  setEditText(message.text);
                  setEditFrom(message.from);
                  setIsEditing(true);
                }}
              />
            </IconButton>
          </Tooltip>
          {/* <AiFillEdit
            size="30"
            className="icon"
            onClick={() => handleEdit(message.id)}
          /> */}
          {/* <button onClick={() => handleEdit(message.id)}>Edit</button> */}
        </div>
      </div>
    </>
  );
}

export default Message;
