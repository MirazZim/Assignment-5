let AccountBalance = 5500; 


function updateUI() {
    document.querySelector('#account-balance span').textContent = `${AccountBalance} BDT`;
}


function handleDonation(cardId) {
    const inputElement = document.getElementById(`input-donation-${cardId}`);
    const donationAmount = parseFloat(inputElement.value);

    
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (donationAmount > AccountBalance) {
        alert("Insufficient balance.");
        return;
    }

    
    AccountBalance -= donationAmount;
    updateUI();

   
    const currentDonationElement = document.getElementById(`donation-amount-${cardId}`);
    let currentDonationValue = parseFloat(currentDonationElement.textContent);
    currentDonationElement.textContent = (currentDonationValue + donationAmount).toFixed(2);

    
    addToHistory(cardId, donationAmount);

    
    inputElement.value = '';
    showSuccessModal(); 
}


function addToHistory(cardId, donationAmount) {
    const donationDescriptions = {
        1: "Flood at Noakhali, Bangladesh",
        2: "Flood Relief in Feni, Bangladesh",
        3: "Aid for Injured in the Quota Movement"
    };

    const donationName = donationDescriptions[cardId];
    const date = new Date().toLocaleString(); 
    const historyEntry = {
        amount: donationAmount,
        name: donationName,
        date: date
    };

    
    let historyList = JSON.parse(localStorage.getItem('donationHistory')) || [];
    historyList.push(historyEntry);

    
    localStorage.setItem('donationHistory', JSON.stringify(historyList));

    
    displayHistory();
}

// Display the donation history from localStorage
function displayHistory() {
    const historyList = JSON.parse(localStorage.getItem('donationHistory')) || [];
    const historySection = document.getElementById('history-list');

    // Clear current history
    historySection.innerHTML = '';

    // Loop through history and add to history section
    historyList.forEach(entry => {
        const newHistoryItem = document.createElement('div');
        newHistoryItem.className = 'p-4 bg-gray-100 rounded-lg';
        newHistoryItem.innerHTML = `<p class="font-bold">${entry.amount} BDT donated for ${entry.name}</p><p>Date: ${entry.date}</p>`;
        historySection.appendChild(newHistoryItem);
    });
}

// Toggle between Donation and History sections
function toggleSection(section) {
    const donationSection = document.getElementById('donation-section');
    const historySection = document.getElementById('history-section');

    if (section === 'donation') {
        donationSection.style.display = 'block';
        historySection.style.display = 'none';
    } else {
        donationSection.style.display = 'none';
        historySection.style.display = 'block';
        displayHistory(); // Display the donation history when switching to the history section
    }
}

// Modal functions to show and hide success modal
function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
}

function showSuccessModal() {
    document.getElementById('successModal').classList.remove('hidden');
}

// Initialize the UI on page load
updateUI();
