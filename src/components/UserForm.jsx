import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";

const userForm = ({refresh, url, update, setUpdate,isFormOpen, setIsFormOpen}) => {

    const { register, handleSubmit , reset} = useForm();
    const defaul = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
      }

      const submit = data => {
        if(isFormOpen){
          updateUser(data)
          setUpdate()
          setIsFormOpen(false)
        }
        else{
        createUser(data)
        }
        refresh()
        reset(defaul)

    }

    useEffect(() => {
      if(update){
        reset(update)
      }
    }, [update])

    const createUser = data => {
        axios.post(url, data)
          .then(res => {
            console.log(res.data)
            refresh()
          })
          .catch(err => console.log(err))
        }
        
        const updateUser= data => {
        
          axios.patch(url+update.id+'/', data)
            .then(res => {
              console.log(url+update.id+'/')
              refresh()
            })
            .catch(err => console.log(err))
        }


  return (
    <div className='form'>

<form onSubmit={handleSubmit(submit)} className='form'>
      <h2 className='form__title'>
      {update ? 
            'Update User Information'
          : `Create New User`}</h2>
      <ul className='form__list'>
        <li className='form__item'>
          <label htmlFor="email">Email: </label>
          <input {...register("email")} type="email" id='email' />
        </li>

        <li className='form__item'>
          <label htmlFor="password">Password: </label>
          <input {...register("password")} type="password" id='password' />
        </li>

        <li className='form__item'>
          <label htmlFor="first_name">First Name: </label>
          <input {...register("first_name")} type="text" id='first_name' />
        </li>

        <li className='form__item'>
          <label htmlFor="last_name">Last Name: </label>
          <input {...register("last_name")} type="text" id='last_name' />
        </li>

        <li className='form__item'>
          <label htmlFor="birthday">Release Date: </label>
          <input {...register("birthday")} type="date" id='birthday' />
        </li>
      </ul>
      <button>{ update ? 'Update' : 'Create' }</button>
    </form>

    </div>
  )
}

export default userForm