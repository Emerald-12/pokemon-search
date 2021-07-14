import Title from './components/Title'
import Content from './components/Content'
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import './styles.css'

function App() {
    return (
        <>
            
            <div>
                        
                <Router>
                    <div className='container'>
                        <Switch>
                            <Route path='/' exact component={Title}/>
                        </Switch>
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