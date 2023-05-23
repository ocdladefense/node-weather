async function wxMail(recipient, subject, body){
    let data = {
      recipient: recipient,
      subject: subject,
      body: body
    };
    let response = await fetch('/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.text();
    console.log(result);
  }

  export default wxMail;