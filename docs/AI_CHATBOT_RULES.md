# AI Chatbot Rules Library
# AI客服规则库

## 规则说明
本文件定义AI客服的知识库规则，用于自动回复常见问题。

---

## 1. 签证规则 (VISA)

**触发关键词**: visa, 签证, 144, 免签, visa-free, transit

**回复内容**:
```
🌍 144-Hour Visa-Free Transit Policy / 144小时过境免签政策

✅ Eligibility / 适用条件:
• Hold valid international travel documents
• From 53 visa-free countries (US/UK/Canada/Australia/Germany/France, etc.)
• Have onward ticket departing within 144 hours
• Enter through designated ports

📍 Applicable Areas / 适用城市:
• Beijing-Tianjin-Hebei region
• Yangtze River Delta (Shanghai, Jiangsu, Zhejiang)
• Pearl River Delta (Guangzhou, Shenzhen, etc.)
• Other: Chengdu, Xiamen, Xi'an, Kunming

⏰ Time Calculation / 时间计算:
144 hours (6 days) from midnight after entry

💡 Tip: Perfect for short trips! Visit the Great Wall, Forbidden City, or enjoy Shanghai's skyline without visa hassle.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 2. 酒店设施规则 (FACILITIES)

**触发关键词**: elevator, lift, 楼梯, toilet, bathroom, 厕所, shower, wifi, 设施, breakfast, 早餐, facility, amenities, internet, network, 网络

**回复内容**:
```
🏨 Hotel Facilities / 酒店设施

📶 Internet / 网络:
✅ Free WiFi throughout the hotel
✅ No password needed for lobby access
✅ Stable connection in all rooms

🍽️ Breakfast / 早餐:
✅ Included (Chinese & Western buffet)
⏰ Hours: 06:30 - 10:00
📍 Location: Hotel restaurant (usually 2F)

🛏️ Room Facilities / 客房设施:
✅ A/C & Heating
✅ 24-hour hot water
✅ Hair dryer & electric kettle
✅ Toiletries & slippers
✅ In-room safe

📋 Other Services / 其他服务:
✅ 24-hour front desk
✅ Luggage storage
✅ Laundry service (fee applies)

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 3. 预订流程规则 (BOOKING)

**触发关键词**: book, 预订, 订房, check, 入住, reservation, availability, room, 房间

**回复内容**:
```
📋 Booking Information / 预订须知

📝 How to Book / 如何预订:
1. Select your dates and room type
2. Click "Book Now" to check availability
3. Complete guest information
4. Choose payment method (Demo mode)

✅ What's Included / 费用包含:
• Room accommodation
• Breakfast (if specified)
• Free WiFi
• Local taxes

⚠️ Important Notes / 重要提示:
• Passport required at check-in
• Check-in: Usually after 14:00
• Check-out: Usually before 12:00
• Early check-in subject to availability

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 4. 价格支付规则 (PRICING)

**触发关键词**: price, cost, 多少钱, 价格, payment, 支付, fee, 费用, money, charge, refund, 退款

**回复内容**:
```
💰 Pricing & Payment / 价格与支付

💳 Payment Methods / 支付方式:
✅ International credit cards (VISA/Mastercard)
✅ PayPal
✅ Alipay (for Chinese users)
✅ WeChat Pay

💵 Price Breakdown / 价格构成:
• Room rate (per night)
• Cleaning fee (if applicable)
• Service fee (platform fee)
• Local taxes

⚠️ Demo Mode Notice:
Currently in demonstration mode. No actual payment will be processed. For real booking, you'll be redirected to Booking.com or Airbnb.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 5. 取消政策规则 (CANCELLATION)

**触发关键词**: cancel, refund, 取消, 退款, policy, 政策, change, 改期, modify, 修改

**回复内容**:
```
📋 Cancellation Policy / 取消政策

🕐 Free Cancellation / 免费取消:
• 24+ hours before check-in → Full refund
• Within 24 hours → First night charged

💰 Refund Process / 退款流程:
• Refund to original payment method
• Processing time: 3-10 business days
• No refund for no-shows

⚠️ Non-Refundable Bookings:
Some special rates may be non-refundable. This will be clearly marked during booking.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 6. 外宾接待规则 (FOREIGNER)

**触发关键词**: foreigner, 外宾, 外国人, passport, foreign, 护照, international, 国际

**回复内容**:
```
✅ Foreign Guest Information / 外宾接待

📋 Requirements / 入住要求:
• Valid passport required
• Visa or visa-free entry proof
• Registration completed within 24 hours

🗣️ Language Support / 语言支持:
• Basic English at front desk
• AI translation available
• English signage in common areas

💳 Payment / 支付:
• International credit cards accepted
• Cash (RMB) accepted
• Foreign currency exchange nearby

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 7. 人工客服规则 (HUMAN)

**触发关键词**: human, agent, 人工, 客服, support, help, contact, 联系, phone, 电话

**回复内容**:
```
👤 Transferring to Human Agent / 转接人工客服

Your request has been forwarded to our support team.

⏰ Response Time / 响应时间:
• Live chat: Usually within 5 minutes
• Email: Within 24 hours

📧 Contact / 联系方式:
• Email: support@tiaohai.global
• WeChat: tiaohai_support

⚠️ Note: This is a Beta version. Human agents are available during business hours (9:00-18:00 CST).
```

---

## 8. 默认回复规则 (DEFAULT)

**触发条件**: 无匹配关键词

**回复内容**:
```
👋 Thanks for your message!

I'm Tiaohai AI Assistant (Beta version). I can help you with:

• 🌍 144-hour visa-free transit policy
• 🏨 Hotel facilities & amenities  
• 📋 Booking procedures
• 💰 Pricing & payment questions
• 📋 Cancellation policies
• ✅ Foreign guest requirements

Please select a quick question below or type your question directly.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.
```

---

## 规则加载说明

规则文件路径: `/docs/AI_CHATBOT_RULES.md`

前端组件通过解析此文件获取规则内容，实现动态回复。

规则匹配优先级:
1. 精确关键词匹配
2. 正则表达式匹配
3. 默认回复

更新时间: 2026-03-17
版本: v1.0
