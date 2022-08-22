import React from 'react'
import axios from "axios";

const userList = ({user, url, refresh, setUpdate, setIsFormOpen}) => {
   
    const deleteUser = () => {
        axios.delete(url+user.id+'/')
          .then(res => {
           
            refresh()
          })
          .catch(err => console.log(err))
      }
      const handleUpdate = () => {
        setIsFormOpen(true)
        setUpdate(user)
      }

  return (
    <div className='Users-card'>
    <h2>{user.first_name+" "+user.last_name}</h2>
        <p>{user.email}</p>
        <p>{user.birthday}</p>  
        <button onClick={deleteUser} className="card__btn">Delete</button>
        <button onClick={handleUpdate} className="card__btn">Update</button>
    </div>
  )
}

export default userList