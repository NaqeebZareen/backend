module.exports = (securityCode) => {
    return `
<!doctype html>
<html>

<head>
    <title>Email Templete</title>
    <meta charset="utf-8">
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
    <style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        a {
            text-decoration: none !important;
        }

        /* iOS BLUE LINKS */

        .mimeStatusWarning {
            background-color: #ffffff !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width: 600px) {
            .img-max {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
            }

            .max-width {
                max-width: 100% !important;
            }

            .mobile-wrapper {
                width: 85% !important;
                max-width: 85% !important;
            }

            .mobile-padding {
                padding-left: 5% !important;
                padding-right: 5% !important;
            }

            .full-width {
                width: 100% !important;
            }

            table th {
                width: 100% !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }

         td img {
            width: 120px !important;
            height: 120px !important;
        }

        center img {
            width: 88px !important;
            height: 88px !important;
        }

        @media only screen and (max-width: 1200px) {

            th {
                width: 85% !important;
            }

            td span {
                font-size: 20px !important;
                font-weight: bold !important;
            }

            font {
                font-size: 12px !important;
                line-height: 15px !important;
            }

             td font {
                padding-left: 10px !important;
            }


            #down {
                padding-top: 10px !important;
            }

            #bottom {
                margin-bottom: 20px !important;
                font-size: 9px !important;
            }

            #space {
                margin-top: 30px !important;
            }

            center {
                background: #F7F7F7;
            }

            tbody {
                display: table;
                width: 100%;
            }

            table {
                text-align: center;
            }


            center img {
                width: 70px !important;
                height: 70px !important;
            }

            td img {
                text-align: center !important;
            }

             table,
            th,
             td,
            tr {
                display: inherit;
                width: 100% !important;
            }

             th {
                width: 100% !important;
            }

             td {
                width: 100% !important;
                margin: 0px !important;
            }
        }
    </style>
</head>

<body style="margin: 0 !important; padding: 0; background-color: #F7F7F7;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" valign="top" width="100%" style="padding: 0 0 0 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" class="full-width"
                    bgcolor="ffffff">
                    <tr>
                        <td style="background: #F7F7F7;">
                            <center style="line-height:1.5; font-family: sans-serif; color:
      #000; margin: 13px 0px 10px 0px; ">
                                <img alt="My Image" src="https://i.ibb.co/xDRxL7C/logo.png" width="88px">
                            </center>
                        </td>
                    </tr>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" class="full-width"
                        style="background: #FFFFFF; box-shadow: 0px 4px 20px
      rgba(0, 0, 0, 0.07);">
                        <tr>
                            <td>
                        <tr>
                            <td style="">
                                <table width="100%" style="margin-top: 40px">
                                    <tr align="center" style="width: 100%">
                                        <td style="text-align: center;">
                                            <img alt="My Image" src="https://i.ibb.co/TDQBBzD/email-verification-01.png"
                                                width="120px">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding-top: 10px; padding-bottom: 25px;">
                            </td>
                        </tr>
                        <tr id="space">
                            <td style="margin: 10px;">
                                <table width="100%">
                                    <tr align="center" style="width: 100%">
                                        <td style="width: 100%;text-align: center;">
                                            
                                            <span
                                                style="padding-left: 10px; font-family: Roboto;font-style: normal;font-weight: semi-bold;font-size: 32px;line-height: 42px;letter-spacing: 0.04em; color: #000000;">
                                                
                                                Verify your email
                                            </span>
                                            
                                        </td>
                                    </tr>
                                </table>
                                <br>
                                <table width="100%">
                                    <tr align="center" style="width: 100%">
                                        <th style="width: 100%; padding-left: 10px; padding-right: 10px;">
                                            <font id="font"
                                                style=" font-family: Roboto;font-style: normal;font-weight: normal ;font-size: 18px; word-wrap:break-word;line-height: 28px;letter-spacing: 0.04em; color: rgba(0, 0, 0, 0.5); ">
                                                Please enter the following code to verify your
                                                email.
                                            </font>
                                        </th>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td style="padding-top: 15px; padding-bottom: 20px;">
                            </td>
                        </tr>
                        <tr id="space">
                            <td align="center">
                                <span
                                    style="padding: 10px 79px 10px 79px; font-family: Roboto; letter-spacing: 0.3em;font-size: 40px; font-weight: 500; color: #27AE60; width: 289px; height: 75px;background: #FBFBFB;border: 1.5px solid #27AE60;box-shadow: 0px 4px 4px rgba(39, 174, 96, 0.1);border-radius: 3px;">
                                    ${securityCode}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 50px !important;">
                            </td>
                        </tr>
                        
                        <tr id="space" style="background: #FFFFFF">
                            <td align="center" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; padding-top: 10px;
      font-size: 12px">
                                <table>

                                    <tr align="center" id="bottom">
                                        <td
                                            style="color: rgba(0, 0, 0, 0.5); line-height: 2; padding-bottom: 30px;text-align: center;">
                                            1 Sansome Street, 35th Floor San Francisco, CA 94104 United States
                                            <br>
                                            
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
            </td>
        </tr>
    </table>
    </table>
    </td>
    </tr>
    </table>
</body>

</html>
    `;
}