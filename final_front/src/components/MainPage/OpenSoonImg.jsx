   import React from 'react'
import { ListGroup } from 'react-bootstrap';

   import Card from 'react-bootstrap/Card';
   const OpenSoonImg = ({ openSoon }) => {
      
      return (
         <Card style={{ width: '18rem'}} >
           <Card.Img variant="top" src={openSoon.main_img} style={{                     
                     width: 350,
                     height: 350,
                     objectFit: "cover",
                     border: "1px solid black",}} />
           <Card.Body>
             <Card.Title style={{width:350 , height:100, objectFit:"cover"}}>{openSoon.title}</Card.Title>
           </Card.Body>
         </Card>
       );
     }
    

   export default OpenSoonImg 




