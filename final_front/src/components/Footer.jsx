import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='text-center' color='white' bgColor='dark'>
        <section className='mb-4'>
          <div outline color="light" floating className='m-1' href='#!' role='button'>
            <i fab icon='facebook-f' />
          </div>

          <div outline color="light" floating className='m-1' href='#!' role='button'>
            <i fab icon='twitter' />
          </div>

          <div outline color="light" floating className='m-1' href='#!' role='button'>
            <i fab icon='google' />
          </div>

          <div outline color="light" floating className='m-1' href='#!' role='button'>
            <i fab icon='instagram' />
          </div>

          <div outline color="light" floating className='m-1' href='#!' role='button'>
            <i fab icon='linkedin-in' />
          </div>

          <div outline color="light" floating className='m-1' href='#!' role='button'>
            <i fab icon='github' />
          </div>
        </section>

        <section className=''>
          <form action=''>
            <div className='d-flex justify-content-center'>
              <div size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div md='5' start>
                <input contrast type='email' label='Email address' className='mb-4' />
              </div>

              <div size="auto">
                <div outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </div>
              </div>
            </div>
          </form>
        </section>

        <section className='mb-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className=''>
          <div>
            <div lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            <div lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:
      </div>
    </footer>
  );
}

export default Footer;