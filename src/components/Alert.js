import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
    <div style={{height: "50px"}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
          <button type="button" className="close"  aria-label="Close" onClick={props.dismissAlert}> 
          {/* data-dismiss="alert" button attribute is removed to handle is dismasal logic mannulay as the bootstarp dismisal technique and react logic with set time out was causing conflict as bootstrap was unable to find the element once react has removed it from UI */}
              <span aria-hidden="true">&times;</span>
          </button>
      </div>}
    </div>
  )
}
