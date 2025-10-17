// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Logic ---

    // Get all navigation links from both main header and bottom navigation
    const navLinks = document.querySelectorAll('.nav-link');
    // Get all page sections
    const pageSections = document.querySelectorAll('.page-section');

    // Function to set the active section and navigation link
    function setActive(targetId) {
        // Remove 'active' class from all links and sections first
        navLinks.forEach(link => link.classList.remove('active'));
        pageSections.forEach(section => section.classList.remove('active'));

        // Add 'active' class to the corresponding section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add 'active' class to all navigation links that point to the targetId
        // This ensures both main nav and bottom nav links are updated
        document.querySelectorAll(`.nav-link[data-target="${targetId}"]`).forEach(link => {
            link.classList.add('active');
        });
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            // Extract the target ID from the href (e.g., '#home' -> 'home')
            const targetId = link.getAttribute('href').substring(1);
            setActive(targetId);
        });
    });

    // Initialize the active section based on the URL hash or default to 'home'
    const initialHash = window.location.hash ? window.location.hash.substring(1) : 'home';
    setActive(initialHash);

    // --- Forum Post Creation Logic ---

    // Get elements for forum post creation
    const createPostBtn = document.getElementById('create-post-btn');
    const postTitleInput = document.getElementById('post-title');
    const postContentTextarea = document.getElementById('post-content');
    const forumPostsContainer = document.getElementById('forum-posts-container');

    // Add click event listener to the 'Konuyu Yayınla' button
    if (createPostBtn && postTitleInput && postContentTextarea && forumPostsContainer) {
        createPostBtn.addEventListener('click', () => {
            const title = postTitleInput.value.trim();
            const content = postContentTextarea.value.trim();

            // Check if both title and content are not empty
            if (title === '' || content === '') {
                alert('Lütfen hem başlık hem de içerik girin.');
                return;
            }

            // Create a new date for the post
            const now = new Date();
            // Format the date/time (e.g., '15 Nisan 2024, 14:30')
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const postDate = now.toLocaleString('tr-TR', options);

            // Create the HTML for the new forum post
            const newPostHtml = `
                <div class="forum-post card">
                    <h4>${title}</h4>
                    <p>${content}</p>
                    <div class="post-meta">Gönderen: Yeni Kullanıcı - ${postDate}</div>
                </div>
            `;

            // Insert the new post at the beginning of the forum posts container
            forumPostsContainer.insertAdjacentHTML('afterbegin', newPostHtml);

            // Clear the input fields after creating the post
            postTitleInput.value = '';
            postContentTextarea.value = '';

            // Optionally scroll to the top of the forum posts to see the new post
            forumPostsContainer.scrollTop = 0;
        });
    }
});
