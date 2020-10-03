import React, { useState } from 'react';
import * as users from './lib'

function App() {
  const [router, setRoute] = useState('options');
  
  return (
    <div className="h-screen w-screen bg-indigo-100">
      <div className="bg-purple-900 flex space-x-4 shadow-lg p-4 text-white font-bold text-lg">
        <svg className="w-6 h-6 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1>Arc Users Pragma Example</h1>
      </div>
      <div className="w-screen mt-24 flex justify-center">
       {router === 'options' && <Options setRoute={setRoute}/>}
       {router === 'signup' && <SignUp setRoute={setRoute}/>}
       {router === 'signin' && <SignIn setRoute={setRoute}/>}
       {router === 'secret' && <ExtraSpecialMembersArea setRoute={setRoute}/>}
       {router === 'email-confirmation' && <ConfirmSignUp />}
      </div>
      <button onClick={users.getToken}>token</button>
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
      // setRoute('email-confirmation')
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

function ConfirmSignUp() {
  const [code, setCode] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await users.confirmSignUp(code);
      console.log(result)
      // setRoute('email-confirmation')
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
function SignUp({ setRoute }) {
  const [form, updateForm] = useState({ username: '', password: '' })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await users.signUp(form.username, form.password);
      console.log(result)
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
  return (
    <div className="max-w-xl bg-white shadow-xl rounded-lg p-8 flex flex-col mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
      <input className="bg-white shadow-inner rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Email" type="email" />
      <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" placeholder="Password" type="password" />
      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign Up</button>
      <p className="text-xs text-gray-700 mt-3">Already have an account? Sign In</p>
    </div>
  )
}

export default App;
