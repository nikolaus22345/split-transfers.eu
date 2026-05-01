# ELEMENTOR INTEGRACIJA - Booking Forma

## 📋 Koraci za Integraciju

### KORAK 1: Kopiraj HTML u Elementor

1. **Otvori Elementor editor** na stranici gdje želiš formu
2. **Dodaj "HTML" widget**
3. **Kopiraj sadržaj** iz `elementor-booking-form.html` (sve između `<div class="booking-form-container">` i `</div>`)
4. **Zalijepi** u Elementor HTML widget

---

### KORAK 2: Upload CSS i JavaScript

#### A) CSS Datoteka
1. Idi u **Appearance → Theme File Editor**
2. Kreiraj novi file: `booking-form-styles.css`
3. Kopiraj sadržaj iz `booking-form-styles.css`
4. Spremi file

#### B) JavaScript Datoteka
1. U istom editoru kreiraj: `booking-form-script.js`
2. Kopiraj sadržaj iz `booking-form-script.js`
3. **VAŽNO**: Na početku JavaScript fajla dodaj nonce za sigurnost:

```javascript
// Na vrhu booking-form-script.js datoteke dodaj:
const bookingFormData = {
    nonce: '<?php echo wp_create_nonce("booking_form_nonce"); ?>'
};
```

---

### KORAK 3: PHP Backend Handler

1. Otvori **functions.php** tvoje teme
2. **Kopiraj cijeli sadržaj** iz `booking-form-php-handler.php`
3. **Zalijepi na kraj** functions.php datoteke
4. Spremi

**ILI** (preporučeno):

Kreiraj **Custom Plugin**:
1. Napravi folder: `/wp-content/plugins/Dubrovnik-booking-form/`
2. Kreiraj file: `Dubrovnik-booking-form.php`
3. Dodaj header:

```php
<?php
/**
 * Plugin Name: Dubrovnik Transfers Booking
 * Description: Booking form handler
 * Version: 1.0
 */

// Ovdje kopiraj kod iz booking-form-php-handler.php
?>
```

4. Aktiviraj plugin u wp-admin

---

### KORAK 4: Enqueue Scripts u Elementor

#### Opcija A: Koristi Elementor Custom Code

1. Idi u **Elementor → Custom Code**
2. Dodaj novi snippet:

```html
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/booking-form-styles.css">
<script src="<?php echo get_template_directory_uri(); ?>/booking-form-script.js"></script>
```

#### Opcija B: Dodaj u functions.php

```php
add_action('wp_enqueue_scripts', 'load_booking_form_assets');

function load_booking_form_assets() {
    wp_enqueue_style(
        'booking-form-styles',
        get_template_directory_uri() . '/booking-form-styles.css',
        [],
        '1.0.0'
    );
    
    wp_enqueue_script(
        'booking-form-script',
        get_template_directory_uri() . '/booking-form-script.js',
        ['jquery'],
        '1.0.0',
        true
    );
    
    // Pass data to JavaScript
    wp_localize_script('booking-form-script', 'bookingFormData', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('booking_form_nonce')
    ]);
}
```

---

### KORAK 5: Email Konfiguracija

#### Promijeni Email Adresu

U `booking-form-php-handler.php` pronađi:

```php
$admin_email = get_option('admin_email');
```

Zamijeni sa:

```php
$admin_email = 'info@dubrovnik-transfers.hr'; // Tvoj email
```

#### Testiranje Emaila

Instaliraj **WP Mail SMTP** plugin za pouzdano slanje emailova:
1. Install plugin: WP Mail SMTP
2. Konfiguriraj SMTP (Gmail, SendGrid, itd.)
3. Testiraj slanje

---

## 🎨 ALTERNATIVA: Koristi Elementor Pro Form Widget

Ako imaš **Elementor Pro**, jednostavnije rješenje:

### 1. Dodaj Form Widget
- Drag & drop **Form** widget u Elementor

### 2. Kreiraj Polja
- **Pickup** - Text field (ID: `pickup`)
- **Dropoff** - Text field (ID: `dropoff`)
- **Date** - Date field (ID: `date`)
- **People** - Number field (ID: `people`)
- **Transfer Type** - Radio buttons (ID: `transfer_type`)

### 3. Dodaj Autocomplete JavaScript

U **Elementor → Custom Code** dodaj:

```html
<script>
// Kopiraj locations array i autocomplete funkcije
// iz booking-form-script.js

jQuery(document).ready(function($) {
    // Inicijaliziraj autocomplete za Elementor form polja
    const pickupField = $('input[name="form_fields[pickup]"]');
    const dropoffField = $('input[name="form_fields[dropoff]"]');
    
    // Dodaj autocomplete logiku ovdje
});
</script>
```

### 4. Actions After Submit
- **Email** - Postavi admin email
- **Email 2** (optional) - Confirmation email za korisnika
- **Webhook** (optional) - Pošalji u CRM

---

## 📊 Baza Podataka

Rezervacije će se automatski spremati u tablicu: `wp_transfer_bookings`

### Pregled Rezervacija

Dodaj u **functions.php** za admin stranicu:

```php
add_action('admin_menu', 'add_bookings_admin_page');

function add_bookings_admin_page() {
    add_menu_page(
        'Transfer Bookings',
        'Bookings',
        'manage_options',
        'transfer-bookings',
        'render_bookings_admin_page',
        'dashicons-car',
        30
    );
}

function render_bookings_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'transfer_bookings';
    $bookings = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
    
    echo '<div class="wrap">';
    echo '<h1>Transfer Bookings</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead><tr><th>ID</th><th>Pickup</th><th>Dropoff</th><th>Date</th><th>People</th><th>Type</th><th>Created</th></tr></thead>';
    echo '<tbody>';
    
    foreach ($bookings as $booking) {
        echo "<tr>";
        echo "<td>{$booking->id}</td>";
        echo "<td>{$booking->pickup}</td>";
        echo "<td>{$booking->dropoff}</td>";
        echo "<td>{$booking->date}</td>";
        echo "<td>{$booking->people}</td>";
        echo "<td>{$booking->transfer_type}</td>";
        echo "<td>{$booking->created_at}</td>";
        echo "</tr>";
    }
    
    echo '</tbody></table>';
    echo '</div>';
}
```

---

## ✅ Checklist

- [ ] HTML kod kopiran u Elementor HTML widget
- [ ] CSS datoteka uploadana i enqueue-ana
- [ ] JavaScript datoteka uploadana i enqueue-ana
- [ ] PHP handler dodan u functions.php ili plugin
- [ ] Email adresa konfigurirana
- [ ] SMTP plugin instaliran i konfiguriran
- [ ] Forma testirana (send test booking)
- [ ] Email notifikacija primljena
- [ ] Baza podataka provjerena

---

## 🐛 Troubleshooting

### Autocomplete ne radi
- Provjeri da li je JavaScript učitan: `console.log('Script loaded')`
- Otvori Browser Console (F12) za greške

### Email se ne šalje
- Instaliraj WP Mail SMTP plugin
- Provjeri spam folder
- Testiraj SMTP konfiguraciju

### AJAX vraća 0 ili 400
- Provjeri nonce: `wp_verify_nonce()`
- Provjeri `admin-ajax.php` URL
- Aktiviraj WP_DEBUG u wp-config.php

### Forma ne submitta
- Provjeri da li je jQuery učitan
- Provjeri browser console za JavaScript greške

---

## 📞 Podrška

Ako imaš problema, provjeri:
1. WordPress Debug log
2. Browser Console (F12)
3. Network tab u Developer Tools

---

**Sve datoteke su spremne za WordPress/Elementor integraciju! 🚀**

