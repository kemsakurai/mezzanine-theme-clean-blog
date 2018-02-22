from __future__ import unicode_literals

from django.db import models
from push_notifications.models import WebPushDevice
from mezzanine.blog.models import BlogCategory
from django.utils.translation import ugettext_lazy as _

class WebPushCategory(models.Model):	 
    
	web_push_device = models.ForeignKey(WebPushDevice)
    
	blog_categories = models.ManyToManyField(BlogCategory, verbose_name=_("WebPushCategories"), blank=True)

	class Meta:
		verbose_name = _("WebPush Categories")
