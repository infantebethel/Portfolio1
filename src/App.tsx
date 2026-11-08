import { useEffect, useState } from "react";
import BorderGlow from "./BorderGlow";
import ShapeGrid from "./ShapeGrid.jsx";
import familyPhoto from "./assets/family-photo.png";
import friendsPhoto from "./assets/friends-photo.png";
import profilePhoto from "./assets/profile.png";
import schoolCertificatesPhoto from "./assets/school-certificates.png";

const sectionIds = ["home", "about", "exploring", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

function isSectionId(section: string): section is SectionId {
  return sectionIds.some((sectionId) => sectionId === section);
}

function getSectionFromHash(): SectionId {
  const section = window.location.hash.slice(1);
  return isSectionId(section) ? section : "home";
}

const navigation: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "Personal Information" },
  { id: "exploring", label: "Achievements" },
  { id: "contact", label: "Family" },
];

type AchievementGroup = {
  title: string;
  awards: string[];
  compact?: boolean;
};

type Achievement = {
  number: string;
  school: string;
  level: string;
  detail?: string;
  groups: AchievementGroup[];
};

const achievements: Achievement[] = [
  {
    number: "01",
    school: "Benito Soliven Central School",
    level: "Elementary",
    groups: [
      {
        title: "Class placements",
        compact: true,
        awards: [
          "Grade 1 · Top 5",
          "Grade 2 · Top 3",
          "Grade 3 · Top 4",
          "Grade 5 · Top 6",
          "Grade 6 · Top 2",
        ],
      },
      { title: "Graduation", awards: ["Graduated with Honors"] },
    ],
  },
  {
    number: "02",
    school: "Reina Mercedes Vocational and Industrial School",
    level: "Junior High School",
    detail: "Specialized in Cosmetology",
    groups: [
      {
        title: "Grade 9",
        awards: ["All four quarters · With Honors"],
      },
      {
        title: "Grade 10",
        awards: [
          "Q1–Q2 · With Honors",
          "Q3 · With High Honors",
          "Q4 · With High Honors + Conduct Award",
        ],
      },
      {
        title: "Other awards",
        awards: [
          "With High Honor in Cosmetology",
          "Buwan ng Wika Poster Making Champion",
          "Spoken Poetry · 3rd Place",
          "National Bible Month Poster Making Champion",
        ],
      },
    ],
  },
  {
    number: "03",
    school: "NanSing School of Cauayan City, Inc.",
    level: "Senior High School",
    groups: [
      {
        title: "Grade 11",
        awards: ["Both semesters · With Honors"],
      },
      {
        title: "Grade 12",
        awards: ["Both semesters · With Honors"],
      },
      { title: "Graduation", awards: ["Graduated With Honors"] },
      {
        title: "Other awards",
        awards: [
          "DSPC qualifier · Radio Broadcasting Filipino (Secondary)",
          "Poster Making Champion",
          "United Nations Open House · Overall Champion",
          "Mid-Autumn Festival · Overall Champion",
          "Cooking Contest · 3rd Place",
          "With Highest Honor in Chinese",
        ],
      },
    ],
  },
];

const accents = [
  { name: "Rose", value: "rose" },
  { name: "Violet", value: "violet" },
  { name: "Mint", value: "mint" },
  { name: "Ocean", value: "ocean" },
  { name: "Amber", value: "amber" },
  { name: "Sky", value: "sky" },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="arrow-icon"
    >
      <path
        d="M4.25 10h11.5m-4.75-4.75L15.75 10 11 14.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accentOpen, setAccentOpen] = useState(false);
  const [accent, setAccent] = useState("rose");
  const [activeSection, setActiveSection] = useState<SectionId>(getSectionFromHash);
  const [achievementPage, setAchievementPage] = useState<"overview" | "certificates">("overview");

  useEffect(() => {
    const syncSection = () => setActiveSection(getSectionFromHash());

    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, []);

  const navigateTo = (section: SectionId) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <div className={`portfolio theme-${accent}`}>
      <div className="shape-grid-background" aria-hidden="true">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#2a2734"
          hoverColor="#bb0909"
          hoverFillColor="#bb0909"
          fillOpacity={0.15}
          cellSize={40}
          speed={0.5}
          tiltX={0}
          tiltY={0}
          rainbow={false}
          lineWidth={1}
          radius={1.5}
          trail={0.6}
          glow={0.35}
          twinkle={0}
          fade={1}
          clickCascade
          intro
        />
      </div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label="Infante, Bethel Joy M., home"
          onClick={() => navigateTo("home")}
        >
          <img className="brand-mark" src={profilePhoto} alt="" />
          <span>Infante, Bethel Joy M.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              className={activeSection === item.id ? "is-active" : ""}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => navigateTo(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="accent-picker">
          <button
            className="accent-trigger"
            type="button"
            aria-label="Change website color"
            aria-expanded={accentOpen}
            aria-controls="accent-options"
            onClick={() => setAccentOpen((isOpen) => !isOpen)}
          >
            <span className="accent-trigger-dot" aria-hidden="true">
              ◉
            </span>
            <span className="accent-trigger-label">Change color</span>
          </button>
          {accentOpen && (
            <div
              className="accent-options"
              id="accent-options"
              role="group"
              aria-label="Website colors"
            >
              {accents.map((option) => (
                <button
                  aria-label={`Use ${option.name} accent`}
                  aria-pressed={accent === option.value}
                  className={`accent-option theme-${option.value}`}
                  key={option.value}
                  onClick={() => {
                    setAccent(option.value);
                    setAccentOpen(false);
                  }}
                  type="button"
                >
                  <span className="accent-swatch" aria-hidden="true" />
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="panel-stage" id="main">
        <section
          className={`hero section-shell screen-panel${activeSection === "home" ? " is-active" : ""}`}
          id="home"
          aria-hidden={activeSection !== "home"}
        >
          <article
            className="profile-card"
            aria-label="Infante, Bethel Joy M.'s profile"
          >
            <div className="profile-art" aria-hidden="true">
              <img className="profile-photo" src={profilePhoto} alt="" />
              <span className="profile-orbit orbit-two" />
              <span className="profile-spark spark-one">✳</span>
              <span className="profile-spark spark-two">✦</span>
              <span className="profile-caption">curiosity in progress</span>
            </div>
            <div className="profile-details">
              <strong>Infante, Bethel Joy M.</strong>
              <span>Information Technology</span>
            </div>
            <p className="profile-school">University of the Cordilleras</p>
          </article>

          <div className="hero-copy">
            <p className="eyebrow">A little about me</p>
            <h1 className="hero-description">
              Hello, I’m <strong>Infante, Bethel Joy M.</strong> — an Information
              Technology student at the University of the Cordilleras. I’m
              curious about web development, creative ideas, and all the little
              ways technology can make life better.
            </h1>
          </div>

        </section>

        <section
          className={`about section-shell content-section screen-panel${activeSection === "about" ? " is-active" : ""}`}
          id="about"
          aria-hidden={activeSection !== "about"}
        >
          <div className="section-heading">
            <p className="eyebrow">01 / Personal Information</p>
            <h2>
              A little about
              <br />
              <span>me.</span>
            </h2>
            <BorderGlow className="about-interests-card">
              <div className="about-interests-content">
                <div>
                  <h3>Hobbies</h3>
                  <ul className="hobby-list">
                    <li>Watching movies</li>
                    <li>Learning new things</li>
                    <li>Playing mobile games</li>
                    <li>Painting</li>
                    <li>Drawing</li>
                  </ul>
                </div>
                <div>
                  <h3>Interests</h3>
                  <ul>
                    <li>
                      Expand my coding knowledge to better understand different
                      programming languages.
                    </li>
                    <li>Explore different areas of the world of technology.</li>
                  </ul>
                </div>
              </div>
            </BorderGlow>
          </div>
          <div className="about-copy">
            <BorderGlow className="personal-info-card">
              <p className="eyebrow">Personal Information</p>
              <dl className="personal-info-list">
                <div>
                  <dt>Name</dt>
                  <dd>Infante, Bethel Joy M.</dd>
                </div>
                <div>
                  <dt>Age</dt>
                  <dd>18</dd>
                </div>
                <div>
                  <dt>Birth Date</dt>
                  <dd>August 04, 2008</dd>
                </div>
                <div>
                  <dt>School</dt>
                  <dd>University of the Cordilleras</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>1st year</dd>
                </div>
                <div>
                  <dt>Program</dt>
                  <dd>
                    Bachelor of Science in Information Technology, major in
                    Networking and Security Track
                  </dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>Lourdes Subdivision, Baguio City</dd>
                </div>
                <div>
                  <dt>Hometown</dt>
                  <dd>Province of Isabela</dd>
                </div>
              </dl>
            </BorderGlow>
          </div>
        </section>

        <section
          className={`exploring section-shell content-section screen-panel${activeSection === "exploring" ? " is-active" : ""}`}
          id="exploring"
          aria-hidden={activeSection !== "exploring"}
        >
          <div className="exploring-heading">
            <div>
              <p className="eyebrow">02 / Achievements</p>
              <h2>
                Schools &amp;
                <br />
                <span>achievements.</span>
              </h2>
            </div>
            <p className="section-aside">
              A few of the schools, honors, and milestones that have been part
              of my journey.
            </p>
          </div>

          {achievementPage === "overview" ? (
            <>
              <div className="achievement-grid">
                {achievements.map((item) => (
                  <article
                    className="achievement-card"
                    key={item.number}
                  >
                    <BorderGlow className="achievement-glow-card">
                      <div className="achievement-inner">
                        <div className="achievement-card-header">
                          <span className="achievement-number">{item.number}</span>
                          <span className="achievement-level">{item.level}</span>
                        </div>
                        <h3>{item.school}</h3>
                        {item.detail && (
                          <p className="achievement-detail">{item.detail}</p>
                        )}
                        <div className="achievement-groups">
                          {item.groups.map((group) => (
                            <div className="achievement-group" key={group.title}>
                              <h4>{group.title}</h4>
                              <ul className={group.compact ? "award-inline-list" : ""}>
                                {group.awards.map((award) => (
                                  <li key={award}>{award}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </BorderGlow>
                  </article>
                ))}
              </div>

              <div className="achievement-page-actions">
                <button
                  className="button button-accent"
                  type="button"
                  onClick={() => setAchievementPage("certificates")}
                >
                  Tap to see the image
                  <ArrowIcon />
                </button>
              </div>
            </>
          ) : (
            <div className="achievement-certificate-page">
              <div className="achievement-certificate-header">
                <p className="eyebrow">03 / Certificate Highlights</p>
                <h2>
                  Recognition <span>and honor.</span>
                </h2>
              </div>

              <div className="achievement-certificate-layout">
                <div className="achievement-certificate-copy">
                  <p>
                    This collection captures the academic milestones, awards, and
                    recognition I have earned throughout my journey. Each certificate
                    represents a moment of effort, growth, and hard work.
                  </p>
                  <ul>
                    <li>Academic excellence and conduct awards</li>
                    <li>School competitions and recognition</li>
                    <li>Milestones from elementary to senior high school</li>
                  </ul>
                </div>

                <div className="achievement-certificate-visual">
                  <img
                    src={schoolCertificatesPhoto}
                    alt="Collection of academic certificates and award recognitions"
                  />
                </div>
              </div>

              <div className="achievement-page-actions is-spread">
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => setAchievementPage("overview")}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </section>

        <section
          className={`contact section-shell content-section screen-panel${activeSection === "contact" ? " is-active" : ""}`}
          id="contact"
          aria-hidden={activeSection !== "contact"}
        >
          <div className="family-friends-heading">
            <div>
              <p className="eyebrow">03 / The people closest to me</p>
              <h2>
                Family <span>&amp; friends.</span>
              </h2>
            </div>
          </div>

          <div className="family-friends-grid">
            <BorderGlow className="family-card">
              <article>
                <img
                  className="family-card-image"
                  src={familyPhoto}
                  alt="Bethel with her mother and father at a family gathering"
                />
                <div className="family-card-copy">
                  <p className="eyebrow">Family</p>
                  <h3>My source of strength.</h3>
                  <dl className="family-people-list">
                    <div>
                      <dt>Mother</dt>
                      <dd>Eden Infante</dd>
                    </div>
                    <div>
                      <dt>Father</dt>
                      <dd>Joey Infante</dd>
                    </div>
                  </dl>
                  <p className="family-card-description">
                    They are my source of strength and inspiration to keep
                    chasing my dreams.
                  </p>
                </div>
              </article>
            </BorderGlow>

            <BorderGlow className="family-card">
              <article>
                <img
                  className="family-card-image"
                  src={friendsPhoto}
                  alt="Bethel sharing a fun moment with friends at a scenic spot"
                />
                <div className="family-card-copy">
                  <p className="eyebrow">Friends</p>
                  <h3>Memories made together.</h3>
                  <p className="family-card-description">
                    They are the ones who truly know who I am—the people I can
                    laugh with, share my problems with, and create unforgettable
                    memories with.
                  </p>
                </div>
              </article>
            </BorderGlow>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <p>Made with care, and a little bit of personality.</p>
      </footer>
    </div>
  );
}

export default App;
