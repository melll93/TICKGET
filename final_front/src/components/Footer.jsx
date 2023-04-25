import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='text-center' style={{backgroundColor:'darkgray'}}>
        <section className='mb-4'  style={{display:'inline'}} >
        <div className="link_logos" style={{display:'inline'}}>
          <a href="https://github.com/melll93/final_project">
            <img style={{width:'60px' }} src="logos/GITHUB.png"></img>
            </a>
          </div> 
          <a href="https://www.figma.com/team_invite/redeem/JlqZbEVbWCSmha2notKsMG">
            <img style={{width:'40px', marginTop:'10px' }} src="logos/NOTION.png"></img>
            </a>
            <a href="https://docs.google.com/spreadsheets/d/1j2yesT_XvceSI1dL4wWJa7y_bUnH1C1rjeHUEFS2j40/edit#gid=0">
            <img style={{width:'40px', marginTop:'10px', marginLeft:'10px' }} src="logos/GOOGLE.png"></img>
            </a>
        </section>
{/* 
        <section className=''>
            <div className='d-flex justify-content-center'>
              <div size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <div>
                <input type='email' label='Email address' className='mb-4' />
              </div>
              <div size="auto">
                <div color='light' type='submit' className='mb-4'>
                  Subscribe
                </div>
              </div>
            </div>
        </section> */}

  {/*       <section className='mb-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section> */}

        <section style={{backgroundColor: 'darkgray'}}>

          <div>
          
            <div lg='3' md='6' className='link_div' style={{display:'inline-block'}}>
              <h5 className='text-uppercase'>Links</h5>
              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-black'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div lg='3' md='6' className='mb-4 mb-md-0' style={{display:'inline-block', marginLeft:'100px'}}>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-black'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div lg='3' md='6' className='mb-4 mb-md-0'  style={{display:'inline-block', marginLeft:'100px'}}>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-black'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div lg='3' md='6' className='mb-4 mb-md-0'  style={{display:'inline-block', marginLeft:'100px'}}>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-black'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-black'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

      <div className='text-center' style={{ backgroundColor: 'darkgray', height:'25px', padding:'0px'}}>
        © 2023 Copyright:
      </div>
    </footer>
  );
}

export default Footer;