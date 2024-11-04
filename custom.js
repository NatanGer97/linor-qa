const sections = document.querySelectorAll('.section');

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
            updateURLHash(targetIndex);

            // Scroll to the target section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

function updateURLHash(index) {
    const currentSection = sections[index];
    const sectionId = currentSection.id;
    history.replaceState(null, null, `#${sectionId}`);
}