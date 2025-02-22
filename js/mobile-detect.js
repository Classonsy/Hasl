// Check if user is on mobile and redirect to mobile subdomain if needed
if(!/m\./i.test(window.location.hostname) && 
   /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  window.location.href = window.location.href.replace(/^(https?:\/\/)/, '$1m.');
}