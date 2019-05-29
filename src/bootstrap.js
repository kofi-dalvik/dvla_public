import Swal from 'sweetalert2';

/**
 * We will need the title case prototype on the String object to
 * perform convertions of strings form various cases to the sturdly case.
 */

String.prototype.toTitleCase = function () {
    let words = this.toString().split(/[ _]/);

    words = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });

    return words.join(' ');
};


/**
 * Get the preview url of an image file.
 *
 * @param {Object} element
 * @param {Boolean} isDirectFile
 * @return {Promise}
 */
window.getPreviewUrl = (element, isDirectFile = false) => {
    return new Promise((resolve, reject) => {
        const uploadImage = isDirectFile ? element : element.files[0];
        const reader = new FileReader();

        if (!uploadImage) {
            reject('File provided is invalid');
        }

        // Success and Error event handlers
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (event) => reject(event.target.error);

        // Read the uploaded image file
        reader.readAsDataURL(uploadImage);
    });
};

// Make sweet alert global
window.Swal = Swal;

// Popover
$(document).popover({
    container: 'body',
    trigger: 'hover',
    selector: '[data-toggle=popover]',

    placement(popoverNode, triggeringNode) {
        return $(triggeringNode).hasClass('btn-action') ? 'bottom' : 'auto';
    },
});
