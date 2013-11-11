Ubuntu upstart setup script for XMPP-FTW
========================================

* copy this script to ```/etc/init``` (not /etc/init.d)
* run ```initctl reload-configuration```
* run ```start xmpp-ftw```
* check logs ```tail -F /var/log/upstart/xmpp-ftw.log```
