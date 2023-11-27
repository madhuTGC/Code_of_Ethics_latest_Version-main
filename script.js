
window.onload = function () {
  const paramName = 'userid'; 
  const paramValue = getQueryParam(paramName);

  if (paramValue !== null) {
      console.log(`${paramName} is: ${paramValue}`);
      localStorage.setItem('user_id', paramValue);

  } else {
      console.log(`${paramName} not found in the URL.`);
  }
};

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const checkbox = document.getElementById('checkbox');
const finishBtn = document.getElementById('finishBtn');

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    finishBtn.style.display = 'block';
    localStorage.setItem('user_response', 'yes');
  } else {
    finishBtn.style.display = 'none';
    localStorage.setItem('user_response', 'no');
  }
});

window.addEventListener('DOMContentLoaded', function() {
  const userID = generateUserID(); 
  const utcTime = new Date();
  const istTime = new Date(utcTime.getTime() + 5.5 * 60 * 60 * 1000); 
  const pageLoadTime = istTime.toISOString();

  window.addEventListener('beforeunload', function() {
    localStorage.setItem('user_response', 'no');
  });
});

function generateUserID() {
  return 'user123'; 
}

finishBtn.addEventListener('click', function () {
  const userData = {
    user_id: localStorage.getItem('user_id'),
    user_response: localStorage.getItem('user_response') || 'no',
  };
  console.log("user data", userData);

  fetch('https://connectopia.app:8080/postCodeOfEthicLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(result => {
      console.log("result", result); 
      showSuccessPopup();
    })
    .catch(error => {
      console.error('Error:', error); 
    });
});


function showSuccessPopup() {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const message = document.createElement('p');
  message.textContent = 'Successfully done!';

  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.className = 'close-button';
  closeButton.addEventListener('click', function () {
      document.body.removeChild(popup);
      hidePopup(); 
  });

  popup.appendChild(message);
  popup.appendChild(closeButton);

  document.body.appendChild(popup);
  showPopup(); 
}

function showPopup() {
  document.body.classList.add('popup-active');
  
}

function hidePopup() {
  document.body.classList.remove('popup-active');
}








