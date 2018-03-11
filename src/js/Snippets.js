export function contactform() {

    const form = document.getElementsByClassName('js-contactform')[0],
          fields = form.getElementsByClassName('js-field');

    document.addEventListener('click', function(e) {
        
        // Show placeholder if input empty
        const placeholders = function() {
            for (let i = 0; i < fields.length; i ++) {
                if (fields[i].value.length === 0) {
                    fields[i].parentNode.getElementsByTagName('label')[0].classList.remove('is-active');
                }
            }
        }

        if (e.target.nodeName == 'LABEL') {

            // Check Input/Textarea exist
            if (e.target.parentNode.getElementsByTagName('input')[0] != undefined) {
                e.target.parentNode.getElementsByTagName('input')[0].focus();
            } else {
                e.target.parentNode.getElementsByTagName('textarea')[0].focus();
            }
            
            placeholders();

            e.target.classList.add('is-active');
        }
        
        // Action with click outside the form
        if (e.target.classList.contains('js-contactform') || e.target.classList.contains('o-container')) {
            placeholders();
        }
    });   
};
