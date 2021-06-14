import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getList = () => {
  let list = localStorage.getItem('list')
  if (list) list = JSON.parse(localStorage.getItem('list'))
  else list = []
  return list
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getList())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [hint, setHint] = useState({ display: false, msg: '', type: '' })

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      showHint(true, 'empty values', 'danger')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) item.title = name
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showHint(true, 'item updated', 'success')
    } else {
      showHint(true, 'item added', 'success')
      let id = list.length
      if (id) id = list[list.length - 1].id + 1
      const newItem = { id, title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
    showHint(true, 'item deleted', 'danger')
  }
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(editItem.title)
    showHint(true, 'start editing', 'success')
  }

  const showHint = (display = false, msg, type) => {
    setHint({ display, msg, type })
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {hint.display && <Alert {...hint} removeHint={showHint} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            className='clear-btn'
            onClick={() => {
              setList([])
              showHint(true, 'empty list', 'danger')
            }}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
