import firebase from 'firebase/app'

import axios from 'axios'

import 'firebase/auth'
import { useState, useCallback, useEffect } from 'react'

type FirebaseUser = {
  authUser: firebase.User | null
}

firebase.initializeApp({
  apiKey: process.env.WEB_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
})

// TODO: set this if you want to manage session cookies
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

const googleProvider = new firebase.auth.GoogleAuthProvider()

export default function useAuth() {
  const [authUser, setAuthUser] = useState<FirebaseUser>({ authUser: null })
  const [authState, setAuthState] = useState({ status: 'loading' })

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(
      async (user) => {
        if (user) {
          localStorage.setItem('authUser', JSON.stringify(user))
          setAuthUser({ authUser: user })
        }
      },
      () => {
        localStorage.removeItem('authUser')
        setAuthUser({
          authUser: null,
        })
      }
    )
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await firebase.auth().signInWithPopup(googleProvider)
      const idToken = await result.user?.getIdToken()

      setAuthState({ status: 'loading' })
      // call the backend to add custom claims
      await axios.post(`${process.env.AUTH_API}/auth/sessionLogin`, { idToken })

      setAuthState({ status: 'in' })
    } catch (error) {
      console.log(error)
    }
  }, [setAuthState])

  const signInWithEmailAndPwdAndCookie = useCallback(
    async (email, pwd) => {
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, pwd)

        const idToken = await user.user?.getIdToken()

        setAuthState({ status: 'loading' })

        await axios.post(`${process.env.AUTH_API}/auth/sessionLogin`, { idToken })

        setAuthState({ status: 'in' })
      } catch (err) {
        console.log(err)
      }
    },
    [setAuthState]
  )

  const signInWithEmailAndPwd = useCallback(
    async (email, pwd) => {
      try {
        setAuthState({ status: 'loading' })

        await firebase.auth().signInWithEmailAndPassword(email, pwd)

        setAuthState({ status: 'in' })
      } catch (err) {
        setAuthState({ status: 'out' })
        console.log(err)
      }
    },
    [setAuthState]
  )

  const addNewUser = useCallback(async (email, pwd) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pwd)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const signOut = async () => {
    try {
      setAuthState({ status: 'loading' })
      await firebase.auth().signOut()
      setAuthState({ status: 'out' })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    authState,
    addNewUser,
    signInWithEmailAndPwdAndCookie,
    signInWithEmailAndPwd,
    signInWithGoogle,
    signOut,
    authUser,
  }
}