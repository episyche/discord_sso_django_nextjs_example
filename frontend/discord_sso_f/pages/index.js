import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react"

export default function Home({ providers }) {
  const { data: session, loading } = useSession()
  useEffect(() => {
    if (session) {
      if (session.provider === "discord") {
        var auth_token = session.auth_token
        backendapi(auth_token)
      }

    }

  }, [session])

  function backendapi(auth_token) {
    fetch(`http://127.0.0.1:8000/accounts/discord/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "auth_token": auth_token }),
    }).then((data) => data.json())
      .then((res) => {
        if (res.token) {
          document.getElementById("email_id").innerText = res.email
          document.getElementById("token").innerText = res.token
        }
      })
  }
  return (
    <>

      <div id='discord-container'>
        <div type="submit" id='discordlogin' onClick={() => signIn("discord")}>
          <div className='discord-button'>
            <h1>
              <img className="discord-img" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png" ></img>
            </h1>
            <button className="discord-login-btn">Sign in to Discord</button>
          </div>
        </div>
      </div>

      <div className='new_text'>
        <div >
          <label>Email Id : </label>
          <label id='email_id'></label>
        </div>
        <div >
          <label>Auth token : </label>
          <label id='token'></label>
        </div>
      </div>
    </>
  )
}