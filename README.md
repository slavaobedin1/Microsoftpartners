# 🏢 MS Partners Manager

מנהל משווקים Microsoft — CMS Compucenter  
**Slava Obedin** · מרץ 2026

---

## 📁 מבנה הקבצים

```
├── index.html          ← נקודת כניסה
├── ResellersApp.jsx    ← כל לוגיקת האפליקציה (React)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service Worker (offline support)
├── icons/              ← אייקונים (72, 96, 128, 144, 152, 192, 384, 512 px)
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 🚀 הרצה מקומית

פשוט פתח `index.html` בדפדפן, **או** השתמש בשרת מקומי:

```bash
npx serve .
# או
python -m http.server 8080
```

---

## 🌐 פרסום ב-GitHub Pages

1. צור repo חדש ב-GitHub
2. העלה את כל הקבצים
3. Settings → Pages → Branch: `main` → `/root`
4. האפליקציה תהיה זמינה בכתובת:  
   `https://<username>.github.io/<repo-name>/`

---

## 📱 התקנה כ-PWA (אפליקציה)

- **Android**: Chrome → תפריט ⋮ → "הוסף למסך הבית"
- **iPhone/iPad**: Safari → שתף → "הוסף למסך הבית"
- **Desktop**: Chrome → סמל התקנה בשורת הכתובת

---

## ✨ יכולות

| טאב | תיאור |
|-----|-------|
| 👥 משווקים | רשימת ~80 משווקים, חיפוש, עריכה, אנשי קשר |
| 💰 מחירונים | Cloud Corp/Edu + Perpetual Corp/Edu, ייבוא CSV |
| 🧮 מחשבון 365 | חישוב מחיר ענן לפי משווק ומודל תשלום |
| 💿 Perpetual | מחשבון רישיונות עם הנחה מותאמת |
| 📊 צריכה | מעקב צריכה חודשי + השוואה |

---

## 💾 שמירת נתונים

כל הנתונים נשמרים **מקומית** ב-localStorage של הדפדפן.  
אין שרת, אין ענן, אין אימות — האפליקציה פועלת לחלוטין offline.
