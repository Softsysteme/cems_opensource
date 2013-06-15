' ---------------------------------------Create .P12 key ---------------------------------------------------------
' Be sure to have openssl installed and the openssl/bin directory in your path
'
' This command file will create the .p12 certificate you will need to connect to Apple's APNS server
' usage : createSSLKey <name of the .p12 file without the .p12 extension>
' The .p12 file will be created in the same directory with a password set to 'convertigo'
' -----------------------------------------------------------------------------------------------------------------
@echo off
call openssl x509 -in aps_development.cer -inform DER -out aps_development.pem -outform PEM
call openssl pkcs12 -export -inkey %1.key -in aps_development.pem -out %1.p12 -passout pass:convertigo
echo Your %1.p12 has been created with a password set to 'convertigo'



