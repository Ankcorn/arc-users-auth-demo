import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as users from './lib';

function usePrivateRouter() {
  const [route, setRoute] = useState('');
  useEffect(() => {
    users.getToken()
      .then(() => setRoute('secret'))
      .catch(() => setRoute('options'));
  }, []);
  return [route, setRoute];
}

function App() {
  const [route, setRoute] = usePrivateRouter();
  const [username, setUsername] = useState();
  console.log(route)
  return (
    <div className="h-screen w-screen bg-gray-800">
      <div className="bg-purple-900 flex space-x-4 shadow-lg p-4 text-white font-bold text-lg">
        <svg className="w-6 h-6 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1>Arc Users Pragma Example</h1>
      </div>
      <div className="w-screen mt-24 flex justify-center">
       {route === 'options' && <Options setRoute={setRoute}/>}
       {route === 'signup' && <SignUp setUsername={setUsername} setRoute={setRoute}/>}
       {route === 'signin' && <SignIn setRoute={setRoute}/>}
       {route === 'secret' && <ExtraSpecialMembersArea setRoute={setRoute}/>}
       {route === 'email-confirmation' && <ConfirmSignUp  setRoute={setRoute} username={username}/>}
      </div>
    </div>
  );
}

function SignIn({ setRoute }) {
  const [form, updateForm] = useState({ username: '', password: '' })
  console.log(form)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await users.signIn(form.username, form.password);
      console.log(result)
      setRoute('secret')
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-xl bg-white shadow-xl rounded-lg p-8 flex flex-col mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
      <input onChange={({ target }) => updateForm(s=> ({ ...s, username: target.value }))} value={form.username} className="bg-white shadow-inner rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Email" type="text" />
      <input onChange={({ target }) => updateForm(s=> ({ ...s, password: target.value }))} value={form.password} className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Password" type="password" />
      <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 transition duration-1000 rounded text-lg">Sign In</button>
      <p className="text-xs text-gray-700 mt-3">Need an account? <a className="underline" onClick={() => setRoute('signup')}>Sign Up</a></p>
    </form>
    )
}

function ConfirmSignUp({ username, setRoute }) {
  const [code, setCode] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await users.confirmSignUp(username, code);
      console.log(result)
      setRoute('signin')
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-xl bg-white shadow-xl rounded-lg p-8 flex flex-col mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Confirm Sign Up</h2>
      <input value={code} onChange={(e) => setCode(e.target.value)} className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="email confirmation" type="text" />
      <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 transition duration-1000 rounded text-lg">Sign In</button>
    </form>
    )
}
function SignUp({ setRoute, setUsername }) {
  const [form, updateForm] = useState({ username: '', password: '' })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await users.signUp(form.username, form.password);
      console.log(result)
      setUsername(form.username)
      setRoute('email-confirmation')
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-xl bg-white shadow-xl rounded-lg p-8 flex flex-col mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
      <input onChange={({ target }) => updateForm(s=> ({ ...s, username: target.value }))} value={form.username} className="bg-white shadow-inner rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Email" type="email" />
      <input onChange={({ target }) => updateForm(s=> ({ ...s, password: target.value }))} value={form.password} className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Password" type="password" />
      <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 transition duration-500 rounded text-lg">Sign Up</button>
      <p className="text-xs text-gray-700 mt-3">Already have an account? <a className="underline" onClick={() => setRoute('signin')}>Sign In</a></p>
    </form>
  )
}

function Options({ setRoute }) {
  return (
    <div className="max-w-xl bg-white shadow-xl rounded-lg p-8 flex flex-col mt-10 md:mt-0 space-y-6">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">What would you like to do</h2>
      <button className="text-white bg-orange-400 border-0 py-2 px-8 focus:outline-none hover:bg-orange-500 transition duration-1000 rounded text-lg" onClick={() => setRoute('signin')}>Sign In</button>
      <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 transition duration-1000 rounded text-lg" onClick={() => setRoute('signup')}>Sign Up</button>
      <p className="text-xs text-gray-700 mt-3">Not sure why you are here? <a className="text-red-600 font-semibold underline" href="https://github.com/architect/architect/issues/775">CLICK ME</a></p>
    </div>
  )
}


function ExtraSpecialMembersArea() {
  const [state, setState] = useState();

  async function handleClick() {
    try {
      const token = await users.getToken()
      const { data } = await axios.get('/api/private', { headers: {
        authorization: `Bearer ${token}`
      }});
      setState({ message: data })
    } catch(e) {
      setState({ error: e.message})
    }
    
  }
  return (
    <div className="max-w-xl bg-gray-900 shadow-xl rounded-lg p-8 flex flex-col mt-10 md:mt-0 text-white space-y-2">
      <h1 className="text-2xl tracking-wide">Welcome 🦄</h1>
        <p>After all that effort to sign up I realise this is extremely disapointing</p>
        <p>I hope you wont hold it against me. </p>
        <img className="rounded border-white border-8" alt="an incredibly cute dog" src="https://images.unsplash.com/photo-1590251084547-05bff96dc36c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2194&q=80"/>
        <div className="flex space-x-2 py-4 items-center">
          <p>Click the <span className="text-red-700">red</span> button to make an authenticated request.</p>
          <button onClick={handleClick} className="bg-red-700 px-3 py-1 rounded shadow  hover:bg-red-800 transition duration-1000">
            Private
          </button>
          </div>
          {state === undefined && <div className="w-full flex items-center justify-center p-8 bg-gray-400 text-gray-900"><span>Whats going to happen?</span></div>}
          {state && state.error && <div className="w-full flex items-center justify-center p-8 bg-gray-400 text-gray-900"><span>{state.error}</span></div>}
          {state && state.message && <div className="w-full flex items-center justify-center p-8 bg-gray-400 text-gray-900"><span>{state.message} ✅</span></div>}
        <p>If you want to find out how I made this checkout the project on <a className="text-purple-600 underline"href="https://github.com/Ankcorn/arc-users-auth-demo">github</a></p>
    </div>
  )
}

export default App;
