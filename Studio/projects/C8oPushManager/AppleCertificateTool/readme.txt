You need to install openssl to run the tools.
This tool will create the .P12 file required to connect to the apple's apns server

use createSignRequest <your name> to create a valid .certSigningRequest file you will use to request a certificate to apple using the

	https://developer.apple.com/account/ios/certificate/certificateList.action web site.

Be sure to request a "Apple Push Notification service SSL (Sandbox)" type of certificate
the certificate will downloaded from apple's web site in the form of :

	aps_developpment.cer

Then, use createSSLKey <your name> to create a valid .p12 ssl key



