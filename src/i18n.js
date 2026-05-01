import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "login": "Login",
      "signup": "Sign Up",
      "shop_now": "Shop Now",
      "new_arrivals": "New Arrivals",
      "cart": "Cart",
      "hero_title": "Level Up Your Style.",
      "hero_subtitle": "Discover the futuristic collection of V3 Clothes. Premium fabrics, cyberpunk aesthetics, and unmatched comfort.",
      "footer_desc": "The ultimate destination for next-gen fashion. Elevate your style with our premium cyberpunk and futuristic collections.",
      "about_title": "About V3 Clothes",
      "about_desc": "Welcome to V3 Clothes – where cyber aesthetics meet everyday streetwear. We started with a vision to revolutionize the way you express yourself. Based in Ratnapura, Sri Lanka, we provide high-quality fashion that pushes the boundaries of design. Whether it's a glowing LED hoodie or a sleek custom-made T-shirt, we have exactly what you need to upgrade your wardrobe. Join the digital revolution."
    }
  },
  si: {
    translation: {
      "home": "මුල් පිටුව",
      "login": "ලොග් වන්න",
      "signup": "ලියාපදිංචි වන්න",
      "shop_now": "දැන් මිලදී ගන්න",
      "new_arrivals": "අලුත්ම ඇඳුම්",
      "cart": "කරත්තය",
      "hero_title": "ඔබේ විලාසිතාව අලුත් කරගන්න.",
      "hero_subtitle": "V3 Clothes හි නවීන ඇඳුම් එකතුව සොයාගන්න. උසස් තත්වයේ රෙදිපිළි සහ අසමසම පහසුවක් අත්විඳින්න.",
      "footer_desc": "නවීනතම විලාසිතාවන් සඳහා හොඳම තැන. අපගේ ප්‍රිමියම් ඇඳුම් එකතුවෙන් ඔබේ විලාසිතාවන් ඔප්නංවා ගන්න.",
      "about_title": "V3 Clothes ගැන",
      "about_desc": "V3 Clothes වෙත සාදරයෙන් පිළිගනිමු – Cyberpunk අලංකාරය එදිනෙදා වීදි විලාසිතා සමඟ මුසු වන තැන. රත්නපුරයේ සිට ක්‍රියාත්මක වන අප, ඔබේම විලාසිතාවක් ලෝකයට පෙන්වීමට මඟ පෙන්වන්නෙමු. ඔබට අවශ්‍ය LED Hoodie එකක් හෝ ඔබටම ආවේණික Custom T-Shirt එකක් වේවා, ඔබගේ අවශ්‍යතාවයට සරිලන උසස්ම තත්ත්වයේ ඇඳුම් අප සතුව ඇත. අපගේ ඩිජිටල් විප්ලවය වෙත ඔබත් අදම එක්වන්න."
    }
  },
  ta: {
    translation: {
      "home": "முகப்பு",
      "login": "உள்நுழைக",
      "signup": "பதிவு செய்க",
      "shop_now": "தேடுங்கள்",
      "new_arrivals": "புதிய ஆடைகள்",
      "cart": "வண்டி",
      "hero_title": "உங்கள் ஸ்டைலை மேம்படுத்துங்கள்.",
      "hero_subtitle": "V3 Clothes இன் நவீன ஆடை தொகுப்பை கண்டறியுங்கள். சிறந்த தரமான துணிகள் மற்றும் இணையற்ற ஆறுதல்.",
      "footer_desc": "நவீன ஃபேஷனுக்கான இறுதி இலக்கு. எங்கள் பிரீமியம் தொகுப்புகளுடன் உங்கள் ஸ்டைலை உயர்த்துவோம்.",
      "about_title": "V3 Clothes பற்றி",
      "about_desc": "V3 Clothes-க்கு உங்களை வரவேற்கிறோம். உங்களை வெளிப்படுத்தும் விதத்தை மேம்படுத்தும் நோக்குடன் இரத்தினபுரியில் இருந்து தரமான ஆடைகளை வழங்குகிறோம். LED Hoodie அல்லது பிரத்தியேகமான Custom T-Shirt என உங்கள் ஆடைத்தேவைகள் அனைத்தையும் நாங்கள் பூர்த்தி செய்கிறோம். எங்கள் டிஜிட்டல் புரட்சியில் நீங்களும் இணையுங்கள்."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
