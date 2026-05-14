interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Nosey Palate <noreply@noseypalate.com>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to send email: ${res.statusText}`);
  }

  return res.json();
}
