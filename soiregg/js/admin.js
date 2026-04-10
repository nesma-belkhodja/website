// Admin Dashboard Management
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const exportBtn = document.getElementById('export-btn');
    const searchInput = document.getElementById('search-input');

    let allRsvps = [];
    let filteredRsvps = [];

    // Check if already logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;

        // Check password (the actual password check will be done via Netlify Identity or environment variable)
        // For now, we'll use a simple check - you'll replace this with proper auth
        if (password === 'admin123') { // CHANGE THIS PASSWORD!
            sessionStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
        } else {
            loginError.textContent = 'Incorrect password';
        }
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('adminLoggedIn');
        dashboardSection.style.display = 'none';
        loginSection.style.display = 'block';
        loginError.textContent = '';
        document.getElementById('password').value = '';
    });

    // Show dashboard
    function showDashboard() {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        loadRsvps();
    }

    // Load RSVPs from Netlify Forms API
    async function loadRsvps() {
        try {
            // Note: This requires Netlify Identity or a serverless function to access the Forms API
            // For demo purposes, we'll use localStorage for testing

            // In production, you would use:
            // const response = await fetch('/.netlify/functions/get-submissions');
            // const data = await response.json();
            // allRsvps = data;

            // For local testing, use localStorage
            const stored = localStorage.getItem('rsvps');
            allRsvps = stored ? JSON.parse(stored) : generateDemoData();

            filteredRsvps = [...allRsvps];
            updateStats();
            displayRsvps(filteredRsvps);
        } catch (error) {
            console.error('Error loading RSVPs:', error);
            document.getElementById('rsvp-table-body').innerHTML =
                '<tr><td colspan="7" class="no-data">Error loading RSVPs</td></tr>';
        }
    }

    // Generate demo data for testing
    function generateDemoData() {
        return [
            {
                date: new Date().toISOString(),
                name: 'John Doe',
                email: 'john@example.com',
                phone: '555-0123',
                guests: '2',
                dietary: 'Vegetarian',
                comments: 'Looking forward to it!'
            },
            {
                date: new Date().toISOString(),
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '555-0124',
                guests: '1',
                dietary: '',
                comments: ''
            }
        ];
    }

    // Update statistics
    function updateStats() {
        const totalRsvps = allRsvps.length;
        const totalGuests = allRsvps.reduce((sum, rsvp) => sum + parseInt(rsvp.guests || 1), 0);

        document.getElementById('total-rsvps').textContent = totalRsvps;
        document.getElementById('total-guests').textContent = totalGuests;
    }

    // Display RSVPs in table
    function displayRsvps(rsvps) {
        const tbody = document.getElementById('rsvp-table-body');

        if (rsvps.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No RSVPs yet</td></tr>';
            return;
        }

        tbody.innerHTML = rsvps.map(rsvp => `
            <tr>
                <td>${formatDate(rsvp.date)}</td>
                <td>${escapeHtml(rsvp.name)}</td>
                <td>${escapeHtml(rsvp.email)}</td>
                <td>${escapeHtml(rsvp.phone || '-')}</td>
                <td>${escapeHtml(rsvp.guests)}</td>
                <td>${escapeHtml(rsvp.dietary || '-')}</td>
                <td>${escapeHtml(rsvp.comments || '-')}</td>
            </tr>
        `).join('');
    }

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filteredRsvps = allRsvps.filter(rsvp =>
            rsvp.name.toLowerCase().includes(searchTerm) ||
            rsvp.email.toLowerCase().includes(searchTerm)
        );
        displayRsvps(filteredRsvps);
    });

    // Export to CSV
    exportBtn.addEventListener('click', function() {
        const csv = convertToCSV(filteredRsvps);
        downloadCSV(csv, 'soirave-rsvps.csv');
    });

    // Convert RSVPs to CSV
    function convertToCSV(data) {
        const headers = ['Date', 'Name', 'Email', 'Phone', 'Guests', 'Dietary Restrictions', 'Comments'];
        const rows = data.map(rsvp => [
            formatDate(rsvp.date),
            rsvp.name,
            rsvp.email,
            rsvp.phone || '',
            rsvp.guests,
            rsvp.dietary || '',
            rsvp.comments || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        return csvContent;
    }

    // Download CSV file
    function downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
