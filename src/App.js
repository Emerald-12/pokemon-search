import Content from './components/Content'
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import './styles.css'

function App() {
    return (
        <>
            
            <div>
                        
                <Router>
                    <div className='container'>
                        <Switch>
                            <Route path='/' component={Content}/>
                        </Switch>
                        </div>
                </Router>
            </div>
        </>
    )
}

export default App