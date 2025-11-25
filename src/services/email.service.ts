import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_Key);

const FROM_EMAIL = "Admin <no-reply@resend.dev>";

export const sendApplicationStatusEmail = async (params: {
  to: string;
  name: string;
  jobTitle: string;
  status: string;
}) => {
  const { to, name, jobTitle, status } = params;
  //   console.log("[EMAIL] Preparing to send status email to:", to);

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Your application status was updated",
      html: `
            <p>Hi ${name || "there"},</p>
            <p>Your application for <strong>${jobTitle}</strong> has been updated.</p>
            <p>New status: <strong>${status}</strong></p>
            <p>Thank you for using our platform.</p>
            `,
    });
    // console.log("[EMAIL] Resend success:", result);
  } catch (error) {
    console.error("Failed to send application status email", error);
  }
};
