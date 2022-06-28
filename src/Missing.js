import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
        <h2>Page not found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to ='/'>Visit the homepage</Link> {/*Note this Link wil lreload the app. Not conencted to state?*/}
        </p>
    </main>
  )
}

export default Missing