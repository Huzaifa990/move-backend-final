const forgotPassTemplate = ({ name, token, email }) => {
  return `<!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta name="x-apple-disable-message-reformatting" />

    <title></title>
    <link
      href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700"
      rel="stylesheet"
    />
    <style>
      html,
      body {
        margin: 0 auto;
        padding: 0;
        height: 100vh;
        width: 100%;
        background: #ebe8e2;
        font-family: "Poppins", sans-serif;
      }

      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        text-decoration: none;
      }
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      *[x-apple-data-detectors],
      .unstyle-auto-detected-links *,
      .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      .im {
        color: inherit !important;
      }

      img.g-img + div {
        display: none !important;
      }
      .heading1 {
        font-size: 29px;
        font-weight: 400;
        color: #424b49;
      }
      .spanClass {
        font-weight: 600;
        font-size: 29px;

        color: #424b49;
      }
      .imgLogo {
        width: 310px;
      }
      .img1 {
        height: 40px;
        width: 40px;
        margin-right: 15px;
      }
      .footerP {
        font-size: 16px;
        color: #424b49;
        font-weight: 400;
      }
      .middleBg {
        background-color: #ffffff;
        border-radius: 7px;
        padding: 40px 20px;
        margin: 0px 30px;
      }
      .imgDiv {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .innerImg {
        width: 140px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .centerTopText {
        color: #252525;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        margin-top: 20px;
      }
      .welcomeSpan {
        color: #b19e85;
        font-size: 18px;
        font-weight: 600;
      }
      .borderDiv {
        border-bottom: 1px solid #e6e6ea;
        max-width: 300px;
        margin: 20px auto;
      }
      .textClass {
        color: #252525;
        font-size: 18px;
        font-weight: 400;
        margin-top: 20px;
      }
      .aTag {
        color: #252525;
        font-weight: 600;
      }
      .aTagBlue {
          color: #024cba;
          font-weight: 600;
        }
        .aTagBlue:hover {
            text-decoration: underline;
        }
    </style>
  </head>
  <body width="100%" style="mso-line-height-rule: exactly; padding: 30px 20px">
    <div style="max-width: 800px; margin: 0 auto; width: 100%; background: #ebe8e2">
      <!-- BEGIN BODY -->
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        height="100vh"
        style="margin: auto"
      >
        <tr>
          <td valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: center">
                  <a href="https://www.yehaww.com" style="display: inline-flex"
                    ><img
                      src="https://github.com/muhammadSprintx/assets/blob/main/logo.png?raw=true"
                      class="imgLogo"
                  /></a>
                  <h1 class="heading1">
                    Dear
                    <span class="spanClass">${name}</span>
                  </h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- center tr -->
        <tr>
          <td valign="middle" style="padding-top: 30px">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <div class="middleBg">
                    <div class="imgDiv">
                      <img
                        src="https://github.com/muhammadSprintx/assets/blob/main/monitor.png?raw=true"
                        alt=""
                        class="innerImg"
                      />
                    </div>
                    <p class="centerTopText">
                      Welcome to your account at
                      <a href="https://www.yehaww.com/" target="_blank">
                        <span class="welcomeSpan">Yehaww.com </span>
                      </a>
                    </p>
                    <div class="borderDiv"></div>
                    <p class="textClass">Hi ${name}</p>
                    <p class="textClass">We have received a request to reset your password.</p>
                    <a href="https://beta.yehaww.com/login?reset=true&email=${email}&token=${token}" class="textClass aTagBlue">Click Here To Reset Your Password.</p>
                    <p class="textClass">
                      <a href="https://www.yehaww.com" class="aTag" target="_blank">Log in</a>
                      here
                    </p>
                    <p class="textClass">
                      Please note: You can change your password within 'My Profile' at any time.
                    </p>
                    <p class="textClass">
                      If any questions do not hesitate to contact us at:
                      <a href="https://info@yehaww.com" class="aTag">info@yehaww.com</a>
                    </p>
                    <p class="textClass">Best Regards</p>
                    <p class="textClass">
                      Yehaww Team
                      <a href="https://www.yehaww.com/" class="aTag" target="_blank"
                        >www.yehaww.com</a
                      >
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- end tr -->
        <tr>
          <td valign="top" style="padding-top: 30px">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="text-align: center">
                  <a href="https://www.facebook.com/profile.php?id=100083581836008" target="_blank">
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/fb-y.png?raw=true"
                      class="img1"
                    />
                  </a>
                  <a href="https://www.instagram.com/yehaww_com/" target="_blank">
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/insta-y.png?raw=true"
                      class="img1"
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/yehaww/" target="_blank">
                    <img
                      src="https://github.com/muhammadSprintx/assets/blob/main/linked-in-y.png?raw=true"
                      class="img1"
                      style="margin-right: 0px"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="text-align: center; padding: 30px 0px">

                  <p class="footerP">Yehaww LLC</p>
                     <p class="footerP">
                    <a href="mailto:info@yehaww.com" target="_blank">
                      info@yehaww.com
                      </a> 
                      | 
                     <a href="https://www.yehaww.com/" target="_blank">
                        yehaww.com
                      </a>
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
};

module.exports = { forgotPassTemplate };
