// Photo Gallery Management
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryImages();
    setupLightbox();
});

// Load images from directories
function loadGalleryImages() {
    const galleries = {
        '2025': document.getElementById('gallery-2025'),
        '2024': document.getElementById('gallery-2024'),
        '2023': document.getElementById('gallery-2023')
    };

    // 2025 Photos - All converted TIF + existing JPEG files (37 total)
    const images2025 = [
        'images/2025 Photos /000005870007.jpg',
        'images/2025 Photos /000005870008.jpg',
        'images/2025 Photos /000005870009.jpg',
        'images/2025 Photos /000005870010.jpg',
        'images/2025 Photos /000005870011.jpg',
        'images/2025 Photos /000005870012.jpg',
        'images/2025 Photos /000005870013.jpg',
        'images/2025 Photos /000005870014.jpg',
        'images/2025 Photos /000005870015.jpg',
        'images/2025 Photos /000005870016.jpg',
        'images/2025 Photos /000005870018.jpg',
        'images/2025 Photos /000005870019.jpg',
        'images/2025 Photos /000005870021.jpg',
        'images/2025 Photos /000005870022.jpg',
        'images/2025 Photos /000005870023.jpg',
        'images/2025 Photos /000005870024.jpg',
        'images/2025 Photos /000005870025.jpg',
        'images/2025 Photos /000005870026.jpg',
        'images/2025 Photos /000005870027.jpg',
        'images/2025 Photos /000005870028.jpg',
        'images/2025 Photos /000005870029.jpg',
        'images/2025 Photos /000005870030.jpg',
        'images/2025 Photos /000005870031.jpg',
        'images/2025 Photos /000005870032.jpg',
        'images/2025 Photos /IMG_1679.jpeg',
        'images/2025 Photos /IMG_1680.jpeg',
        'images/2025 Photos /IMG_1699.jpeg',
        'images/2025 Photos /IMG_1702.jpeg',
        'images/2025 Photos /IMG_1703.jpeg',
        'images/2025 Photos /IMG_1708.jpeg',
        'images/2025 Photos /IMG_1711.jpeg',
        'images/2025 Photos /IMG_1724.jpeg',
        'images/2025 Photos /IMG_2248.jpeg',
        'images/2025 Photos /IMG_5158.HEIC.jpeg',
        'images/2025 Photos /IMG_8705.jpeg',
        'images/2025 Photos /IMG_9738.jpeg',
        'images/2025 Photos /IMG_9743.jpeg',
    ];

    // 2024 Photos - All converted HEIC + existing JPG files (31 total)
    const images2024 = [
        'images/2024 Photos/419E3AF3-1E88-4CAB-ABD0-062281DBE5ED.JPG',
        'images/2024 Photos/53951311-FE5A-4B38-9924-8576B783BA58.JPG',
        'images/2024 Photos/DF61FFE8-1390-47CC-8753-483AEB14E1F2.JPG',
        'images/2024 Photos/IMG_1833.jpg',
        'images/2024 Photos/IMG_1838.jpg',
        'images/2024 Photos/IMG_1839.jpg',
        'images/2024 Photos/IMG_1840.jpg',
        'images/2024 Photos/IMG_1841.jpg',
        'images/2024 Photos/IMG_1842.jpg',
        'images/2024 Photos/IMG_1843.jpg',
        'images/2024 Photos/IMG_1844.jpg',
        'images/2024 Photos/IMG_1845.jpg',
        'images/2024 Photos/IMG_1846.jpg',
        'images/2024 Photos/IMG_1861.jpg',
        'images/2024 Photos/IMG_1897.jpg',
        'images/2024 Photos/IMG_1905.jpg',
        'images/2024 Photos/IMG_1906.jpg',
        'images/2024 Photos/IMG_1957.jpg',
        'images/2024 Photos/IMG_1959.jpg',
        'images/2024 Photos/IMG_1960.JPG',
        'images/2024 Photos/IMG_1961.jpg',
        'images/2024 Photos/IMG_1964.jpg',
        'images/2024 Photos/IMG_1965.jpg',
        'images/2024 Photos/IMG_1966.jpg',
        'images/2024 Photos/IMG_1967.jpg',
        'images/2024 Photos/IMG_1968.jpg',
        'images/2024 Photos/IMG_1969.jpg',
        'images/2024 Photos/IMG_1970.JPG',
        'images/2024 Photos/IMG_1971.JPG',
        'images/2024 Photos/IMG_1972.JPG',
        'images/2024 Photos/IMG_1977.jpg',
    ];

    // 2023 Photos (10 total)
    const images2023 = [
        'images/2023 Photos/IMG_0206.PNG',
        'images/2023 Photos/IMG_0207.PNG',
        'images/2023 Photos/IMG_0208.PNG',
        'images/2023 Photos/IMG_0209.PNG',
        'images/2023 Photos/IMG_0210.PNG',
        'images/2023 Photos/IMG_0211.PNG',
        'images/2023 Photos/IMG_0212.PNG',
        'images/2023 Photos/IMG_0213.PNG',
        'images/2023 Photos/IMG_0214.PNG',
        'images/2023 Photos/IMG_0215.PNG',
    ];

    // Replace placeholders with actual images
    if (images2025.length > 0) {
        galleries['2025'].innerHTML = '';
        images2025.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'PROEGGBITION 2025';
            img.classList.add('gallery-img');
            galleries['2025'].appendChild(img);
        });
    }

    if (images2024.length > 0) {
        galleries['2024'].innerHTML = '';
        images2024.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'ALTEREGGO 2024';
            img.classList.add('gallery-img');
            galleries['2024'].appendChild(img);
        });
    }

    if (images2023.length > 0) {
        galleries['2023'].innerHTML = '';
        images2023.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'BAROQUE EGGPUNK 2023';
            img.classList.add('gallery-img');
            galleries['2023'].appendChild(img);
        });
    }
}

// Lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentImages = [];
    let currentIndex = 0;

    // Open lightbox when clicking on gallery images
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-img')) {
            const gallery = e.target.closest('.photo-grid');
            currentImages = Array.from(gallery.querySelectorAll('.gallery-img'));
            currentIndex = currentImages.indexOf(e.target);
            showImage(currentIndex);
            lightbox.classList.add('active');
        }
    });

    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Previous image
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
    });

    // Next image
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    function showImage(index) {
        lightboxImg.src = currentImages[index].src;
    }
}
