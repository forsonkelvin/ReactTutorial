import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDZUxSRwcU9KOCaIuRNP289MX_CaJtQgE8",
    authDomain: "cs394-scheduler-eb12b.firebaseapp.com",
    databaseURL: "https://cs394-scheduler-eb12b-default-rtdb.firebaseio.com",
    projectId: "cs394-scheduler-eb12b",
    storageBucket: "cs394-scheduler-eb12b.appspot.com",
    messagingSenderId: "519645980556",
    appId: "1:519645980556:web:e5eea98aac87114cfa98a9",
    measurementId: "G-5CSK4ZFV72"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

ref(database)
ref(database, '/')
ref(database, '/courses')

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };