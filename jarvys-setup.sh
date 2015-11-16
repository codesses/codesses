
#!/bin/sh

_programs="curl tar rsync ssh-keygen"
for program in ${_programs}
do
 command -v ${program} > /dev/null 2>&1
 if [ $? -gt 0 ] ; then
  echo "${program} is missing and required to continue - please install it or make sure it's in your path"
  exit 1
 fi
done

# Some distros *COUGH* DEBIAN *COUGH* link to dash, which doesn't use $EUID/$UID, so use this instead
id=`id -u`

if [ $id -gt 0 ]; then
 echo "This script must be run as root" 1>&2
 exit 1
fi

if [ -e "/var/jarvys" ]; then
 echo "It looks like JARVYS is already installed on your system. If this is an error, remove the /var/jarvys directory"
 exit 1
fi

curl --silent https://v1.jarvys.io/latest.tar | tar -x -C /var

cat << EOF > /var/jarvys/etc/setup_key
3cU7Or0p3f33YmBxShjp3fvOGVULX1g8ZFXNcmRVU9QW5VgKYLWLLU1jK9ZWVSjVXcxDSx8yc8TGppJbpm9HmmgldkUgprpjxoC6
EOF

chown root:root /var/jarvys /var/jarvys/bin /var/jarvys/etc /var/jarvys/tmp
chmod 750 /var/jarvys /var/jarvys/bin /var/jarvys/etc /var/jarvys/tmp

/var/jarvys/bin/add-host

r=34

cat << EOF > /var/jarvys/etc/cron
# JARVYS hourly cron manager - this helps us:
# 1) Manage the flow of backups
# 2) Alert you if we don't hear from your server
# 3) Automatically update the binaries
# Please don't hesitate to contact JARVYS support if you have any questions

${r} * * * * root /var/jarvys/bin/jarvys.sh cron > /dev/null 2>&1
EOF

chmod 0644 /var/jarvys/etc/cron
chmod 755 /var/jarvys/bin/*

if [ -e "/etc/cron.d" ]; then
	ln -s /var/jarvys/etc/cron /etc/cron.d/jarvys
else
	echo "It looks like /etc/cron.d is missing, please add the following to your crontab:"
	echo "For example: cat /var/jarvys/etc/cron >> /etc/crontab"
fi

ln -s /var/jarvys/bin/jarvys.sh /usr/sbin/jarvys
