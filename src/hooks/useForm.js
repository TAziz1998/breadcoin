import { useState } from 'react'

//Maybe extend it for error handling and validation
export default (initState = {}) => {
  console.log(initState);
  const [state, setState] = useState(initState)

  const handleChange = (e) => {
    // e.persist()
    console.log(e)
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSwitch = (e) => {
    e.persist()
    console.log(e)
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.checked }))
  }

  const handleDatePick = (name, e) => {
    // e.persist()
    console.log(new Date(e))
    console.log(new Date(e).toISOString())
    setState((prevState) => ({ ...prevState, [name]: new Date(e).toISOString()}))
  }

  return { state, handleChange, handleSwitch, handleDatePick, setState }
}

