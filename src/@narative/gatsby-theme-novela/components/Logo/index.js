/** @jsx jsx */
import { jsx } from 'theme-ui'

export default function Logo() {
  return (
      <div><h1 sx={{
        fontSize:'30px',
        color:'primary',
        '@media screen and (max-width:652px)':{
            fontSize:'15px'
        }
      }}><span style={{color:'#7A8085'}}>Chaduvula</span> Prasanth</h1></div>
  );
}