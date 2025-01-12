import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='siimple--color-white' style={{textAlign: 'center', backgroundColor: 'rgba(0, 0, 128, 1)'}}>
      <Link href='./privacyPolicy/' passHref={true} legacyBehavior>
        <a style={{color: 'white'}}>privacy policy</a>
      </Link>
      <br />
      Copyright © foobar Inc. All Rights Reserved.
    </footer>
  )}

export default Footer
