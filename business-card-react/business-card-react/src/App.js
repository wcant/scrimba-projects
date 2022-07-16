import CardImage from './components/CardImage';
import Main from './components/Main';
import Footer from './components/Footer';
import './styles.css';

export default function App() {
    return (
        <div className="Card">
            <CardImage />
            <Main />
            <Footer />
        </div>
    );
}