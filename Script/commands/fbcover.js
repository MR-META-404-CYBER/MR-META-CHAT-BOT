const axios = require("axios");

const getBaseUrl = async () => {
  try {
    const res = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
    return res.data.api;
  } catch (e) {
    // যদি উপরের লিঙ্ক কাজ না করে তবে সরাসরি এই লিঙ্কটা ট্রাই করবে
    return "https://dipto-api.onrender.com"; 
  }
};

module.exports.config = {
  name: "fbcover",
  version: "7.1",
  hasPermssion: 0,
  credits: "Dipto",
  description: "Facebook cover maker",
  usePrefix: true,
  commandCategory: "Cover",
  usages: "v1/v2 - name - subname - address - email - phone - color",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID, type, messageReply } = event;
  
  // ইনপুট চেক
  if (args.length === 0) {
    return api.sendMessage(`❌ সঠিক ফরম্যাট ব্যবহার করো!\n\nউদাহরণ:\nfbcover v1 - Dipto - Designer - Dhaka - dipto@mail.com - 017xx - white`, threadID, messageID);
  }

  const content = args.join(" ").split("-").map(item => item.trim());
  const v = content[0] || "v1";
  const name = content[1] || "None";
  const subname = content[2] || "None";
  const address = content[3] || "None";
  const email = content[4] || "None";
  const phone = content[5] || "None";
  const color = content[6] || "white";

  const id = type === "message_reply" ? messageReply.senderID : Object.keys(event.mentions)[0] || senderID;
  const nameUser = await Users.getNameUser(id);

  api.sendMessage("⌛ একটু দাঁড়াও জানু, তোমার কভারটা তৈরি করছি...", threadID, (err, info) => {
    setTimeout(() => api.unsendMessage(info.messageID), 3000);
  }, messageID);

  try {
    const base = await getBaseUrl();
    // ফাইনাল ইমেজ লিঙ্ক
    const imageUrl = `${base}/cover/${v}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${id}`;

    const response = await axios.get(imageUrl, { responseType: "stream" });

    return api.sendMessage({
      body: `✅ কভার তৈরি হয়েছে!\n\n👤 নাম: ${name
      threadID,
      messageID
    );
  }

  // ডাটা স্প্লিট করা
  const info = input.split("-").map(item => item.trim());
  const v = info[0] || "v1";
  const name = info[1] || "No Name";
  const subname = info[2] || "No Subname";
  const address = info[3] || "No Address";
  const email = info[4] || "No Email";
  const phone = info[5] || "No Phone";
  const color = info[6] || "white";

  api.sendMessage(`⏳ একটু অপেক্ষা করো জানু, তোমার কভার ফটো বানাচ্ছি... 😘`, threadID, (err, info) => {
    setTimeout(() => api.unsendMessage(info.messageID), 4000);
  });

  try {
    const baseUrl = await baseApiUrl();
    const imgUrl = `${baseUrl}/cover/${v}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${id}`;

    const response = await axios.get(imgUrl, { responseType: "stream" });

    return api.sendMessage({
      body: `✿━━━━━━━━━━━━━━━━━━━━━✿\n🔰 𝗙𝗕 𝗖𝗢𝗩𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 🔰\n✿━━━━━━━━━━━━━━━━━━━━━✿\n👤 𝗡𝗔𝗠𝗘: ${name}\n✨ 𝗦𝗨𝗕𝗡𝗔𝗠𝗘: ${subname}\n📍 𝗔𝗗𝗗𝗥𝗘𝗦𝗦: ${address}\n📧 𝗠𝗔𝗜𝗟: ${email}\n📞 𝗣𝗛𝗢𝗡𝗘: ${phone}\n🎨 𝗖𝗢𝗟𝗢𝗥: ${color}\n🔗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: ${v}\n👤 𝗥𝗘QUEST BY: ${userName}\n✿━━━━━━━━━━━━━━━━━━━━━✿`,
      attachment: response.data
    }, threadID, messageID);

  } catch (error) {
    console.error
    );
  } else {
    const msg = dipto.split("-");
    const v = msg[0].trim() || "v1";
    const name = msg[1].trim() || " ";
    const subname = msg[2].trim() || " ";
    const address = msg[3].trim() || " ";
    const email = msg[4].trim() || " ";
    const phone = msg[5].trim() || " ";
    const color = msg[6].trim() || "white";
    api.sendMessage(
      `Processing your cover,Wait koro baby < 😘`,
      event.threadID,
      (err, info) =>
        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, 4000),
    );
    const img = `${await baseApiUrl()}/cover/${v}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${id}`;

    try {
      const response = await axios.get(img, { responseType: "stream" });
      const attachment = response.data;
      api.sendMessage(
        {
          body: `✿━━━━━━━━━━━━━━━━━━━━━━━━━━━✿\n🔵𝗙𝗜𝗥𝗦𝗧 𝗡𝗔𝗠𝗘: ${name}\n⚫𝗦𝗘𝗖𝗢𝗡𝗗 𝗡𝗔𝗠𝗘:${subname}\n⚪𝗔𝗗𝗗𝗥𝗘𝗦𝗦: ${address}\n📫𝗠𝗔𝗜𝗟: ${email}\n☎️𝗣𝗛𝗢𝗡𝗘 𝗡𝗢.: ${phone}\n☢️𝗖𝗢𝗟𝗢𝗥: ${color}\n💁𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘: ${nam}\n✅𝗩𝗲𝗿𝘀𝗶𝗼𝗻 : ${v}\n✿━━━━━━━━━━━━━━━━━━━━━━━━━━━✿`,
          attachment,
        },
        event.threadID,
        event.messageID,
      );
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "An error occurred while generating the FB cover.",
        event.threadID,
      );
    }
  }
};
