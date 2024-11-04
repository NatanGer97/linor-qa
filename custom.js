let currentSectionIndex = 0;
const sections = document.querySelectorAll('.section');
const totalSections = sections.length;
let isScrolling = false; // Prevent multiple scrolls

function scrollToSection(index) {
    if (index < 0 || index >= totalSections || isScrolling) return;

    isScrolling = true; // Disable further scrolling
    sections[index].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        isScrolling = false; // Re-enable scrolling after animation
    }, 1000); // Adjust the timeout to match the animation duration

    currentSectionIndex = index;
    updateActiveNavLink();
    updateURLHash();
}

window.addEventListener('scroll', (event) => {
    if (event.deltaY > 0) {
        scrollToSection(currentSectionIndex + 1); // Scroll down
    } else {
        scrollToSection(currentSectionIndex - 1); // Scroll up
    }
    event.preventDefault(); // Prevent default scrolling
});


// Event listener for navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
        scrollToSection(targetIndex);
    });
});

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('a.nav-link');
    console.log(navLinks)

    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function updateURLHash() {
    const currentSection = sections[currentSectionIndex];
    const sectionId = currentSection.id;
    history.replaceState(null, null, `#${sectionId}`);
}


