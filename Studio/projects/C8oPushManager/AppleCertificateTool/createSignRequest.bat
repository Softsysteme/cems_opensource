' ---------------------------------------CreateSignrequest---------------------------------------------------------
' Be sure to have openssl installed and the openssl/bin directory in your path
'
' This command file will create a signrequest (CSR) you will have to submit to Apple's 
' Provisioning portal  (https://developer.apple.com/account/ios)
' 
' usage : createSignRequest <name>
' The <name>.certSigningRequest file will be created in the same directory. Sumbit it to Apple's
' Portal, generate the certificate and download it to the same directory
' The downloaded certificate must named 'aps_development.cer' 
' -----------------------------------------------------------------------------------------------------------------
@echo off
call ..\bin\openssl genrsa -out %1.key 2048
call ..\bin\openssl req -new -key %1.key -out %1.certSigningRequest -subj "/emailAddress=info@convertigo.com, CN=Convertigo, C=FR"
echo Use http://apple.developper.com" to submit %1.certSigningRequest,  then download the certificate (.CER)

