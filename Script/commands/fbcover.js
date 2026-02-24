const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "fbcover",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Gemini AI",
  description: "প্রফেশনাল ফেসবুক কভার ফটো মেকার",
  usePrefix: true,
  commandCategory: "Edit",
  usages: "v1/v2 - নাম - টাইটেল - ঠিকানা - মেইল - ফোন - কালার",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID, type, messageReply } = event;

  // ইউজার ইনপুট চেক
  if (!args[0]) {
    return api.sendMessage(
      `❌ ভুল ফরম্যাট!\n\nসঠিক নিয়ম:\nfbcover v1 - Dipto - Designer - Dhaka - dipto@mail.com - 017xx - white\n\n(সবগুলোর মাঝে একটি করে '-' হাইফেন দাও)`,
      threadID,
      messageID
    );
  }

  // ডাটা প্রসেসিং
  const content = args.join(" ").split("-").map(item => item.trim());
  const v = content[0] || "v1";
  const name = content[1] || "No Name";
  const subname = content[2] || "Designer";
  const address = content[3] || "Bangladesh";
  const email = content[4] || "info@mail.com";
  const phone = content[5] || "017XXXXXXXX";
  const color = content[6] || "white";

  // আইডি সেট করা (রিপ্লাই দিলে তার আইডি, না দিলে নিজের আইডি)
  let id = type === "message_reply" ? messageReply.senderID : Object.keys(event.mentions)[0] || senderID;
  const senderName = await Users.getNameUser(senderID);

  api.sendMessage(`⏳ একটু অপেক্ষা করো ${senderName}, তোমার কভার ফটো তৈরি হচ্ছে...`, threadID, (err, info) => {
    setTimeout(() => api.unsendMessage(info.messageID), 4000);
  }, messageID);

  try {
    // API URL - এখানে আমি তোর আগের API টাকেই ব্যবহার করেছি
    // যদি এই API কাজ না করে, তবে বুঝতে হবে সার্ভার ডাউন।
    const apiUrl = `https://dipto-api.onrender.com/cover/${v}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${id}`;

    const path = __dirname + `/cache/fbcover_${senderID}.png`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
    
    fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

    return api.sendMessage({
      body: `✅ কভার ফটো তৈরি সম্পন্ন!\n\n👤 নাম: ${name}\n🎨 ভার্সন: ${v}\n📫 ইমেইল: ${email}\n📍 ঠিকানা: ${address}`,
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);

  } catch (error) {
    console.error(error);
    return api.sendMessage(
      `⚠️ দুঃখিত! কভার ফটো তৈরি করা যায়নি।\nসম্ভবত API সার্ভারটি বর্তমানে অফলাইনে আছে। দয়া করে পরে আবার চেষ্টা করো।`,
      threadID,
      messageID
    );
  }
};
