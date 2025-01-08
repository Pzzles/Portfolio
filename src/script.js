class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const uiText = {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      name: "Pule Tshetlha",
      title: "Full Stack Software Developer",
      cta: "Talk to me"
    },
    experience: {
      company_xspark: "X-Spark",
      company_ktc: "KTC-ZA",
      company_ebitz: "E-bitz Electronic Engineering Solutions",
      company_freelance: "Freelance",
      title_xspark: "Junior Software Developer",
      title_ktc: "Full Stack Developer",
      title_ebitz: "Electronics Technician",
      title_freelance: "Full Stack Software Developer",
      description_xspark: "As a Junior Software Developer, I honed my skills in building scalable applications with a focus on performance and user-centric design. I contributed to developing robust features using C#/.NET, SQL, and JavaScript, and collaborated closely with cross-functional teams to ensure seamless project delivery.",
      description_ktc: "In my role as a Full Stack Developer, I specialized in creating end-to-end web solutions using modern frameworks and technologies like Node.js and FlutterFlow. I played a pivotal role in optimizing codebases for maintainability and worked on integrating third-party APIs to enhance application functionality.",
      description_ebitz: "As an Electronics Technician, I developed a deep understanding of hardware-software interaction. I supported the development of IoT solutions and utilized my programming knowledge to troubleshoot and streamline device firmware. This role sharpened my analytical and problem-solving skills.",
      description_freelance: "During my time as a Freelance Software Developer, I worked on diverse client projects, ranging from e-commerce platforms to internal business tools. I utilized technologies like Oracle APEX and .NET Core to deliver customized solutions while ensuring efficient code and quick turnaround times.",
      date_xspark: "October 2024 - Present",
      date_ktc: "May 2023 - October 2024",
      date_ebitz: "June 2022 - September 2022",
      date_freelance: "September 2022 - Ongoing",
    },
    

    about: {
      description: "Hey there! I'm a Full Stack Software Developer with a knack for turning tricky tech puzzles into beautifully crafted solutions. Whether it's front-end magic or back-end wizardry, I've got it covered."
      + " \n\nWhat makes me tick? Clean, maintainable code and a love for learning new tech tricks on the fly! I've built production-ready apps that aren't just fast and functional—they make users smile."
      + " \n\nWhen I’m not deep in code, you’ll find me exploring cutting-edge technologies, giving back to open-source, or helping budding devs level up their skills. I’m all about creating software that’s not just technically brilliant but genuinely valuable for people."
     + " \n\nGot an awesome idea? Let’s team up and make it a reality!"
    },
    projects: {
      title1: "Property Management System",
      description1: "loren ipsum"
    },
    contact: {

    },
    social:{

    }

  };
  
  document.addEventListener('DOMContentLoaded', () => {

      // Function to populate text content
  const populateContent = () => {
    // Navigation
    document.querySelectorAll('[data-text]').forEach(element => {
      const textPath = element.getAttribute('data-text').split('.');
      let textValue = uiText;
      textPath.forEach(key => {
        textValue = textValue[key];
      });
      element.textContent = textValue;
    });
  };

  // Populate content before applying scramble effect
  populateContent();
    // Apply scramble effect to all elements with class 'scramble-text'
    const elements = document.querySelectorAll('.scramble-text');
    elements.forEach(el => {
      const fx = new TextScramble(el);
      fx.setText(el.textContent);
    });
  
    // Starry background
    if (typeof VANTA !== 'undefined') {
      VANTA.NET({
        el: "#hero",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3fffe,
        backgroundColor: 0x0,
        points: 20.00,
        maxDistance: 30.00,
        spacing: 20.00
      });
    } else {
      console.error('VANTA is not defined. Make sure the library is loaded correctly.');
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Form submission (you'll need to implement the server-side handling)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
      });
    } else {
      console.error('Contact form not found');
    }
  });
  
  