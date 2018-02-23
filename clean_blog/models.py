from __future__ import unicode_literals

from django.db import models
from push_notifications.models import WebPushDevice
from mezzanine.blog.models import BlogPost
from django.utils.translation import ugettext_lazy as _

class WebPushRequestInfo(models.Model):	 

	web_push_device = models.ForeignKey(WebPushDevice)

	blog_post = models.OneToOneField(BlogPost, blank=True)

	ga_id = models.CharField(max_length=500, blank=True)

	class Meta:
		verbose_name = _("WebPush Request Infomation")

