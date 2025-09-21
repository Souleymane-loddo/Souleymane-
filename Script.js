// Script pour rendre le site web interactif

// 1. Navigation mobile responsive
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du DOM
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Fonction pour basculer le menu mobile
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        // Changer l'icône du menu (hamburger <-> X)
        mobileMenu.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
    }
    
    // Gestionnaire d'événements pour le bouton du menu mobile
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Fermer le menu lorsqu'un lien est cliqué
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
});
// 2. Défilement fluide lors de la navigation
document.addEventListener('DOMContentLoaded', function() {
    // Ajout du comportement de défilement fluide à l'élément HTML
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Solution alternative pour les navigateurs qui ne supportent pas scroll-behavior
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Vérifier si le lien pointe vers une ancre sur la page
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Animation de défilement fluide
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
// 3. Animation des compteurs statistiques
document.addEventListener('DOMContentLoaded', function() {
    // Configurer l'observateur d'intersection
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    // Fonction pour animer un compteur
    function animateCounter(element, target) {
        // Paramètres d'animation
        const duration = 2000; // 2 secondes
        const frameDuration = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        // Valeur cible (sans le + ou autres caractères)
        const countTo = parseInt(target);
        
        // Démarrer l'animation
        const counter = setInterval(() => {
            frame++;
            
            // Calculer la progression avec effet de ralentissement
            const progress = frame / totalFrames;
            const easeOut = progress * (2 - progress);
            
            // Calculer la valeur actuelle
            const currentCount = Math.floor(countTo * easeOut);
            
            // Mettre à jour l'élément
            element.textContent = currentCount + '+';
            
            // Arrêter l'animation à la fin
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    }
    
    // Observer les éléments statistiques
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément est visible
            if (entry.isIntersecting) {
                // Récupérer la valeur cible
                const target = entry.target.textContent.replace('+', '');
                // Réinitialiser la valeur à 0
                entry.target.textContent = '0+';
                // Démarrer l'animation
                animateCounter(entry.target, target);
                // Arrêter d'observer l'élément
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observer tous les éléments de statistiques
    document.querySelectorAll('.stats div span').forEach(stat => {
        observer.observe(stat);
    });
});
// 4. Animations supplémentaires et initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Animation d'apparition pour les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Observer les cartes de service
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Ajouter un délai progressif pour chaque carte
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 200 * index);
                
                // Ne plus observer une fois animé
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observer toutes les cartes
    serviceCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Animation pour la section héros
    const heroText = document.querySelector('.hero-text');
    const heroImg = document.querySelector('.hero-img');
    
    // Ajouter une classe pour déclencher les animations
    setTimeout(() => {
        heroText.classList.add('animated');
        heroImg.classList.add('animated');
    }, 300);
});
