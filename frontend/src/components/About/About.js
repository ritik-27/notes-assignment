import './About.css';

const About = () => {

    const features = [
        {
            icon: "fas fa-cloud",
            title: "Cloud-Based Storage",
            description: "Your notes are saved securely in the cloud, accessible anytime, anywhere."
        },
        {
            icon: "fas fa-lock",
            title: "Secure & Private",
            description: "With user authentication, your notes are private and only visible to you."
        },
        {
            icon: "fas fa-edit",
            title: "Effortless Editing",
            description: "Easily create, read, update, and delete your notes with a simple and intuitive interface."
        },
        {
            icon: "fas fa-mobile-alt",
            title: "Responsive Design",
            description: "Works beautifully on all your devices, whether it's a desktop, tablet, or mobile phone."
        }
    ];

    const technologies = ["React", "Node.js", "Express", "MongoDB", "JWT"];

    return (
        <div className="about-container">
            <header className="about-header">
                <h1>About iNotebook</h1>
                <p>Capture Your Ideas, Effortlessly.</p>
            </header>

            <section className="about-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <i className={`${feature.icon} icon`}></i>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-section">
                <h2>Technology Stack</h2>
                <div className="tech-stack">
                    {technologies.map((tech, index) => (
                        <span key={index} className="tech-pill">{tech}</span>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;