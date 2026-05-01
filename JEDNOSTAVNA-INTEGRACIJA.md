# 🚀 JEDNOSTAVNA WORDPRESS INTEGRACIJA

Ovo je **NAJJEDNOSTAVNIJE** rješenje - bez PHP backend-a, bez baze podataka, samo autocomplete i redirect!

## ✅ Što trebaš napraviti (5 koraka)

### 1️⃣ Kopiraj HTML formu u Elementor

1. Otvori stranicu u **Elementor editoru**
2. Dodaj **HTML widget**
3. Otvori `elementor-simple-booking-form.html`
4. Kopiraj **cijeli sadržaj** i zalijepi u HTML widget
5. **VAŽNO**: Promijeni `action` URL u formi na svoju domenu:
   ```html
   <form id="simple-booking-form" method="GET" action="https://TVOJA-DOMENA.com/booking">
   ```

### 2️⃣ Dodaj JavaScript za autocomplete

**Metoda A - Custom Code (preporučeno ako imaš Elementor Pro):**
1. Idi na **Elementor → Custom Code**
2. Klikni **Add New**
3. Ime: "Booking Form Autocomplete"
4. Location: **Body - End**
5. Otvori `simple-booking-script.js`
6. Kopiraj sadržaj i zalijepi
7. Spremi

**Metoda B - Theme Functions:**
1. Idi na **Appearance → Theme File Editor**
2. Otvori `functions.php`
3. Na kraju datoteke dodaj:
```php
// Booking form autocomplete script
function enqueue_simple_booking_script() {
    ?>
    <script>
    // Ovdje zalijepi cijeli sadržaj iz simple-booking-script.js
    </script>
    <?php
}
add_action('wp_footer', 'enqueue_simple_booking_script');
```

**Metoda C - Code Snippets Plugin (najlakše):**
1. Instaliraj **Code Snippets** plugin
2. Idi na **Snippets → Add New**
3. Kopiraj kod iz `simple-booking-script.js`
4. Otvori ga s `<script>` i zatvori s `</script>` tagovima
5. Run everywhere: **Frontend**
6. Aktiviraj snippet

### 3️⃣ Testiraj formu

1. Otvori svoju WordPress stranicu
2. Kreni tipkati u "PICK UP" polje (npr. "Dubrovnik")
3. **Trebaju se prikazati suggestions** s ikonicama
4. Odaberi lokaciju iz dropdown-a
5. Popuni sve ostale podatke
6. Klikni **SEARCH**
7. **Trebalo bi te redirectati** na `/booking` stranicu s parametrima

### 4️⃣ Provjeri da React app čita URL parametre

Tvoja React `/booking` stranica već čita parametre iz URL-a preko `useSearchParams()`.

Kada WordPress forma submitta, URL će izgledati ovako:
```
https://dubrovnik-transfers.hr/booking?pickup=Dubrovnik+Airport&dropoff=Split+Airport&date=2025-11-18&people=2&transfer_type=oneway
```

### 5️⃣ Gotovo! 🎉

Forma sada:
- ✅ Ima autocomplete za lokacije
- ✅ Validira podatke
- ✅ Redirecta na tvoju React `/booking` stranicu
- ✅ Sve podatke prosljeđuje preko URL-a
- ✅ Prikazuje kartu i detalje transfera

---

## 🔧 Customizacija

### Promjena lokacija

Otvori `simple-booking-script.js` i uredi `locations` array:

```javascript
const locations = [
  { name: 'Tvoja Lokacija', city: 'Grad', icon: '📍' },
  // Dodaj više lokacija...
];
```

### Promjena boja

U `elementor-simple-booking-form.html` promijeni stilove:

```css
.submit-btn {
  background: #F6C344; /* Tvoja boja */
}

input:focus {
  border-color: #F6C344; /* Tvoja boja */
}
```

### Promjena redirect URL-a

U `elementor-simple-booking-form.html` promijeni:

```html
<form action="https://TVOJA-DOMENA.com/booking">
```

---

## ❓ Troubleshooting

### Autocomplete ne radi
- Provjeri da li je JavaScript učitan (F12 → Console → nema errora)
- Provjeri da li HTML form ima ID `simple-booking-form`
- Provjeri da li input polja imaju ID-eve `pickup` i `dropoff`

### Forma ne redirecta
- Provjeri `action` URL u HTML formi
- Provjeri da li React app radi na toj domeni
- Provjeri konzolu za JavaScript errore

### Suggestions se ne prikazuju
- Provjeri da li CSS stilovi su učitani
- Inspektiraj element i provjeri da li ima `suggestions-dropdown` klasu
- Provjeri da li suggestions dobivaju `active` klasu kada tipkaš

---

## 💡 Prednosti ovog rješenja

✅ **Nema backend koda** - samo frontend!  
✅ **Nema baze podataka** - sve preko URL-a  
✅ **Autocomplete radi odmah** - lista lokacija u JavaScript-u  
✅ **Jednostavno održavanje** - samo HTML, CSS i JS  
✅ **Brzo i pouzdano** - nema AJAX poziva, nema errora  
✅ **SEO friendly** - standardna HTML forma  

---

## 📞 Podrška

Ako nešto ne radi, provjeri:
1. Browser konzolu (F12) za JavaScript errore
2. Network tab za blocked requests
3. Da li je forma unutar Elementor HTML widget-a
4. Da li je JavaScript učitan u footer-u

