import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import '../footer.css';


const Footer = () => {
  return (
    <div className='footer'>
        <Container className='footer-container'>
              <Row className='footer-content'>
                  <Col className='contact'>
                      <h4 className='d-flex centered'>Adddress</h4>
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ab nihil esse earum iusto repellendus molestiae magnam quam voluptatem necessitatibus. Ipsum quia mollitia optio doloremque excepturi maiores pariatur sit perferendis?</p>
                      <div className='social-links'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4267B2">
                            <path d="M22.675 0H1.325C.593 0 0 .6 0 1.342v21.317C0 23.4.593 24 1.325 24H12.82v-9.295H9.692v-3.622h3.128V8.413c0-3.1 1.89-4.788 4.648-4.788 1.325 0 2.464.1 2.794.144v3.24l-1.917.001c-1.504 0-1.794.715-1.794 1.76v2.309h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.6 1.325-1.342V1.342C24 .6 23.405 0 22.675 0z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                            <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.61 1.794-1.574 2.162-2.723-.949.564-2.007.974-3.127 1.195-.896-.959-2.173-1.555-3.591-1.555-2.717 0-4.917 2.203-4.917 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.577-.666 2.475 0 1.71.87 3.217 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.06c0 2.388 1.699 4.381 3.946 4.833-.413.111-.849.171-1.296.171-.314 0-.621-.031-.92-.086.631 1.953 2.445 3.376 4.6 3.415-1.68 1.315-3.808 2.102-6.102 2.102-.396 0-.788-.023-1.175-.068 2.179 1.394 4.768 2.21 7.557 2.21 9.054 0 14.004-7.496 14.004-13.986 0-.209 0-.423-.015-.636.961-.689 1.8-1.56 2.462-2.548l-.047-.02z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#E4405F">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.691 0 8.261.013 7.045.07 5.655.131 4.396.368 3.29 1.475.368 4.396.131 5.655.07 7.045.013 8.261 0 8.691 0 12c0 3.309.013 3.739.07 4.955.061 1.39.298 2.649 1.405 3.755 1.107 1.107 2.365 1.344 3.755 1.405 1.216.057 1.646.07 4.955.07s3.739-.013 4.955-.07c1.39-.061 2.649-.298 3.755-1.405 1.107-1.107 1.344-2.365 1.405-3.755.057-1.216.07-1.646.07-4.955s-.013-3.739-.07-4.955c-.061-1.39-.298-2.649-1.405-3.755-1.107-1.107-2.365-1.344-3.755-1.405C15.739.013 15.309 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.141c-2.194 0-3.979-1.785-3.979-3.979s1.785-3.979 3.979-3.979 3.979 1.785 3.979 3.979-1.785 3.979-3.979 3.979zm6.406-11.845c-.796 0-1.442.646-1.442 1.442 0 .796.646 1.442 1.442 1.442.796 0 1.442-.646 1.442-1.442 0-.796-.646-1.442-1.442-1.442z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
                            <path d="M19.615 3.184C21.658 3.274 22 5.267 22 7.715v8.57c0 2.447-.342 4.441-2.385 4.531-2.308.1-8.649.1-10.961 0C6.342 20.726 6 18.732 6 16.285v-8.57c0-2.447.342-4.441 2.385-4.531 2.308-.1 8.649-.1 10.961 0zm-8.961 5.453v6.726l5.961-3.363-5.961-3.363z"/>
                        </svg>
  


                      </div>
                  </Col>
                  <Col className='useful-links'>
                    <h4 className='d-flex centered'> Useful links</h4>
                  </Col>
                  <Col className='more'>
                    <h4 className='d-flex centered'> More</h4>
                  </Col>
              </Row> 

        </Container>
    </div>
  )
}

export default Footer;