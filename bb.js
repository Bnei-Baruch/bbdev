// Reception View
(function($){
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
                    const contactValue = contactInput.val();
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

