import emailjs from "@emailjs/browser";

export default async function sendMail(messageBody) {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  try {
    return emailjs.send(serviceId, templateId, messageBody, publicKey);
  } catch (error) {
    console.log(`error from sendEmail: \n${error}`);
    throw error;
  }
}
