import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';


const MyFilter = ({types, type, id, title, handleTitle}) => {
  console.log(id);//
  const navigate = useNavigate();
  const location = useLocation();

  const setPath = (oldItem, newItem, key) => {
   console.log(location.pathname) 
   console.log(oldItem) 
   console.log(newItem) 
   console.log(key) 
   let path=location.pathname+`?page=1&${key}=${newItem}`;
    return path;
  }



  return (
    <DropdownButton variant="" title={title} style={{border: '1px solid lightgray', borderRadius:'5px', height:'38px'}}>
      { 
        types.map((element, index)=>(
          <Dropdown.Item as="button" key={index} onClick={()=>{
            if(type){ 
              navigate(setPath(title,element,id)); 
            }
            handleTitle(element); 
          }}>
            {element}
          </Dropdown.Item>
        )) 
      }
    </DropdownButton>
  );
};

export default MyFilter;