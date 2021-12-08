const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  try {

    const { email } = req.body;
    const userPw = await User.findOne({ where: { email }, attributes: ["updatedAt", 'email'] });


    if (userPw) {
      const userPwObj = userPw.dataValues
      const token = jwt.sign(userPwObj, process.env.ACCESS_SECRET, { expiresIn: "1h" })

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.ACCOUNT_USER,
          pass: process.env.ACCOUNT_PASS,
        },
        from: process.env.ACCOUNT_USER
      });

      transporter.verify(function (error, success) {
        if (error) console.log(error);
        else {
          console.log('Server is ready to take our messages');
        }
      });

      const message = {
        from: process.env.ACCOUNT_USER, // sender address
        to: `${email}`, // list of receivers 
        subject: 'Shall We Helath 비밀번호 변경 인증메일 입니다🏋🏻‍♀️', // Subject line
        text: 'Shall We Helath 비밀번호 변경 인증메일 입니다', // plain text body
        html: `<table class="wrapper" style="border-collapse: collapse;table-layout: fixed;min-width: 320px;width: 100%;background-color: #fff;" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>
        <div role="banner">
          <div class="preheader" style="Margin: 0 auto;max-width: 560px;min-width: 280px; width: 280px;width: calc(28000% - 167440px);">
            <div style="border-collapse: collapse;display: table;width: 100%;">
            <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 280px" valign="top"><![endif]-->
              <div class="snippet" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 140px; width: 140px;width: calc(14000% - 78120px);padding: 10px 0 5px 0;color: #000;font-family: Avenir,sans-serif;">
                
              </div>
            <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->
              <div class="webversion" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 139px; width: 139px;width: calc(14100% - 78680px);padding: 10px 0 5px 0;text-align: right;color: #000;font-family: Avenir,sans-serif;">
                <p style="Margin-top: 0;Margin-bottom: 0;" emb-social="webversion">No images? <webversion style="text-decoration: underline;">Click here</webversion></p>
              </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </div>
          </div>
          <div class="header" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);" id="emb-email-header-container">
          <!--[if (mso)|(IE)]><table align="center" class="header" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 600px"><![endif]-->
            <div class="logo emb-logo-margin-box" style="font-size: 26px;line-height: 32px;Margin-top: 6px;Margin-bottom: 20px;color: #41637e;font-family: Avenir,sans-serif;Margin-left: 20px;Margin-right: 20px;" align="center">
              <div class="logo-center" align="center" id="emb-email-header"><img style="display: block;height: auto;width: 100%;border: 0;max-width: 215px;" src="https://i.imgur.com/0royLEy.jpg" alt="" width="215" /></div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
        <div>
        <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
            <div class="column" style="text-align: left;color: #000;font-size: 16px;line-height: 24px;font-family: Avenir,sans-serif;">
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;line-height: 40px;font-size: 1px;">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 1px;">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
          <div style="font-size: 12px;font-style: normal;font-weight: normal;line-height: 19px;" align="center">
            <img style="border: 0;display: block;height: auto;width: 100%;max-width: 545px;" alt="" width="545"  src="https://i.imgur.com/q7yARXX.png" />
          </div>
        </div>
          
            </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
      
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
      
        <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
            <div class="column" style="text-align: left;color: #000;font-size: 16px;line-height: 24px;font-family: Avenir,sans-serif;">
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;line-height: 40px;font-size: 1px;">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
          <p style="Margin-top: 0;Margin-bottom: 0;text-align: center;"><strong><em>Shall We Health&nbsp;</em></strong></p><p style="Margin-top: 20px;Margin-bottom: 0;text-align: center;"><strong><span style="color:#2200ff">&#48708;&#48128;&#48264;&#54840; &#48320;&#44221; &#47700;&#51068;&#51077;&#45768;&#45796;</span></strong></p><p style="Margin-top: 20px;Margin-bottom: 20px;text-align: center;">&#50500;&#47000; &#48260;&#53948;&#51012; &#45580;&#47084; &#48708;&#48128;&#48264;&#54840; &#48320;&#44221;&#51012;<strong>&nbsp;&#50756;&#47308;</strong>&#54644;&#51452;&#49464;&#50836;&nbsp;</p>
        </div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 1px;">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div class="btn btn--flat btn--large" style="text-align:center;">
          <![if !mso]><a style="border-radius: 0;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #395896;font-family: Avenir, sans-serif;"  href="http://localhost:3000/updatepw/${token}">&#48708;&#48128;&#48264;&#54840; &#48148;&#44984;&#47084; &#44032;&#44592; &#10143;</a><![endif]>
        <!--[if mso]><p style="line-height:0;margin:0;">&nbsp;</p><v:rect xmlns:v="urn:schemas-microsoft-com:vml" href="http://www.example.com" style="width:181px" fillcolor="#395896" stroke="f"><v:textbox style="mso-fit-shape-to-text:t" inset="0px,12px,0px,12px"><center style="font-size:14px;line-height:24px;color:#FFFFFF;font-family:Avenir,sans-serif;font-weight:bold;mso-line-height-rule:exactly;mso-text-raise:4px">&#48708;&#48128;&#48264;&#54840; &#48148;&#44984;&#47084; &#44032;&#44592; &#10143;</center></v:textbox></v:rect><![endif]--></div>
      </div>
          
            </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
      
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
      
        </div>
        <div role="contentinfo"><div style="line-height:0px;font-size:0px;" id="footer-top-spacing">&nbsp;</div><div class="layout email-flexible-footer email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;" dir="rtl" id="footer-content">
        <div class="layout__inner right-aligned-footer" style="border-collapse: collapse;display: table;width: 100%;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-email-footer"><![endif]-->
          <!--[if (mso)|(IE)]><td><table cellpadding="0" cellspacing="0"><![endif]-->
          <!--[if (mso)|(IE)]><td valign="top"><![endif]-->
            <div class="column" style="text-align: right;font-size: 12px;line-height: 19px;color: #000;font-family: Avenir,sans-serif;display: none;" dir="ltr">
        <div class="footer-logo emb-logo-margin-box" style="font-size: 26px;line-height: 32px;Margin-top: 6px;Margin-bottom: 20px;color: #7b663d;font-family: Roboto,Tahoma,sans-serif;" align="center">
          <div emb-flexible-footer-logo align="center"></div>
        </div>
      </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]><td valign="top" class="w60"><![endif]-->
            <div class="column" style="text-align: right;font-size: 12px;line-height: 19px;color: #000;font-family: Avenir,sans-serif;display: none;" dir="ltr">
        <div style="margin-left: 0;margin-right: 0;Margin-top: 10px;Margin-bottom: 10px;">
          <div class="footer__share-button">
            
            
            
            
          </div>
        </div>
      </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]><td valign="top" class="w260"><![endif]-->
            <table style="border-collapse: collapse;table-layout: fixed;display: inline-block;width: 600px;" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="column js-footer-additional-info" style="text-align: right;font-size: 12px;line-height: 19px;color: #000;font-family: Avenir,sans-serif;width: 600px;" dir="ltr">
        <div style="margin-left: 0;margin-right: 0;Margin-top: 10px;Margin-bottom: 10px;">
          
          
          
          <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 15px;">
            <unsubscribe style="text-decoration: underline;">Unsubscribe</unsubscribe>
          </div>
          <!--[if mso]>&nbsp;<![endif]-->
        </div>
      </div></td></tr></tbody></table>
          <!--[if (mso)|(IE)]></table></td><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </div>
      </div><div style="line-height:40px;font-size:40px;" id="footer-bottom-spacing">&nbsp;</div></div>
        
      </td></tr></tbody></table>
      <style type="text/css">
      @media (max-width:619px){.email-flexible-footer .left-aligned-footer .column,.email-flexible-footer .center-aligned-footer,.email-flexible-footer .right-aligned-footer .column{max-width:100% !important;text-align:center !important;width:100% !important}.flexible-footer-logo{margin-left:0px !important;margin-right:0px !important}.email-flexible-footer .left-aligned-footer .flexible-footer__share-button__container,.email-flexible-footer .center-aligned-footer .flexible-footer__share-button__container,.email-flexible-footer .right-aligned-footer .flexible-footer__share-button__container{display:inline-block;margin-left:5px !important;margin-right:5px !important}.email-flexible-footer__additionalinfo--center{text-align:center !important}.email-flexible-footer .left-aligned-footer table,.email-flexible-footer .center-aligned-footer table,.email-flexible-footer .right-aligned-footer 
      table{display:table !important;width:100% !important}.email-flexible-footer .footer__share-button,.email-flexible-footer .email-footer__additional-info{margin-left:20px;margin-right:20px}}
      </style>` };

      // send mail with defined transport object
      let send = await transporter.sendMail(message);
      console.log('send_pw')

      return res.status(201).end()
    } else {
      return res.status(400).json({
        data: null,
        error: {
          "path": "/users/email-verification",
          "message:": "Insufficient body data",
        }
      })
    }

  } catch (err) {
    throw err;
  }
};
