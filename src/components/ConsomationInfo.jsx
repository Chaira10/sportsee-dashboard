import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi'; 

function ConsomationInfo({ label, value  }) {
    
  return (
    <div><p>{label} : {value}</p></div>
  )
}

export default ConsomationInfo