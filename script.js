document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            try {
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    console.log('Arco-Íris: Deslizando até ' + targetId);
                    navLinks.classList.remove('active');
                    const sidebarIcon = mobileMenuBtn.querySelector('i');
                    if (sidebarIcon) {
                        sidebarIcon.classList.replace('fa-times', 'fa-bars');
                    }
                    
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                console.error('Arco-Íris: Erro no scroll suave:', err);
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.card, .blog-card, .sobre-content, .sobre-img, .room-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('revealed');
            }
        });
    };

    // Tabs Logic for Accommodations
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            // Re-trigger reveal for new visible content
            setTimeout(revealOnScroll, 100);
        });
    });

    // Booking Logic with Dynamic Dates
    const getBookingDates = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            checkin: formatDate(today),
            checkout: formatDate(tomorrow)
        };
    };

    const bookingModal = document.getElementById('booking-modal');
    const blogModal = document.getElementById('blog-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const bookingBtns = document.querySelectorAll('.btn-booking');
    const rescueLink = document.getElementById('rescue-link');
    const loaderSkeleton = document.querySelector('.loader-skeleton-modern');
    const redirectSuccess = document.querySelector('.redirect-success');

    bookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const companyId = btn.getAttribute('data-company-id') || '60c17f08b812990de6dd0a35';
            const dates = getBookingDates();
            
            const bookingUrl = `https://hbook.hsystem.com.br/Booking?companyId=${companyId}&checkin=${dates.checkin}&checkout=${dates.checkout}&adults=2&childrenAge=&utm_source=hbook&utm_medium=rede`;
            
            console.log('Arco-Íris: Redirecionando para ' + bookingUrl);

            // Show Transational Modal
            if (loaderSkeleton) loaderSkeleton.classList.add('active');
            if (redirectSuccess) redirectSuccess.style.display = 'none';
            if (bookingModal) bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Simulate "preparation" for elegance, then open
            setTimeout(() => {
                window.open(bookingUrl, '_blank');
                
                // Update modal to success state
                if (loaderSkeleton) loaderSkeleton.classList.remove('active');
                if (redirectSuccess) redirectSuccess.style.display = 'block';
                if (rescueLink) rescueLink.href = bookingUrl;
            }, 1200);
        });
    });

    // Blog logic remains similar but updated for consistency
    const blogPosts = {
        gastronomia: {
            title: "Sabores de Maresias: Gastronomia e Vista Privilegiada",
            category: "GASTRONOMIA",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
            text: `<p>Maresias não é apenas o paraíso dos surfistas, mas também um destino gastronômico imperdível no Litoral Norte...</p>
                   <p><strong>Destaques Locais:</strong> Frutos do mar frescos, Pizzarias artesanais e Vista privilegiada para o mar.</p>`
        },
        diversao: {
            title: "Vida Noturna e Diversão: O Agito de Maresias",
            category: "DIVERSÃO",
            image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=1000",
            text: `<p>Conhecida como uma das praias mais badaladas do Brasil, Maresias ganha uma nova vida quando o sol se põe.</p>
                   <ul><li>Sirena: música eletrônica de classe mundial.</li><li>Santo Gole: música ao vivo e drinks.</li></ul>`
        },
        natureza: {
            title: "Natureza Exuberante: Trilhas, Cachoeiras e Paz",
            category: "NATUREZA",
            image: "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?auto=format&fit=crop&q=80&w=1000",
            text: `<p>Cercada pela Mata Atlântica, Maresias oferece trilhas como a Paúba-Maresias e cachoeiras cristalinas no sertão.</p>`
        },
        petfriendly: {
            title: "Férias com seu Melhor Amigo em Maresias",
            category: "PET FRIENDLY",
            image: "https://images.unsplash.com/photo-1541591419408-25e2e9fbd9c4?auto=format&fit=crop&q=80&w=1000",
            text: `<p>Na Pousada Arco-Íris seu pet é bem-vindo! Temos dicas de passeios no sertão e restaurantes amigos dos animais.</p>`
        }
    };

    const blogBtns = document.querySelectorAll('.btn-blog');
    const blogTitle = document.getElementById('blog-post-title');
    const blogCategory = document.getElementById('blog-post-category');
    const blogImg = document.getElementById('blog-post-img');
    const blogText = document.getElementById('blog-post-text');
    const shareWa = document.getElementById('share-wa');

    blogBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = btn.getAttribute('data-post');
            const post = blogPosts[postId];

            if (post) {
                if (blogTitle) blogTitle.innerText = post.title;
                if (blogCategory) blogCategory.innerText = post.category;
                if (blogImg) blogImg.style.backgroundImage = `url('${post.image}')`;
                if (blogText) blogText.innerHTML = post.text;
                
                if (shareWa) {
                    const shareText = encodeURIComponent(`Olha que dica legal de Maresias: ${post.title} - Veja mais no site da Pousada Arco-Íris!`);
                    shareWa.href = `https://api.whatsapp.com/send?text=${shareText}`;
                }

                if (blogModal) blogModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close logic for all modals
    const closeAllModals = () => {
        if (bookingModal) bookingModal.classList.remove('active');
        if (blogModal) blogModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal || e.target === blogModal) {
            closeAllModals();
        }
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
});
