import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const useBeforeUnload = ( when:any, message:any ) => {
  useEffect(() => {
    
    const handleBeforeUnload = (event:any) => {
      if (when) {
          event.returnValue = message;
          return message;
      }
  };

  window.addEventListener('beforeunload', handleBeforeUnload)

  return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [when])
}

export default useBeforeUnload;

//const confirmationMessage = "You have unsaved changes. Continue?";

// const useBeforeUnload = (isUnsafeTabClose) => {
//     React.useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             if (isUnsafeTabClose) {
//                 event.returnValue = confirmationMessage;
//                 return confirmationMessage;
//             }
//         };

//         window.addEventListener("beforeunload", handleBeforeUnload);
//         return () =>
//             window.removeEventListener("beforeunload", handleBeforeUnload);
//     }, [isUnsafeTabClose]);
// };