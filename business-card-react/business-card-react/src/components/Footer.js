import TwitterIcon from '../images/twitter.png';
import GithubIcon from '../images/github.png';

export default function Footer() {
    return (
        <footer>
            <img src={TwitterIcon} alt="twitter logo" />
            <img src={GithubIcon} alt="github logo" />
        </footer>
    );
}