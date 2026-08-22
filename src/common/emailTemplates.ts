interface ProfessionalEmailTemplateData {
  senderEmail: string;
  message: string;
  senderName:string;
  dateTime:Date&TimeRanges;
}

export function getProfessionalEmailTemplate({
  senderEmail,
  message,
  senderName,
  dateTime,
}: ProfessionalEmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Contact Message</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        ">

          <div style="
            background-color: #222222;
            color: #ffffff;
            padding: 25px;
            text-align: center;
          ">
            <h1 style="margin: 0;">
              New Portfolio Message
            </h1>
          </div>

          <div style="padding: 30px;">

            <p style="font-size: 16px;">
              You have received a new message through your portfolio website.
            </p>

            <div style="
              margin-top: 20px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 6px;
            ">
              <strong>Sender Email:</strong>
              <p style="margin-top: 8px;">
                ${senderEmail}
                ${dateTime}
              </p>
            </div>
            <div> <p style="margin-top: 8px;">
                
                ${dateTime}
              </p></div>

            <div style="
              margin-top: 20px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 6px;
            ">




            <div style="
              margin-top: 20px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 6px;
            ">
              <strong>Sender Name:</strong>
              <p style="margin-top: 8px;">
                ${senderName}
              </p>
            </div>

            <div style="
              margin-top: 20px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 6px;
            ">

              <strong>Message:</strong>
              <p style="
                margin-top: 8px;
                line-height: 1.6;
                white-space: pre-wrap;
              ">
                ${message}
              </p>
            </div>

          </div>

          <div style="
            padding: 20px;
            text-align: center;
            background-color: #eeeeee;
            color: #666666;
            font-size: 13px;
          ">
            This email was sent from your portfolio contact form.
          </div>

        </div>

      </body>
    </html>
  `;
}