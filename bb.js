// Reception View
(function($){
    if ($ === null) {
	    return;
    }
    // Enhanced version with proper error handling and debugging
    $(document).ready(function() {
        try {
            // First, handle URL parameter cleanup with error handling
            handleUrlParameterCleanup();
            
            // Get the contact input element by its ID
	    const contactInput = $('#views-exposed-form-reception-qr-meals-reception #edit-contact-id, #views-exposed-form-reception-qr-events-reception #edit-contact-id');
        
            // Focus the contact input and clear its value
            if (contactInput) {
                const targetField1 = $('#views-exposed-form-reception-qr-meals-reception #edit-id-1, #views-exposed-form-reception-qr-events-reception #edit-id-1');
                const targetField2 = $('#views-exposed-form-reception-qr-meals-reception #edit-id-2, #views-exposed-form-reception-qr-events-reception #edit-id-2');
                if (targetField1) {
                    targetField1.val('');
                }
                if (targetField2) {
                    targetField2.val('');
                }
                
                contactInput.focus().val('');
                
                // Add input event listener to the contact field
                contactInput.on('input', function() {
                    let contactValue = contactInput.val();
                    contactValue = contactValue.substr(0, 20);
                    if (targetField1) {
                        targetField1.val(contactValue);
                    }
                    if (targetField2) {
                        targetField2.val(contactValue);
                    }
                });
            }
        } catch (error) {
            // This is crucial for understanding what's going wrong
            console.error('Error in DOMContentLoaded handler:', error);
            console.error('Error stack:', error.stack);
        }
    });

    function handleUrlParameterCleanup() {
        try {
            // Create a URLSearchParams object from the current page's query string
            const urlParams = new URLSearchParams(window.location.search);
        
            // Check if either 'id-1' or 'id-2' parameters exist in the URL
            const hasId0 = urlParams.has('contact-id');
            const hasId1 = urlParams.has('id-1');
            const hasId2 = urlParams.has('id-2');
        
            // Only proceed if we found parameters that need to be removed
            if (hasId0 || hasId1 || hasId2) {
                // Remove the unwanted parameters
                if (hasId0) {
                    urlParams.delete('contact-id');
                }
                if (hasId1) {
                    urlParams.delete('id-1');
                }
                if (hasId2) {
                    urlParams.delete('id-2');
                }
            
                // Construct the new URL without the unwanted parameters
                const baseUrl = window.location.protocol + '//' + 
                               window.location.host + 
                               window.location.pathname;
            
                const cleanedQuery = urlParams.toString();
                const newUrl = baseUrl + (cleanedQuery ? '?' + cleanedQuery : '');
            
                // Check if history API is available (defensive programming)
                if (window.history && window.history.replaceState) {
                    // Update the browser's URL without reloading the page
                    window.history.replaceState({}, document.title, newUrl);
                }
            }
        } catch (error) {
            console.error('Error during URL cleanup:', error);
            // Don't rethrow the error - we want the rest of the code to continue
            // even if URL cleanup fails
        }
    }
})(jQuery);

/* ============================================================================
 * Adds a small collapse/expand toggle at the top of the CiviCRM left
 * sidebar (installed via civicrm-custom-theme-overrides.css).
 *
 * Clicking it toggles the "civi-sidebar-collapsed" class on <body>, which
 * the CSS uses to shrink the sidebar to icon-only width (56px) and push
 * the main content back accordingly. Clicking again restores full width.
 *
 * This button lives INSIDE the sidebar's own list (as its first item),
 * not as a separately floating fixed element - so it inherits the
 * sidebar's own (already correct) position and never fights the Drupal
 * toolbar or CiviCRM's native mobile toggle button, unlike earlier
 * attempts.
 *
 * Where to add this file: alongside civicrm-custom-theme-overrides.css,
 * e.g. registered via an extension's hook_civicrm_coreResourceList()
 * (same pattern as the side-panel split-view CSS/JS you've added before).
 * ========================================================================== */

(() => {
    const menu = document.getElementById('civicrm-menu');
    if (!menu) return;
    if (document.getElementById('civi-sidebar-collapse-btn')) return; // already added

    const li = document.createElement('li');
    li.id = 'civi-sidebar-collapse-btn';
    li.innerHTML = `
    <a href="#" title="Collapse / expand menu">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <line x1="9" y1="4" x2="9" y2="20"/>
      </svg>
    </a>
  `;
    li.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('civi-sidebar-collapsed');
    });

    menu.prepend(li);
})();
