function filterCategory(category) {
    const items = document.getElementsByClassName('gallery-item');
    
    // Loop through all items and apply filter
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Reset all items visibility
        item.style.display = 'none';

        // Show items based on category
        if (category === 'all') {
            // Show only images, hide videos in 'all'
            if (item.querySelector('img')) {
                item.style.display = 'block';
            }
        } else if (item.classList.contains(category)) {
            // Show specific category (including video if category === 'video')
            item.style.display = 'block';
        }
    }

    // Update the active button style
    const buttons = document.getElementsByClassName('category-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    event.target.classList.add('active');
}