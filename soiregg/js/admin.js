// Admin Dashboard Management with Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9N3RZuDSfey1Cbe0I6K6ATB3gFYmUqhw",
    authDomain: "soiregg.firebaseapp.com",
    databaseURL: "https://soiregg-default-rtdb.firebaseio.com",
    projectId: "soiregg",
    storageBucket: "soiregg.firebasestorage.app",
    messagingSenderId: "654566555389",
    appId: "1:654566555389:web:4177b274634d1b7c7d4894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginError = document.getElementById('login-error');
    const exportBtn = document.getElementById('export-btn');
    const searchInput = document.getElementById('search-input');

    let allRsvps = [];
    let filteredRsvps = [];

    // Auto-login (no password required)
    showDashboard();

    // Login form submission (disabled - no password required)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showDashboard();
    });

    // Show dashboard
    function showDashboard() {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        loadRsvps();
    }

    // Load RSVPs from Firebase
    function loadRsvps() {
        const rsvpRef = ref(database, "rsvps");
        onValue(rsvpRef, (snapshot) => {
            const rsvps = snapshot.val();

            if (!rsvps) {
                allRsvps = [];
            } else {
                // Convert Firebase object to array with IDs
                allRsvps = Object.entries(rsvps).map(([id, data]) => ({
                    id,
                    ...data
                }));
            }

            filteredRsvps = [...allRsvps];
            updateStats();
            displayRsvps(filteredRsvps);
        }, (error) => {
            console.error('Error loading RSVPs:', error);
            document.getElementById('rsvp-table-body').innerHTML =
                '<tr><td colspan="5" class="no-data">Error loading RSVPs</td></tr>';
        });
    }

    // Update statistics
    function updateStats() {
        const totalRsvps = allRsvps.length;
        const totalGuests = allRsvps.length; // Each RSVP is 1 guest

        document.getElementById('total-rsvps').textContent = totalRsvps;
        document.getElementById('total-guests').textContent = totalGuests;
    }

    // Display RSVPs in table
    function displayRsvps(rsvps) {
        const tbody = document.getElementById('rsvp-table-body');

        if (rsvps.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No RSVPs yet</td></tr>';
            return;
        }

        tbody.innerHTML = rsvps.map(rsvp => `
            <tr>
                <td>${formatDate(rsvp.date)}</td>
                <td>${escapeHtml(rsvp.name)}</td>
                <td>${escapeHtml(rsvp.phone || '-')}</td>
                <td>${escapeHtml(rsvp.note || '-')}</td>
                <td>
                    <button class="delete-btn" onclick="window.deleteRSVP('${rsvp.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Delete RSVP function (exposed globally)
    window.deleteRSVP = function(id) {
        if (confirm('Are you sure you want to delete this RSVP?')) {
            const rsvpRef = ref(database, `rsvps/${id}`);
            remove(rsvpRef)
                .then(() => {
                    console.log('RSVP deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting RSVP:', error);
                    alert('Error deleting RSVP. Please try again.');
                });
        }
    };

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filteredRsvps = allRsvps.filter(rsvp =>
            rsvp.name.toLowerCase().includes(searchTerm) ||
            (rsvp.phone && rsvp.phone.toLowerCase().includes(searchTerm))
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
        const headers = ['Date', 'Name', 'Phone', 'Note'];
        const rows = data.map(rsvp => [
            formatDate(rsvp.date),
            rsvp.name,
            rsvp.phone || '',
            rsvp.note || ''
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
