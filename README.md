[Automizy Email Editor](http://emaileditor.automizy.com/) — Responsive and integrable email editor
==============================================================================================
Design mobile friendly HTML emails in your own application.

Easy usage
--------------------------------------
Automizy Email Editor (AEE) is an easy-to-use Javascript based email editor plugin, which makes it possible to create, save and send spectacular emails with a few clicks.

Try a demo on [http://emaileditor.automizy.com](http://emaileditor.automizy.com/)

User-friendly desing
--------------------------------------
The key to easy usage is always a clear-cut user interface. AEE provides all the necessary features from the basic settings to the smallest details in its UX-tested appearance.

Responsive email
--------------------------------------
Responsivity is one of the most important issues when it comes to html based email. Users expect their email to appear perfectly on any device using any browser or email client available. AEE solves this problem without any effort, all the edited emails are fully responsive.

Edit emails on your mobile device
--------------------------------------
As we mentioned before, responsivity is one of the main concerns. Not only the emails, but even the editor itself is fully responsive and mobile compatible. You are able to edit your emails using the drag&drop feature on the go.

Easy integration
--------------------------------------
Automizy Email Editor is open to the public, you can easily download and integrate it to your own web application, desing and use it just the way you want, writing only a single of code:
```
<!DOCTYPE html>
<html>
    <head>
        <link href="css/automizy-email-editor.css" />
        <script src="js/automizy-email-editor.js"></script>
        <script>
                $AEE.init().open();
        </script>
    </head>
    <body></body>
</html>
```
That's it. Your email editor is ready to go.

As a reference AEE is used in our marketing automation software called [Automizy](http://automizy.com), and our users love it!

Method chaining & dynamic modifying
--------------------------------------
Our editor's easy usage is not limited to user-level only, we didn't forget you, developers :)
Most of AEE's functions are well-documented and chainable, setting up and modifying AEE after it's ready won't cause any problem, the code is simple, and easy to read:
```
$AEE.baseDir('../automizy-email-editor').layoutReady(function(){
    console.log('LAYOUT READY!');
}).init().open();
```

You can check the full documentation of AEE here: [http://developers.automizy.com/emaileditor/](http://developers.automizy.com/emaileditor/)

In case you are interested in our other projects too, check [http://developers.automizy.com/](http://developers.automizy.com/) 

Questions?
----------
If you have any questions, please feel free to contact us at [help@automizy.com](mailto:help@automizy.com).
