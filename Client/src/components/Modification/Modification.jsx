import React from "react";
import FormUserModification from "../Form/FormUserModification/FormUserModification";

export default function Modification () {
  const loggedUserJson = localStorage.getItem("authToken");
  const imageloggedUser = localStorage.getItem("userImage");
  const user = JSON.parse(loggedUserJson);
  const { id } = user.response;
  return (
    <div>
      <FormUserModification id={id} image={imageloggedUser} />
    </div>
  )
}

