import MailIcon from '../images/mail.png';

export default function Main() {
    return (
        <main>
            <div className="card--header">
                <h1>Wesley Cantrell</h1>
                <h3 className="card--job_title">Frontend Developer</h3>
                <p>
                    <a href="https://init1.io">init1.io</a>
                </p>
                <p>
                    <a href="mailto:wes@init1.io" className="card--email_btn">
                        <img src={MailIcon} alt="" />Email
                    </a>
                </p>
            </div>
            <div className="card--description">
                <h2>About</h2>
                <p>I'm an aspiring frontend developer trying to learn how to code
                    efficiently and practically.  I am enjoying improving my CSS skills,
                    learning React, and improving my algorithm skills.</p>
                <h2>Interests</h2>
                <p>Eating Indian food while wishing I could cook it that well.
                    Recovering from MMO addiction by playing Tarkov.  Vacuuming is therapeutic.
                    Spending time with my 13-year old daschund while keeping my 4 month old kitten off his back.
                </p>
            </div>
        </main>
    );

}