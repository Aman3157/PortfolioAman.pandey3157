import React, { useEffect } from "react";

function Footer(props) {
  useEffect(()=>{
    console.log(props.message);
  },[props.message])
  return (
    <footer style={{background:"#222", color:"white", padding:"10px", textAlign:"center",top:'0'}}>
      <p>© 2026 Aman Profile | All Rights Reserved {props.message}</p>
    </footer>
  );
}

export default Footer;