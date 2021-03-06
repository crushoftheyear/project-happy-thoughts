import React, { useState } from 'react'
import { Textarea } from './Textarea.js'
import { TextInput } from './TextInput.js'

export const PostThought = ({ setThoughts, setPage, apiUrl }) => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  // Check length of input
  const checkLength = (str, min, max) => {
    return str.length < min || str.length > max
  }

  // Send button
  const handleSubmit = (event) => {
    event.preventDefault()

    const thoughtBody = JSON.stringify({ message, name }, (key, value) => {
      if (value) {
        return value
      } else {
        return undefined
      }
    })

    fetch(`${apiUrl}/thoughts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: thoughtBody
    }).then(() => {
      window.location.reload()
    })
    // Clear the textarea
    setMessage('')
  }

  return (
    <section className="post-thought">

      <h1>What's making you happy right now?</h1>

      <form onSubmit={handleSubmit}>
        <Textarea
          message={message}
          setMessage={setMessage}
          checkLength={checkLength(message, 5, 140)} />

        <div className="char-count">{140 - message.length}/140</div>

        <TextInput
          name={name}
          setName={setName}
          checkLength={checkLength(name, 2, 30)} />

        <button type="submit" className="post-btn" disabled={(checkLength(message, 5, 140)) ? true : false}> {/* Disable button if message or name length is not valid */}
          Send happy thought
        </button>
      </form>

    </section>
  )
}