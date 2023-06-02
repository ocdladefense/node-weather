export {Mailer};



class Mailer {

  async  WxMail(recipient, subject, body){
    let data = {
      recipient: recipient,
      subject: subject,
      body: body
    };
    if (this.emailUrl == null) {
      throw new Error("You have to configure EMAIL_URL in .env");
    }
    let response = await fetch(this.emailUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.text();
    console.log(result);
  }

  async sendWxMail(){
    let recipient = "mwpaulsen86@gmail.com";
    let subject = "This is the subject";
    let body = "this is the email body";

    await this.WxMail(recipient, subject, body);
  }

}

