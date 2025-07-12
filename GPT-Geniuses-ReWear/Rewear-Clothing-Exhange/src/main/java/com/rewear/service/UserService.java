package com.rewear.service;


import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.util.Properties;
import java.util.Random;
@Service
public class UserService {

    public static String generateotp()
    {
        Random ran = new Random();
        int otp=0;
        for(int i=0;i<4;i++)
        {
            otp=otp*10;
            otp=otp+ran.nextInt(10);
        }

        return String.format("%s",otp);
    }

    public static void sendOTP(String email,String otp)
    {
        String message= "Your otp for File Concealer is ";
        String subject="ONE TIME PASSWORD";
        String from = "parthkhatke@gmail.com";

        String host="smtp.gmail.com";
        //get system properties
        Properties properties = System.getProperties();
        //set host
        properties.put("mail.smtp.host",host);
        properties.put("mail.smtp.port","465");
        properties.put("mail.smtp.ssl.enable","true");
        properties.put("mail.smtp.auth","true");

        // to get session object
        Session sessionObj= Session.getInstance(properties, new Authenticator()
        {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from,"ofsa oqcf bjpi amqg");
            }
        });
//        sessionObj.setDebug(true);
        //to create and compose the message
        try {
            MimeMessage mimemessage =new MimeMessage(sessionObj);
            //to set from which email to send
            mimemessage.setFrom(new InternetAddress(from));
            // add where to send  email
            mimemessage.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            //add subject to the mail
            mimemessage.setSubject(subject);
            // adding main message body
            mimemessage.setText(message+otp);
            // now sending the whole minemmessage through transport class
            Transport.send(mimemessage);
            System.out.println("OTP send successfully");

        } catch (MessagingException e) {

            e.printStackTrace();
        }

    }
}
