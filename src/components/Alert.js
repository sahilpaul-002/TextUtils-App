import React from 'react'
import PropTypes from 'prop-types';

export default function Alert(props) {
    const {alert, dismissAlert} = props; //Destructuring props

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
    <div style={{height: "50px"}}>
      {props.alert && <div className={`alert alert-${alert===null?'danger':alert.type} alert-dismissible fade show`} role="alert">
          <strong>{alert==null?'Error':capitalize(alert.type)}</strong> : {alert===null?'Please ignore this alert':alert.msg}
          <button type="button" className="close"  aria-label="Close" onClick={dismissAlert}> 
          {/* data-dismiss="alert" button attribute is removed to handle is dismasal logic mannulay as the bootstarp dismisal technique and react logic with set time out was causing conflict as bootstrap was unable to find the element once react has removed it from UI */}
              <span aria-hidden="true">&times;</span>
          </button>
      </div>}
    </div>
  )
}

Alert.propTypes = {
    alert: PropTypes.shape({
      msg: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    }),
    dismissAlert: PropTypes.func.isRequired
}

Alert.defaultProps = {
    alert: null,
    dismissAlert: () => {}
}