# Rene Ceron Website Structure

This site is organized so content, styling, scripts, and images are separated.

## Folder structure

- `index.html`: main page markup only
- `admin/`: Decap CMS admin panel and config
- `assets/css/main.css`: site styles
- `assets/js/site.js`: site behavior and content loading
- `assets/images/hero/`: hero images
- `assets/images/gallery/`: gallery images used on the homepage
- `assets/images/icons/`: service and UI icons
- `assets/images/portfolio/`: extra image library not currently rendered on the homepage
- `assets/images/uploads/`: new images uploaded from the CMS
- `content/site/links.json`: Calendly and Google review links
- `content/site/services.json`: service cards
- `content/site/gallery.json`: gallery items
- `content/site/reviews.json`: testimonial items

## Editing content

Use the admin panel when possible:

- `Links`: update Calendly or Google review URLs
- `Servicios`: edit service names, prices, descriptions, and buttons
- `Galeria`: replace homepage gallery images and labels
- `Reseñas`: update testimonials

## Adding images manually

- Put homepage gallery images in `assets/images/gallery/`
- Put reusable icons in `assets/images/icons/`
- Put extra reference photos in `assets/images/portfolio/`
- Keep file names short and predictable, like `look-05.jpeg`

## Notes

- The homepage loads editable content from `content/site/`
- The CMS uploads new files to `assets/images/uploads/`
- If you move a file manually, update its path in the matching JSON file
