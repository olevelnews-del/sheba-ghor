// Auto-fill bookmarklet for ShebaGhor
// Usage: Drag this link to your bookmarks bar: 
// <a href="data:text/javascript,shebaghorAutoFill()">Fill from ShebaGhor</a>

function shebaghorAutoFill() {
  // Read data from localStorage
  const nidData = JSON.parse(localStorage.getItem('shebaghor_nid_data') || '{}');
  
  if (!nidData || Object.keys(nidData).length === 0) {
    alert('No ShebaGhor data found in localStorage. Please complete the NID flow first.');
    return;
  }
  
  // Find and fill inputs on the NID correction page
  const fillField = (placeholderPattern, value) => {
    if (!value) return;
    const inputs = document.querySelectorAll('input');
    for (const input of inputs) {
      // Match by placeholder attribute
      if (input.placeholder && input.placeholder.toLowerCase().includes(placeholderPattern.toLowerCase())) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      // Match by name attribute
      if (input.name && input.name.toLowerCase().includes(placeholderPattern.toLowerCase())) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    return false;
  };
  
  // Fill NID Name
  if (nidData.nidName) {
    fillField('nid name', nidData.nidName);
  }
  
  // Fill SSC Name
  if (nidData.sscName) {
    fillField('ssc name', nidData.sscName);
  }
  
  // Fill NID DOB
  if (nidData.nidDob) {
    fillField('nid dob', nidData.nidDob);
  }
  
  // Fill SSC DOB
  if (nidData.sscDob) {
    fillField('ssc dob', nidData.sscDob);
  }
  
  // Fill Correct Name
  if (nidData.correctName) {
    fillField('correct name', nidData.correctName);
  }
  
  // Fill NID Number
  if (nidData.nidNumber) {
    const nidInput = document.querySelector('input[placeholder*="nid number"] || input[placeholder*="NID number"] || input[name*="nid"]');
    if (nidInput) {
      nidInput.value = nidData.nidNumber;
      nidInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
  
  // Fill SSC Number
  if (nidData.sscNumber) {
    const sscInput = document.querySelector('input[placeholder*="ssc"] || input[placeholder*="SSC"]');
    if (sscInput) {
      sscInput.value = nidData.sscNumber;
      sscInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
  
  // Fill Division
  if (nidData.division) {
    const divSelect = document.querySelector('select[placeholder*="division"] || select[name*="division"]');
    if (divSelect) {
      divSelect.value = nidData.division;
      divSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  
  // Fill District
  if (nidData.district) {
    const distSelect = document.querySelector('select[placeholder*="district"] || select[name*="district"]');
    if (distSelect) {
      distSelect.value = nidData.district;
      distSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  
  // Fill Upazila
  if (nidData.upazila) {
    const upazilaSelect = document.querySelector('select[placeholder*="upazila"] || select[name*="upazila"]');
    if (upazilaSelect) {
      upazilaSelect.value = nidData.upazila;
      upazilaSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  
  alert('ShebaGhor data auto-filled successfully! Review the form and submit on the govt site.');
}

// Make it available as a bookmarklet function
window.shebaghorAutoFill = shebaghorAutoFill;